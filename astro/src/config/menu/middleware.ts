import type { Menu } from '../types';

export const middlewareMenu: Menu = {
  items: [
    {
      href: `/overview`,
      label: 'menu.overview',
      ariaLabel: 'menu.middlewareOverviewAria',
    },
    {
      href: `/body-parser`,
      label: 'body-parser',
      ariaLabel: 'body-parser middleware',
    },
    {
      href: `/compression`,
      label: 'compression',
      ariaLabel: 'compression middleware',
    },
    {
      href: `/cookie-parser`,
      label: 'cookie-parser',
      ariaLabel: 'cookie-parser middleware',
    },
    {
      href: `/cookie-session`,
      label: 'cookie-session',
      ariaLabel: 'cookie-session middleware',
    },
    {
      href: `/cors`,
      label: 'cors',
      ariaLabel: 'cors middleware',
    },
    {
      href: `/errorhandler`,
      label: 'errorhandler',
      ariaLabel: 'errorhandler middleware',
    },
    {
      href: `/method-override`,
      label: 'method-override',
      ariaLabel: 'method-override middleware',
    },
    {
      href: `/morgan`,
      label: 'morgan',
      ariaLabel: 'morgan middleware',
    },
    {
      href: `/multer`,
      label: 'multer',
      ariaLabel: 'multer middleware',
    },
    {
      href: `/response-time`,
      label: 'response-time',
      ariaLabel: 'response-time middleware',
    },
    {
      href: `/serve-favicon`,
      label: 'serve-favicon',
      ariaLabel: 'serve-favicon middleware',
    },
    {
      href: `/serve-index`,
      label: 'serve-index',
      ariaLabel: 'serve-index middleware',
    },
    {
      href: `/serve-static`,
      label: 'serve-static',
      ariaLabel: 'serve-static middleware',
    },
    {
      href: `/session`,
      label: 'session',
      ariaLabel: 'session middleware',
    },
    {
      href: `/timeout`,
      label: 'timeout',
      ariaLabel: 'timeout middleware',
    },
    {
      href: `/vhost`,
      label: 'vhost',
      ariaLabel: 'vhost middleware',
    },
  ],
};
