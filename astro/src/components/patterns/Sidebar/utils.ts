import type { Menu, MenuItem, VersionPrefix } from '@/config/types';
import type { VersionConfig } from '@/components/patterns/VersionSwitcher/types';

export type SubmenuData = {
  menu: Menu;
  title: string;
  id: string;
  basePath: string;
  versioned: VersionPrefix[];
  level: number;
};

export function normalizePath(path: string): string {
  return path.replace(/\/$/, '');
}

export function isVersioned(versioned: VersionPrefix[] | undefined, version: string): boolean {
  return versioned?.includes(version as VersionPrefix) ?? false;
}

export function resolveHref(
  href: string,
  lang: string,
  basePath: string,
  versioned: VersionPrefix[] | undefined,
  version: string
): string {
  const useVersion = isVersioned(versioned, version);
  const versionPath = useVersion ? `/${version}` : '';
  return `/${lang}${basePath}${versionPath}${href}`;
}

export function isLink(item: MenuItem): item is MenuItem & { href: string } {
  return 'href' in item && item.href !== undefined;
}

export function hasSubmenu(item: MenuItem): item is MenuItem & { submenu: Menu } {
  return 'submenu' in item && item.submenu !== undefined;
}

function shouldOmitItem(item: MenuItem, version: string): boolean {
  return item.omitFrom?.includes(version as VersionPrefix) ?? false;
}

export function shouldOmitSection(
  section: { omitFrom?: VersionPrefix[] },
  version: string
): boolean {
  return section.omitFrom?.includes(version as VersionPrefix) ?? false;
}

export function filterItems(items: MenuItem[], version: string): MenuItem[] {
  return items.filter((item) => !shouldOmitItem(item, version));
}

export function getItemId(
  parentId: string,
  sectionIndex: number | null,
  itemIndex: number
): string {
  if (sectionIndex !== null) {
    return `${parentId}-s${sectionIndex}-i${itemIndex}`;
  }
  return `${parentId}-i${itemIndex}`;
}

export function collectAllSubmenus(
  menuToScan: Menu,
  currentLevel: number,
  currentParentId: string,
  currentBasePath: string,
  currentVersioned: VersionPrefix[] | undefined,
  version: string,
  submenus: SubmenuData[]
): void {
  const collectFromItems = (items: MenuItem[], sectionIndex: number | null): void => {
    filterItems(items, version).forEach((item, itemIndex) => {
      if (hasSubmenu(item)) {
        const itemId = getItemId(currentParentId, sectionIndex, itemIndex);
        const submenuId = `submenu-${itemId}`;
        const submenuBasePath = item.submenu.basePath || currentBasePath;
        const submenuVersioned = item.submenu.versioned ?? currentVersioned ?? [];

        submenus.push({
          menu: item.submenu,
          title: item.label,
          id: submenuId,
          basePath: submenuBasePath,
          versioned: submenuVersioned,
          level: currentLevel + 1,
        });

        collectAllSubmenus(
          item.submenu,
          currentLevel + 1,
          submenuId,
          submenuBasePath,
          submenuVersioned,
          version,
          submenus
        );
      }
    });
  };

  menuToScan.sections
    ?.filter((section) => !shouldOmitSection(section, version))
    .forEach((section, sectionIndex) => collectFromItems(section.items, sectionIndex));

  if (menuToScan.items) {
    collectFromItems(menuToScan.items, null);
  }
}

function checkItemsForPath(
  items: MenuItem[],
  normalizedCurrentPath: string,
  basePath: string,
  versioned: VersionPrefix[] | undefined,
  lang: string,
  version: string
): boolean {
  return filterItems(items, version).some((item) => {
    if (isLink(item)) {
      const href = resolveHref(item.href, lang, basePath, versioned, version);
      return normalizedCurrentPath === normalizePath(href);
    }
    if (hasSubmenu(item)) {
      const nestedBasePath = item.submenu.basePath || basePath;
      const nestedVersioned = item.submenu.versioned ?? versioned;
      return submenuContainsCurrentPath(
        item.submenu,
        nestedBasePath,
        nestedVersioned,
        normalizedCurrentPath,
        lang,
        version
      );
    }
    return false;
  });
}

export function submenuContainsCurrentPath(
  submenuMenu: Menu,
  submenuBasePath: string,
  submenuVersioned: VersionPrefix[] | undefined,
  currentPath: string,
  lang: string,
  version: string
): boolean {
  const normalizedCurrentPath = normalizePath(currentPath);
  const filteredSections =
    submenuMenu.sections?.filter((s) => !shouldOmitSection(s, version)) ?? [];

  const foundInSections = filteredSections.some((section) =>
    checkItemsForPath(
      section.items,
      normalizedCurrentPath,
      submenuBasePath,
      submenuVersioned,
      lang,
      version
    )
  );

  if (foundInSections) return true;

  return submenuMenu.items
    ? checkItemsForPath(
        submenuMenu.items,
        normalizedCurrentPath,
        submenuBasePath,
        submenuVersioned,
        lang,
        version
      )
    : false;
}

export function calculateInitialActiveLevel(
  submenus: SubmenuData[],
  currentPath: string,
  lang: string,
  version: string
): number {
  return submenus.reduce((maxLevel, submenu) => {
    const containsPath = submenuContainsCurrentPath(
      submenu.menu,
      submenu.basePath,
      submenu.versioned,
      currentPath,
      lang,
      version
    );
    return containsPath && submenu.level > maxLevel ? submenu.level : maxLevel;
  }, 0);
}

export function groupSubmenusByLevel(submenus: SubmenuData[]): Map<number, SubmenuData[]> {
  return submenus.reduce((map, submenu) => {
    const levelSubmenus = map.get(submenu.level) ?? [];
    map.set(submenu.level, [...levelSubmenus, submenu]);
    return map;
  }, new Map<number, SubmenuData[]>());
}

export function detectVersionFromUrl(
  currentPath: string,
  versions: VersionConfig[],
  defaultVersion: string
): string {
  for (const version of versions) {
    if (currentPath.includes(`/${version.id}/`)) {
      return version.id;
    }
  }
  return defaultVersion;
}
