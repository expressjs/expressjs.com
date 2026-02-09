import type { Menu } from '../types';

export const middlewareMenu: Menu = {
  sections: [
    {
      items: [
        {
          href: `/resources/middleware/overview`,
          label: 'Overview',
          ariaLabel: 'Middleware overview',
        },
        {
          href: `/resources/middleware/body-parser`,
          label: 'body-parser',
          ariaLabel: 'body-parser middleware',
        },
        {
          href: `/resources/middleware/compression`,
          label: 'compression',
          ariaLabel: 'compression middleware',
        },
        {
          href: `/resources/middleware/connect-rid`,
          label: 'connect-rid',
          ariaLabel: 'connect-rid middleware',
        },
      ],
    },
  ],
};
