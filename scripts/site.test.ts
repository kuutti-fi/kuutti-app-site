import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_LOCALE, isLocale, LOCALES, pathOf } from "../src/i18n/locales.ts";
import { formatDate, LANGUAGE_IN, t, UI } from "../src/i18n/ui.ts";
import { SITE } from "../src/site.ts";

test("the default language has no prefix, another has its own, and every path ends with a slash", () => {
  assert.equal(pathOf(DEFAULT_LOCALE, ""), "/");
  assert.equal(pathOf(DEFAULT_LOCALE, "legal/privacy"), "/legal/privacy/");
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    assert.equal(pathOf(locale, ""), `/${locale}/`);
    assert.equal(pathOf(locale, "about"), `/${locale}/about/`);
  }
});

test("a language is one of the site's and nothing else", () => {
  for (const locale of LOCALES) assert.equal(isLocale(locale), true);
  for (const other of ["", "EN", "en-FI", "fi", "sv", "de", "legal"]) {
    assert.equal(isLocale(other), false);
  }
});

test("every language has every one of the site's words, and no other", () => {
  const keys = Object.keys(UI.en).sort();
  for (const locale of LOCALES) {
    assert.deepEqual(Object.keys(UI[locale]).sort(), keys, locale);
    for (const [key, text] of Object.entries(UI[locale])) {
      assert.notEqual(text.trim(), "", `${locale} ${key}`);
    }
  }
});

test("a translation names the same values as the English", () => {
  const names = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
  for (const locale of LOCALES) {
    for (const [key, text] of Object.entries(UI[locale])) {
      assert.deepEqual(names(text), names(UI.en[key as keyof typeof UI.en]), `${locale} ${key}`);
    }
  }
});

test("values are put into the text, and a value that is missing is left to be seen", () => {
  assert.equal(t("en", "doc.version", { version: "2026-09" }), "Version 2026-09");
  assert.equal(t("en", "doc.version"), "Version {version}");
});

test("dates are written as Finland writes them", () => {
  const day = new Date("2026-09-25T00:00:00Z");
  assert.equal(formatDate("en", day), "25 September 2026");
});

test("each language names each language", () => {
  for (const reader of LOCALES) {
    for (const text of LOCALES) assert.notEqual(LANGUAGE_IN[reader][text], "");
  }
});

test("every channel of the association is an https address with a mark the footer draws", () => {
  for (const channel of SITE.social) {
    assert.match(channel.href, /^https:\/\//);
    assert.ok(["linkedin", "github"].includes(channel.mark));
  }
});

test("the home page says what the placeholder said, and the footer is one line", () => {
  assert.equal(t("en", "home.soon"), "Coming soon...");
  assert.equal(
    t("en", "footer.line", { businessId: SITE.businessId }),
    "Kuutti ry, Espoo, Finland. Business ID 3659478-7.",
  );
});
