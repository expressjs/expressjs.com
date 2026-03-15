import type { Menu } from '../types';

export const middlewareMenu: Menu = {
  items: [
    {
      href: `/overview`,
      label: 'menu.overview',
      ariaLabel: 'menu.middlewareOverviewAria',
    },
    {
      href: `/body-parser`,
      label: 'body-parser',
      ariaLabel: 'body-parser middleware',
    },
    {
      href: `/compression`,
      label: 'compression',
      ariaLabel: 'compression middleware',
    },
  ],
};
