import type { MenuConfig, MenuLevel, MenuItem, VersionConfig, NavigationLevel } from './types';

/**
 * SidebarV2Controller
 *
 * Enhanced sidebar controller supporting:
 * - Unlimited navigation levels (dynamic stack-based navigation)
 * - Version switching for versioned content
 * - Focus trap and keyboard navigation
 * - Current page detection and auto-navigation
 */
export class SidebarV2Controller {
  private sidebar: HTMLElement | null;
  private backdrop: HTMLElement | null;
  private navContainer: HTMLElement | null;
  private dynamicLevels: HTMLElement | null;
  private versionSelect: HTMLSelectElement | null;
  private versionSwitcher: HTMLElement | null;

  private isOpen = false;
  private focusableElements: HTMLElement[] = [];
  private lastFocusedElement: HTMLElement | null = null;

  // Navigation state
  private menu: MenuConfig | null = null;
  private versions: VersionConfig[] = [];
  private currentVersion: string = 'v5';
  private lang: string = 'en';
  private currentPath: string = '';
  private navigationStack: NavigationLevel[] = [];
  private activeLevel = 0;
  private currentBasePath: string = '';
  private isVersionedContent: boolean = false;

  // Templates
  private navTemplate: HTMLTemplateElement | null = null;
  private sectionTemplate: HTMLTemplateElement | null = null;
  private linkTemplate: HTMLTemplateElement | null = null;
  private buttonTemplate: HTMLTemplateElement | null = null;
  private arrowTemplate: HTMLTemplateElement | null = null;

  constructor() {
    this.sidebar = document.querySelector('[data-sidebar-v2]');
    this.backdrop = document.querySelector('[data-sidebar-v2-backdrop]');
    this.navContainer = document.querySelector('[data-nav-container]');
    this.dynamicLevels = document.querySelector('[data-dynamic-levels]');
    this.versionSelect = document.querySelector('[data-version-select]');
    this.versionSwitcher = document.querySelector('[data-version-switcher]');

    // Get templates
    this.navTemplate = document.getElementById('sidebar-v2-nav-template') as HTMLTemplateElement;
    this.sectionTemplate = document.getElementById(
      'sidebar-v2-section-template'
    ) as HTMLTemplateElement;
    this.linkTemplate = document.getElementById('sidebar-v2-link-template') as HTMLTemplateElement;
    this.buttonTemplate = document.getElementById(
      'sidebar-v2-button-template'
    ) as HTMLTemplateElement;
    this.arrowTemplate = document.getElementById(
      'sidebar-v2-arrow-template'
    ) as HTMLTemplateElement;

    this.loadConfiguration();
    if (this.sidebar && this.backdrop) this.init();
  }

  private loadConfiguration(): void {
    if (!this.sidebar) return;

    const { menu, versions, defaultVersion, lang, currentPath } = this.sidebar.dataset;

    if (menu) {
      try {
        this.menu = JSON.parse(menu);
      } catch (e) {
        console.error('Failed to parse menu configuration:', e);
      }
    }

    if (versions) {
      try {
        this.versions = JSON.parse(versions);
      } catch (e) {
        console.error('Failed to parse versions configuration:', e);
      }
    }

    this.currentVersion = defaultVersion || 'v5';
    this.lang = lang || 'en';
    this.currentPath = currentPath || '';

    // Initialize root level in navigation stack
    if (this.menu) {
      this.navigationStack = [
        {
          title: 'Main Menu',
          content: this.menu,
        },
      ];
    }
  }

  private init(): void {
    // Backdrop click closes sidebar
    this.backdrop?.addEventListener('click', () => this.close());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Custom toggle event
    document.addEventListener('sidebar:toggle', () => this.toggle());

    // Initialize root level navigation handlers
    this.initRootLevelHandlers();

    // Version switcher handler
    this.versionSelect?.addEventListener('change', (e) => {
      this.handleVersionChange((e.target as HTMLSelectElement).value);
    });
  }

  private initRootLevelHandlers(): void {
    const rootNav = this.navContainer?.querySelector('[data-nav-level="0"]');
    if (!rootNav) return;

    rootNav.querySelectorAll('[data-submenu-trigger]').forEach((button) => {
      button.addEventListener('click', (e) => this.handleSubmenuClick(e, 0));
    });
  }

  private handleSubmenuClick(e: Event, currentLevel: number): void {
    const button = e.currentTarget as HTMLButtonElement;
    const itemPath = button.dataset.itemPath;
    const itemLabel = button.dataset.itemLabel;

    if (!itemPath || !this.menu) return;

    // Navigate to the item's submenu
    const item = this.getItemByPath(itemPath);
    if (item && 'submenu' in item && item.submenu) {
      const submenu = item.submenu;
      // Extract basePath and versioned from the submenu
      const basePath = submenu.basePath || this.currentBasePath;
      const versioned = submenu.versioned ?? this.isVersionedContent;

      this.pushLevel(itemLabel || 'Navigation', submenu, currentLevel + 1, basePath, versioned);
    }
  }

  /**
   * Get a menu item by its path (e.g., 'sections.0.items.1')
   */
  private getItemByPath(path: string): MenuItem | null {
    if (!this.menu) return null;

    const parts = path.split('.');
    let current: MenuLevel | MenuItem[] | MenuItem | undefined = this.menu;

    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      const index = parseInt(parts[i + 1], 10);

      if (key === 'sections' && 'sections' in current && current.sections) {
        current = current.sections[index];
        i++; // Skip the index
      } else if (key === 'items' && 'items' in current && current.items) {
        current = current.items[index];
        i++; // Skip the index
      } else if (key === 'submenu' && current && 'submenu' in current) {
        current = current.submenu;
      }

      if (!current) return null;
    }

    return current as MenuItem;
  }

  /**
   * Push a new navigation level onto the stack
   */
  private pushLevel(
    title: string,
    content: MenuLevel,
    levelIndex: number,
    basePath?: string,
    versioned?: boolean
  ): void {
    // Remove any levels after the current active level
    while (this.navigationStack.length > levelIndex) {
      this.navigationStack.pop();
      this.removeNavLevel(this.navigationStack.length);
    }

    // Update current basePath and versioned state
    if (basePath !== undefined) {
      this.currentBasePath = basePath;
    }
    if (versioned !== undefined) {
      this.isVersionedContent = versioned;
    }

    // Add the new level
    this.navigationStack.push({
      title,
      content,
      currentPath: this.currentPath,
      basePath: this.currentBasePath,
      versioned: this.isVersionedContent,
    });

    // Create and show the new level UI
    this.createNavLevel(content, title, levelIndex);
    this.slideToLevel(levelIndex);
    this.activeLevel = levelIndex;

    // Show/hide version switcher based on versioned content
    this.updateVersionSwitcherVisibility();
  }

  /**
   * Update version switcher visibility based on current navigation state
   */
  private updateVersionSwitcherVisibility(): void {
    if (!this.versionSwitcher) return;

    if (this.isVersionedContent && this.activeLevel > 0) {
      this.versionSwitcher.classList.remove('sidebar-v2-version-switcher--hidden');
    } else {
      this.versionSwitcher.classList.add('sidebar-v2-version-switcher--hidden');
    }
  }

  /**
   * Go back one navigation level
   */
  private popLevel(): void {
    if (this.activeLevel <= 0) return;

    const previousLevel = this.activeLevel - 1;
    this.slideToLevel(previousLevel);

    // Remove the popped level after animation
    setTimeout(() => {
      this.navigationStack.pop();
      this.removeNavLevel(this.activeLevel);
      this.activeLevel = previousLevel;

      // Restore basePath and versioned state from previous level
      const prevLevelState = this.navigationStack[previousLevel];
      if (prevLevelState) {
        this.currentBasePath = prevLevelState.basePath || '';
        this.isVersionedContent = prevLevelState.versioned || false;
      } else {
        this.currentBasePath = '';
        this.isVersionedContent = false;
      }

      // Update version switcher visibility
      this.updateVersionSwitcherVisibility();
    }, 300);
  }

  /**
   * Create a navigation level element
   */
  private createNavLevel(content: MenuLevel, title: string, levelIndex: number): void {
    if (!this.navTemplate || !this.dynamicLevels) return;

    const navClone = this.navTemplate.content.cloneNode(true) as DocumentFragment;
    const nav = navClone.querySelector('.sidebar-v2-nav') as HTMLElement;

    if (!nav) return;

    nav.dataset.navLevel = String(levelIndex);
    nav.setAttribute('aria-label', `${title} navigation`);

    // Set the title
    const titleEl = nav.querySelector('[data-nav-title]');
    if (titleEl) titleEl.textContent = title;

    // Setup back button
    const backButton = nav.querySelector('[data-back-button]');
    backButton?.addEventListener('click', () => this.popLevel());

    // Populate content
    const contentContainer = nav.querySelector('[data-nav-content]');
    if (contentContainer) {
      this.populateNavContent(contentContainer as HTMLElement, content, levelIndex);
    }

    this.dynamicLevels.appendChild(nav);
  }

  /**
   * Populate navigation content with sections and items
   */
  private populateNavContent(container: HTMLElement, content: MenuLevel, levelIndex: number): void {
    container.innerHTML = '';

    // Render sections
    if (content.sections) {
      content.sections.forEach((section, sectionIndex) => {
        const sectionEl = this.createSectionElement(
          section.title || '',
          section.items,
          levelIndex,
          `sections.${sectionIndex}.items`
        );
        container.appendChild(sectionEl);
      });
    }

    // Render standalone items (not in a section)
    if (content.items && content.items.length > 0) {
      const list = document.createElement('ul');
      list.className = 'sidebar-v2-section-list sidebar-v2-section-list--no-title';

      content.items.forEach((item, itemIndex) => {
        const li = this.createItemElement(item, levelIndex, `items.${itemIndex}`);
        list.appendChild(li);
      });

      container.appendChild(list);
    }
  }

  /**
   * Create a section element with title and items
   */
  private createSectionElement(
    title: string,
    items: MenuItem[],
    levelIndex: number,
    basePath: string
  ): HTMLElement {
    const section = document.createElement('div');
    section.className = 'sidebar-v2-section';

    if (title) {
      const titleEl = document.createElement('h4');
      titleEl.className = 'sidebar-v2-section-title';
      titleEl.textContent = title;
      section.appendChild(titleEl);
    }

    const list = document.createElement('ul');
    list.className = 'sidebar-v2-section-list';

    items.forEach((item, itemIndex) => {
      const li = this.createItemElement(item, levelIndex, `${basePath}.${itemIndex}`);
      list.appendChild(li);
    });

    section.appendChild(list);
    return section;
  }

  /**
   * Create an individual item element (link or button)
   */
  private createItemElement(item: MenuItem, levelIndex: number, itemPath: string): HTMLLIElement {
    const li = document.createElement('li');

    if ('href' in item && item.href) {
      // It's a link
      const href = this.resolveHref(item.href, item.version);
      const a = document.createElement('a');
      a.className = 'sidebar-v2-nav-item sidebar-v2-nav-item--inner';
      a.href = href;
      a.textContent = item.label;

      if (this.currentPath === href) {
        a.setAttribute('aria-current', 'page');
        a.classList.add('sidebar-v2-nav-item--active');
      }

      li.appendChild(a);
    } else if ('submenu' in item && item.submenu) {
      // It's a button with submenu
      const button = document.createElement('button');
      button.type = 'button';
      button.className =
        'sidebar-v2-nav-item sidebar-v2-nav-item--inner sidebar-v2-nav-item--submenu';
      button.dataset.submenuTrigger = '';
      button.dataset.itemPath = itemPath;
      button.dataset.itemLabel = item.label;
      button.setAttribute('aria-expanded', 'false');

      const labelSpan = document.createElement('span');
      labelSpan.className = 'sidebar-v2-nav-label';
      labelSpan.textContent = item.label;
      button.appendChild(labelSpan);

      // Add arrow icon
      if (this.arrowTemplate) {
        button.appendChild(this.arrowTemplate.content.cloneNode(true));
      } else {
        const arrow = document.createElement('span');
        arrow.className = 'sidebar-v2-nav-arrow';
        arrow.innerHTML = '→';
        button.appendChild(arrow);
      }

      button.addEventListener('click', (e) => {
        this.handleDynamicSubmenuClick(e, item.submenu!, item.label, levelIndex);
      });

      li.appendChild(button);
    }

    return li;
  }

  /**
   * Handle submenu click on dynamically created buttons
   */
  private handleDynamicSubmenuClick(
    e: Event,
    submenu: MenuLevel,
    label: string,
    currentLevel: number
  ): void {
    e.stopPropagation();
    // Extract basePath and versioned from the submenu
    const basePath = submenu.basePath || this.currentBasePath;
    const versioned = submenu.versioned ?? this.isVersionedContent;
    this.pushLevel(label, submenu, currentLevel + 1, basePath, versioned);
  }

  /**
   * Resolve href with basePath and version
   * Builds full paths like: /en/docs/v5/starter/installing
   */
  private resolveHref(href: string, itemVersion?: string): string {
    const version = itemVersion || this.currentVersion;

    // If href contains {version} placeholder, replace it
    if (href.includes('{version}')) {
      href = href.replace('{version}', version);
    }

    // Build the full path with basePath and version for versioned content
    let fullPath = '';

    if (this.isVersionedContent && this.currentBasePath) {
      // For versioned content: /lang/basePath/version/section/page
      // e.g., /en/docs/v5/starter/installing
      fullPath = `/${this.lang}${this.currentBasePath}/${version}${href}`;
    } else if (this.currentBasePath) {
      // For non-versioned content with basePath: /lang/basePath/section/page
      fullPath = `/${this.lang}${this.currentBasePath}${href}`;
    } else {
      // Default: /lang/href
      fullPath = `/${this.lang}${href}`;
    }

    return fullPath;
  }

  /**
   * Remove a navigation level element
   */
  private removeNavLevel(levelIndex: number): void {
    const nav = this.dynamicLevels?.querySelector(`[data-nav-level="${levelIndex}"]`);
    nav?.remove();
  }

  /**
   * Slide to a specific navigation level
   */
  private slideToLevel(levelIndex: number): void {
    if (!this.navContainer) return;

    // Update all nav levels
    const allNavs = this.navContainer.querySelectorAll('.sidebar-v2-nav');

    allNavs.forEach((nav) => {
      const navLevel = parseInt((nav as HTMLElement).dataset.navLevel || '0', 10);

      nav.classList.remove(
        'sidebar-v2-nav--active',
        'sidebar-v2-nav--slide-out',
        'sidebar-v2-nav--slide-in'
      );

      if (navLevel < levelIndex) {
        nav.classList.add('sidebar-v2-nav--slide-out');
        nav.setAttribute('aria-hidden', 'true');
      } else if (navLevel === levelIndex) {
        nav.classList.add('sidebar-v2-nav--active');
        nav.setAttribute('aria-hidden', 'false');
      } else {
        // Levels after active should be hidden to the right
        nav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /**
   * Handle version change
   */
  private handleVersionChange(newVersion: string): void {
    const previousVersion = this.currentVersion;
    this.currentVersion = newVersion;

    // Dispatch custom event for version change
    document.dispatchEvent(
      new CustomEvent('sidebar:versionChange', {
        detail: { previousVersion, newVersion },
      })
    );

    // If on a versioned page, navigate to the equivalent page in the new version
    if (this.currentPath.includes(`/${previousVersion}/`)) {
      const newPath = this.currentPath.replace(`/${previousVersion}/`, `/${newVersion}/`);
      window.location.href = newPath;
    }
  }

  /**
   * Get focusable elements within the sidebar
   */
  private getFocusableElements(): HTMLElement[] {
    if (!this.sidebar) return [];
    const selectors =
      'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(this.sidebar.querySelectorAll(selectors));
  }

  /**
   * Trap focus within the sidebar
   */
  private trapFocus(e: KeyboardEvent): void {
    if (!this.isOpen || e.key !== 'Tab') return;

    this.focusableElements = this.getFocusableElements();
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
        this.popLevel();
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
    this.sidebar.classList.add('sidebar-v2--open');
    this.backdrop.classList.add('sidebar-v2-backdrop--visible');
    document.body.style.overflow = 'hidden';

    // Auto-navigate to current page if found
    this.navigateToCurrentPage();

    // Focus first focusable element
    setTimeout(() => {
      this.focusableElements = this.getFocusableElements();
      this.focusableElements[0]?.focus();
    }, 300);
  }

  /**
   * Navigate to the current page's location in the menu
   */
  private navigateToCurrentPage(): void {
    // This would need to traverse the menu tree to find the current page
    // and auto-expand to that level. Implementation depends on the actual
    // menu structure and current path matching logic.
    // For now, this is a placeholder for the auto-navigation feature.
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
    this.sidebar.classList.remove('sidebar-v2--open');
    this.backdrop.classList.remove('sidebar-v2-backdrop--visible');

    // Reset to root level after close animation
    setTimeout(() => {
      this.resetToRootLevel();
    }, 300);

    document.body.style.overflow = '';
    this.lastFocusedElement?.focus();
    this.lastFocusedElement = null;
  }

  /**
   * Reset navigation to root level
   */
  private resetToRootLevel(): void {
    // Remove all dynamic levels
    if (this.dynamicLevels) {
      this.dynamicLevels.innerHTML = '';
    }

    // Reset navigation stack
    if (this.menu) {
      this.navigationStack = [
        {
          title: 'Main Menu',
          content: this.menu,
        },
      ];
    }

    // Reset basePath and versioned state
    this.currentBasePath = '';
    this.isVersionedContent = false;

    this.activeLevel = 0;
    this.slideToLevel(0);

    // Hide version switcher
    this.updateVersionSwitcherVisibility();
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
    if (this.versionSelect) {
      this.versionSelect.value = version;
    }
    this.handleVersionChange(version);
  }
}

// Initialize and expose globally
const sidebarV2Controller = new SidebarV2Controller();
(window as Window & { sidebarV2Controller?: SidebarV2Controller }).sidebarV2Controller =
  sidebarV2Controller;
