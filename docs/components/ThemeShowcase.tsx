"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@jarllyng/nostromo/components/core/badge";
import { Button } from "@jarllyng/nostromo/components/core/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@jarllyng/nostromo/components/core/card";
import { Input } from "@jarllyng/nostromo/components/core/input";
import { Label } from "@jarllyng/nostromo/components/core/label";

const themes = [
  { id: "nostromo", name: "Nostromo", color: "bg-[#8B5CF6]" },
  { id: "mother", name: "Mother", color: "bg-[#F97316]" },
  { id: "lv-426", name: "LV-426", color: "bg-[#10B981]" },
  { id: "sulaco", name: "Sulaco", color: "bg-[#64748B]" },
];

export function ThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState("nostromo");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="my-12 py-20 min-h-[400px] flex items-center justify-center border border-border rounded-3xl bg-muted/10 animate-pulse">
        <span className="text-muted-foreground font-medium">
          Initializing Theme Preview...
        </span>
      </div>
    );

  return (
    <div className="my-12 p-8 rounded-3xl border border-border bg-muted/30 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-50 pointer-events-none">
        <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Theme Engine
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            One Library. <br />
            <span className="text-primary italic">Infinite Identities.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Instantly transform your entire interface with our predefined theme
            system. All components react automatically to the global theme
            context.
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  activeTheme === t.id
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20 scale-105"
                    : "border-border bg-background hover:border-primary/50"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${t.color} ${activeTheme === t.id ? "animate-pulse" : ""}`}
                ></span>
                <span
                  className={`text-sm font-semibold transition-colors ${activeTheme === t.id ? "text-primary" : "text-muted-foreground"}`}
                >
                  {t.name}
                </span>
                {activeTheme === t.id && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/*
         * The library's own components, not a drawing of them.
         *
         * This panel used to be hand-written markup with the component
         * classes copied into it - `className="inline-flex items-center
         * ... bg-primary text-primary-foreground h-10 px-4"` where a
         * Button belongs. A copy cannot demonstrate that the theme
         * reaches the components, only that it reaches this file, and it
         * drifts the moment a variant changes. Rendering the real ones
         * means the preview is the claim it is making.
         */}
        <div className="w-full flex-1 md:max-w-md" data-theme={activeTheme}>
          <Card className="shadow-2xl transition-colors duration-500">
            <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                  N
                </span>
                <span className="font-bold text-foreground">Preview</span>
              </span>
              <Badge variant="outline">Live</Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme-preview-token">Access token</Label>
                <Input
                  id="theme-preview-token"
                  readOnly
                  placeholder="Enter access token..."
                />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Deploy component</Button>
                <Button variant="outline" aria-label="Add another">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </Button>
              </div>
            </CardContent>

            <CardFooter className="justify-between text-xs font-medium text-muted-foreground">
              <span>Theme: {activeTheme}</span>
              <span className="text-primary">Status: stable</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
