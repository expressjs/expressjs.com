import { docsMenu } from './docs';
import { apiMenu } from './api';
import type { Menu } from '../types';
import { resourcesMenu } from './resources';

export const mainMenu: Menu = {
  sections: [
    {
      items: [
        {
          label: 'menu.docs',
          ariaLabel: 'menu.docsAria',
          icon: 'document-bullet-list-multiple-20-regular',
          href: '/starter/installing',
          submenu: {
            versioned: ['5x', '4x'],
            sections: docsMenu.sections,
          },
        },
        {
          label: 'menu.api',
          ariaLabel: 'menu.apiAria',
          icon: 'code-20-regular',
          href: '/api',
          submenu: {
            versioned: ['5x', '4x', '3x'],
            sections: apiMenu.sections,
          },
        },
        {
          label: 'menu.resources',
          ariaLabel: 'menu.resourcesAria',
          icon: 'folder-20-regular',
          href: '/community',
          submenu: {
            basePath: '/resources',
            items: resourcesMenu.items,
          },
        },
        { href: `/blog`, label: 'menu.blog', icon: 'news-20-regular', ariaLabel: 'menu.blogAria' },
        {
          href: `/support`,
          label: 'menu.support',
          icon: 'info-20-regular',
          ariaLabel: 'menu.supportAria',
        },
      ],
    },
  ],
};
