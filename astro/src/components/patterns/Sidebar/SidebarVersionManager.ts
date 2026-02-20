export class SidebarVersionManager {
  private sidebar: HTMLElement;
  private currentVersion: string; // Content version from URL
  private displayVersion: string; // Menu version being shown
  private isExploringMode: boolean = false;
  private activeSubmenuPath: string[];

  constructor(sidebar: HTMLElement, contentVersion: string, activeSubmenuPath: string[]) {
    this.sidebar = sidebar;
    this.currentVersion = contentVersion;
    this.displayVersion = contentVersion; // Start synced
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
    const previousVersion = this.displayVersion;
    this.displayVersion = newVersion;
    this.isExploringMode = this.displayVersion !== this.currentVersion;

    // Update sidebar data attribute for CSS visibility
    this.sidebar.dataset.displayVersion = newVersion;

    // Update exploring class
    if (this.isExploringMode) {
      this.sidebar.classList.add('sidebar--exploring');
    } else {
      this.sidebar.classList.remove('sidebar--exploring');
    }

    // Update all version switcher dropdowns
    const versionSelects =
      this.sidebar.querySelectorAll<HTMLSelectElement>('[data-version-select]');
    versionSelects.forEach((select) => {
      select.value = newVersion;
    });

    // Dispatch event with exploration state
    document.dispatchEvent(
      new CustomEvent('sidebar:versionChange', {
        detail: {
          previousVersion,
          newVersion,
          isExploring: this.isExploringMode,
          contentVersion: this.currentVersion,
        },
      })
    );
  }

  isExploring(): boolean {
    return this.isExploringMode;
  }

  syncVersionsFromUrl(): void {
    // Extract version from current URL
    const pathname = window.location.pathname;
    const versionMatch = pathname.match(/\/(5x|4x|3x)\//);
    const urlVersion = versionMatch ? versionMatch[1] : '5x';

    // Reset to content version
    this.currentVersion = urlVersion;
    this.displayVersion = urlVersion;
    this.isExploringMode = false;

    // Update UI
    this.sidebar.dataset.contentVersion = urlVersion;
    this.sidebar.dataset.displayVersion = urlVersion;
    this.sidebar.classList.remove('sidebar--exploring');

    // Update dropdowns
    const versionSelects =
      this.sidebar.querySelectorAll<HTMLSelectElement>('[data-version-select]');
    versionSelects.forEach((select) => {
      select.value = urlVersion;
    });
  }

  navigateWithVersionSync(href: string): void {
    // If exploring, rewrite URL to use display version
    if (this.isExploringMode && href.includes(`/${this.currentVersion}/`)) {
      href = href.replace(`/${this.currentVersion}/`, `/${this.displayVersion}/`);
    }
    window.location.href = href;
  }

  checkV3Warning(): boolean {
    // Returns false and shows warning if switching to v3 in non-v3 context
    if (this.displayVersion === '3x' && this.currentVersion !== '3x') {
      this.showV3Warning();
      return false;
    }
    return true;
  }

  private showV3Warning(): void {
    // Show warning banner in active submenu
    const activeSubmenuId = this.activeSubmenuPath[this.activeSubmenuPath.length - 1];
    const activePanel = this.sidebar.querySelector(
      `[data-parent-id="${activeSubmenuId}"]`
    ) as HTMLElement;

    if (activePanel) {
      const warningBanner = activePanel.querySelector('[data-version-warning]');
      if (warningBanner) {
        warningBanner.setAttribute('data-show-warning', 'true');
      }
    }

    // Revert to content version
    this.handleVersionChange(this.currentVersion);
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
    this.handleVersionChange(version);
  }
}
