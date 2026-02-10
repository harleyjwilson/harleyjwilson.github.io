import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    status: z.enum(["draft", "published"]),
    tags: z.array(z.string()).optional(),
  }),
});

const now = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    // Transform string to Date object
    date: z.coerce.date(),
    status: z.enum(["draft", "published"]),
  }),
});

export const collections = { blog, now };
