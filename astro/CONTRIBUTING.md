# Contributing to Expressjs.com

### The Official Documentation of the Express.js Framework

This is the contribution documentation for the [expressjs.com](https://github.com/expressjs/expressjs.com) website.

> [!NOTE]
> This is not the repo for Express.js framework. To contribute to the _[Express.js framework](https://github.com/expressjs/express)_, check out the [GitHub repo contributing page](https://github.com/expressjs/express?tab=contributing-ov-file) or the website's [Contributing to Express](https://expressjs.com/en/resources/contributing.html) page.

#### Need some ideas? These are some typical issues.

1. **Website issues**: If you see anything on the site that could use a tune-up, think about how to fix it.
   - Display or screen sizing problems
   - Mobile responsiveness issues
   - Missing or broken accessibility features
   - Website outages
   - Broken links
   - Page structure or user interface enhancements

2. **Content Issues**: Fix anything related to site content or typos.
   - Spelling errors
   - Incorrect/outdated Express.js documentation
   - Missing content

3. **Translation Issues**: Fix any translation errors or contribute new content.
   - Fix spelling errors
   - Fix incorrect/poorly translated words
   - Check out the [Contributing translations](#contributing-translations) section below for a contributing guide.

#### Want to work on a backlog issue?

We often have bugs or enhancements that need work. You can find these under our repo's [Issues tab](https://github.com/expressjs/expressjs.com/issues). Check out the tags to find something that's a good match for you.

#### Have an idea? Found a bug?

If you've found a bug or a typo, or if you have an idea for an enhancement, you can:

- Submit a [new issue](https://github.com/expressjs/expressjs.com/issues/new/choose) on our repo. Do this for larger proposals, or if you'd like to discuss or get feedback first.

- Make a [GitHub pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). If you have already done work, and it's ready to go, feel free to send it our way.

## Getting Started

The steps below will guide you through the Expressjs.com contribution process.

#### Step 1: (OPTIONAL) Open a New Issue

So you've found a problem that you want to fix, or have a site enhancement you want to make.

1. If you want to get feedback or discuss, open a discussion [issue](https://github.com/expressjs/expressjs.com/issues/new/choose) prior to starting work. This is not required, but encouraged for larger proposals.
   - While we highly encourage this step, it is only for submissions proposing significant change. It helps us to clarify and focus the work, and ensure it aligns with overall project priorities.
   - For submissions proposing minor improvements or corrections, this is not needed. You can skip this step.
   - When opening an issue please give it a title and fill in the description section. The more details you provide, the more feedback we can give.

2. After receiving your issue the Express.js documentation team will respond with feedback. We read every submission and always try to respond quickly with feedback.
   - For submissions proposing significant change, we encourage you to follow the review process before starting work.

#### Step 2: Get the Application Code Base

## Prerequisites

- **Node.js**: v24.13.0 or higher
- **npm**: v11.0.0 or higher (comes with Node 24)

> We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. This project includes an `.nvmrc` file for automatic version switching.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/expressjs/expressjs.com.git
   cd expressjs.com
   ```

2. **Install the correct Node.js version** (if using nvm):

   ```bash
   nvm install
   nvm use
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build production site to `./dist`        |
| `npm run preview` | Preview production build locally         |

## Project Structure

```
astro/
├── src/
│   ├── assets/              # Static assets (images, icons, etc.)
│   ├── components/          # Reusable UI components
│   │   ├── patterns/        # Complex UI patterns
│   │   └── primitives/      # Base UI primitives
│   ├── config/              # Configuration files
│   ├── content/             # Content collections
│   │   └── docs/            # Documentation content
│   ├── i18n/                # Internationalization
│   ├── layouts/             # Page layouts
│   ├── pages/               # Route pages
│   │   └── [lang]/          # Localized pages
│   ├── styles/              # Global styles
│   │   ├── base/            # Base styles
│   │   ├── tokens/          # Design tokens
│   │   └── utilities/       # Utility classes
│   └── utils/               # Utility functions
├── public/                  # Static assets
│   └── fonts/               # Font files
├── astro.config.mjs         # Astro configuration
```

## Content Configuration

The site uses Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/) to manage documentation and resources. The configuration is defined in `src/content.config.ts`.

### Collections

| Collection  | Location                 | Description                       |
| ----------- | ------------------------ | --------------------------------- |
| `docs`      | `src/content/docs/`      | Documentation pages (guides, API) |
| `resources` | `src/content/resources/` | Resource pages (community, tools) |

### Frontmatter Schema

Each content file requires frontmatter with the following properties:

```yaml
---
title: 'Page Title' # Required: The page title
description: 'Description' # Optional: Page description for SEO
---
```

## Versioning

The Express.js documentation supports multiple versions. Content is organized by version in the `src/content/docs/` directory.

### Version Structure

```
src/content/docs/
└── en/
    ├── 3x/          # Express 3.x documentation
    ├── 4x/          # Express 4.x documentation
    └── 5x/          # Express 5.x documentation (default)
```

### How Versioning Works

- **Default Version**: `5x` is the current default version
- **Supported Versions**: `5x`, `4x`, `3x`
- **URL Patterns**:
  - Versioned: `/en/5x/api/` → Express 5.x API docs
  - Non-versioned: `/en/api/` → Defaults to Express 5.x

### Adding Version-Specific Content

1. Create your content file in the appropriate version directory:

   ```
   src/content/docs/en/5x/guide/my-new-page.md
   ```

2. The versioning system (configured in `src/pages/[lang]/[...slug].astro`) will automatically:
   - Serve the page at `/en/5x/guide/my-new-page`
   - Create non-versioned aliases for default version content

### Menu Configuration

The navigation menus are configured in `src/config/menu/`. The type definitions are in `src/config/types.ts`.

#### Menu Structure

Menus are composed of **sections** and **items**:

```
Menu
├── sections[]           # Groups of menu items
│   ├── title?           # Optional section header
│   ├── basePath?        # Base path prepended to all item hrefs
│   ├── omitFrom?        # Versions to exclude this section from
│   └── items[]          # Menu items in this section
└── items[]              # Alternative: flat list of items (no sections)
```

#### Configuration Files

| File            | Purpose                                     |
| --------------- | ------------------------------------------- |
| `main.ts`       | Top-level navigation (Docs, API, Resources) |
| `docs.ts`       | Documentation sidebar menu                  |
| `api.ts`        | API reference sidebar menu                  |
| `resources.ts`  | Resources section menu                      |
| `middleware.ts` | Middleware submenu                          |

#### Adding Menu Items

Basic menu item with a link:

```typescript
{ href: `/guide/routing`, label: 'Routing', ariaLabel: 'Routing guide' }
```

Menu item with a submenu:

```typescript
{
  label: 'Properties',
  ariaLabel: 'Application properties',
  submenu: {
    items: [
      { href: `/api/application/app-locals`, label: 'app.locals' },
      { href: `/api/application/app-mountpath`, label: 'app.mountpath' },
    ],
  },
}
```

#### Adding Sections

Sections group related menu items with an optional title:

```typescript
{
  title: 'Getting started',
  items: [
    { href: `/starter/installing`, label: 'Installing' },
    { href: `/starter/hello-world`, label: 'Hello world' },
  ],
}
```

#### Version-Specific Menus

**Enabling versioning on a submenu** — Use `versioned` to specify which versions the menu supports. The version prefix will be automatically prepended to URLs:

```typescript
{
  label: 'API Reference',
  submenu: {
    versioned: ['5x', '4x', '3x'],  // Supports all three versions
    sections: apiMenu.sections,
  },
}
```

**Omitting items from specific versions** — Use `omitFrom` to hide an item in certain versions:

```typescript
{
  href: `/api/application/app-mountpath`,
  label: 'app.mountpath',
  omitFrom: ['3x'],  // Not available in Express 3.x
}
```

**Omitting entire sections from specific versions**:

```typescript
{
  title: 'Router',
  omitFrom: ['3x'],  // Router section doesn't exist in 3.x
  items: [
    { href: `/api/router/overview`, label: 'Overview' },
  ],
}
```

#### Type Reference

```typescript
type VersionPrefix = '5x' | '4x' | '3x';

type Menu = {
  sections?: MenuSection[];
  items?: MenuItem[];
  basePath?: string;
  versioned?: VersionPrefix[];
};

type MenuSection = {
  title?: string; // Section header text
  basePath?: string; // Prepended to all item hrefs
  items: MenuItem[];
  omitFrom?: VersionPrefix[]; // Versions to exclude this section from
};

type MenuItem = {
  label: string;
  ariaLabel?: string;
  icon?: string;
  href?: string; // Link destination (omit if using submenu)
  submenu?: Menu; // Nested menu (omit if using href)
  omitFrom?: VersionPrefix[]; // Versions to exclude this item from
};
```
