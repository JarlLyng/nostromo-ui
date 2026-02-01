import React from 'react';
import Link from 'next/link';
import { withBasePath } from '../utils/withBasePath';
import * as NostromoImport from '@jarllyng/nostromo';
const {
    Hero,
    Features,
    Button,
    Badge,
    Card
} = NostromoImport as any;

export function LandingPage() {
    return (
        <div className="space-y-24 pb-20">
            {/* Premium Hero */}
            <Hero
                title="Engineering the Next Frontier of UI"
                subtitle="A high-performance design system and component library built for React, inspired by the precision and industrial aesthetic of deep space exploration."
                size="xl"
                backgroundImage={withBasePath('/hero-bg.jpg')} // We'll generate this or use a gradient
                overlay={true}
                cta={
                    <>
                        <Button size="xl" asChild>
                            <Link href="/getting-started">Initialize Protocol</Link>
                        </Button>
                        <Button variant="outline" size="xl" asChild>
                            <Link href="/components">Explore Components</Link>
                        </Button>
                    </>
                }
            />

            {/* Feature Grid */}
            <div className="container mx-auto px-4">
                <Features
                    title="Built for Professionals"
                    subtitle="Every component is crafted with performance, accessibility, and industrial-grade aesthetics in mind."
                    features={[
                        {
                            id: '1',
                            title: 'Atomic Precision',
                            description: 'Component architecture built on solid foundations of Radix UI and Tailwind CSS.',
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        },
                        {
                            id: '2',
                            title: 'Multi-Theme Support',
                            description: 'Four distinct themes including Nostromo, Mother, LV-426, and Sulaco.',
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 115.656-5.656l1.172 1.172z" /></svg>
                        },
                        {
                            id: '3',
                            title: 'Performance First',
                            description: 'Zero-runtime CSS with Tailwind and highly optimized React components.',
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        }
                    ]}
                    columns={3}
                />
            </div>

            {/* Design Showcase */}
            <div className="container mx-auto px-4 py-20 bg-muted/20 rounded-[3rem] border border-border/50">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <Badge variant="outline" className="px-4 py-1">Interactive Showcase</Badge>
                    <h2 className="text-4xl font-bold tracking-tighter">Experience the Themes</h2>
                    <p className="text-muted-foreground text-lg">
                        Switch between four high-fidelity themes instantly. Built-in support for dark mode, glassmorphism, and industrial-grade contrast.
                    </p>

                    {/* We'll use our existing ThemeShowcase component here but style it better */}
                    <div className="mt-12 p-8 bg-background rounded-2xl border border-border shadow-2xl">
                        {/* Interactive theme demo will go here */}
                        <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center border border-dashed border-border">
                            <span className="text-muted-foreground">Interactive Theme Switcher Implementation...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
