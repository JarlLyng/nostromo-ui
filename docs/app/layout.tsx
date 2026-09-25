import type { Metadata } from "next";
import Script from "next/script";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
// Read from the package rather than hardcoding. The sidebar said "v1.0.0 Stable"
// and the header said "v2.0" while package.json said something else again.
// Default import, not a named one: JSON modules only reliably expose a default.
import pkg from "@jarllyng/nostromo/package.json";

// Order matters. layers.css declares the cascade layer order and must come
// first, then the library entry registers Tailwind and the @theme bridge, the
// theme file supplies the token values, Nextra's chrome follows, and the docs
// stylesheets layer their own styling on top.
//
// Nextra 2 needed a shim here: it shipped a precompiled Tailwind v3 sheet with
// an *unlayered* preflight, which outranked every layered utility and stripped
// library components of their type scale and borders. Nextra 4 is built on
// Tailwind v4 and declares `@layer theme, base, components, utilities` itself;
// what unlayered CSS remains is scoped to its own `.nextra-*` elements. So the
// shim is gone - see the deleted styles/nextra-layered.css.
import "../styles/layers.css";
import "@jarllyng/nostromo/tailwind.css";
// All four, not just the default. Each theme file scopes its tokens to its own
// `[data-theme="..."]`, so a page that loads one of them can set the attribute to
// any of the other three and nothing happens - the selector matches no rule and
// the tokens stay at nostromo's values. That is what was wrong with the theme
// demos: measured on the theming page, `--nostromo-color-brand-500` resolved to
// `262 84% 52%` under all four values, and the document carried 15 rules for
// nostromo and none at all for the others. The switcher was setting an attribute
// nothing responded to.
//
// They are token declarations, about 40kB uncompressed for the three additions,
// and scoped by attribute so they cannot collide.
import "@jarllyng/nostromo/themes/nostromo.css";
import "@jarllyng/nostromo/themes/mother.css";
import "@jarllyng/nostromo/themes/lv-426.css";
import "@jarllyng/nostromo/themes/sulaco.css";
import "nextra-theme-docs/style.css";
import "../styles/globals.css";
import "../styles/themes.css";

import { ScrollProgress } from "../components/ScrollProgress";
import { ThemeSync } from "../components/ThemeSync";
import { withBasePath } from "../utils/withBasePath";
import { openGraphBase, twitterBase } from "../utils/socialCard";

export const metadata: Metadata = {
  title: {
    default: "Nostromo UI",
    template: "%s – Nostromo UI",
  },
  description:
    "Accessible React component library with CSS-first Tailwind v4 theming.",
  // The card a link to this site produces. It had a title and a description and
  // no image at all, under a `summary` card, which renders as a line of text.
  // The shared fields are in utils/socialCard.ts, because the page route has to
  // repeat them: Next replaces `openGraph` wholesale rather than merging it.
  openGraph: {
    ...openGraphBase,
    title: {
      default: "Nostromo UI",
      template: "%s – Nostromo UI",
    },
  },
  twitter: {
    ...twitterBase,
    title: {
      default: "Nostromo UI",
      template: "%s – Nostromo UI",
    },
  },
  icons: {
    icon: [
      { url: withBasePath("/favicon.ico") },
      {
        url: withBasePath("/favicon-16x16.png"),
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: withBasePath("/favicon-32x32.png"),
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [{ url: withBasePath("/apple-touch-icon.png"), sizes: "180x180" }],
  },
};

/**
 * logo-black.svg and logo-white.svg are 91x15 *wordmarks*, not square marks.
 *
 * They used to be rendered at width 32 / height 32 next to the words "Nostromo
 * UI". Two things went wrong: the aspect ratio squeezed the wordmark to 32x5px,
 * illegible - and since the artwork already spells the name, the name then
 * appeared twice in the corner. Rendered at its own ratio now, and the duplicate
 * text is gone.
 */
const LOGO_HEIGHT = 18;
const LOGO_WIDTH = Math.round((91 / 15) * LOGO_HEIGHT);

const navbar = (
  <Navbar
    logo={
      <span className="flex items-center gap-2">
        <img
          src={withBasePath("/logo-black.svg")}
          alt="Nostromo UI"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="dark:hidden"
        />
        <img
          src={withBasePath("/logo-white.svg")}
          alt="Nostromo UI"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="hidden dark:block"
        />
        <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-success">
          v{pkg.version}
        </span>
      </span>
    }
    projectLink="https://github.com/JarlLyng/nostromo-ui"
    chatLink="https://github.com/JarlLyng/nostromo-ui/discussions"
  />
);

const footer = (
  <Footer className="flex-col items-center gap-4 text-center">
    {/* Same wordmark, so no repeated text label here either. */}
    <span className="flex items-center gap-2 opacity-50 grayscale transition-all duration-500 hover:grayscale-0">
      <img
        src={withBasePath("/logo-white.svg")}
        alt="Nostromo UI"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="hidden dark:block"
      />
      <img
        src={withBasePath("/logo-black.svg")}
        alt="Nostromo UI"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="block dark:hidden"
      />
    </span>
    <p className="text-sm">
      MIT licensed. Engineered for the deep space of digital interfaces.
    </p>
  </Footer>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // data-color-scheme is the server-rendered default; ThemeSync corrects it to
  // match next-themes once the class is on the element.
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="nostromo"
      data-color-scheme="light"
      suppressHydrationWarning
    >
      <Head />
      <body>
        <ScrollProgress />
        <ThemeSync />
        <Script
          src="https://umami-iamjarl.vercel.app/script.js"
          data-website-id="f4f9ada2-3819-4174-8018-2b99801b39b4"
          strategy="afterInteractive"
        />
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/JarlLyng/nostromo-ui/tree/main/docs"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ backToTop: true }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
