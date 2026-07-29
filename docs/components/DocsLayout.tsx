import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withBasePath } from '../utils/withBasePath';

/**
 * Wrapper around the Nextra page.
 *
 * This used to render its own header and sidebar as well, which produced two of
 * each on every docs page - two logos, two hamburgers, and a version badge drawn
 * on top of the GitHub icon on narrow screens. Nextra already provides that
 * chrome, and provides it better: its sidebar is generated from `_meta.json`
 * rather than a hand-maintained list that drifts as pages are added, and its
 * navbar is where the search box lives.
 *
 * So the chrome is Nextra's. What is left here is the page frame and the footer,
 * which Nextra does not supply.
 */
interface DocsLayoutProps {
    children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const isLandingPage = router.pathname === '/';

    return (
        <div className="bg-background text-foreground font-sans selection:bg-primary/30">
            <main className={isLandingPage ? 'max-w-6xl mx-auto pb-24' : 'pb-24'}>
                {children}
            </main>

            <footer className="border-t border-border/50 bg-muted/30 py-12">
                <div className="container mx-auto px-4 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src={withBasePath('/logo-white.svg')} alt="" width={24} height={24} className="hidden dark:block" />
                        <img src={withBasePath('/logo-black.svg')} alt="" width={24} height={24} className="block dark:hidden" />
                        <span className="font-bold tracking-tighter">NOSTROMO UI</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        MIT licensed. Engineered for the deep space of digital interfaces.
                    </p>
                </div>
            </footer>
        </div>
    );
}
