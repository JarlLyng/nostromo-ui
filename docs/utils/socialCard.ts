import type { Metadata } from "next";

import { siteUrl } from "./siteUrl";

/**
 * The parts of the share card that are the same on every page.
 *
 * They live here rather than only on the root layout because Next does not
 * deep-merge `openGraph` or `twitter`. A page that sets `openGraph.title` gets
 * an `openGraph` of exactly `{ title }`, and the layout's image, site name and
 * type are dropped - along with `twitter.card`, which falls back to `summary`.
 * Measured on the built export: setting per-page titles took `og:image` off all
 * 64 pages at once, with nothing in the build to say so.
 *
 * So the layout and the page route both spread these, and each adds only the
 * title it owns.
 */
const IMAGE = {
  url: siteUrl("/og-image.png"),
  width: 1280,
  height: 640,
  alt: "Nostromo UI. An accessible React component library with CSS-first Tailwind v4 theming, showing its four themes.",
};

const DESCRIPTION =
  "Accessible React component library with CSS-first Tailwind v4 theming.";

export const openGraphBase = {
  type: "website",
  siteName: "Nostromo UI",
  url: siteUrl("/"),
  description: DESCRIPTION,
  images: [IMAGE],
} satisfies Metadata["openGraph"];

export const twitterBase = {
  // `summary` shows a small square thumbnail; the card is 2:1 and is the
  // point, so it gets the large variant.
  card: "summary_large_image",
  description: DESCRIPTION,
  images: [IMAGE.url],
} satisfies Metadata["twitter"];
