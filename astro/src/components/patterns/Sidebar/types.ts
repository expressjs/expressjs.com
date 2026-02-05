/**
 * Sidebar Types
 *
 * Types for the statically-rendered sidebar component.
 * Menu content is pre-rendered at build time using config from @/config/types.
 */

import type { Menu } from '@/config/types';
import type { VersionConfig } from '@/components/patterns/VersionSwitcher/types';

/** Extended menu configuration with version support */
export interface MenuConfig extends Menu {
  defaultVersion?: string;
  versions?: VersionConfig[];
}

/** Page info for content pages */
export interface PageInfo {
  title: string;
  slug: string;
  href: string;
  order: number;
  isOverview?: boolean;
  version?: string;
}

/** Subfolder info for nested content */
export interface SubfolderInfo {
  label: string;
  pages: PageInfo[];
  order: number;
}

/** Section with pages (for content-driven menus) */
export interface SectionWithPages {
  label: string;
  pages: PageInfo[];
  subfolders: Record<string, SubfolderInfo>;
}
