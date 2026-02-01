import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
const {
    Button,
    Card,
    Input,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Separator,
    Badge
} = require('@jarllyng/nostromo') as any;
import { withBasePath } from '../utils/withBasePath';

interface DocsLayoutProps {
    children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const isLandingPage = router.pathname === '/';

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            {/* Premium Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                        <img src={withBasePath('/logo-white.svg')} alt="Logo" width={32} height={32} className="hidden dark:block" />
                        <img src={withBasePath('/logo-black.svg')} alt="Logo" width={32} height={32} className="block dark:hidden" />
                        <span className="font-bold text-xl tracking-tighter">NOSTROMO</span>
                        <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">v2.0</Badge>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                            <Link href="/getting-started" className="hover:text-primary transition-colors">Setup</Link>
                            <Link href="/components" className="hover:text-primary transition-colors">Components</Link>
                            <Link href="/theming" className="hover:text-primary transition-colors">Themes</Link>
                        </nav>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <a href="https://github.com/JarlLyng/nostromo-ui" target="_blank" rel="noreferrer">
                                    <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
                                </a>
                            </Button>
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 flex gap-8">
                {/* Custom Sidebar for Docs pages */}
                {!isLandingPage && (
                    <aside className="hidden md:block w-72 pt-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
                        <div className="space-y-8 pb-20">
                            {/* Getting Started Section */}
                            <div className="space-y-3">
                                <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Getting Started</h4>
                                <div className="grid gap-0.5">
                                    <Link href="/getting-started" className={`px-3 py-2 text-sm rounded-lg transition-all ${router.pathname === '/getting-started' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}>
                                        Setup Guide
                                    </Link>
                                    <Link href="/theming" className={`px-3 py-2 text-sm rounded-lg transition-all ${router.pathname === '/theming' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}>
                                        Theming System
                                    </Link>
                                </div>
                            </div>

                            <Separator className="opacity-50 mx-3" />

                            {/* Components Section */}
                            <div className="space-y-6">
                                <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Components</h4>
                                <Accordion type="multiple" defaultValue={['core', 'forms', 'data', 'feedback', 'overlay', 'marketing']} className="w-full">
                                    <AccordionItem value="core" className="border-none">
                                        <AccordionTrigger className="px-3 text-[11px] font-bold uppercase text-foreground/70 hover:no-underline py-2">Core UI</AccordionTrigger>
                                        <AccordionContent className="pb-2">
                                            <div className="grid gap-0.5 pl-2 pt-1 border-l border-border/50 ml-4">
                                                <Link href="/components/button" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/button' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Button</Link>
                                                <Link href="/components/badge" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/badge' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Badge</Link>
                                                <Link href="/components/card" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/card' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Card</Link>
                                                <Link href="/components/separator" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/separator' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Separator</Link>
                                                <Link href="/components/skeleton" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/skeleton' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Skeleton</Link>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="forms" className="border-none">
                                        <AccordionTrigger className="px-3 text-[11px] font-bold uppercase text-foreground/70 hover:no-underline py-2">Forms & Inputs</AccordionTrigger>
                                        <AccordionContent className="pb-2">
                                            <div className="grid gap-0.5 pl-2 pt-1 border-l border-border/50 ml-4">
                                                <Link href="/components/input" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/input' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Input</Link>
                                                <Link href="/components/textarea" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/textarea' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Textarea</Link>
                                                <Link href="/components/select" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/select' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Select</Link>
                                                <Link href="/components/checkbox" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/checkbox' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Checkbox</Link>
                                                <Link href="/components/switch" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/switch' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Switch</Link>
                                                <Link href="/components/radio-group" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/radio-group' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Radio Group</Link>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="data" className="border-none">
                                        <AccordionTrigger className="px-3 text-[11px] font-bold uppercase text-foreground/70 hover:no-underline py-2">Data Display</AccordionTrigger>
                                        <AccordionContent className="pb-2">
                                            <div className="grid gap-0.5 pl-2 pt-1 border-l border-border/50 ml-4">
                                                <Link href="/components/table" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/table' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Table</Link>
                                                <Link href="/components/data-table" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/data-table' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Data Table</Link>
                                                <Link href="/components/charts" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/charts' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Charts</Link>
                                                <Link href="/components/calendar" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/calendar' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Calendar</Link>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="overlay" className="border-none">
                                        <AccordionTrigger className="px-3 text-[11px] font-bold uppercase text-foreground/70 hover:no-underline py-2">Overlay & Feedback</AccordionTrigger>
                                        <AccordionContent className="pb-2">
                                            <div className="grid gap-0.5 pl-2 pt-1 border-l border-border/50 ml-4">
                                                <Link href="/components/dialog" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/dialog' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Dialog</Link>
                                                <Link href="/components/popover" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/popover' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Popover</Link>
                                                <Link href="/components/tooltip" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/tooltip' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Tooltip</Link>
                                                <Link href="/components/toast" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/toast' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Toast</Link>
                                                <Link href="/components/alert" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/alert' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Alert</Link>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="marketing" className="border-none">
                                        <AccordionTrigger className="px-3 text-[11px] font-bold uppercase text-foreground/70 hover:no-underline py-2">Marketing</AccordionTrigger>
                                        <AccordionContent className="pb-2">
                                            <div className="grid gap-0.5 pl-2 pt-1 border-l border-border/50 ml-4">
                                                <Link href="/components/hero" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/hero' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Hero</Link>
                                                <Link href="/components/features" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/features' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Features</Link>
                                                <Link href="/components/gallery" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/gallery' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Gallery</Link>
                                                <Link href="/components/pricing" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/pricing' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Pricing</Link>
                                                <Link href="/components/logo-wall" className={`px-3 py-1.5 text-sm rounded-md transition-all ${router.pathname === '/components/logo-wall' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Logo Wall</Link>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main className={`flex-1 pt-8 pb-24 ${isLandingPage ? 'max-w-6xl mx-auto' : ''}`}>
                    {children}
                </main>
            </div>

            {/* Premium Footer */}
            <footer className="border-t border-border/50 bg-muted/30 py-12">
                <div className="container mx-auto px-4 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src={withBasePath('/logo-white.svg')} alt="Logo" width={24} height={24} className="hidden dark:block" />
                        <img src={withBasePath('/logo-black.svg')} alt="Logo" width={24} height={24} className="block dark:hidden" />
                        <span className="font-bold tracking-tighter">NOSTROMO UI</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        MIT © 2025 Nostromo UI Group. Engineered for the deep space of digital interfaces.
                    </p>
                </div>
            </footer>
        </div>
    );
}
