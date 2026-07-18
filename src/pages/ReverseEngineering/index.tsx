import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  Box,
  Boxes,
  Check,
  ChevronDown,
  FileText,
  Scan,
  Wrench,
} from "lucide-react";
import { DotPattern } from "@/components/ui/DotPatternProps";
import { ReverseShowcase } from "@/components/ui/reverse-showcase";
import { cn } from "@/lib/utils";
import { quotePageUrl } from "@/lib/quoteForm";
import ExtraBadges from "@/components/ExtraBadges";
import { prepareSafariVideo, trySafariPlay } from "@/lib/safariVideo";

type CapabilityItem = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  colSpan: 2 | 3;
  icon: LucideIcon;
};

const CAPABILITIES: CapabilityItem[] = [
  {
    tag: "Measurement",
    title: "Part Measurement and Geometry Capture",
    description:
      "We collect the dimensions and feature details required to reconstruct the component accurately. This process may involve direct measurement, visual inspection, and comparison against mating parts or assemblies.",
    bullets: [
      "Direct measurement",
      "Visual inspection",
      "Mating part comparison",
      "Critical feature capture",
    ],
    colSpan: 2,
    icon: Scan,
  },
  {
    tag: "CAD",
    title: "3D CAD Reconstruction",
    description:
      "Captured geometry is translated into clean, editable CAD models rather than static mesh files. This allows the design to be revised, analyzed, and reused in future development.",
    bullets: [
      "Editable parametric models",
      "Reusable for analysis",
      "Future-ready for revisions",
      "Clean solid geometry",
    ],
    colSpan: 2,
    icon: Box,
  },
  {
    tag: "Drawings",
    title: "Technical Drawings",
    description:
      "We prepare manufacturing drawings that document dimensions, tolerances, and specifications needed to reproduce the part.",
    bullets: [
      "Dimensions and tolerances",
      "Material specifications",
      "Production-ready details",
      "Revision tracking",
    ],
    colSpan: 2,
    icon: FileText,
  },
  {
    tag: "Assemblies",
    title: "Assembly Reconstruction",
    description:
      "When multiple components work together, we can rebuild complete assemblies to preserve fit and functional relationships.",
    bullets: [
      "Component-level fits",
      "Functional relationships",
      "Mating and clearance",
      "Full assembly context",
    ],
    colSpan: 2,
    icon: Boxes,
  },
  {
    tag: "Updates",
    title: "Design Updates and Improvements",
    description:
      "Reverse-engineered models can be modified to strengthen weak areas, simplify production, or incorporate new requirements.",
    bullets: [
      "Strengthen critical features",
      "Simplify manufacturing",
      "Incorporate new requirements",
      "Resolve known issues",
    ],
    colSpan: 2,
    icon: Wrench,
  },
  {
    tag: "Documentation",
    title: "Legacy Documentation Creation",
    description:
      "Recovered design data is organized into a structured engineering package that supports long-term maintenance and product management.",
    bullets: [
      "Structured engineering package",
      "Maintenance-ready records",
      "Long-term product management",
      "Consistent file structure",
    ],
    colSpan: 2,
    icon: Archive,
  },
];

type WhoWeWorkWithItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

// TODO: swap per-industry image
const CARD_IMAGE_PLACEHOLDER =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/ecommerce-engi.jpg";

const WHO_WE_WORK_WITH: WhoWeWorkWithItem[] = [
  {
    title: "Manufacturing and Production Equipment",
    description:
      "Recover design data for worn or obsolete components used in critical machinery.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/6indus-scaled.jpg",
    imageAlt: "Manufacturing and production equipment reverse engineering context",
  },
  {
    title: "Industrial Maintenance",
    description:
      "Create replacement parts when supplier documentation is unavailable.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/premium_photo-1710962439403-a35fbc684b15.jpeg",
    imageAlt: "Industrial maintenance and replacement part context",
  },
  {
    title: "Product Redesign Projects",
    description:
      "Digitize existing components to support updates, performance improvements, and cost reduction.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Product redesign engineering context",
  },
  {
    title: "Quality and Inspection Support",
    description:
      "Compare current parts to reconstructed CAD geometry to identify deviations.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/3med-scaled.jpg",
    imageAlt: "Quality and inspection engineering context",
  },
  {
    title: "Legacy Product Documentation",
    description:
      "Build organized engineering records for products developed before modern CAD workflows.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/randd.jpg",
    imageAlt: "Legacy product documentation engineering context",
  },
];

type ProcessStep = {
  title: string;
  description: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Part Review and Project Planning",
    description:
      "We assess the component, discuss project objectives, and determine the level of detail required.",
  },
  {
    title: "Measurement and Data Collection",
    description: "Critical dimensions, features, and interfaces are recorded.",
  },
  {
    title: "CAD Reconstruction",
    description: "The part is rebuilt as a fully editable 3D model.",
  },
  {
    title: "Validation and Comparison",
    description:
      "The CAD model is checked against the original part to confirm accuracy.",
  },
  {
    title: "Documentation Preparation",
    description: "Technical drawings and supporting files are created as needed.",
  },
  {
    title: "Delivery and Optional Design Updates",
    description:
      "Final files are delivered and can be revised further if design improvements are required.",
  },
];

const RELATED_SERVICES = [
  "CAD Services",
  "Product Design",
  "Mechanical Engineering & Simulation",
  "Prototyping & 3D Printing",
  "Design for Manufacturing",
];

/** Solid slate at the bottom of the scrim, short fade to transparent at the top of the scrim element. */
const WHO_WE_CARD_SCRIM =
  "bg-[linear-gradient(to_top,#242c37_0%,#242c37_60%,transparent_100%)]";

const HERO_IMAGE_REAL =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/real.jpg"
const HERO_IMAGE_SCAN =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/scan.jpg";

/** Same 800ms + easing on every capability card surface and text node. */
const CAPABILITY_MOTION =
  "duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function ReverseEngineering() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [accordionOpenIndex, setAccordionOpenIndex] = useState<number | null>(
    null
  );
  const highlightedIndex = hoveredIndex ?? activeIndex;

  const featureVideoRef = useRef<HTMLVideoElement>(null);
  const featureVideoWrapRef = useRef<HTMLDivElement>(null);
  const featureVideoPlayedRef = useRef(false);
  const heroHoverRef = useRef(false);
  const [heroScanOpacity, setHeroScanOpacity] = useState(0);

  useEffect(() => {
    const wrap = featureVideoWrapRef.current;
    const video = featureVideoRef.current;
    if (!wrap || !video) return;

    prepareSafariVideo(video);

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const threshold = isMobile ? 1 : 0.5;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= threshold &&
          !featureVideoPlayedRef.current
        ) {
          featureVideoPlayedRef.current = true;
          trySafariPlay(video);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollProgress = () => {
      if (heroHoverRef.current) return;
      const vh = window.innerHeight || 1;
      const progress = Math.min(Math.max(window.scrollY / (vh * 0.85), 0), 1);
      setHeroScanOpacity(progress);
    };

    scrollProgress();
    window.addEventListener("scroll", scrollProgress, { passive: true });
    window.addEventListener("resize", scrollProgress);
    return () => {
      window.removeEventListener("scroll", scrollProgress);
      window.removeEventListener("resize", scrollProgress);
    };
  }, []);

  const handleHeroMouseEnter = () => {
    heroHoverRef.current = true;
    setHeroScanOpacity(1);
  };

  const handleHeroMouseLeave = () => {
    heroHoverRef.current = false;
    const vh = window.innerHeight || 1;
    setHeroScanOpacity(Math.min(Math.max(window.scrollY / (vh * 0.85), 0), 1));
  };

  return (
    <div>

    {/* HERO — dual trees: mobile gradient + media; desktop exact */}
    <div className="relative isolate overflow-hidden bg-[#121926]">
      {/* Mobile hero */}
      <div className="relative z-10 flex min-h-[100svh] flex-col bg-[linear-gradient(to_bottom_right,#121926,#01628a)] md:hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start gap-5 px-6 pb-4 pt-36 text-left">
          <div>
            <h4 className="!mb-0 !text-[0.6875rem] !font-medium !uppercase !tracking-[0.14em] !text-white/90">
              REVERSE ENGINEERING{" "}
              <span className="text-[#ff6726]">SERVICES</span>
            </h4>
            <h1 className="max-w-3xl !text-[2rem] !leading-[1.1] font-bold text-white pt-4">
              Rebuild{" "}
              <span className="text-[#ff6726]">Accurate CAD Models</span> from
              Existing Parts
            </h1>
            <h3 className="max-w-2xl !text-[1.125rem] text-white/80">
              Not every component comes with a complete set of design files.
              When original drawings are missing, outdated, or never created,
              reverse engineering provides a reliable way to recover the
              technical data needed to reproduce and improve a part.
            </h3>
            <div className="mt-6 flex w-full flex-col items-stretch gap-3">
              <Link
                href={quotePageUrl("reverse-engineering")}
                className="button-primary inline-block w-full text-center"
              >
                Start Your Reverse Engineering Project
              </Link>
              <Link
                href="/contact"
                className="button-secondary inline-block w-full text-center"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
        <div className="relative mt-8 aspect-video w-full overflow-hidden bg-[#121926]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 h-full w-full origin-[75%_50%] -translate-x-[12%] scale-[2.1] object-cover"
            src={HERO_IMAGE_REAL}
            alt=""
            aria-hidden
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 h-full w-full origin-[75%_50%] -translate-x-[12%] scale-[2.1] object-cover transition-opacity duration-[900ms] ease-in-out"
            src={HERO_IMAGE_SCAN}
            alt=""
            style={{ opacity: heroScanOpacity }}
            aria-hidden
          />
        </div>
        <div className="relative z-10 mt-auto shrink-0 p-0">
          <ExtraBadges className="[&>div]:!mt-0" />
        </div>
      </div>

      {/* Desktop hero — exact current markup */}
      <div
        className="relative hidden min-h-[100vh] overflow-hidden bg-[#121926] md:block"
        onMouseEnter={handleHeroMouseEnter}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          src={HERO_IMAGE_REAL}
          alt=""
          fetchPriority="high"
          aria-hidden
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 z-[1] h-full w-full object-cover object-center transition-opacity duration-[900ms] ease-in-out"
          src={HERO_IMAGE_SCAN}
          alt=""
          style={{ opacity: heroScanOpacity }}
          aria-hidden
        />
        {/* Light scrim for hero copy readability */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top_right,rgba(18,25,38,0.15)_25%,rgba(18,25,38,0.10)_50%,rgba(18,25,38,0.05)_75%,transparent_90%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto !pt-[25vh] flex flex-row items-center justify-start max-w-7xl flex-col gap-6 px-4 py-8 md:py-16 lg:py-24">
          <div>
              <h4>REVERSE ENGINEERING <span className="text-[#ff6726]">SERVICES</span></h4>
              <h1 className="max-w-3xl !text-6xl !leading-none font-bold text-white pt-5">
              Rebuild <span className="text-[#ff6726]">Accurate CAD Models</span> from Existing Parts
              </h1>
              <h3 className="max-w-2xl text-lg text-white/80">
              Not every component comes with a complete set of design files. When original drawings are missing, outdated, or never created, reverse engineering provides a reliable way to recover the technical data needed to reproduce and improve a part.
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href={quotePageUrl("reverse-engineering")} className="button-primary inline-block">
              Start Your Reverse Engineering Project
              </Link>
              <Link href="/contact" className="button-secondary inline-block">Request a Consultation</Link>
              </div>
          </div>
        </div>
        <div className="relative z-10 pb-6">
          <ExtraBadges/>
        </div>
      </div>
    </div>


   


    {/* S3 — WHAT WE DELIVER (centered intro variation) */}
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-32">
      <div className="flex flex-col justify-center text-center text-black/90">
        <h2 className="mx-auto max-w-3xl max-md:!text-[1.875rem] max-md:!leading-[1.15]">
          Digital Engineering Data{" "}
          <span className="text-[#ff6726]">
            Reconstructed from Physical Components
          </span>
        </h2>
        <p className="mx-auto max-w-3xl max-md:!text-[1.125rem]">
          Reverse engineering is the process of capturing the dimensions,
          features, and relationships of an existing part and rebuilding them as
          accurate digital models.
        </p>

        <p className="mx-auto max-w-3xl max-md:!text-[1.125rem]">
          Whether you have a worn component, a supplier sample, or an assembled
          product, we can convert physical hardware into usable design
          documentation.
        </p>
      </div>
    </div>


    {/* S4 — CAPABILITIES — mobile accordion; desktop exact hover cards */}
    <section
      id="capabilities"
      className="border-y border-black/5 bg-stone-50 py-24 md:py-32 !mb-[-17vh] md:!mb-[-35vh]"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 max-w-3xl md:mb-16 ">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-black max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl">
            Every detail you need
            <br />
            to reproduce a part.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 max-md:!text-[1.125rem] md:text-lg">
            From measurement and CAD reconstruction to legacy documentation, FormaSharp covers the full reverse engineering workflow.
          </p>
        </div>

        {/* Mobile: accordion with icons */}
        <div className="flex flex-col border-t border-black/10 md:hidden">
          {CAPABILITIES.map((item, index) => {
            const isOpen = accordionOpenIndex === index;
            const Icon = item.icon;
            return (
              <div key={item.title} className="border-b border-black/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setAccordionOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center gap-3 py-4 text-left"
                >
                  <Icon
                    strokeWidth={1.5}
                    className="size-6 shrink-0 text-[#ff6726]"
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "min-w-0 flex-1 text-base font-semibold leading-snug",
                      isOpen ? "text-[#ff6726]" : "text-black"
                    )}
                  >
                    {item.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-black/50 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 pl-9 pr-1">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
                        {item.tag}
                      </div>
                      <p className="mt-2 !mb-0 !text-[1.125rem] leading-relaxed !text-black/70">
                        {item.description}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {item.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-[#ff6726]"
                              strokeWidth={2.5}
                              aria-hidden
                            />
                            <span className="text-sm leading-relaxed text-black/80">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={quotePageUrl("reverse-engineering")}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff6726]"
                      >
                        Discuss this capability
                        <ArrowRight className="size-3.5" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: exact hover card grid */}
        <div className="hidden grid-cols-1 gap-4 md:grid md:grid-cols-6 md:gap-5">
          {CAPABILITIES.map((item, index) => {
            const isOrange = index === highlightedIndex;
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={cn(
                  "relative flex min-h-[220px] flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl border p-0 shadow-sm md:min-h-[240px] md:p-0",
                  item.colSpan === 2 ? "md:col-span-2" : "md:col-span-3",
                  "transition-[border-color]",
                  CAPABILITY_MOTION,
                  isOrange ? "border-[#ff6726]" : "border-black/5"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom_right,#121926_0%,#01628a_100%)]"
                  aria-hidden
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-[#ff6726] transition-opacity will-change-[opacity]",
                    CAPABILITY_MOTION,
                    isOrange ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden
                />
                <div className="relative z-10 flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex min-h-0 flex-1 flex-row gap-4">
                    <div className="min-w-0 flex-1">
                      <div
                        className={cn(
                          "mb-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                          CAPABILITY_MOTION,
                          isOrange ? "text-white/80" : "text-orange-500/50"
                        )}
                      >
                        {item.tag}
                      </div>
                      <div
                        className={cn(
                          "text-xl font-bold text-white transition-colors",
                          CAPABILITY_MOTION
                        )}
                      >
                        {item.title}
                      </div>
                      <p
                        className={cn(
                          "mt-3 !text-sm transition-colors md:text-[0.9375rem]",
                          CAPABILITY_MOTION,
                          isOrange ? "!text-white/95" : "!text-white/80"
                        )}
                      >
                        {item.description}
                      </p>
                      <ul
                        className={cn(
                          "mt-5 list-disc space-y-2 pl-5 text-sm text-white transition-colors",
                          CAPABILITY_MOTION,
                          isOrange
                            ? "marker:text-white/70"
                            : "marker:text-[#ff6726]"
                        )}
                      >
                        {item.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className="pointer-events-none flex shrink-0 flex-col justify-end self-stretch pb-0.5"
                      aria-hidden
                    >
                      <Icon
                        strokeWidth={1}
                        className={cn(
                          "size-9 text-white/15 transition-colors md:size-10",
                          CAPABILITY_MOTION,
                          isOrange ? "text-white/18" : "text-white/10"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    {/* Feature video — half overlaps Process section below */}
    <div className="relative z-20 mx-auto h-[34vh] max-w-7xl translate-y-[17vh] px-6 md:h-[70vh] md:translate-y-[35vh]">
      <div
        ref={featureVideoWrapRef}
        className="h-full w-full overflow-hidden rounded-2xl bg-black"
      >
        <video
          ref={featureVideoRef}
          className="h-full w-full object-cover"
          src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/refinal.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>


    {/* S5 — PROCESS (3-col numbered grid on dark gradient) */}
    <section className="relative z-10 bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl pt-[17vh] md:pt-[35vh]">
        <div className="mb-12 max-w-3xl md:mb-16">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Our Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl">
            A <span className="text-[#ff6726]">Methodical Approach</span> to Recovering Design Information
          </h2>
          <p className="mt-4 text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
            Our reverse engineering workflow is designed to produce reliable CAD models and documentation from existing hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-7"
            >
              <div className="text-5xl font-bold text-[#ff6726]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 !text-xl !font-bold text-white">
                {step.title}
              </h3>
              <p className="!text-base !font-light !text-white/80 max-md:!text-[1.125rem]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* S6 — APPLICATIONS & INDUSTRIES (image cards, Simulation pattern) */}
    <section
      aria-labelledby="re-industries-heading"
      className="bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-24 md:py-32 "
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Applications & Industries
          </div>
          <h2
            id="re-industries-heading"
            className="text-3xl font-bold tracking-tight text-white max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl"
          >
            Reverse Engineering for Maintenance, Product Development, and <span className="text-[#ff6726]">Modernization</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
            Reverse engineering is valuable whenever physical components must be reproduced, documented, or improved.
          </p>
        </div>

        <div
          className={cn(
            "-mx-6 flex gap-4 overflow-x-auto px-6 pb-2",
            "md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0",
            "lg:grid-cols-3 xl:grid-cols-5"
          )}
        >
          {WHO_WE_WORK_WITH.map((item) => (
            <article
              key={item.title}
              className="group relative flex min-h-[280px] w-[min(72vw,280px)] shrink-0 flex-col justify-end overflow-hidden rounded-2xl md:w-auto md:min-h-[300px]"
            >
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                className="pointer-events-none absolute inset-0 size-full object-cover"
                loading="lazy"
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 h-[45%] opacity-60 transition-[height,opacity] group-hover:h-[67%] group-hover:opacity-100",
                  CAPABILITY_MOTION,
                  WHO_WE_CARD_SCRIM
                )}
                aria-hidden
              />
              <div className="relative z-10 flex flex-col justify-end p-5 md:p-6">
                <h4 className="translate-y-[1.6em] font-bold !text-lg text-white">{item.title}</h4>
                <p
                  className={cn(
                    "max-h-0 overflow-hidden opacity-0 transition-all group-hover:mt-1 group-hover:max-h-28 group-hover:opacity-100",
                    CAPABILITY_MOTION,
                    "translate-y-[1.6em] !text-sm md:text-[0.9375rem] !text-white/80"
                  )}
                >
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>


    <ReverseShowcase />

    {/* S8 — RELATED SERVICES (chip row) */}
    <section className="bg-stone-50 border-y border-black/5 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
          Related Services
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-black max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-3xl">
          Reverse engineering is commonly combined with:
        </h2>
        <p className="mt-4 text-base leading-relaxed text-black/70 max-md:!text-[1.125rem] md:text-lg">
          These services help transform existing parts into improved and production-ready designs.
        </p>
        <div className="mx-auto mt-8 flex max-w-4xl flex-row flex-wrap items-center justify-center gap-3">
          {RELATED_SERVICES.map((service) => (
            <span
              key={service}
              className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm font-medium text-black/80 backdrop-blur-sm"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>


    {/* S9 — FINAL CTA */}
    <DotPattern className="bg-black/95">
      <div
        id="cta"
        className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32"
      >
        <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
          Get Started
        </div>
        <h1 className="!text-6xl !leading-none font-bold text-white max-md:!text-[2rem] max-md:!leading-[1.1]">
          Recover the <span className="italic text-[#ff6726]">Design Data</span> You Need to Move Forward
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
          Whether you need to reproduce an obsolete part, document a legacy component, or build on an existing design, FormaSharp can convert physical hardware into accurate CAD models and technical drawings.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
          Tell us about the component, assembly, or equipment you need to recreate, and our team will recommend the most effective approach.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 max-md:w-full max-md:items-stretch max-md:gap-3 sm:flex-row">
          <Link
            href={quotePageUrl("reverse-engineering")}
            className="button-primary inline-block max-md:w-full max-md:text-center"
          >
            Start Your Reverse Engineering Project
          </Link>
          <Link
            href="/contact"
            className="button-secondary inline-block max-md:w-full max-md:text-center"
          >
            Request a Consultation
          </Link>
        </div>
        <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
          Measurement · CAD Reconstruction · Drawings · Assemblies · Legacy Documentation
        </div>
      </div>
    </DotPattern>

    </div>


  );
}

export default ReverseEngineering;
