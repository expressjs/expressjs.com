import type { Menu } from '../types';

export const docsMenu: Menu = {
  sections: [
    {
      title: 'menu.sections.gettingStarted',
      items: [
        {
          href: `/starter/installing`,
          label: 'menu.items.installing',
          ariaLabel: 'menu.aria.installing',
        },
        {
          href: `/starter/hello-world`,
          label: 'menu.items.helloWorld',
          ariaLabel: 'menu.aria.helloWorld',
        },
        {
          href: `/starter/generator`,
          label: 'menu.items.expressGenerator',
          ariaLabel: 'menu.aria.expressGenerator',
        },
        {
          href: `/starter/basic-routing`,
          label: 'menu.items.basicRouting',
          ariaLabel: 'menu.aria.basicRouting',
        },
        {
          href: `/starter/static-files`,
          label: 'menu.items.staticFiles',
          ariaLabel: 'menu.aria.staticFiles',
        },
        {
          href: `/starter/examples`,
          label: 'menu.items.examples',
          ariaLabel: 'menu.aria.examples',
        },
        {
          href: `/starter/faq`,
          label: 'menu.items.faq',
          ariaLabel: 'menu.aria.faq',
        },
      ],
    },
    {
      title: 'menu.sections.guide',
      items: [
        {
          href: `/guide/routing`,
          label: 'menu.items.routing',
          ariaLabel: 'menu.aria.routing',
        },
        {
          href: `/guide/writing-middleware`,
          label: 'menu.items.writingMiddleware',
          ariaLabel: 'menu.aria.writingMiddleware',
        },
        {
          href: `/guide/using-middleware`,
          label: 'menu.items.usingMiddleware',
          ariaLabel: 'menu.aria.usingMiddleware',
        },
        {
          href: `/guide/using-template-engines`,
          label: 'menu.items.usingTemplateEngines',
          ariaLabel: 'menu.aria.usingTemplateEngines',
        },
        {
          href: `/guide/error-handling`,
          label: 'menu.items.errorHandling',
          ariaLabel: 'menu.aria.errorHandling',
        },
        {
          href: `/guide/debugging`,
          label: 'menu.items.debugging',
          ariaLabel: 'menu.aria.debugging',
        },
        {
          href: `/guide/behind-proxies`,
          label: 'menu.items.behindProxies',
          ariaLabel: 'menu.aria.behindProxies',
        },
        {
          href: `/guide/database-integration`,
          label: 'menu.items.databaseIntegration',
          ariaLabel: 'menu.aria.databaseIntegration',
          global: true,
        },
        {
          href: `/guide/overriding-express-api`,
          label: 'menu.items.overridingExpressApi',
          ariaLabel: 'menu.aria.overridingExpressApi',
        },
      ],
    },
    {
      title: 'menu.sections.migration',
      items: [
        {
          href: `/guide/migrating-4`,
          label: 'menu.items.migratingTo4',
          ariaLabel: 'menu.aria.migratingTo4',
          global: true,
        },
        {
          href: `/guide/migrating-5`,
          label: 'menu.items.migratingTo5',
          ariaLabel: 'menu.aria.migratingTo5',
          global: true,
        },
      ],
    },
    {
      title: 'menu.sections.advanced',
      items: [
        {
          href: `/advanced/developing-template-engines`,
          label: 'menu.items.buildingTemplateEngines',
          ariaLabel: 'menu.aria.buildingTemplateEngines',
        },
        {
          href: `/advanced/best-practice-performance`,
          label: 'menu.items.bestPracticePerformance',
          ariaLabel: 'menu.aria.bestPracticePerformance',
          global: true,
        },
        {
          href: `/advanced/best-practice-security`,
          label: 'menu.items.bestPracticeSecurity',
          ariaLabel: 'menu.aria.bestPracticeSecurity',
          global: true,
        },
        {
          href: `/advanced/healthcheck-graceful-shutdown`,
          label: 'menu.items.healthcheckGracefulShutdown',
          ariaLabel: 'menu.aria.healthcheckGracefulShutdown',
          global: true,
        },
        {
          href: `/advanced/security-updates`,
          label: 'menu.items.securityUpdates',
          ariaLabel: 'menu.aria.securityUpdates',
          global: true,
        },
      ],
    },
  ],
};
