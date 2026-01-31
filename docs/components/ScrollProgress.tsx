import React, { useState, useEffect } from 'react';

export function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / (documentHeight || 1)) * 100;
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            id="scroll-progress"
            className="fixed top-0 left-0 h-1 bg-primary z-[9999] transition-all duration-100 ease-out shadow-[0_0_10px_rgba(var(--color-primary-500),0.5)]"
            style={{
                width: `${isMounted ? progress : 0}%`,
                opacity: isMounted ? 1 : 0,
                visibility: isMounted ? 'visible' : 'hidden'
            }}
            aria-hidden="true"
            suppressHydrationWarning
        />
    );
}
