import type { Menu, MenuItem, MenuSection, VersionPrefix } from '@/config/types';
import { mainMenu } from '@/config/menu/main';
import { apiMenu } from '@/config/menu/api';

export type BreadcrumbItem = {
  href?: string;
} & (
  | { label: string; icon?: string; ariaLabel?: string }
  | { icon: string; ariaLabel: string; label?: never }
);

function formatLabel(segment: string): string {
  return segment
    .split('-')
    .map((word) =>
      word.length <= 3 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

function buildMenuMaps(menu: Menu) {
  const labelMap = new Map<string, string>();
  const sectionMap = new Map<string, string>();

  const walkItems = (items: MenuItem[], section: MenuSection | null, basePath = '') => {
    for (const item of items) {
      if ('href' in item && item.href) {
        if (item.href.startsWith('http')) continue;
        const fullPath = `${basePath}${item.href}`.replace(/^\/+/, '');

        labelMap.set(fullPath, item.label);

        // Only map section root paths
        const isSectionRoot = item.href === '/api' || /^\/api\/[^/]+\/?$/.test(item.href);

        if (section?.title && isSectionRoot) {
          sectionMap.set(fullPath, section.title);
        }
      }

      if ('submenu' in item && item.submenu) {
        const nextBase = item.submenu.basePath || basePath + (item.href || '');
        walkItems(item.submenu.items || [], section, nextBase);
      }
    }
  };

  if (menu.sections) {
    for (const section of menu.sections) {
      walkItems(section.items, section, section.basePath || '');
    }
  }

  if (menu.items) {
    walkItems(menu.items, null, '');
  }

  return { labelMap, sectionMap };
}

const { labelMap: mainMenuMap } = buildMenuMaps(mainMenu);
const { labelMap: apiMenuMap, sectionMap: apiSectionMap } = buildMenuMaps(apiMenu);

/**
 * Resolve label safely
 */
function resolveLabel(t: (key: string) => string, labelKey?: string, segment?: string): string {
  if (!labelKey) return formatLabel(segment || '');

  return labelKey.startsWith('menu.') ? t(labelKey as string) : labelKey;
}

/**
 * Build breadcrumbs
 */
export function buildBreadcrumbs(pathname: string, t: (key: string) => string): BreadcrumbItem[] {
  const segments = pathname.replace(/^\/|\/$|\.html$/g, '').split('/');

  // Need at least lang + one content segment
  if (segments.length < 2) return [];

  const [lang, ...rest] = segments;

  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = '';

  const isApi = rest.includes('api');
  const isBlog = rest.includes('blog');
  const isResources = rest.includes('resources');
  const isDoc = !isApi && !isBlog && !isResources;

  const menuMap = isApi ? apiMenuMap : mainMenuMap;

  // Matches version prefix segments like '5x', '4x', '3x'
  const VERSION_SEGMENT = /^\d+x$/;

  rest.forEach((segment, index) => {
    currentPath += `/${segment}`;

    const isVersion = VERSION_SEGMENT.test(segment);
    const cleanPath = currentPath.replace(/^\/\d+x\//, '').replace(/^\/+/, '');
    const isLast = index === rest.length - 1;

    let labelKey = menuMap.get(cleanPath);

    // For API paths, replace intermediate segment labels with their section title
    // (e.g. show "5.x API" instead of the raw item label for the /api segment).
    // The last segment always uses its own label so the page title is accurate.
    if (isApi && !isLast) {
      const sectionKey = apiSectionMap.get(cleanPath);
      if (sectionKey) {
        labelKey = sectionKey;
      }
    }

    const label = resolveLabel(t, labelKey, segment);

    // Breadcrumb linking logic:
    // 1. Last item is never linked (it's the current page).
    // 2. Version segments are never linked.
    // 3. Docs pages do not have linked intermediate crumbs (text-only path indicator).
    // 4. API, Blog, and Resources pages have linked intermediate crumbs for easier navigation.
    const shouldLink = !isLast && !isVersion && !isDoc;

    breadcrumbs.push({
      label,
      href: shouldLink ? `/${lang}${currentPath}` : undefined,
    });
  });

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

      if ('href' in item && item.href && !item.href.includes('#')) {
        if (item.href.startsWith('http')) continue;
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
