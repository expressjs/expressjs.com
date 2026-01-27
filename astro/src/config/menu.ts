export const menuSections = {
  starter: 'Getting started',
  guide: 'Guide',
  advanced: 'Advanced topics',
  resources: 'Resources',
} as const;

export type MenuSection = keyof typeof menuSections;
