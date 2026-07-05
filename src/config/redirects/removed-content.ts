// Data for redirecting old URLs whose content no longer exists. Kept in its own
// module so `getStaticPaths()` (which runs in an isolated scope and can only see
// file imports, not the page's frontmatter constants) can use it.

import removedPagesData from './removed-pages.json';

// Their old URLs (e.g. `/tr/guide/routing`) no longer have
// content, so each one redirects to the same page in English instead of 404ing.
export const REMOVED_LOCALES = ['tr', 'th', 'id', 'uk', 'sk', 'ru', 'uz'];

// Pages that were deleted (see `removed-pages.json`): old unlocalized path → a
// still-existing fallback (an unlocalized path, or an external URL).
export const removedPages: Record<string, string> = removedPagesData;
