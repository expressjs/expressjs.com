/**
 * Remark plugin that rewrites selected internal links in Markdown/MDX content.
 *
 * Behavior summary:
 * - Rewrites only absolute internal paths that match configured prefixes
 *   (e.g. `/guide/...`, `/starter/...`, `/api/...`).
 * - Adds language segment from file path context.
 * - Adds docs version segment for configured collections (by default: `docs`).
 * - Preserves query string and hash fragments.
 * - Skips already-localized paths (e.g. `/en/...`).
 */

/**
 * @typedef {Object} RewriteContext
 * @property {string|undefined} collection Collection inferred from source path (e.g. `docs`, `pages`, `api`).
 * @property {string} lang Language inferred from source path or fallback.
 * @property {string|undefined} version Version inferred from source path when applicable.
 */

/**
 * @typedef {Object} RemarkRewriteLocalizedLinksOptions
 * @property {string[]} [prefixes=['guide']] Root path segments that should be rewritten.
 * @property {string} [defaultLang='en'] Language fallback when source path is not parseable.
 * @property {string} [defaultVersion='5x'] Version fallback for docs pages without explicit version segment.
 * @property {string[]} [versionedCollections=['docs']] Collections that should include version in rewritten links.
 */

/**
 * Validates whether a path segment matches version format (e.g. `5x`, `4x`).
 * @param {string} value
 */
function isVersionSegment(value) {
  return /^\d+x$/.test(value);
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

/** Marker that precedes the collection name in any content source path. */
const CONTENT_MARKER = '/src/content/';

/**
 * Collections whose source path starts with a version segment instead of a
 * language (e.g. `api/5x/api/express.mdx`). Their content is shared across all
 * languages, so the language cannot be inferred from the path.
 */
const VERSION_FIRST_COLLECTIONS = new Set(['api']);

/**
 * Derives collection/lang/version from the Markdown source file path, working
 * for any collection under `src/content/`.
 *
 * Expected path examples:
 * - `/.../src/content/docs/en/5x/guide/routing.md`  → docs, lang=en, version=5x
 * - `/.../src/content/pages/es/guide/routing.md`    → pages, lang=es
 * - `/.../src/content/api/5x/api/express/index.mdx` → api, version=5x (no lang)
 *
 * @param {string|undefined} filePath
 * @param {string} defaultLang
 * @param {string} defaultVersion
 * @returns {RewriteContext}
 */
function deriveContextFromFile(filePath, defaultLang, defaultVersion) {
  const normalizedPath = (filePath || '').replaceAll('\\', '/');
  const markerIndex = normalizedPath.indexOf(CONTENT_MARKER);

  if (markerIndex === -1) {
    return {
      collection: undefined,
      lang: defaultLang,
      version: defaultVersion,
    };
  }

  const relativePath = normalizedPath.slice(markerIndex + CONTENT_MARKER.length);
  const [collection, ...segments] = relativePath.split('/').filter(Boolean);

  // Version-first collections (e.g. api): `{version}/...` with no language.
  if (VERSION_FIRST_COLLECTIONS.has(collection)) {
    return {
      collection,
      lang: defaultLang,
      version: isVersionSegment(segments[0]) ? segments[0] : defaultVersion,
    };
  }

  // Language-first collections (docs, pages, blog): `{lang}/[version]/...`.
  return {
    collection,
    lang: segments[0] || defaultLang,
    version: isVersionSegment(segments[1]) ? segments[1] : defaultVersion,
  };
}

/**
 * Determines whether a pathname should be rewritten according to configured prefixes.
 * @param {string} pathname
 * @param {Set<string>} prefixesSet
 */
function shouldRewritePath(pathname, prefixesSet) {
  if (!pathname.startsWith('/')) {
    return false;
  }

  const normalized = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const [firstSegment] = normalized.split('/');

  return prefixesSet.has(firstSegment);
}

/**
 * Builds the final localized/versioned pathname.
 * @param {string} pathname
 * @param {RewriteContext} context
 * @param {Set<string>} versionedCollections
 */
function rewritePath(pathname, context, versionedCollections) {
  const cleanTarget = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const segments = [context.lang];

  if (context.collection && versionedCollections.has(context.collection) && context.version) {
    segments.push(context.version);
  }

  segments.push(cleanTarget);

  const rewritten = `/${segments.join('/')}`.replace(/\/+/g, '/');
  return ensureTrailingSlash(rewritten);
}

/**
 * Rewrites a URL when it matches plugin rules, otherwise returns original value.
 * @param {string} url
 * @param {RewriteContext} context
 * @param {Set<string>} prefixesSet
 * @param {Set<string>} versionedCollections
 */
function rewriteUrl(url, context, prefixesSet, versionedCollections) {
  if (typeof url !== 'string' || !url) {
    return url;
  }

  const { pathname, suffix } = splitPathAndSuffix(url);

  if (!pathname || pathname === '/' || pathname.startsWith('#')) {
    return url;
  }

  if (hasLanguagePrefix(pathname)) {
    return url;
  }

  if (!shouldRewritePath(pathname, prefixesSet)) {
    return url;
  }

  const rewrittenPath = rewritePath(pathname, context, versionedCollections);
  return `${rewrittenPath}${suffix}`;
}

/**
 * Generic depth-first AST traversal utility.
 * @param {any} node
 * @param {(node: any) => void} visitor
 */
function walkTree(node, visitor) {
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

/**
 * Remark plugin factory.
 *
 * @param {RemarkRewriteLocalizedLinksOptions} [options]
 */
export default function remarkRewriteLocalizedLinks(options = {}) {
  const {
    prefixes = ['guide'],
    defaultLang = 'en',
    defaultVersion = '5x',
    versionedCollections = ['docs'],
  } = options;

  const prefixesSet = new Set(prefixes);
  const versionedCollectionsSet = new Set(versionedCollections);

  return (tree, file) => {
    const context = deriveContextFromFile(file?.path, defaultLang, defaultVersion);

    walkTree(tree, (node) => {
      if (node.type === 'link' || node.type === 'definition') {
        node.url = rewriteUrl(node.url, context, prefixesSet, versionedCollectionsSet);
      }
    });
  };
}
