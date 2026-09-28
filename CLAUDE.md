# Kuutti: the website

The website of Kuutti ry (kuutti.app): what Kuutti is, who is behind it, and the legal texts. A static site made with Astro. The app is another repository, `kuutti-fi/kuutti-app`, and its `CLAUDE.md` carries the project's standing rules; what is here is what this site needs of them, and what is the site's own. Where the two disagree about the project, the app's repository wins.

The site's issues live in the app's repository (`kuutti-fi/kuutti-app#53` is the site).

## Commands

`package.json` is the source of truth; keep this list in sync with it.

- `pnpm install --frozen-lockfile`. Node 22.18+ and pnpm come from `package.json`; `corepack enable` once.
- `pnpm dev` serves the site at http://127.0.0.1:4321. `pnpm build` writes `dist/`; `pnpm preview` serves it.
- `pnpm typecheck` (`astro check`), `pnpm lint` (Biome, then `scripts/check-content.ts`), `pnpm test` (node's test runner), `pnpm format`.
- `pnpm check:site` reads `dist/` after a build: no script, nothing loaded from elsewhere, no dead link, a language and one `h1` on every page.

Before pushing: typecheck, lint, test, build and check:site pass locally. Do not push red.

## Non-negotiable rules

1. **The site runs nothing and loads nothing from anybody else.** No script, no analytics, no cookie, no font or image from another host (Inter is the site's own file under `public/fonts/`), no embedded frame, no form. `scripts/check-site.ts` and the content security policy in `customHttp.yml` both hold this; a change that needs an exception is wrong.
2. **No product surface** (the app's rule 8). No profile pages, no share links, no sign-in, no browser client of the app. The site says what Kuutti is; it is not Kuutti.
3. **A legal text is never written or translated by a machine into a language it did not exist in.** The Finnish text binds. A text is read in the language it was written in, whether or not the site speaks it (`TEXT_LANGUAGES` in `src/i18n/locales.ts`). A draft says that it is a draft, on the page, and search engines are told to leave it alone.
4. **Finnish and Swedish written by a machine say so.** Text an agent writes or edits in Finnish or Swedish carries `machine: true`. `reviewedBy` is written only for a native reader who has read the page, never by an agent on its own.
5. **Nobody is named who has not asked to be.** No team member, donor, partner or researcher appears on the site without their word, and no name is taken from a planning document.
6. **Nothing is claimed that is not so.** No partner that has not agreed, no date that is not decided, no address that does not answer. What is not decided is `null` in `src/site.ts`, and the page says that it is coming.
7. **No asking for money before the association may.** A donate button counts as a collection of money under Finnish law; there is none until the association is registered and has made its notification or has its permit.
8. `.env` files are never read, written or committed. The site needs none.

## Git

As in the app's repository:

- `main` only, and only through a pull request: squash merge, the checks green, one approving review.
- Every commit is signed off (`git commit -s`). Enable the hook once per clone: `git config core.hooksPath .githooks`.
- Linear history: no merge commits, no force-push, never touch the ruleset or the repository's settings.
- Subject line imperative and under 72 characters; the body says what and why.
- Every pull request body carries `Refs kuutti-fi/kuutti-app#n`. Never a closing keyword: an issue closes when the maintainer has looked at the result.
- Commit only what was asked. No `dist/`, no `.astro/`, no unrelated lockfile churn.

## Code and content

- TypeScript strict. Biome is the formatter and the linter.
- A page is Markdown in `src/content/pages/<language>/`, in every language of the site under one name (`src/i18n/locales.ts`: English only for now, `docs/decisions.md` 8). Markdown only: no HTML and no images in a text.
- The site's own words (navigation, notices, the footer) are in `src/i18n/ui.ts`, in every language of the site, and a test holds that none is missing.
- Links inside the site are written in full, with the language's prefix where it has one and a trailing slash (`/legal/privacy/`); the build checks that each leads somewhere.
- Dates and numbers are written as Finland writes them, in every language.
- Do not add a framework, a component library or a build step for something a style sheet can do.

## Accessibility

- Meaning never by colour alone: where you are in the navigation is a line and a weight.
- WCAG AA contrast in the light theme, the only one, and in its high-contrast pair, which answers the system's setting.
- Every target is at least 44 px high. The page holds at 200 % text size and on a 320 px wide screen, without scrolling sideways.
- One `h1` per page, headings in order, a skip link, the language on `html`.

## Decisions

`docs/decisions.md` has what was decided for the site and why. `docs/open-questions.md` has what is the maintainer's to decide and what the site says meanwhile.
