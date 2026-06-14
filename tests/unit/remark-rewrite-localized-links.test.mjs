import assert from 'node:assert/strict';
import { test } from 'node:test';

import remarkRewriteLocalizedLinks from '../../src/plugins/remark-rewrite-localized-links.mjs';

const PREFIXES = ['guide', 'starter', 'api', 'resources', 'advanced', 'support', 'blog'];
const OPTIONS = {
  prefixes: PREFIXES,
  versionedSections: ['api', 'starter', 'guide', 'advanced'],
  defaultVersion: '5x',
  // "global" guide/advanced pages (live in the unversioned `pages` collection).
  unversionedPaths: [
    'guide/database-integration',
    'guide/migrating-4',
    'guide/migrating-5',
    'advanced/best-practice-performance',
    'advanced/best-practice-security',
    'advanced/healthcheck-graceful-shutdown',
    'advanced/security-updates',
  ],
};

const API_4X = '/repo/src/content/api/4x/api/response/index.mdx';

// Representative source paths for each collection layout.
const DOCS_EN_5X = '/repo/src/content/docs/en/5x/guide/routing.md';
const DOCS_ES_4X = '/repo/src/content/docs/es/4x/guide/routing.md';
const PAGES_ES = '/repo/src/content/pages/es/guide/migrating-5.mdx';
const PAGES_DE_RESOURCES = '/repo/src/content/pages/de/resources/middleware/index.md';
const API_5X = '/repo/src/content/api/5x/api/express/index.mdx';
const BLOG = '/repo/src/content/blog/2024-10-15-v5-release.md';

/**
 * Runs the plugin against a single link URL for a given source file path and
 * returns the resulting URL.
 *
 * @param {string} url
 * @param {string} filePath
 * @param {object} [options]
 */
function rewriteLink(url, filePath, options = OPTIONS) {
  const node = { type: 'link', url, children: [] };
  const tree = { type: 'root', children: [node] };

  remarkRewriteLocalizedLinks(options)(tree, { path: filePath });

  return node.url;
}

test('docs: prefixes the file language to a versioned link', () => {
  assert.equal(rewriteLink('/5x/api/express', DOCS_EN_5X), '/en/5x/api/express/');
});

test('docs: uses the language of the source file', () => {
  assert.equal(rewriteLink('/4x/api/router', DOCS_ES_4X), '/es/4x/api/router/');
});

test('docs: preserves a cross-version link (version is never re-derived)', () => {
  // A 4x file linking to a 5x page must keep the 5x version, only the language changes.
  assert.equal(rewriteLink('/5x/api/response', DOCS_ES_4X), '/es/5x/api/response/');
});

test('pages: prefixes language to an unversioned link', () => {
  assert.equal(rewriteLink('/guide/migrating-5', PAGES_ES), '/es/guide/migrating-5/');
});

test('pages: localizes resources by the file language', () => {
  assert.equal(
    rewriteLink('/resources/middleware', PAGES_DE_RESOURCES),
    '/de/resources/middleware/'
  );
});

test('localizes single-segment sections like support', () => {
  assert.equal(rewriteLink('/support', PAGES_ES), '/es/support/');
});

test('api: shared collection falls back to the default language', () => {
  // `api` content is shared across languages, so the path carries no language.
  assert.equal(rewriteLink('/5x/api/router', API_5X), '/en/5x/api/router/');
});

test('blog: flat shared collection falls back to the default language', () => {
  // `blog` is flat (no language segment), so the filename must not be read as a language.
  assert.equal(
    rewriteLink('/blog/2024-09-29-security-releases', BLOG),
    '/en/blog/2024-09-29-security-releases/'
  );
});

test('versioned section: injects the file version when the link omits one', () => {
  assert.equal(rewriteLink('/api/express', API_5X), '/en/5x/api/express/');
  assert.equal(rewriteLink('/api/response', API_4X), '/en/4x/api/response/');
});

test('versioned section: injects the version for bare api links from docs files', () => {
  assert.equal(rewriteLink('/api/response', DOCS_ES_4X), '/es/4x/api/response/');
});

test('versioned section: injects the file version for starter links from docs', () => {
  assert.equal(rewriteLink('/starter/installing', DOCS_ES_4X), '/es/4x/starter/installing/');
});

test('versioned section: unversioned collections use the latest version', () => {
  // A pages/blog file has no version, so a bare api/starter link gets defaultVersion.
  assert.equal(rewriteLink('/api/express', PAGES_ES), '/es/5x/api/express/');
  assert.equal(rewriteLink('/api/router', BLOG), '/en/5x/api/router/');
});

test('versioned section: preserves an explicit (cross-)version', () => {
  // 4x file linking to 5x api must keep 5x, not be replaced by the file version.
  assert.equal(rewriteLink('/5x/api/response', API_4X), '/en/5x/api/response/');
});

test('split section: a bare guide link gets the source file version', () => {
  // `routing` is a versioned docs page → gets the file's version.
  assert.equal(rewriteLink('/guide/routing', DOCS_ES_4X), '/es/4x/guide/routing/');
  assert.equal(rewriteLink('/guide/routing', DOCS_EN_5X), '/en/5x/guide/routing/');
});

test('split section: an explicit version on a guide link is preserved', () => {
  assert.equal(rewriteLink('/4x/guide/routing', DOCS_EN_5X), '/en/4x/guide/routing/');
});

test('split section: a global page stays unversioned (no versioned URL exists)', () => {
  // `migrating-5`/`best-practice-performance` live in `pages`.
  assert.equal(rewriteLink('/guide/migrating-5', DOCS_EN_5X), '/en/guide/migrating-5/');
  assert.equal(
    rewriteLink('/advanced/best-practice-performance', DOCS_EN_5X),
    '/en/advanced/best-practice-performance/'
  );
});

test('split section: an explicit version on a global page is dropped', () => {
  assert.equal(rewriteLink('/5x/guide/migrating-5', DOCS_EN_5X), '/en/guide/migrating-5/');
});

test('global pages default to the menu (no unversionedPaths needed)', () => {
  // Without passing unversionedPaths, the plugin derives them from the menu's global items.
  const opts = { prefixes: PREFIXES, versionedSections: ['guide'], defaultVersion: '5x' };
  assert.equal(rewriteLink('/guide/migrating-5', DOCS_EN_5X, opts), '/en/guide/migrating-5/');
  assert.equal(rewriteLink('/guide/routing', DOCS_EN_5X, opts), '/en/5x/guide/routing/');
});

test('resources/support/blog: language only, never a version', () => {
  assert.equal(
    rewriteLink('/resources/middleware', PAGES_DE_RESOURCES),
    '/de/resources/middleware/'
  );
  assert.equal(rewriteLink('/support', PAGES_ES), '/es/support/');
});

test('skips paths that already start with a language segment', () => {
  assert.equal(rewriteLink('/en/5x/guide/routing', DOCS_EN_5X), '/en/5x/guide/routing');
});

test('skips paths whose target section is not a configured prefix', () => {
  assert.equal(rewriteLink('/images/express-mw.png', DOCS_EN_5X), '/images/express-mw.png');
});

test('leaves external URLs untouched', () => {
  assert.equal(
    rewriteLink('https://expressjs.com/guide/routing', DOCS_EN_5X),
    'https://expressjs.com/guide/routing'
  );
});

test('leaves relative and pure-hash links untouched', () => {
  assert.equal(rewriteLink('./routing', DOCS_EN_5X), './routing');
  assert.equal(rewriteLink('#section', DOCS_EN_5X), '#section');
});

test('preserves query string and hash fragment', () => {
  assert.equal(
    rewriteLink('/5x/api/express#expressstaticroot-options', DOCS_EN_5X),
    '/en/5x/api/express/#expressstaticroot-options'
  );
});

test('rewrites reference-style definition nodes', () => {
  const node = { type: 'definition', identifier: 'routing', url: '/guide/routing' };
  const tree = { type: 'root', children: [node] };

  remarkRewriteLocalizedLinks(OPTIONS)(tree, { path: DOCS_EN_5X });

  assert.equal(node.url, '/en/5x/guide/routing/');
});

test('falls back to the default language when the path is outside src/content', () => {
  assert.equal(
    rewriteLink('/resources/middleware', '/somewhere/else/file.md'),
    '/en/resources/middleware/'
  );
});

test('respects custom prefixes from options', () => {
  // `guide` is not configured here, so it must be left untouched.
  assert.equal(rewriteLink('/guide/routing', DOCS_EN_5X, { prefixes: ['api'] }), '/guide/routing');
});
