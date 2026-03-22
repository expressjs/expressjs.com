// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';

// TODO: add redirecto for blog posts

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

const site = NETLIFY_PREVIEW_SITE || 'https://expressjs.com';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    expressiveCode({
      themes: ['github-dark'],
      styleOverrides: {
        uiFontSize: 'var(--font-size-sm)',
        codeFontSize: 'var(--font-size-sm)',
        borderRadius: 'var(--radius-base)',
        borderWidth: 'var(--border-width-1)',
      },
    }),
    mdx(),
    icon(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          de: 'de',
          en: 'en',
          es: 'es',
          fr: 'fr',
          ja: 'ja',
          it: 'it',
          ko: 'ko',
          'pt-br': 'pt-BR',
          'zh-cn': 'zh-CN',
          'zh-tw': 'zh-TW',
        },
      },
    }),
  ],
});
