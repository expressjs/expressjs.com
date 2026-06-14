/**
 * Shared core for the link-localization plugins.
 *
 * Authors write language-agnostic internal links (e.g. `/guide/routing`,
 * `/5x/api/express`, `/resources/middleware`) and these helpers turn them into
 * links scoped to the source file's language, so every page links within its own
 * language. The same logic backs both the remark plugin (Markdown link nodes)
 * and the rehype plugin (HTML `<a href>` elements).
 *
 * Rules:
 * - Localizes only absolute internal paths whose target section matches a
 *   configured prefix (e.g. `/guide/...`, `/api/...`, `/resources/...`).
 * - Sections listed in `versionedSections` (e.g. `api`, `starter`) keep an
 *   explicit version, or get one injected when the link omits it: the source
 *   file's own version (versioned collections like docs/api), otherwise the
 *   latest version (`defaultVersion`) for unversioned collections (pages/blog).
 * - Other sections (e.g. `guide`, `advanced`) drop any version segment and point
 *   to the latest, since their content is also served at unversioned URLs.
 * - Preserves query string and hash fragments.
 * - Skips already-localized paths (e.g. `/en/...`), external URLs, relative
 *   paths and pure-hash anchors.
 */

/**
 * @typedef {Object} LocalizeLinksOptions
 * @property {string[]} [prefixes=['guide']] Target sections that should be localized.
 * @property {string} [defaultLang='en'] Language used when it cannot be inferred from the source path.
 * @property {string} [defaultVersion='5x'] Latest version, injected into versioned-section links
 *   authored in unversioned collections (pages/blog).
 * @property {string[]} [versionedSections=[]] Sections (e.g. `api`, `starter`) whose links get a
 *   version injected when the link omits one. Explicit versions are always preserved.
 */

/**
 * @typedef {Object} RewriteContext
 * @property {string} lang Language inferred from the source path or fallback.
 * @property {string|undefined} version Version inferred from the source path, when present.
 */

/** Marker that precedes the collection name in any content source path. */
const CONTENT_MARKER = '/src/content/';

/**
 * Collections whose source path has no language segment because the content is
 * shared across all languages (rendered under every `/{lang}/` route):
 * - `api` is version-first (`api/5x/api/express.mdx`).
 * - `blog` is flat (`blog/2024-10-15-v5-release.md`).
 *
 * For these the language falls back to the default.
 */
const SHARED_COLLECTIONS = new Set(['api', 'blog']);

/**
 * Validates whether a path segment matches version format (e.g. `5x`, `4x`).
 * @param {string} value
 */
function isVersionSegment(value) {
  return /^\d+x$/.test(value || '');
}

/**
 * Splits URL into pathname and suffix (`?query#hash`).
 * @param {string} url
 */
function splitPathAndSuffix(url) {
  const match = url.match(/^([^?#]*)(.*)$/);
  if (!match) {
    return { pathname: url, suffix: '' };
  }

  return {
    pathname: match[1],
    suffix: match[2] || '',
  };
}

/**
 * Checks whether pathname already starts with language code (e.g. `/en/...`, `/pt-br/...`).
 * @param {string} pathname
 */
function hasLanguagePrefix(pathname) {
  return /^\/[a-z]{2}(?:-[a-z]{2})?(?:\/|$)/i.test(pathname);
}

/**
 * Adds trailing slash for non-file paths.
 * @param {string} pathname
 */
function ensureTrailingSlash(pathname) {
  if (pathname.endsWith('/')) {
    return pathname;
  }

  if (/\.[a-z\d]+$/i.test(pathname)) {
    return pathname;
  }

  return `${pathname}/`;
}

/**
 * Normalizes plugin options into ready-to-use lookup sets and defaults.
 * @param {LocalizeLinksOptions} [options]
 */
export function resolveOptions(options = {}) {
  const {
    prefixes = ['guide'],
    defaultLang = 'en',
    defaultVersion = '5x',
    versionedSections = [],
  } = options;

  return {
    prefixesSet: new Set(prefixes),
    versionedSectionsSet: new Set(versionedSections),
    defaultLang,
    defaultVersion,
  };
}

/**
 * Derives the language and version from the source file path.
 *
 * Expected path examples:
 * - `/.../src/content/docs/en/5x/guide/routing.md`  → { lang: en, version: 5x }
 * - `/.../src/content/pages/es/guide/routing.md`    → { lang: es }
 * - `/.../src/content/api/5x/api/express/index.mdx` → { lang: defaultLang, version: 5x }
 * - `/.../src/content/blog/2024-10-15-v5-release.md`  → { lang: defaultLang }
 *
 * @param {string|undefined} filePath
 * @param {string} defaultLang
 * @returns {RewriteContext}
 */
export function deriveContextFromFile(filePath, defaultLang) {
  const normalizedPath = (filePath || '').replaceAll('\\', '/');
  const markerIndex = normalizedPath.indexOf(CONTENT_MARKER);

  if (markerIndex === -1) {
    return { lang: defaultLang, version: undefined };
  }

  const relativePath = normalizedPath.slice(markerIndex + CONTENT_MARKER.length);
  const [collection, ...segments] = relativePath.split('/').filter(Boolean);

  // Shared collections (api, blog) carry no language segment. `api` is
  // version-first (`api/5x/...`); `blog` is flat (no version).
  if (SHARED_COLLECTIONS.has(collection)) {
    return {
      lang: defaultLang,
      version: isVersionSegment(segments[0]) ? segments[0] : undefined,
    };
  }

  // Language-first collections (docs, pages): `{lang}/[version]/...`.
  return {
    lang: segments[0] || defaultLang,
    version: isVersionSegment(segments[1]) ? segments[1] : undefined,
  };
}

/**
 * Localizes a URL when it matches the rules, otherwise returns the original value.
 *
 * @param {string} url
 * @param {RewriteContext} context
 * @param {Set<string>} prefixesSet
 * @param {Set<string>} versionedSectionsSet
 * @param {string} defaultVersion
 */
export function rewriteUrl(url, context, prefixesSet, versionedSectionsSet, defaultVersion) {
  if (typeof url !== 'string' || !url) {
    return url;
  }

  const { pathname, suffix } = splitPathAndSuffix(url);

  if (!pathname || pathname === '/' || pathname.startsWith('#')) {
    return url;
  }

  if (!pathname.startsWith('/') || hasLanguagePrefix(pathname)) {
    return url;
  }

  const segments = pathname.replace(/^\/+/, '').split('/');
  const hasVersion = isVersionSegment(segments[0]);
  const section = hasVersion ? segments[1] : segments[0];

  if (!prefixesSet.has(section)) {
    return url;
  }

  // Path without the (optional) leading version segment.
  const rest = hasVersion ? segments.slice(1) : segments;

  let versionPrefix = '';
  if (versionedSectionsSet.has(section)) {
    const version = hasVersion ? segments[0] : context.version || defaultVersion;
    if (version) {
      versionPrefix = `/${version}`;
    }
  }

  const localized = ensureTrailingSlash(
    `/${context.lang}${versionPrefix}/${rest.join('/')}`.replace(/\/+/g, '/')
  );
  return `${localized}${suffix}`;
}

/**
 * Generic depth-first AST traversal utility (works for both mdast and hast).
 * @param {any} node
 * @param {(node: any) => void} visitor
 */
export function walkTree(node, visitor) {
  if (!node || typeof node !== 'object') {
    return;
  }

  visitor(node);

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walkTree(child, visitor);
    }
  }
}
