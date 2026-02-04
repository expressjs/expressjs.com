/**
 * SidebarV2 Types
 *
 * Flexible menu structure supporting unlimited navigation levels.
 * Each level can contain single items and/or grouped sections.
 */

/** Base properties for all menu items */
export interface MenuItemBase {
  /** Display label for the menu item */
  label: string;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
  /** Icon name (using phosphor icons) */
  icon?: string;
  /** Order for sorting items within a section */
  order?: number;
}

/** A menu item that links to a specific page */
export interface MenuLink extends MenuItemBase {
  /** URL path for the link (relative, without language prefix) */
  href: string;
  /** Version folder for versioned content (e.g., 'v5', 'v4') */
  version?: string;
  submenu?: never;
}

/** A menu item that opens a submenu */
export interface MenuButton extends MenuItemBase {
  /** Nested menu structure */
  submenu: MenuLevel;
  href?: never;
}

/** Union type for any menu item */
export type MenuItem = MenuLink | MenuButton;

/** A titled section containing menu items */
export interface MenuSection {
  /** Optional title for the section (can be omitted for ungrouped items) */
  title?: string;
  /** Collection key for content fetching (e.g., 'docs/starter') */
  collection?: string;
  /** Base path for items in this section (e.g., '/docs') */
  basePath?: string;
  /** Whether this section contains versioned content */
  versioned?: boolean;
  /** Menu items within this section */
  items: MenuItem[];
}

/** A navigation level containing sections and/or standalone items */
export interface MenuLevel {
  /** Grouped sections with optional titles */
  sections?: MenuSection[];
  /** Standalone items not in a section */
  items?: MenuItem[];
  /** Base path inherited from parent (e.g., '/docs') */
  basePath?: string;
  /** Whether this level contains versioned content */
  versioned?: boolean;
}

/** Root menu configuration */
export interface MenuConfig extends MenuLevel {
  /** Default version for versioned content */
  defaultVersion?: string;
  /** Available versions for the version switcher */
  versions?: VersionConfig[];
}

/** Version configuration for the version switcher */
export interface VersionConfig {
  /** Version identifier (e.g., '5x') */
  id: string;
  /** Display label (e.g., 'v5.x') */
  label: string;
  /** Whether this is the default version */
  isDefault?: boolean;
  /** Whether this version is deprecated */
  isDeprecated?: boolean;
}

/** Navigation state for a single level */
export interface NavigationLevel {
  /** Title for the back button */
  title: string;
  /** Parent menu item key for tracking breadcrumb */
  parentKey?: string;
  /** Content to render in this level */
  content: MenuLevel;
  /** Current path at this level for highlighting */
  currentPath?: string;
  /** Base path for this level (e.g., '/docs') */
  basePath?: string;
  /** Whether this level contains versioned content */
  versioned?: boolean;
  /** Collection path for this level (e.g., 'starter') */
  collectionPath?: string;
}

/** Complete navigation stack state */
export interface NavigationStack {
  /** Stack of navigation levels (index 0 is root) */
  levels: NavigationLevel[];
  /** Currently active level index */
  activeIndex: number;
  /** Selected version */
  currentVersion: string;
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

/** Complete navigation data structure */
export type NavigationData = Record<string, Record<string, SectionWithPages>>;

/** Helper type to check if an item is a link */
export function isMenuLink(item: MenuItem): item is MenuLink {
  return 'href' in item && item.href !== undefined;
}

/** Helper type to check if an item is a button with submenu */
export function isMenuButton(item: MenuItem): item is MenuButton {
  return 'submenu' in item && item.submenu !== undefined;
}
