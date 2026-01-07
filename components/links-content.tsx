"use client";

import { useEffect, useState } from "react";

interface Link {
    title: string;
    url: string;
    description?: string;
    subtitle?: string;
}

interface Section {
    title: string;
    links: Link[];
}

const sections: Section[] = [
    {
        title: "free books",
        links: [
            {
                title: "Digital Computer Electronics",
                url: "https://ia800809.us.archive.org/34/items/367026792DigitalComputerElectronicsAlbertPaulMalvinoAndJeraldABrownPdf1/367026792-Digital-Computer-Electronics-Albert-Paul-Malvino-and-Jerald-A-Brown-pdf%20%281%29.pdf",
                description: "One of favorite books. Covers the fundamentals of digital logic design and computer architecture."
            },
            {
                title: "Structure and Interpretation of Computer Programs",
                url: "https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html",
                description: "The classic computer science book from MIT."
            },
        ],
    },
    //{
        //title: "paid Books",
        //links: [
            //{
                //title: "The Mythical Man Month",
                //url: "https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959",
            //}
        //]
    //},
    {
        title: "Fonts",
        links: [
            { title: "Monocraft", url: "https://github.com/IdreesInc/Monocraft" },
            { title: "Berkeley Mono", url: "https://berkeleygraphics.com/typefaces/berkeley-mono/" },
            { title: "JetBrains Mono", url: "https://www.jetbrains.com/lp/mono/" },
            { title: "Inter", url: "https://rsms.me/inter/" },
        ],
    },
    {
        title: "Reference",
        links: [
            {
                title: "Refactoring Guru - Design Patterns",
                url: "https://refactoring.guru/",
                description: "A comprehensive resource for learning about design patterns and best practices in software development."
            },
            {
                title: "Time Complexity Cheat Sheet",
                url: "https://www.bigocheatsheet.com/",
                description: "A handy reference for the time and space complexity of common algorithms and data structures."
            }
        ],
    },
    {
        title: "Interesting Websites",
        links: [
            { 
                title: "Hacker News",
                url: "https://news.ycombinator.com/",
                description: "A social network link-sharing website focusing on computer science and entrepreneurship."
            },
            {
                title: "DevDocs",
                url: "https://devdocs.io/",
                description: "An extensive collection of API documentation for various programming languages and frameworks, all accessible in one place."
            },
            { 
                title: "Dan Luu's Blog",
                url: "https://danluu.com/",
                description: "An interesting blog with technical articles on systems and programming."},
        ],
    },
    {
        title: "Articles",
        links: [
            {
                title: "Reflections on Trusting Trust",
                url: "https://dl.acm.org/doi/10.1145/358198.358210",
                description: "A classic paper by Ken Thompson on compiler backdoors",
            },
            {
                title: "Sigvobik",
                url: "https://www.sigvobik.org/",
                description: "A site that publishes yearly journals of humurous, usually interesting programming research papers.",
            }
        ],
    },
    {
        title: "Fun",
        links: [
            {
                title: "Radio Garden",
                url: "http://radio.garden/",
                description: "Listen to live radio stations around the world by rotating a 3D globe.",
            },
            { 
                title: "Zoo.js",
                url: "https://zoo.js.org/",
                description: "A collection of JavaScript engine benchmarks."
            },
            //{
                //title: "KiwiSDR",
                //url: "http://kiwisdr.com/.public/",
                //description: "Listen to shortwave radio from around the world via the browser.",
            //},
        ],
    }
];

export function LinksContent() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    let itemIndex = 0;

    return (
        <div className="mx-auto max-w-2xl px-6 pb-16 pt-32">
            {sections.map((section, sectionIdx) => {
                const sectionDelay = itemIndex;
                itemIndex++; // for the header
                
                return (
                    <section key={section.title} className="mb-12">
                        <h2 
                            className="mb-4 text-sm font-medium uppercase tracking-wider text-[#00D9FF] transition-all duration-500"
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(10px)",
                                transitionDelay: `${sectionDelay * 50}ms`,
                            }}
                        >
                            {section.title}
                        </h2>
                        <ul className="space-y-2">
                            {section.links.map((link) => {
                                const delay = itemIndex * 50;
                                itemIndex++;
                                
                                return (
                                    <li 
                                        key={link.url} 
                                        className="text-muted-foreground transition-all duration-500 group relative hover:z-20"
                                        style={{
                                            opacity: mounted ? 1 : 0,
                                            transform: mounted ? "translateY(0)" : "translateY(10px)",
                                            transitionDelay: `${delay}ms`,
                                        }}
                                    >
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-foreground hover:text-[#00D9FF] transition-colors"
                                        >
                                            {link.title}
                                        </a>
                                        {link.subtitle && (
                                            <span className="ml-2 text-xs font-medium uppercase tracking-wide text-[#00D9FF]/80 bg-[#00D9FF]/10 px-2 py-0.5 rounded-full">{link.subtitle}</span>
                                        )}
                                        {link.description && (
                                            <div className="absolute left-0 opacity-0 top-full z-50 pt-1 pointer-events-none -translate-y-1.25 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                                                <div className="bg-secondary px-3 py-2 rounded-lg shadow-lg border border-white/10">
                                                    <p className="text-neutral-300 text-sm">
                                                        {link.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
}
