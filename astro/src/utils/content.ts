import { getCollection, type CollectionEntry } from 'astro:content';
import { mainMenu } from '@/config/menu/main';
import { apiMenu } from '@/config/menu/api';
import type { collections } from '@/content.config';
import type { Menu } from '@/config/types';

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

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Find the label for a collection from the main menu
 */
function getCollectionLabel(collection: string): string {
  for (const section of mainMenu.sections || []) {
    for (const item of section.items) {
      if ('submenu' in item && item.submenu?.basePath === `/${collection}`) {
        return item.label;
      }
    }
  }
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
      href: undefined,
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
    breadcrumbs.push({
      label: getCollectionLabel(collection),
      href: undefined,
    });

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
