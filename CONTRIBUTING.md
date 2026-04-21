# Contributing to the expressjs.com website

This is the contribution documentation for the [expressjs.com](https://github.com/expressjs/expressjs.com) website.

You can see the current [captains and committers](https://github.com/expressjs/discussions/blob/HEAD/docs/contributing/captains_and_committers.md) of this project, and learn how to join through the [governance document](https://github.com/expressjs/discussions/blob/HEAD/docs/GOVERNANCE.md). Also review the [Express Collaborator Guide](https://github.com/expressjs/.github/blob/HEAD/CONTRIBUTING.md) for general contribution guidelines across Express.js projects.

## Common Contributions

1. **Website Issues**: Improvements to the site's functionality, design, or accessibility.
2. **Content Issues**: Fix anything related to site content or typos.
3. **Translation Issues**: Fix translation errors or contribute new content. See the [i18n documentation](docs/i18n.md).

## Working on Issues

We welcome contributions to existing bugs or enhancements. You can find these under our repo's [Issues tab](https://github.com/expressjs/expressjs.com/issues). Look for issues labeled `good first issue` or `help wanted` to get started.

If you have found a bug, a typo, or have an idea for an enhancement:

- Submit a [new issue](https://github.com/expressjs/expressjs.com/issues/new/choose) for larger proposals or to get feedback first.
- Open a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) directly if the work is ready to go.

> For significant changes, we encourage opening an issue first to discuss and align before starting work.

## Getting Started

### Prerequisites

This project uses:

- **Astro** for site generation
- **TypeScript** for type safety
- **ESLint** for linting
- **Prettier** for formatting

Tooling required:

- **Node.js**: v24.x or higher
- **npm**: v11.0.0 or higher (comes with Node 24)

> We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. This project includes an `.nvmrc` file for automatic version switching.

### Setup

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

### Available Scripts

| Command            | Description                               |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Start development server with hot reload  |
| `npm run build`    | Build production site to `./dist`         |
| `npm run preview`  | Preview production build locally          |
| `npm run lint`     | Run ESLint to check for issues            |
| `npm run check`    | Run type checking and format verification |
| `npm run test:e2e` | Run Playwright E2E tests                  |

## Submitting a Pull Request

1. Create a new branch from `main`.
2. Make your changes.
3. Run `npm run check` to verify code style and types.
4. Run `npm run test:e2e` to ensure your changes don't break existing functionality.
5. Commit with a clear message.
6. Push to your fork.
7. Open a PR against `main`.

> Ensure all checks pass and your branch is up to date with `main` before opening a PR.

## Testing

We use **Playwright** for End-to-End (E2E) testing. All PRs are automatically tested against a Netlify Preview deployment before they can be merged.

### Prerequisites

Before running E2E tests for the first time, you need to install the browser binaries:

```bash
npx playwright install --with-deps
```

### Running Tests Locally

You can run the full test suite against your local development server:

1. In one terminal, start the site: `npm run dev`
2. In another terminal, run the tests: `npm run test:e2e`

### Writing Stable Tests

When adding new tests or modifying components, please follow these stability guidelines:

1. **Avoid CSS Classes**: Do not use CSS classes (e.g., `.hero__content`) for locators, as they are fragile and change during refactoring.
2. **Use data-testid**: Add `data-testid` attributes to components for stable targeting (e.g., `<div data-testid="my-component">`).
3. **User-Visible Locators**: Prefer semantic locators like `getByRole`, `getByText`, or `getByAltText` over IDs when possible.

Example:

```typescript
// Good: Stable and accessible
const logo = page.getByAltText('Express.js logo');
const section = page.getByTestId('features-section');

// Bad: Fragile
const logo = page.locator('.hero__logo');
```

## Further Documentation

For more detailed documentation about the project, see the [`docs/`](docs/) folder:

- [Project Structure](docs/project-structure.md) — Architecture, folder layout, and framework policy
- [Content](docs/content.md) — Collections, frontmatter, versioning, and global pages
- [Configuration](docs/configuration.md) — Navigation menus, announcement bar, and version-specific items
- [Internationalization](docs/i18n.md) — Translations, Crowdin integration, and adding languages
- [Design System](docs/design-system.md) — Components, tokens, colors, typography, and breakpoints
