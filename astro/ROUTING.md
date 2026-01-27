# Express Astro - Routing & Content Configuration

This document describes the routing and content layout configuration for the English documentation.

## Structure

The routing system is set up to handle content from the legacy Jekyll site, migrated to Astro's content collections.

### Directory Structure

```
astro/
├── src/
│   ├── config/
│   │   └── menu.ts                      # Menu configuration and labels
│   ├── content/
│   │   └── config.ts                    # Content collection config (Astro 5 with glob loader)
│   ├── data/
│   │   └── docs/
│   │       └── en/                      # English documentation
│   │           ├── starter/             # Getting started guides
│   │           ├── guide/               # Main guides
│   │           ├── advanced/            # Advanced topics
│   │           └── resources/           # Resources and references
│   ├── layouts/
│   │   ├── Layout.astro                 # Base layout
│   │   └── DocLayout.astro              # Documentation page layout
│   ├── pages/
│   │   └── en/
│   │       ├── index.astro              # English docs home
│   │       └── [section]/
│   │           ├── index.astro          # Section listing page
│   │           └── [...slug].astro      # Individual doc pages
│   └── utils/
│       └── content.ts                   # Content utility functions
```

## Routes

The following routes are automatically generated:

### Documentation Home
- `/en/` - Overview of all documentation sections

### Section Indexes
- `/en/starter/` - Getting started section
- `/en/guide/` - Guide section
- `/en/advanced/` - Advanced topics section
- `/en/resources/` - Resources section

### Individual Pages
- `/en/[section]/[slug]` - Individual documentation pages
  - Example: `/en/starter/installing`
  - Example: `/en/guide/routing`
  - Example: `/en/advanced/best-practice-security`

## Content Schema

Each markdown file in the content collection requires frontmatter:

```yaml
---
title: Page Title                  # Required
description: Page description      # Optional
menu: section-name                 # Required: starter, guide, advanced, resources
order: 1                           # Optional: for ordering within section
layout: page                       # Optional: legacy field
redirect_from: /old/path           # Optional: for redirects
---
```

## Configuration Files

### `src/config/menu.ts`
Contains menu labels and section definitions. Maps keys to human-readable labels.

### `src/content/config.ts` (Astro 5 Content Layer API)
Defines the content collection using the new glob loader:
- Uses `glob({ pattern: '**/*.md', base: './src/data/docs' })` to load markdown files
- Defines schema using Zod validation
- Loads content from `src/data/docs/` instead of traditional `src/content/` directory

### `src/utils/content.ts`
Utility functions for:
- Getting docs by language
- Getting docs by section
- Generating breadcrumbs
- Building navigation

## Astro 5 Content Layer API

This project uses Astro 5's new Content Layer API with the glob loader:
- Content files are located in `src/data/docs/` (not `src/content/`)
- The glob loader automatically discovers all `.md` files
- You can reference content from anywhere on the filesystem
- Use `render()` function separately: `import { render } from 'astro:content'`

## Next Steps

1. **Update Node.js version**: The project requires Node.js >= 18.20.8
2. **Convert Jekyll syntax**: Replace Jekyll liquid syntax in markdown files
   - `{{ page.lang }}` → should be handled in the Astro component or removed
   - `{% include %}` tags → convert to Astro components
   - `<div markdown="1">` → convert to MDX components
3. **Add navigation components**:
   - Section navigation in sidebar
   - Previous/Next navigation in footer
   - Table of contents in aside
4. **Add more sections**: Currently includes starter, guide, advanced, resources
   - Can add: blog, changelog, support, api versions (3x, 4x, 5x)
5. **Styling**: Enhance the documentation layout styling
6. **Search**: Add search functionality
7. **i18n**: Extend to support other languages when ready

## Testing

To test the build (after upgrading Node.js):

```bash
cd astro
npm run build
npm run preview
```

To start development server:

```bash
cd astro
npm run dev
```

Visit `http://localhost:4321/en/` to see the documentation home.

## Adding New Content

1. Add markdown files to `src/content/docs/en/[section]/`
2. Include required frontmatter (title, menu)
3. Content will automatically be included in the routing system
4. Pages will be sorted by the `order` field if provided
