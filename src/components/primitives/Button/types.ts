/**
 * Button Component Types
 */
import type { HTMLAttributes } from 'astro/types';

export type ButtonSize = 'md' | 'sm' | 'xs';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonBaseProps {
  /** Button size variant */
  size?: ButtonSize;
  /** Button style variant */
  variant?: ButtonVariant;
  /** Ghost style (no background) */
  ghost?: boolean;
}

export type AnchorProps = {
  as: 'a';
  href: string;
} & ButtonBaseProps &
  Omit<HTMLAttributes<'a'>, 'type' | 'href' | 'disabled'>;

export type NativeButtonProps = {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
} & ButtonBaseProps &
  HTMLAttributes<'button'>;
