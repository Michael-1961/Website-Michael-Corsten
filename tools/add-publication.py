#!/usr/bin/env python3
"""
Add a publication to content/publications.json using its DOI.

Usage:
    python tools/add-publication.py <doi>

Example:
    python tools/add-publication.py 10.1177/13684310211045794
"""

import json
import sys
import urllib.request
import urllib.error
from pathlib import Path


def fetch_crossref(doi):
    """Fetch publication metadata from CrossRef API."""
    url = f"https://api.crossref.org/works/{doi}"
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.load(response)
            return data["message"]
    except urllib.error.HTTPError as e:
        print(f"Error: DOI not found ({e.code})", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Error: Network error - {e.reason}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


def format_authors(authors):
    """Format authors from CrossRef to "Last, First; Last, First" format."""
    formatted = []
    for author in authors:
        given = author.get("given", "")
        family = author.get("family", "")
        if family:
            if given:
                formatted.append(f"{family}, {given}")
            else:
                formatted.append(family)
    return "; ".join(formatted)


def crossref_type_to_entry_type(item):
    """Map CrossRef type to publication entry type."""
    crossref_type = item.get("type", "")
    subtype = item.get("subtype", "")

    type_map = {
        "journal-article": "article",
        "book-chapter": "chapter",
        "monograph": "book",
        "edited-book": "edited",
        "reference-book": "edited",
        "book-series": "edited",
        "book-set": "edited",
        "reference-entry": "chapter",
        "proceedings-article": "conference",
        "conference-paper": "conference",
        "report": "article",
        "dataset": "article",
    }

    return type_map.get(crossref_type, "article")


def extract_publication(item):
    """Extract and map publication data from CrossRef response."""
    authors = format_authors(item.get("author", []))

    entry = {
        "authors": authors,
        "title": item.get("title", [""])[0] if item.get("title") else "",
        "type": crossref_type_to_entry_type(item),
    }

    # DOI
    if doi := item.get("DOI"):
        entry["doi"] = doi

    # Journal/article fields
    if short_title := item.get("short-title"):
        entry["journal"] = short_title[0]
    elif container := item.get("container-title"):
        entry["journal"] = container[0]

    if volume := item.get("volume"):
        entry["volume"] = volume

    if issue := item.get("issue"):
        entry["volume"] = f"{entry.get('volume', '')} ({issue})".strip()

    if page := item.get("page"):
        entry["pages"] = page

    # Book/chapter fields
    if publisher := item.get("publisher"):
        entry["publisher"] = publisher

    if event := item.get("event"):
        if event_name := event.get("name"):
            entry["in"] = event_name[0] if isinstance(event_name, list) else event_name

    # Location from publisher location
    if pub_loc := item.get("publisher-location"):
        entry["location"] = pub_loc

    # Editors for chapters
    if entry["type"] == "chapter" and (editor := item.get("editor")):
        entry["editors"] = format_authors(editor)

    # Year from published date
    if pub_date := item.get("published-print"):
        if date_parts := pub_date.get("date-parts"):
            entry["year"] = date_parts[0][0]
    elif pub_date := item.get("published-online"):
        if date_parts := pub_date.get("date-parts"):
            entry["year"] = date_parts[0][0]
    elif deposited := item.get("deposited"):
        if date_parts := deposited.get("date-parts"):
            entry["year"] = date_parts[0][0]

    # Link for conference papers
    if entry["type"] == "conference" and (links := item.get("link")):
        for link in links:
            if link.get("content-type") == "text/html":
                entry["link"] = link.get("URL")
                break

    # URL if no DOI
    if not entry.get("doi") and (url := item.get("URL")):
        entry["link"] = url

    return entry


def add_to_publications(entry, pub_file):
    """Add entry to publications.json, grouping by year."""
    pub_path = Path(pub_file)

    with open(pub_path, "r") as f:
        data = json.load(f)

    year = entry.pop("year", 2024)
    title = entry.get("title", "(Untitled)")

    # Find existing year section or create new one
    year_section = None
    year_index = 0

    for i, section in enumerate(data.get("publications", [])):
        if section["year"] == year:
            year_section = section
            year_index = i
            break
        if section["year"] < year:
            year_index = i
            break
    else:
        year_index = len(data.get("publications", []))

    if not year_section:
        year_section = {"year": year, "entries": []}
        data["publications"].insert(year_index, year_section)

    # Check for duplicate by title
    for existing in year_section["entries"]:
        if existing.get("title", "").lower() == title.lower():
            print(f"Warning: Entry with similar title already exists in {year}", file=sys.stderr)
            response = input("Add anyway? [y/N] ")
            if response.lower() != "y":
                print("Aborted.")
                sys.exit(0)

    year_section["entries"].insert(0, entry)

    # Sort publications by year descending
    data["publications"].sort(key=lambda x: x["year"], reverse=True)

    # Write back with nice formatting
    with open(pub_path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Added: {title}")
    print(f"  Year: {year}")
    print(f"  Type: {entry.get('type')}")


def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <doi>", file=sys.stderr)
        sys.exit(1)

    doi = sys.argv[1].strip()

    # Remove URL prefix if present
    if doi.startswith("http"):
        doi = doi.split("/")[-1]
        if doi.startswith("10."):
            doi = doi.split("?")[0]  # Remove query params

    if not doi.startswith("10."):
        print(f"Error: Invalid DOI format", file=sys.stderr)
        sys.exit(1)

    print(f"Fetching metadata for DOI: {doi}...")
    item = fetch_crossref(doi)
    entry = extract_publication(item)

    # Find publications.json
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent
    pub_file = repo_root / "content" / "publications.json"

    if not pub_file.exists():
        print(f"Error: {pub_file} not found", file=sys.stderr)
        sys.exit(1)

    add_to_publications(entry, pub_file)
    print(f"\nUpdated: {pub_file}")


if __name__ == "__main__":
    main()
