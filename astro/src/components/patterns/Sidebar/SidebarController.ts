import { SidebarVersionManager } from './SidebarVersionManager';
import { SidebarFocusTrap } from './SidebarFocusTrap';

// CSS transition duration in milliseconds (must match Sidebar.css --duration-300)
const TRANSITION_DURATION = 300;

export class SidebarController {
  private static readonly FOCUSABLE_SELECTOR =
    'a:not([tabindex="-1"]), button:not([tabindex="-1"]), input:not([tabindex="-1"]), select:not([tabindex="-1"]), textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';
  private static readonly INTERACTIVE_SELECTOR = 'a, button, input, select, textarea';

  private sidebar: HTMLElement | null;
  private backdrop: HTMLElement | null;
  private navContainer: HTMLElement | null;
  private versionManager: SidebarVersionManager | null = null;
  private focusTrap: SidebarFocusTrap | null = null;

  private isOpen = false;
  private lastFocusedElement: HTMLElement | null = null;
  private activeLevel = 0;
  private activeSubmenuPath: string[] = ['root'];
  private selectedItem: HTMLElement | null = null;

  private initialActiveLevel = 0;
  private initialActiveSubmenuPath: string[] = ['root'];

  constructor() {
    this.sidebar = document.querySelector('[data-sidebar]');
    this.backdrop = document.querySelector('[data-sidebar-backdrop]');
    this.navContainer = document.querySelector('[data-nav-container]');

    if (this.sidebar && this.backdrop) {
      const currentVersion = this.sidebar.dataset.currentVersion || '5x';
      this.versionManager = new SidebarVersionManager(
        this.sidebar,
        currentVersion,
        this.activeSubmenuPath
      );
      this.focusTrap = new SidebarFocusTrap(this.sidebar, () => this.activeSubmenuPath);
      this.init();
    }
  }

  private init(): void {
    this.backdrop?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('sidebar:toggle', () => this.toggle());

    this.setupSubmenuTriggers();
    this.setupBackButtons();
    this.setupNavItemSelection();
    this.versionManager?.setup();
    this.initializeFromActiveState();
    this.updateActiveColumns();
  }

  private initializeFromActiveState(): void {
    const rootColumn = this.sidebar?.querySelector('[data-initial-active-level]') as HTMLElement;
    const initialActiveLevel = parseInt(rootColumn?.dataset.initialActiveLevel || '0', 10);

    if (initialActiveLevel > 0) {
      this.activeSubmenuPath = ['root'];

      for (let level = 1; level <= initialActiveLevel; level++) {
        const levelColumn = this.sidebar?.querySelector(`[data-nav-level="${level}"]`);
        const activePanelInLevel = levelColumn?.querySelector(
          '.sidebar-nav-panel.sidebar-nav-panel--active'
        ) as HTMLElement;

        if (activePanelInLevel?.dataset.parentId) {
          this.activeSubmenuPath.push(activePanelInLevel.dataset.parentId);
        }
      }

      this.activeLevel = initialActiveLevel;
      this.initialActiveLevel = initialActiveLevel;
      this.initialActiveSubmenuPath = [...this.activeSubmenuPath];
      this.versionManager?.updatePath(this.activeSubmenuPath);

      if (this.navContainer) {
        this.navContainer.dataset.currentNavLevel = String(initialActiveLevel);
      }
    }
  }

  private focusActiveLevel(): void {
    const currentSubmenuId = this.activeSubmenuPath[this.activeSubmenuPath.length - 1];
    const targetContainer = this.sidebar?.querySelector(
      `[data-parent-id="${currentSubmenuId}"]`
    ) as HTMLElement;

    if (!targetContainer) {
      console.warn(`Focus target not found for submenu: ${currentSubmenuId}`);
      return;
    }

    const firstFocusable = targetContainer.querySelector(
      SidebarController.FOCUSABLE_SELECTOR
    ) as HTMLElement;

    if (!firstFocusable) {
      console.warn(`No focusable elements found in: ${currentSubmenuId}`);
      return;
    }

    firstFocusable.focus();
  }

  private setupSubmenuTriggers(): void {
    this.sidebar?.querySelectorAll('[data-submenu-trigger]').forEach((trigger) => {
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

  private setupBackButtons(): void {
    this.sidebar?.querySelectorAll('[data-back-button]').forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateBack();
      });
    });
  }

  private setupNavItemSelection(): void {
    this.sidebar?.querySelectorAll('.sidebar-nav-item').forEach((item) => {
      item.addEventListener('click', () => {
        // Only track selection for root-level items (level 0)
        const isRootLevel = item.closest('[data-nav-level="0"]') !== null;
        if (isRootLevel) {
          this.setSelectedItem(item as HTMLElement);
        }
      });
    });
  }

  private setSelectedItem(item: HTMLElement): void {
    // Remove selected class from previous item
    if (this.selectedItem) {
      this.selectedItem.classList.remove('sidebar-nav-item--selected');
    }

    // Add selected class to new item
    item.classList.add('sidebar-nav-item--selected');
    this.selectedItem = item;
  }

  private navigateToSubmenu(submenuId: string, level: number): void {
    const submenuColumn = this.sidebar?.querySelector(
      `[data-parent-id="${submenuId}"]`
    ) as HTMLElement;

    if (!submenuColumn) {
      console.warn(`Submenu column not found: ${submenuId}`);
      return;
    }

    this.enableTransitions();

    // Check if this submenu is part of the initial path (contains current page)
    // If so, restore to the initial navigation state instead of just going to target level
    const isInInitialPath = this.initialActiveSubmenuPath.includes(submenuId);
    const shouldRestoreInitialState = isInInitialPath && this.initialActiveLevel > level;

    if (shouldRestoreInitialState) {
      // Restore to the initial deep navigation state
      this.activeSubmenuPath = [...this.initialActiveSubmenuPath];
      this.activeLevel = this.initialActiveLevel;
    } else {
      this.activeSubmenuPath = this.activeSubmenuPath.slice(0, level);
      this.activeSubmenuPath.push(submenuId);
      this.activeLevel = level;
    }

    this.versionManager?.updatePath(this.activeSubmenuPath);

    this.updateActiveColumns();

    if (this.navContainer) {
      this.navContainer.dataset.currentNavLevel = String(this.activeLevel);
    }

    this.afterTransition(() => this.focusActiveLevel());
  }

  private navigateBack(): void {
    if (this.activeSubmenuPath.length <= 1) return;

    this.enableTransitions();

    // Clear selected item state when navigating back
    if (this.selectedItem) {
      this.selectedItem.classList.remove('sidebar-nav-item--selected');
      this.selectedItem = null;
    }

    const currentSubmenuId = this.activeSubmenuPath[this.activeSubmenuPath.length - 1];
    let triggerToFocus: HTMLElement | null = null;

    if (currentSubmenuId) {
      const trigger = this.sidebar?.querySelector(
        `[data-target-id="${currentSubmenuId}"]`
      ) as HTMLElement;
      trigger?.setAttribute('aria-expanded', 'false');
      triggerToFocus = trigger;
    }

    this.activeSubmenuPath.pop();
    this.activeLevel = this.activeSubmenuPath.length - 1;
    this.versionManager?.updatePath(this.activeSubmenuPath);

    this.updateActiveColumns();

    if (this.navContainer) {
      this.navContainer.dataset.currentNavLevel = String(this.activeLevel);
    }

    // Restore focus to the trigger button after the transition
    this.afterTransition(() => triggerToFocus?.focus());
  }

  private updateActiveColumns(): void {
    const allLevels = this.sidebar?.querySelectorAll('[data-nav-level]');

    allLevels?.forEach((column) => {
      const columnLevel = parseInt((column as HTMLElement).dataset.navLevel || '0', 10);
      const isCurrentLevel = columnLevel === this.activeLevel;

      if (columnLevel === 0) {
        column.setAttribute('aria-hidden', 'false');
        this.updateFocusableElements(column as HTMLElement, true);
      } else {
        const panels = column.querySelectorAll('[data-parent-id]');
        panels.forEach((panel) => {
          const parentId = (panel as HTMLElement).dataset.parentId || '';
          const isInActivePath = this.activeSubmenuPath.includes(parentId);

          panel.setAttribute('aria-hidden', isInActivePath ? 'false' : 'true');
          panel.classList.toggle('sidebar-nav-panel--active', isInActivePath);

          const shouldBeFocusable = isCurrentLevel && isInActivePath;
          this.updateFocusableElements(panel as HTMLElement, shouldBeFocusable);
        });
      }
    });

    this.versionManager?.updateVisibility(this.activeLevel);
  }

  private updateFocusableElements(container: HTMLElement, isVisible: boolean): void {
    const scrollableContainers = container.querySelectorAll('.sidebar-nav-content, .sidebar-nav');
    scrollableContainers.forEach((scrollContainer) => {
      if (isVisible) {
        scrollContainer.removeAttribute('tabindex');
      } else {
        scrollContainer.setAttribute('tabindex', '-1');
      }
    });

    const focusableElements = container.querySelectorAll(SidebarController.INTERACTIVE_SELECTOR);

    focusableElements.forEach((element) => {
      if (isVisible) {
        const originalTabindex = element.getAttribute('data-original-tabindex');
        if (originalTabindex !== null) {
          if (originalTabindex === '') {
            element.removeAttribute('tabindex');
          } else {
            element.setAttribute('tabindex', originalTabindex);
          }
          element.removeAttribute('data-original-tabindex');
        }
      } else {
        const currentTabindex = element.getAttribute('tabindex');
        const hasOriginalTabindex = element.hasAttribute('data-original-tabindex');

        if (!hasOriginalTabindex && currentTabindex !== '-1') {
          element.setAttribute('data-original-tabindex', currentTabindex || '');
          element.setAttribute('tabindex', '-1');
        }
      }
    });
  }

  private enableTransitions(): void {
    this.navContainer?.classList.add('sidebar-container--interactive');
  }

  private afterTransition(callback: () => void): void {
    setTimeout(callback, TRANSITION_DURATION);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.isOpen) {
      if (this.activeLevel > 0) {
        this.navigateBack();
      } else {
        this.close();
      }
    }
    this.focusTrap?.trap(e, this.isOpen);
  }

  public open(): void {
    if (this.isOpen || !this.sidebar || !this.backdrop) return;

    this.lastFocusedElement = document.activeElement as HTMLElement;
    this.isOpen = true;

    this.sidebar.setAttribute('aria-hidden', 'false');
    this.backdrop.setAttribute('aria-hidden', 'false');
    this.sidebar.classList.add('sidebar--open');
    this.backdrop.classList.add('sidebar-backdrop--visible');
    document.body.style.overflow = 'hidden';

    this.afterTransition(() => this.focusActiveLevel());
  }

  public close(): void {
    if (!this.isOpen || !this.sidebar || !this.backdrop) return;

    document.dispatchEvent(new CustomEvent('sidebar:closed'));
    this.isOpen = false;

    // Clear selected item state immediately
    if (this.selectedItem) {
      this.selectedItem.classList.remove('sidebar-nav-item--selected');
      this.selectedItem = null;
    }

    this.sidebar.setAttribute('aria-hidden', 'true');
    this.backdrop.setAttribute('aria-hidden', 'true');
    this.sidebar.classList.remove('sidebar--open');
    this.backdrop.classList.remove('sidebar-backdrop--visible');

    this.afterTransition(() => this.resetToInitialState());

    document.body.style.overflow = '';
    this.lastFocusedElement?.focus();
    this.lastFocusedElement = null;
  }

  private resetToInitialState(): void {
    this.sidebar?.querySelectorAll('[data-submenu-trigger]').forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
    });

    this.activeSubmenuPath = [...this.initialActiveSubmenuPath];
    this.activeLevel = this.initialActiveLevel;
    this.versionManager?.updatePath(this.activeSubmenuPath);

    this.updateActiveColumns();

    if (this.navContainer) {
      this.navContainer.dataset.currentNavLevel = String(this.activeLevel);
    }
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

declare global {
  interface Window {
    sidebarController?: SidebarController;
  }
}

(window as Window).sidebarController = new SidebarController();
