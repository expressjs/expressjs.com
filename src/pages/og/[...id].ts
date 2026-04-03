import fs from 'fs/promises';
import { join } from 'path';
import satori from 'satori';
import sharp from 'sharp';
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

const COLORS = {
  text: '#fafafa',
  edge: '#0a1018',
};

const TAG_CENTERS: Record<string, string> = {
  security: '#3d2a1e',
};

const DEFAULT_CENTER = '#1e2d3d';

function getCenterColor(tags?: string[]): string {
  if (!tags?.length) return DEFAULT_CENTER;
  for (const tag of tags) {
    const color = TAG_CENTERS[tag.toLowerCase()];
    if (color) return color;
  }
  return DEFAULT_CENTER;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [blog, docs, api, pages] = await Promise.all([
    getCollection('blog'),
    getCollection('docs'),
    getCollection('api'),
    getCollection('pages'),
  ]);

  const blogPaths = blog.map((post) => ({
    params: { id: post.id.split('/').pop()! },
    props: { title: post.data.title, tags: post.data.tags },
  }));

  const collectionPaths = [...docs, ...api, ...pages].map((entry) => ({
    params: { id: entry.id },
    props: { title: entry.data.title },
  }));

  return [...blogPaths, ...collectionPaths];
};

export const GET: APIRoute = async ({ props }) => {
  const { title, tags } = props as { title: string; tags?: string[] };

  const centerColor = getCenterColor(tags);

  const publicDir = join(process.cwd(), 'public');
  const interRegular = await fs.readFile(join(publicDir, 'fonts', 'inter-regular.woff'));
  const interBold = await fs.readFile(join(publicDir, 'fonts', 'inter-bold.woff'));

  const logoSvg = await fs.readFile(join(publicDir, 'logo-express-white.svg'), 'utf-8');
  const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

  const element = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${centerColor} 0%, ${COLORS.edge} 100%)`,
        color: COLORS.text,
        fontFamily: 'Inter',
        padding: '60px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
      },
      children: [
        // Top section: logo
        {
          type: 'img',
          props: {
            src: logoBase64,
            width: 182,
            height: 48,
          },
        },
        // Title
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: '48px',
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: '-0.025em',
              textAlign: 'center',
              maxWidth: '900px',
            },
            children: title.length > 80 ? title.slice(0, 80) + '...' : title,
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
        data: interRegular,
        name: 'Inter',
        weight: 400,
        style: 'normal',
      },
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
