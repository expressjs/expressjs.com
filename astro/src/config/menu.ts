export const menuSections = {
  docs: {
    starter: 'Getting started',
    guide: 'Guide',
    advanced: 'Advanced topics',
    resources: 'Resources',
  },
  'api-reference': {
    '5x': '5.x API',
    '4x': '4.x API',
    '3x': '3.x API (deprecated)',
  },
};

export const navItems = [
  {
    key: 'docs',
    label: 'Docs',
    ariaLabel: 'Documentation',
    icon: 'files',
    sections: menuSections.docs,
  },
  {
    key: 'api-reference',
    label: 'API Reference',
    ariaLabel: 'API Reference',
    icon: 'code',
    sections: menuSections['api-reference'],
  },
  { href: `/blog/`, label: 'Blog', ariaLabel: 'Blog', icon: 'newspaper' },
  { href: `/support/`, label: 'Support', ariaLabel: 'Support', icon: 'info' },
];

export type NavItem = (typeof navItems)[number];
export type MenuSection = keyof typeof menuSections;
