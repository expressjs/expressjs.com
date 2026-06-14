// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';
import react from '@astrojs/react';
import svgr from 'vite-plugin-svgr';
import Icons from 'unplugin-icons/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import redirects from './src/config/redirect.js';
import { DEFAULT_VERSION } from './src/config/versions.ts';
import { accessibleTablesIntegration } from './src/plugins/rehype-accessible-tables.mjs';
import remarkRewriteLocalizedLinks from './src/plugins/remark-rewrite-localized-links.mjs';
import rehypeRewriteLocalizedLinks from './src/plugins/rehype-rewrite-localized-links.mjs';

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

const site = NETLIFY_PREVIEW_SITE || 'https://expressjs.com';

// Shared options for the link-localization plugins (remark for Markdown links,
// rehype for raw HTML/JSX `<a href>`).
const localizedLinksOptions = {
  prefixes: ['guide', 'starter', 'api', 'resources', 'advanced', 'support', 'blog'],
  versionedSections: ['api', 'starter'],
  defaultVersion: DEFAULT_VERSION,
};

// https://astro.build/config
export default defineConfig({
  redirects,
  site,
  markdown: {
    remarkPlugins: [[remarkRewriteLocalizedLinks, localizedLinksOptions]],
    rehypePlugins: [
      [rehypeRewriteLocalizedLinks, localizedLinksOptions],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
        },
      ],
    ],
  },
  vite: {
    plugins: [
      // Transforms SVG files imported with the `?react` suffix into React components
      // (used for local SVG assets like logos).
      svgr(),
      // Resolves `~icons/collection/icon-name` imports into React components,
      // bundling only the SVG paths for icons actually used (no full icon set in the bundle).
      Icons({ compiler: 'jsx', jsx: 'react' }),
    ],
  },
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
    accessibleTablesIntegration(),
    mdx(),
    icon(),
    react(),
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
