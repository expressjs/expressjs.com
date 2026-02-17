import type { Menu } from '../types';

export const docsMenu: Menu = {
  sections: [
    {
      title: 'menu.gettingStarted',
      items: [
        { href: `/starter/installing`, label: 'menu.installing', ariaLabel: 'menu.installingAria' },
        {
          href: `/starter/hello-world`,
          label: 'menu.helloWorld',
          ariaLabel: 'menu.helloWorldAria',
        },
        {
          href: `/starter/generator`,
          label: 'menu.expressGenerator',
          ariaLabel: 'menu.expressGeneratorAria',
        },
      ],
    },
    {
      title: 'menu.guide',
      items: [
        { href: `/guide/routing`, label: 'menu.routing', ariaLabel: 'menu.routingAria' },
        {
          href: `/guide/writing-middleware`,
          label: 'menu.writingMiddleware',
          ariaLabel: 'menu.writingMiddlewareAria',
        },
        {
          href: `/guide/using-middleware`,
          label: 'menu.usingMiddleware',
          ariaLabel: 'menu.usingMiddlewareAria',
        },
      ],
    },
    {
      title: 'menu.advancedTopics',
      items: [
        {
          href: `/advanced/developing-template-engines`,
          label: 'menu.buildingTemplateEngines',
          ariaLabel: 'menu.buildingTemplateEnginesAria',
        },
      ],
    },
  ],
};
