/**
 * Build-time content loading. Only imported from route loaders, which run
 * during pre-rendering — never shipped to the browser.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  pubDate: string; // ISO
  updatedDate?: string;
  heroImage?: string;
  tags: string[];
}

export interface Post extends PostMeta {
  html: string;
}

function toIso(value: unknown, field: string, file: string): string {
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) throw new Error(`${file}: invalid ${field}`);
  return d.toISOString();
}

function str(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${file}: missing "${field}"`);
  return value;
}

function parse(file: string): Post {
  const raw = readFileSync(join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: str(data.title, "title", file),
    description: str(data.description, "description", file),
    pubDate: toIso(data.pubDate, "pubDate", file),
    updatedDate: data.updatedDate ? toIso(data.updatedDate, "updatedDate", file) : undefined,
    heroImage: typeof data.heroImage === "string" ? data.heroImage : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    html: marked.parse(content, { async: false }),
  };
}

export function getPosts(): PostMeta[] {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { html: _html, ...meta } = parse(f);
      return meta;
    })
    .sort((a, b) => b.pubDate.localeCompare(a.pubDate));
}

export function getPost(slug: string): Post | undefined {
  if (!/^[a-z0-9-]+$/i.test(slug)) return undefined;
  try {
    return parse(`${slug}.md`);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw err;
  }
}

export function getPostSlugs(): string[] {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
