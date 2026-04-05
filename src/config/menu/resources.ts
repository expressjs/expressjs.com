import type { Menu } from '../types';
import { middlewareMenu } from './middleware';

export const resourcesMenu: Menu = {
  basePath: '/resources',
  items: [
    {
      href: `/`,
      label: 'menu.items.overview',
      ariaLabel: 'menu.items.overview',
    },
    {
      href: `/community`,
      label: 'menu.items.community',
      ariaLabel: 'menu.aria.community',
    },
    {
      href: `/glossary`,
      label: 'menu.items.glossary',
      ariaLabel: 'menu.aria.glossary',
    },
    {
      href: `/contributing`,
      label: 'menu.items.contributing',
      ariaLabel: 'menu.aria.contributing',
    },
    {
      href: `/utils`,
      label: 'menu.items.utils',
      ariaLabel: 'menu.aria.utils',
    },
    {
      label: 'menu.sections.middleware',
      ariaLabel: 'menu.aria.middleware',
      submenu: {
        basePath: '/resources/middleware',
        items: middlewareMenu.items,
      },
    },
  ],
};
