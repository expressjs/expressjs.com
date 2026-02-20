import type { HTMLAttributes } from 'astro/types';

/**
 * Alert variant types
 */
export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the Alert component
 */
export interface AlertProps extends HTMLAttributes<'div'> {
  /**
   * Visual variant of the alert
   * @default 'default'
   */
  variant?: AlertVariant;

  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;

  /**
   * Icon name to display (uses astro-icon)
   * If not provided, defaults based on variant
   */
  icon?: string;

  /**
   * Hide the icon completely
   * @default false
   */
  hideIcon?: boolean;

  /**
   * Custom aria-label for the dismiss button
   * @default 'Dismiss alert'
   */
  dismissLabel?: string;

  /**
   * Additional CSS classes
   */
  class?: string;
}
