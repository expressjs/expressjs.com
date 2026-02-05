/**
 * Sidebar Types
 *
 * Extends menu types with sidebar-specific functionality for
 * unlimited navigation levels and runtime state management.
 */

import type { Menu } from '@/config/types';
import type { VersionConfig } from '@/components/patterns/VersionSwitcher/types';

/** Root menu configuration */
export interface MenuConfig extends Menu {
  defaultVersion?: string;
  versions?: VersionConfig[];
}

/** Navigation state for a single level */
export interface NavigationColumn {
  /** Title for the back button */
  title: string;
  /** Parent menu item key for tracking breadcrumb */
  parentKey?: string;
  /** Content to render in this level */
  content: Menu;
  /** Current path at this level for highlighting */
  currentPath?: string;
  /** Base path for this level (e.g., '/docs') */
  basePath?: string;
  /** Whether this level contains versioned content */
  versioned?: boolean;
}

/** Page info for dynamic content */
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

/** Section with dynamically loaded pages */
export interface SectionWithPages {
  label: string;
  pages: PageInfo[];
  subfolders: Record<string, SubfolderInfo>;
}
