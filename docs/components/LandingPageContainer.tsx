import React, { useState, useEffect } from 'react';

interface LandingPageContainerProps {
    children: React.ReactNode;
}

export function LandingPageContainer({ children }: LandingPageContainerProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="landing-page-wrapper" suppressHydrationWarning>
            {/* 
                We always render children to maintain structural consistency. 
                Individual components inside have their own hydration guards.
            */}
            {children}
        </div>
    );
}
