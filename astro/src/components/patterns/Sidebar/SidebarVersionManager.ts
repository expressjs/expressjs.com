export class SidebarVersionManager {
  private sidebar: HTMLElement;
  private currentVersion: string;
  private activeSubmenuPath: string[];

  constructor(sidebar: HTMLElement, currentVersion: string, activeSubmenuPath: string[]) {
    this.sidebar = sidebar;
    this.currentVersion = currentVersion;
    this.activeSubmenuPath = activeSubmenuPath;
  }

  setup(): void {
    const versionSwitchers = this.sidebar.querySelectorAll(
      '[data-version-switcher] select, [data-version-select]'
    );

    versionSwitchers.forEach((switcher) => {
      switcher.addEventListener('change', (e) => {
        const select = e.target as HTMLSelectElement;
        this.handleVersionChange(select.value);
      });
    });
  }

  handleVersionChange(newVersion: string): void {
    const previousVersion = this.currentVersion;
    this.currentVersion = newVersion;

    document.dispatchEvent(
      new CustomEvent('sidebar:versionChange', {
        detail: { previousVersion, newVersion },
      })
    );

    const currentPath = this.sidebar.dataset.currentPath || '';

    if (currentPath.includes(`/${previousVersion}/`)) {
      if (this.isPathOmittedForVersion(currentPath, newVersion)) {
        const fallbackPath = this.getFirstAvailableLinkForVersion(newVersion, previousVersion);
        if (fallbackPath) {
          window.location.href = fallbackPath;
          return;
        }
      }

      window.location.href = currentPath.replace(`/${previousVersion}/`, `/${newVersion}/`);
      return;
    }

    if (this.isInVersionedSubmenu()) {
      const fallbackPath = this.getFirstAvailableLinkForVersion(newVersion, previousVersion);
      if (fallbackPath) {
        window.location.href = fallbackPath;
      }
    }
  }

  private isInVersionedSubmenu(): boolean {
    const activeSubmenuId = this.activeSubmenuPath[this.activeSubmenuPath.length - 1];
    if (activeSubmenuId === 'root') return false;

    const activePanel = this.sidebar.querySelector(
      `[data-parent-id="${activeSubmenuId}"]`
    ) as HTMLElement;

    if (!activePanel) return false;

    // Check if the active panel contains versioned links
    const versionedLink = activePanel.querySelector('a[href*="/v4/"], a[href*="/v5/"]');
    return versionedLink !== null;
  }

  private isPathOmittedForVersion(currentPath: string, targetVersion: string): boolean {
    const activeLink = this.sidebar.querySelector(
      'a.sidebar-nav-item--active[data-omit-from]'
    ) as HTMLAnchorElement;

    if (!activeLink) return false;

    const omitFrom = activeLink.dataset.omitFrom?.split(',') || [];
    return omitFrom.includes(targetVersion);
  }

  private getFirstAvailableLinkForVersion(
    targetVersion: string,
    previousVersion: string
  ): string | null {
    const activeSubmenuId = this.activeSubmenuPath[this.activeSubmenuPath.length - 1];
    const activePanel = this.sidebar.querySelector(
      `[data-parent-id="${activeSubmenuId}"]`
    ) as HTMLElement;

    if (!activePanel) return null;

    const links = activePanel.querySelectorAll(
      'a.sidebar-nav-item[href]'
    ) as NodeListOf<HTMLAnchorElement>;

    for (const link of links) {
      const omitFrom = link.dataset.omitFrom?.split(',') || [];
      if (!omitFrom.includes(targetVersion)) {
        const href = link.getAttribute('href') || '';
        if (href.includes(`/${previousVersion}/`)) {
          return href.replace(`/${previousVersion}/`, `/${targetVersion}/`);
        }
        return href;
      }
    }

    return null;
  }

  updateVisibility(activeLevel: number): void {
    const versionSwitchers = this.sidebar.querySelectorAll('[data-version-switcher]');

    versionSwitchers.forEach((switcher) => {
      const column = switcher.closest('[data-parent-id]') as HTMLElement;
      const parentId = column?.dataset.parentId || '';
      const isActiveColumn = parentId === this.activeSubmenuPath[this.activeSubmenuPath.length - 1];

      if (activeLevel > 0 && isActiveColumn) {
        switcher.classList.remove('sidebar-version-switcher--hidden');
      } else {
        switcher.classList.add('sidebar-version-switcher--hidden');
      }
    });
  }

  updatePath(path: string[]): void {
    this.activeSubmenuPath = path;
  }

  getVersion(): string {
    return this.currentVersion;
  }

  setVersion(version: string): void {
    const versionSelects =
      this.sidebar.querySelectorAll<HTMLSelectElement>('[data-version-select]');
    versionSelects.forEach((select) => {
      select.value = version;
    });
    this.handleVersionChange(version);
  }
}
