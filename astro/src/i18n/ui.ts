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
  en: {
    'home.welcome': 'Welcome',
  },
  fr: {
    'home.welcome': 'Bienvenue',
  },
  de: {
    'home.welcome': 'Willkommen',
  },
  es: {
    'home.welcome': 'Bienvenido',
  },
  it: {
    'home.welcome': 'Benvenuto',
  },
  ja: {
    'home.welcome': 'ようこそ',
  },
  ko: {
    'home.welcome': '환영합니다',
  },
  'pt-br': {
    'home.welcome': 'Bem-vindo',
  },
  'zh-cn': {
    'home.welcome': '欢迎',
  },
  'zh-tw': {
    'home.welcome': '歡迎',
  },
} as const;
