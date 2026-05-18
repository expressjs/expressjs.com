/**
 * LanguageSelect Component Types
 */

import type { HTMLAttributes } from 'astro/types';
import type { LanguageCode } from '@/i18n/locales';

export interface LanguageConfig {
  code: LanguageCode;
  label: string;
}

export type LanguageSelectProps = HTMLAttributes<'div'> & {
  languages: LanguageConfig[];
  currentLanguage?: LanguageCode;
  onLanguageChange?: (code: LanguageCode) => void;
};
