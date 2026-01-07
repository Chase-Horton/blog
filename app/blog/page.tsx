import path from "node:path";
import fs from "node:fs";
import type { Metadata } from "next";
import { BlogContent } from "@/components/blog-content";

export const metadata: Metadata = {
    title: "Blog",
    description: "Thoughts on programming, technology, and more.",
};

interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    tag: string;
    isPublished: boolean;
}

async function getPosts(): Promise<PostMeta[]> {
    const files = fs.readdirSync(path.join("content", "posts"));
    
    const posts = await Promise.all(
        files
            .filter((filename) => filename.endsWith(".mdx"))
            .map(async (filename) => {
                const slug = filename.replace(".mdx", "");
                const { frontmatter } = await import(`@/content/posts/${slug}.mdx`);
                return {
                    slug,
                    title: frontmatter.title,
                    description: frontmatter.description,
                    date: frontmatter.date,
                    tag: frontmatter.tag,
                    isPublished: frontmatter.isPublished ?? true,
                };
            })
    );

    return posts
        .filter((post) => post.isPublished)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen">
            <BlogContent posts={posts} />
        </div>
    );
}
