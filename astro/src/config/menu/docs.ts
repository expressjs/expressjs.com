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
        {
          href: `/starter/basic-routing`,
          label: 'menu.basicRouting',
          ariaLabel: 'menu.basicRoutingAria',
        },
        {
          href: `/starter/static-files`,
          label: 'menu.staticFiles',
          ariaLabel: 'menu.staticFilesAria',
        },
        {
          href: `/starter/examples`,
          label: 'menu.examples',
          ariaLabel: 'menu.examplesAria',
        },
        {
          href: `/starter/faq`,
          label: 'menu.faq',
          ariaLabel: 'menu.faqAria',
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
        {
          href: `/guide/using-template-engines`,
          label: 'menu.usingTemplateEngines',
          ariaLabel: 'menu.usingTemplateEnginesAria',
        },
        {
          href: `/guide/error-handling`,
          label: 'menu.errorHandling',
          ariaLabel: 'menu.errorHandlingAria',
        },
        {
          href: `/guide/debugging`,
          label: 'menu.debugging',
          ariaLabel: 'menu.debuggingAria',
        },
        {
          href: `/guide/behind-proxies`,
          label: 'menu.behindProxies',
          ariaLabel: 'menu.behindProxiesAria',
        },
        {
          href: `/guide/database-integration`,
          label: 'menu.databaseIntegration',
          ariaLabel: 'menu.databaseIntegrationAria',
        },
        {
          href: `/guide/overriding-express-api`,
          label: 'menu.overridingExpressApi',
          ariaLabel: 'menu.overridingExpressApiAria',
        },
        {
          href: `/guide/migrating-4`,
          label: 'menu.migratingTo4',
          ariaLabel: 'menu.migratingTo4Aria',
        },
        {
          href: `/guide/migrating-5`,
          label: 'menu.migratingTo5',
          ariaLabel: 'menu.migratingTo5Aria',
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
        {
          href: `/advanced/best-practice-performance`,
          label: 'menu.bestPracticePerformance',
          ariaLabel: 'menu.bestPracticePerformanceAria',
        },
        {
          href: `/advanced/best-practice-security`,
          label: 'menu.bestPracticeSecurity',
          ariaLabel: 'menu.bestPracticeSecurityAria',
        },
        {
          href: `/advanced/healthcheck-graceful-shutdown`,
          label: 'menu.healthcheckGracefulShutdown',
          ariaLabel: 'menu.healthcheckGracefulShutdownAria',
        },
        {
          href: `/advanced/security-updates`,
          label: 'menu.securityUpdates',
          ariaLabel: 'menu.securityUpdatesAria',
          global: true,
        },
      ],
    },
  ],
};
