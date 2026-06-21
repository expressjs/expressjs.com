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
          href: '/api/express#methods',
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.api',
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
          href: '/api/application#properties',
          label: 'menu.items.properties',
          ariaLabel: 'menu.aria.application',
        },
        {
          href: '/api/application#events',
          label: 'menu.items.events',
          ariaLabel: 'menu.aria.application',
          omitFrom: ['3x'],
        },
        {
          href: '/api/application#methods',
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.application',
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
          href: '/api/request#properties',
          label: 'menu.items.properties',
          ariaLabel: 'menu.aria.request',
        },
        {
          href: '/api/request#methods',
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.request',
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
          href: '/api/response#properties',
          label: 'menu.items.properties',
          ariaLabel: 'menu.aria.response',
        },
        {
          href: '/api/response#methods',
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.response',
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
          href: '/api/router#methods',
          label: 'menu.items.methods',
          ariaLabel: 'menu.aria.router',
        },
      ],
    },
  ],
};
