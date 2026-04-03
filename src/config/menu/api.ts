import type { Menu } from '../types';

export const apiMenu: Menu = {
  sections: [
    //API root
    {
      items: [
        {
          href: '/api',
          label: 'menu.main.api',
          ariaLabel: 'menu.aria.api',
        },
      ],
    },
    //express()
    {
      title: 'menu.sections.express',
      omitFrom: ['3x'],
      items: [
        {
          href: '/api/express/',
          label: 'menu.sections.express',
          ariaLabel: 'menu.aria.api',
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.api',
          submenu: {
            items: [
              { href: '/api/express/expressjson', label: 'express.json()' },
              { href: '/api/express/expressraw', label: 'express.raw()' },
              { href: '/api/express/expressrouter', label: 'express.Router()' },
              { href: '/api/express/expressstatic', label: 'express.static()' },
              { href: '/api/express/expresstext', label: 'express.text()' },
              { href: '/api/express/expressurlencoded', label: 'express.urlencoded()' },
            ],
          },
        },
      ],
    },
    //application
    {
      title: 'menu.sections.application',
      items: [
        {
          href: `/api/application`,
          label: 'menu.sections.application',
          ariaLabel: 'menu.aria.application',
        },
        {
          label: 'menu.items.properties',
          ariaLabel: 'menu.aria.application',
          submenu: {
            items: [
              { href: `/api/application/app-locals`, label: 'app.locals' },
              {
                href: '/api/application/app-routes',
                label: 'app.routes',
                omitFrom: ['4x', '5x'],
              },
              {
                href: `/api/application/app-mountpath`,
                label: 'app.mountpath',
                omitFrom: ['3x'],
              },
            ],
          },
        },
        {
          label: 'menu.items.events',
          ariaLabel: 'menu.aria.application',
          omitFrom: ['3x'],
          submenu: {
            items: [{ href: `/api/application/app-onmount`, label: "app.on('mount')" }],
          },
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.application',
          submenu: {
            items: [
              { href: `/api/application/app-all`, label: 'app.all()' },
              {
                href: `/api/application/app-delete-method`,
                label: 'app.delete()',
                omitFrom: ['3x'],
              },
              { href: '/api/application/app-disable', label: 'app.disable()' },
              { href: '/api/application/app-enabled', label: 'app.enabled()' },
              { href: '/api/application/app-engine', label: 'app.engine()' },
              { href: '/api/application/app-get', label: 'app.get(name)' },
              { href: '/api/application/app-get-method', label: 'app.get(path)', omitFrom: ['3x'] },
              { href: '/api/application/app-listen', label: 'app.listen()' },
              { href: '/api/application/app-param', label: 'app.param()' },
              { href: '/api/application/app-render', label: 'app.render()' },
              { href: '/api/application/app-route', label: 'app.route()', omitFrom: ['3x'] },
              { href: '/api/application/app-set', label: 'app.set()' },
              { href: '/api/application/app-use', label: 'app.use()' },
            ],
          },
        },
      ],
    },
    //request
    {
      title: 'menu.sections.request',
      items: [
        {
          href: `/api/request`,
          label: 'menu.sections.request',
          ariaLabel: 'menu.aria.request',
        },
        {
          label: 'menu.items.properties',
          ariaLabel: 'menu.aria.request',
          submenu: {
            items: [
              { href: `/api/request/req-body`, label: 'req.body' },
              { href: `/api/request/req-cookies`, label: 'req.cookies' },
              { href: `/api/request/req-ip`, label: 'req.ip' },
              { href: `/api/request/req-method`, label: 'req.method', omitFrom: ['3x'] },
              { href: `/api/request/req-query`, label: 'req.query' },
            ],
          },
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.request',
          submenu: {
            items: [
              { href: `/api/request/req-accepts`, label: 'req.accepts()' },
              { href: '/api/request/req-get', label: 'req.get()', omitFrom: ['3x'] },
              { href: '/api/request/req-is', label: 'req.is()' },
            ],
          },
        },
      ],
    },
    //response
    {
      title: 'menu.sections.response',
      items: [
        {
          href: `/api/response`,
          label: 'menu.sections.response',
          ariaLabel: 'menu.aria.response',
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.response',
          submenu: {
            items: [
              { href: `/api/response/res-json`, label: 'res.json()' },
              { href: `/api/response/res-send`, label: 'res.send()' },
              { href: `/api/response/res-format`, label: 'res.format()' },
              { href: `/api/response/res-status`, label: 'res.status()' },
              { href: `/api/response/res-render`, label: 'res.render()' },
            ],
          },
        },
      ],
    },
    //router
    {
      title: 'menu.sections.router',
      omitFrom: ['3x'],
      items: [
        {
          href: `/api/router`,
          label: 'menu.sections.router',
          ariaLabel: 'menu.aria.router',
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.router',
          submenu: {
            items: [
              { href: `/api/router/router-all`, label: 'router.all()' },
              { href: `/api/router/router-method`, label: 'router.METHOD()' },
              { href: `/api/router/router-use`, label: 'router.use()' },
            ],
          },
        },
      ],
    },
  ],
};
