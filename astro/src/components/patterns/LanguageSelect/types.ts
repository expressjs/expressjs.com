/**
 * LanguageSelect Component Types
 */

import type { HTMLAttributes } from 'astro/types';

export interface LanguageConfig {
  code: string;
  label: string;
}

export type LanguageSelectProps = HTMLAttributes<'div'> & {
  languages: LanguageConfig[];
  currentLanguage?: string;
  onLanguageChange?: (code: string) => void;
};
