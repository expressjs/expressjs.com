import assert from 'node:assert/strict';
import test from 'node:test';

import rehypeAccessibleTables from '../../src/plugins/rehype-accessible-tables.mjs';

test('wraps mdx raw HTML tables in a responsive scroller', () => {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'mdxJsxFlowElement',
        name: 'table',
        attributes: [],
        children: [
          {
            type: 'mdxJsxTextElement',
            name: 'thead',
            attributes: [],
            children: [
              {
                type: 'mdxJsxTextElement',
                name: 'tr',
                attributes: [],
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };

  rehypeAccessibleTables()(tree);

  assert.equal(tree.children[0].type, 'element');
  assert.equal(tree.children[0].tagName, 'div');
  assert.deepEqual(tree.children[0].properties.className, ['table-scroller']);
  assert.equal(tree.children[0].children[0].type, 'mdxJsxFlowElement');
});
