/**
 * Alert Component Types
 */

export type AlertType = 'info' | 'alert' | 'warning';

export interface AlertProps {
  /** Alert type — controls color scheme and icon */
  type?: AlertType;
  /** Title text (rendered next to the icon) */
  title?: string;
}
