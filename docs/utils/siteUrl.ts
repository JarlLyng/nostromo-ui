import { withBasePath } from "./withBasePath";

/**
 * Where this site is served from.
 *
 * GitHub Pages serves it under a path, `/nostromo-ui`, and that matters here in
 * a way it does not for an `<img>`: Open Graph and Twitter card images have to
 * be absolute URLs, because the crawler that fetches them has no page to
 * resolve a relative one against.
 *
 * The obvious shortcut is Next's `metadataBase` with a relative image path, and
 * it is a trap when the site lives under a path. Measured rather than assumed:
 *
 *   new URL("/og-image.png", "https://host/nostromo-ui")  -> https://host/og-image.png
 *   new URL("og-image.png",  "https://host/nostromo-ui")  -> https://host/og-image.png
 *   new URL("og-image.png",  "https://host/nostromo-ui/") -> https://host/nostromo-ui/og-image.png
 *
 * Two of the three silently drop the base path and point the crawler at a 404,
 * which nothing in a build or a test would notice: the page renders fine and
 * only the card is blank. So the absolute URL is built here instead.
 */
const DEFAULT_ORIGIN = "https://jarllyng.github.io";

export function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/+$/, "") ?? DEFAULT_ORIGIN
  );
}

/** An absolute URL for a path inside the site, base path included. */
export function siteUrl(path: string): string {
  return `${siteOrigin()}${withBasePath(path)}`;
}
