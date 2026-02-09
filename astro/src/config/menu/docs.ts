import type { Menu } from '../types';

export const docsMenu: Menu = {
  sections: [
    {
      title: 'Getting started',
      items: [
        { href: `/starter/installing`, label: 'Installing', ariaLabel: 'Installing Express' },
        { href: `/starter/hello-world`, label: 'Hello world', ariaLabel: 'Hello world example' },
        { href: `/starter/generator`, label: 'Express generator', ariaLabel: 'Express generator' },
      ],
    },
    {
      title: 'Guide',
      items: [
        { href: `/guide/routing`, label: 'Routing', ariaLabel: 'Routing guide' },
        {
          href: `/guide/writing-middleware`,
          label: 'Writing middleware',
          ariaLabel: 'Writing middleware guide',
        },
        {
          href: `/guide/using-middleware`,
          label: 'Using middleware',
          ariaLabel: 'Using middleware guide',
        },
      ],
    },
    {
      title: 'Advanced topics',
      items: [
        {
          href: `/advanced/developing-template-engines`,
          label: 'Building template engines',
          ariaLabel: 'Building template engines guide',
        },
      ],
    },
  ],
};
