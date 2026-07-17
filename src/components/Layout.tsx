"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ExitIntentPopup, { openContactPopup } from "@/components/ExitIntentPopup";
import Footer from "@/components/Footer";

type LayoutProps = {
  children: ReactNode;
};

type NavChild = { href: string; label: string; description?: string };

type NavItem = {
  href: string;
  label: string;
  menuHeading?: string;
  children?: NavChild[];
};

const SERVICE_LINKS: NavChild[] = [
  {
    href: "/Simulation",
    label: "Mechanical Engineering & Simulation",
    description: "Thermal analysis for engineering decisions.",
  },
  {
    href: "/ProductDesign",
    label: "Product Design",
    description: "Concept to production-ready engineered products.",
  },
  {
    href: "/IndustrialDesign",
    label: "Industrial Design",
    description: "User-centered form, ergonomics, and visual product development.",
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

const RESOURCE_LINKS: NavChild[] = [
  { href: "/blog", label: "Blog" },
  { href: "/patent-ip", label: "Patent & IP" },
];

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    menuHeading: "Engineering Services",
    children: SERVICE_LINKS,
  },
  {
    href: "#",
    label: "Resources",
    menuHeading: "Resources",
    children: RESOURCE_LINKS,
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LOGO_TRANSPARENT =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/formasharp-logo-dark.png";
const LOGO_SOLID =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/formasharp-logo.webp";

export default function Layout({ children }: LayoutProps) {
  const [isSolidNav, setIsSolidNav] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsSolidNav(window.scrollY > window.innerHeight * 0.5);
      setShowMobileCta(window.scrollY > window.innerHeight * 0.6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileMenu(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-50">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white transition-all duration-500 ease-out ${
          isSolidNav
            ? "md:border-black/10 md:bg-white/90 md:backdrop-blur-xl md:shadow-[0_14px_40px_rgba(18,25,38,0.12)]"
            : "md:border-transparent md:bg-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-3 transition-all duration-500 ease-out md:px-8 ${
            isSolidNav ? "md:py-6" : "md:py-4"
          }`}
        >
          <Link
            href="/"
            aria-label="FormaSharp — home"
            onClick={closeMobileMenu}
            className={`flex items-center transition-opacity duration-300 ${
              isSolidNav ? "opacity-100" : "opacity-95 hover:opacity-100"
            }`}
          >
            <img
              src={LOGO_SOLID}
              alt="FormaSharp"
              className="h-10 w-auto md:hidden"
            />
            <img
              src={isSolidNav ? LOGO_SOLID : LOGO_TRANSPARENT}
              alt=""
              className={`hidden w-auto transition-all duration-500 ease-out md:block ${
                isSolidNav ? "h-[2.8rem] md:h-[3.2rem]" : "h-[3.2rem] md:h-[3.6rem]"
              }`}
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 text-base font-medium md:flex md:gap-8">
            {NAV_ITEMS.map((item) => {
              const triggerClasses = `relative inline-flex items-center gap-1 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#ff6726] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                isSolidNav
                  ? "text-neutral-700 hover:text-neutral-950"
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
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    className={`${triggerClasses} cursor-pointer bg-transparent border-0 p-0 font-inherit`}
                  >
                    {item.label}
                    <ChevronDown
                      className="size-4 transition-transform duration-300 group-hover/nav:rotate-180"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </button>

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
                      {item.menuHeading ?? item.label}
                    </div>
                    <ul className="flex flex-col py-1">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          {child.href === "#" ? (
                            <span
                              role="menuitem"
                              className="flex flex-col gap-0.5 rounded-xl px-3 py-3 text-[0.9375rem] font-semibold leading-snug text-white/70"
                            >
                              {child.label}
                            </span>
                          ) : (
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
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
            <Link
              href="/request-a-quote"
              className={`relative inline-flex items-center gap-1 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#ff6726] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                isSolidNav
                  ? "text-neutral-700 hover:text-neutral-950"
                  : "text-white/85 hover:text-white"
              }`}
            >
              Request a Quote
            </Link>
            <button
              type="button"
              onClick={openContactPopup}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                isSolidNav
                  ? "border-[#ff6726] bg-[#ff6726] text-[#121926] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,103,38,0.35)]"
                  : "border-white/40 bg-white/10 text-white hover:border-[#ff6726] hover:bg-[#ff6726]/90 hover:text-[#121926]"
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="px-2 py-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#121926]"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center bg-transparent text-[#121926]"
            >
              {isMobileMenuOpen ? (
                <X className="size-6" strokeWidth={2} aria-hidden />
              ) : (
                <Menu className="size-6" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-navigation"
          className={`absolute inset-x-0 top-full h-[calc(100dvh-68px)] overflow-y-auto bg-white transition-all duration-300 md:hidden ${
            isMobileMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0"
          }`}
        >
          <div className="flex min-h-full flex-col px-5 pb-8 pt-5 text-[#121926]">
            <div className="border-t border-black/15">
              {NAV_ITEMS.map((item) => {
                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex min-h-16 items-center border-b border-black/15 py-4 text-2xl font-semibold leading-none"
                      style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isOpen = openMobileMenu === item.label;
                return (
                  <div key={item.label} className="border-b border-black/15">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileMenu(isOpen ? null : item.label)
                      }
                      aria-expanded={isOpen}
                      className="flex min-h-16 w-full items-center justify-between py-4 text-left text-2xl font-semibold leading-none"
                      style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-6 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-5">
                          <Link
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="block py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#ff6726]"
                          >
                            Explore all {item.label}
                          </Link>
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={closeMobileMenu}
                              className="block border-t border-black/10 py-3 text-base font-medium"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openContactPopup();
                }}
                className="flex w-full items-center justify-center bg-[#ff6726] px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#121926]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
      {showMobileCta && (
        <Link
          href="/contact#book-consultation"
          className="fixed bottom-5 right-5 z-40 rounded-full bg-[#ff6726] px-6 py-4 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-transform active:scale-95 md:hidden"
        >
          Book a consultation
        </Link>
      )}
      <ExitIntentPopup />
    </div>
  );
}

