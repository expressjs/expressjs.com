/**
 * Button Component Types
 */

export type ButtonSize = 'md' | 'sm' | 'xs';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonHTMLTag = 'button' | 'a';

export interface ButtonBaseProps {
  /** HTML element to render */
  as?: ButtonHTMLTag;
  /** Button size variant */
  size?: ButtonSize;
  /** Button style variant */
  variant?: ButtonVariant;
  /** Ghost style (no background) */
  ghost?: boolean;
  /** Button type (only for button element) */
  type?: 'button' | 'submit' | 'reset';
}
