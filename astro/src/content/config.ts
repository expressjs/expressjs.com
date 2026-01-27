import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    menu: z.string(),
    order: z.number().optional(),
    layout: z.string().optional(),
    redirect_from: z.string().optional(),
  }),
});

export const collections = { docs };
