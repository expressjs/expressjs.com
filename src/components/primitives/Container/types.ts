/**
 * Container Component Types
 */

export type ContainerHTMLTag =
  | 'div'
  | 'section'
  | 'article'
  | 'main'
  | 'header'
  | 'footer'
  | 'aside'
  | 'nav';

export interface ContainerProps {
  /** HTML element to render */
  as?: ContainerHTMLTag;
}
