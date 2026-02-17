import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import it from './locales/it.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ptBr from './locales/pt-br.json';
import zhCn from './locales/zh-cn.json';
import zhTw from './locales/zh-tw.json';

export const languages = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  'pt-br': 'Português',
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
} as const;

export type LanguageCode = keyof typeof languages;

export const languagesArray = Object.entries(languages).map(([code, label]) => ({
  code,
  label,
}));

export const defaultLang = 'en';

export const ui = {
  en,
  fr,
  de,
  es,
  it,
  ja,
  ko,
  'pt-br': ptBr,
  'zh-cn': zhCn,
  'zh-tw': zhTw,
} as const;
