import type { MetaDescriptor } from "react-router";
import { locales, localizedPath, type Locale } from "~/i18n";
import { SITE_URL } from "./site";
import ogDefault from "~/assets/img/logos/occasus-digital-background-text.webp";

interface SeoInput {
  locale: Locale;
  /** Unprefixed app path, e.g. "/games/endhell" */
  path: string;
  title?: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "video.other";
  jsonLd?: object;
}

const SITE_NAME = "Occasus Digital";

function absolute(url: string): string {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function seo({ locale, path, title, description, image, type = "website", jsonLd }: SeoInput): MetaDescriptor[] {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const url = absolute(localizedPath(locale, path));
  const img = absolute(image ?? ogDefault);

  const tags: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...locales.map((l) => ({
      tagName: "link",
      rel: "alternate",
      hrefLang: l,
      href: absolute(localizedPath(l, path)),
    })),
    { tagName: "link", rel: "alternate", hrefLang: "x-default", href: absolute(path) },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:locale", content: locale },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (jsonLd) tags.push({ "script:ld+json": jsonLd });
  return tags;
}

/** Plain-text version of a `**bold**` description, for meta tags. */
export function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\s+/g, " ").trim();
}
