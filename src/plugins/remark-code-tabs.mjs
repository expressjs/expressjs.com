/**
 * Remark plugin that groups consecutive fenced code blocks tagged with a
 * `tab="<label>"` meta into a single `<CodeTabs>` element, so the same snippet
 * can be shown in multiple variants (e.g. CommonJS / ESM) behind a tab strip.
 *
 * Authoring — tag blocks explicitly with `tab="..."`:
 *
 *   ```js tab="CommonJS"
 *   const express = require('express')
 *   ```
 *
 *   ```js tab="ESM"
 *   import express from 'express'
 *   ```
 *
 * …or use `js` / `cjs` / `mjs` / `ts` fences. A run that includes `cjs`/`mjs`
 * becomes a CommonJS / ESM / TypeScript tab strip (`cjs`/`mjs` are rewritten to
 * `js` for highlighting). A plain `js` block immediately followed by a `ts`
 * block becomes a JavaScript / TypeScript tab strip. On their own, `js` and `ts`
 * never group, so unrelated snippets stay separate:
 *
 *   ```cjs
 *   const express = require('express')
 *   ```
 *
 *   ```mjs
 *   import express from 'express'
 *   ```
 *
 *   ```ts
 *   import express from 'express'
 *   ```
 *
 * Runs at the remark (mdast) stage — i.e. BEFORE expressive-code, which
 * processes code blocks later at the rehype stage. We only reorganize the tree
 * and leave the `code` nodes intact, so each block still gets full
 * expressive-code rendering (highlighting, copy button, …).
 *
 * MDX only. The plugin emits MDX constructs (an `mdxjsEsm` import and a JSX
 * `<CodeTabs>` element), so it is a no-op outside the MDX pipeline. In plain
 * `.md` files those nodes would be serialized as literal text (the import
 * would leak into the page) and the JSX wrapper cannot render, so the file is
 * left untouched there.
 *
 * The `tab="..."` token is stripped from each block's meta so expressive-code
 * never sees an unknown meta attribute. Labels are passed to the component as a
 * plain comma-separated string attribute (`tabs="CommonJS,ESM"`) to avoid
 * having to hand-build an estree for a JS expression attribute; only the
 * auto-injected import needs an estree, which has a fixed, simple shape.
 *
 * @see ../components/primitives/Tabs/CodeTabs.astro
 */

const TAB_RE = /\btab="([^"]+)"/;
// Fence languages that imply a tab label on their own, so these dialect fences
// group into tabs without an explicit `tab="..."` meta. Each maps to a tab
// label plus the language expressive-code should actually highlight as.
const LANG_TABS = {
  js: { label: 'JavaScript', lang: 'js' },
  cjs: { label: 'CommonJS', lang: 'js' },
  mjs: { label: 'ESM', lang: 'js' },
  ts: { label: 'TypeScript', lang: 'ts' },
};
// Langs that, on their own, justify forming a tab group. `js` and `ts` are
// normal standalone languages too, so neither triggers a group on its own —
// that way two unrelated `js` (or two `ts`) snippets never merge. A run only
// groups via a `cjs`/`mjs`, a `tab="..."` block, or a `js` + `ts` pair (see
// `hasJsTsPair`).
const TRIGGER_LANGS = new Set(['cjs', 'mjs']);
const COMPONENT_NAME = 'CodeTabs';
const COMPONENT_SOURCE = '@components/primitives/Tabs/CodeTabs.astro';

/** A code block's tab label, from a `tab="..."` meta or a dialect lang. */
function tabLabelOf(node) {
  const match = (node.meta || '').match(TAB_RE);
  if (match) return match[1];
  return LANG_TABS[node.lang]?.label ?? null;
}

function isTabBlock(node) {
  return node?.type === 'code' && tabLabelOf(node) !== null;
}

/** A block that, on its own, justifies grouping a run into tabs. */
function isTrigger(node) {
  return node?.type === 'code' && (TAB_RE.test(node.meta || '') || TRIGGER_LANGS.has(node.lang));
}

/**
 * A run that pairs a JavaScript block with a TypeScript one (the plain
 * `js` + `ts` case). Checked on the original fence langs, before `cjs`/`mjs`
 * are rewritten to `js`, so a `cjs`/`mjs` run is never mistaken for this.
 */
function hasJsTsPair(run) {
  return run.some((node) => node.lang === 'js') && run.some((node) => node.lang === 'ts');
}

/**
 * Returns the tab label and normalizes the node so expressive-code sees a plain
 * block. The two concerns are handled independently so every other meta token
 * survives: the `tab="..."` token (and only it) is stripped from the meta, and a
 * `cjs`/`mjs`/`ts` dialect lang is rewritten for highlighting — even when both
 * apply to the same block (e.g. ```cjs tab="Foo" title="index.cjs"```).
 */
function consumeTabBlock(node) {
  const meta = node.meta || '';
  const tabMatch = meta.match(TAB_RE);
  if (tabMatch) {
    // Drop only `tab="..."`; keep title=, {N}, /regex/, etc. intact.
    node.meta = meta.replace(TAB_RE, ' ').replace(/\s+/g, ' ').trim() || null;
  }
  const dialect = LANG_TABS[node.lang];
  if (dialect) node.lang = dialect.lang;
  return tabMatch ? tabMatch[1] : dialect.label;
}

/** Builds a plain string (or boolean) MDX JSX attribute. */
function jsxAttr(name, value) {
  return { type: 'mdxJsxAttribute', name, value };
}

/**
 * Wraps a run of code nodes into a `<CodeTabs>` element. Each block becomes a
 * `code-tabs__panel` div (all but the first hidden) passed through the default
 * slot — named slots can't take a dynamic name in an Astro component, so the
 * panel markup is built here where the order is known.
 */
function buildCodeTabs(labels, codeNodes) {
  return {
    type: 'mdxJsxFlowElement',
    name: COMPONENT_NAME,
    attributes: [jsxAttr('tabs', labels.join(','))],
    children: codeNodes.map((code, i) => ({
      type: 'mdxJsxFlowElement',
      name: 'div',
      attributes: [
        jsxAttr('class', 'code-tabs__panel'),
        jsxAttr('data-tabs-panel', `t${i}`),
        ...(i === 0 ? [] : [jsxAttr('hidden', null)]),
      ],
      children: [code],
    })),
  };
}

/** ESTree-backed `import CodeTabs from '...'` node for the MDX module scope. */
function buildImport() {
  return {
    type: 'mdxjsEsm',
    value: `import ${COMPONENT_NAME} from '${COMPONENT_SOURCE}';`,
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: { type: 'Identifier', name: COMPONENT_NAME },
              },
            ],
            source: {
              type: 'Literal',
              value: COMPONENT_SOURCE,
              raw: `'${COMPONENT_SOURCE}'`,
            },
            attributes: [],
          },
        ],
      },
    },
  };
}

/**
 * Replaces runs of tagged code blocks in `children` in place.
 * @returns {boolean} whether at least one group was created.
 */
function groupChildren(children) {
  let grouped = false;

  for (let i = 0; i < children.length; i++) {
    if (!isTabBlock(children[i])) continue;

    // Collect the contiguous run of tab-tagged `code` blocks (`tab="..."` or cjs/mjs).
    const run = [];
    let j = i;
    while (isTabBlock(children[j])) {
      run.push(children[j]);
      j++;
    }

    // Only a run of 2+ blocks with an unambiguous trigger (cjs/mjs or
    // `tab="..."`), or a plain `js` + `ts` pair, becomes tabs. A run of only
    // `js` (or only `ts`) blocks is left alone so unrelated snippets never merge.
    if (run.length >= 2 && (run.some(isTrigger) || hasJsTsPair(run))) {
      const labels = run.map(consumeTabBlock);
      children.splice(i, run.length, buildCodeTabs(labels, run));
      grouped = true;
      // `i` now points at the new wrapper; the loop's i++ skips past it.
    } else {
      run.forEach(consumeTabBlock);
      i = j - 1; // skip past the whole run
    }
  }

  return grouped;
}

/** Recursively walks the tree, grouping tagged code blocks at every level. */
function walk(node) {
  let grouped = false;
  if (Array.isArray(node.children)) {
    grouped = groupChildren(node.children) || grouped;
    for (const child of node.children) {
      grouped = walk(child) || grouped;
    }
  }
  return grouped;
}

function hasComponentImport(tree) {
  return tree.children.some(
    (node) =>
      node.type === 'mdxjsEsm' &&
      typeof node.value === 'string' &&
      node.value.includes(`import ${COMPONENT_NAME} `)
  );
}

export default function remarkCodeTabs() {
  return (tree, file) => {
    const isMdxFile =
      file?.extname === '.mdx' ||
      (typeof file?.path === 'string' && file.path.toLowerCase().endsWith('.mdx'));
    if (!isMdxFile) return;

    const grouped = walk(tree);
    if (grouped && !hasComponentImport(tree)) {
      tree.children.unshift(buildImport());
    }
  };
}
