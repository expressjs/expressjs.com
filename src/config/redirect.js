// Redirect .html and non-.html blog post URLs to the new format. This will ensure that any existing links to blog posts will continue to work and redirect users to the correct location on the new site.
import { getLanguageCodes } from '../i18n/utils';

/** @param {{[key: string]: string}} pageMap */
function localizedPages(pageMap) {
  /** @type {{[key: string]: string}} */
  const localizedVersions = {};
  const languageCodes = getLanguageCodes();
  for (const [from, to] of Object.entries(pageMap)) {
    // All localized pages seem to have had both /<path> and /en/<path> versions
    localizedVersions[`/${from}`] = `/en/${to}`;
    for (const langCode of languageCodes) {
      localizedVersions[`/${langCode}/${from}`] = `/${langCode}/${to}`;
    }
  }
  return localizedVersions;
}

/** @param {string[]} pageList */
function stripHTML(pageList) {
  return Object.fromEntries(pageList.map((old) => [old, old.substring(0, old.length - 5)]));
}

const blog = {
  '/blog/posts.html': '/en/blog',
  '/en/blog/posts.html': '/en/blog',
  '/en/blog/write-post.html': '/en/blog/write-post/',
  '/2024/07/16/welcome-post.html': '/en/blog/2024-07-16-welcome-post',
  '/2024/07/16/welcome-post': '/en/blog/2024-07-16-welcome-post',
  '/2024/09/29/security-releases.html': '/en/blog/2024-09-29-security-releases',
  '/2024/09/29/security-releases': '/en/blog/2024-09-29-security-releases',
  '/2024/10/01/HeroDevs-partnership-announcement.html':
    '/en/blog/2024-10-01-herodevs-partnership-announcement',
  '/2024/10/01/HeroDevs-partnership-announcement':
    '/en/blog/2024-10-01-herodevs-partnership-announcement',
  '/2024/10/15/v5-release': '/en/blog/2024-10-15-v5-release',
  '/2024/10/15/v5-release.html': '/en/blog/2024-10-15-v5-release',
  '/2024/10/22/security-audit-milestone-achievement.html':
    '/en/blog/2024-10-22-security-audit-milestone-achievement',
  '/2024/10/22/security-audit-milestone-achievement':
    '/en/blog/2024-10-22-security-audit-milestone-achievement',
  '/2025/01/09/rewind-2024-triumphs-and-2025-vision.html':
    '/en/blog/2025-01-09-rewind-2024-triumphs-and-2025-vision',
  '/2025/01/09/rewind-2024-triumphs-and-2025-vision':
    '/en/blog/2025-01-09-rewind-2024-triumphs-and-2025-vision',
  '/2025/03/31/v5-1-latest-release.html': '/en/blog/2025-03-31-v5-1-latest-release',
  '/2025/03/31/v5-1-latest-release': '/en/blog/2025-03-31-v5-1-latest-release',
  '/2025/05/16/express-cleanup-legacy-packages.html':
    '/en/blog/2025-05-16-express-cleanup-legacy-packages',
  '/2025/05/16/express-cleanup-legacy-packages':
    '/en/blog/2025-05-16-express-cleanup-legacy-packages',
  '/2025/05/19/security-releases.html': '/en/blog/2025-05-19-security-releases',
  '/2025/05/19/security-releases': '/en/blog/2025-05-19-security-releases',
  '/2025/06/05/vulnerability-reporting-process-overhaul.html':
    '/en/blog/2025-06-05-vulnerability-reporting-process-overhaul',
  '/2025/06/05/vulnerability-reporting-process-overhaul':
    '/en/blog/2025-06-05-vulnerability-reporting-process-overhaul',
  '/2025/07/18/security-releases.html': '/en/blog/2025-07-18-security-releases',
  '/2025/07/18/security-releases': '/en/blog/2025-07-18-security-releases',
  '/2025/07/31/security-releases.html': '/en/blog/2025-07-31-security-releases',
  '/2025/07/31/security-releases': '/en/blog/2025-07-31-security-releases',
  '/2025/12/01/security-releases.html': '/en/blog/2025-12-01-security-releases',
  '/2025/12/01/security-releases': '/en/blog/2025-12-01-security-releases',
  '/2026/02/27/security-releases.html': '/en/blog/2026-02-27-security-releases',
  '/2026/02/27/security-releases': '/en/blog/2026-02-27-security-releases',
  '/2026/03/30/security-releases.html': '/en/blog/2026-03-30-security-releases',
  '/2026/03/30/security-releases': '/en/blog/2026-03-30-security-releases',
};

const api_v2 = {
  '/2x/': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/guide.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/migrate.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/screencasts.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/executables.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/contrib.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/applications.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/guide.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/migrate.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/screencasts.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/executables.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/contrib.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
  '/2x/docs/applications.html': 'https://github.com/expressjs/expressjs.com/tree/2x',
};

const pages = {
  '/changelog/4x.html': 'https://github.com/expressjs/express/releases',
  '/en/changelog/4x.html': 'https://github.com/expressjs/express/releases',
  '/en/changelog/4x': 'https://github.com/expressjs/express/releases',
};

const api = localizedPages({
  'api.html': '5x/api/',
  '3x/api.html': '3x/api/',
  '4x/api.html': '4x/api/',
  '5x/api.html': '5x/api/',
});

const localizedGuides = localizedPages(
  stripHTML([
    'advanced/best-practice-performance.html',
    'advanced/best-practice-security.html',
    'advanced/developing-template-engines.html',
    'advanced/healthcheck-graceful-shutdown.html',
    'advanced/security-updates.html',
    'guide/behind-proxies.html',
    'guide/database-integration.html',
    'guide/debugging.html',
    'guide/error-handling.html',
    'guide/migrating-4.html',
    'guide/migrating-5.html',
    'guide/overriding-express-api.html',
    'guide/routing.html',
    'guide/using-middleware.html',
    'guide/using-template-engines.html',
    'guide/writing-middleware.html',
    'starter/basic-routing.html',
    'starter/examples.html',
    'starter/faq.html',
    'starter/generator.html',
    'starter/hello-world.html',
    'starter/installing.html',
    'starter/static-files.html',
  ])
);

const localizedResources = localizedPages(
  stripHTML([
    'resources/community.html',
    'resources/contributing.html',
    'resources/glossary.html',
    'resources/middleware/body-parser.html',
    'resources/middleware/compression.html',
    'resources/middleware/connect-rid.html',
    'resources/middleware/cookie-parser.html',
    'resources/middleware/cookie-session.html',
    'resources/middleware/cors.html',
    'resources/middleware/errorhandler.html',
    'resources/middleware/method-override.html',
    'resources/middleware/morgan.html',
    'resources/middleware/multer.html',
    'resources/middleware/response-time.html',
    'resources/middleware/serve-favicon.html',
    'resources/middleware/serve-index.html',
    'resources/middleware/serve-static.html',
    'resources/middleware/session.html',
    'resources/middleware/timeout.html',
    'resources/middleware/vhost.html',
    'resources/middleware.html',
    'resources/utils.html',
  ])
);

const redirects = {
  ...blog,
  ...api_v2,
  ...pages,
  ...api,
  ...localizedGuides,
  ...localizedResources,
};

export default redirects;
