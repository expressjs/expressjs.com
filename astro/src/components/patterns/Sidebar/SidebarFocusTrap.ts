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
    if (!isOpen || e.key !== 'Tab') return;

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

  focusFirst(): void {
    const focusableElements = this.getFocusableElements();
    focusableElements[0]?.focus();
  }
}
