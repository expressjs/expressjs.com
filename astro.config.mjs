// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';
import react from '@astrojs/react';
import svgr from 'vite-plugin-svgr';
import Icons from 'unplugin-icons/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import redirects from './src/config/redirects/index.js';
import movedPages from './src/config/redirects/moved-pages.json' with { type: 'json' };
import rehypeAccessibleTables from './src/plugins/rehype-accessible-tables.mjs';
import remarkRewriteLocalizedLinks from './src/plugins/remark-rewrite-localized-links.mjs';
import remarkCodeTabs from './src/plugins/remark-code-tabs.mjs';
import rehypeRewriteLocalizedLinks from './src/plugins/rehype-rewrite-localized-links.mjs';

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

const site = NETLIFY_PREVIEW_SITE || 'https://expressjs.com';

// Unlocalized paths of moved/removed pages. `[...path].astro` emits `noindex`
// redirect stubs for these in every locale; keep those stubs out of the sitemap.
const movedPagePaths = new Set(Object.keys(movedPages));

// https://astro.build/config
export default defineConfig({
  redirects,
  site,
  markdown: {
    // Link localization (Markdown links + raw HTML/JSX `<a href>`). Configuration —
    // localized sections, versioned sections, default version, and the "global" pages
    // exception — lives in the plugin defaults; no options needed here.
    processor: unified({
      remarkPlugins: [remarkRewriteLocalizedLinks, remarkCodeTabs],
      rehypePlugins: [
        rehypeRewriteLocalizedLinks,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
          },
        ],
        rehypeAccessibleTables,
      ],
    }),
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
    mdx(),
    icon(),
    react(),
    sitemap({
      // Only the canonical URLs belong in the sitemap. The catch-all
      // `[...path].astro` also emits `noindex` redirect stubs: language-less ones
      // (e.g. `/guide/x`) and per-locale ones for moved pages
      // (e.g. `/en/resources/middleware/csurf`). Exclude both.
      // Keep this locale list in sync with `i18n.locales` below.
      filter: (page) => {
        const { pathname } = new URL(page);
        // The homepage is served at `/` and is the canonical for `/en/`.
        if (pathname === '/') return true;
        if (!/^\/(de|en|es|fr|it|ja|ko|pt-br|zh-cn|zh-tw)(\/|$)/.test(pathname)) return false;
        const unlocalized = pathname.replace(/^\/[a-z-]+/, '').replace(/\/$/, '');
        return !movedPagePaths.has(unlocalized);
      },
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
