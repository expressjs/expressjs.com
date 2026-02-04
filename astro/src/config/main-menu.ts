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
          icon: 'files',
          submenu: {
            basePath: '/docs',
            versioned: true,
            sections: docsMenu.sections,
          },
        },
        {
          label: 'API Reference',
          ariaLabel: 'API Reference',
          icon: 'code',
          submenu: {
            basePath: '/api-reference',
            versioned: true,
            sections: apiReferenceMenu.sections,
          },
        },
        { href: `/blog`, label: 'Blog', icon: 'newspaper' },
        { href: `/support`, label: 'Support', icon: 'info' },
      ],
    },
  ],
};
