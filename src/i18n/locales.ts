/**
 * The languages of the site. English only for now (docs/decisions.md, 8),
 * and its pages have no prefix. The app has three (packages/i18n in the
 * app's repository); a language comes back here as an entry in this list,
 * its words in ui.ts, and its pages under src/content.
 */
export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** The path of a page in a language: "" is the home page. Always with a trailing slash. */
export function pathOf(locale: Locale, slug: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return slug === "" ? `${prefix}/` : `${prefix}/${slug}/`;
}

/**
 * The languages a legal text may be written in: the site's own, and Finnish
 * and Swedish, which bind and are read as they are whatever the site speaks
 * (docs/decisions.md, 6 and 8). A text in a language the site does not
 * speak is shown under the site's pages, in its own language.
 */
export const TEXT_LANGUAGES = ["fi", "sv", "en"] as const;
export type TextLanguage = (typeof TEXT_LANGUAGES)[number];
export const isTextLanguage = (value: string): value is TextLanguage =>
  (TEXT_LANGUAGES as readonly string[]).includes(value);
