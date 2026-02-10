import { defineCollection, z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  status: z.enum(["draft", "published"]),
  tags: z.array(z.string()).optional(),
});

const blog = defineCollection({
  type: "content",
  schema: blogSchema,
});

export const nowSchema = z.object({
  date: z.coerce.date(),
  status: z.enum(["draft", "published"]),
});

const now = defineCollection({
  type: "content",
  schema: nowSchema,
});

export const collections = { blog, now };
