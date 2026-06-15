import assert from 'node:assert/strict';
import { test } from 'node:test';

import rehypeRewriteLocalizedLinks from '../../src/plugins/rehype-rewrite-localized-links.mjs';

const OPTIONS = {
  prefixes: ['guide', 'api', 'resources'],
  versionedSections: ['api'],
  defaultVersion: '5x',
};

const DOCS_ES_5X = '/repo/src/content/docs/es/5x/guide/routing.mdx';
const API_4X = '/repo/src/content/api/4x/api/express/index.mdx';

function run(tree, filePath) {
  rehypeRewriteLocalizedLinks(OPTIONS)(tree, { path: filePath });
  return tree;
}

test('rewrites standard hast <a> elements', () => {
  const node = {
    type: 'element',
    tagName: 'a',
    properties: { href: '/guide/routing' },
    children: [],
  };
  run({ type: 'root', children: [node] }, DOCS_ES_5X);
  assert.equal(node.properties.href, '/es/guide/routing/');
});

test('rewrites MDX JSX anchors (mdxJsxFlowElement) via their href attribute', () => {
  const node = {
    type: 'mdxJsxFlowElement',
    name: 'a',
    attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: '/resources/community' }],
    children: [],
  };
  run({ type: 'root', children: [node] }, DOCS_ES_5X);
  assert.equal(node.attributes[0].value, '/es/resources/community/');
});

test('rewrites inline MDX JSX anchors (mdxJsxTextElement)', () => {
  const node = {
    type: 'mdxJsxTextElement',
    name: 'a',
    attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: '/api/request' }],
    children: [],
  };
  // api file (shared → default lang); versioned section injects the file version.
  run({ type: 'root', children: [node] }, API_4X);
  assert.equal(node.attributes[0].value, '/en/4x/api/request/');
});

test('preserves an explicit version on JSX anchors', () => {
  const node = {
    type: 'mdxJsxFlowElement',
    name: 'a',
    attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: '/5x/api/express' }],
    children: [],
  };
  run({ type: 'root', children: [node] }, API_4X);
  assert.equal(node.attributes[0].value, '/en/5x/api/express/');
});

test('skips anchors that already have a language prefix', () => {
  const node = {
    type: 'mdxJsxFlowElement',
    name: 'a',
    attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: '/es/guide/routing' }],
    children: [],
  };
  run({ type: 'root', children: [node] }, DOCS_ES_5X);
  assert.equal(node.attributes[0].value, '/es/guide/routing');
});

test('ignores anchors without a string href (expression values)', () => {
  const node = {
    type: 'mdxJsxFlowElement',
    name: 'a',
    attributes: [
      { type: 'mdxJsxAttribute', name: 'href', value: { type: 'mdxJsxAttributeValueExpression' } },
    ],
    children: [],
  };
  run({ type: 'root', children: [node] }, DOCS_ES_5X);
  assert.deepEqual(node.attributes[0].value, { type: 'mdxJsxAttributeValueExpression' });
});

test('leaves non-anchor elements untouched', () => {
  const node = {
    type: 'element',
    tagName: 'img',
    properties: { src: '/guide/x.png' },
    children: [],
  };
  run({ type: 'root', children: [node] }, DOCS_ES_5X);
  assert.equal(node.properties.src, '/guide/x.png');
});
