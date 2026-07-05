import movedPagesData from './moved-pages.json';

// Their old URLs (e.g. `/tr/guide/routing`) no longer have
// content, so each one redirects to the same page in English instead of 404ing.
export const REMOVED_LOCALES = ['tr', 'th', 'id', 'uk', 'sk', 'ru', 'uz'];

// Pages that moved or were removed (see `moved-pages.json`): old unlocalized path
// → a still-existing fallback (an unlocalized path, or an external URL).
export const movedPages: Record<string, string> = movedPagesData;
