import type { Menu } from '../types';

export const apiMenu: Menu = {
  sections: [
    {
      items: [
        {
          href: '/api',
          label: 'Overview',
          ariaLabel: 'Overview',
        },
      ],
    },
    {
      title: 'Application',
      items: [
        { href: `/api/application/overview`, label: 'Overview', ariaLabel: 'Application overview' },
        {
          label: 'Properties',
          ariaLabel: 'Application properties',
          submenu: {
            items: [
              {
                href: `/api/application/app-locals`,
                label: 'app.locals',
                ariaLabel: 'app.locals property',
              },
              {
                href: `/api/application/app-mountpath`,
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
                href: `/api/application/app-all`,
                label: 'app.all()',
                ariaLabel: 'app.all method',
              },
              {
                href: `/api/application/app-delete-method`,
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
        { href: `/api/request/overview`, label: 'Overview', ariaLabel: 'Request overview' },
        {
          label: 'Properties',
          ariaLabel: 'Request properties',
          submenu: {
            items: [
              {
                href: `/api/request/req-app`,
                label: 'req.app',
                ariaLabel: 'req.app property',
                omitFrom: ['3x'],
              },
              {
                href: `/api/request/req-baseUrl`,
                label: 'req.baseUrl',
                ariaLabel: 'req.baseUrl property',
                omitFrom: ['3x'],
              },
              {
                href: `/api/request/req-files`,
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
        { href: `/api/response/overview`, label: 'Overview', ariaLabel: 'Response overview' },
        {
          label: 'Properties',
          ariaLabel: 'Response properties',
          submenu: {
            items: [
              {
                href: `/api/response/res-app`,
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
        { href: `/api/router/overview`, label: 'Overview', ariaLabel: 'Router overview' },
        {
          label: 'Methods',
          ariaLabel: 'Router methods',
          submenu: {
            items: [
              {
                href: `/api/router/router-all`,
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
