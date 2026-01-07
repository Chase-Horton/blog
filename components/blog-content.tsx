"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    tag: string;
}

interface BlogContentProps {
    posts: PostMeta[];
}

export function BlogContent({ posts }: BlogContentProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="mx-auto max-w-2xl px-6 pb-16 pt-32">
            {/* Intro section */}
            {/*<div className="mb-16">
                <h1 
                    className="text-3xl font-bold tracking-tight mb-4 transition-all duration-500"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(10px)",
                    }}
                >
                    Blog
                </h1>
                <p 
                    className="text-muted-foreground transition-all duration-500"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(10px)",
                        transitionDelay: "50ms",
                    }}
                >
                    Writing about programming, tools, and things I find interesting.
                </p>
            </div>*/}

            {/* Posts list */}
            <div className="space-y-6">
                {posts.map((post, index) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block group transition-all duration-500"
                        style={{
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? "translateY(0)" : "translateY(10px)",
                            transitionDelay: `${(index + 2) * 50}ms`,
                        }}
                    >
                        <article className="p-4 -mx-4 rounded-lg transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[#00D9FF] text-xs font-medium uppercase tracking-wider">
                                    {post.tag}
                                </span>
                                <span className="text-muted-foreground text-sm">
                                    {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <h2 className="text-lg font-medium text-foreground group-hover:text-[#00D9FF] transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground text-sm mt-1">
                                {post.description}
                            </p>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
