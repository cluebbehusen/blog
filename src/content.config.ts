import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
