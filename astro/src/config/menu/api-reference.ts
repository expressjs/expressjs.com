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
          omitFrom: ['3x'],
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
          omitFrom: ['3x'],
        },
        {
          href: `/request/req-accepted`,
          label: 'req.accepted',
          ariaLabel: 'req.accepted method',
          omitFrom: ['5x', '4x'],
        },
      ],
    },
  ],
};
