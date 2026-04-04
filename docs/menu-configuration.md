# Menu Configuration

The navigation menus are configured in `src/config/menu/`. The type definitions are in `src/config/types.ts`.

## Menu Structure

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

## Configuration Files

| File            | Purpose                                     |
| --------------- | ------------------------------------------- |
| `main.ts`       | Top-level navigation (Docs, API, Resources) |
| `docs.ts`       | Documentation sidebar menu                  |
| `api.ts`        | API reference sidebar menu                  |
| `resources.ts`  | Resources section menu                      |
| `middleware.ts` | Middleware submenu                          |

## Adding Menu Items

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

## Adding Sections

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

## Version Specific Menus

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
