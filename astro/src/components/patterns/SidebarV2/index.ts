/**
 * SidebarV2 Component Exports
 *
 * Enhanced sidebar with unlimited navigation levels and version switching.
 */

// Export types
export type {
  MenuConfig,
  MenuLevel,
  MenuItem,
  MenuLink,
  MenuButton,
  MenuSection,
  VersionConfig,
  NavigationLevel,
  NavigationStack,
  PageInfo,
  SubfolderInfo,
  SectionWithPages,
  NavigationData,
} from './types';

// Export type guards
export { isMenuLink, isMenuButton } from './types';
