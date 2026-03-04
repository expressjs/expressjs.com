export interface BannerProps {
  /**
   * Unique identifier for this banner.
   * Used as the HTML `id` and as the localStorage key for persisting dismissal state.
   */
  id: string;

  /**
   * Visual style of the banner.
   * @default 'info'
   */
  variant?: 'info' | 'warning';

  /**
   * Title of the banner.
   * Displayed prominently at the start of the banner.
   */
  title: string;

  /**
   * Whether the user can dismiss (close) the banner.
   * Dismissal state is persisted in localStorage so the banner stays hidden across sessions.
   * @default false
   */
  dismissible?: boolean;

  /**
   * ISO date string or Date object.
   * The banner will not be displayed before this date.
   * Omit to show the banner immediately.
   */
  startDate?: Date | string;

  /**
   * ISO date string or Date object.
   * The banner will not be displayed after this date.
   * Omit to show the banner indefinitely.
   */
  endDate?: Date | string;
}
