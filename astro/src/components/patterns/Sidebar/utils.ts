import type { Menu, MenuItem, VersionPrefix } from '@/config/types';
import type { VersionConfig } from '@/components/patterns/VersionSwitcher/types';

export type SubmenuData = {
  menu: Menu;
  title: string;
  id: string;
  basePath: string;
  versioned: boolean;
  level: number;
};

export function normalizePath(path: string): string {
  return path.replace(/\/$/, '');
}

export function resolveHref(
  href: string,
  lang: string,
  basePath: string,
  versioned: boolean,
  version: string
): string {
  if (versioned && basePath) {
    return `/${lang}${basePath}/${version}${href}`;
  } else if (basePath) {
    return `/${lang}${basePath}${href}`;
  }
  return `/${lang}${href}`;
}

export function isLink(item: MenuItem): item is MenuItem & { href: string } {
  return 'href' in item && item.href !== undefined;
}

export function hasSubmenu(item: MenuItem): item is MenuItem & { submenu: Menu } {
  return 'submenu' in item && item.submenu !== undefined;
}

export function shouldOmitItem(item: MenuItem, version: string): boolean {
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
  currentVersioned: boolean,
  version: string,
  submenus: SubmenuData[]
): void {
  const collectFromItems = (items: MenuItem[], sectionIndex: number | null) => {
    const filteredItems = filterItems(items, version);
    filteredItems.forEach((item, itemIndex) => {
      if (hasSubmenu(item)) {
        const itemId = getItemId(currentParentId, sectionIndex, itemIndex);
        const submenuId = `submenu-${itemId}`;
        const submenuBasePath = item.submenu.basePath || currentBasePath;
        const submenuVersioned = item.submenu.versioned ?? currentVersioned;

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
    .forEach((section, sectionIndex) => {
      collectFromItems(section.items, sectionIndex);
    });

  if (menuToScan.items) {
    collectFromItems(filterItems(menuToScan.items, version), null);
  }
}

function checkItemsForPath(
  items: MenuItem[],
  normalizedCurrentPath: string,
  basePath: string,
  versioned: boolean,
  currentPath: string,
  lang: string,
  version: string
): boolean {
  const filteredItems = filterItems(items, version);
  for (const item of filteredItems) {
    if (isLink(item)) {
      const href = resolveHref(item.href, lang, basePath, versioned, version);
      if (normalizedCurrentPath === normalizePath(href)) {
        return true;
      }
    }
    if (hasSubmenu(item)) {
      const nestedBasePath = item.submenu.basePath || basePath;
      const nestedVersioned = item.submenu.versioned ?? versioned;
      if (
        submenuContainsCurrentPath(
          item.submenu,
          nestedBasePath,
          nestedVersioned,
          currentPath,
          lang,
          version
        )
      ) {
        return true;
      }
    }
  }
  return false;
}

export function submenuContainsCurrentPath(
  submenuMenu: Menu,
  submenuBasePath: string,
  submenuVersioned: boolean,
  currentPath: string,
  lang: string,
  version: string
): boolean {
  const normalizedCurrentPath = normalizePath(currentPath);

  for (const section of submenuMenu.sections?.filter((s) => !shouldOmitSection(s, version)) || []) {
    if (
      checkItemsForPath(
        section.items,
        normalizedCurrentPath,
        submenuBasePath,
        submenuVersioned,
        currentPath,
        lang,
        version
      )
    ) {
      return true;
    }
  }

  if (
    submenuMenu.items &&
    checkItemsForPath(
      submenuMenu.items,
      normalizedCurrentPath,
      submenuBasePath,
      submenuVersioned,
      currentPath,
      lang,
      version
    )
  ) {
    return true;
  }

  return false;
}

export function calculateInitialActiveLevel(
  submenus: SubmenuData[],
  currentPath: string,
  lang: string,
  version: string
): number {
  let activeLevel = 0;

  for (const submenu of submenus) {
    if (
      submenuContainsCurrentPath(
        submenu.menu,
        submenu.basePath,
        submenu.versioned,
        currentPath,
        lang,
        version
      )
    ) {
      if (submenu.level > activeLevel) {
        activeLevel = submenu.level;
      }
    }
  }

  return activeLevel;
}

export function groupSubmenusByLevel(submenus: SubmenuData[]): Map<number, SubmenuData[]> {
  const submenusByLevel = new Map<number, SubmenuData[]>();
  submenus.forEach((submenu) => {
    const levelSubmenus = submenusByLevel.get(submenu.level) || [];
    levelSubmenus.push(submenu);
    submenusByLevel.set(submenu.level, levelSubmenus);
  });
  return submenusByLevel;
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
