/** Valid version prefixes for versioned content */
export type VersionPrefix = '5x' | '4x' | '3x';

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
