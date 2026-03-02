import type { Menu } from '../types';
import { middlewareMenu } from './middleware';

export const resourcesMenu: Menu = {
  items: [
    { href: `/community`, label: 'menu.community', ariaLabel: 'menu.communityAria' },
    { href: `/glossary`, label: 'menu.glossary', ariaLabel: 'menu.glossaryAria' },
    { href: `/contributing`, label: 'Express community' },
    { href: `/utils`, label: 'Express utilities' },
    {
      label: 'Middleware',
      ariaLabel: 'Middleware resources',
      submenu: {
        basePath: '/resources/middleware',
        items: middlewareMenu.items,
      },
    },
  ],
};
