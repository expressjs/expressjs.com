/**
 * Grid System Component Types
 */

// Shared
export type GapSize = '0' | '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16';

// Grid
export interface GridProps {
  /** Gap between grid items */
  gap?: GapSize;
  /** Vertical gap override */
  rowGap?: GapSize;
  /** Horizontal gap override */
  columnGap?: GapSize;
  /** Align items on block axis */
  align?: FlexAlign;
  /** Justify items on inline axis */
  justify?: FlexJustify;
}

// Col
export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColProps {
  /** Column span for mobile (xs) breakpoint */
  xs?: ColSpan;
  /** Column span for tablet (md) breakpoint */
  md?: ColSpan;
  /** Column span for desktop (lg) breakpoint */
  lg?: ColSpan;
}

// Flex
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProps {
  /** Flex direction */
  direction?: FlexDirection;
  /** Align items on cross axis */
  align?: FlexAlign;
  /** Justify content on main axis */
  justify?: FlexJustify;
  /** Flex wrap behavior */
  wrap?: FlexWrap;
  /** Gap between flex items */
  gap?: GapSize;
}

// FlexItem
export type FlexGrow = boolean;

export type FlexShrink = boolean;

export type FlexBasis = '0' | 'auto' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';

export type FlexShorthand = '1' | 'auto' | 'initial' | 'none';

export interface FlexItemProps {
  /** Flex grow factor (ability to grow) */
  grow?: FlexGrow;
  /** Flex shrink factor (ability to shrink) */
  shrink?: FlexShrink;
  /** Flex basis (initial size) */
  basis?: FlexBasis;
  /** Flex shorthand (overrides grow/shrink/basis) */
  flex?: FlexShorthand;
}
