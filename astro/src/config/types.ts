/** Valid version prefixes for versioned content */
export type VersionPrefix = 'v5' | 'v4' | 'v3';

export type MenuItemBaseProps = {
  label: string;
  ariaLabel?: string;
  icon?: string;
  omitFrom?: VersionPrefix[];
};

export type MenuItem =
  | (MenuItemBaseProps & {
      href: string;
      submenu?: never;
    })
  | (MenuItemBaseProps & {
      submenu: Menu;
      href?: never;
    });

export type MenuSection = {
  title?: string;
  basePath?: string;
  versioned?: boolean;
  items: MenuItem[];
  omitFrom?: VersionPrefix[];
};

export type Menu = {
  sections?: MenuSection[];
  items?: MenuItem[];
  basePath?: string;
  versioned?: boolean;
};
