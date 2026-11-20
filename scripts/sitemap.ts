/**
 * Post-build: writes sitemap.xml (with hreflang alternates) and a 404.html
 * SPA fallback so GitHub Pages can hydrate unknown URLs into the 404 route.
 */
import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { basePaths, LOCALES, SITE_URL, withLocale } from "../app/lib/paths.ts";

const OUT = "build/client";
const today = new Date().toISOString().slice(0, 10);

const urls = basePaths().flatMap((path) =>
  LOCALES.map((locale) => {
    const alternates = LOCALES.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${withLocale(l, path)}"/>`,
    ).join("\n");
    return `  <url>
    <loc>${SITE_URL}${withLocale(locale, path)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path}"/>
  </url>`;
  }),
);

writeFileSync(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`,
);

// Keep the old Astro sitemap URL working for search engines that cached it.
writeFileSync(
  `${OUT}/sitemap-index.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE_URL}/sitemap.xml</loc></sitemap>
</sitemapindex>
`,
);

const fallback = `${OUT}/__spa-fallback.html`;
if (existsSync(fallback)) copyFileSync(fallback, `${OUT}/404.html`);

console.log(`sitemap: ${urls.length} URLs, 404.html ${existsSync(fallback) ? "written" : "MISSING fallback"}`);
