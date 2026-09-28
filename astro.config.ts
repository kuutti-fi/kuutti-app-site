import { defineConfig } from "astro/config";
import { DEFAULT_LOCALE, LOCALES } from "./src/i18n/locales.ts";

// A static site: every page is a file, nothing runs on a server and nothing
// runs in the browser. The default language has no prefix, any other lives
// under its code; for now there is English only (docs/decisions.md, 8).
export default defineConfig({
  site: "https://kuutti.app",
  output: "static",
  trailingSlash: "always",
  // The stylesheet is a file of its own, never inline: the site's content
  // security policy (customHttp.yml) then needs no exception for styles.
  build: { format: "directory", inlineStylesheets: "never" },
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
