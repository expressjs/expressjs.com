export const navItems = [
  {
    key: 'docs',
    label: 'Docs',
    ariaLabel: 'Documentation',
    icon: 'files',
    sections: {
      starter: 'Getting started',
      guide: 'Guide',
      advanced: 'Advanced topics',
      resources: 'Resources',
    },
  },
  {
    key: 'api-reference',
    label: 'API Reference',
    ariaLabel: 'API Reference',
    icon: 'code',
    sections: {
      '5x': '5.x API',
      '4x': '4.x API',
      '3x': '3.x API (deprecated)',
    },
  },
  { href: `/blog/`, label: 'Blog', ariaLabel: 'Blog', icon: 'newspaper' },
  { href: `/support/`, label: 'Support', ariaLabel: 'Support', icon: 'info' },
];

export type NavItem = (typeof navItems)[number];
export type MenuSection = keyof (typeof navItems)[number]['sections'];
