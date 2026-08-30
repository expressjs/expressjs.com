import { visit, SKIP } from 'unist-util-visit';

/**
 * Rehype plugin that makes tables responsive and add accessibility attributes:
 * - Wraps each <table> in a <div class="table-scroller"> for horizontal scroll on small viewports
 * - Adds scope="col" to <th> inside <thead>
 * - Adds scope="row" to <th> inside <tbody>
 */
export default function rehypeAccessibleTables() {
  return (tree) => {
    const isTableNode = (node) =>
      (node.type === 'element' && node.tagName === 'table') ||
      ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
        node.name === 'table');

    const isThNode = (node) =>
      (node.type === 'element' && node.tagName === 'th') ||
      ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'th');

    const parentAlreadyWrapped = (parent) =>
      !!parent &&
      parent.type === 'element' &&
      parent.tagName === 'div' &&
      parent.properties?.className?.includes('table-scroller');

    const hasScope = (node) =>
      !!node?.properties?.scope ||
      !!node?.attributes?.some((attr) => attr?.name === 'scope');

    const setScope = (node, value) => {
      if (node.type === 'element') {
        node.properties ??= {};
        node.properties.scope = value;
        return;
      }

      node.attributes ??= [];
      if (!node.attributes.some((attr) => attr?.name === 'scope')) {
        node.attributes.push({ type: 'mdxJsxAttribute', name: 'scope', value });
      }
    };

    const sectionScopeByTag = {
      thead: 'col',
      tbody: 'row',
    };

    const checks = ['element', 'mdxJsxFlowElement', 'mdxJsxTextElement'];

    visit(tree, checks, (node, index, parent) => {
      const sectionScope =
        (node.type === 'element' && sectionScopeByTag[node.tagName]) ||
        ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
          sectionScopeByTag[node.name]);

      if (sectionScope) {
        visit(node, checks, (th) => {
          if (isThNode(th) && !hasScope(th)) {
            setScope(th, sectionScope);
          }
        });
      }

      if (!isTableNode(node)) return;
      if (!parent || index == null || !Array.isArray(parent.children)) return;
      if (parentAlreadyWrapped(parent)) return;

      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroller'] },
        children: [node],
      };

      parent.children.splice(index, 1, wrapper);
      return [SKIP, index + 1];
    });
  };
}

