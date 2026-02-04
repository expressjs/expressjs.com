import type { Menu } from './types';

export const middlewareMenu: Menu = {
  sections: [
    {
      items: [
        { href: `/resources/middleware/body-parser`, label: 'body-parser' },
        { href: `/resources/middleware/compression`, label: 'compression' },
        { href: `/resources/middleware/connect-rid`, label: 'connect-rid' },
      ],
    },
  ],
};
