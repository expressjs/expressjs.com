import type { Menu } from '../types';

export const apiReferenceMenu: Menu = {
  sections: [
    {
      title: 'Application',
      items: [
        { href: `/application/overview`, label: 'Overview', ariaLabel: 'Application overview' },
        { href: `/application/app-all`, label: 'app.all', ariaLabel: 'app.all method' },
        {
          href: `/application/app-delete-method`,
          label: 'app.delete',
          ariaLabel: 'app.delete method',
          omitFrom: ['v3'],
        },
      ],
    },
    {
      title: 'Request',
      items: [
        { href: `/request/overview`, label: 'Overview', ariaLabel: 'Request overview' },
        {
          href: `/request/req-accepts`,
          label: 'req.accepts',
          ariaLabel: 'req.accepts method',
          omitFrom: ['v3'],
        },
        {
          href: `/request/req-accepted`,
          label: 'req.accepted',
          ariaLabel: 'req.accepted method',
          omitFrom: ['v5', 'v4'],
        },
      ],
    },
  ],
};
