import type { Menu } from '../types';

export const middlewareMenu: Menu = {
  items: [
    {
      href: `/overview`,
      label: 'Overview',
      ariaLabel: 'Middleware overview',
    },
    {
      href: `/body-parser`,
      label: 'body-parser',
      ariaLabel: 'body-parser middleware',
    },
    {
      href: `/compression`,
      label: 'compression',
      ariaLabel: 'compression middleware',
    },
    {
      href: `/connect-rid`,
      label: 'connect-rid',
      ariaLabel: 'connect-rid middleware',
    },
  ],
};
