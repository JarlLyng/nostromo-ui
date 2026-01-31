import React, { useState, useEffect } from 'react';

export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            setProgress(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-1 bg-primary z-[9999] transition-all duration-100 ease-out shadow-[0_0_10px_rgba(var(--color-primary-500),0.5)]"
            style={{ width: `${progress}%` }}
        />
    );
}
