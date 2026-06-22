/**
 * Rehype plugin that localizes internal links written as raw HTML/JSX anchors
 * (`<a href="...">`) in MDX content — the cases the remark plugin cannot handle,
 * such as anchors wrapping JSX components (`<a><Card/></a>`) or links inside raw
 * HTML blocks.
 *
 * In MDX these anchors are not plain hast elements: they are MDX JSX nodes
 * (`mdxJsxFlowElement` / `mdxJsxTextElement` with `name === 'a'`), whose `href`
 * lives in `node.attributes`. This plugin handles both those and standard hast
 * `<a>` elements. See `rewrite-localized-links-core.mjs` for the shared rules.
 *
 * @see ./remark-rewrite-localized-links.mjs
 */

import {
  deriveContextFromFile,
  resolveOptions,
  rewriteUrl,
  walkTree,
} from './rewrite-localized-links-core.mjs';

/**
 * Finds the string-valued `href` attribute of an MDX JSX anchor node.
 * @param {any} node
 */
function findMdxHrefAttribute(node) {
  if (!Array.isArray(node.attributes)) {
    return null;
  }

  const attr = node.attributes.find(
    (a) => a && a.type === 'mdxJsxAttribute' && a.name === 'href' && typeof a.value === 'string'
  );

  return attr || null;
}

/**
 * Rehype plugin factory.
 *
 * @param {import('./rewrite-localized-links-core.mjs').LocalizeLinksOptions} [options]
 */
export default function rehypeRewriteLocalizedLinks(options = {}) {
  const config = resolveOptions(options);

  return (tree, file) => {
    const context = deriveContextFromFile(file?.path, config.defaultLang);
    const localize = (url) => rewriteUrl(url, context, config);

    walkTree(tree, (node) => {
      // Standard hast anchor (from Markdown or raw HTML in plain `.md`).
      if (
        node.type === 'element' &&
        node.tagName === 'a' &&
        typeof node.properties?.href === 'string'
      ) {
        node.properties.href = localize(node.properties.href);
        return;
      }

      // MDX JSX anchor: `<a href="...">` authored in `.mdx`.
      if (
        (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
        node.name === 'a'
      ) {
        const attr = findMdxHrefAttribute(node);
        if (attr) {
          attr.value = localize(attr.value);
        }
      }
    });
  };
}
