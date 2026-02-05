import { SidebarVersionManager } from './SidebarVersionManager';
import { SidebarFocusTrap } from './SidebarFocusTrap';

// CSS transition duration in milliseconds (must match Sidebar.css --duration-300)
const TRANSITION_DURATION = 300;

export class SidebarController {
  private sidebar: HTMLElement | null;
  private backdrop: HTMLElement | null;
  private navContainer: HTMLElement | null;
  private versionManager: SidebarVersionManager | null = null;
  private focusTrap: SidebarFocusTrap | null = null;

  private isOpen = false;
  private lastFocusedElement: HTMLElement | null = null;
  private activeLevel = 0;
  private activeSubmenuPath: string[] = ['root'];

  private initialActiveLevel = 0;
  private initialActiveSubmenuPath: string[] = ['root'];

  constructor() {
    this.sidebar = document.querySelector('[data-sidebar]');
    this.backdrop = document.querySelector('[data-sidebar-backdrop]');
    this.navContainer = document.querySelector('[data-nav-container]');

    if (this.sidebar && this.backdrop) {
      const currentVersion = this.sidebar.dataset.currentVersion || 'v5';
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

  private navigateToSubmenu(submenuId: string, level: number): void {
    const submenuColumn = this.sidebar?.querySelector(
      `[data-parent-id="${submenuId}"]`
    ) as HTMLElement;

    if (!submenuColumn) {
      console.warn(`Submenu column not found: ${submenuId}`);
      return;
    }

    this.activeSubmenuPath = this.activeSubmenuPath.slice(0, level);
    this.activeSubmenuPath.push(submenuId);
    this.activeLevel = level;
    this.versionManager?.updatePath(this.activeSubmenuPath);

    this.updateActiveColumns();

    if (this.navContainer) {
      this.navContainer.dataset.currentNavLevel = String(level);
    }

    setTimeout(() => {
      const firstFocusable = submenuColumn.querySelector('button, a') as HTMLElement;
      firstFocusable?.focus();
    }, TRANSITION_DURATION);
  }

  private navigateBack(): void {
    if (this.activeSubmenuPath.length <= 1) return;

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
    setTimeout(() => {
      triggerToFocus?.focus();
    }, TRANSITION_DURATION);
  }

  private updateActiveColumns(): void {
    this.sidebar?.querySelectorAll('[data-parent-id]').forEach((column) => {
      const parentId = (column as HTMLElement).dataset.parentId || '';
      const isInActivePath = this.activeSubmenuPath.includes(parentId);

      column.setAttribute('aria-hidden', isInActivePath ? 'false' : 'true');
      column.classList.toggle('sidebar-nav-panel--active', isInActivePath);
    });

    this.versionManager?.updateVisibility(this.activeLevel);
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

    setTimeout(() => this.focusTrap?.focusFirst(), TRANSITION_DURATION);
  }

  public close(): void {
    if (!this.isOpen || !this.sidebar || !this.backdrop) return;

    document.dispatchEvent(new CustomEvent('sidebar:closed'));
    this.isOpen = false;

    this.sidebar.setAttribute('aria-hidden', 'true');
    this.backdrop.setAttribute('aria-hidden', 'true');
    this.sidebar.classList.remove('sidebar--open');
    this.backdrop.classList.remove('sidebar-backdrop--visible');

    setTimeout(() => this.resetToInitialState(), TRANSITION_DURATION);

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

  public getVersion(): string {
    return this.versionManager?.getVersion() || 'v5';
  }

  public setVersion(version: string): void {
    this.versionManager?.setVersion(version);
  }
}

const sidebarController = new SidebarController();
(window as Window & { sidebarController?: SidebarController }).sidebarController =
  sidebarController;
