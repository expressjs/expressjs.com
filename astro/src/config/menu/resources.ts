import type { Menu } from '../types';
import { middlewareMenu } from './middleware';

export const resourcesMenu: Menu = {
  items: [
    { href: `/community`, label: 'Community', ariaLabel: 'Community resources' },
    { href: `/glossary`, label: 'Glossary', ariaLabel: 'Glossary of terms' },
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
