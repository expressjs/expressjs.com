import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { test } from 'node:test';

import movedPages from '../../src/config/redirects/moved-pages.json' with { type: 'json' };
import { isCanonicalSitemapPage } from '../../src/utils/sitemap.mjs';

const isCanonical = (pathname) => isCanonicalSitemapPage(`https://expressjs.com${pathname}`);

test('keeps the homepage at the root and in translated locales', () => {
  assert.equal(isCanonical('/'), true);
  assert.equal(isCanonical('/es/'), true);
  assert.equal(isCanonical('/pt-br/'), true);
});

test('drops /en/, which the homepage at the root replaces', () => {
  assert.equal(isCanonical('/en/'), false);
});

test('drops language-less redirect stubs and removed locales', () => {
  assert.equal(isCanonical('/guide/routing/'), false);
  assert.equal(isCanonical('/5x/api/express/'), false);
  assert.equal(isCanonical('/blog/'), false);
  assert.equal(isCanonical('/tr/guide/routing/'), false);
});

test('drops per-locale redirect stubs for every moved page', () => {
  for (const path of Object.keys(movedPages)) {
    assert.equal(isCanonical(`/en${path}/`), false, `/en${path}/`);
    assert.equal(isCanonical(`/es${path}/`), false, `/es${path}/`);
  }
});

test('keeps versioned docs in every locale', () => {
  assert.equal(isCanonical('/en/5x/guide/routing/'), true);
  assert.equal(isCanonical('/es/5x/guide/routing/'), true);
  assert.equal(isCanonical('/fr/4x/starter/installing/'), true);
  assert.equal(isCanonical('/de/4x/advanced/developing-template-engines/'), true);
});

test('drops unversioned copies of default-version docs and API pages', () => {
  assert.equal(isCanonical('/en/guide/routing/'), false);
  assert.equal(isCanonical('/es/starter/installing/'), false);
  assert.equal(isCanonical('/en/advanced/developing-template-engines/'), false);
  assert.equal(isCanonical('/en/api/'), false);
  assert.equal(isCanonical('/en/api/express/'), false);
  assert.equal(isCanonical('/es/api/express/'), false);
});

test('keeps every page of the unversioned pages collection', async () => {
  const contentDir = new URL('../../src/content/pages/en/', import.meta.url);
  const files = await readdir(contentDir, { recursive: true });
  const pages = files.filter((file) => /\.mdx?$/.test(file));
  assert.ok(pages.length > 0);

  for (const file of pages) {
    const slug = file.replace(/\.mdx?$/, '').replace(/(?:^|\/)index$/, '');
    assert.equal(isCanonical(`/en/${slug}/`), true, `/en/${slug}/`);
    assert.equal(isCanonical(`/es/${slug}/`), true, `/es/${slug}/`);
  }
});

test('keeps blog and API pages only in English', () => {
  assert.equal(isCanonical('/en/blog/'), true);
  assert.equal(isCanonical('/en/blog/2/'), true);
  assert.equal(isCanonical('/en/blog/2024-10-15-v5-release/'), true);
  assert.equal(isCanonical('/en/5x/api/'), true);
  assert.equal(isCanonical('/en/4x/api/express/'), true);

  assert.equal(isCanonical('/es/blog/'), false);
  assert.equal(isCanonical('/es/blog/2/'), false);
  assert.equal(isCanonical('/es/blog/2024-10-15-v5-release/'), false);
  assert.equal(isCanonical('/es/5x/api/'), false);
  assert.equal(isCanonical('/zh-tw/4x/api/express/'), false);
});
