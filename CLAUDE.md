# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (German/English) academic website for Prof. Dr. Michael Corsten, a sociology professor at the University of Hildesheim. The site is built with Astro 5.0, uses static site generation, and features research projects, publications, and curriculum vitae.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (validates publications automatically)
npm run build

# Validate publication references independently
npm run validate:publications

# Preview production build
npm run preview
```

## Architecture

### Content Collections System

The site uses Astro's content collections for two main content types:

1. **Research Projects** (`forschungsprojekte`)
   - Markdown files in `src/content/forschungsprojekte/{de,en}/`
   - Frontmatter includes: title, years, lead, team, funding, duration, contact, papers (references), focus_area
   - The `papers` field references publication IDs that must exist in `publikationen.json`

2. **Research Focus Areas** (`forschungsschwerpunkte`)
   - Markdown files in `src/content/forschungsschwerpunkte/{de,en}/`
   - Frontmatter includes: title, order, lead, team, subtopics, papers
   - Can be linked to from research projects via the `focus_area` field

Schemas are defined in `src/content.config.ts`.

### Publications System

Publications are stored centrally in `src/content/publikationen.json` with a hierarchical structure:
- Organized by year
- Each publication has a unique `id` field
- Publications can be referenced from research projects and focus areas

The build process validates that all `papers` references in markdown files exist in the publications database. The validation script (`scripts/validate-publications.mjs`) will fail the build if broken references are found.

### Bilingual Structure

- **Default locale**: German (`de`)
- **Supported locales**: German, English (`en`)
- Content files are organized in `de/` and `en/` subdirectories
- URL routing: `/de/...` and `/en/...` (prefixDefaultLocale is enabled)
- UI labels are defined in `src/content/labels.json`
- Language utilities are in `src/i18n/utils.ts`

### Dynamic Routing

Content collection items use dynamic routes with the `[id]` pattern:
- `src/pages/de/forschung/projekte/[id].astro` - Research project pages
- `src/pages/de/forschung/schwerpunkte/[id].astro` - Focus area pages
- English equivalents exist under `/en/`

These pages use Astro's `getStaticPaths()` to generate pages for each content item.

### Key Utilities

- `src/utils/publications.ts` - Access publication data by ID, validate references
- `src/utils/formatPublication.ts` - Format citations based on publication type
- `src/i18n/utils.ts` - Language detection, localized path generation, language switching

### Styling

- Uses Tailwind CSS via `@astrojs/tailwind` integration
- Supports dark mode with manual toggle
- Tailwind Typography plugin (`@tailwindcss/typography`) for markdown content styling
- Global styles in `src/styles/global.css`

### Markdown Processing

- `remark-math` and `rehype-katex` for LaTeX math rendering
- Supports inline math with `$...$` and display math with `$$...$$`

## Content Relationships

When adding or modifying content, maintain these relationships:

1. **Publications** must have unique IDs in `publikationen.json`
2. **Research projects** can reference publications via the `papers` array
3. **Focus areas** can also reference publications via `papers`
4. **Research projects** can optionally link to a focus area via `focus_area` (matches the filename without `.md`)

The validation script ensures all publication references are valid before building.
