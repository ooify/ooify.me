import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/^zh\//, '').replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      lang: z.enum(['zh', 'en']).default('zh'),
      draft: z.boolean().default(true),
      featured: z.boolean().default(false),
      image: image().optional(),
    }),
});

export const collections = { posts };
