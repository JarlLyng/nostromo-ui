import React, { useState, useEffect } from 'react';

export function Features() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-32 mb-32 px-4" suppressHydrationWarning>
            {/* Feature Bento Grid */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Engineered for Excellence</h2>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Nostromo UI isn't just a library; it's a foundation for building scalable, high-fidelity web applications.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4 h-[auto] md:h-[600px]">
                    <div className="md:col-span-8 nx-card glass-panel flex flex-col justify-end p-8 group overflow-hidden relative">
                        <div className="absolute top-8 right-8 text-primary/20 group-hover:text-primary/40 transition-colors">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 relative z-10">Production-Grade Performance</h3>
                        <p className="text-muted-foreground text-lg relative z-10">Optimized for Next.js, featuring tree-shaking, minimal runtime overhead, and bundle size monitoring built into the CI.</p>
                    </div>

                    <div className="md:col-span-4 nx-card bg-primary text-primary-foreground p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-xl">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Blazing Fast</h3>
                            <p className="text-primary-foreground/80 leading-snug">Zero runtime CSS strategy. Built on Tailwind v4 for the fastest styling experience in the ecosystem.</p>
                        </div>
                    </div>

                    <div className="md:col-span-4 nx-card bg-muted/30 p-8 flex flex-col justify-center border-border/50">
                        <div className="text-4xl font-black text-foreground mb-4 tabular-nums">1089+</div>
                        <h3 className="text-xl font-bold mb-1">Total Tests Passing</h3>
                        <p className="text-muted-foreground text-sm">Every push is validated for logic, design, and accessibility regressions.</p>
                    </div>

                    <div className="md:col-span-8 nx-card group p-8 flex flex-col md:flex-row items-center gap-8 border-border hover:border-primary/50 transition-colors">
                        <div className="flex-1 space-y-4">
                            <h3 className="text-3xl font-bold tracking-tight">WCAG 2.1 AA Compliant</h3>
                            <p className="text-muted-foreground text-lg italic">"Accessibility is not an afterthought, it's the core."</p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold border border-success/20">Aria Patterns</span>
                                <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold border border-success/20">Focus Management</span>
                            </div>
                        </div>
                        <div className="hidden md:block w-32 h-32 bg-primary/5 rounded-full border border-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-16 h-16 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
