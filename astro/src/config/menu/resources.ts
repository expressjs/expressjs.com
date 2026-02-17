import type { Menu } from '../types';
import { middlewareMenu } from './middleware';

export const resourcesMenu: Menu = {
  items: [
    { href: `/community`, label: 'menu.community', ariaLabel: 'menu.communityAria' },
    { href: `/glossary`, label: 'menu.glossary', ariaLabel: 'menu.glossaryAria' },
    {
      label: 'menu.middleware',
      ariaLabel: 'menu.middlewareAria',
      submenu: {
        basePath: '/resources/middleware',
        items: middlewareMenu.items,
      },
    },
  ],
};
