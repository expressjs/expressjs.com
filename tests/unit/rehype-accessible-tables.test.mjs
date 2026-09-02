import assert from 'node:assert/strict';

import test from 'node:test';

import rehypeAccessibleTables from '../../src/plugins/rehype-accessible-tables.mjs';

test('wraps mdx JSX tables in a responsive scroller', () => {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'mdxJsxFlowElement',
        name: 'table',
        attributes: [],
        children: [
          {
            type: 'mdxJsxFlowElement',
            name: 'thead',
            attributes: [],
            children: [
              {
                type: 'mdxJsxFlowElement',
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
  assert.equal(tree.children[0].children[0].name, 'table');
});

test('adds scope="col" to MDX JSX table headers in thead', () => {
  const th = {
    type: 'mdxJsxTextElement',
    name: 'th',
    attributes: [],
    children: [],
  };

  const tree = {
    type: 'root',
    children: [
      {
        type: 'mdxJsxFlowElement',
        name: 'table',
        attributes: [],
        children: [
          {
            type: 'mdxJsxFlowElement',
            name: 'thead',
            attributes: [],
            children: [
              {
                type: 'mdxJsxFlowElement',
                name: 'tr',
                attributes: [],
                children: [th],
              },
            ],
          },
        ],
      },
    ],
  };

  rehypeAccessibleTables()(tree);

  assert.deepEqual(th.attributes, [
    {
      type: 'mdxJsxAttribute',
      name: 'scope',
      value: 'col',
    },
  ]);
});

test('adds scope="row" to MDX JSX table headers in tbody', () => {
  const th = {
    type: 'mdxJsxTextElement',
    name: 'th',
    attributes: [],
    children: [],
  };

  const tree = {
    type: 'root',
    children: [
      {
        type: 'mdxJsxFlowElement',
        name: 'table',
        attributes: [],
        children: [
          {
            type: 'mdxJsxFlowElement',
            name: 'tbody',
            attributes: [],
            children: [
              {
                type: 'mdxJsxFlowElement',
                name: 'tr',
                attributes: [],
                children: [th],
              },
            ],
          },
        ],
      },
    ],
  };

  rehypeAccessibleTables()(tree);

  assert.deepEqual(th.attributes, [
    {
      type: 'mdxJsxAttribute',
      name: 'scope',
      value: 'row',
    },
  ]);
});

test('preserves an existing scope attribute', () => {
  const th = {
    type: 'mdxJsxTextElement',
    name: 'th',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'scope',
        value: 'colgroup',
      },
    ],
    children: [],
  };

  const tree = {
    type: 'root',
    children: [
      {
        type: 'mdxJsxFlowElement',
        name: 'table',
        attributes: [],
        children: [
          {
            type: 'mdxJsxFlowElement',
            name: 'thead',
            attributes: [],
            children: [
              {
                type: 'mdxJsxFlowElement',
                name: 'tr',
                attributes: [],
                children: [th],
              },
            ],
          },
        ],
      },
    ],
  };

  rehypeAccessibleTables()(tree);

  assert.deepEqual(th.attributes, [
    {
      type: 'mdxJsxAttribute',
      name: 'scope',
      value: 'colgroup',
    },
  ]);
});

test('wraps regular HAST HTML tables in a responsive scroller', () => {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'table',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'thead',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'tr',
                properties: {},
                children: [
                  {
                    type: 'element',
                    tagName: 'th',
                    properties: {},
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  rehypeAccessibleTables()(tree);

  const wrapper = tree.children[0];
  const table = wrapper.children[0];
  const th = table.children[0].children[0].children[0];

  assert.equal(wrapper.type, 'element');
  assert.equal(wrapper.tagName, 'div');
  assert.deepEqual(wrapper.properties.className, ['table-scroller']);
  assert.equal(table.tagName, 'table');
  assert.equal(th.properties.scope, 'col');
});

test('adds scope="row" to regular HAST HTML table headers in tbody', () => {
  const th = {
    type: 'element',
    tagName: 'th',
    properties: {},
    children: [],
  };

  const tree = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'table',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'tbody',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'tr',
                properties: {},
                children: [th],
              },
            ],
          },
        ],
      },
    ],
  };

  rehypeAccessibleTables()(tree);

  assert.equal(th.properties.scope, 'row');
});

test('wraps multiple tables independently', () => {
  const createTable = () => ({
    type: 'element',
    tagName: 'table',
    properties: {},
    children: [],
  });

  const tree = {
    type: 'root',
    children: [createTable(), createTable()],
  };

  rehypeAccessibleTables()(tree);

  assert.equal(tree.children.length, 2);

  for (const child of tree.children) {
    assert.equal(child.type, 'element');
    assert.equal(child.tagName, 'div');
    assert.deepEqual(child.properties.className, ['table-scroller']);
    assert.equal(child.children[0].tagName, 'table');
  }
});

test('does not double-wrap an already wrapped table', () => {
  const table = {
    type: 'element',
    tagName: 'table',
    properties: {},
    children: [],
  };

  const tree = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-scroller'],
        },
        children: [table],
      },
    ],
  };

  rehypeAccessibleTables()(tree);

  const wrapper = tree.children[0];

  assert.equal(wrapper.tagName, 'div');
  assert.deepEqual(wrapper.properties.className, ['table-scroller']);
  assert.equal(wrapper.children.length, 1);
  assert.equal(wrapper.children[0].tagName, 'table');
});
