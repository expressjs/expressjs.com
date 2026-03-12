// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://expressjs.com',
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
  ],
});
