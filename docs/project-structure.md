# Project Structure

```
├── src/
│   ├── assets/              # Static assets (images, icons, etc.)
│   ├── components/          # Reusable UI components
│   │   ├── patterns/        # Complex UI patterns
│   │   └── primitives/      # Base UI primitives
│   ├── config/              # Configuration files
│   │   ├── menu/            # Menu configuration files (sidebars)
│   ├── content/             # Content collections
│   │   ├── docs/            # Versioned documentation content
│   │   └── pages/           # Global pages (non-versioned docs, resources, support)
│   ├── i18n/                # Internationalization
│   ├── icons/               # Icon components
│   ├── layouts/             # Page layouts
│   ├── pages/               # Route pages
│   │   └── [lang]/          # Localized pages
│   ├── plugins/             # Custom plugins
│   ├── styles/              # Global styles
│   │   ├── base/            # Base styles
│   │   ├── tokens/          # Design tokens
│   │   └── utilities/       # Utility classes
│   └── utils/               # Utility functions
├── public/                  # Static assets
│   └── fonts/               # Font files
├── docs/                    # Internal documentation for contributors
├── astro.config.mjs         # Astro configuration
```

## Architecture Policy

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
