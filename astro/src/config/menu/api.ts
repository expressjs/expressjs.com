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
                href: '/api/application/app.routes',
                label: 'app.routes',
                ariaLabel: 'app.routes property',
                omitFrom: ['4x', '5x'],
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
          label: 'menu.events',
          ariaLabel: 'menu.applicationEventAria',
          omitFrom: ['3x'],
          submenu: {
            items: [
              {
                href: `/api/application/app-onmount`,
                label: "app.on('mount')",
                ariaLabel: 'app on mount event',
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
              {
                href: '/api/application/app-disable',
                label: 'app.disable()',
                ariaLabel: 'app.disable method',
              },
              {
                href: '/api/application/app-disabled',
                label: 'app.disabled()',
                ariaLabel: 'app.disabled property',
              },
              {
                href: '/api/application/app-configure',
                label: 'app.configure()',
                ariaLabel: 'app.configure method',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/application/app-enable',
                label: 'app.enable()',
                ariaLabel: 'app.enable method',
              },
              {
                href: '/api/application/app-enabled',
                label: 'app.enabled()',
                ariaLabel: 'app.enabled property',
              },
              {
                href: '/api/application/app-engine',
                label: 'app.engine()',
                ariaLabel: 'app.engine method',
              },
              {
                href: '/api/application/app-get',
                label: 'app.get(name)',
                ariaLabel: 'app.get method',
              },

              {
                href: '/api/application/app-get-method',
                label: 'app.get(path)',
                ariaLabel: 'app.get method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-listen',
                label: 'app.listen()',
                ariaLabel: 'app.listen method',
              },
              {
                href: '/api/application/app-method',
                label: 'app.method()',
                ariaLabel: 'app.METHOD method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-param',
                label: 'app.param()',
                ariaLabel: 'app.param method',
              },
              {
                href: '/api/application/app-verb',
                label: 'app.verb()',
                ariaLabel: 'app.verb methods',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/application/app-path',
                label: 'app.path()',
                ariaLabel: 'app.path method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-post-method',
                label: 'app.post()',
                ariaLabel: 'app.post method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-put-method',
                label: 'app.put()',
                ariaLabel: 'app.put method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-render',
                label: 'app.render()',
                ariaLabel: 'app.render method',
              },
              {
                href: '/api/application/app-route',
                label: 'app.route()',
                ariaLabel: 'app.route method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-set',
                label: 'app.set()',
                ariaLabel: 'app.set method',
              },
              {
                href: '/api/application/app-use',
                label: 'app.use()',
                ariaLabel: 'app.use method',
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
