import React, { useState, useEffect } from 'react';

export function FooterAccent() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="py-24 border-t border-border bg-muted/20" suppressHydrationWarning>
            <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
                <div className="text-6xl font-black opacity-10 select-none uppercase tracking-[0.5em]">
                    Nostromo
                </div>
                <p className="text-muted-foreground">
                    MIT © 2025 Nostromo UI Group. Engineered for the deep space of digital
                    interfaces.
                </p>
            </div>
        </div>
    );
}
