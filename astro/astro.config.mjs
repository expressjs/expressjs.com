// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';
import react from '@astrojs/react';

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

const site = NETLIFY_PREVIEW_SITE || 'https://expressjs.com';

// TODO: add redirecto for blog posts

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
    react(),
  ],
});
