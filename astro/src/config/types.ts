type MenuItemBaseProps = {
  label: string;
  ariaLabel?: string;
  icon?: string;
};

// Menu item can be either a link or a button that opens a submenu
type MenuItem =
  | (MenuItemBaseProps & {
      href: string;
      submenu?: never;
    })
  | (MenuItemBaseProps & {
      submenu: Menu;
      href?: never;
    });

type MenuSection = {
  title?: string;
  basePath?: string;
  versioned?: boolean;
  items: MenuItem[];
};

export type Menu = {
  sections?: MenuSection[];
  items?: MenuItem[];
  basePath?: string;
  versioned?: boolean;
};
