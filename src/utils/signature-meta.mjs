// `<Signature>` and `<Param>` carry API metadata (added-in version, deprecation,
// runtime requirements, types, defaults) as JSX attributes, which plain-text and
// llms.txt exports would otherwise discard along with the tags. This rewrites each
// opening tag into the same plain-text sentences the component renders, so the
// metadata stays readable next to the member's heading.

// Attribute values may contain `>` inside quotes or braces (e.g.
// `runtime={{ 'Node.js': '>=22.2.0' }}`), so tag matching can't stop at the
// first `>`.
export const JSX_ATTRS = `(?:"[^"]*"|'[^']*'|\\{(?:[^{}]|\\{[^{}]*\\})*\\}|[^>"'{])*`;

// Also matches the component's slot markers, so their section titles ("Arguments",
// "Properties", "Returns") survive as text.
const JSX_META_TAG = new RegExp(
  `<(Signature|Param)\\b(${JSX_ATTRS})\\/?>|<Fragment\\s+slot=["'](attributes|properties|returns)["']\\s*>`,
  'g'
);

/**
 * @param {string} attrs
 * @param {string} name
 * @returns {string | undefined}
 */
const getAttr = (attrs, name) => {
  const match = attrs.match(new RegExp(`(?:^|\\s)${name}=(?:"([^"]*)"|'([^']*)')`));
  return match ? (match[1] ?? match[2]) : undefined;
};

/**
 * @param {string} attrs
 * @param {string} name
 * @returns {boolean}
 */
const hasFlag = (attrs, name) => new RegExp(`(?:^|\\s)${name}(?=\\s|$)`).test(attrs);

/**
 * Replace `<Signature>`/`<Param>` opening tags with the sentences the component
 * renders ("Added in v4.16.0.", "options (Object, optional):", …).
 *
 * @param {string} content
 * @returns {string}
 */
export const signatureMetaToText = (content) => {
  // Title for the next `attributes` slot; set by the enclosing Signature's
  // `attributesTitle` prop. Matches are visited in document order, so the
  // Signature opening tag is always seen before its slots.
  let attributesTitle = 'Arguments';
  return content.replace(JSX_META_TAG, (tag, component, attrs, slot, offset, source) => {
    // Keep the tag's own indentation, which mirrors the nesting depth in the
    // source, so replacements stay visually grouped under their section.
    const lineStart = source.lastIndexOf('\n', offset - 1) + 1;
    const beforeTag = source.slice(lineStart, offset);
    const indent = /^[ \t]*$/.test(beforeTag) ? beforeTag : '';

    if (slot) {
      const title =
        slot === 'attributes' ? attributesTitle : slot === 'properties' ? 'Properties' : 'Returns';
      return `\n\n${indent}${title}:\n\n`;
    }

    const since = getAttr(attrs, 'since');
    const deprecated = getAttr(attrs, 'deprecated');

    if (component === 'Param') {
      const name = getAttr(attrs, 'name');
      if (!name) return tag;
      const details = [
        getAttr(attrs, 'type'),
        hasFlag(attrs, 'optional') && 'optional',
        getAttr(attrs, 'default') && `default: ${getAttr(attrs, 'default')}`,
        since && `added in ${since}`,
        deprecated && `deprecated in ${deprecated}`,
      ].filter(Boolean);
      return `\n\n${indent}- ${name}${details.length ? ` (${details.join(', ')})` : ''}:\n\n`;
    }

    attributesTitle = getAttr(attrs, 'attributesTitle') ?? 'Arguments';
    const runtime = [...attrs.matchAll(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/g)]
      .map(([, engine, constraint]) => `${engine} ${constraint}`)
      .join(', ');
    const lines = [
      getAttr(attrs, 'type') && `Type: ${getAttr(attrs, 'type')}.`,
      getAttr(attrs, 'returns') && `Returns: ${getAttr(attrs, 'returns')}.`,
      since && `Added in ${since}.`,
      deprecated && `Deprecated in ${deprecated}.`,
      runtime && `Requires runtime: ${runtime}.`,
    ].filter(Boolean);
    return lines.length ? `\n\n${lines.join(' ')}\n\n` : tag;
  });
};
