/**
 * VersionSwitcher Component Types
 */

import type { HTMLAttributes } from 'astro/types';

export interface VersionConfig {
  /** Version identifier (e.g., 'v5') */
  id: string;
  /** Display label (e.g., 'v5.x') */
  label: string;
  /** Whether this is the default version */
  isDefault?: boolean;
  /** Whether this version is deprecated */
  isDeprecated?: boolean;
}

export type VersionSwitcherProps = HTMLAttributes<'div'> & {
  /** Available versions */
  versions: VersionConfig[];
  /** Default version to use when not detected from URL */
  defaultVersion: string;
  /** Current page path for version detection */
  currentPath?: string;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Whether to hide by default (used in sidebar deeper levels) */
  hidden?: boolean;
};
