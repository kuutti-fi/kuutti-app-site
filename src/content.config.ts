import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { LOCALES } from "./i18n/locales.ts";

// Two kinds of text, both Markdown, one folder per language:
//
//   src/content/pages/<language>/<slug>.md   what the site says about Kuutti
//   src/content/legal/<language>/<slug>.md   what binds: bylaws, terms, privacy
//
// A page exists in every language of the site (src/i18n/locales.ts). A legal
// text exists in the languages it was written in by people, and in no other:
// it is never translated by a machine (the app's rule for its consent texts,
// and this site's).

/** A text's name and one-line description, as a list shows it. */
const listed = z.object({ title: z.string().min(1), description: z.string().min(1).max(200) });

const pages = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string().min(1),
    /** One or two sentences: the page's description for search engines and the home page's card. */
    description: z.string().min(1).max(200),
    /** Where the page stands in the navigation; a page without it is reached by links only. */
    nav: z.number().int().positive().optional(),
    /**
     * Written or translated by a machine, an agent included, and not yet read
     * by a native speaker. Every Finnish and Swedish page carries either this
     * or `reviewedBy`; scripts/check-content.ts holds that.
     */
    machine: z.boolean().default(false),
    /** Who read the text as a native speaker, and when (their name as they want it shown in git). */
    reviewedBy: z.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(200),
    /** The order on the legal page. */
    order: z.number().int().positive(),
    /** A draft binds nobody and says so on the page; a text in force names its version. */
    status: z.enum(["draft", "in_force"]),
    /** The version a person consents to in the app (consent_version there), once in force. */
    version: z.string().optional(),
    /** The day of the wording, as written in the text's source. */
    dated: z.coerce.date(),
    /** Whether this language is the one that counts when two disagree. */
    binding: z.boolean(),
    /**
     * How the legal page of another language names this text while the text
     * does not exist in that language. Names of a text, not the text: they
     * are the site's own words and may be a machine's.
     */
    listing: z
      .object(Object.fromEntries(LOCALES.map((locale) => [locale, listed.optional()])))
      .strict()
      .optional(),
  }),
});

export const collections = { pages, legal };
