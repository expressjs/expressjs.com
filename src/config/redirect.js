// Redirect .html and non-.html blog post URLs to the new format. This will ensure that any existing links to blog posts will continue to work and redirect users to the correct location on the new site.
const blog = {
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
  '/en/changelog/4x.html': 'https://github.com/expressjs/express/releases',
  '/en/changelog/4x': 'https://github.com/expressjs/express/releases',
};

const redirects = { ...blog, ...api_v2, ...pages };

export default redirects;
