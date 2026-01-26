/**
 * Typography Components
 *
 * Base component + shorthand variants for better DX
 */

// Base component (full control)
export { default as Typography } from './Typography.astro';

// Shorthand components (preset variants)
export { default as H1 } from './H1.astro';
export { default as H2 } from './H2.astro';
export { default as H3 } from './H3.astro';
export { default as H4 } from './H4.astro';
export { default as H5 } from './H5.astro';
export { default as Body } from './Body.astro';
export { default as BodyMd } from './BodyMd.astro';
export { default as BodySm } from './BodySm.astro';
export { default as BodyXs } from './BodyXs.astro';
export { default as Code } from './Code.astro';

export type { TypographyVariant, TypographyColor, TypographyWeight } from './Typography.astro';
