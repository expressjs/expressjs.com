import en from './ui/en.json';
import fr from './ui/fr.json';
import de from './ui/de.json';
import es from './ui/es.json';
import it from './ui/it.json';
import ja from './ui/ja.json';
import ko from './ui/ko.json';
import ptBr from './ui/pt-br.json';
import zhCn from './ui/zh-cn.json';
import zhTw from './ui/zh-tw.json';

export const languages = {
  en: { label: 'English', direction: 'ltr' },
  de: { label: 'Deutsch', direction: 'ltr' },
  es: { label: 'Español', direction: 'ltr' },
  fr: { label: 'Français', direction: 'ltr' },
  it: { label: 'Italiano', direction: 'ltr' },
  ja: { label: '日本語', direction: 'ltr' },
  ko: { label: '한국어', direction: 'ltr' },
  'pt-br': { label: 'Português', direction: 'ltr' },
  'zh-cn': { label: '简体中文', direction: 'ltr' },
  'zh-tw': { label: '繁體中文', direction: 'ltr' },
} as const;

export type LanguageCode = keyof typeof languages;

export const languagesArray = Object.entries(languages).map(([code, obj]) => ({
  code,
  label: obj.label,
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
