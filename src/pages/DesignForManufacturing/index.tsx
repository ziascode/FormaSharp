import Link from "next/link";
import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Blocks,
  Check,
  ChevronDown,
  Factory,
  Layers,
  MessageSquareReply,
  PackageSearch,
  RulerDimensionLine,
} from "lucide-react";
import AutoplayVideo from "@/components/AutoplayVideo";
import { DotPattern } from "@/components/ui/DotPatternProps";
import ExtraBadges from "@/components/ExtraBadges";
import { cn } from "@/lib/utils";
import { quotePageUrl } from "@/lib/quoteForm";
import Seo from "@/components/Seo";
import { SERVICE_PAGE_SEO, serviceJsonLd } from "@/lib/schema";

type CapabilityItem = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

const CAPABILITY_CARD_IMAGE =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/dfm3.jpg";

const CAPABILITIES: CapabilityItem[] = [
  {
    tag: "Process",
    title: "Manufacturing Process Review",
    description:
      "We evaluate the selected production method to ensure the design is compatible with its capabilities and limitations.",
    bullets: [
      "CNC machining & sheet metal",
      "Welding, molding, casting",
      "Additive manufacturing",
      "Process fit vs. geometry",
      "Risk identification before tooling",
    ],
    icon: Factory,
  },
  {
    tag: "Tolerances",
    title: "Tolerance Optimization",
    description:
      "Tolerances directly affect cost and production difficulty. We review dimensional requirements and identify where they can be relaxed while maintaining function and fit.",
    bullets: [
      "Dimensional requirement review",
      "Cost vs. precision tradeoffs",
      "Fit and function preserved",
      "Drawing clarity for suppliers",
    ],
    icon: RulerDimensionLine,
  },
  {
    tag: "Assembly",
    title: "Part Count Reduction",
    description:
      "Simplifying assemblies often reduces cost and improves reliability. We assess opportunities to consolidate components and streamline assembly.",
    bullets: [
      "Component consolidation",
      "Fewer fasteners where practical",
      "Simpler assembly sequences",
      "Reliability and serviceability",
    ],
    icon: Layers,
  },
  {
    tag: "Materials",
    title: "Material and Process Selection",
    description:
      "Different materials and production methods offer unique advantages. We help compare options based on performance, availability, lead time, and cost.",
    bullets: [
      "Performance vs. cost balance",
      "Availability and lead time",
      "Process-method pairing",
      "Scalability for volume",
    ],
    icon: PackageSearch,
  },
  {
    tag: "DFM",
    title: "Assembly Design Review",
    description:
      "We examine how parts are aligned, secured, and accessed during assembly to improve efficiency and reduce the chance of errors.",
    bullets: [
      "Alignment and fixturing",
      "Joining and securing strategy",
      "Operator access and ergonomics",
      "Error-proofing opportunities",
    ],
    icon: Blocks,
  },
  {
    tag: "Suppliers",
    title: "Supplier Feedback Integration",
    description:
      "When manufacturers provide comments during quoting or early production, we incorporate those recommendations into updated design files.",
    bullets: [
      "Quote-stage design comments",
      "Early production feedback",
      "CAD and drawing updates",
      "Revision-controlled handoff",
    ],
    icon: MessageSquareReply,
  },
];

type IndustryItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const INDUSTRIES: IndustryItem[] = [
  {
    title: "Consumer Products",
    description:
      "Refine designs for efficient tooling, assembly, and high-volume production.",
    imageSrc:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Consumer product manufacturing and assembly context",
  },
  {
    title: "Industrial Equipment",
    description:
      "Simplify complex components and assemblies to improve fabrication and maintenance.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/6indus-scaled.jpg",
    imageAlt: "Industrial equipment manufacturing context",
  },
  {
    title: "Startup Hardware",
    description:
      "Prepare products for supplier quoting and first production runs with greater confidence.",
    imageSrc:
      "https://images.unsplash.com/photo-1611505908502-5b67e53e3a76?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Startup hardware prototype ready for first production run",
  },
  {
    title: "Custom Tools and Fixtures",
    description:
      "Reduce fabrication complexity while preserving performance requirements.",
    imageSrc:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Custom tooling and fixtures for fabrication",
  },
  {
    title: "Engineering Departments",
    description:
      "Support internal teams with focused manufacturability reviews and implementation.",
    imageSrc:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Engineering team conducting a DFM review",
  },
];

type ProcessStep = {
  title: string;
  description: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Review Product Requirements",
    description:
      "We assess functionality, production goals, and target volumes so recommendations stay aligned with what success looks like on the shop floor.",
  },
  {
    title: "Analyze Geometry and Documentation",
    description:
      "CAD models and drawings are examined for manufacturability concerns — features, tolerances, and details that commonly drive cost or rework.",
  },
  {
    title: "Identify Improvement Opportunities",
    description:
      "We develop recommendations related to tolerances, materials, features, and assembly, prioritized by impact and feasibility.",
  },
  {
    title: "Implement Design Revisions",
    description:
      "Approved changes are incorporated into the CAD model and drawings so the design package reflects the agreed manufacturing strategy.",
  },
  {
    title: "Confirm Production Readiness",
    description:
      "Updated documentation is organized for supplier review and production planning, reducing ambiguity before commitments are made.",
  },
  {
    title: "Support Supplier Coordination",
    description:
      "We can assist with follow-up changes as manufacturing feedback is received, keeping the design responsive through launch.",
  },
];

const RELATED_SERVICES = [
  "Product Design",
  "CAD Services",
  "Prototyping & 3D Printing",
  "Mechanical Engineering & Simulation",
  "Reverse Engineering",
];

const INDUSTRY_CARD_SCRIM =
  "bg-[linear-gradient(to_top,#242c37_0%,#242c37_60%,transparent_100%)]";

const CAPABILITY_MOTION =
  "duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function DesignForManufacturing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [accordionOpenIndex, setAccordionOpenIndex] = useState<number | null>(
    null
  );
  const activeCapability = CAPABILITIES[activeIndex];

  return (
    <>
      <Seo
        title={SERVICE_PAGE_SEO.DesignForManufacturing.title}
        description={SERVICE_PAGE_SEO.DesignForManufacturing.description}
        canonical={SERVICE_PAGE_SEO.DesignForManufacturing.path}
        jsonLd={serviceJsonLd("DesignForManufacturing")}
      />
    <div>
      {/* HERO — dual trees: mobile-only vs exact desktop */}
      <div className="relative overflow-hidden bg-[#121926]">
        <AutoplayVideo
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/dfm1.mp4"
          loop
          preload="metadata"
          aria-hidden
        />

        {/* Mobile hero */}
        <div className="relative z-10 flex min-h-[100svh] flex-col md:hidden">
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[#121926]/70"
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-6 px-6 pb-10 pt-28 text-left">
            <div className="max-w-3xl">
              <h4 className="!mb-0 !text-[0.6875rem] !font-medium !uppercase !tracking-[0.14em] !text-white/90">
                DESIGN FOR MANUFACTURING{" "}
                <span className="text-[#ff6726]">(DFM)</span>
              </h4>
              <h1 className="max-w-3xl !text-[2rem] !leading-[1.1] font-bold text-white pt-5">
                Prepare your product for efficient,{" "}
                <span className="text-[#ff6726]">cost-effective</span>{" "}
                production.
              </h1>
              <div className="mt-8 flex w-full flex-col items-stretch gap-3">
                <Link
                  href={quotePageUrl("dfm")}
                  className="button-primary inline-block w-full text-center"
                >
                  Optimize Your Design for Manufacturing
                </Link>
                <Link
                  href="/contact"
                  className="button-secondary inline-block w-full text-center"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-auto p-0">
            <ExtraBadges className="[&>div]:!mt-0" />
          </div>
        </div>

        {/* Desktop hero — original markup (unchanged) */}
        <div className="relative hidden min-h-[100vh] md:block">
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top_right,rgba(18,25,38,0.97)_0%,rgba(18,25,38,0.78)_22%,rgba(18,25,38,0.48)_45%,rgba(18,25,38,0.2)_68%,transparent_88%,transparent_100%)]"
            aria-hidden
          />
          <div className="relative z-10 flex min-h-[100vh] w-full flex-col items-end justify-end">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-6 px-4 py-12 !pt-[20vh] text-left md:flex-row md:py-16 lg:py-24">
              <div className="max-w-3xl">
                <h4>
                  DESIGN FOR MANUFACTURING{" "}
                  <span className="text-[#ff6726]">(DFM)</span>
                </h4>
                <h1 className="max-w-3xl !text-6xl !leading-none font-bold text-white pt-5">
                  Prepare your product for efficient,{" "}
                  <span className="text-[#ff6726]">cost-effective</span>{" "}
                  production.
                </h1>
                <h3 className="max-w-2xl text-lg text-white/80"></h3>
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <Link
                    href={quotePageUrl("dfm")}
                    className="button-primary inline-block"
                  >
                    Optimize Your Design for Manufacturing
                  </Link>
                  <Link
                    href="/contact"
                    className="button-secondary inline-block"
                  >
                    Discuss Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM — mobile stack / desktop original 40-60 */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col items-start gap-6 py-12 md:hidden">
          <h2 className="!text-[1.875rem] font-bold !leading-[1.15] text-black">
            What our DFM services deliver
          </h2>
          <p className="!text-[1.125rem] text-black">
            Design for Manufacturing is the process of evaluating how a product
            will be made and identifying opportunities to simplify production
            without compromising performance. Our recommendations are tailored
            to the intended manufacturing method, production volume, and project
            objectives. Whether your product will be machined, fabricated,
            molded, or assembled from multiple components, DFM helps align
            design decisions with efficient production practices.
          </p>
        </div>
        <div className="mx-auto hidden max-w-7xl flex-row items-start justify-around gap-8 px-6 py-12 large:gap-8 md:flex">
          <h2 className="w-[40%] font-bold text-black">
            What our DFM services deliver
          </h2>
          <p className="w-[60%] text-lg text-black">
            Design for Manufacturing is the process of evaluating how a product
            will be made and identifying opportunities to simplify production
            without compromising performance. Our recommendations are tailored
            to the intended manufacturing method, production volume, and project
            objectives. Whether your product will be machined, fabricated,
            molded, or assembled from multiple components, DFM helps align
            design decisions with efficient production practices.
          </p>
        </div>
      </div>

     

      {/* CAPABILITIES — S4 */} 
      <section
        id="capabilities"
        className="border-y border-black/5 bg-stone-50 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl md:mb-16 ">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-black max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl">
              Six areas of review, tailored to your process and volume.
            </h2>
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
                          href="/contact"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff6726]"
                        >
                          Book a Free Consultation
                          <ArrowRight className="size-3.5" strokeWidth={2.5} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: existing tabs + panel (unchanged) */}
          <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-12 md:gap-10">
            <div
              role="tablist"
              aria-label="DFM capabilities"
              className={cn(
                "-mx-6 flex flex-row gap-2 overflow-x-auto px-6 pb-2",
                "md:mx-0 md:col-span-4 md:flex-col md:gap-1 md:overflow-visible md:px-0 md:pb-0"
              )}
            >
              {CAPABILITIES.map((item, index) => {
                const isActive = index === activeIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`dfm-cap-panel-${index}`}
                    id={`dfm-cap-tab-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group relative shrink-0 whitespace-nowrap md:whitespace-normal",
                      "flex items-center gap-3 rounded-full px-4 py-2 text-left transition-colors",
                      "md:rounded-none md:border-l-2 md:px-5 md:py-3",
                      CAPABILITY_MOTION,
                      isActive
                        ? "bg-[#ff6726]/10 md:bg-transparent md:border-[#ff6726]"
                        : "bg-transparent md:border-transparent hover:bg-black/5"
                    )}
                  >
                    <Icon
                      strokeWidth={1.5}
                      className={cn(
                        "size-15 shrink-0 transition-colors",
                        CAPABILITY_MOTION,
                        isActive ? "text-[#ff6726]" : "text-black/40"
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "text-sm font-semibold transition-colors md:text-base",
                        CAPABILITY_MOTION,
                        isActive
                          ? "text-[#ff6726]"
                          : "text-black/70 group-hover:text-black"
                      )}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`dfm-cap-panel-${activeIndex}`}
              aria-labelledby={`dfm-cap-tab-${activeIndex}`}
              className="rounded-2xl border border-black/5 bg-blue-900/10 p-6 shadow-sm md:col-span-8 md:p-8"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                <div className="flex h-full flex-col lg:col-span-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
                    {activeCapability.tag}
                  </div>
                  <h3 className="mt-2 !text-2xl !font-bold text-black md:!text-3xl">
                    {activeCapability.title}
                  </h3>
                  <p className="mt-4 !text-base leading-relaxed !text-black/70">
                    {activeCapability.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {activeCapability.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check
                          className="mt-0.5 size-5 shrink-0 text-[#ff6726]"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span className="text-sm leading-relaxed text-black/80 md:text-base">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      href="/contact"
                      className="group/cta inline-flex w-fit items-center gap-3 rounded-full bg-[#121926] py-2 pl-5 pr-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#ff6726]"
                    >
                      <span>Book a Free Consultation</span>
                      <span
                        aria-hidden
                        className="flex size-7 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover/cta:bg-white/20"
                      >
                        <ArrowRight
                          className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                          strokeWidth={2.5}
                        />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <img
                      src={CAPABILITY_CARD_IMAGE}
                      alt={activeCapability.title}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODO: swap DFM hero / process imagery */}
      {/* <div className="relative z-20 mx-auto flex h-[70vh] max-w-7xl translate-y-[35vh] items-center justify-center">
        <div className="h-[70vh] w-[80vw] overflow-hidden rounded-2xl shadow-2xl">
          <img
            className="h-full w-full rounded-2xl object-cover"
            alt="Design for manufacturing and production planning"
            src="https://cf-images.us-east-1.prod.boltdns.net/v1/static/1532789042001/15289edf-06a6-4ba1-b93c-ae6b104c0de9/c9aea21f-44e3-4083-8b33-993a42a89e71/1280x720/match/image.jpg"
          />
        </div>
      </div> */}

      {/* APPLICATIONS & INDUSTRIES — S6 */}
      {/* <section
        aria-labelledby="dfm-industries-heading"
        className="bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-24 md:py-32 "
      >
        <div className="mx-auto max-w-7xl px-6 pt-[35vh]">
          <div className="mb-10 max-w-3xl md:mb-14">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Applications & Industries
            </div>
            <h2
              id="dfm-industries-heading"
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              DFM support for new product launches and production improvements.
            </h2>
            <p className="mt-4 text-base leading-relaxed !text-white md:text-lg">
              Design for Manufacturing benefits any organization seeking to
              control production costs and improve consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {INDUSTRIES.map((item) => (
              <article
                key={item.title}
                className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl md:min-h-[300px]"
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
                    INDUSTRY_CARD_SCRIM
                  )}
                  aria-hidden
                />
                <div className="relative z-10 flex flex-col justify-end p-5 md:p-6">
                  <h4 className="translate-y-[1.6em] font-bold !text-lg text-white">
                    {item.title}
                  </h4>
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
      </section> */}

      {/* PROCESS — S5 */}
      <section className="relative z-10 bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl md:mb-16">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Our Process
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl">
              A structured review focused on manufacturing efficiency.
            </h2>
            <p className="mt-4 text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
              Our Design for Manufacturing process is designed to uncover
              practical improvements before production resources are committed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm max-md:p-5 md:p-7"
              >
                <div className="text-5xl font-bold text-[#ff6726] max-md:!text-4xl">
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

     
      

      

      {/* FINAL CTA — S9 */}
      <DotPattern className="bg-black/95">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32">
          <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Get Started
          </div>
          <h1 className="!text-6xl !leading-none font-bold text-white max-md:!text-[2rem] max-md:!leading-[1.1]">
            Reduce production costs
            <br />
            <span className="italic text-[#ff6726]">before</span> manufacturing
            begins.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
            Whether you are preparing a new product for launch or improving an
            existing design, FormaSharp can identify practical changes that
            simplify production and support better manufacturing outcomes. Share
            your CAD files, drawings, or supplier feedback, and our team will
            recommend the most effective path forward.
          </p>
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 max-md:w-full max-md:items-stretch max-md:gap-3 sm:flex-row">
            <Link
              href={quotePageUrl("dfm")}
              className="button-primary inline-block max-md:w-full max-md:text-center"
            >
              Optimize Your Design for Manufacturing
            </Link>
            <Link
              href="/contact"
              className="button-secondary inline-block max-md:w-full max-md:text-center"
            >
              Book a Free Consultation
            </Link>
          </div>
          <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
            Tolerance · Part Count · Materials · Assembly · Supplier Feedback
          </div>
        </div>
      </DotPattern>
    </div>
    </>
  );
}

export default DesignForManufacturing;
