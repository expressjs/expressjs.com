/**
 * Typography Component Types
 */

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body-lg'
  | 'body'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'
  | 'code';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'inactive'
  | 'error'
  | 'success'
  | 'warning';

export type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export type TypographyHTMLTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'small'
  | 'label'
  | 'code'
  | 'pre';

export interface TypographyBaseProps {
  /** HTML element to render */
  as?: TypographyHTMLTag;
  /** Typography style variant */
  variant?: TypographyVariant;
  /** Text color */
  color?: TypographyColor;
  /** Font weight override */
  weight?: TypographyWeight;
  /** Center text alignment */
  center?: boolean;
  /** Left text alignment */
  left?: boolean;
  /** Right text alignment */
  right?: boolean;
  /** Enable vertical margin (default: true) */
  vMargin?: boolean;
}
