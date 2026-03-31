import type { Menu } from '../types';
import { middlewareMenu } from './middleware';

export const resourcesMenu: Menu = {
  basePath: '/resources',
  items: [
    { href: `/community`, label: 'menu.community', ariaLabel: 'menu.communityAria' },
    { href: `/glossary`, label: 'menu.glossary', ariaLabel: 'menu.glossaryAria' },
    { href: `/contributing`, label: 'menu.contributing', ariaLabel: 'menu.contributingAria' },
    { href: `/utils`, label: 'menu.utils', ariaLabel: 'menu.utilsAria' },
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
