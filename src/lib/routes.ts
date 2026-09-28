import { isLocale, LOCALES, type Locale, pathOf } from "../i18n/locales.ts";
import {
  allLegal,
  allPages,
  LEGAL,
  type LegalText,
  type Page,
  placeOf,
  textPath,
  writtenIn,
} from "./content.ts";

/** What a page of the site shows. */
export type View =
  | { kind: "home" }
  | { kind: "page"; page: Page }
  | { kind: "shelf" }
  | {
      kind: "text";
      text: LegalText;
      /** Where the binding version of the text is, when it is not this one and exists. */
      binding: string | null;
    };

export type RouteProps = {
  locale: Locale;
  /** "" is the home page. */
  slug: string;
  /** Where this page is in each language that has it, this one included. */
  alternates: Partial<Record<Locale, string>>;
  view: View;
};

export type Route = { params: { path: string | undefined }; props: RouteProps };

/** Astro's name for a path: without slashes at its ends, and undefined for "/". */
const param = (path: string) => path.replace(/^\/|\/$/g, "") || undefined;

const everywhere = (slug: string): Partial<Record<Locale, string>> =>
  Object.fromEntries(LOCALES.map((locale) => [locale, pathOf(locale, slug)]));

const where = (
  places: { locale: Locale; slug: string }[],
  slug: string,
  path: string,
): Partial<Record<Locale, string>> =>
  Object.fromEntries(
    places
      .filter((place) => place.slug === slug)
      .map((place) => [place.locale, pathOf(place.locale, path)]),
  );

/**
 * Every page of the site, from what is in src/content: the home page and the
 * legal page of each language, each page, and each legal text in the
 * languages it was written in.
 */
export async function routes(): Promise<Route[]> {
  const pages = await allPages();
  const texts = await allLegal();
  const found: Route[] = [];

  for (const locale of LOCALES) {
    found.push({
      params: { path: param(pathOf(locale, "")) },
      props: { locale, slug: "", alternates: everywhere(""), view: { kind: "home" } },
    });
    found.push({
      params: { path: param(pathOf(locale, LEGAL)) },
      props: { locale, slug: LEGAL, alternates: everywhere(LEGAL), view: { kind: "shelf" } },
    });
  }
  const pagePlaces = pages.map((page) => placeOf(page.id));
  for (const page of pages) {
    const { locale, slug } = placeOf(page.id);
    if (slug === LEGAL || slug === "404") throw new Error(`a page cannot be called "${slug}"`);
    found.push({
      params: { path: param(pathOf(locale, slug)) },
      props: {
        locale,
        slug,
        alternates: where(pagePlaces, slug, slug),
        view: { kind: "page", page },
      },
    });
  }
  for (const text of texts) {
    const { language, slug } = writtenIn(text.id);
    const full = `${LEGAL}/${slug}`;
    const versions = texts.filter((other) => writtenIn(other.id).slug === slug);
    const languages = versions.map((other) => writtenIn(other.id).language);
    const binding = versions.find((other) => other.data.binding);
    // Read at its own language where the site speaks it; else under every
    // language of the site that has no version of its own, as it is.
    const readIn = LOCALES.filter(
      (locale) => textPath(language, locale, slug, languages) !== null,
    ).filter((locale) => !isLocale(language) || locale === language);
    for (const locale of readIn) {
      const alternates: Partial<Record<Locale, string>> = {};
      for (const other of LOCALES) {
        const path = languages
          .map((l) => textPath(l, other, slug, languages))
          .find((p): p is string => p !== null);
        if (path) alternates[other] = path;
      }
      found.push({
        params: { path: param(pathOf(locale, full)) },
        props: {
          locale,
          slug: full,
          alternates,
          view: {
            kind: "text",
            text,
            binding:
              binding && binding.id !== text.id
                ? textPath(writtenIn(binding.id).language, locale, slug, languages)
                : null,
          },
        },
      });
    }
  }
  return found;
}
