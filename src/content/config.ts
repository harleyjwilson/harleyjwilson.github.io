import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    published: z.date(),
    updated: z.date().optional(),
    hidden: z.boolean().optional(),
  }),
});

export const collections = { blog };
