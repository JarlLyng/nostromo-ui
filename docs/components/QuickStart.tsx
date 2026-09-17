"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function QuickStart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 animate-pulse bg-muted/5 rounded-3xl mb-32" />
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto space-y-32 mb-32 px-4"
      suppressHydrationWarning
    >
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Ready to launch?
            </h2>
            <p className="text-muted-foreground text-xl max-w-xl">
              Get started with Nostromo UI in less than 2 minutes. Unified
              package, simple installation.
            </p>
          </div>
          <Link
            href="/getting-started"
            className="flex items-center gap-2 text-primary font-bold text-lg hover:underline underline-offset-8"
          >
            Read Full Setup Guide
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-full"></div>
              <h4 className="text-sm font-bold text-primary uppercase tracking-widest pl-4">
                Step 1: Installation
              </h4>
            </div>
            <div className="nx-code-block">
              <div className="nx-code-block-header">
                <span className="font-mono text-xs text-muted-foreground">
                  Terminal
                </span>
              </div>
              {/*
               * Fixed light-on-dark, not `text-foreground`.
               * The surface is deliberately dark whatever the
               * theme, and `text-foreground` follows the theme -
               * so in light mode this was rgb(23,23,23) on
               * rgb(10,10,10), a contrast ratio of 1.1:1. The
               * install command was invisible on the page whose
               * own claim is WCAG AA.
               */}
              <pre className="overflow-x-auto bg-neutral-950 p-6">
                <code className="font-mono text-sm leading-relaxed text-neutral-100">
                  <span className="text-neutral-400">$ </span>pnpm add
                  @jarllyng/nostromo
                </code>
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary/40 rounded-full"></div>
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-4">
                Step 2: Initialize Theme
              </h4>
            </div>
            <div className="nx-code-block">
              <div className="nx-code-block-header">
                <span className="font-mono text-xs text-muted-foreground">
                  app/layout.tsx
                </span>
              </div>
              <pre className="overflow-x-auto bg-neutral-950 p-6">
                <code className="font-mono text-sm leading-relaxed text-neutral-100">
                  <span className="italic text-violet-300">import</span>{" "}
                  "@jarllyng/nostromo/tailwind.css";
                  <br />
                  <span className="italic text-violet-300">import</span>{" "}
                  "@jarllyng/nostromo/themes/nostromo.css";
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
