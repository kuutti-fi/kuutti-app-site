import type { Locale, TextLanguage } from "./locales.ts";

/**
 * The words of the site's own furniture: navigation, notices, the home page,
 * the footer. English is the source and, for now, the only language
 * (docs/decisions.md, 8). A language that comes back has every key here,
 * and the test holds that none is missing.
 */
export const UI = {
  en: {
    "site.name": "Kuutti",
    skip: "Skip to the content",
    "nav.label": "Pages",
    "home.soon": "Coming soon...",
    "home.description": "Kuutti. Coming soon...",
    "legal.title": "Legal and privacy",
    "legal.description":
      "The association's bylaws, the terms of use of the app, and how personal data is handled.",
    "legal.intro":
      "The texts that bind the association and the people who use Kuutti. A text is shown in the languages it was written in; a legal text is never translated by a machine.",
    "legal.language": "in {language}",
    "legal.draft": "Draft",
    "legal.inForce": "In force",
    "notice.draft.title": "This is a draft",
    "notice.draft.body":
      "It is published so that it can be read and commented on. It binds nobody yet, and it may still change.",
    "notice.notBinding.title": "The Finnish text is the one that counts",
    "notice.notBinding.body":
      "This version is for reading. If it and the Finnish text disagree, the Finnish text holds.",
    "notice.machine.title": "Translated by a machine",
    "notice.machine.body":
      "This page has not yet been read by a native speaker. If something reads wrong, the English page is the source.",
    "doc.dated": "Wording of {date}",
    "doc.version": "Version {version}",
    "footer.line": "Kuutti ry, Espoo, Finland.",
    "notFound.title": "There is no such page",
    "notFound.body": "The address may be old or mistyped.",
    "notFound.home": "To the home page",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof UI)["en"];

/** The site's words in a language; `{name}` in a text is replaced from `values`. */
export function t(locale: Locale, key: UiKey, values: Record<string, string> = {}): string {
  const text: string = UI[locale][key];
  return text.replace(/\{(\w+)\}/g, (whole, name: string) => values[name] ?? whole);
}

/** The language of a legal text, named in the reader's language: "in Finnish". */
export const LANGUAGE_IN: Record<Locale, Record<TextLanguage, string>> = {
  en: { fi: "in Finnish", sv: "in Swedish", en: "in English" },
};

/** Dates as Finland writes them, in every language (the app's rule: en-FI). */
const INTL: Record<Locale, string> = { en: "en-FI" };
export const formatDate = (locale: Locale, date: Date): string =>
  new Intl.DateTimeFormat(INTL[locale], { dateStyle: "long", timeZone: "Europe/Helsinki" }).format(
    date,
  );
