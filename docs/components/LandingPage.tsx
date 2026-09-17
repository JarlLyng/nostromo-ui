"use client";

import React from "react";
import Link from "next/link";
import { Hero } from "@jarllyng/nostromo/components/marketing/hero";
import { Features } from "@jarllyng/nostromo/components/marketing/features";
import { Button } from "@jarllyng/nostromo/components/core/button";

import { QuickStart } from "./QuickStart";
import { ThemeShowcase } from "./ThemeShowcase";

/**
 * The home page.
 *
 * Three things were wrong with the previous version and all three are the same
 * mistake: the page described the library rather than showing it.
 *
 * It rendered inside the documentation article, so a hero built for a full
 * viewport sat in an 832px column down the middle of a 1900px screen. The
 * content chrome above it - breadcrumb, table of contents, "Copy page" - is for
 * reading reference material and read as clutter on a landing page. Both are
 * fixed in content/_meta.ts, which gives this route `layout: "full"` and turns
 * that chrome off.
 *
 * It asked for `/hero-bg.jpg`, which has never existed in public/ and returned
 * 404 on every visit. The gradient below replaces it: no request, no asset to
 * keep, and it follows the active theme instead of being a fixed photograph.
 *
 * And where the theme switcher was promised, it rendered a dashed box reading
 * "Interactive Theme Switcher Implementation...". The component it needed was
 * sitting finished and unmounted in the same directory.
 */
const FEATURES = [
  {
    id: "foundations",
    title: "Built on Radix",
    description:
      "Focus management, keyboard behaviour and ARIA come from primitives that already solve them, not from a component that reimplements them.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    id: "theming",
    title: "Four themes, no rebuild",
    description:
      "Tokens are bridged into Tailwind with @theme inline, so the var() stays in the utility. Changing [data-theme] recolours the page at runtime.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 115.656-5.656l1.172 1.172z"
        />
      </svg>
    ),
  },
  {
    id: "tested",
    title: "Tested where it counts",
    description:
      "Unit and accessibility tests in jsdom, and a Playwright suite in Chromium and WebKit for the layout, cascade and pointer behaviour jsdom cannot answer.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export function LandingPage() {
  return (
    <div className="nostromo-landing">
      {/*
       * The hero is the one band that reaches the edges of the content area.
       * `nostromo-bleed` cancels the article's own padding so the gradient runs
       * to the sidebar rather than stopping short of it with a visible margin.
       */}
      <div className="nostromo-bleed nostromo-hero-surface">
        <Hero
          title="Engineering the Next Frontier of UI"
          subtitle="An accessible React component library with CSS-first Tailwind v4 theming, four themes that switch at runtime, and every documented example type-checked against the published types."
          size="xl"
          className="bg-transparent"
          cta={
            <>
              <Button size="xl" asChild>
                <Link href="/getting-started">Get started</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/components">Browse components</Link>
              </Button>
            </>
          }
        />
      </div>

      <Features
        title="Built for professionals"
        subtitle="Every component is built for performance, accessibility and an industrial aesthetic."
        features={FEATURES}
        columns={3}
      />

      <section className="mx-auto max-w-6xl px-4">
        <ThemeShowcase />
      </section>

      <QuickStart />
    </div>
  );
}
