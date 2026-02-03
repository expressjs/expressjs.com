import type { NavigationData, NavItem } from './types';

interface CurrentPageInfo {
  navKey: string;
  navLabel: string;
  sections: Record<string, string>;
  currentHref: string;
  inSubfolder: boolean;
  subfolderKey?: string;
  subfolderLabel?: string;
  sectionKey?: string;
}

/**
 * Sidebar state management and accessibility controller
 * Handles:
 * - Open/close with focus trap
 * - Multi-level navigation with slide animations
 * - Current page detection and auto-navigation
 * - Keyboard navigation (Escape to go back/close)
 */
export class SidebarController {
  private sidebar: HTMLElement | null;
  private backdrop: HTMLElement | null;
  private isOpen = false;
  private focusableElements: HTMLElement[] = [];
  private lastFocusedElement: HTMLElement | null = null;
  private firstLevelNav: HTMLElement | null;
  private secondLevelNav: HTMLElement | null;
  private thirdLevelNav: HTMLElement | null;
  private secondLevelList: HTMLElement | null;
  private thirdLevelList: HTMLElement | null;
  private navTitle: HTMLElement | null;
  private subfolderTitle: HTMLElement | null;
  private backToFirstButton: HTMLElement | null;
  private backToSecondButton: HTMLElement | null;
  private isSecondLevelActive = false;
  private isThirdLevelActive = false;
  private currentNavKey: string | undefined;
  private navigationData: NavigationData = {};

  constructor() {
    this.sidebar = document.querySelector('[data-sidebar]');
    this.backdrop = document.querySelector('[data-sidebar-backdrop]');
    this.firstLevelNav = document.querySelector('[data-nav-level="first"]');
    this.secondLevelNav = document.querySelector('[data-nav-level="second"]');
    this.thirdLevelNav = document.querySelector('[data-nav-level="third"]');
    this.secondLevelList = document.querySelector('[data-second-level-list]');
    this.thirdLevelList = document.querySelector('[data-third-level-list]');
    this.navTitle = document.querySelector('[data-nav-title]');
    this.subfolderTitle = document.querySelector('[data-nav-subfolder-title]');
    this.backToFirstButton = document.querySelector('[data-back-to-first]');
    this.backToSecondButton = document.querySelector('[data-back-to-second]');

    this.loadNavigationData();
    if (this.sidebar && this.backdrop) this.init();
  }

  private loadNavigationData(): void {
    if (!this.sidebar?.dataset.navigation) return;
    try {
      this.navigationData = JSON.parse(this.sidebar.dataset.navigation);
    } catch (error) {
      console.error('Failed to parse navigation data:', error);
    }
  }

  private init(): void {
    this.backdrop?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('sidebar:toggle', () => this.toggle());
    this.initNavigationHandlers();
  }

  private initNavigationHandlers(): void {
    this.firstLevelNav?.querySelectorAll('button[data-nav-key]').forEach((button) => {
      button.addEventListener('click', (e) => this.handleNavItemClick(e));
    });
    this.backToFirstButton?.addEventListener('click', () => this.navigateToFirstLevel());
    this.backToSecondButton?.addEventListener('click', () => this.navigateToSecondLevelFromThird());
  }

  private handleNavItemClick(e: Event): void {
    const button = e.currentTarget as HTMLButtonElement;
    const { navLabel, navKey, sections: sectionsData } = button.dataset;
    if (!sectionsData || !navLabel) return;

    try {
      this.navigateToSecondLevel(navLabel, JSON.parse(sectionsData), navKey, undefined);
    } catch (error) {
      console.error('Failed to parse sections data:', error);
    }
  }

  private detectCurrentPage(): CurrentPageInfo | null {
    const currentPath = window.location.pathname;

    for (const [navKey, navData] of Object.entries(this.navigationData)) {
      for (const [sectionKey, sectionData] of Object.entries(navData)) {
        // Check direct pages
        if (sectionData.pages.some((page) => page.href === currentPath)) {
          return this.buildPageInfo(navKey, sectionKey, currentPath, false);
        }

        // Check subfolders
        if (sectionData.subfolders) {
          for (const [subfolderKey, subfolderData] of Object.entries(sectionData.subfolders)) {
            if (subfolderData.pages.some((page) => page.href === currentPath)) {
              return this.buildPageInfo(
                navKey,
                sectionKey,
                currentPath,
                true,
                subfolderKey,
                subfolderData.label
              );
            }
          }
        }
      }
    }
    return null;
  }

  private buildPageInfo(
    navKey: string,
    sectionKey: string,
    currentHref: string,
    inSubfolder: boolean,
    subfolderKey?: string,
    subfolderLabel?: string
  ): CurrentPageInfo | null {
    const navButton = this.firstLevelNav?.querySelector(
      `button[data-nav-key="${navKey}"]`
    ) as HTMLButtonElement;

    if (!navButton) return null;

    return {
      navKey,
      navLabel: navButton.dataset.navLabel || '',
      sections: navButton.dataset.sections ? JSON.parse(navButton.dataset.sections) : {},
      currentHref,
      inSubfolder,
      subfolderKey,
      subfolderLabel,
      sectionKey,
    };
  }

  private navigateToSecondLevel(
    title: string,
    sections: Record<string, string>,
    navKey: string | undefined,
    currentHref?: string
  ): void {
    if (
      !this.firstLevelNav ||
      !this.secondLevelNav ||
      !this.secondLevelList ||
      !this.navTitle ||
      !navKey
    )
      return;

    this.currentNavKey = navKey;
    this.navTitle.textContent = title;
    this.secondLevelList.innerHTML = '';

    const navData = this.navigationData[navKey];
    if (!navData) {
      console.warn(`No navigation data found for ${navKey}`);
      return;
    }

    Object.entries(sections).forEach(([sectionKey, sectionLabel]) => {
      const sectionData = navData[sectionKey];
      if (!sectionData) return;

      const hasContent =
        sectionData.pages.length > 0 ||
        (sectionData.subfolders && Object.keys(sectionData.subfolders).length > 0);
      if (!hasContent) return;

      this.renderSection(sectionKey, sectionLabel, sectionData, currentHref);
    });

    this.slideToSecondLevel();
  }

  private renderSection(
    sectionKey: string,
    sectionLabel: string,
    sectionData: NavigationData[string][string],
    currentHref?: string
  ): void {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'sidebar-nav-section';
    sectionDiv.setAttribute('role', 'group');
    sectionDiv.setAttribute('aria-labelledby', `section-${sectionKey}`);

    const heading = document.createElement('h4');
    heading.id = `section-${sectionKey}`;
    heading.className = 'sidebar-nav-section-title';
    heading.textContent = sectionLabel;
    sectionDiv.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'sidebar-nav-section-list';
    list.setAttribute('role', 'list');

    // Combine and sort pages and subfolders
    const items: NavItem[] = [
      ...sectionData.pages.map((page) => ({ type: 'page' as const, data: page })),
      ...Object.entries(sectionData.subfolders || {})
        .filter(([, data]) => data.pages.length > 0)
        .map(([key, data]) => ({ type: 'subfolder' as const, key, data })),
    ].sort((a, b) => a.data.order - b.data.order);

    items.forEach((item) => {
      const li = document.createElement('li');
      if (item.type === 'page') {
        li.appendChild(this.createPageLink(item.data, 'second-level', currentHref));
      } else {
        li.appendChild(
          this.createSubfolderButton(item.key, item.data.label, sectionKey, currentHref)
        );
      }
      list.appendChild(li);
    });

    sectionDiv.appendChild(list);
    this.secondLevelList?.appendChild(sectionDiv);
  }

  private createPageLink(
    page: { href: string; title: string },
    level: 'second-level' | 'third-level',
    currentHref?: string
  ): HTMLAnchorElement {
    const a = document.createElement('a');
    a.href = page.href;
    a.className = `sidebar-nav-item sidebar-nav-item--${level}`;
    a.textContent = page.title;

    if (currentHref && page.href === currentHref) {
      a.setAttribute('aria-current', 'page');
    }
    return a;
  }

  private createSubfolderButton(
    subfolderKey: string,
    label: string,
    sectionKey: string,
    currentHref?: string
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className =
      'sidebar-nav-item sidebar-nav-item--second-level sidebar-nav-item--subfolder';
    button.dataset.subfolderKey = subfolderKey;
    button.dataset.sectionKey = sectionKey;
    button.setAttribute('aria-expanded', 'false');

    const labelSpan = document.createElement('span');
    labelSpan.className = 'sidebar-nav-subfolder-label';
    labelSpan.textContent = label;
    button.appendChild(labelSpan);

    const arrowTemplate = document.getElementById(
      'subfolder-arrow-template'
    ) as HTMLTemplateElement;
    if (arrowTemplate) {
      button.appendChild(arrowTemplate.content.cloneNode(true));
    }

    button.addEventListener('click', () => {
      this.navigateToThirdLevel(subfolderKey, label, sectionKey, currentHref);
    });

    return button;
  }

  private navigateToThirdLevel(
    subfolderKey: string,
    subfolderLabel: string,
    sectionKey: string,
    currentHref?: string
  ): void {
    if (
      !this.secondLevelNav ||
      !this.thirdLevelNav ||
      !this.thirdLevelList ||
      !this.subfolderTitle ||
      !this.currentNavKey
    )
      return;

    this.subfolderTitle.textContent = subfolderLabel;
    this.thirdLevelList.innerHTML = '';

    const subfolderData =
      this.navigationData[this.currentNavKey]?.[sectionKey]?.subfolders?.[subfolderKey];
    if (!subfolderData) {
      console.warn(`No subfolder data found for ${subfolderKey}`);
      return;
    }

    const list = document.createElement('ul');
    list.className = 'sidebar-nav-section-list sidebar-nav-section-list--third-level';
    list.setAttribute('role', 'list');

    subfolderData.pages.forEach((page) => {
      const li = document.createElement('li');
      li.appendChild(this.createPageLink(page, 'third-level', currentHref));
      list.appendChild(li);
    });

    this.thirdLevelList.appendChild(list);
    this.slideToThirdLevel();
  }

  private slideToSecondLevel(): void {
    this.firstLevelNav?.classList.add('sidebar-nav--slide-out');
    this.secondLevelNav?.classList.add('sidebar-nav--slide-in');
    this.secondLevelNav?.setAttribute('aria-hidden', 'false');
    this.isSecondLevelActive = true;
  }

  private slideToThirdLevel(): void {
    this.secondLevelNav?.classList.add('sidebar-nav--slide-out');
    this.thirdLevelNav?.classList.add('sidebar-nav--slide-in');
    this.thirdLevelNav?.setAttribute('aria-hidden', 'false');
    this.isThirdLevelActive = true;
  }

  private navigateToSecondLevelFromThird(): void {
    if (!this.secondLevelNav || !this.thirdLevelNav) return;

    this.secondLevelNav.classList.remove('sidebar-nav--slide-out');
    this.thirdLevelNav.classList.remove('sidebar-nav--slide-in');
    this.thirdLevelNav.setAttribute('aria-hidden', 'true');
    this.isThirdLevelActive = false;

    setTimeout(() => this.backToFirstButton?.focus(), 300);
  }

  private navigateToFirstLevel(): void {
    if (!this.firstLevelNav || !this.secondLevelNav) return;

    if (this.isThirdLevelActive && this.thirdLevelNav) {
      this.thirdLevelNav.classList.remove('sidebar-nav--slide-in');
      this.thirdLevelNav.setAttribute('aria-hidden', 'true');
      this.secondLevelNav.classList.remove('sidebar-nav--slide-out');
      this.isThirdLevelActive = false;
    }

    this.firstLevelNav.classList.remove('sidebar-nav--slide-out');
    this.secondLevelNav.classList.remove('sidebar-nav--slide-in');
    this.secondLevelNav.setAttribute('aria-hidden', 'true');
    this.isSecondLevelActive = false;

    this.currentNavKey = undefined;

    setTimeout(() => {
      this.firstLevelNav?.querySelector('button')?.focus();
    }, 300);
  }

  private getFocusableElements(): HTMLElement[] {
    if (!this.sidebar) return [];
    const selectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(this.sidebar.querySelectorAll(selectors));
  }

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

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.isOpen) {
      if (this.isThirdLevelActive) {
        this.navigateToSecondLevelFromThird();
      } else if (this.isSecondLevelActive) {
        this.navigateToFirstLevel();
      } else {
        this.close();
      }
    }
    this.trapFocus(e);
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

    const currentPageInfo = this.detectCurrentPage();
    if (currentPageInfo) {
      this.navigateToSecondLevel(
        currentPageInfo.navLabel,
        currentPageInfo.sections,
        currentPageInfo.navKey,
        currentPageInfo.currentHref
      );

      if (
        currentPageInfo.inSubfolder &&
        currentPageInfo.subfolderKey &&
        currentPageInfo.subfolderLabel &&
        currentPageInfo.sectionKey
      ) {
        setTimeout(() => {
          this.navigateToThirdLevel(
            currentPageInfo.subfolderKey!,
            currentPageInfo.subfolderLabel!,
            currentPageInfo.sectionKey!,
            currentPageInfo.currentHref
          );
        }, 50);
      }
    } else {
      setTimeout(() => {
        this.focusableElements = this.getFocusableElements();
        this.focusableElements[0]?.focus();
      }, 300);
    }
  }

  public close(): void {
    if (!this.isOpen || !this.sidebar || !this.backdrop) return;

    document.dispatchEvent(new CustomEvent('sidebar:closed'));
    this.isOpen = false;
    this.sidebar.setAttribute('aria-hidden', 'true');
    this.backdrop.setAttribute('aria-hidden', 'true');
    this.sidebar.classList.remove('sidebar--open');
    this.backdrop.classList.remove('sidebar-backdrop--visible');

    if (this.isThirdLevelActive || this.isSecondLevelActive) {
      this.navigateToFirstLevel();
    }

    document.body.style.overflow = '';
    this.lastFocusedElement?.focus();
    this.lastFocusedElement = null;
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

// Initialize and expose globally
const sidebarController = new SidebarController();
(window as Window & { sidebarController?: SidebarController }).sidebarController =
  sidebarController;
