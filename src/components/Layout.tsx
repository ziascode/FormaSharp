import Link from "next/link";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            FromaSharp
          </Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-neutral-800 py-8 text-sm text-neutral-400">
        <div className="mx-auto max-w-6xl px-6">
          Footer content coming soon.
        </div>
      </footer>
    </div>
  );
}

