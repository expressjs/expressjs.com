import { docsMenu } from './docs';
import { apiMenu } from './api';
import type { Menu } from '../types';
import { resourcesMenu } from './resources';

export const mainMenu: Menu = {
  sections: [
    {
      items: [
        {
          label: 'menu.main.docs',
          ariaLabel: 'menu.aria.docs',
          icon: 'document-bullet-list-multiple-20-regular',
          submenu: {
            versioned: ['5x', '4x'],
            sections: docsMenu.sections,
          },
        },
        {
          label: 'menu.main.api',
          ariaLabel: 'menu.aria.api',
          icon: 'code-20-regular',
          submenu: {
            versioned: ['5x', '4x', '3x'],
            sections: apiMenu.sections,
          },
        },
        {
          label: 'menu.main.resources',
          ariaLabel: 'menu.aria.resources',
          icon: 'folder-20-regular',
          submenu: {
            basePath: '/resources',
            items: resourcesMenu.items,
          },
        },
        {
          href: `/blog`,
          label: 'menu.main.blog',
          icon: 'news-20-regular',
          ariaLabel: 'menu.aria.blog',
        },
        {
          href: `/support`,
          label: 'menu.main.support',
          icon: 'info-20-regular',
          ariaLabel: 'menu.aria.support',
        },
      ],
    },
  ],
};
