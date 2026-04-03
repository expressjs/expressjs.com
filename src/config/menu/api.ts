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
                href: '/api/application/app-mountpath',
                label: 'app.mountpath',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-router',
                label: 'app.router',
                omitFrom: ['3x', '4x'],
              },
              {
                href: '/api/application/app-routes',
                label: 'app.routes',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/application/app-settings',
                label: 'app.settings',
                omitFrom: ['4x', '5x'],
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
                href: '/api/application/app-configure',
                label: 'app.configure()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: `/api/application/app-delete-method`,
                label: 'app.delete()',
                omitFrom: ['3x'],
              },
              { href: '/api/application/app-disable', label: 'app.disable()' },
              { href: '/api/application/app-disabled', label: 'app.disabled()' },
              { href: '/api/application/app-enable', label: 'app.enable()' },
              { href: '/api/application/app-enabled', label: 'app.enabled()' },
              { href: '/api/application/app-engine', label: 'app.engine()' },
              { href: '/api/application/app-get', label: 'app.get(name)' },
              {
                href: '/api/application/app-get-method',
                label: 'app.get(path)',
                omitFrom: ['3x'],
              },
              { href: '/api/application/app-listen', label: 'app.listen()' },
              {
                href: '/api/application/app-method',
                label: 'app.METHOD()',
                omitFrom: ['3x'],
              },
              { href: '/api/application/app-param', label: 'app.param()' },
              {
                href: '/api/application/app-path',
                label: 'app.path()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-post-method',
                label: 'app.post()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application/app-put-method',
                label: 'app.put()',
                omitFrom: ['3x'],
              },
              { href: '/api/application/app-render', label: 'app.render()' },
              { href: '/api/application/app-route', label: 'app.route()', omitFrom: ['3x'] },
              { href: '/api/application/app-set', label: 'app.set()' },
              { href: '/api/application/app-use', label: 'app.use()' },
              {
                href: '/api/application/app-verb',
                label: 'app.VERB()',
                omitFrom: ['4x', '5x'],
              },
            ],
          },
        },
      ],
    },
    //middleware
    {
      title: 'menu.sections.middleware',
      omitFrom: ['4x', '5x'],
      items: [
        {
          href: '/api/middleware/',
          label: 'menu.sections.middleware',
          ariaLabel: 'menu.aria.middleware',
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.middleware',
          submenu: {
            items: [
              { href: '/api/middleware/basicauth', label: 'basicAuth()' },
              { href: '/api/middleware/bodyparser', label: 'bodyParser()' },
              { href: '/api/middleware/compress', label: 'compress()' },
              { href: '/api/middleware/cookieparser', label: 'cookieParser()' },
              { href: '/api/middleware/cookiesession', label: 'cookieSession()' },
              { href: '/api/middleware/csrf', label: 'csrf()' },
              { href: '/api/middleware/directory', label: 'directory()' },
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
              {
                href: '/api/request/req-accepted',
                label: 'req.accepted',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request/req-acceptedcharsets',
                label: 'req.acceptedCharsets',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request/req-acceptedlanguages',
                label: 'req.acceptedLanguages',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request/req-app',
                label: 'req.app',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request/req-base-url',
                label: 'req.baseUrl',
                omitFrom: ['3x'],
              },
              { href: `/api/request/req-body`, label: 'req.body' },
              { href: `/api/request/req-cookies`, label: 'req.cookies' },
              {
                href: '/api/request/req-files',
                label: 'req.files',
                omitFrom: ['4x', '5x'],
              },
              { href: '/api/request/req-fresh', label: 'req.fresh' },
              {
                href: '/api/request/req-host',
                label: 'req.host',
                omitFrom: ['4x'],
              },
              {
                href: '/api/request/req-hostname',
                label: 'req.hostname',
                omitFrom: ['3x'],
              },
              { href: `/api/request/req-ip`, label: 'req.ip' },
              { href: '/api/request/req-ips', label: 'req.ips' },
              { href: `/api/request/req-method`, label: 'req.method', omitFrom: ['3x'] },
              { href: '/api/request/req-originalurl', label: 'req.originalUrl' },
              { href: '/api/request/req-params', label: 'req.params' },
              { href: '/api/request/req-path', label: 'req.path' },
              { href: '/api/request/req-protocol', label: 'req.protocol' },
              { href: `/api/request/req-query`, label: 'req.query' },
              { href: '/api/request/req-res', label: 'req.res' },
              { href: '/api/request/req-route', label: 'req.route' },
              { href: '/api/request/req-secure', label: 'req.secure' },
              { href: '/api/request/req-signedCookies', label: 'req.signedCookies' },
              { href: '/api/request/req-stale', label: 'req.stale' },
              { href: '/api/request/req-subdomains', label: 'req.subdomains' },
              { href: '/api/request/req-xhr', label: 'req.xhr' },
            ],
          },
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.request',
          submenu: {
            items: [
              { href: `/api/request/req-accepts`, label: 'req.accepts()' },
              {
                href: '/api/request/req-acceptscharset',
                label: 'req.acceptsCharset()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request/req-acceptscharsets',
                label: 'req.acceptsCharsets()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request/req-acceptsencodings',
                label: 'req.acceptsEncodings()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request/req-acceptslanguage',
                label: 'req.acceptsLanguage()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request/req-acceptslanguages',
                label: 'req.acceptsLanguages()',
                omitFrom: ['3x'],
              },
              { href: '/api/request/req-get', label: 'req.get()', omitFrom: ['3x'] },
              {
                href: '/api/request/req-header',
                label: 'req.header()',
                omitFrom: ['4x', '5x'],
              },
              { href: '/api/request/req-is', label: 'req.is()' },
              {
                href: '/api/request/req-param',
                label: 'req.param()',
                omitFrom: ['5x'],
              },
              {
                href: '/api/request/req-range',
                label: 'req.range()',
                omitFrom: ['3x'],
              },
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
          label: 'menu.items.properties',
          ariaLabel: 'menu.aria.response',
          submenu: {
            items: [
              {
                href: '/api/response/res-app',
                label: 'res.app',
                omitFrom: ['3x'],
              },
              {
                href: '/api/response/res-charset',
                label: 'res.charset',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/response/res-headerssent',
                label: 'res.headersSent',
                omitFrom: ['3x'],
              },
              { href: '/api/response/res-locals', label: 'res.locals' },
              { href: '/api/response/res-req', label: 'res.req' },
            ],
          },
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.response',
          submenu: {
            items: [
              {
                href: '/api/response/res-append',
                label: 'res.append()',
                omitFrom: ['3x'],
              },
              { href: '/api/response/res-attachment', label: 'res.attachment()' },
              { href: '/api/response/res-clearcookie', label: 'res.clearCookie()' },
              { href: '/api/response/res-cookie', label: 'res.cookie()' },
              { href: '/api/response/res-download', label: 'res.download()' },
              {
                href: '/api/response/res-end',
                label: 'res.end()',
                omitFrom: ['3x'],
              },
              { href: `/api/response/res-format`, label: 'res.format()' },
              { href: '/api/response/res-get', label: 'res.get()' },
              { href: `/api/response/res-json`, label: 'res.json()' },
              { href: '/api/response/res-jsonp', label: 'res.jsonp()' },
              { href: '/api/response/res-links', label: 'res.links()' },
              { href: '/api/response/res-location', label: 'res.location()' },
              { href: '/api/response/res-redirect', label: 'res.redirect()' },
              { href: `/api/response/res-render`, label: 'res.render()' },
              { href: `/api/response/res-send`, label: 'res.send()' },
              {
                href: '/api/response/res-sendfile',
                label: 'res.sendfile()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/response/res-sendfile',
                label: 'res.sendFile()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/response/res-sendstatus',
                label: 'res.sendStatus()',
                omitFrom: ['3x'],
              },
              { href: '/api/response/res-set', label: 'res.set()' },
              { href: `/api/response/res-status`, label: 'res.status()' },
              { href: '/api/response/res-type', label: 'res.type()' },
              {
                href: '/api/response/res-vary',
                label: 'res.vary()',
                omitFrom: ['3x'],
              },
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
              { href: '/api/router/router-param', label: 'router.param()' },
              { href: '/api/router/router-route', label: 'router.route()' },
              { href: `/api/router/router-use`, label: 'router.use()' },
            ],
          },
        },
      ],
    },
  ],
};
