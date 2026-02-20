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
        {
          href: '/api/express',
          label: 'Express',
          ariaLabel: 'Express',
          omitFrom: ['5x', '4x'],
        },
      ],
    },
    {
      title: 'Express',
      omitFrom: ['3x'],
      items: [
        { href: `/api/express/overview`, label: 'Overview', ariaLabel: 'Express overview' },
        {
          label: 'Methods',
          ariaLabel: 'Express methods',
          omitFrom: ['3x'],
          submenu: {
            versioned: ['5x', '4x'],
            items: [
              {
                href: `/api/express/expressjson`,
                label: 'express.json()',
                ariaLabel: 'express.json method',
              },
              {
                href: `/api/express/expressraw`,
                label: 'express.raw()',
                ariaLabel: 'express.raw method',
              },
              {
                href: '/api/express/expressrouter',
                label: 'express.Router()',
                ariaLabel: 'express.Router method',
              },
              {
                href: '/api/express/expressstatic',
                label: 'express.static()',
                ariaLabel: 'express.static method',
              },
              {
                href: `/api/express/expresstext`,
                label: 'express.text()',
                ariaLabel: 'express.text method',
              },
              {
                href: `/api/express/expressurlencoded`,
                label: 'express.urlencoded()',
                ariaLabel: 'express.urlencoded method',
              },
            ],
          },
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
              {
                href: `/api/application/app-router`,
                label: 'app.router',
                ariaLabel: 'app.router property',
                omitFrom: ['3x', '4x'],
              },
              {
                href: `/api/application/app-routes`,
                label: 'app.routes',
                ariaLabel: 'app.routes property',
                omitFrom: ['4x', '5x'],
              },
            ],
          },
        },
        {
          label: 'Events',
          ariaLabel: 'Application events',
          omitFrom: ['3x'],
          submenu: {
            items: [
              {
                href: `/api/application/app-event-mount`,
                label: 'mount',
                ariaLabel: 'app mount event',
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
                ariaLabel: 'app.disabled method',
              },
              {
                href: '/api/application/app-enable',
                label: 'app.enable()',
                ariaLabel: 'app.enable method',
              },
              {
                href: '/api/application/app-enabled',
                label: 'app.enabled()',
                ariaLabel: 'app.enabled method',
              },
              {
                href: '/api/application/app-engine',
                label: 'app.engine()',
                ariaLabel: 'app.engine method',
              },
              {
                href: '/api/application/app-get',
                label: 'app.get()',
                ariaLabel: 'app.get method',
              },
              {
                href: '/api/application/app-get-method',
                label: 'app.get()',
                ariaLabel: 'app.get method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-listen',
                label: 'app.listen()',
                ariaLabel: 'app.listen method',
              },
              {
                href: '/api/application/app-param',
                label: 'app.param()',
                ariaLabel: 'app.param method',
              },
              {
                href: '/api/application/app-method',
                label: 'app.METHOD()',
                ariaLabel: 'app.METHOD method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-path',
                label: 'app.path()',
                ariaLabel: 'app.path method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-post',
                label: 'app.post()',
                ariaLabel: 'app.post method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-put',
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
      title: 'Response',
      items: [
        { href: `/api/response/overview`, label: 'Overview', ariaLabel: 'Response overview' },
        {
          label: 'Properties',
          ariaLabel: 'Response properties',
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
