import type { Menu } from './types';

export const apiReferenceMenu: Menu = {
  sections: [
    {
      title: 'Application',
      items: [
        { href: `/application/overview`, label: 'Overview' },
        { href: `/application/app-all`, label: 'app.all' },
        { href: `/application/app-delete-method`, label: 'app.delete', omitFrom: ['v3'] },
      ],
    },
    {
      title: 'Request',
      items: [
        { href: `/request/overview`, label: 'Overview' },
        { href: `/request/req-accepts`, label: 'req.accepts', omitFrom: ['v3'] },
        { href: `/request/req-accepted`, label: 'req.accepted', omitFrom: ['v5', 'v4'] },
      ],
    },
  ],
};
