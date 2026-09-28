/**
 * What the content must hold before it is built, beyond what its schema says
 * (src/content.config.ts). Run by `pnpm lint`.
 *
 * - A page exists in every language, under the same slug.
 * - Every Finnish and Swedish page says who wrote it: `machine: true`, or
 *   `reviewedBy` with the native reader's name. English is the source and
 *   carries neither.
 * - A legal text is never machine-written into a language: it has no
 *   `machine` key at all. A text in force names its version and has exactly
 *   one binding language; a draft may still be waiting for its binding text,
 *   and never has two.
 * - Nothing in the content loads anything from anybody else: no image, no
 *   frame, no script, and no HTML at all.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, TEXT_LANGUAGES } from "../src/i18n/locales.ts";

const root = join(import.meta.dirname, "..", "src", "content");
const problems: string[] = [];

type Text = {
  locale: string;
  slug: string;
  file: string;
  front: Map<string, string>;
  body: string;
};

function read(collection: string, languages: readonly string[]): Text[] {
  const found: Text[] = [];
  for (const locale of readdirSync(join(root, collection))) {
    if (!languages.includes(locale)) {
      problems.push(`${collection}/${locale}: not a language of this kind of text`);
      continue;
    }
    for (const name of readdirSync(join(root, collection, locale))) {
      const file = `${collection}/${locale}/${name}`;
      if (!name.endsWith(".md")) {
        problems.push(`${file}: only Markdown lives here`);
        continue;
      }
      const source = readFileSync(join(root, file), "utf8");
      const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
      if (!match) {
        problems.push(`${file}: no front matter`);
        continue;
      }
      const front = new Map<string, string>();
      for (const line of (match[1] ?? "").split("\n")) {
        const at = line.indexOf(":");
        if (at > 0) front.set(line.slice(0, at).trim(), line.slice(at + 1).trim());
      }
      found.push({ locale, slug: name.slice(0, -3), file, front, body: match[2] ?? "" });
    }
  }
  return found;
}

// A page is in a language of the site; a legal text in any it may be written in.
const pages = read("pages", LOCALES);
const legal = read("legal", TEXT_LANGUAGES);

for (const slug of new Set(pages.map((page) => page.slug))) {
  for (const locale of LOCALES) {
    if (!pages.some((page) => page.slug === slug && page.locale === locale)) {
      problems.push(`pages/${locale}/${slug}.md is missing: a page exists in every language`);
    }
  }
}

for (const page of pages) {
  const machine = page.front.get("machine") === "true";
  const reviewed = (page.front.get("reviewedBy") ?? "") !== "";
  if (page.locale === "en" && (machine || reviewed)) {
    problems.push(`${page.file}: English is the source and carries neither machine nor reviewedBy`);
  }
  if (page.locale !== "en" && machine === reviewed) {
    problems.push(
      `${page.file}: says either "machine: true" or who read it as a native speaker (reviewedBy), and not both`,
    );
  }
}

for (const slug of new Set(legal.map((text) => text.slug))) {
  const versions = legal.filter((text) => text.slug === slug);
  const binding = versions.filter((text) => text.front.get("binding") === "true");
  const inForce = versions.some((text) => text.front.get("status") === "in_force");
  if (binding.length > 1 || (inForce && binding.length !== 1)) {
    problems.push(
      `legal/*/${slug}.md: ${binding.length} binding versions; a text in force has exactly one, a draft at most one`,
    );
  }
  if (new Set(versions.map((text) => text.front.get("status"))).size > 1) {
    problems.push(`legal/*/${slug}.md: a draft in one language and in force in another`);
  }
  for (const text of versions) {
    if (text.front.has("machine")) {
      problems.push(`${text.file}: a legal text is written by people; it has no "machine" key`);
    }
    if (text.front.get("status") === "in_force" && !text.front.get("version")) {
      problems.push(`${text.file}: a text in force names its version`);
    }
  }
}

for (const text of [...pages, ...legal]) {
  if (/<[a-z!/][^>]*>/i.test(text.body)) {
    problems.push(`${text.file}: HTML in the text; Markdown only`);
  }
  if (/!\[[^\]]*\]\(/.test(text.body)) {
    problems.push(`${text.file}: an image in the text; the site's pictures are its own files`);
  }
  for (const [, href] of text.body.matchAll(/\]\((http:[^)\s]+)\)/g)) {
    problems.push(`${text.file}: a link without https: ${href}`);
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(
  `content holds: ${pages.length} pages in ${LOCALES.length} languages, ${legal.length} legal texts`,
);
