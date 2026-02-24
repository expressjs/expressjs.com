export class SidebarFocusTrap {
  private sidebar: HTMLElement;
  private getActiveSubmenuPath: () => string[];

  constructor(sidebar: HTMLElement, getActiveSubmenuPath: () => string[]) {
    this.sidebar = sidebar;
    this.getActiveSubmenuPath = getActiveSubmenuPath;
  }

  getFocusableElements(): HTMLElement[] {
    const activeSubmenuPath = this.getActiveSubmenuPath();
    const activeSubmenuId = activeSubmenuPath[activeSubmenuPath.length - 1];
    const activeColumn = this.sidebar.querySelector(`[data-parent-id="${activeSubmenuId}"]`);
    if (!activeColumn) return [];

    const selectors =
      'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(activeColumn.querySelectorAll(selectors));
  }

  trap(e: KeyboardEvent, isOpen: boolean): void {
    if (!isOpen) return;

    if (e.key === 'Tab') {
      this.handleTabNavigation(e);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      this.handleArrowNavigation(e);
    }
  }

  private handleTabNavigation(e: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }

  private handleArrowNavigation(e: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) return;

    e.preventDefault();

    let nextIndex: number;
    if (e.key === 'ArrowDown') {
      nextIndex = currentIndex + 1 >= focusableElements.length ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex - 1 < 0 ? focusableElements.length - 1 : currentIndex - 1;
    }

    focusableElements[nextIndex]?.focus();
  }
}
