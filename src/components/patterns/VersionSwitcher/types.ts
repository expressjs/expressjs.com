/**
 * VersionSwitcher Component Types
 */

import type { HTMLAttributes } from 'astro/types';

export interface VersionConfig {
  id: string;
  label: string;
  isDefault?: boolean;
  isDeprecated?: boolean;
}

export type VersionSwitcherProps = HTMLAttributes<'div'> & {
  versions: VersionConfig[];
  defaultVersion: string;
  currentPath?: string;
  hidden?: boolean;
};
