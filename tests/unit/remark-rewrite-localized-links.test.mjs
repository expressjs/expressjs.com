import assert from 'node:assert/strict';
import { test } from 'node:test';

import remarkRewriteLocalizedLinks from '../../src/plugins/remark-rewrite-localized-links.mjs';

const PREFIXES = ['guide', 'starter', 'api'];

// Representative source paths for each collection layout.
const DOCS_EN_5X = '/repo/src/content/docs/en/5x/guide/routing.md';
const DOCS_ES_4X = '/repo/src/content/docs/es/4x/guide/routing.md';
const PAGES_ES = '/repo/src/content/pages/es/guide/routing.md';
const PAGES_DE_RESOURCES = '/repo/src/content/pages/de/resources/middleware/index.md';
const API_5X = '/repo/src/content/api/5x/api/express/index.mdx';

/**
 * Runs the plugin against a single link URL for a given source file path and
 * returns the resulting URL.
 *
 * @param {string} url
 * @param {string} filePath
 * @param {object} [options]
 */
function rewriteLink(url, filePath, options = { prefixes: PREFIXES }) {
  const node = { type: 'link', url, children: [] };
  const tree = { type: 'root', children: [node] };

  remarkRewriteLocalizedLinks(options)(tree, { path: filePath });

  return node.url;
}

test('docs: injects language and version segments', () => {
  assert.equal(rewriteLink('/guide/routing', DOCS_EN_5X), '/en/5x/guide/routing/');
});

test('docs: derives language and version from the source path', () => {
  assert.equal(rewriteLink('/guide/routing', DOCS_ES_4X), '/es/4x/guide/routing/');
});

test('pages: injects language but no version', () => {
  assert.equal(rewriteLink('/guide/routing', PAGES_ES), '/es/guide/routing/');
});

test('pages: localizes nested resources by their own language', () => {
  assert.equal(rewriteLink('/starter/installing', PAGES_DE_RESOURCES), '/de/starter/installing/');
});

test('api: version-first collection falls back to the default language', () => {
  // `api` content is shared across languages, so the path carries no language.
  assert.equal(rewriteLink('/api/express', API_5X), '/en/api/express/');
});

test('skips paths that already start with a language segment', () => {
  assert.equal(rewriteLink('/en/guide/routing', DOCS_EN_5X), '/en/guide/routing');
});

test('skips paths whose first segment is not a configured prefix', () => {
  assert.equal(rewriteLink('/resources/middleware', DOCS_EN_5X), '/resources/middleware');
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
    rewriteLink('/guide/routing?tab=cjs#errors', DOCS_EN_5X),
    '/en/5x/guide/routing/?tab=cjs#errors'
  );
});

test('rewrites reference-style definition nodes', () => {
  const node = { type: 'definition', identifier: 'routing', url: '/guide/routing' };
  const tree = { type: 'root', children: [node] };

  remarkRewriteLocalizedLinks({ prefixes: PREFIXES })(tree, { path: DOCS_EN_5X });

  assert.equal(node.url, '/en/5x/guide/routing/');
});

test('falls back to defaults when the path is outside src/content', () => {
  assert.equal(rewriteLink('/guide/routing', '/somewhere/else/file.md'), '/en/guide/routing/');
});

test('respects custom prefixes from options', () => {
  // `guide` is not configured here, so it must be left untouched.
  assert.equal(
    rewriteLink('/guide/routing', DOCS_EN_5X, { prefixes: ['api'] }),
    '/guide/routing'
  );
});
