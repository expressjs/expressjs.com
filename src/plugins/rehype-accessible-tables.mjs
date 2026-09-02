import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that:
 * - Wraps each <table> in <div class="table-scroller">
 * - Adds scope="col" to <th> in <thead>
 * - Adds scope="row" to <th> in <tbody>
 *
 * Supports both regular HAST elements and MDX JSX elements.
 */
export default function rehypeAccessibleTables() {
  return (tree) => {
    const isSupportedNode = (node) =>
      node?.type === 'element' ||
      node?.type === 'mdxJsxFlowElement' ||
      node?.type === 'mdxJsxTextElement';

    const getTagName = (node) => {
      if (!isSupportedNode(node)) {
        return null;
      }

      return node.type === 'element' ? node.tagName : node.name;
    };

    const isTable = (node) => getTagName(node) === 'table';
    const isThead = (node) => getTagName(node) === 'thead';
    const isTbody = (node) => getTagName(node) === 'tbody';
    const isTr = (node) => getTagName(node) === 'tr';
    const isTh = (node) => getTagName(node) === 'th';

    const hasScope = (node) => {
      // HAST and MDX store attributes differently.
      if (node.type === 'element') {
        return node.properties?.scope != null;
      }

      return node.attributes?.some((attribute) => attribute?.name === 'scope');
    };

    const setScope = (node, scope) => {
      // add the attribute differently depending on the node type.
      if (node.type === 'element') {
        node.properties ??= {};
        node.properties.scope = scope;
        return;
      }

      node.attributes ??= [];

      if (!node.attributes.some((attribute) => attribute?.name === 'scope')) {
        node.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'scope',
          value: scope,
        });
      }
    };

    const isTableScroller = (node) =>
      node?.type === 'element' &&
      node.tagName === 'div' &&
      Array.isArray(node.properties?.className) &&
      node.properties.className.includes('table-scroller');

    /*
     * Remember which <tr> belongs to <thead> or <tbody>.
     *
     * don't modify the tree during this pass.
     * creating a little lookup table:
     * <tr object> → "col"
     * <tr object> → "row
     */
    const rowScopes = new WeakMap();

    visit(tree, ['element', 'mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      let scope;

      if (isThead(node)) {
        scope = 'col';
      } else if (isTbody(node)) {
        scope = 'row';
      }

      if (!scope || !Array.isArray(node.children)) {
        return;
      }

      for (const child of node.children) {
        if (isTr(child)) {
          rowScopes.set(child, scope);
        }
      }
    });

    /*
     * Add scope to <th>.
     *
     * In a normal HTML table:
     *
     * <thead>/<tbody>
     *   └── <tr>
     *        └── <th>
     *
     * Therefore the parent of <th> is the <tr> we recorded above.
     */
    visit(tree, ['element', 'mdxJsxFlowElement', 'mdxJsxTextElement'], (node, index, parent) => {
      if (!isTh(node) || !parent || hasScope(node)) {
        return;
      }

      const scope = rowScopes.get(parent);

      if (scope) {
        setScope(node, scope);
      }
    });

    /*
     * lastly Wrap every table:
     *
     * <div class="table-scroller">
     *   <table>...</table>
     * </div>
     */
    visit(tree, ['element', 'mdxJsxFlowElement', 'mdxJsxTextElement'], (node, index, parent) => {
      if (!isTable(node)) {
        return;
      }

      if (!parent || index == null || !Array.isArray(parent.children)) {
        return;
      }

      if (isTableScroller(parent)) {
        return;
      }

      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-scroller'],
        },
        children: [node],
      };

      parent.children.splice(index, 1, wrapper);

      /*
       * Don't continue traversing into the table after moving it.
       * Scope processing has already happened in the previous passes.
       */
      return;
    });
  };
}
