export interface PageInfo {
  title: string;
  slug: string;
  href: string;
  order: number;
  isOverview?: boolean;
}

export interface SubfolderInfo {
  label: string;
  pages: PageInfo[];
  order: number;
}

export interface SectionWithPages {
  label: string;
  pages: PageInfo[];
  subfolders: Record<string, SubfolderInfo>;
}

export type NavigationData = Record<string, Record<string, SectionWithPages>>;

// Union type for combined nav items in the sidebar
export type NavItem =
  | { type: 'page'; data: PageInfo }
  | { type: 'subfolder'; key: string; data: SubfolderInfo };
