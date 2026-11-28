import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getRssString } from '@astrojs/rss';

import { getAuthorsCustomData, RSS_NAMESPACES } from '../../src/utils/rss.ts';

function renderFeed(authors) {
  return getRssString({
    title: 'Feed',
    description: 'Feed description',
    site: 'https://expressjs.com',
    xmlns: RSS_NAMESPACES,
    items: [{ title: 'Post', link: '/en/blog/post/', customData: getAuthorsCustomData(authors) }],
  });
}

test('getAuthorsCustomData returns undefined without authors', () => {
  assert.equal(getAuthorsCustomData(undefined), undefined);
  assert.equal(getAuthorsCustomData([]), undefined);
});

test('feed items list each author as a dc:creator instead of an RSS author', async () => {
  const xml = await renderFeed([
    { name: 'Ulises Gascon', github: 'UlisesGascon' },
    { name: 'Express Technical Committee' },
  ]);

  assert.match(xml, /<rss [^>]*xmlns:dc="http:\/\/purl\.org\/dc\/elements\/1\.1\/"/);
  assert.match(
    xml,
    /<dc:creator>Ulises Gascon<\/dc:creator><dc:creator>Express Technical Committee<\/dc:creator>/
  );
  assert.doesNotMatch(xml, /<author>/);
});

test('author names are escaped in the feed XML', async () => {
  const xml = await renderFeed([{ name: 'Tobi & <Loki>' }]);

  assert.match(xml, /<dc:creator>Tobi &amp; &lt;Loki&gt;<\/dc:creator>/);
});
