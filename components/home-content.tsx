// page.tsx
"use client";

import { useEffect, useState } from "react";

export function HomeContent() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const letters = ["h", "i", "."];
    
    return (
        <div className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden">
            
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 z-10">
                {mounted && (
                    <div className="max-w-xl">
                        <h2 
                            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground animate-blur-in"
                            style={{ animationDelay: "1200ms" }}
                        >
                            I'm <span className="text-blue-400">Chase</span>.
                        </h2>
                        
                        <p 
                            className="text-xl text-muted-foreground leading-relaxed animate-blur-in"
                            style={{ animationDelay: "1400ms" }}
                        >
                            A software engineer passionate about building useful tools and sharing information.
                        </p>

                        {/* TODO: Add a CTA button here later */}
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 right-0 p-0 md:pr-4 flex items-end justify-end select-none pointer-events-none opacity-80 mix-blend-overlay md:mix-blend-normal mb-10">
                <h1 className="text-[35vw] md:text-[25vw] font-bold tracking-tighter leading-[0.8] flex text-foreground/10">
                    {letters.map((letter, index) => {
                        const reverseIndex = letters.length - 1 - index;
                        return (
                            <span
                                key={index}
                                className={`${index === letters.length - 1 ? "text-blue-500/90" : ""} inline-block transition-all duration-1000 cubic-bezier(0.25, 0.46, 0.45, 0.94)`}
                                style={{
                                    transform: mounted ? "translateY(0)" : "translateY(100%)",
                                    transitionDelay: `${reverseIndex * 150}ms`,
                                }}
                            >
                                {letter}
                            </span>
                        );
                    })}
                </h1>
            </div>
        </div>
    );
}