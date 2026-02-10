import fs from "fs";
import path from "path";
import { describe, expect, test } from "vitest";
import { parse } from "yaml";
import { blogSchema } from "../src/content/config";

const blogDir = path.join(__dirname, "../src/content/blog");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shape: Record<string, any> = blogSchema._def.shape();
const allKeys = Object.keys(shape);
const isOptional = (key: string) => {
  const field = shape[key];
  return (
    field._def.typeName === "ZodOptional" ||
    field._def.defaultValue !== undefined
  );
};
const requiredKeys = allKeys.filter((key) => !isOptional(key));
const allowedKeys = allKeys;

const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"));

const parsedFiles = files.map((file) => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/^---([\s\S]*?)---/);
  const yamlString = match ? match[1] : null;
  const metadata = yamlString ? parse(yamlString) : null;
  return { file, match, metadata };
});

describe.for(parsedFiles)(
  "Blog metadata tests for $file",
  ({ match, metadata }) => {
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

    test("Validate metadata against schema", () => {
      expect(() => blogSchema.parse(metadata)).not.toThrow();
    });

    test("Validate published format (YYYY-MM-DD)", () => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      expect(metadata?.published).toMatch(dateRegex);
    });

    test("Validate updated format if present (YYYY-MM-DD)", () => {
      if (metadata?.updated) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        expect(metadata.updated).toMatch(dateRegex);
      }
    });
  },
);

describe("Ensure blog post titles are unique", () => {
  const titles = parsedFiles.map(({ metadata }) => metadata?.title);

  test("No duplicate titles", () => {
    const titleSet = new Set(titles);
    expect(titleSet.size).toBe(titles.length);
  });
});
