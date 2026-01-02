# Prof. Dr. Michael Corsten - Personal Website

**[🌐 View the site](https://jancurse.github.io/Website-Michael-Corsten/)**

Bilingual academic website built with Astro and Tailwind CSS.

## Viewing the Site Locally

To view the site in your browser while making changes, run the development server. This allows you to preview changes in real-time.

```bash
npm install
npm run dev
```

Then open `http://localhost:4321` in your browser. The page automatically refreshes when you save changes to content files.

## Deployment

The site is automatically deployed when you push to the `main` branch.

For manual testing, you can create a production-ready version locally:

```bash
npm run build
```

The optimized static files are generated in the `dist/` directory.

## Updating Content

### Basic Information

Basic information is stored in the following JSON files in `src/content/`:

- `kontakt.json` - Contact information
- `lebenslauf.json` - CV data
- `labels.json` - UI labels

Edit these files directly to update the site.

### Publications

Publications are stored in `src/content/publikationen.json`. You can modify this file directly to add or update publications, or you can use the provided tool to add a publication using its DOI number:

```bash
python tools/add-publication.py 10.1177/13684310211045794
```

### Research Projects and Focus Areas

Research projects and focus areas are stored as markdown files in `src/content/forschungsprojekte/` and `src/content/forschungsschwerpunkte/`. Each entry has a German version in `de/` and an English version in `en/`. Create or edit these files to update content.

The files use frontmatter (metadata between `---` markers at the top) for information like title, lead, team, funding, and years:

```yaml
---
title: "Project Title"
order: 1
focus_area: symbolic-practice
lead: "Project Lead"
team: "Team Members"
funding: "Funding Source"
years: "2020-2023"
papers:
  - claiming-solidarity
  - schnulze
---

Content in markdown...
```

- `order` controls display order. Entries are sorted by order (lowest first) then alphabetically by title. Missing order means last.
- `focus_area` links project to a focus area (use focus area filename without extension)
- `papers` links to publications from `publikationen.json` by ID
