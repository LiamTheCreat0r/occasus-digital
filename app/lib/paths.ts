/** Every pre-rendered path. Shared by react-router.config.ts and the sitemap script. */
import { readdirSync } from "node:fs";
import { join } from "node:path";

export { SITE_URL } from "./site.ts";
export const LOCALES = ["en", "fr", "es", "de", "pt"] as const;
export const GAME_SLUGS = ["endhell", "spectra-collab", "parabellum", "babel"];

function postSlugs(): string[] {
  return readdirSync(join(process.cwd(), "content/blog"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Unprefixed (English) page paths. */
export function basePaths(): string[] {
  return [
    "/",
    "/about",
    "/blog",
    ...GAME_SLUGS.map((s) => `/games/${s}`),
    ...postSlugs().map((s) => `/blog/${s}`),
  ];
}

export function withLocale(locale: string, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function allPaths(): string[] {
  return LOCALES.flatMap((l) => basePaths().map((p) => withLocale(l, p)));
}
