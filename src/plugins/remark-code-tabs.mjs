/**
 * Remark plugin that groups consecutive fenced code blocks tagged with a
 * `tab="<label>"` meta into a single `<CodeTabs>` element, so the same snippet
 * can be shown in multiple variants (e.g. CommonJS / ESM) behind a tab strip.
 *
 * Authoring:
 *
 *   ```js tab="CommonJS"
 *   const express = require('express')
 *   ```
 *
 *   ```js tab="ESM"
 *   import express from 'express'
 *   ```
 *
 * Runs at the remark (mdast) stage — i.e. BEFORE expressive-code, which
 * processes code blocks later at the rehype stage. We only reorganize the tree
 * and leave the `code` nodes intact, so each block still gets full
 * expressive-code rendering (highlighting, copy button, …).
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
const COMPONENT_NAME = 'CodeTabs';
const COMPONENT_SOURCE = '@components/primitives/Tabs/CodeTabs.astro';

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
    const node = children[i];
    if (node.type !== 'code' || !TAB_RE.test(node.meta || '')) continue;

    // Collect the contiguous run of `code` blocks carrying a `tab="..."` meta.
    const run = [];
    let j = i;
    while (children[j]?.type === 'code' && TAB_RE.test(children[j].meta || '')) {
      run.push(children[j]);
      j++;
    }

    // A lone tagged block is not a tab group; just clean its meta and move on.
    if (run.length < 2) {
      node.meta = (node.meta || '').replace(TAB_RE, '').trim() || null;
      continue;
    }

    const labels = run.map((code) => {
      const label = code.meta.match(TAB_RE)[1];
      code.meta = code.meta.replace(TAB_RE, '').trim() || null;
      return label;
    });

    children.splice(i, run.length, buildCodeTabs(labels, run));
    grouped = true;
    // `i` now points at the new wrapper; the loop's i++ skips past it.
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
  return (tree) => {
    const grouped = walk(tree);
    if (grouped && !hasComponentImport(tree)) {
      tree.children.unshift(buildImport());
    }
  };
}
