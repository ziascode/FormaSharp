import React, { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Clock,
  Cog,
  FileText,
  Layers2,
  LayoutGrid,
  Lightbulb,
  Minimize2,
} from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { DotPattern } from "@/components/ui/DotPatternProps";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { ProductDesignShowcase } from "@/components/ui/product-design-showcase";
import { cn } from "@/lib/utils";
import ExtraBadges from "@/components/ExtraBadges";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.cjs.jsx";

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
    tag: "Concept",
    title: "Concept Development",
    description:
      "Every project starts with understanding what the product needs to accomplish. We evaluate intended use, performance requirements, and design constraints.",
    bullets: [
      "Intended use evaluation",
      "Performance requirements",
      "Design constraints",
      "Feasibility reviews",
      "Early layout studies",
    ],
    colSpan: 2,
    icon: Lightbulb,
  },
  {
    tag: "Mechanical",
    title: "Mechanical System Design",
    description:
      "Many products rely on moving parts, enclosures, fasteners, and structural components that must work together reliably.",
    bullets: [
      "Motion and kinematics",
      "Load-bearing requirements",
      "Component integration",
      "Assembly and servicing",
      "Durability under expected use",
    ],
    colSpan: 2,
    icon: Cog,
  },
  {
    tag: "Materials",
    title: "Material Selection",
    description:
      "Choosing the right material affects performance, cost, appearance, and longevity across the operating environment.",
    bullets: [
      "Metals, plastics, elastomers, composites",
      "Operating environment",
      "Mechanical demands",
      "Production considerations",
      "Avoiding overengineering",
    ],
    colSpan: 2,
    icon: Layers2,
  },
  {
    tag: "Architecture",
    title: "Product Architecture & Assembly Design",
    description:
      "The arrangement of components has a direct impact on functionality, ease of assembly, and serviceability.",
    bullets: [
      "Component arrangement",
      "Fastening & joining",
      "Manufacturability",
      "Service & maintenance",
      "Part-count reduction",
    ],
    colSpan: 2,
    icon: LayoutGrid,
  },
  {
    tag: "Optimization",
    title: "Design Optimization",
    description:
      "As the product evolves, we refine geometry and component relationships to improve performance, simplify assembly, and reduce unnecessary cost.",
    bullets: [
      "Geometry refinement",
      "Strengthen critical areas",
      "Eliminate redundant features",
      "Improve manufacturability",
    ],
    colSpan: 2,
    icon: Minimize2,
  },
  {
    tag: "Documentation",
    title: "CAD Modeling & Technical Documentation",
    description:
      "Detailed 3D models and engineering drawings clearly communicate design intent for prototyping, testing, and manufacturing.",
    bullets: [
      "Part and assembly models",
      "Dimensioned drawings",
      "Bill of materials (BOM)",
      "Exploded views",
      "Revision-controlled design files",
    ],
    colSpan: 2,
    icon: FileText,
  },
];

type IndustryItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

// TODO: swap per-industry image
const CARD_IMAGE_PLACEHOLDER =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/ecommerce-engi.jpg";

const INDUSTRIES: IndustryItem[] = [
  {
    title: "Consumer Products",
    description:
      "Products that balance usability, visual appeal, and reliable function across everyday applications.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Consumer product design context",
  },
  {
    title: "Industrial Equipment",
    description:
      "Robust components and assemblies used in machinery, tools, and production environments.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Industrial equipment design context",
  },
  {
    title: "Medical & Technical Devices",
    description:
      "Products that require precise integration, thoughtful ergonomics, and dependable performance.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Medical and technical device design context",
  },
  {
    title: "Custom Tools & Fixtures",
    description:
      "Specialized equipment tailored to unique production, testing, or service requirements.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Custom tooling and fixture design context",
  },
  {
    title: "Startup Hardware Products",
    description:
      "Helping innovators move from sketches and ideas to fully defined products ready for prototyping and market validation.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Startup hardware product design context",
  },
];

type ProcessStep = {
  shortLabel: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
  output: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    shortLabel: "Discovery",
    title: "Discovery & Requirements Definition",
    description:
      "We begin by learning about your concept, target users, performance goals, and commercial objectives. This stage establishes design priorities and identifies technical constraints early.",
    duration: "1-2 weeks",
    deliverables: ["Requirements brief", "Constraint matrix", "Success metrics"],
    output: "BRIEF.PDF",
  },
  {
    shortLabel: "Concept",
    title: "Concept Development",
    description:
      "Potential design approaches are explored and evaluated based on functionality, complexity, and feasibility. The strongest concept is refined into a structured product architecture.",
    duration: "1-2 weeks",
    deliverables: ["Concept sketches", "Architecture options", "Feasibility notes"],
    output: "CONCEPTS.PDF",
  },
  {
    shortLabel: "Engineering",
    title: "Engineering Design",
    description:
      "Detailed CAD models are developed alongside component layouts, material selections, and assembly strategies. The product takes shape as a fully defined engineering design.",
    duration: "2-3 weeks",
    deliverables: ["CAD models", "Component layouts", "Material spec"],
    output: "DESIGN.STEP",
  },
  {
    shortLabel: "Review",
    title: "Review & Refinement",
    description:
      "Designs are assessed and adjusted to improve performance, simplify construction, and address stakeholder feedback. This iterative process strengthens the product before prototyping.",
    duration: "1-2 weeks",
    deliverables: ["Design review notes", "Refined CAD", "Decision log"],
    output: "REVIEW.PDF",
  },
  {
    shortLabel: "Validation",
    title: "Validation & Prototyping",
    description:
      "When needed, prototypes and simulations confirm functionality, fit, and usability. Insights gained during testing are incorporated back into the design.",
    duration: "2-3 weeks",
    deliverables: ["Prototype builds", "Test results", "Iteration plan"],
    output: "TEST.PDF",
  },
  {
    shortLabel: "Production",
    title: "Production Preparation",
    description:
      "Final models and documentation are organized for prototyping, supplier quoting, and manufacturing — a clearly defined design package ready for the next stage.",
    duration: "1-2 weeks",
    deliverables: ["Production drawings", "BOM", "Supplier package"],
    output: "RELEASE.ZIP",
  },
];

const RELATED_SERVICES = [
  "Industrial Design",
  "Mechanical Engineering & Simulation",
  "Prototyping & 3D Printing",
  "CAD Services",
  "Design for Manufacturing",
];

/** Solid slate at the bottom of the scrim, short fade to transparent at the top of the scrim element. */
const INDUSTRY_CARD_SCRIM =
  "bg-[linear-gradient(to_top,#242c37_0%,#242c37_60%,transparent_100%)]";

/** Same 800ms + easing on every capability card surface and text node. */
const CAPABILITY_MOTION =
  "duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function ProductDesign() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const highlightedIndex = hoveredIndex ?? activeIndex;
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = PROCESS_STEPS[activeStageIndex];

  const [heroScrollPercent, setHeroScrollPercent] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      const p = Math.min(Math.max(window.scrollY / vh, 0), 1);
      setHeroScrollPercent(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div>

    {/* HERO */}
    <div className="relative isolate min-h-[100vh] overflow-hidden bg-[#121926]">
      <div
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden
      >
        <ScrollyVideo
          src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/watch.mp4"
          videoPercentage={heroScrollPercent}
          trackScroll={false}
          transitionSpeed={8}
          frameThreshold={0.05}
          useWebCodecs
          full
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top_right,rgba(18,25,38,0.92)_0%,rgba(18,25,38,0.72)_25%,rgba(18,25,38,0.42)_50%,rgba(18,25,38,0.18)_72%,transparent_92%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto !pt-[20vh] flex flex-row items-center justify-start max-w-7xl flex-col gap-6 px-4 py-12 md:py-16 lg:py-24">
        <div>
            <h4>PRODUCT DESIGN <span className="text-[#ff6726]">SERVICES</span></h4>
            <h1 className="max-w-3xl !text-6xl !leading-none font-bold text-white pt-5">
            Transform product ideas into <span className="text-[#ff6726]">production-ready</span> designs.
            </h1>
            <h3 className="max-w-2xl text-lg text-white/80">
            FormaSharp turns concepts into well-defined products. From early concept development to detailed CAD models and technical documentation, we create designs that are built to perform, practical to produce, and aligned with your business goals.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
            <InteractiveHoverButton className="button-primary">
            Start Your Product Design Project
            </InteractiveHoverButton>
            <button className="button-secondary">Discuss Your Concept</button>
            </div>
        </div>
        
        
      </div>
      <div className="relative z-10 py-8">
        <ExtraBadges/>
      </div>
    </div>

  

    {/* CAPABILITIES — Product Design */}
    <section
      id="capabilities"
      className=" py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-12 max-w-3sxl md:mb-16 ">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            Structured product development
            <br />
            from concept to detailed design.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            FormaSharp combines mechanical engineering, CAD development, and
            practical product planning to create designs that are both
            functional and commercially viable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
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

  {/* PROBLEM RECOGNITION — Great Ideas Need a Clear Engineering Strategy */}
    <div className="max-w-7xl mx-auto px-6 py-32 !mb-[10vh]">
       <div className="text-black/90 flex flex-col justify-center text-center">
        <h2 className=" max-w-3xl mx-auto">Great ideas need a clear<span className="text-[#ff6726]"> engineering strategy</span></h2>
        {/* <p className=" max-w-3xl mx-auto">Many products begin with strong ideas but stall when technical decisions become more complex. Questions around functionality, material selection, assembly, and production can quickly slow progress if the design is not approached systematically. Product design provides the structure needed to turn an idea into a technically sound, clearly documented product concept.</p> */}

        {/* <ul className="mx-auto mt-2 mb-8 max-w-2xl list-disc space-y-2 pl-6 text-left text-base text-black/80 md:text-lg">
          <li>Uncertainty around how the product should function</li>
          <li>Difficulty translating sketches into detailed CAD models</li>
          <li>Mechanical components that do not integrate properly</li>
          <li>Designs that are overly complex or expensive to produce</li>
          <li>Missing technical documentation required for manufacturing</li>
        </ul> */}

        <button className="button-tertiary mx-auto">Book a Consultation →</button>
       </div>
    </div>

     {/* PROCESS — Interactive stage stepper */}
     <section className="relative z-10 overflow-hidden bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
      {/* Faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#ff6726]">
              <span aria-hidden className="inline-block h-px w-8 bg-[#ff6726]" />
              Our Process
            </div>
            <h2 className="!text-4xl !font-bold !leading-[1.05] tracking-tight text-white md:!text-5xl">
              From rough concept to{" "}
              <span className="italic">production-ready</span> design.
            </h2>
          </div>
          <div className="font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.25em] text-white/40">
            Six stages
            <br />
            ~10-14 weeks
          </div>
        </div>

        {/* Stepper */}
        <div className="relative mt-14 md:mt-20">
          {/* Iterate arc (decorative, md+) */}
          <div
            aria-hidden
            className="pointer-events-none absolute hidden md:block"
            style={{ left: "25%", right: "41.66%", top: "-3.25rem", height: "3rem" }}
          >
            <svg
              viewBox="0 0 200 50"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              <path
                d="M 4 46 Q 100 -6 196 46"
                fill="none"
                stroke="#ff6726"
                strokeWidth="1.25"
                strokeDasharray="5 5"
                opacity="0.55"
              />
            </svg>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#ff6726]">
              Iterate
            </div>
          </div>

          <ol
            role="tablist"
            aria-label="Process stages"
            className="grid grid-cols-6 gap-1 md:gap-6"
          >
            {PROCESS_STEPS.map((step, i) => {
              const isActive = i === activeStageIndex;
              return (
                <li key={step.title} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-colors md:text-xs md:tracking-[0.26em]",
                      isActive ? "text-[#ff6726]" : "text-white/70"
                    )}
                  >
                    Stage {String(i + 1).padStart(2, "0")}
                  </div>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="process-stage-panel"
                    onClick={() => setActiveStageIndex(i)}
                    className={cn(
                      "mt-2 flex items-center justify-center rounded-full font-mono font-semibold transition-all duration-500 md:mt-3",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6726] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                      isActive
                        ? "size-12 bg-[#ff6726] text-white shadow-[0_0_0_5px_rgba(255,103,38,0.18)] md:size-16 md:text-base"
                        : "size-9 border border-white/25 text-white/55 hover:border-white/55 hover:text-white/80 md:size-12"
                    )}
                  >
                    <span className="text-xs md:text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "mt-2 text-center text-[0.65rem] font-medium transition-colors md:mt-3 md:text-sm",
                      isActive ? "text-white" : "text-white/45"
                    )}
                  >
                    {step.shortLabel}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Active stage detail */}
        <div
          id="process-stage-panel"
          role="tabpanel"
          aria-label={`Stage ${activeStageIndex + 1}: ${activeStage.title}`}
          className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#0c1422]/85 p-8 backdrop-blur-sm md:mt-16 md:p-12"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Big number column */}
            <div className="md:col-span-2">
              <div className="font-mono text-7xl font-bold leading-none text-[#ff6726] md:text-8xl">
                {String(activeStageIndex + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Main content column */}
            <div className="md:col-span-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
                  Stage / {String(activeStageIndex + 1).padStart(2, "0")} of{" "}
                  {String(PROCESS_STEPS.length).padStart(2, "0")}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/75">
                  <Clock
                    className="size-3.5"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  {activeStage.duration}
                </div>
              </div>

              <h3 className="mt-4 !text-2xl !font-bold text-white md:!text-3xl">
                {activeStage.title}
              </h3>
              <p className="mt-4 max-w-3xl !text-base !font-light leading-relaxed !text-white/75 md:!text-lg">
                {activeStage.description}
              </p>

              {/* Footer row: deliverables left, counter + output right */}
              <div className="mt-10 flex flex-col items-start gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between md:gap-6">
                <div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/45">
                    Deliverables
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeStage.deliverables.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85"
                      >
                        <span
                          aria-hidden
                          className="size-1.5 shrink-0 rounded-full bg-[#ff6726]"
                        />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-end gap-5">
                  {/* counter + next arrow */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/40">
                      {String(activeStageIndex + 1).padStart(2, "0")} /{" "}
                      {String(PROCESS_STEPS.length).padStart(2, "0")}
                    </div>
                    <button
                      type="button"
                      aria-label="Next stage"
                      onClick={() =>
                        setActiveStageIndex(
                          (activeStageIndex + 1) % PROCESS_STEPS.length
                        )
                      }
                      className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-[#ff6726] hover:bg-[#ff6726]/10 hover:text-white"
                    >
                      <ArrowRight
                        className="size-4"
                        strokeWidth={2.25}
                        aria-hidden
                      />
                    </button>
                  </div>

                  {/* Output mock card */}
                  <div className="relative rotate-2 rounded-md border border-[#ff6726]/40 bg-[#ff6726]/10 px-4 py-2.5 shadow-[0_8px_24px_rgba(255,103,38,0.18)]">
                    <div className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-[#ff6726]/85">
                      Output
                    </div>
                    <div className="font-mono text-sm font-semibold tracking-wide text-white">
                      {activeStage.output}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

<div>
  <video src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/cnc.mp4" autoPlay muted loop playsInline />
</div>

    {/* TODO: swap product design hero shot
    <div className="relative z-20 h-[70vh] flex items-center justify-center max-w-7xl mx-auto translate-y-[35vh]">
        <div className="w-[80vw] h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
        <img
          className="h-full w-full rounded-2xl object-cover"
          alt="Product design and engineering reference"
          src="https://cf-images.us-east-1.prod.boltdns.net/v1/static/1532789042001/15289edf-06a6-4ba1-b93c-ae6b104c0de9/c9aea21f-44e3-4083-8b33-993a42a89e71/1280x720/match/image.jpg"   
        />
        </div>
    </div> */}

    {/* INDUSTRIES & APPLICATIONS */}
    <section
      aria-labelledby="industries-heading"
      className="bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-16 md:py-32 "
    >
      <div className="mx-auto max-w-7xl px-6 pt-[0vh]">
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Industries & Applications
          </div>
          <h2
            id="industries-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            Product design for diverse industries and product types.
          </h2>
          <p className="mt-4 text-base leading-relaxed !text-white md:text-lg">
            From early-stage concepts to highly specialized engineered
            components, we support a broad range of product development
            initiatives.
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

   
  {/* WHY FORMA SHARP — preamble + accordion
    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8 py-12 md:pt-32">
        <h2 className=" font-bold text-black w-[40%]">Product design grounded in engineering and practical development.</h2>
        <p className="text-lg text-black w-[60%]">A product concept becomes significantly more valuable when it is supported by thoughtful engineering and clear documentation. FormaSharp approaches product design with a focus on technical accuracy, usability, and commercial practicality.</p>
    </div>

    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8">
        <ImageMasking1  imageSrc="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/4eng-scaled.jpg" className="w-[90%]"/>
    </div>

    <div className="max-w-7xl mx-auto py-40 px-6 gap-4 flex flex-col items-start justify-start ">
        <ProductDesignShowcase />
    </div>

    {/* RELATED SERVICES */}
    {/* <section className="bg-stone-50 border-y border-black/5 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
          Related Services
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
          Product design sits at the center of a broader development program.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
          These services help refine, validate, and prepare your product for
          launch.
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
    </section> */}

    {/* FINAL CTA */}
    <DotPattern className="bg-black/95">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
          Get Started
        </div>
        <h1 className="!text-6xl !leading-none font-bold text-white">
          Turn your product concept
          <br />
          into a <span className="italic text-[#ff6726]">well-defined</span> design.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
          Whether you are starting with an idea, refining a prototype, or
          preparing for production, FormaSharp can help shape your concept into
          a practical and thoroughly engineered product.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <InteractiveHoverButton className="button-primary">
            Start Your Product Design Project
          </InteractiveHoverButton>
          <button className="button-secondary">Discuss Your Concept</button>
        </div>
        <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
          Concept Development · Mechanical Systems · Material Selection · Architecture · Optimization · CAD Documentation
        </div>
      </div>
    </DotPattern>

    </div>


  );
}

export default ProductDesign;
