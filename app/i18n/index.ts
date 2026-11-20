import { useLocation } from "react-router";
import { translations, type Locale, type TKey } from "./translations";

export type { Locale, TKey };

export const locales = ["en", "fr", "es", "de", "pt"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";
export const STORAGE_KEY = "excurse-lang";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Resolves the `:lang?` route param. Returns null for an invalid prefix (→ 404). */
export function resolveLocale(param: string | undefined): Locale | null {
  if (param === undefined) return defaultLocale;
  if (param === defaultLocale) return null; // English is unprefixed only
  return isLocale(param) ? param : null;
}

export function translate(locale: Locale, key: TKey): string {
  return translations[locale][key] ?? translations.en[key];
}

/** Dynamic keys like `game.${slug}.desc` — falls back to English, then to the key. */
export function translateDynamic(locale: Locale, key: string): string {
  const l = translations[locale] as Record<string, string>;
  const en = translations.en as Record<string, string>;
  return l[key] ?? en[key] ?? key;
}

/** Prefixes an app path ("/games/x") with the locale ("/fr/games/x"). */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Strips a locale prefix from a pathname: "/fr/blog" → "/blog". */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first) && first !== defaultLocale) return `/${rest.join("/")}`;
  return pathname || "/";
}

/** Locale from a pathname's first segment ("/fr/blog" → "fr"). */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return isLocale(first) ? first : defaultLocale;
}

/** Works anywhere (root layout, 404, error boundary) since it reads the URL. */
export function useLocale(): Locale {
  return localeFromPath(useLocation().pathname);
}

export function useT() {
  const locale = useLocale();
  const t = (key: TKey) => translate(locale, key);
  t.dyn = (key: string) => translateDynamic(locale, key);
  t.locale = locale;
  t.path = (path: string) => localizedPath(locale, path);
  return t;
}

export function formatDate(date: string | Date, locale: Locale): string {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
