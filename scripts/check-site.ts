/**
 * What the built site must hold (dist/, after `pnpm build`). Run by
 * `pnpm check:site` and by CI.
 *
 * - No script, no frame, no form: the site runs nothing in the browser.
 * - Nothing is loaded from anybody else: every stylesheet, image, font and
 *   icon is the site's own. Links to other sites are links, not loads.
 * - Every link inside the site leads to a page or a file that exists, and an
 *   anchor to an id that is there.
 * - Every page says its language, has a title, a description and one h1.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { LOCALES } from "../src/i18n/locales.ts";

const dist = join(import.meta.dirname, "..", "dist");
if (!existsSync(dist)) {
  console.error("no dist/: run pnpm build first");
  process.exit(1);
}

const problems: string[] = [];
const pages: string[] = [];
(function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) pages.push(path);
  }
})(dist);

const attribute = (tag: string, name: string) =>
  new RegExp(`\\s${name}="([^"]*)"`, "i").exec(tag)?.[1];

for (const path of pages) {
  const page = `/${relative(dist, path)}`;
  const html = readFileSync(path, "utf8");

  for (const banned of ["script", "iframe", "form", "object", "embed"]) {
    if (new RegExp(`<${banned}[\\s>]`, "i").test(html)) problems.push(`${page}: a <${banned}>`);
  }
  if (/\son[a-z]+="/i.test(html.replace(/\scontent="[^"]*"/g, ""))) {
    problems.push(`${page}: an inline event handler`);
  }
  if (/@import|url\(\s*["']?(https?:)?\/\//i.test(html)) {
    problems.push(`${page}: the stylesheet loads something from elsewhere`);
  }

  // What the browser fetches by itself.
  for (const [tag] of html.matchAll(/<(img|source|video|audio|link)\b[^>]*>/gi)) {
    const rel = attribute(tag, "rel") ?? "";
    if (
      /^<link/i.test(tag) &&
      !/stylesheet|icon|preload|prefetch|preconnect|dns-prefetch|manifest/.test(rel)
    ) {
      continue; // canonical and alternate name an address, they load nothing
    }
    const address =
      attribute(tag, "src") ?? attribute(tag, "href") ?? attribute(tag, "srcset") ?? "";
    if (/^(https?:)?\/\//i.test(address)) problems.push(`${page}: loads ${address}`);
    else if (address.startsWith("/") && !existsSync(join(dist, address.split(/[?#]/)[0] ?? ""))) {
      problems.push(`${page}: ${address} is not in the site`);
    }
  }

  // Where a reader can go inside the site.
  for (const [tag] of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attribute(tag, "href");
    if (href === undefined) {
      problems.push(`${page}: a link without an address`);
      continue;
    }
    if (/^https:\/\//.test(href) || /^mailto:/.test(href)) continue;
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) {
      problems.push(`${page}: a link to ${href}; other sites are reached by https only`);
      continue;
    }
    const [target = "", anchor] = href.split("#");
    let file = path;
    if (target !== "") {
      if (!target.startsWith("/")) {
        problems.push(`${page}: a relative link, ${href}; links inside the site begin with /`);
        continue;
      }
      file = target.endsWith("/") ? join(dist, target, "index.html") : join(dist, target);
      if (!existsSync(file) || statSync(file).isDirectory()) {
        problems.push(`${page}: ${href} leads nowhere`);
        continue;
      }
    }
    if (anchor && file.endsWith(".html")) {
      const there = readFileSync(file, "utf8");
      if (!new RegExp(`\\sid="${anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).test(there)) {
        problems.push(`${page}: ${href} names an anchor that is not there`);
      }
    }
  }

  if (!new RegExp(`<html[^>]*\\slang="(${LOCALES.join("|")})"`).test(html)) {
    problems.push(`${page}: no language of the site`);
  }
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${page}: no title`);
  if (!/<meta name="description" content="[^"]+"/.test(html))
    problems.push(`${page}: no description`);
  const h1 = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1 !== 1) problems.push(`${page}: ${h1} h1 headings, and a page has one`);
  if (!/<meta name="viewport" content="width=device-width, initial-scale=1"/.test(html)) {
    problems.push(`${page}: no viewport for a phone`);
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(
  `the site holds: ${pages.length} pages, no script, nothing from elsewhere, no dead link`,
);
