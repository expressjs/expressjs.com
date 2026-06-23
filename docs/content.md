# Content

The site uses Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/) to manage documentation and resources. The configuration is defined in `src/content.config.ts`.

## Collections

| Collection | Location             | Description                                                    |
| ---------- | -------------------- | -------------------------------------------------------------- |
| `docs`     | `src/content/docs/`  | Versioned documentation pages (guides)                         |
| `api`      | `src/content/api/`   | Versioned API reference documentation                          |
| `pages`    | `src/content/pages/` | Global pages: non-versioned docs, resources, support, and more |
| `blog`     | `src/content/blog/`  | Blog posts                                                     |

> [!NOTE]
> For a guide on writing and publishing blog posts, see [How to write a blog post](https://expressjs.com/en/blog/write-post).

## Frontmatter Schema

Each content file requires frontmatter with the following properties:

```yaml
---
title: 'Page Title' # Required: The page title
description: 'Description' # Optional: Page description for SEO
---
```

## Using Components in Content (MDX)

Content files that need to use interactive components must use the `.mdx` extension instead of `.md`. MDX allows you to import and use Astro components directly inside your markdown content.

### Available Components

| Component | Import                                                         | Description                                                 |
| --------- | -------------------------------------------------------------- | ----------------------------------------------------------- |
| `Alert`   | `import Alert from '@components/primitives/Alert/Alert.astro'` | Contextual alerts with `info`, `warning`, and `alert` types |

### Example

```mdx
---
title: My page title
description: A page with alerts
---

import Alert from '@components/primitives/Alert/Alert.astro';

Regular markdown content here.

<Alert type="info">This is an informational note.</Alert>

<Alert type="warning">This is a warning message.</Alert>

<Alert type="alert">This is a critical alert.</Alert>
```

> Component imports must be placed **after** the frontmatter block and **before** the content where they are used. Do not place imports inside the frontmatter (`---`) block.

## Code Tabs

Show the same snippet as CommonJS / ESM / TypeScript variants behind a tab strip. Tag each fenced code block with a dialect language and the tabs are built for you — consecutive tagged blocks are grouped into a single `CodeTabs`, and its import is injected automatically (no manual import needed).

| Fence | Tab label  | Highlighted as |
| ----- | ---------- | -------------- |
| `cjs` | CommonJS   | JavaScript     |
| `mjs` | ESM        | JavaScript     |
| `ts`  | TypeScript | TypeScript     |

````mdx
```cjs
const express = require('express');
const app = express();
```

```mjs
import express from 'express';
const app = express();
```

```ts
import express, { Express } from 'express';
const app: Express = express();
```
````

For labels other than these dialects, tag the blocks with `tab="..."` instead:

````mdx
```js tab="npm"
npm install express
```

```js tab="pnpm"
pnpm add express
```
````

## API Reference

The API reference lives in its own collection at `src/content/api/`, organized by version. Unlike `docs`, the API collection is not language-scoped — it is only available in English.

### Structure

```
src/content/api/
├── 3x/
│   ├── api.mdx                    # API overview
│   └── api/
│       ├── application/           # express() and app methods
│       ├── middleware/             # Built-in middleware
│       ├── request/               # req object
│       └── response/              # res object
├── 4x/
│   ├── api.mdx
│   └── api/
│       ├── application/
│       ├── express/               # express module-level methods
│       ├── middleware/
│       ├── request/
│       ├── response/
│       └── router/                # Router (added in 4.x)
└── 5x/
    ├── api.mdx
    └── api/
        ├── application/
        ├── middleware/
        ├── request/
        ├── response/
        └── router/
```

### URL Patterns

- Versioned: `/en/5x/api/application` → Express 5.x application API
- Non-versioned: `/en/api/application` → Defaults to Express 5.x

## Versioning

The Express.js documentation supports multiple versions. Content is organized by version in both the `docs` and `api` collections.

### Version Structure

```
src/content/docs/
└── en/
    ├── 3x/          # Express 3.x documentation
    ├── 4x/          # Express 4.x documentation
    └── 5x/          # Express 5.x documentation (default)
```

### How Versioning Works

The version list, prefixes, and default version are defined once in `src/config/versions.ts`
(`VERSIONS`, `VERSION_PREFIXES`, `DEFAULT_VERSION`) and consumed everywhere else.

- **Default Version**: `5x` is the current default version (`isDefault: true` in `VERSIONS`)
- **Supported Versions**: `5x`, `4x`, `3x`
- **URL Patterns**:
  - Versioned: `/en/5x/api/` → Express 5.x API docs
  - Non-versioned: `/en/api/` → Defaults to Express 5.x

### Adding Version Specific Content

1. Create your content file in the appropriate version directory:

   ```
   src/content/docs/en/5x/guide/my-new-page.md
   ```

2. The versioning system (configured in `src/pages/[lang]/[...slug].astro`) will automatically:
   - Serve the page at `/en/5x/guide/my-new-page`
   - Create non-versioned aliases for default version content

### Adding a New Version

To add support for a new Express version (e.g., `6x`):

1. **Create content directories:**
   - `src/content/docs/en/6x/` — Guides and documentation
   - `src/content/api/6x/` — API reference

2. **Update the version type** in `src/config/types.ts`:

   ```typescript
   export type VersionPrefix = '6x' | '5x' | '4x' | '3x';
   ```

3. **Add the version** to `src/config/versions.ts` — the single source of truth for the
   version list, prefixes, and default version:

   ```typescript
   export const VERSIONS: VersionOption[] = [
     { id: '6x', label: 'v6.x', isDefault: true },
     { id: '5x', label: 'v5.x' },
     { id: '4x', label: 'v4.x' },
     { id: '3x', label: 'v3.x (deprecated)', isDeprecated: true },
   ];
   ```

   `DEFAULT_VERSION` and `VERSION_PREFIXES` are derived from this array, and the routing
   (`src/pages/[lang]/[...slug].astro`), the sidebar, and the link-localization plugins all
   read from it — so you don't update the version in those places anymore.

4. **Update menu versioning** in `src/config/menu/main.ts`:
   - Add `'6x'` to the `versioned` arrays

5. **Review `omitFrom` entries** in `src/config/menu/api.ts`:
   - Determine which API features exist or are deprecated in the new version

### Global Pages (Non-Versioned)

Some documentation pages are shared across all versions and don't belong to a specific Express version (e.g., security updates, migration guides, performance best practices). These pages live in the `pages` collection instead of `docs`.

#### Structure

```
src/content/pages/
└── en/
    ├── advanced/
    │   ├── best-practice-performance.md
    │   ├── best-practice-security.mdx
    │   ├── healthcheck-graceful-shutdown.md
    │   └── security-updates.mdx
    ├── guide/
    │   ├── database-integration.mdx
    │   ├── migrating-4.mdx
    │   └── migrating-5.mdx
    ├── resources/
    │   ├── community.md
    │   ├── contributing.md
    │   ├── glossary.mdx
    │   ├── utils.md
    └── support.md
```

Pages with a slug starting with `resources/` are treated as resource pages and won't show "Docs" in the breadcrumbs.

#### Adding a Global Page

1. Create your content file in `src/content/pages/`:

   ```
   src/content/pages/en/guide/my-global-page.md
   ```

2. Add the menu item in `src/config/menu/docs.ts` with `global: true`:

   ```typescript
   {
     href: `/guide/my-global-page`,
     label: 'menu.myGlobalPage',
     ariaLabel: 'menu.myGlobalPageAria',
     global: true,
   }
   ```

   The `global: true` flag tells the sidebar to generate the link without a version prefix and prevents the version switcher from modifying its URL.

## Internal Links

Write internal links **without a language prefix** (and usually without a version) — just the
section path. Two plugins localize them at build time so every page links within its own language
and version:

- `src/plugins/remark-rewrite-localized-links.mjs` — Markdown links `[text](/...)`.
- `src/plugins/rehype-rewrite-localized-links.mjs` — raw HTML/JSX anchors `<a href="/...">` (e.g.
  cards that wrap a `<Card>` component), which Markdown link syntax can't express.

Both share the logic — and the defaults — in `src/plugins/rewrite-localized-links-core.mjs`
(`DEFAULT_PREFIXES` = localizable sections, `DEFAULT_VERSIONED_SECTIONS` = sections that carry a
version; the latest version comes from `src/config/versions.ts` and the unversioned "global" pages
are derived from the menu). They're registered in `astro.config.mjs` with no options needed.

### How to write a link

For a link authored in a Spanish, 5.x page:

| Write this              | Renders as                  | Why                                          |
| ----------------------- | --------------------------- | -------------------------------------------- |
| `/api/express`          | `/es/5x/api/express/`       | versioned section → file version injected    |
| `/guide/routing`        | `/es/5x/guide/routing/`     | versioned docs page → file version injected  |
| `/guide/migrating-5`    | `/es/guide/migrating-5/`    | "global" page → no versioned URL, stays bare |
| `/4x/api/express`       | `/es/4x/api/express/`       | explicit version is preserved                |
| `/resources/middleware` | `/es/resources/middleware/` | `resources` is never versioned               |

Rules:

- **Always omit the language.** The plugin prepends the current page's language. Never write
  `/en/...` — translations sync from Crowdin verbatim, so a hardcoded language would make translated
  pages link back to English.
- **Versioned sections (`api`, `starter`, `guide`, `advanced`)** carry a version: the link's own
  version is kept, or the source file's version (in `docs`/`api`) — or the latest (`DEFAULT_VERSION`)
  from a non-versioned collection — is injected when the link omits one. Write `/api/express` or
  `/guide/routing`; in a 5.x file both resolve under `/…/5x/…`.
- **"Global" pages are the exception.** A handful of `guide`/`advanced` pages live in the unversioned
  `pages` collection (`migrating-5`, `best-practice-performance`, …) and have no versioned URL, so
  links to them always stay unversioned. This list is derived from the menu items flagged
  `global: true` (in `src/config/menu/`) — no manual upkeep. (Adding a global page already requires
  that flag; see [Adding a Global Page](#adding-a-global-page).)
- **`resources`, `support`, `blog`** are never versioned; links are language-only.
- External URLs, relative links (`./x`), pure anchors (`#x`) and already-localized links (`/en/...`)
  are left untouched.
