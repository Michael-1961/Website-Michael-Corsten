# Prof. Dr. Michael Corsten - Personal Website

**[🌐 View the site](https://Michael-1961.github.io/Website-Michael-Corsten/)**

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

## Git Workflow

### Option 1: Work on main

Changes go live as soon as you push.

#### Making changes

```bash
git pull                 # before you start
git add . && git commit -m "Add new publication"   # as often as you like
git pull --rebase        # when you are ready
git push
```

#### If a conflict happens

If `git pull --rebase` reports a conflict, undo it and move your commits to a new branch. Replace `<branch-name>` with a name you choose that has not been used before (for example `bios-article`):

```bash
git rebase --abort
git switch -c <branch-name>
git rebase origin/main
```

The rebase stops at the conflict. Resolve it (for example by asking Copilot or another AI assistant), then continue and bring `main` up to date:

```bash
git add <file>
git rebase --continue
git switch main
git reset --hard origin/main
git merge --ff-only <branch-name>
git push
```

### Option 2: Work on a fresh branch

This is the safer workflow, because your work stays separate from `main` until you publish it.

#### Making changes

Replace `<branch-name>` with a name you choose that has not been used before (for example `bios-article`):

```bash
git switch main
git pull                           # before you start
git switch -c <branch-name>
git add . && git commit -m "Add new publication"   # as often as you like
```

#### Publishing

```bash
git fetch
git rebase origin/main   # if a conflict happens, resolve it as in option 1
git switch main
git merge --ff-only <branch-name>
git push
```

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
lead:
  - name: "Prof. Dr. Michael Corsten"
  - name: "Prof. Dr. Ulrich Heid"
    url: "https://www.uni-hildesheim.de/fb3/institute/iwist/mitglieder/heid/"
team:
  - name: "Dr. Fritz Kliche"
  - name: "Dr. Laura Maleyka"
funding: "Funding Source"
years: "2020-2023"
papers:
  - claiming-solidarity
  - schnulze
---

Content in markdown...
```

- `lead` and `team` are lists of people. Each person has a `name` and an optional `url`. When `url` is provided, the name becomes a clickable link on detail pages.
- `order` controls display order. Entries are sorted by order (lowest first) then alphabetically by title. Missing order means last.
- `focus_area` links project to a focus area (use focus area filename without extension)
- `papers` links to publications from `publikationen.json` by ID
