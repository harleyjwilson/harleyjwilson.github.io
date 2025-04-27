import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const now = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    // Transform string to Date object
    date: z.coerce.date(),
    draft: z.boolean().default(false).optional(),
  }),
});

export const collections = { blog, now };
