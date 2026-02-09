import type { Menu } from '../types';

export const apiMenu: Menu = {
  sections: [
    {
      items: [
        {
          href: '',
          label: 'Overview',
          ariaLabel: 'Overview',
          omitFrom: ['4x', '3x'],
        },
        {
          href: '',
          label: 'Overview',
          ariaLabel: 'Overview',
          omitFrom: ['5x', '3x'],
        },
        {
          href: '',
          label: 'Overview',
          ariaLabel: 'Overview',
          omitFrom: ['5x', '4x'],
        },
      ],
    },
    {
      title: 'Application',
      items: [
        { href: `/application/overview`, label: 'Overview', ariaLabel: 'Application overview' },
        {
          label: 'Properties',
          ariaLabel: 'Application properties',
          submenu: {
            items: [
              {
                href: `/application/app-locals`,
                label: 'app.locals',
                ariaLabel: 'app.locals property',
              },
              {
                href: `/application/app-mountpath`,
                label: 'app.mountpath',
                ariaLabel: 'app.mountpath property',
                omitFrom: ['3x'],
              },
            ],
          },
        },
        {
          label: 'Methods',
          ariaLabel: 'Application methods',
          submenu: {
            items: [
              {
                href: `/application/app-all`,
                label: 'app.all()',
                ariaLabel: 'app.all method',
              },
              {
                href: `/application/app-delete-method`,
                label: 'app.delete()',
                ariaLabel: 'app.delete method',
                omitFrom: ['5x', '4x'],
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Request',
      items: [
        { href: `/request/overview`, label: 'Overview', ariaLabel: 'Request overview' },
        {
          label: 'Properties',
          ariaLabel: 'Request properties',
          submenu: {
            items: [
              {
                href: `/request/req-app`,
                label: 'req.app',
                ariaLabel: 'req.app property',
                omitFrom: ['3x'],
              },
              {
                href: `/request/req-baseUrl`,
                label: 'req.baseUrl',
                ariaLabel: 'req.baseUrl property',
                omitFrom: ['3x'],
              },
              {
                href: `/request/req-files`,
                label: 'req.files',
                ariaLabel: 'req.files property',
                omitFrom: ['5x', '4x'],
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Response',
      items: [
        { href: `/response/overview`, label: 'Overview', ariaLabel: 'Response overview' },
        {
          label: 'Properties',
          ariaLabel: 'Response properties',
          submenu: {
            items: [
              {
                href: `/response/res-app`,
                label: 'res.app',
                ariaLabel: 'res.app property',
                omitFrom: ['3x'],
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Router',
      omitFrom: ['3x'],
      items: [
        { href: `/router/overview`, label: 'Overview', ariaLabel: 'Router overview' },
        {
          label: 'Methods',
          ariaLabel: 'Router methods',
          submenu: {
            items: [
              {
                href: `/router/router-all`,
                label: 'router.all()',
                ariaLabel: 'router.all method',
              },
            ],
          },
        },
      ],
    },
  ],
};
