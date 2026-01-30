import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    menu: z.string(),
    order: z.number().optional(),
  }),
});

const apiReferenceCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/api-reference' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    menu: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
  apiReference: apiReferenceCollection,
};
