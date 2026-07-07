import Link from "next/link";
import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Blocks,
  Check,
  Factory,
  Layers,
  MessageSquareReply,
  PackageSearch,
  RulerDimensionLine,
} from "lucide-react";
import { DotPattern } from "@/components/ui/DotPatternProps";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { DfmShowcase } from "@/components/ui/dfm-showcase";
import { cn } from "@/lib/utils";
import { quotePageUrl } from "@/lib/quoteForm";
import ExtraBadges from "@/components/ExtraBadges";

type CapabilityItem = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

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

// TODO: swap per-industry image
const CARD_IMAGE_PLACEHOLDER =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/ecommerce-engi.jpg";

const INDUSTRIES: IndustryItem[] = [
  {
    title: "Consumer Products",
    description:
      "Refine designs for efficient tooling, assembly, and high-volume production.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Consumer product manufacturing context",
  },
  {
    title: "Industrial Equipment",
    description:
      "Simplify complex components and assemblies to improve fabrication and maintenance.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Industrial equipment manufacturing context",
  },
  {
    title: "Startup Hardware",
    description:
      "Prepare products for supplier quoting and first production runs with greater confidence.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Startup hardware manufacturing context",
  },
  {
    title: "Custom Tools and Fixtures",
    description:
      "Reduce fabrication complexity while preserving performance requirements.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Custom tooling and fixtures context",
  },
  {
    title: "Engineering Departments",
    description:
      "Support internal teams with focused manufacturability reviews and implementation.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Engineering team DFM review context",
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
  const activeCapability = CAPABILITIES[activeIndex];

  return (
    <div>
      {/* HERO — S1 */}
      <div className="relative min-h-[100vh] overflow-hidden bg-[#121926]">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/dfm1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        {/* Left dark → right fully transparent (readability for hero copy on the left) */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top_right,rgba(18,25,38,0.97)_0%,rgba(18,25,38,0.78)_22%,rgba(18,25,38,0.48)_45%,rgba(18,25,38,0.2)_68%,transparent_88%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[100vh] w-full flex-col justify-end items-end">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-6 px-4 py-12 !pt-[20vh] text-left md:flex-row md:py-16 lg:py-24">
          <div className="max-w-3xl">
            <h4>
              DESIGN FOR MANUFACTURING{" "}
              <span className="text-[#ff6726]">(DFM)</span>
            </h4>
            <h1 className="max-w-3xl !text-6xl !leading-none font-bold text-white pt-5">
              Prepare your product for efficient,{" "}
              <span className="text-[#ff6726]">cost-effective</span> production.
            </h1>
            <h3 className="max-w-2xl text-lg text-white/80">

            </h3>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <Link href={quotePageUrl("dfm")} className="button-primary inline-block">
                Optimize Your Design for Manufacturing
              </Link>
              <Link href="/contact" className="button-secondary inline-block">Discuss Your Project</Link>
            </div>
          </div>
        </div>
        
        </div>
      </div>


      {/* <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
          <ExtraBadges contentAlign="center" />
        </div> */}

      {/* PROBLEM — S2 */}
      <div className="max-w-7xl mx-auto px-6 py-26">
      <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8 large:gap-8  py-12">
            <h2 className=" font-bold text-black w-[40%]">What our DFM services deliver</h2>
            <p className="text-lg text-black w-[60%]">Design for Manufacturing is the process of evaluating how a product will be made and
            identifying opportunities to simplify production without compromising performance. Our recommendations are tailored to the intended manufacturing method, production volume, and project objectives. Whether your product will be machined, fabricated, molded, or assembled from multiple components, DFM helps align design decisions with efficient production practices.</p>

        </div>
        <div className="bd mx-auto min-h-[100px] flex items-center justify-center w-full max-w-7xl px-4 py-8 md:px-6 bg-blue-900/90">
          <ExtraBadges contentAlign="center" />
        </div>
      </div>

     

      {/* CAPABILITIES — S4 */}
      <section
        id="capabilities"
        className="border-y border-black/5 bg-stone-50  py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl md:mb-16 ">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
              Design for manufacturing:
              <br />
              Six areas of review, tailored to your process and volume.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
              FormaSharp's DFM review covers the dimensions most likely to affect production cost, lead time, and quality. This may involve CNC machining, sheet metal fabrication, welding, injection molding, casting, or
              additive manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
            {/* Tab list — horizontal scroll on mobile, vertical rail on md+ */}
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

            {/* Active panel */}
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
                    <a
                      href={quotePageUrl("dfm")}
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
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  {/* TODO: per-capability image */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-100 shadow-sm">
                    <img
                      src={CARD_IMAGE_PLACEHOLDER}
                      alt=""
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
        className="bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-16 md:py-32 "
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
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              A structured review focused on manufacturing efficiency.
            </h2>
            <p className="mt-4 text-base leading-relaxed !text-white md:text-lg">
              Our Design for Manufacturing process is designed to uncover
              practical improvements before production resources are committed.
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
                <p className="!text-base !font-light !text-white/80">
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
          <h1 className="!text-6xl !leading-none font-bold text-white">
            Reduce production costs
            <br />
            <span className="italic text-[#ff6726]">before</span> manufacturing
            begins.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
            Whether you are preparing a new product for launch or improving an
            existing design, FormaSharp can identify practical changes that
            simplify production and support better manufacturing outcomes. Share
            your CAD files, drawings, or supplier feedback, and our team will
            recommend the most effective path forward.
          </p>
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
            <Link href={quotePageUrl("dfm")} className="button-primary inline-block">
              Optimize Your Design for Manufacturing
            </Link>
            <Link href="/contact" className="button-secondary inline-block">Book a Free Consultation</Link>
          </div>
          <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
            Tolerance · Part Count · Materials · Assembly · Supplier Feedback
          </div>
        </div>
      </DotPattern>
    </div>
  );
}

export default DesignForManufacturing;
