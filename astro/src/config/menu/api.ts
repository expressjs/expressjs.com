import type { Menu } from '../types';

export const apiMenu: Menu = {
  sections: [
    {
      items: [
        {
          href: '/api',
          label: 'menu.overview',
          ariaLabel: 'menu.overview',
        },
      ],
    },
    {
      title: 'menu.application',
      items: [
        {
          href: `/api/application/overview`,
          label: 'menu.overview',
          ariaLabel: 'menu.applicationOverviewAria',
        },
        {
          label: 'menu.properties',
          ariaLabel: 'menu.applicationPropertiesAria',
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
          label: 'menu.methods',
          ariaLabel: 'menu.applicationMethodsAria',
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
                omitFrom: ['3x'],
              },
            ],
          },
        },
      ],
    },
    {
      title: 'menu.request',
      items: [
        {
          href: `/api/request/overview`,
          label: 'menu.overview',
          ariaLabel: 'menu.requestOverviewAria',
        },
        {
          label: 'menu.properties',
          ariaLabel: 'menu.requestPropertiesAria',
          submenu: {
            items: [
              {
                href: `/api/request/req-app`,
                label: 'req.app',
                ariaLabel: 'req.app property',
                omitFrom: ['3x'],
              },
              {
                href: `/api/request/req-base-url`,
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
      title: 'menu.response',
      items: [
        {
          href: `/api/response/overview`,
          label: 'menu.overview',
          ariaLabel: 'menu.responseOverviewAria',
        },
        {
          label: 'menu.properties',
          ariaLabel: 'menu.responsePropertiesAria',
          submenu: {
            items: [
              {
                href: `/api/response/res-set`,
                label: 'res.set',
                ariaLabel: 'res.app property',
              },
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
      title: 'menu.router',
      omitFrom: ['3x'],
      items: [
        {
          href: `/api/router/overview`,
          label: 'menu.overview',
          ariaLabel: 'menu.routerOverviewAria',
        },
        {
          label: 'menu.methods',
          ariaLabel: 'menu.routerMethodsAria',
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
