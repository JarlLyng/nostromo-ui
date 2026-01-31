import React, { useState, useEffect } from 'react';
import { Button as NostromoButton } from '@jarllyng/nostromo';
import { Card as NostromoCard } from '@jarllyng/nostromo';
import { Badge as NostromoBadge } from '@jarllyng/nostromo';
import { Input as NostromoInput } from '@jarllyng/nostromo';

// Type bypass for React version mismatch in docs
const Button = NostromoButton as any;
const Card = NostromoCard as any;
const Badge = NostromoBadge as any;
const Input = NostromoInput as any;

const themes = [
    { id: 'nostromo', name: 'Nostromo', color: 'bg-[#8B5CF6]' },
    { id: 'mother', name: 'Mother', color: 'bg-[#F97316]' },
    { id: 'lv-426', name: 'LV-426', color: 'bg-[#10B981]' },
    { id: 'sulaco', name: 'Sulaco', color: 'bg-[#64748B]' }
];

export function ThemeShowcase() {
    const [activeTheme, setActiveTheme] = useState('nostromo');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

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
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">One Library. <br /><span className="text-primary italic">Infinite Identities.</span></h2>
                    <p className="text-muted-foreground text-lg max-w-md">
                        Instantly transform your entire interface with our predefined theme system.
                        All components react automatically to the global theme context.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setActiveTheme(t.id)}
                                className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${activeTheme === t.id
                                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20 scale-105'
                                    : 'border-border bg-background hover:border-primary/50'
                                    }`}
                            >
                                <span className={`w-3 h-3 rounded-full ${t.color} ${activeTheme === t.id ? 'animate-pulse' : ''}`}></span>
                                <span className={`text-sm font-semibold transition-colors ${activeTheme === t.id ? 'text-primary' : 'text-muted-foreground'}`}>{t.name}</span>
                                {activeTheme === t.id && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full max-w-md" data-theme={activeTheme}>
                    <div className="nx-card glass-panel shadow-2xl space-y-6 transition-all duration-500 animate-float translate-y-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">N</div>
                                <span className="font-bold text-foreground">Preview Component</span>
                            </div>
                            <Badge variant="outline" className="animate-pulse">Live Preview</Badge>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Authentication</label>
                                <Input placeholder="Enter access token..." className="bg-background/50 border-border/50" />
                            </div>

                            <div className="flex gap-2">
                                <Button variant="default" className="flex-1">Deploy Component</Button>
                                <Button variant="outline" className="px-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                </Button>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground font-medium">
                            <span>System: Nostromo-OS v1.0</span>
                            <span className="text-primary italic">Status: Stable</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
