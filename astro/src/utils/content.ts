import { getCollection, type CollectionEntry } from 'astro:content';
import { mainMenu } from '@/config/menu/main';
import { apiMenu } from '@/config/menu/api';
import type { collections } from '@/content.config';
import type { Menu, MenuItem, VersionPrefix } from '@/config/types';

/**
 * Checks if there is content at the specified path
 * @param checkPath - The path to check (e.g., 'en/resources/middleware')
 * @param pages - The collection of pages to search within
 * @returns True if content exists at the specified path, false otherwise
 */
export function hasContentAt(
  checkPath: string,
  pages: CollectionEntry<keyof typeof collections>[]
): boolean {
  return pages.some((page) => page.id === checkPath);
}

export type BreadcrumbItem = {
  href?: string;
  icon?: string;
} & ({ label: string; ariaLabel?: string } | { label?: string; ariaLabel: string });

/**
 * Find the menu item for a collection from the main menu by its basePath
 */
function findCollectionMenuItem(collection: string) {
  for (const section of mainMenu.sections || []) {
    for (const item of section.items) {
      if ('submenu' in item && item.submenu?.basePath === `/${collection}`) {
        return item;
      }
    }
  }
  return null;
}

/**
 * Find the label for a collection from the main menu
 */
function getCollectionLabel(collection: string): string {
  const menuItem = findCollectionMenuItem(collection);
  if (menuItem) return menuItem.label;
  // Fallback: capitalize the collection name
  return collection.charAt(0).toUpperCase() + collection.slice(1);
}

/**
 * Format a slug segment into a readable label
 */
function formatLabel(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Find breadcrumb labels by traversing the menu structure
 * Returns an array of labels representing the path to the href in the menu
 */
function findInMenu(href: string, menu: Menu, path: string[] = []): string[] | null {
  // Check sections
  if (menu.sections) {
    for (const section of menu.sections) {
      // Add section title to path if it exists
      const currentPath = section.title ? [...path, section.title] : path;

      // Check items in this section
      for (const item of section.items) {
        if ('href' in item && item.href) {
          // Normalize hrefs for comparison (remove leading slash and version)
          const normalizedItemHref = item.href.replace(/^\//, '');
          const normalizedSearchHref = href.replace(/^\//, '').replace(/^\d+x\//, '');

          if (normalizedItemHref === normalizedSearchHref) {
            return currentPath;
          }
        }

        // Check submenu if it exists
        if ('submenu' in item && item.submenu) {
          const submenuPath = [...currentPath, item.label];
          const result = findInMenu(href, item.submenu, submenuPath);
          if (result) {
            return result;
          }
        }
      }
    }
  }

  // Check items at menu root level
  if (menu.items) {
    for (const item of menu.items) {
      if ('href' in item && item.href) {
        const normalizedItemHref = item.href.replace(/^\//, '');
        const normalizedSearchHref = href.replace(/^\//, '').replace(/^\d+x\//, '');

        if (normalizedItemHref === normalizedSearchHref) {
          return path;
        }
      }

      if ('submenu' in item && item.submenu) {
        const submenuPath = [...path, item.label];
        const result = findInMenu(href, item.submenu, submenuPath);
        if (result) {
          return result;
        }
      }
    }
  }

  return null;
}

/**
 * Builds breadcrumb items for a documentation page
 * @param lang - The language code (e.g., 'en')
 * @param slug - The page slug (e.g., 'resources/middleware/compression')
 * @param collection - The collection name to check for existing content
 * @param version - The version to display in breadcrumbs (e.g., '5x')
 * @returns Array of breadcrumb items with labels and optional hrefs
 */
export async function buildBreadcrumbs(
  lang: string,
  slug: string,
  collection: keyof typeof collections,
  version?: string
): Promise<BreadcrumbItem[]> {
  const pages = await getCollection(collection);

  const breadcrumbs: BreadcrumbItem[] = [];

  const slugParts = slug.split('/');
  const startIndex = slugParts[0] === version ? 1 : 0;

  // Check if this is an API page
  const isApiPage = slugParts.includes('api');

  if (isApiPage) {
    // For API pages: version > API > category > subsection (e.g., "5x > API > Application > Properties")
    if (version) {
      breadcrumbs.push({
        label: version,
        href: undefined,
      });
    }

    breadcrumbs.push({
      label: 'API',
      href: version ? `/${lang}/${version}/api` : `/${lang}/api`,
    });

    // Try to find the page in the API menu structure to get proper labels
    const apiIndex = slugParts.indexOf('api');
    const apiPath = slugParts.slice(apiIndex).join('/');
    const menuPath = findInMenu(apiPath, apiMenu);

    if (menuPath && menuPath.length > 0) {
      // Use labels from menu structure
      menuPath.forEach((label) => {
        breadcrumbs.push({
          label,
          href: undefined,
        });
      });
    } else {
      // Fallback: use formatted path segments
      slugParts.slice(apiIndex + 1).forEach((part, index) => {
        const isLast = index === slugParts.slice(apiIndex + 1).length - 1;
        const pathToSegment = `${lang}/${slugParts.slice(0, apiIndex + index + 2).join('/')}`;

        if (!isLast) {
          breadcrumbs.push({
            label: formatLabel(part),
            href: hasContentAt(pathToSegment, pages) ? `/${pathToSegment}` : undefined,
          });
        }
      });
    }
  } else {
    // For non-API pages: use the original structure
    if (!slug.startsWith('resources')) {
      breadcrumbs.push({
        label: getCollectionLabel(collection),
        href: undefined,
      });
    }

    if (version) {
      breadcrumbs.push({
        label: version,
        href: undefined,
      });
    }

    slugParts.slice(startIndex).forEach((part, index) => {
      const isLast = index === slugParts.slice(startIndex).length - 1;
      const pathToSegment = `${lang}/${slugParts.slice(0, startIndex + index + 1).join('/')}`;

      if (!isLast) {
        breadcrumbs.push({
          label: formatLabel(part),
          href: hasContentAt(pathToSegment, pages) ? `/${pathToSegment}` : undefined,
        });
      }
    });
  }

  return breadcrumbs;
}

export type AdjacentPage = {
  href: string;
  label: string;
};

/**
 * Flattens a menu into an ordered list of link items, respecting version filtering
 */
function flattenMenu(
  menu: Menu,
  version?: string
): { href: string; label: string; global?: boolean }[] {
  const items: { href: string; label: string; global?: boolean }[] = [];
  const basePath = menu.basePath || '';

  const processItems = (menuItems: MenuItem[]) => {
    for (const item of menuItems) {
      if (version && item.omitFrom?.includes(version as VersionPrefix)) continue;

      if ('href' in item && item.href) {
        items.push({ href: `${basePath}${item.href}`, label: item.label, global: item.global });
      }
      if ('submenu' in item && item.submenu) {
        items.push(...flattenMenu(item.submenu, version));
      }
    }
  };

  if (menu.sections) {
    for (const section of menu.sections) {
      if (version && section.omitFrom?.includes(version as VersionPrefix)) continue;
      processItems(section.items);
    }
  }

  if (menu.items) {
    processItems(menu.items);
  }

  return items;
}

/**
 * Gets the previous and next pages based on a combined menu order (docs → api → resources)
 * @param slug - The current page slug (e.g., '5x/starter/installing' or 'starter/installing')
 * @param lang - The language code
 * @param menus - Array of menus in navigation order, with global flag for non-versioned menus
 * @param version - The version prefix (e.g., '5x')
 */
export function getAdjacentPages(
  slug: string,
  lang: string,
  menus: { menu: Menu; global?: boolean }[],
  version?: string
): { prev: AdjacentPage | null; next: AdjacentPage | null } {
  const flatItems = menus.flatMap(({ menu, global: isGlobalMenu }) => {
    const items = flattenMenu(menu, version);
    return items.map((item) => ({
      ...item,
      global: isGlobalMenu || item.global,
    }));
  });

  // Remove version prefix from slug to match menu hrefs
  const slugWithoutVersion =
    version && slug.startsWith(`${version}/`) ? slug.slice(version.length + 1) : slug;

  // Menu hrefs start with / (e.g., /starter/installing)
  // Normalize trailing slashes for comparison
  const normalize = (href: string) => href.replace(/\/+$/, '');
  const currentHref = normalize(`/${slugWithoutVersion}`);

  const currentIndex = flatItems.findIndex((item) => normalize(item.href) === currentHref);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const versionPath = version ? `/${version}` : '';

  const prev =
    currentIndex > 0
      ? {
          href: `/${lang}${flatItems[currentIndex - 1].global ? '' : versionPath}${flatItems[currentIndex - 1].href}`,
          label: flatItems[currentIndex - 1].label,
        }
      : null;

  const next =
    currentIndex < flatItems.length - 1
      ? {
          href: `/${lang}${flatItems[currentIndex + 1].global ? '' : versionPath}${flatItems[currentIndex + 1].href}`,
          label: flatItems[currentIndex + 1].label,
        }
      : null;

  return { prev, next };
}
