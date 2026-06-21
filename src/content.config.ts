import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const docsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const apiCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/api' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    authors: z
      .array(
        z.object({
          name: z.string(),
          github: z.string().optional(),
        })
      )
      .optional(),
  }),
});

const npmCollection = defineCollection({
  loader: async () => {
    const res = await fetch('https://registry.npmjs.org/express/latest');
    const { version } = await res.json();
    return [{ id: 'express', version }];
  },
  schema: z.object({ version: z.string() }),
});

export const collections = {
  docs: docsCollection,
  api: apiCollection,
  pages: pagesCollection,
  blog: blogCollection,
  npm: npmCollection,
};
