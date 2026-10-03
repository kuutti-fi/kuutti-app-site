/**
 * What the site knows about the association and its channels. A value that is
 * not decided yet is null, and the page says that it is coming: nothing here
 * is a placeholder that looks like the real thing.
 */
export const SITE = {
  /**
   * The association's business ID (Y-tunnus), given by the Finnish Patent and
   * Registration Office when the notice of founding was filed on 01/10/2026.
   */
  businessId: "3659478-7",
  /** Where the app's source is published (AGPL-3.0). */
  appSource: "https://github.com/kuutti-ry/kuutti-app",
  /** Where this site's source is published (AGPL-3.0). */
  siteSource: "https://github.com/kuutti-ry/kuutti-app-site" as string | null,
  /** The address people write to; the domain receives no mail yet. */
  contactEmail: null as string | null,
  /** The association's channels, as full addresses; the footer links to each by its mark. */
  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/145260967/", mark: "linkedin" },
    { name: "GitHub", href: "https://github.com/kuutti-ry", mark: "github" },
  ] as { name: string; href: string; mark: "linkedin" | "github" }[],
  /** The stores; null until the app is published, and the home page says "coming soon". */
  stores: { apple: null as string | null, google: null as string | null },
} as const;
