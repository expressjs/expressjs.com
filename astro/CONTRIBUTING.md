# Contributing to the expressjs.com website

This is the contribution documentation for the [expressjs.com](https://github.com/expressjs/expressjs.com) website.

> [!NOTE]
> This is not the repo for Express.js framework. To contribute to the _[Express.js framework](https://github.com/expressjs/express)_, check out the [GitHub repo contributing page](https://github.com/expressjs/express?tab=contributing-ov-file) or the website's [Contributing to Express](https://expressjs.com/en/resources/contributing) page.

### Common contributions

1. **Website Issues**: Improvements to the site's functionality, design, or accessibility.
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

### Working on existing issues

We welcome contributions to existing bugs or enhancements. You can find these under our repo's [Issues tab](https://github.com/expressjs/expressjs.com/issues). Check out the tags to find something that matches your interests. Look for issues labeled `good first issue` or `help wanted` to get started.

### Reporting bugs & requesting features

If you have found a bug, a typo, or have an idea for an enhancement, you can:

- Submit a [new issue](https://github.com/expressjs/expressjs.com/issues/new/choose) on our repo. Do this for larger proposals, or if you'd like to discuss or get feedback first.

- Make a [GitHub pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). If you have already done work, and it's ready to go, feel free to send it our way.

## Getting Started

The steps below will guide you through the expressjs.com contribution process.

#### Step 1: Open an Issue (Optional)

If you have identified a problem or an enhancement:

1. If you want to get feedback or discuss, open a discussion [issue](https://github.com/expressjs/expressjs.com/issues/new/choose) prior to starting work. This is not required, but encouraged for larger proposals.
   - While we highly encourage this step, it is only for submissions proposing significant change. It helps us to clarify and focus the work, and ensure it aligns with overall project priorities.
   - For submissions proposing minor improvements or corrections, this is not needed. You can skip this step.
   - When opening an issue, please provide a clear title and complete description. The more details you provide, the more feedback we can give.

2. After receiving your issue, the Express.js documentation team will respond with feedback. We review all submissions and aim to respond as soon as possible.
   - For submissions proposing significant change, we encourage you to follow the review process before starting work.

#### Step 2: Get the project codebase

## Prerequisites

### Development stack

This project uses:

- **Astro** for site generation
- **TypeScript** for type safety
- **ESLint** for linting
- **Prettier** for formatting
<!-- TODO: add testing framework -->

### Tooling

- **Node.js**: v24.x or higher
- **npm**: v11.0.0 or higher (comes with Node 24)

> We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. This project includes an `.nvmrc` file for automatic version switching.

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

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start development server with hot reload  |
| `npm run build`   | Build production site to `./dist`         |
| `npm run preview` | Preview production build locally          |
| `npm run lint`    | Run ESLint to check for issues            |
| `npm run check`   | Run type checking and format verification |

## Submitting a pull request

1. Create a new branch from `redesign`
2. Make your changes
3. Run `npm run check` to verify code style and types
4. Commit with a clear message
5. Push to your fork
6. Open a PR against `redesign`

> Ensure all checks pass and your branch is up to date with `redesign` before opening a PR.

## Architecture policy

Although Astro supports integrations with frameworks such as React or Vue, this project intentionally avoids additional frontend frameworks.

The expressjs.com website is designed to use:

- HTML
- CSS
- TypeScript

This decision helps keep the codebase lightweight, easier to maintain, and accessible to a broader range of contributors.

### Do not introduce new frontend frameworks

Please do not introduce React, Vue, or other client-side frameworks without prior discussion and approval.

If a proposed feature appears to require a framework integration:

1. Open an issue first.
2. Explain the use case and why the existing stack (HTML, CSS, and TypeScript) is insufficient.
3. Wait for approval from the maintainers before proceeding.

Pull requests that introduce new framework dependencies without prior discussion may be closed.

### Existing exception

> The search component is implemented using React to support the Orama-powered search experience.
> This is a limited, isolated integration and does not indicate that React (or other frameworks) should be used elsewhere in the project.

> [!IMPORTANT]
> Pull requests that introduce new framework dependencies without prior discussion may not be accepted.

## Project structure

```
astro/
├── src/
│   ├── assets/              # Static assets (images, icons, etc.)
│   ├── components/          # Reusable UI components
│   │   ├── patterns/        # Complex UI patterns
│   │   └── primitives/      # Base UI primitives
│   ├── config/              # Configuration files
│   │   ├── menu/            # Menu configuration files (sidebars)
│   ├── content/             # Content collections
│   │   ├── docs/            # Documentation content
│   │   └── resources/       # Resource pages
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

## Content configuration

The site uses Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/) to manage documentation and resources. The configuration is defined in `src/content.config.ts`.

### Collections

| Collection  | Location                 | Description                       |
| ----------- | ------------------------ | --------------------------------- |
| `docs`      | `src/content/docs/`      | Documentation pages (guides, API) |
| `resources` | `src/content/resources/` | Resource pages (community, tools) |

### Frontmatter schema

Each content file requires frontmatter with the following properties:

```yaml
---
title: 'Page Title' # Required: The page title
description: 'Description' # Optional: Page description for SEO
---
```

## Versioning

The Express.js documentation supports multiple versions. Content is organized by version in the `src/content/docs/` directory.

### Version structure

```
src/content/docs/
└── en/
    ├── 3x/          # Express 3.x documentation
    ├── 4x/          # Express 4.x documentation
    └── 5x/          # Express 5.x documentation (default)
```

### How versioning works

- **Default Version**: `5x` is the current default version
- **Supported Versions**: `5x`, `4x`, `3x`
- **URL Patterns**:
  - Versioned: `/en/5x/api/` → Express 5.x API docs
  - Non-versioned: `/en/api/` → Defaults to Express 5.x

### Adding version specific content

1. Create your content file in the appropriate version directory:

   ```
   src/content/docs/en/5x/guide/my-new-page.md
   ```

2. The versioning system (configured in `src/pages/[lang]/[...slug].astro`) will automatically:
   - Serve the page at `/en/5x/guide/my-new-page`
   - Create non-versioned aliases for default version content

### Menu configuration

The navigation menus are configured in `src/config/menu/`. The type definitions are in `src/config/types.ts`.

#### Menu structure

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

#### Configuration files

| File            | Purpose                                     |
| --------------- | ------------------------------------------- |
| `main.ts`       | Top-level navigation (Docs, API, Resources) |
| `docs.ts`       | Documentation sidebar menu                  |
| `api.ts`        | API reference sidebar menu                  |
| `resources.ts`  | Resources section menu                      |
| `middleware.ts` | Middleware submenu                          |

#### Adding menu items

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

#### Adding sections

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

#### Version specific menus

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

#### Type reference

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

## Internationalization (i18n)

The expressjs.com website supports multiple languages through a combination of Astro routing, TypeScript utilities, and Crowdin integration.

### Contributing translations

We use Crowdin to manage our translations in multiple languages and to enable automatic translation with artificial intelligence. Since AI translations can be imperfect, we welcome community contributions to improve translation accuracy and quality.




### How to translate

1. Request to join the [Express.js Website project on Crowdin](https://express.crowdin.com/website)
2. [Select the language you want to translate](https://support.crowdin.com/for-translators/#starting-translation)
3. [Start translating in the Crowdin editor](https://support.crowdin.com/online-editor/)

> Translation contributions must be made through Crowdin, not directly to the repository. Direct edits to translation files will be overwritten by Crowdin syncs.

### Adding a new language

To add a new language to the website, follow this process:

1. **Request language support** - Contact a website captain to request a new language in Crowdin. Only website maintainers can add new languages to the Crowdin project.

2. **Crowdin will generate files** - Once approved in Crowdin, translation files will be automatically created:
   - `src/i18n/ui/[lang-code].json` - UI strings
   - Content files in `src/content/docs/[lang-code]/`

3. **Update `src/i18n/locales.ts`** - Once files are created by Crowdin:
   - Add the language to the `languages` object
   - Import the new language's JSON file from `src/i18n/ui/`

### How i18n works (Technical Details)

For developers who want to understand the technical architecture of the i18n system:

### Architecture overview

The i18n system is built on these key components:

1. **Locales Configuration** (`src/i18n/locales.ts`):
   - Defines all supported languages and their metadata
   - Imports UI translation strings from JSON files
   - Exports types for type-safe translations

2. **i18n Utilities** (`src/i18n/utils.ts`):
   - `getLangFromUrl()` - Extracts the language code from the URL
   - `useTranslations()` - Returns a translation function for the current language
   - Helper functions for language path manipulation

3. **Routing** (`src/pages/[lang]/[...slug].astro`):
   - Dynamic routing with the `[lang]` parameter for language selection
   - Supports URLs like `/en/api/`, `/fr/api/`, `/de/api/`, etc.

4. **UI Translations** (`src/i18n/ui/`):
   - JSON files for each supported language (e.g., `en.json`, `fr.json`)
   - Contains UI strings like navigation labels, buttons, and UI elements
   - Managed through Crowdin for easier translation

### Supported languages

The website is available in the following languages:

- `en` - English
- `de` - German (Deutsch)
- `es` - Spanish (Español)
- `fr` - French (Français)
- `it` - Italian (Italiano)
- `ja` - Japanese (日本語)
- `ko` - Korean (한국어)
- `pt-br` - Brazilian Portuguese (Português)
- `zh-cn` - Chinese Simplified (简体中文)
- `zh-tw` - Chinese Traditional (繁體中文)

### Using translations in components

To use translations in your Astro components, import the utility functions and extract the language from the current URL:

```astro
---
import { getLangFromUrl, useTranslations } from '@/i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<button aria-label={t('nav.toggleMenu')}>Menu</button>
<h1>{t('common.welcome')}</h1>
```

The `Astro.url` object automatically provides the current page URL, making it easy to extract the language code and get the appropriate translations.

### Content organization

#### UI translations

UI strings are stored in JSON files in `src/i18n/ui/`. For example, `src/i18n/ui/en.json`:

```json
{
  "common": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "navigation": {
    "docs": "Documentation",
    "api": "API Reference"
  }
}
```

#### Content translations

Documentation content is stored separately from UI translations:

- **Docs**: `src/content/docs/[lang-code]/[version]/` - Documentation pages
- **Resources**: `src/content/resources/[lang-code]/` - Resource pages

The following content is currently not translated:

- **API reference**
- **Blog posts**

### Adding UI translations

When adding new UI strings:

1. Add the string to `src/i18n/ui/en.json` first
2. The structure will be synced to Crowdin
3. Translators will translate it through Crowdin
4. Updated translations will be synced back

### Crowdin integration

The `crowdin.yml` configuration file defines:

- Source files and their Crowdin translation targets
- Directory structure for translations
- API configuration for automation

When translations are completed in Crowdin:

- Files are automatically synced to the repository
- A bot automatically creates pull requests with the translation updates

> [!WARNING]
> **Do not manually create or edit translation files** (`src/i18n/ui/*.json` and `src/content/docs/[lang-code]/*.*`)
> These files are automatically managed by Crowdin and will be overwritten if you make manual changes.
> All translation updates must go through the Crowdin workflow.
