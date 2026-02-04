import { getCollection, type CollectionEntry } from 'astro:content';
import { navItems, type MenuSection } from '@config/menu';
import type { collections } from '@/content.config';
import type {
  NavigationData,
  SectionWithPages,
  SubfolderInfo,
} from '@/components/patterns/Sidebar/types';

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
 * Excludes pages that are nested in subfolders (e.g., "en/resources/middleware/compression.md")
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
      // Match section and ensure it's not in a subfolder (only 2 parts: section/file.md)
      return pathParts[0] === section && pathParts.length === 2;
    })
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/**
 * Get all subfolders within a section
 * Returns an object mapping subfolder names to their display labels
 */
export async function getSubfoldersInSection(
  section: MenuSection,
  lang: string = 'en',
  collection: keyof typeof collections
): Promise<Record<string, string>> {
  const allPages = await getPagesByLang(lang, collection);
  const subfolders: Record<string, string> = {};

  allPages.forEach((page) => {
    const pathWithoutLang = page.id.replace(`${lang}/`, '');
    const pathParts = pathWithoutLang.split('/');
    // Check if page is in a subfolder (more than 2 parts: section/subfolder/file.md)
    if (pathParts[0] === section && pathParts.length > 2) {
      const subfolder = pathParts[1];
      if (!subfolders[subfolder]) {
        // Capitalize subfolder name for display
        subfolders[subfolder] = subfolder.charAt(0).toUpperCase() + subfolder.slice(1);
      }
    }
  });

  return subfolders;
}

/**
 * Get all pages within a specific subfolder of a section
 */
export async function getPagesBySubfolder(
  section: MenuSection,
  subfolder: string,
  lang: string = 'en',
  collection: keyof typeof collections
) {
  const allPages = await getPagesByLang(lang, collection);
  return allPages
    .filter((page) => {
      const pathWithoutLang = page.id.replace(`${lang}/`, '');
      const pathParts = pathWithoutLang.split('/');
      return pathParts[0] === section && pathParts[1] === subfolder && pathParts.length === 3;
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
      navItems.find((item) => item.key === collection)?.sections?.[
        part as keyof (typeof navItems)[number]['sections']
      ] || menuSection;

    if (!isLast) {
      breadcrumbs.push({
        label,
        href: hasContentAt(pathToSegment, pages) ? `/${pathToSegment}` : undefined,
      });
    }
  });

  return breadcrumbs;
}

/**
 * Build complete navigation data for sidebar
 * Fetches all pages organized by nav items, sections, and subfolders
 */
export async function buildNavigationData(lang: string): Promise<NavigationData> {
  const navigationData: NavigationData = {};

  for (const item of navItems) {
    if (!item.sections) continue;

    const sectionsWithPages: Record<string, SectionWithPages> = {};
    const collection = item.key as keyof typeof collections;

    for (const [sectionKey, sectionLabel] of Object.entries(item.sections)) {
      try {
        const [pages, subfolderNames] = await Promise.all([
          getPagesBySection(sectionKey as MenuSection, lang, collection),
          getSubfoldersInSection(sectionKey as MenuSection, lang, collection),
        ]);

        // Fetch all subfolder pages in parallel
        const subfolderEntries = Object.entries(subfolderNames);
        const subfolderPagesResults = await Promise.all(
          subfolderEntries.map(([subfolderKey]) =>
            getPagesBySubfolder(sectionKey as MenuSection, subfolderKey, lang, collection)
          )
        );

        const subfolders: Record<string, SubfolderInfo> = {};
        subfolderEntries.forEach(([subfolderKey, subfolderLabel], index) => {
          const subfolderPages = subfolderPagesResults[index];
          const overviewPage = subfolderPages.find((page) => {
            const filename = page.id
              .replace(`${lang}/`, '')
              .replace(/\.mdx?$/, '')
              .split('/')
              .pop();
            return filename === subfolderKey;
          });

          const mappedPages = subfolderPages
            .filter((page) => page.data.title)
            .map((page) => {
              const slug = page.id.replace(`${lang}/`, '').replace(/\.mdx?$/, '');
              const filename = slug.split('/').pop() || '';
              const isOverviewPage = filename === subfolderKey;
              return {
                title: isOverviewPage ? 'Overview' : page.data.menuTitle || 'Untitled',
                slug,
                href: `/${lang}/${collection === 'docs' ? '' : 'api-reference/'}${slug}`,
                order: page.data.order ?? 999,
                isOverview: isOverviewPage,
              };
            })
            .sort((a, b) => {
              if (a.isOverview) return -1;
              if (b.isOverview) return 1;
              return a.order - b.order;
            });

          subfolders[subfolderKey] = {
            label: subfolderLabel,
            pages: mappedPages,
            order: overviewPage?.data.order ?? 999,
          };
        });

        sectionsWithPages[sectionKey] = {
          label: sectionLabel,
          pages: pages
            .filter((page) => page.data.title)
            .map((page) => ({
              title: page.data.menuTitle || 'Untitled',
              slug: page.id.replace(`${lang}/`, '').replace(/\.mdx?$/, ''),
              href: `/${lang}/${collection === 'docs' ? '' : 'api-reference/'}${page.id.replace(`${lang}/`, '').replace(/\.mdx?$/, '')}`,
              order: page.data.order ?? 999,
            })),
          subfolders,
        };
      } catch (error) {
        console.error(`Failed to fetch pages for section ${sectionKey}:`, error);
        sectionsWithPages[sectionKey] = { label: sectionLabel, pages: [], subfolders: {} };
      }
    }

    navigationData[item.key] = sectionsWithPages;
  }

  return navigationData;
}
