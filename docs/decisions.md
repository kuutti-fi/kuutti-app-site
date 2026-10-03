# Decisions

What was decided for the site, and why. Newest last.

## 1. A repository of its own (2026-09-28)

The placeholder page lived in the app's repository under `site/`, served by Amplify Hosting from there (the app's ADR-001). The site now has pages, three languages and legal texts that change on their own schedule and are read by other people than the app's code. It moves to a repository of its own, public like the app's, under the same rules. The maintainer's decision.

Until Amplify Hosting is connected to this repository, the placeholder in the app's repository stays where it is and is what kuutti.app shows. The move is done in that order: this repository published, Amplify connected to it, the site seen at kuutti.app, and only then `site/` and `amplify.yml` removed from the app's repository.

On 28/09/2026, the repository was published, a new Amplify app was connected to it, `kuutti.app` was moved to it, and the site was seen there. The subsequent removal from the app repository is tracked in kuutti-ry/kuutti-app#109.

## 2. Astro, and no script (2026-09-28)

The site is documents: a few pages and three long legal texts, in three languages. It needs templates, Markdown, routes per language and checks at build time, and it needs nothing in the browser.

**Astro** gives that and ships no JavaScript unless asked to: what is deployed is HTML and one style sheet. It is MIT-licensed and widely used, its content collections check every text's front matter against a schema (zod, as in the app), and its routing knows about languages.

Considered and not taken: Eleventy (as light, but untyped templates and no schema for content); Next.js and other React frameworks (a runtime in the browser for a site that has nothing to run); a hand-written set of HTML files (three languages of everything, by hand).

## 3. No CSS framework, and the app's tokens (2026-09-28)

The look is one style sheet on the app's design tokens (TD-9): the same colours, light and dark by the system's setting, the high-contrast pair by the system's "increase contrast". Sizes are fluid (`clamp`), the text column is as wide as a line should be long, the navigation wraps, a table scrolls by itself. That is what makes the site read well on a phone and on a desk, and a CSS framework would add its weight and its look without adding to it.

Set aside in one respect by 9: the site is light only.

## 4. The system's typeface (2026-09-28)

The placeholder loaded Inter from Google Fonts, which tells Google the address of everybody who opens the page. The site names Inter first and the system's typeface after it, and loads no font file: whoever has Inter sees it, everybody else sees their system's own.

Serving Inter from the site itself is possible and needs a decision: its licence (OFL-1.1) is not in the allow-list of the app's licence policy.

Superseded by 9: Inter is served by the site.

## 5. Finnish without a prefix, English slugs (2026-09-28)

Finnish is the association's official language (bylaws, 1) and lives at the root; Swedish and English live under `/sv/` and `/en/`. The pages have the same English names in every language (`/legal/privacy/`, `/sv/legal/privacy/`): the app and the stores link to them, and one name per page is one thing to keep stable.

Set aside by 8 while the site is English only: English lives at the root.

## 6. Legal texts in the languages they were written in (2026-09-28)

The app's rule for its consent texts holds for the site: a legal text is never translated by a machine, and the Finnish text binds. The bylaws exist in Finnish and are shown in Finnish, from every language's legal page. The terms of use and the privacy policy exist as English drafts, written from what the app's code does; their Finnish texts are written by people before the app opens, and the drafts say so.

A draft carries a notice on the page and `noindex` for search engines.

Holds under 8 too: the bylaws, which exist in Finnish, are read in Finnish at `/legal/bylaws/` under the English pages, with the article marked as Finnish. A legal text may be written in a language the site does not speak (`TEXT_LANGUAGES`), and is then read as it is under every language of the site that has no version of its own.

## 7. The logo as lines on nothing (2026-09-28)

The logo file is black lines on an off-white square, which shows as a square on every background but its own. `public/logo.png` is the same drawing with the background made transparent; in the dark theme it is turned over to white. `public/kuutti.png` and `public/favicon.png` are the original, for the icon and for link previews.

## 8. English only, two tabs, and the home page as the placeholder had it (2026-09-28)

The maintainer's word, the day the site was made: one language for now, English; two pages in the navigation, "App" and "About Us"; the home page with only what the placeholder page shows (the logo, the name, "Coming soon..."), and no button; the footer one line, "Kuutti ry, Espoo, Finland." (first asked with the name in front, then without, the same evening). On 01/10/2026 the maintainer asked for the business ID in it, once the association had one: "Kuutti ry, Espoo, Finland. Business ID 3659478-7." On 03/10/2026, links to the association's LinkedIn and GitHub beside it, by their marks, as other services' sites have them; the marks are drawn in the page, so nothing is loaded from either service (rule 1).

So English lives at the root (`/app/`, `/about/`), and the Finnish and Swedish pages and the language switcher are out of the site for now. They are in the history (424c56f) and come back as a language in `src/i18n/locales.ts`, its words in `src/i18n/ui.ts` and its pages under `src/content`; the code stays written for any number of languages. The legal texts stay where they were, reached by links from the pages and not from the navigation, the bylaws in Finnish under the English pages as the maintainer asked the same evening (decision 6); "Help", "Support us" and "Deleting your account" likewise, by their addresses and the links that name them. Decision 5 is set aside while this holds.

## 9. White, Inter served by the site, and the logo alone in the header (2026-09-28)

The maintainer's word, on seeing the site: white like the placeholder page at kuutti.app, not dark by the system's setting; the same typeface as the placeholder; and in the header the logo alone, without the name.

So the site is light only: `color-scheme: light`, the dark tokens are gone, and the high-contrast pair stays for the system's "increase contrast". Inter is served by the site itself from `public/fonts/`: the variable font, Latin subset, taken from the npm package `@fontsource-variable/inter` (the version is in the README), under the SIL Open Font License 1.1, whose text lies beside the file. The content security policy allows `font-src 'self'` and nothing else changes: nothing is loaded from Google, which is why the placeholder's way was not taken (decision 4). The link in the header is the logo, and the name is the image's alternative text, so the link keeps its name for a screen reader.

## 10. "Made in Finland for Finland", with the flag drawn (2026-09-28)

The maintainer's line, in the first sentence of the App page ("Kuutti is an app made in Finland 🇫🇮 for Finland 🇫🇮."; it stood on the home page for an hour first, then with the volunteers on the association's page), the flag of Finland after each "Finland". The flag is drawn as SVG in the official proportions and blue, and sizes with the text: an emoji flag is a flag on Apple and Android and two letters on Windows, which has no flag emoji. It is decorative for a screen reader; the words say Finland.

The rule that a text carries no HTML and no image stands: the author writes the emoji, and the page template draws the flag in its place in the HTML the content layer rendered (`src/lib/flag.ts`, one replacement, no dependency; a Markdown plugin would have needed a package in Astro 7). It holds for every page and every flag to come.
