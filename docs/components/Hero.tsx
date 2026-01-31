import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { track } from '../lib/analytics';

export function Hero() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Placeholder to match SSR structure but avoid complex DOM until client-side hydration
    if (!isMounted) {
        return (
            <div className="mb-24 min-h-[400px] flex items-center justify-center rounded-[2.5rem] border border-border/50 bg-background/50 backdrop-blur-3xl p-12 animate-pulse">
                <div className="space-y-4 text-center">
                    <div className="h-12 w-64 bg-muted rounded-xl mx-auto opacity-50"></div>
                    <div className="h-6 w-96 bg-muted rounded-lg mx-auto opacity-30"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-24" suppressHydrationWarning>
            {/* Hero Section with high-fidelity glassmorphism and mesh gradients */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-background/50 backdrop-blur-3xl p-12 md:p-16 lg:p-24 shadow-2xl">
                {/* Animated Mesh Background Layer */}
                <div className="absolute inset-0 mesh-background opacity-40"></div>

                <div className="relative z-10 max-w-5xl">
                    <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold animate-float">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Project Status: v1.0.0 Stable Release
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                        <span className="bg-gradient-to-br from-foreground via-foreground/90 to-muted-foreground/60 bg-clip-text text-transparent">Nostromo</span>
                        <br />
                        <span className="italic text-primary">UI</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-3xl leading-snug font-medium tracking-tight">
                        A high-performance component architecture for <span className="text-foreground">React</span> and <span className="text-foreground">Tailwind CSS</span>.
                        Engineered for speed, accessibility, and absolute design consistency.
                    </p>

                    <div className="flex flex-wrap gap-5">
                        <Link
                            href="/getting-started"
                            onClick={() => track("cta_get_started", { placement: "hero" })}
                            className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/95 transition-all shadow-[0_20px_40px_-15px_rgba(var(--color-primary-500),0.3)] hover:scale-[1.02] active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10">Start Building</span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
                        </Link>
                        <a
                            href="/components"
                            onClick={() => track("cta_components", { placement: "hero" })}
                            className="group px-10 py-5 bg-background border-2 border-border hover:border-primary/50 text-foreground rounded-2xl font-bold text-lg transition-all hover:bg-muted/50 shadow-md flex items-center gap-3"
                        >
                            Open Components
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </div>

                {/* Floating accent elements */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <div className="absolute top-1/2 -left-20 w-40 h-40 bg-info/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
