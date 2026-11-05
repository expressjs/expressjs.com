const sections = {
  express: 'express',
  app: 'application',
  req: 'request',
  res: 'response',
  router: 'router',
};

/**
 * Route a legacy API fragment to its section, keeping the original fragment.
 * The destination pages contain explicit legacy anchors, including overloads
 * such as app.get (setting) and app.get.method (route).
 * @param {string} href
 * @returns {string | undefined}
 */
export function getLegacyApiTarget(href) {
  const target = new URL(href);
  if (!/\/api\/?$/.test(target.pathname)) return;

  let fragment;
  try {
    fragment = decodeURIComponent(target.hash.slice(1));
  } catch {
    return;
  }

  const prefix = fragment.split('.')[0];
  const section =
    fragment === 'example.of.express.static'
      ? 'express'
      : Object.hasOwn(sections, prefix)
        ? sections[prefix]
        : undefined;
  if (!section) return;

  target.pathname = `${target.pathname.replace(/\/$/, '')}/${section}/`;
  return target.href;
}
