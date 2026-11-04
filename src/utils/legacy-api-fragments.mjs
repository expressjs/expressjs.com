/**
 * @param {Record<string, string>} targets
 * @param {string} section
 * @param {{ text: string, slug: string }[]} headings
 */
export function addLegacyApiTargets(targets, section, headings) {
  for (const heading of headings) {
    const member = heading.text.match(/^(express|app|req|res|router)(?:\.[\w-]+)*(?=\(|$)/)?.[0];
    if (member) targets[member] = `${section}/#${heading.slug}`;
    if (heading.text === 'Router()') targets.router = `${section}/#${heading.slug}`;
  }
}

/**
 * Resolve only known legacy members, preserving the overview's locale, version and query.
 * @param {string} href
 * @param {Record<string, string>} targets
 * @returns {string | undefined}
 */
export function getLegacyApiTarget(href, targets) {
  const target = new URL(href);
  let member;
  try {
    member = decodeURIComponent(target.hash.slice(1));
  } catch {
    return;
  }
  if (!Object.hasOwn(targets, member)) return;
  const [section, slug] = targets[member].split('/#');
  target.pathname = `${target.pathname.replace(/\/$/, '')}/${section}/`;
  target.hash = slug;
  return target.href;
}
