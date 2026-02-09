import { getCollection, type CollectionEntry } from 'astro:content';
import { mainMenu } from '@/config/menu/main';
import type { collections } from '@/content.config';

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

  breadcrumbs.push({
    label: getCollectionLabel(collection),
    href: undefined,
  });

  // Add version to breadcrumbs if provided
  if (version) {
    breadcrumbs.push({
      label: version,
      href: undefined,
    });
  }

  const slugParts = slug.split('/');

  // Skip version prefix in slug if it matches the version parameter
  const startIndex = slugParts[0] === version ? 1 : 0;

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

  return breadcrumbs;
}
