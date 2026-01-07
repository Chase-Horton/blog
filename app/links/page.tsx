import type { Metadata } from "next";
import { LinksContent } from "@/components/links-content";

export const metadata: Metadata = {
    title: "Links",
    description: "A collection of cool links",
};

export default function LinksPage() {
    return (
        <div className="min-h-screen">
            <LinksContent />
        </div>
    );
}
