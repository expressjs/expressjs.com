// Legacy/external URL remaps that can't be derived from the content collections:
// old blog permalinks, links to the archived v2 docs, and the changelog page
// that now lives on GitHub.
//
// Everything else is handled elsewhere, so it's intentionally absent here:
//   - The systematic "non-localized path → /en/…" redirects (guides, resources,
//     api, blog posts) are generated from the content collections by
//     `src/pages/[...path].astro`.
//   - Stripping the `.html` extension is handled by Cloudflare, so most paths are
//     written without it (e.g. `/2x/guide`, not `/2x/guide.html`). The paths that
//     Cloudflare's rule skips (`/2x/*`, `/en/changelog/4x.html`, and date-based
//     `/[0-9]{4}/…` blog permalinks) reach the site with the extension, so they get
//     explicit `.html` entries here (see `html_excluded` below).

const blog = {
  '/blog/posts': '/en/blog',
  '/2024/07/16/welcome-post': '/en/blog/2024-07-16-welcome-post',
  '/2024/09/29/security-releases': '/en/blog/2024-09-29-security-releases',
  '/2024/10/01/HeroDevs-partnership-announcement':
    '/en/blog/2024-10-01-herodevs-partnership-announcement',
  '/2024/10/15/v5-release': '/en/blog/2024-10-15-v5-release',
  '/2024/10/22/security-audit-milestone-achievement':
    '/en/blog/2024-10-22-security-audit-milestone-achievement',
  '/2025/01/09/rewind-2024-triumphs-and-2025-vision':
    '/en/blog/2025-01-09-rewind-2024-triumphs-and-2025-vision',
  '/2025/03/31/v5-1-latest-release': '/en/blog/2025-03-31-v5-1-latest-release',
  '/2025/05/16/express-cleanup-legacy-packages':
    '/en/blog/2025-05-16-express-cleanup-legacy-packages',
  '/2025/05/19/security-releases': '/en/blog/2025-05-19-security-releases',
  '/2025/06/05/vulnerability-reporting-process-overhaul':
    '/en/blog/2025-06-05-vulnerability-reporting-process-overhaul',
  '/2025/07/18/security-releases': '/en/blog/2025-07-18-security-releases',
  '/2025/07/31/security-releases': '/en/blog/2025-07-31-security-releases',
  '/2025/12/01/security-releases': '/en/blog/2025-12-01-security-releases',
  '/2026/02/27/security-releases': '/en/blog/2026-02-27-security-releases',
  '/2026/03/30/security-releases': '/en/blog/2026-03-30-security-releases',
};

const api_v2 = {
  '/2x/': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/guide': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/migrate': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/screencasts': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/executables': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/contrib': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/applications': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/guide': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/migrate': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/screencasts': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/executables': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/contrib': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/applications': 'https://github.com/expressjs/expressjs.com/tree/2x',
};

const pages = {
  '/changelog/4x': 'https://github.com/expressjs/express/releases',
  '/en/changelog/4x': 'https://github.com/expressjs/express/releases',
  // Legacy `index.html` landing pages. Cloudflare strips `.html`, leaving
  // `/en/index/` (and `/index/`), which have no page of their own → send home.
  '/en/index': '/en/',
  '/index': '/en/',
};

// Cloudflare's `.html` rule skips `/2x/*`, `/en/changelog/4x.html`, and any
// date-based path (`^/[0-9]{4}/`), so those legacy URLs arrive with the extension
// intact. Give each a `.html` variant that redirects to the same target instead of
// 404ing (see issue #2407).
const html_excluded = {
  '/en/changelog/4x.html': 'https://github.com/expressjs/express/releases',
};
for (const [path, target] of Object.entries(api_v2)) {
  html_excluded[path === '/2x/' ? '/2x/index.html' : `${path}.html`] = target;
}
for (const [path, target] of Object.entries(blog)) {
  // Only the date-based permalinks are skipped by Cloudflare (not e.g. `/blog/posts`).
  if (/^\/\d{4}\//.test(path)) {
    html_excluded[`${path}.html`] = target;
  }
}

const redirects = {
  ...blog,
  ...api_v2,
  ...pages,
  ...html_excluded,
};

export default redirects;
