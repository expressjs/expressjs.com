import { docsMenu } from './docs';
import { apiMenu } from './api';
import type { Menu } from '../types';
import { resourcesMenu } from './resources';

export const mainMenu: Menu = {
  sections: [
    {
      items: [
        {
          label: 'Docs',
          ariaLabel: 'Documentation',
          icon: 'document-bullet-list-multiple-20-regular',
          submenu: {
            versioned: ['5x', '4x'],
            sections: docsMenu.sections,
          },
        },
        {
          label: 'API',
          ariaLabel: 'API Reference',
          icon: 'code-20-regular',
          submenu: {
            versioned: ['5x', '4x', '3x'],
            sections: apiMenu.sections,
          },
        },
        {
          label: 'Resources',
          ariaLabel: 'Resources',
          icon: 'folder-20-regular',
          submenu: {
            basePath: '/resources',
            items: resourcesMenu.items,
          },
        },
        { href: `/blog`, label: 'Blog', icon: 'news-20-regular', ariaLabel: 'Blog' },
        { href: `/support`, label: 'Support', icon: 'info-20-regular', ariaLabel: 'Support' },
      ],
    },
  ],
};
