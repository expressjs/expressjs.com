# Configuration

## Menu

The navigation menus are configured in `src/config/menu/`. The type definitions are in `src/config/types.ts`.

### Menu Structure

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

### Configuration Files

| File            | Purpose                                     |
| --------------- | ------------------------------------------- |
| `main.ts`       | Top-level navigation (Docs, API, Resources) |
| `docs.ts`       | Documentation sidebar menu                  |
| `api.ts`        | API reference sidebar menu                  |
| `resources.ts`  | Resources section menu                      |
| `middleware.ts` | Middleware submenu                          |

### Adding Menu Items

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

### Adding Sections

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

### Version Specific Menus

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

## Announcement Bar

The announcement bar is a banner displayed at the top of the homepage. It supports two modes: **automatic** (latest blog post) and **custom** (manual configuration).

The announcement bar is configured via `src/config/announcement.json`:

```json
{
  "title": "",
  "description": "",
  "link": "",
  "variant": "info",
  "startDate": "",
  "endDate": ""
}
```

### Fields

| Field         | Type     | Description                                                                                          |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `title`       | `string` | Banner title. If set, the custom announcement is used instead of the blog.                           |
| `description` | `string` | Body text displayed below the title.                                                                 |
| `link`        | `string` | Optional URL for a call-to-action link. The link text is managed via i18n (`announcement.readMore`). |
| `variant`     | `string` | Visual style: `"info"` (blue) or `"warning"` (orange/red). Defaults to `"info"`.                     |
| `startDate`   | `string` | ISO date (`YYYY-MM-DD`). Banner is hidden before this date. If empty, shows immediately.             |
| `endDate`     | `string` | ISO date (`YYYY-MM-DD`). Banner is hidden after this date. If empty, shows indefinitely.             |

### Custom Announcement

When `title` has a value, the banner displays the custom announcement with the configured fields. This takes priority over the blog fallback.

**Example — time-limited announcement:**

```json
{
  "title": "Express@5.1.0: Now the Default on npm",
  "description": "Express 5.1.0 is now the default on npm with an official LTS schedule.",
  "link": "/en/blog/v5-1-latest-release",
  "variant": "info",
  "startDate": "2026-03-01",
  "endDate": "2026-05-31"
}
```

**Example — persistent warning:**

```json
{
  "title": "Critical Security Update",
  "description": "Please upgrade path-to-regexp to the latest version.",
  "link": "/en/blog/2026-03-30-security-releases",
  "variant": "warning",
  "startDate": "",
  "endDate": ""
}
```

### Latest Blog (Default)

When `title` is empty, the banner automatically displays the most recent blog post. In this mode:

- The **title** and **description** are pulled from the blog post's frontmatter.
- A **"Read more"** link points to the full blog post.
- The banner is **visible for 1 month** after the blog's publication date (derived from the filename, e.g., `2026-03-30-security-releases.mdx` → starts `2026-03-30`, ends `2026-04-30`).
- If the blog post has the `security` tag, the banner uses the `warning` variant. Otherwise, it uses `info`.

To reset the announcement bar to this default behavior, clear the `title` field:

```json
{
  "title": "",
  "description": "",
  "link": "",
  "variant": "info",
  "startDate": "",
  "endDate": ""
}
```
