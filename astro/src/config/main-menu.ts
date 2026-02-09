import { docsMenu } from './docs-menu';
import { apiReferenceMenu } from './api-reference-menu';
import type { Menu } from './types';

export const mainMenu: Menu = {
  sections: [
    {
      items: [
        {
          label: 'Docs',
          ariaLabel: 'Documentation',
          icon: 'document-bullet-list-multiple-20-regular',
          submenu: {
            versioned: true,
            sections: docsMenu.sections,
          },
        },
        {
          label: 'API Reference',
          ariaLabel: 'API Reference',
          icon: 'code-20-regular',
          submenu: {
            basePath: '/api-reference',
            versioned: true,
            sections: apiReferenceMenu.sections,
          },
        },
        { href: `/blog`, label: 'Blog', icon: 'news-20-regular', ariaLabel: 'Blog' },
        { href: `/support`, label: 'Support', icon: 'info-20-regular', ariaLabel: 'Support' },
      ],
    },
  ],
};
