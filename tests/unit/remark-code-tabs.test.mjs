import assert from 'node:assert/strict';
import { test } from 'node:test';

import remarkCodeTabs from '../../src/plugins/remark-code-tabs.mjs';

function code(lang, meta = null, value = '') {
  return { type: 'code', lang, meta, value };
}

function run(children) {
  const tree = { type: 'root', children };
  remarkCodeTabs()(tree);
  return tree;
}

function findTabs(tree) {
  return tree.children.find((n) => n.name === 'CodeTabs');
}

function labelsOf(tabs) {
  return tabs.attributes.find((a) => a.name === 'tabs')?.value;
}

function panelLangs(tabs) {
  return tabs.children.map((panel) => panel.children[0].lang);
}

function hasImport(tree) {
  return tree.children.some(
    (n) =>
      n.type === 'mdxjsEsm' && typeof n.value === 'string' && n.value.includes('import CodeTabs')
  );
}

test('groups consecutive cjs/mjs/ts fences into one CodeTabs', () => {
  const tree = run([
    code('cjs', null, "var e = require('express')"),
    code('mjs', null, "import e from 'express'"),
    code('ts', null, "import e from 'express'"),
  ]);

  const tabs = findTabs(tree);
  assert.ok(tabs, 'a CodeTabs element is created');
  assert.equal(labelsOf(tabs), 'CommonJS,ESM,TypeScript');
  assert.equal(tabs.children.length, 3);
});

test('normalizes panel langs for highlighting (cjs/mjs -> js, ts stays ts)', () => {
  const tree = run([code('cjs'), code('mjs'), code('ts')]);
  assert.deepEqual(panelLangs(findTabs(tree)), ['js', 'js', 'ts']);
});

test('hides every panel except the first', () => {
  const tabs = findTabs(run([code('cjs'), code('mjs')]));
  const isHidden = (panel) => panel.attributes.some((a) => a.name === 'hidden');
  assert.equal(isHidden(tabs.children[0]), false);
  assert.equal(isHidden(tabs.children[1]), true);
});

test('injects the CodeTabs import once, only when something is grouped', () => {
  const tree = run([code('cjs'), code('mjs')]);
  assert.ok(hasImport(tree));
  assert.equal(tree.children.filter((n) => n.type === 'mdxjsEsm').length, 1);
});

test('does not inject the import when nothing is grouped', () => {
  const tree = run([code('js', null, 'const a = 1')]);
  assert.equal(hasImport(tree), false);
  assert.equal(findTabs(tree), undefined);
});

test('does NOT group two standalone ts blocks (ts needs a cjs/mjs trigger)', () => {
  const tree = run([code('ts', null, 'const a = 1'), code('ts', null, 'const b = 2')]);
  assert.equal(findTabs(tree), undefined);
  assert.deepEqual(
    tree.children.map((n) => n.lang),
    ['ts', 'ts']
  );
});

test('ts joins a run led by a cjs/mjs trigger', () => {
  const tree = run([code('mjs'), code('ts')]);
  const tabs = findTabs(tree);
  assert.ok(tabs);
  assert.equal(labelsOf(tabs), 'ESM,TypeScript');
  assert.deepEqual(panelLangs(tabs), ['js', 'ts']);
});

test('a lone cjs block is not tabbed but its lang is normalized to js', () => {
  const tree = run([code('cjs', null, "require('x')")]);
  assert.equal(findTabs(tree), undefined);
  assert.equal(tree.children[0].lang, 'js');
});

test('still groups explicit tab="..." blocks and strips the tab meta', () => {
  const tree = run([code('js', 'tab="A"', '1'), code('js', 'tab="B"', '2')]);
  const tabs = findTabs(tree);
  assert.equal(labelsOf(tabs), 'A,B');
  assert.equal(tabs.children[0].children[0].meta, null);
  assert.equal(tabs.children[1].children[0].meta, null);
});

test('a lone tab="..." block is left as a normal code block with cleaned meta', () => {
  const tree = run([code('js', 'tab="Only"', '1')]);
  assert.equal(findTabs(tree), undefined);
  assert.equal(tree.children[0].type, 'code');
  assert.equal(tree.children[0].meta, null);
});

test('preserves other meta tokens while stripping tab="..."', () => {
  const tree = run([code('js', 'tab="A" title="x"', '1'), code('js', 'tab="B"', '2')]);
  assert.equal(findTabs(tree).children[0].children[0].meta, 'title="x"');
});

test('preserves a title="..." filename on cjs/mjs panels while normalizing lang', () => {
  const tabs = findTabs(
    run([code('cjs', 'title="index.cjs"'), code('mjs', 'title="index.mjs"')])
  );
  assert.deepEqual(panelLangs(tabs), ['js', 'js']);
  assert.equal(tabs.children[0].children[0].meta, 'title="index.cjs"');
  assert.equal(tabs.children[1].children[0].meta, 'title="index.mjs"');
});

test('strips only tab="..." but still normalizes a dialect lang and keeps other meta', () => {
  const tabs = findTabs(
    run([code('cjs', 'tab="Foo" title="index.cjs"'), code('mjs', 'title="index.mjs"')])
  );
  assert.equal(labelsOf(tabs), 'Foo,ESM');
  assert.deepEqual(panelLangs(tabs), ['js', 'js']);
  assert.equal(tabs.children[0].children[0].meta, 'title="index.cjs"');
});

test('groups tab blocks nested inside other container nodes', () => {
  const inner = { type: 'blockquote', children: [code('cjs'), code('mjs')] };
  const tree = run([inner]);
  assert.ok(findTabs(inner), 'grouped inside the nested container');
  assert.ok(hasImport(tree), 'import is added to the document root');
});

test('handles multiple separate tab groups in the same document', () => {
  const tree = run([
    code('cjs'),
    code('mjs'),
    { type: 'paragraph', children: [] },
    code('cjs'),
    code('mjs'),
  ]);
  assert.equal(tree.children.filter((n) => n.name === 'CodeTabs').length, 2);
  assert.equal(tree.children.filter((n) => n.type === 'mdxjsEsm').length, 1);
});
