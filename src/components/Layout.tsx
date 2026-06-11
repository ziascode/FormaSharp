"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ExitIntentPopup from "@/components/ExitIntentPopup";

type LayoutProps = {
  children: ReactNode;
};

type NavChild = { href: string; label: string; description?: string };

type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

const SERVICE_LINKS: NavChild[] = [
  {
    href: "/Simulation",
    label: "Mechanical Engineering & Simulation",
    description: "FEA, CFD, and thermal analysis for engineering decisions.",
  },
  {
    href: "/ProductDesign",
    label: "Product Design",
    description: "Concept to production-ready engineered products.",
  },
  {
    href: "/DesignForManufacturing",
    label: "Design for Manufacturing (DFM)",
    description: "Optimize designs for efficient, cost-effective production.",
  },
  {
    href: "/CADServices",
    label: "CAD Services",
    description: "Precision 3D models, assemblies, and technical drawings.",
  },
  {
    href: "/ReverseEngineering",
    label: "Reverse Engineering",
    description: "Rebuild accurate CAD models from existing physical parts.",
  },
  {
    href: "/3dprinting",
    label: "Prototyping & 3D Printing",
    description: "High-resolution prototypes on engineering-grade materials.",
  },
];

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", children: SERVICE_LINKS },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
          className={`max-w-7xl mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8 transition-all duration-500 ease-out ${
            isSolidNav ? "py-6" : "py-4"
          }`}
        >
          <Link
            href="/"
            aria-label="FormaSharp — home"
            className={`flex items-center transition-opacity duration-300 ${
              isSolidNav ? "opacity-100" : "opacity-95 hover:opacity-100"
            }`}
          >
            <img
              src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/formasharp-logo.webp"
              alt="FormaSharp"
              className={`w-auto transition-all duration-500 ease-out  ${
                isSolidNav ? "h-10 md:h-11" : "h-12 md:h-14"
              }`}
            />
          </Link>
          <div className="flex items-center gap-7 md:gap-8 text-base font-medium">
            {NAV_ITEMS.map((item) => {
              const triggerClasses = `relative inline-flex items-center gap-1 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#ff6726] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                isSolidNav
                  ? "text-white/90 hover:text-white"
                  : "text-white/85 hover:text-white"
              }`;

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={triggerClasses}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="group/nav relative"
                >
                  <Link
                    href={item.href}
                    aria-haspopup="menu"
                    className={triggerClasses}
                  >
                    {item.label}
                    <ChevronDown
                      className="size-4 transition-transform duration-300 group-hover/nav:rotate-180"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </Link>

                  {/* Hover bridge so the dropdown doesn't close as cursor leaves the trigger */}
                  <div
                    className="pointer-events-none invisible absolute left-0 right-0 top-full h-3 group-hover/nav:visible group-hover/nav:pointer-events-auto group-focus-within/nav:visible group-focus-within/nav:pointer-events-auto"
                    aria-hidden
                  />

                  <div
                    role="menu"
                    aria-label={`${item.label} menu`}
                    className="invisible absolute left-1/2 top-full z-50 mt-3 w-[24rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-2xl border border-white/10 bg-[#121926]/95 p-2.5 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200 ease-out group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100"
                  >
                    <div className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6726]">
                      Engineering Services
                    </div>
                    <ul className="flex flex-col py-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            role="menuitem"
                            className="group/item flex flex-col gap-0.5 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
                          >
                            <span className="text-[0.9375rem] font-semibold leading-snug text-white">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="text-sm leading-snug text-white/55">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.href}
                      role="menuitem"
                      className="mt-1 flex items-center justify-between rounded-xl border-t border-white/10 px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#ff6726] transition-colors hover:bg-white/5"
                    >
                      View all services
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  </div>
                </div>
              );
            })}
            <Link
              href="/services"
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
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
      <ExitIntentPopup />
    </div>
  );
}

