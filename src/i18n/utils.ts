import { ui, defaultLang, languages } from './locales';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

function getNestedValue(obj: (typeof ui)[keyof typeof ui], path: string): string | undefined {
  const value = path.split('.').reduce((acc: unknown, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);

  return typeof value === 'string' ? value : undefined;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string): string {
    return getNestedValue(ui[lang], key) ?? getNestedValue(ui[defaultLang], key) ?? key;
  };
}
/**
 * Get all supported language codes
 */
export function getLanguageCodes(): string[] {
  return Object.keys(languages);
}

/**
 * Create a regex pattern to match language prefixes in URLs
 */
export function createLanguagePathRegex(): RegExp {
  const codes = getLanguageCodes().join('|');
  return new RegExp(`^/(${codes})/`);
}

/**
 * Replace the language code in a path with a new one
 */
export function replaceLanguageInPath(path: string, newLang: string): string {
  const langRegex = createLanguagePathRegex();

  if (langRegex.test(path)) {
    return path.replace(langRegex, `/${newLang}/`);
  } else {
    return `/${newLang}${path}`;
  }
}
