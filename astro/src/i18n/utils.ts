import { ui, defaultLang, languages } from './locales';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang] | string): string {
    return (
      ui[lang][key as keyof (typeof ui)[typeof defaultLang]] ||
      ui[defaultLang][key as keyof (typeof ui)[typeof defaultLang]] ||
      key
    );
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
