import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getBlogPosts, toPathSegment } from '../../scripts/orama-documents.mjs';

test('toPathSegment drops the extension and a trailing index', () => {
  assert.equal(toPathSegment('guide/routing.mdx'), 'guide/routing');
  assert.equal(toPathSegment('guide/routing.md'), 'guide/routing');
  assert.equal(toPathSegment('resources/middleware/index.mdx'), 'resources/middleware');
  assert.equal(toPathSegment('index.mdx'), '');
});

test('toPathSegment lowercases the path like the Astro entry id', () => {
  assert.equal(toPathSegment('2026-10-28-CVE-2026-111181.mdx'), '2026-10-28-cve-2026-111181');
  assert.equal(toPathSegment('Guide/Index.mdx'), 'guide');
});

test('getBlogPosts links mixed-case filenames to their generated lowercase URLs', async () => {
  const paths = (await getBlogPosts('en')).map((post) => post.path);

  assert.ok(paths.includes('/en/blog/2026-10-28-cve-2026-111181'));
  assert.ok(paths.includes('/en/blog/2024-10-01-herodevs-partnership-announcement'));
  assert.deepEqual(
    paths.filter((path) => path !== path.toLowerCase()),
    []
  );
});
