"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isSolidNav, setIsSolidNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSolidNav(window.scrollY > window.innerHeight * 0.5);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-50">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-out ${
          isSolidNav
            ? "border-white/10 bg-[#121926]/85 backdrop-blur-xl shadow-[0_14px_40px_rgba(18,25,38,0.38)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          className={`max-w-7xl mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 ease-out ${
            isSolidNav ? "py-5" : "py-3"
          }`}
        >
          <Link
            href="/"
            className={`text-lg font-semibold tracking-tight transition-all duration-300 ${
              isSolidNav ? "text-white" : "text-white/90"
            }`}
          >
            FromaSharp
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/3dprinting", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
            ].map((item) => (
              
            ))}
            <Link
              href="/services"
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                isSolidNav
                  ? "border-[#ff6726] bg-[#ff6726] text-[#121926] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,103,38,0.35)]"
                  : "border-white/40 bg-white/10 text-white hover:border-[#ff6726] hover:bg-[#ff6726]/90 hover:text-[#121926]"
              }`}
            >
              Get Started
            </Link>
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

