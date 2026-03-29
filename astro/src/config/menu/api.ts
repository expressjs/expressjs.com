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
      title: 'express()',
      omitFrom: ['3x'],
      items: [
        {
          href: '/api/express/',
          label: 'menu.overview',
          ariaLabel: 'menu.expressOverviewAria',
        },
        {
          label: 'menu.methods',
          ariaLabel: 'menu.expressMethodsAria',
          submenu: {
            items: [
              {
                href: '/api/express/expressjson',
                label: 'express.json()',
                ariaLabel: 'express.json property',
              },
              {
                href: '/api/express/expressraw',
                label: 'express.raw()',
                ariaLabel: 'express.raw property',
              },
              {
                href: '/api/express/expressrouter',
                label: 'express.Router()',
                ariaLabel: 'express.Router property',
              },
              {
                href: '/api/express/expressstatic',
                label: 'express.static()',
                ariaLabel: 'express.static property',
              },
              {
                href: '/api/express/expresstext',
                label: 'express.text()',
                ariaLabel: 'express.text property',
              },
              {
                href: '/api/express/expressurlencoded',
                label: 'express.urlencoded()',
                ariaLabel: 'express.urlencoded property',
              },
            ],
          },
        },
      ],
    },
    {
      title: 'menu.middleware',
      omitFrom: ['4x', '5x'],
      items: [
        {
          href: '/api/middleware',
          label: 'menu.overview',
          ariaLabel: 'menu.middlewareOverviewAria',
        },
        {
          label: 'menu.types',
          ariaLabel: 'menu.middlewareTypesAria',
          submenu: {
            items: [
              {
                href: '/api/middleware/basicauth',
                label: 'basicAuth()',
                ariaLabel: 'basicAuth() middleware',
              },
              {
                href: '/api/middleware/bodyparser',
                label: 'bodyParser()',
                ariaLabel: 'bodyParser() middleware',
              },
              {
                href: '/api/middleware/compress',
                label: 'compress()',
                ariaLabel: 'compress() middleware',
              },
              {
                href: '/api/middleware/cookieparser',
                label: 'cookieParser()',
                ariaLabel: 'cookieParser() middleware',
              },
              {
                href: '/api/middleware/cookiesession',
                label: 'cookieSession()',
                ariaLabel: 'cookieSession() middleware',
              },
              {
                href: '/api/middleware/csrf',
                label: 'csrf()',
                ariaLabel: 'csrf() middleware',
              },
              {
                href: '/api/middleware/directory',
                label: 'directory()',
                ariaLabel: 'directory() middleware',
              },
            ],
          },
        },
      ],
    },
    {
      title: 'menu.application',
      items: [
        {
          href: `/api/application`,
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
                href: '/api/application/app-routes',
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
          href: `/api/request`,
          label: 'menu.overview',
          ariaLabel: 'menu.requestOverviewAria',
        },
        {
          label: 'menu.properties',
          ariaLabel: 'menu.requestPropertiesAria',
          submenu: {
            items: [
              {
                href: `/api/request/req-accepted`,
                label: 'req.accepted',
                ariaLabel: 'req.accepted property',
                omitFrom: ['4x', '5x'],
              },
              {
                href: `/api/request/req-acceptedcharsets`,
                label: 'req.acceptedCharsets',
                ariaLabel: 'req.acceptedCharsets property',
                omitFrom: ['4x', '5x'],
              },
              {
                href: `/api/request/req-acceptedlanguages`,
                label: 'req.acceptedLanguages',
                ariaLabel: 'req.acceptedLanguages property',
                omitFrom: ['4x', '5x'],
              },
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
                href: '/api/request/req-body',
                label: 'req.body',
                ariaLabel: 'req.body property',
              },
              {
                href: `/api/request/req-cookies`,
                label: 'req.cookies',
                ariaLabel: 'req.cookies property',
              },
              {
                href: `/api/request/req-files`,
                label: 'req.files',
                ariaLabel: 'req.files property',
                omitFrom: ['5x', '4x'],
              },
              {
                href: '/api/request/req-fresh',
                label: 'req.fresh',
                ariaLabel: 'req.fresh property',
              },
              {
                href: '/api/request/req-host',
                label: 'req.host',
                ariaLabel: 'req.host property',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request/req-hostname',
                label: 'req.hostname',
                ariaLabel: 'req.hostname property',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request/req-ip',
                label: 'req.ip',
                ariaLabel: 'req.ip property',
              },
              {
                href: '/api/request/req-ips',
                label: 'req.ips',
                ariaLabel: 'req.ips property',
              },
              {
                href: '/api/request/req-method',
                label: 'req.method',
                ariaLabel: 'req.method property',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request/req-originalurl',
                label: 'req.originalUrl',
                ariaLabel: 'req.originalUrl property',
              },
              {
                href: '/api/request/req-params',
                label: 'req.params',
                ariaLabel: 'req.params property',
              },
              {
                href: '/api/request/req-path',
                label: 'req.path',
                ariaLabel: 'req.path property',
              },
              {
                href: '/api/request/req-protocol',
                label: 'req.protocol',
                ariaLabel: 'req.protocol property',
              },
              {
                href: '/api/request/req-query',
                label: 'req.query',
                ariaLabel: 'req.query property',
              },
              {
                href: '/api/request/req-res',
                label: 'req.res',
                ariaLabel: 'req.res property',
              },
              {
                href: '/api/request/req-route',
                label: 'req.route',
                ariaLabel: 'req.route property',
              },
              {
                href: '/api/request/req-secure',
                label: 'req.secure',
                ariaLabel: 'req.secure property',
              },

              {
                href: '/api/request/req-signedcookies',
                label: 'req.signedCookies',
                ariaLabel: 'req.signedCookies property',
              },
              {
                href: '/api/request/req-stale',
                label: 'req.stale',
                ariaLabel: 'req.stale property',
              },
              {
                href: '/api/request/req-subdomains',
                label: 'req.subdomains',
                ariaLabel: 'req.subdomains property',
              },
              {
                href: '/api/request/req-xhr',
                label: 'req.xhr',
                ariaLabel: 'req.xhr property',
              },
            ],
          },
        },
        {
          label: 'menu.methods',
          ariaLabel: 'menu.requestMethodsAria',
          submenu: {
            items: [
              {
                href: `/api/request/req-accepts`,
                label: 'req.accepts()',
                ariaLabel: 'req.accepts method',
              },
              {
                href: `/api/request/req-acceptscharsets`,
                label: 'req.acceptsCharsets()',
                ariaLabel: 'req.acceptedCharsets method',
                omitFrom: ['3x'],
              },
              {
                href: `/api/request/req-acceptsencodings`,
                label: 'req.acceptsEncodings()',
                ariaLabel: 'req.acceptedCharsets method',
                omitFrom: ['3x'],
              },
              {
                href: `/api/request/req-acceptslanguages`,
                label: 'req.acceptsLanguages()',
                ariaLabel: 'req.acceptedLanguages method',
                omitFrom: ['3x'],
              },
              {
                href: `/api/request/req-acceptscharset`,
                label: 'req.acceptsCharset()',
                ariaLabel: 'req.acceptsCharset method',
                omitFrom: ['4x', '5x'],
              },
              {
                href: `/api/request/req-acceptslanguage`,
                label: 'req.acceptsLanguage()',
                ariaLabel: 'req.acceptsLanguage method',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request/req-get',
                label: 'req.get()',
                ariaLabel: 'req.get() method',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request/req-header',
                label: 'req.header()',
                ariaLabel: 'req.header() method',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request/req-is',
                label: 'req.is()',
                ariaLabel: 'req.is() method',
              },
              {
                href: '/api/request/req-param',
                label: 'req.param()',
                ariaLabel: 'req.param() method',
              },
              {
                href: '/api/request/req-range',
                label: 'req.range()',
                ariaLabel: 'req.range() method',
                omitFrom: ['3x'],
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
          href: `/api/response`,
          label: 'menu.overview',
          ariaLabel: 'menu.responseOverviewAria',
        },
        {
          label: 'menu.properties',
          ariaLabel: 'menu.responsePropertiesAria',
          submenu: {
            items: [
              {
                href: `/api/response/res-charset`,
                label: 'res.charset',
                ariaLabel: 'res.charset property',
              },
              {
                href: `/api/response/res-locals`,
                label: 'res.locals',
                ariaLabel: 'res.locals property',
              },
              {
                href: '/api/response/res-req',
                label: 'res.req',
                ariaLabel: 'res.req property',
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
        {
          label: 'menu.methods',
          ariaLabel: 'menu.responseMethodsAria',
          submenu: {
            items: [
              {
                href: `/api/response/res-attachment`,
                label: 'res.attachment()',
                ariaLabel: 'res.attachment method',
              },
              {
                href: `/api/response/res-clearcookie`,
                label: 'res.clearCookie()',
                ariaLabel: 'res.clearCookie method',
              },
              {
                href: `/api/response/res-cookie`,
                label: 'res.cookie()',
                ariaLabel: 'res.cookie method',
              },
              {
                href: `/api/response/res-download`,
                label: 'res.download()',
                ariaLabel: 'res.download method',
              },
              {
                href: `/api/response/res-format`,
                label: 'res.format()',
                ariaLabel: 'res.format method',
              },
              {
                href: `/api/response/res-get`,
                label: 'res.get()',
                ariaLabel: 'res.get method',
              },
              {
                href: `/api/response/res-json`,
                label: 'res.json()',
                ariaLabel: 'res.json method',
              },
              {
                href: `/api/response/res-jsonp`,
                label: 'res.jsonp()',
                ariaLabel: 'res.jsonp method',
              },
              {
                href: '/api/response/res-links',
                label: 'res.links()',
                ariaLabel: 'res.links method',
              },
              {
                href: `/api/response/res-location`,
                label: 'res.location()',
                ariaLabel: 'res.location method',
              },
              {
                href: `/api/response/res-redirect`,
                label: 'res.redirect()',
                ariaLabel: 'res.redirect method',
              },
              {
                href: `/api/response/res-render`,
                label: 'res.render()',
                ariaLabel: 'res.render method',
              },
              {
                href: `/api/response/res-send`,
                label: 'res.send()',
                ariaLabel: 'res.send method',
              },
              {
                href: `/api/response/res-sendfile`,
                label: 'res.sendfile()',
                ariaLabel: 'res.sendFile method',
              },
              {
                href: `/api/response/res-set`,
                label: 'res.set()',
                ariaLabel: 'res.set method',
              },
              {
                href: `/api/response/res-status`,
                label: 'res.status()',
                ariaLabel: 'res.status method',
              },
              {
                href: `/api/response/res-type`,
                label: 'res.type()',
                ariaLabel: 'res.type method',
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
          href: `/api/router`,
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
