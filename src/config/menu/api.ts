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
              { href: '/api/express#expressjsonoptions', label: 'express.json()' },
              { href: '/api/express#expressrawoptions', label: 'express.raw()' },
              { href: '/api/express#expressrouteroptions', label: 'express.Router()' },
              { href: '/api/express#expressstaticroot-options', label: 'express.static()' },
              { href: '/api/express#expresstextoptions', label: 'express.text()' },
              { href: '/api/express#expressurlencodedoptions', label: 'express.urlencoded()' },
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
              { href: `/api/application#applocals`, label: 'app.locals' },
              {
                href: '/api/application#appmountpath',
                label: 'app.mountpath',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application#approuter',
                label: 'app.router',
                omitFrom: ['3x', '4x'],
              },
              {
                href: '/api/application#approutes',
                label: 'app.routes',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/application#settings',
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
            items: [
              {
                href: `/api/application#apponmount-callbackparent`,
                label: "app.on('mount')",
              },
            ],
          },
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.application',
          submenu: {
            items: [
              { href: `/api/application#appallpath-callback--callback-`, label: 'app.all()' },
              {
                href: '/api/application#appconfigureenv-callback',
                label: 'app.configure()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: `/api/application#appdeletepath-callback--callback-`,
                label: 'app.delete()',
                omitFrom: ['3x'],
              },
              { href: '/api/application#appdisablename', label: 'app.disable()' },
              { href: '/api/application#appdisabledname', label: 'app.disabled()' },
              { href: '/api/application#appenablename', label: 'app.enable()' },
              { href: '/api/application#appenabledname', label: 'app.enabled()' },
              { href: '/api/application#appengineext-callback', label: 'app.engine()' },
              { href: '/api/application#appgetname', label: 'app.get(name)' },
              {
                href: '/api/application#appgetpath-callback--callback-',
                label: 'app.get(path)',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application#applisten',
                label: 'app.listen()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/application#applistenport-host-backlog-callback',
                label: 'app.listen()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application#appmethodpath-callback--callback-',
                label: 'app.METHOD()',
                omitFrom: ['3x'],
              },
              { href: '/api/application#appparamname-callback', label: 'app.param()' },
              {
                href: '/api/application#apppath',
                label: 'app.path()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application#apppostpath-callback--callback-',
                label: 'app.post()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application#appputpath-callback--callback-',
                label: 'app.put()',
                omitFrom: ['3x'],
              },
              { href: '/api/application#apprenderview-locals-callback', label: 'app.render()' },
              {
                href: '/api/application#approutepath',
                label: 'app.route()',
                omitFrom: ['3x'],
              },
              { href: '/api/application#appsetname-value', label: 'app.set()' },
              {
                href: '/api/application#appusepath-function',
                label: 'app.use()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/application#appusepath-callback--callback',
                label: 'app.use()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/application#appverbpath-callback-callback',
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
          label: 'menu.items.types',
          ariaLabel: 'menu.aria.middleware',
          submenu: {
            items: [
              { href: '/api/middleware#basicauth', label: 'basicAuth()' },
              { href: '/api/middleware#bodyparser', label: 'bodyParser()' },
              { href: '/api/middleware#compress', label: 'compress()' },
              { href: '/api/middleware#cookieparser', label: 'cookieParser()' },
              { href: '/api/middleware#cookiesession', label: 'cookieSession()' },
              { href: '/api/middleware#csrf', label: 'csrf()' },
              { href: '/api/middleware#directory', label: 'directory()' },
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
                href: '/api/request#reqaccepted',
                label: 'req.accepted',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request#reqacceptedcharsets',
                label: 'req.acceptedCharsets',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request#reqacceptedlanguages',
                label: 'req.acceptedLanguages',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request#reqapp',
                label: 'req.app',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request#reqbaseurl',
                label: 'req.baseUrl',
                omitFrom: ['3x'],
              },
              { href: `/api/request#reqbody`, label: 'req.body' },
              { href: `/api/request#reqcookies`, label: 'req.cookies' },
              {
                href: '/api/request#reqfiles',
                label: 'req.files',
                omitFrom: ['4x', '5x'],
              },
              { href: '/api/request#reqfresh', label: 'req.fresh' },
              {
                href: '/api/request#reqhost',
                label: 'req.host',
                omitFrom: ['4x'],
              },
              {
                href: '/api/request#reqhostname',
                label: 'req.hostname',
                omitFrom: ['3x'],
              },
              { href: `/api/request#reqip`, label: 'req.ip' },
              { href: '/api/request#reqips', label: 'req.ips' },
              { href: `/api/request#reqmethod`, label: 'req.method', omitFrom: ['3x'] },
              { href: '/api/request#reqoriginalurl', label: 'req.originalUrl' },
              { href: '/api/request#reqparams', label: 'req.params' },
              { href: '/api/request#reqpath', label: 'req.path' },
              { href: '/api/request#reqprotocol', label: 'req.protocol' },
              { href: `/api/request#reqquery`, label: 'req.query' },
              { href: '/api/request#reqres', label: 'req.res' },
              { href: '/api/request#reqroute', label: 'req.route' },
              { href: '/api/request#reqsecure', label: 'req.secure' },
              { href: '/api/request#reqsignedcookies', label: 'req.signedCookies' },
              { href: '/api/request#reqstale', label: 'req.stale' },
              { href: '/api/request#reqsubdomains', label: 'req.subdomains' },
              { href: '/api/request#reqxhr', label: 'req.xhr' },
            ],
          },
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.request',
          submenu: {
            items: [
              { href: `/api/request#reqacceptstypes`, label: 'req.accepts()' },
              {
                href: '/api/request#reqacceptscharsetcharset',
                label: 'req.acceptsCharset()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request#reqacceptscharsetscharset--',
                label: 'req.acceptsCharsets()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request#reqacceptsencodingsencoding--',
                label: 'req.acceptsEncodings()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/request#reqacceptslanguagelang',
                label: 'req.acceptsLanguage()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request#reqacceptslanguageslang-',
                label: 'req.acceptsLanguages()',
                omitFrom: ['3x'],
              },
              { href: '/api/request#reqgetfield', label: 'req.get()' },
              { href: '/api/request#reqistype', label: 'req.is()' },
              {
                href: '/api/request#reqparamname',
                label: 'req.param()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/request#reqparamname--defaultvalue',
                label: 'req.param()',
                omitFrom: ['3x', '5x'],
              },
              {
                href: '/api/request#reqrangesize-options',
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
                href: '/api/response#resapp',
                label: 'res.app',
                omitFrom: ['3x'],
              },
              {
                href: '/api/response#rescharset',
                label: 'res.charset',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/response#resheaderssent',
                label: 'res.headersSent',
                omitFrom: ['3x'],
              },
              { href: '/api/response#reslocals', label: 'res.locals' },
              { href: '/api/response#resreq', label: 'res.req' },
            ],
          },
        },
        {
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.response',
          submenu: {
            items: [
              {
                href: '/api/response#resappendfield--value',
                label: 'res.append()',
                omitFrom: ['3x'],
              },
              { href: '/api/response#resattachmentfilename', label: 'res.attachment()' },
              { href: '/api/response#resclearcookiename--options', label: 'res.clearCookie()' },
              { href: '/api/response#rescookiename-value--options', label: 'res.cookie()' },
              {
                href: '/api/response#resdownloadpath-filename-fn',
                label: 'res.download()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/response#resdownloadpath--filename--options--fn',
                label: 'res.download()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/response#resenddata-encoding-callback',
                label: 'res.end()',
                omitFrom: ['3x'],
              },
              { href: `/api/response#resformatobject`, label: 'res.format()' },
              { href: '/api/response#resgetfield', label: 'res.get()' },
              {
                href: `/api/response#resjsonstatusbody-body`,
                label: 'res.json()',
                omitFrom: ['4x', '5x'],
              },
              { href: `/api/response#resjsonbody`, label: 'res.json()', omitFrom: ['3x'] },
              {
                href: '/api/response#resjsonpstatusbody-body',
                label: 'res.jsonp()',
                omitFrom: ['4x', '5x'],
              },
              { href: '/api/response#resjsonpbody', label: 'res.jsonp()', omitFrom: ['3x'] },
              { href: '/api/response#reslinkslinks', label: 'res.links()' },
              { href: '/api/response#reslocationpath', label: 'res.location()' },
              { href: '/api/response#resredirectstatus-path', label: 'res.redirect()' },
              { href: `/api/response#resrenderview--locals--callback`, label: 'res.render()' },
              {
                href: `/api/response#ressendbodystatus-body`,
                label: 'res.send()',
                omitFrom: ['4x', '5x'],
              },
              { href: `/api/response#ressendbody`, label: 'res.send()', omitFrom: ['3x'] },
              {
                href: '/api/response#ressendfilepath-options-fn',
                label: 'res.sendfile()',
                omitFrom: ['4x', '5x'],
              },
              {
                href: '/api/response#ressendfilepath--options--fn',
                label: 'res.sendFile()',
                omitFrom: ['3x'],
              },
              {
                href: '/api/response#ressendstatusstatuscode',
                label: 'res.sendStatus()',
                omitFrom: ['3x'],
              },
              { href: '/api/response#ressetfield--value', label: 'res.set()' },
              { href: `/api/response#resstatuscode`, label: 'res.status()' },
              { href: '/api/response#restypetype', label: 'res.type()' },
              {
                href: '/api/response#resvaryfield',
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
              { href: `/api/router#routeroptions`, label: 'Router()' },
              { href: `/api/router#routerallpath-callback--callback`, label: 'router.all()' },
              {
                href: `/api/router#routermethodpath-callback--callback`,
                label: 'router.METHOD()',
              },
              { href: '/api/router#routerparamname-callback', label: 'router.param()' },
              { href: '/api/router#routerroutepath', label: 'router.route()' },
              {
                href: `/api/router#routerusepath-function--function`,
                label: 'router.use()',
              },
            ],
          },
        },
      ],
    },
  ],
};
