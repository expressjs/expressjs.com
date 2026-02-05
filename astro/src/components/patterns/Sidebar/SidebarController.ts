/**
 * SidebarController (Simplified)
 *
 * Minimal JS controller for statically-rendered sidebar:
 * - Open/close sidebar
 * - Navigate between pre-rendered menu levels (slide animations)
 * - Focus trap and keyboard navigation
 * - Version switching
 *
 * All menu content is pre-rendered at build time by Astro.
 * This controller only handles UI interactions.
 */

export class SidebarController {
  private sidebar: HTMLElement | null;
  private backdrop: HTMLElement | null;
  private navContainer: HTMLElement | null;

  private isOpen = false;
  private focusableElements: HTMLElement[] = [];
  private lastFocusedElement: HTMLElement | null = null;

  // Navigation state - track the path of active submenu IDs
  private activeLevel = 0;
  private activeSubmenuPath: string[] = ['root']; // Stack of active submenu IDs
  private currentVersion: string;

  // Store initial active state for restoration on close
  private initialActiveLevel = 0;
  private initialActiveSubmenuPath: string[] = ['root'];

  constructor() {
    this.sidebar = document.querySelector('[data-sidebar]');
    this.backdrop = document.querySelector('[data-sidebar-backdrop]');
    this.navContainer = document.querySelector('[data-nav-container]');
    this.currentVersion = this.sidebar?.dataset.currentVersion || 'v5';

    if (this.sidebar && this.backdrop) {
      this.init();
    }
  }

  private init(): void {
    // Backdrop click to close
    this.backdrop?.addEventListener('click', () => this.close());

    // Keyboard events
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Custom event to toggle sidebar
    document.addEventListener('sidebar:toggle', () => this.toggle());

    // Setup submenu triggers (buttons that navigate to deeper levels)
    this.setupSubmenuTriggers();

    // Setup back buttons
    this.setupBackButtons();

    // Setup version switchers
    this.setupVersionSwitchers();

    // Initialize active state from pre-rendered data
    this.initializeFromActiveState();

    // Set initial active state
    this.updateActiveColumns();
  }

  /**
   * Initialize navigation state from pre-rendered active classes
   */
  private initializeFromActiveState(): void {
    // Read initial active level from data attribute
    const rootColumn = this.sidebar?.querySelector('[data-initial-active-level]') as HTMLElement;
    const initialActiveLevel = parseInt(rootColumn?.dataset.initialActiveLevel || '0', 10);

    if (initialActiveLevel > 0) {
      // Build the active submenu path by finding active panels at each level
      this.activeSubmenuPath = ['root'];

      for (let level = 1; level <= initialActiveLevel; level++) {
        // Find the active panel at this level by checking panels within the level's column
        const levelColumn = this.sidebar?.querySelector(`[data-nav-level="${level}"]`);
        const activePanelInLevel = levelColumn?.querySelector(
          '.sidebar-nav-panel.sidebar-nav-panel--active'
        ) as HTMLElement;

        if (activePanelInLevel) {
          const parentId = activePanelInLevel.dataset.parentId;
          if (parentId) {
            this.activeSubmenuPath.push(parentId);
          }
        }
      }

      this.activeLevel = initialActiveLevel;

      // Store initial state for restoration on close
      this.initialActiveLevel = initialActiveLevel;
      this.initialActiveSubmenuPath = [...this.activeSubmenuPath];

      // Set the initial nav level on the container for CSS transforms
      if (this.navContainer) {
        this.navContainer.dataset.currentNavLevel = String(initialActiveLevel);
      }
    }
  }

  /**
   * Setup all submenu trigger buttons
   */
  private setupSubmenuTriggers(): void {
    const triggers = this.sidebar?.querySelectorAll('[data-submenu-trigger]');

    triggers?.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const button = e.currentTarget as HTMLButtonElement;
        const targetId = button.dataset.targetId;
        const targetLevel = parseInt(button.dataset.targetLevel || '1', 10);

        if (targetId) {
          this.navigateToSubmenu(targetId, targetLevel);
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /**
   * Setup all back buttons
   */
  private setupBackButtons(): void {
    const backButtons = this.sidebar?.querySelectorAll('[data-back-button]');

    backButtons?.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateBack();
      });
    });
  }

  /**
   * Setup version switchers
   */
  private setupVersionSwitchers(): void {
    const versionSwitchers = this.sidebar?.querySelectorAll(
      '[data-version-switcher] select, [data-version-select]'
    );

    versionSwitchers?.forEach((switcher) => {
      switcher.addEventListener('change', (e) => {
        const select = e.target as HTMLSelectElement;
        this.handleVersionChange(select.value);
      });
    });
  }

  /**
   * Navigate to a submenu by its ID
   */
  private navigateToSubmenu(submenuId: string, level: number): void {
    const submenuColumn = this.sidebar?.querySelector(
      `[data-parent-id="${submenuId}"]`
    ) as HTMLElement;

    if (!submenuColumn) {
      console.warn(`Submenu column not found: ${submenuId}`);
      return;
    }

    // Truncate path to current level and add new submenu
    this.activeSubmenuPath = this.activeSubmenuPath.slice(0, level);
    this.activeSubmenuPath.push(submenuId);
    this.activeLevel = level;

    // Update which columns are visible
    this.updateActiveColumns();

    // Update current navigation level attribute for CSS-driven transforms
    if (this.navContainer) {
      this.navContainer.dataset.currentNavLevel = String(level);
    }

    // Focus first focusable element in the new level
    setTimeout(() => {
      const firstFocusable = submenuColumn.querySelector('button, a') as HTMLElement;
      firstFocusable?.focus();
    }, 300);
  }

  /**
   * Navigate back to previous level
   */
  private navigateBack(): void {
    if (this.activeSubmenuPath.length <= 1) return;

    // Get the current submenu ID before popping
    const currentSubmenuId = this.activeSubmenuPath[this.activeSubmenuPath.length - 1];

    // Collapse aria-expanded on the trigger that opened this level
    if (currentSubmenuId) {
      const trigger = this.sidebar?.querySelector(`[data-target-id="${currentSubmenuId}"]`);
      trigger?.setAttribute('aria-expanded', 'false');
    }

    // Remove current submenu from path
    this.activeSubmenuPath.pop();
    this.activeLevel = this.activeSubmenuPath.length - 1;

    // Update which columns are visible
    this.updateActiveColumns();

    // Update current navigation level attribute for CSS-driven transforms
    if (this.navContainer) {
      this.navContainer.dataset.currentNavLevel = String(this.activeLevel);
    }
  }

  /**
   * Update which columns are active/visible based on activeSubmenuPath
   */
  private updateActiveColumns(): void {
    const allColumns = this.sidebar?.querySelectorAll('[data-parent-id]');

    allColumns?.forEach((column) => {
      const parentId = (column as HTMLElement).dataset.parentId || '';
      const isInActivePath = this.activeSubmenuPath.includes(parentId);

      column.setAttribute('aria-hidden', isInActivePath ? 'false' : 'true');
      column.classList.toggle('sidebar-nav-panel--active', isInActivePath);
    });

    // Update version switcher visibility
    this.updateVersionSwitcherVisibility();
  }

  /**
   * Update version switcher visibility based on current level
   */
  private updateVersionSwitcherVisibility(): void {
    const versionSwitchers = this.sidebar?.querySelectorAll('[data-version-switcher]');

    versionSwitchers?.forEach((switcher) => {
      // Only show version switcher in the currently active nested column
      const column = switcher.closest('[data-parent-id]') as HTMLElement;
      const parentId = column?.dataset.parentId || '';
      const isActiveColumn = parentId === this.activeSubmenuPath[this.activeSubmenuPath.length - 1];

      if (this.activeLevel > 0 && isActiveColumn) {
        switcher.classList.remove('sidebar-version-switcher--hidden');
      } else {
        switcher.classList.add('sidebar-version-switcher--hidden');
      }
    });
  }

  /**
   * Handle version change
   */
  private handleVersionChange(newVersion: string): void {
    const previousVersion = this.currentVersion;
    this.currentVersion = newVersion;

    // Dispatch custom event
    document.dispatchEvent(
      new CustomEvent('sidebar:versionChange', {
        detail: { previousVersion, newVersion },
      })
    );

    // Navigate to equivalent page in new version
    const currentPath = this.sidebar?.dataset.currentPath || '';
    if (currentPath.includes(`/${previousVersion}/`)) {
      const newPath = currentPath.replace(`/${previousVersion}/`, `/${newVersion}/`);
      window.location.href = newPath;
    }
  }

  /**
   * Get focusable elements within the currently active column
   */
  private getFocusableElements(): HTMLElement[] {
    if (!this.sidebar) return [];

    // Get the currently active column by its parent ID
    const activeSubmenuId = this.activeSubmenuPath[this.activeSubmenuPath.length - 1];
    const activeColumn = this.sidebar.querySelector(`[data-parent-id="${activeSubmenuId}"]`);
    if (!activeColumn) return [];

    const selectors =
      'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(activeColumn.querySelectorAll(selectors));
  }

  /**
   * Trap focus within the sidebar
   */
  private trapFocus(e: KeyboardEvent): void {
    if (!this.isOpen || e.key !== 'Tab') return;

    this.focusableElements = this.getFocusableElements();
    if (this.focusableElements.length === 0) return;

    const first = this.focusableElements[0];
    const last = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }

  /**
   * Handle keyboard events
   */
  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.isOpen) {
      if (this.activeLevel > 0) {
        this.navigateBack();
      } else {
        this.close();
      }
    }
    this.trapFocus(e);
  }

  /**
   * Open the sidebar
   */
  public open(): void {
    if (this.isOpen || !this.sidebar || !this.backdrop) return;

    this.lastFocusedElement = document.activeElement as HTMLElement;
    this.isOpen = true;

    this.sidebar.setAttribute('aria-hidden', 'false');
    this.backdrop.setAttribute('aria-hidden', 'false');
    this.sidebar.classList.add('sidebar--open');
    this.backdrop.classList.add('sidebar-backdrop--visible');
    document.body.style.overflow = 'hidden';

    // Focus first focusable element after animation
    setTimeout(() => {
      this.focusableElements = this.getFocusableElements();
      this.focusableElements[0]?.focus();
    }, 300);
  }

  /**
   * Close the sidebar
   */
  public close(): void {
    if (!this.isOpen || !this.sidebar || !this.backdrop) return;

    document.dispatchEvent(new CustomEvent('sidebar:closed'));
    this.isOpen = false;

    this.sidebar.setAttribute('aria-hidden', 'true');
    this.backdrop.setAttribute('aria-hidden', 'true');
    this.sidebar.classList.remove('sidebar--open');
    this.backdrop.classList.remove('sidebar-backdrop--visible');

    // Reset to initial active state after close animation
    setTimeout(() => {
      this.resetToInitialState();
    }, 300);

    document.body.style.overflow = '';
    this.lastFocusedElement?.focus();
    this.lastFocusedElement = null;
  }

  /**
   * Reset navigation to initial active state (panel containing current URL)
   */
  private resetToInitialState(): void {
    // Reset aria-expanded on all triggers
    const triggers = this.sidebar?.querySelectorAll('[data-submenu-trigger]');
    triggers?.forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
    });

    // Restore to initial active state (based on current URL)
    this.activeSubmenuPath = [...this.initialActiveSubmenuPath];
    this.activeLevel = this.initialActiveLevel;

    // Update columns visibility
    this.updateActiveColumns();

    // Update container transform for CSS-driven transforms
    if (this.navContainer) {
      this.navContainer.dataset.currentNavLevel = String(this.activeLevel);
    }
  }

  /**
   * Toggle the sidebar open/closed
   */
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Get current version
   */
  public getVersion(): string {
    return this.currentVersion;
  }

  /**
   * Set version programmatically
   */
  public setVersion(version: string): void {
    // Update all version selects
    const versionSelects =
      this.sidebar?.querySelectorAll<HTMLSelectElement>('[data-version-select]');
    versionSelects?.forEach((select) => {
      select.value = version;
    });
    this.handleVersionChange(version);
  }
}

// Initialize and expose globally
const sidebarController = new SidebarController();
(window as Window & { sidebarController?: SidebarController }).sidebarController =
  sidebarController;
