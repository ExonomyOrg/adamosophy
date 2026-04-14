import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    sidebarOrder: z.number().optional(),
    image: z.string().optional(), // Optional image path
  }),
  // Enable raw markdown body access
  render: true,
});

export const collections = {
  docs: docsCollection,
};
