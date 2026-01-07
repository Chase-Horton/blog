import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chase Horton's Blog",
  description: "A blog about programming, technology, and stuff I find interesting.",
};

// layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background h-screen flex flex-col selection:bg-blue-500/30">
        
        {/* Navbar: Removed max-w, added explicit padding to match page */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-8 md:px-12 w-full">
            <div className="flex items-center gap-8">
              <a href="/" className="text-xl font-bold tracking-tight">Home</a>
              
              <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                <a href="/blog" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Blog
                </a>
                <a href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Projects
                </a>
                <a href="/links" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  Links
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main: Added h-screen so it fills the view completely */}
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}