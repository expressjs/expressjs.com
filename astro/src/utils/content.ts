import { getCollection, type CollectionEntry } from 'astro:content';
import { menuSections, navItems, type MenuSection } from '@config/menu';
import type { collections } from '@/content.config';

/**
 * Get all documents for a specific language
 */
export async function getPagesByLang(lang: string = 'en', collection: keyof typeof collections) {
  const allDocs = await getCollection(collection);
  return allDocs.filter((doc) => doc.id.startsWith(`${lang}/`));
}

/**
 * Get all documents for a specific section and language
 * Section is derived from the folder structure (e.g., "en/starter/page.md" -> section is "starter")
 */
export async function getPagesBySection(
  section: MenuSection,
  lang: string = 'en',
  collection: keyof typeof collections
) {
  const allPages = await getPagesByLang(lang, collection);
  return allPages
    .filter((page) => {
      const pathWithoutLang = page.id.replace(`${lang}/`, '');
      const pathParts = pathWithoutLang.split('/');
      return pathParts[0] === section;
    })
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

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
 * Builds breadcrumb items for a documentation page
 * @param lang - The language code (e.g., 'en')
 * @param slug - The page slug (e.g., 'resources/middleware/compression')
 * @param collection - The collection name to check for existing content
 * @returns Array of breadcrumb items with labels and optional hrefs
 */
export async function buildBreadcrumbs(
  lang: string,
  slug: string,
  collection: keyof typeof collections
): Promise<BreadcrumbItem[]> {
  const pages = await getCollection(collection);

  const breadcrumbs: BreadcrumbItem[] = [];

  const collectionLabel = navItems.find((item) => item.key === collection)?.label || 'Docs';

  const firstItem = {
    label: collectionLabel,
    href: undefined,
  };

  breadcrumbs.push(firstItem);

  const slugParts = slug.split('/');

  slugParts.forEach((part, index) => {
    const isLast = index === slugParts.length - 1;

    const pathToSegment = `${lang}/${slugParts.slice(0, index + 1).join('/')}`;

    const menuSection = part
      .split('-')
      .map((word) => word.charAt(0) + word.slice(1))
      .join(' ');

    const label =
      menuSections[collection][part as keyof (typeof menuSections)[typeof collection]] ||
      menuSection;

    if (!isLast) {
      breadcrumbs.push({
        label,
        href: hasContentAt(pathToSegment, pages) ? `/${pathToSegment}` : undefined,
      });
    }
  });

  return breadcrumbs;
}
