import type { Menu, MenuItem, VersionPrefix } from '@/config/types';
import type { VersionConfig } from '@/components/patterns/VersionSwitcher/types';
import type { LanguageCode } from '@/i18n/locales';

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
  lang: LanguageCode,
  basePath: string,
  versioned: VersionPrefix[] | undefined,
  version: string,
  global?: boolean
): string {
  const useVersion = !global && isVersioned(versioned, version);
  const versionPath = useVersion ? `/${version}` : '';
  return `/${lang}${basePath}${versionPath}${href}`;
}

export function isLink(item: MenuItem): item is MenuItem & { href: string } {
  return 'href' in item && item.href !== undefined;
}

export function hasSubmenu(item: MenuItem): item is MenuItem & { submenu: Menu } {
  return 'submenu' in item && item.submenu !== undefined;
}

function shouldOmit(entity: { omitFrom?: VersionPrefix[] }, version: string): boolean {
  return entity.omitFrom?.includes(version as VersionPrefix) ?? false;
}

const shouldOmitItem = (item: MenuItem, version: string): boolean => shouldOmit(item, version);

export const shouldOmitSection = (
  section: { omitFrom?: VersionPrefix[] },
  version: string
): boolean => shouldOmit(section, version);

export function filterItems(items: MenuItem[], version: string): MenuItem[] {
  return items.filter((item) => !shouldOmitItem(item, version));
}

export function getItemId(
  parentId: string,
  sectionIndex: number | null,
  itemIndex: number
): string {
  return sectionIndex !== null
    ? `${parentId}-s${sectionIndex}-i${itemIndex}`
    : `${parentId}-i${itemIndex}`;
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
  const processItems = (items: MenuItem[], sectionIndex: number | null): void => {
    filterItems(items, version).forEach((item, itemIndex) => {
      if (!hasSubmenu(item)) return;

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
    });
  };

  menuToScan.sections
    ?.filter((section) => !shouldOmitSection(section, version))
    .forEach((section, sectionIndex) => processItems(section.items, sectionIndex));

  if (menuToScan.items) {
    processItems(menuToScan.items, null);
  }
}

function checkItemsForPath(
  items: MenuItem[],
  normalizedCurrentPath: string,
  basePath: string,
  versioned: VersionPrefix[] | undefined,
  lang: LanguageCode,
  version: string
): boolean {
  return filterItems(items, version).some((item) => {
    if (isLink(item)) {
      const href = resolveHref(item.href, lang, basePath, versioned, version, item.global);
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
  lang: LanguageCode,
  version: string
): boolean {
  const normalizedCurrentPath = normalizePath(currentPath);
  const filteredSections =
    submenuMenu.sections?.filter((s) => !shouldOmitSection(s, version)) ?? [];

  return (
    filteredSections.some((section) =>
      checkItemsForPath(
        section.items,
        normalizedCurrentPath,
        submenuBasePath,
        submenuVersioned,
        lang,
        version
      )
    ) ||
    (submenuMenu.items
      ? checkItemsForPath(
          submenuMenu.items,
          normalizedCurrentPath,
          submenuBasePath,
          submenuVersioned,
          lang,
          version
        )
      : false)
  );
}

export function calculateInitialActiveLevel(
  submenus: SubmenuData[],
  currentPath: string,
  lang: LanguageCode,
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
    const levelSubmenus = map.get(submenu.level);
    if (levelSubmenus) {
      levelSubmenus.push(submenu);
    } else {
      map.set(submenu.level, [submenu]);
    }
    return map;
  }, new Map<number, SubmenuData[]>());
}

export function detectVersionFromUrl(
  currentPath: string,
  versions: VersionConfig[],
  defaultVersion: string
): string {
  return versions.find((v) => currentPath.includes(`/${v.id}/`))?.id ?? defaultVersion;
}
