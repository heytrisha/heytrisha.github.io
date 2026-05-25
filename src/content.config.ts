import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['case-study', 'coded']),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    thumbnail: z.string(),
    figmaUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    client: z.string().optional(),
    year: z.number(),
    codedProjectSlug: z.string().optional(),
  }),
});

export const collections = { projects };
