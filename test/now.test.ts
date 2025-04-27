import fs from "fs";
import path from "path";
import { describe, expect, test } from "vitest";
import { parse } from "yaml";
import { collections } from "../src/content/config";

const nowDir = path.join(__dirname, "../src/content/now");

const nowSchema = collections.now.schema;
const requiredKeys = Object.keys(nowSchema._def.shape());
const optionalKeys = Object.keys(nowSchema._def.shape()).filter((key) => {
  const field = nowSchema._def.shape()[key];
  return (
    field._def.typeName === "ZodOptional" ||
    field._def.defaultValue !== undefined
  );
});
const allowedKeys = [...requiredKeys, ...optionalKeys];

const files = fs.readdirSync(nowDir).filter((file) => file.endsWith(".md"));

describe.for(files)("Now post metadata tests for %s", (file) => {
  const filePath = path.join(nowDir, file);
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
    expect(typeof metadata?.date).toBe("string");
    expect(typeof metadata?.draft).toBe("boolean");
  });

  test("Validate date format (YYYY-MM-DD)", () => {
    const pubDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    expect(pubDateRegex.test(metadata?.date || "")).toBe(true);
  });

  test("Ensure date is a valid date", () => {
    const parsedDate = new Date(metadata?.date || "");
    expect(parsedDate.toString()).not.toBe("Invalid Date");
  });

  test("Ensure date metadata is the same as the file name", () => {
    const fileNameWithoutExtension = path.basename(file, ".md");
    const fileDate = fileNameWithoutExtension.split("-").slice(0, 3).join("-");
    expect(metadata?.date).toBe(fileDate);
  });
});
