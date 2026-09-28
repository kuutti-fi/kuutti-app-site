/**
 * What the site knows about the association and its channels. A value that is
 * not decided yet is null, and the page says that it is coming: nothing here
 * is a placeholder that looks like the real thing.
 */
export const SITE = {
  /** Where the app's source is published (AGPL-3.0). */
  appSource: "https://github.com/kuutti-fi/kuutti-app",
  /** Where this site's source is published (AGPL-3.0). */
  siteSource: "https://github.com/kuutti-fi/kuutti-app-site" as string | null,
  /** The address people write to; the domain receives no mail yet. */
  contactEmail: null as string | null,
  /** The association's channels, as full addresses; none is open yet. */
  social: [] as { name: string; href: string }[],
  /** The stores; null until the app is published, and the home page says "coming soon". */
  stores: { apple: null as string | null, google: null as string | null },
} as const;
