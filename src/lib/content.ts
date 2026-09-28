import { type CollectionEntry, getCollection } from "astro:content";
import {
  isLocale,
  isTextLanguage,
  type Locale,
  pathOf,
  TEXT_LANGUAGES,
  type TextLanguage,
} from "../i18n/locales.ts";

export type Page = CollectionEntry<"pages">;
export type LegalText = CollectionEntry<"legal">;

/** "fi/about" is the page "about" in Finnish: the folder is the language, the file the slug. */
export function placeOf(id: string): { locale: Locale; slug: string } {
  const [locale, slug, ...rest] = id.split("/");
  if (!locale || !slug || rest.length > 0 || !isLocale(locale)) {
    throw new Error(`content "${id}" is not at <language>/<slug>.md`);
  }
  return { locale, slug };
}

export const LEGAL = "legal";

/** "fi/bylaws" is the text "bylaws" as written in Finnish, whether or not the site speaks Finnish. */
export function writtenIn(id: string): { language: TextLanguage; slug: string } {
  const [language, slug, ...rest] = id.split("/");
  if (!language || !slug || rest.length > 0 || !isTextLanguage(language)) {
    throw new Error(`legal text "${id}" is not at <language>/<slug>.md`);
  }
  return { language, slug };
}

/**
 * Where a reader of one language of the site reads a legal text: at the
 * text's own language when the site speaks it; else under the reader's
 * language, as it is, unless a version in the reader's language exists.
 * Null when it is read nowhere for that reader.
 */
export function textPath(
  language: TextLanguage,
  locale: Locale,
  slug: string,
  versions: readonly TextLanguage[],
): string | null {
  const full = `${LEGAL}/${slug}`;
  if (isLocale(language)) return pathOf(language, full);
  return versions.includes(locale) ? null : pathOf(locale, full);
}

export async function allPages(): Promise<Page[]> {
  return getCollection("pages");
}

export async function allLegal(): Promise<LegalText[]> {
  const texts = await getCollection("legal");
  return texts.sort((a, b) => a.data.order - b.data.order);
}

/** The pages of the navigation in a language, in their order. */
export async function navigation(locale: Locale): Promise<{ slug: string; title: string }[]> {
  return (await allPages())
    .filter((page) => placeOf(page.id).locale === locale && page.data.nav !== undefined)
    .sort((a, b) => (a.data.nav ?? 0) - (b.data.nav ?? 0))
    .map((page) => ({ slug: placeOf(page.id).slug, title: page.data.title }));
}

/**
 * The legal texts as the legal page lists them: one item per text, with the
 * languages it exists in. The title and the description are those of the
 * reader's language where the text has it, of the binding one otherwise.
 */
export async function legalShelf(locale: Locale): Promise<
  {
    slug: string;
    title: string;
    description: string;
    status: LegalText["data"]["status"];
    versions: { language: TextLanguage; href: string; binding: boolean }[];
  }[]
> {
  const texts = await allLegal();
  const slugs = [...new Set(texts.map((text) => writtenIn(text.id).slug))];
  return slugs.map((slug) => {
    const versions = texts.filter((text) => writtenIn(text.id).slug === slug);
    const languages = versions.map((text) => writtenIn(text.id).language);
    const own = versions.find((text) => writtenIn(text.id).language === locale);
    const other = versions.find((text) => text.data.binding) ?? versions[0];
    const shown = own ?? other;
    if (!shown) throw new Error(`no version of ${slug}`);
    // In a language the text does not exist in, the page names it in the
    // reader's language where the text says how, and in its own otherwise.
    const named = own?.data ?? shown.data.listing?.[locale] ?? shown.data;
    return {
      slug,
      title: named.title,
      description: named.description,
      status: shown.data.status,
      versions: TEXT_LANGUAGES.flatMap((language) => {
        const version = versions.find((text) => writtenIn(text.id).language === language);
        const href = version ? textPath(language, locale, slug, languages) : null;
        return version && href ? [{ language, href, binding: version.data.binding }] : [];
      }),
    };
  });
}
