/**
 * Remark plugin that localizes internal links in Markdown/MDX content.
 *
 * Operates on Markdown `link` and `definition` nodes. Raw HTML/JSX
 * (`<a href="...">`) inside MDX is handled by the rehype counterpart instead.
 * See `rewrite-localized-links-core.mjs` for the shared localization rules.
 *
 * @see ./rehype-rewrite-localized-links.mjs
 */

import {
  deriveContextFromFile,
  resolveOptions,
  rewriteUrl,
  walkTree,
} from './rewrite-localized-links-core.mjs';

/**
 * Remark plugin factory.
 *
 * @param {import('./rewrite-localized-links-core.mjs').LocalizeLinksOptions} [options]
 */
export default function remarkRewriteLocalizedLinks(options = {}) {
  const config = resolveOptions(options);

  return (tree, file) => {
    const context = deriveContextFromFile(file?.path, config.defaultLang);

    walkTree(tree, (node) => {
      if (node.type === 'link' || node.type === 'definition') {
        node.url = rewriteUrl(node.url, context, config);
      }
    });
  };
}
