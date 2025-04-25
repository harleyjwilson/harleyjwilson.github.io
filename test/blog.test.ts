import fs from "fs";
import path from "path";
import { describe, expect, test } from "vitest";
import { parse } from "yaml";
import { collections } from "../src/content/config";

const blogDir = path.join(__dirname, "../src/content/blog");

const blogSchema = collections.blog.schema;
const requiredKeys = Object.keys(blogSchema._def.shape());
const optionalKeys = Object.keys(blogSchema._def.shape()).filter((key) => {
  const field = blogSchema._def.shape()[key];
  return (
    field._def.typeName === "ZodOptional" ||
    field._def.defaultValue !== undefined
  );
});
const allowedKeys = [...requiredKeys, ...optionalKeys];

const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"));

describe.for(files)("Blog metadata tests for %s", (file) => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, "utf-8");

  const match = content.match(/^---([\s\S]*?)---/);
  const yamlString = match ? match[1] : null;
  const metadata = yamlString ? parse(yamlString) : null;

  test("Ensure YAML frontmatter exists", () => {
    expect(match).toBeTruthy();
  });

  test("Ensure all required keys are present", () => {
    requiredKeys.forEach((key) => {
      expect(metadata).toHaveProperty(key);
    });
  });

  test("Ensure metadata contains only allowed keys", () => {
    const metadataKeys = Object.keys(metadata || {});
    metadataKeys.forEach((key) => {
      expect(allowedKeys).toContain(key);
    });
  });

  test("Validate metadata types", () => {
    expect(typeof metadata?.title).toBe("string");
    expect(typeof metadata?.pubDate).toBe("string");
    expect(typeof metadata?.draft).toBe("boolean");
    expect(Array.isArray(metadata?.tags)).toBe(true);
    metadata?.tags.forEach((tag: any) => {
      expect(typeof tag).toBe("string");
    });
  });

  test("Validate pubDate format (YYYY-MM-DD)", () => {
    const pubDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    expect(pubDateRegex.test(metadata?.pubDate || "")).toBe(true);
  });

  test("Ensure pubDate is a valid date", () => {
    const parsedDate = new Date(metadata?.pubDate || "");
    expect(parsedDate.toString()).not.toBe("Invalid Date");
  });
});

describe("Ensure blog post titles are unique", async () => {
  const titles = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const match = content.match(/^---([\s\S]*?)---/);
    const yamlString = match ? match[1] : null;
    const metadata = yamlString ? parse(yamlString) : null;

    return metadata?.title;
  });

  test("No duplicate titles", () => {
    const titleSet = new Set(titles);
    expect(titleSet.size).toBe(titles.length);
  });
});
