import movedPages from '../config/redirects/moved-pages.json' with { type: 'json' };
import {
  DEFAULT_UNVERSIONED_PATHS,
  DEFAULT_VERSIONED_SECTIONS,
} from '../plugins/rewrite-localized-links-core.mjs';

// Keep this locale list in sync with the sitemap's `i18n.locales` in `astro.config.mjs`.
const LOCALES = new Set(['de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'pt-br', 'zh-cn', 'zh-tw']);
const VERSIONED_SECTIONS = new Set(DEFAULT_VERSIONED_SECTIONS);
const UNVERSIONED_PATHS = new Set(DEFAULT_UNVERSIONED_PATHS);

/**
 * Whether a generated page is the canonical URL of its content, mirroring the
 * `rel="canonical"` set by `Layout.astro` and `[...slug].astro`. Excludes:
 * - `/en/`, because the English homepage is served at `/`.
 * - The `noindex` redirect stubs from `[...path].astro`: language-less ones
 *   (e.g. `/guide/x`) and per-locale ones for moved pages
 *   (e.g. `/en/resources/middleware/csurf`).
 * - Unversioned copies of the default version (e.g. `/es/guide/routing`), whose
 *   canonical is the versioned URL (e.g. `/es/5x/guide/routing`). "Global" pages
 *   (e.g. `/es/guide/migrating-5`) only exist unversioned, so they stay.
 * - Other locales' copies of the untranslated blog and API pages
 *   (e.g. `/es/5x/api/express`), whose canonical is the English URL.
 *
 * @param {string} page Absolute page URL.
 * @returns {boolean}
 */
export function isCanonicalSitemapPage(page) {
  const { pathname } = new URL(page);
  if (pathname === '/') return true;

  const [locale, ...segments] = pathname.split('/').filter(Boolean);
  if (!LOCALES.has(locale)) return false;

  const slug = segments.join('/');
  if (!slug) return locale !== 'en';
  if (Object.hasOwn(movedPages, `/${slug}`)) return false;

  const [section, subsection] = segments;
  if (VERSIONED_SECTIONS.has(section) && !UNVERSIONED_PATHS.has(slug)) return false;

  const isUntranslated = section === 'blog' || (/^\d+x$/.test(section) && subsection === 'api');
  return locale === 'en' || !isUntranslated;
}
