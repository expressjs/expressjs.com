import { visit, SKIP } from 'unist-util-visit';

/**
 * Rehype plugin that makes tables responsive and accessible:
 * - Wraps each <table> in a <div class="table-scroller"> for horizontal scroll on small viewports
 * - Adds scope="col" to <th> inside <thead>
 * - Adds scope="row" to <th> inside <tbody>
 */
export function rehypeAccessibleTables() {
  return (tree) => {
    // Add scope="col" to th elements inside thead
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'thead') return;
      visit(node, 'element', (th) => {
        if (th.tagName === 'th' && !th.properties.scope) {
          th.properties.scope = 'col';
        }
      });
    });

    // Add scope="row" to th elements inside tbody
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'tbody') return;
      visit(node, 'element', (th) => {
        if (th.tagName === 'th' && !th.properties.scope) {
          th.properties.scope = 'row';
        }
      });
    });

    // Wrap tables in a scrollable container
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table') return;
      if (!parent || index == null) return;

      // Skip if already wrapped
      if (parent.tagName === 'div' && parent.properties?.className?.includes('table-scroller'))
        return;

      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroller'] },
        children: [node],
      };

      parent.children.splice(index, 1, wrapper);
      // Skip the inserted wrapper so we don't revisit the table inside it
      return [SKIP, index + 1];
    });
  };
}

/**
 * Astro integration wrapper — registers rehypeAccessibleTables after
 * astro-expressive-code has already added its own rehype plugin, so
 * the two don't interfere with each other in the pipeline.
 */
export function accessibleTablesIntegration() {
  return {
    name: 'rehype-accessible-tables',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            rehypePlugins: [rehypeAccessibleTables],
          },
        });
      },
    },
  };
}
