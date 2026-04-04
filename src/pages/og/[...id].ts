import fs from 'fs/promises';
import { join } from 'path';
import satori from 'satori';
import sharp from 'sharp';
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { languages } from '@/i18n/locales';
import { useTranslations } from '@/i18n/utils';

const COLORS = {
  text: '#fafafa',
  edge: '#0A0A0A',
  center: '#1a1a1a',
  accent: '#525252',
};

const TAG_COLORS: Record<string, string> = {
  security: '#261408',
};

function getCenterColor(tags?: string[]): string {
  if (!tags?.length) return COLORS.center;
  for (const tag of tags) {
    const color = TAG_COLORS[tag.toLowerCase()];
    if (color) return color;
  }
  return COLORS.center;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [blog, docs, api, pages] = await Promise.all([
    getCollection('blog'),
    getCollection('docs'),
    getCollection('api'),
    getCollection('pages'),
  ]);

  const blogListingPath = {
    params: { id: 'blog.png' },
    props: { title: 'Express Blog' },
  };

  const blogPaths = blog.map((post) => ({
    params: { id: `blog-${post.id.split('/').pop()!}.png` },
    props: { title: post.data.title, tags: post.data.tags },
  }));

  const docsPagesPaths = [...docs, ...pages].map((entry) => ({
    params: { id: `${entry.id.replace(/\//g, '-')}.png` },
    props: { title: entry.data.title },
  }));

  const apiPaths = api.map((entry) => ({
    params: { id: `${entry.id.replace(/\//g, '-')}.png` },
    props: { title: entry.data.title },
  }));

  const homePaths = Object.keys(languages).map((lang) => {
    const t = useTranslations(lang as keyof typeof languages);
    return {
      params: { id: `home-${lang}.png` },
      props: { title: t('hero.tagline') },
    };
  });

  return [...homePaths, blogListingPath, ...blogPaths, ...docsPagesPaths, ...apiPaths];
};

export const GET: APIRoute = async ({ props }) => {
  const { title, tags } = props as { title: string; tags?: string[] };
  const centerColor = getCenterColor(tags);

  const publicDir = join(process.cwd(), 'public');
  const interBold = await fs.readFile(join(publicDir, 'fonts', 'inter-bold.woff'));

  const logoSvg = await fs.readFile(join(publicDir, 'logo-express-white.svg'), 'utf-8');
  const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

  const displayTitle = title.length > 80 ? title.slice(0, 80) + '...' : title;

  const element = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${COLORS.edge} 0%, ${centerColor} 50%, ${COLORS.edge} 100%)`,
        color: COLORS.text,
        fontFamily: 'Inter',
        padding: '60px 70px',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      children: [
        {
          type: 'img',
          props: {
            src: logoBase64,
            width: 240,
            height: 64,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: '56px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: '-0.03em',
                    maxWidth: '900px',
                  },
                  children: displayTitle,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    width: '80px',
                    height: '4px',
                    backgroundColor: COLORS.accent,
                    borderRadius: '2px',
                  },
                  children: '',
                },
              },
            ],
          },
        },
      ],
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts: [
      {
        data: interBold,
        name: 'Inter',
        weight: 700,
        style: 'normal',
      },
    ],
  });

  const pngBuffer = await sharp(Buffer.from(svg))
    .resize({ width: 1200, height: 630 })
    .png()
    .toBuffer();

  return new Response(pngBuffer as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': pngBuffer.length.toString(),
      'Cache-Control': 'public, max-age=2592000, immutable',
    },
  });
};
