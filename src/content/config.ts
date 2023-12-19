import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    hidden: z.boolean().optional(),
  }),
});

export const collections = { blog };
