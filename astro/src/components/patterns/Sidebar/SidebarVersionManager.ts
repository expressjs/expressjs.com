export class SidebarVersionManager {
  private sidebar: HTMLElement;
  private currentVersion: string; // Content version from URL
  private displayVersion: string; // Menu version being shown
  private isExploringMode: boolean = false;
  private activeSubmenuPath: string[];
  private attemptedV3Navigation: boolean = false; // Track if user tried to view v3

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

    // Track if user is attempting to view v3 when not on v3 content
    if (newVersion === '3x' && this.currentVersion !== '3x') {
      this.attemptedV3Navigation = true;
    }

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
    // Keep attemptedV3Navigation flag - it persists until page navigation

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
    // Clear v3 attempt flag on page navigation
    this.attemptedV3Navigation = false;
    window.location.href = href;
  }

  shouldShowV3Warning(): boolean {
    // Check if we should show v3 warning (without showing it or changing state)
    // Use persistent flag that survives version sync
    return this.attemptedV3Navigation;
  }

  showV3WarningInPanel(panelId: string): void {
    // Show warning banner only in versioned panels that don't support v3
    // Scope to the current version menu to avoid finding panels from other versions
    const versionMenu = this.sidebar.querySelector(
      `[data-version-menu="${this.displayVersion}"]`
    );
    const panel = versionMenu?.querySelector(
      `[data-parent-id="${panelId}"]`
    ) as HTMLElement;

    if (panel) {
      // Check if panel is versioned and doesn't support v3
      const versionedAttr = panel.dataset.versioned;

      // Only show warning if:
      // 1. Panel is versioned (has data-versioned attribute)
      // 2. v3 is not supported (doesn't include '3x')
      if (versionedAttr && !versionedAttr.split(',').includes('3x')) {
        const warningBanner = panel.querySelector('[data-version-warning]');
        if (warningBanner) {
          warningBanner.setAttribute('data-show-warning', 'true');
        }
      }
    }
  }

  clearV3Warning(): void {
    // Clear the v3 attempt flag (called when warning is dismissed)
    this.attemptedV3Navigation = false;
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
