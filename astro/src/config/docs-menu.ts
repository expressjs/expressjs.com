import type { Menu } from './types';
import { middlewareMenu } from './middleware-menu';

export const docsMenu: Menu = {
  sections: [
    {
      title: 'Getting started',
      items: [
        { href: `/starter/installing`, label: 'Installing' },
        { href: `/starter/hello-world`, label: 'Hello world' },
        { href: `/starter/generator`, label: 'Express generator', omitFrom: ['v4'] },
      ],
    },
    {
      title: 'Guide',
      items: [
        { href: `/guide/routing`, label: 'Routing' },
        { href: `/guide/writing-middleware`, label: 'Writing middleware' },
        { href: `/guide/using-middleware`, label: 'Using middleware' },
      ],
    },
    {
      title: 'Advanced topics',
      items: [
        { href: `/advanced/developing-template-engines`, label: 'Building template engines' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { href: `/resources/community`, label: 'Community' },
        { href: `/resources/glossary`, label: 'Glossary' },
        {
          label: 'Middleware',
          submenu: {
            sections: middlewareMenu.sections,
          },
        },
      ],
    },
  ],
};
