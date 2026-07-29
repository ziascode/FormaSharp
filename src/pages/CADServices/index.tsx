import Link from "next/link";
import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Box,
  Boxes,
  Check,
  ChevronDown,
  History,
  Image as ImageIcon,
  ListChecks,
  Ruler,
} from "lucide-react";
import { DotPattern } from "@/components/ui/DotPatternProps";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { CadShowcase } from "@/components/ui/cad-showcase";
import { cn } from "@/lib/utils";
import { quotePageUrl } from "@/lib/quoteForm";
import ExtraBadges from "@/components/ExtraBadges";
import Seo from "@/components/Seo";
import { SERVICE_PAGE_SEO, serviceJsonLd } from "@/lib/schema";

type CapabilityItem = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

const CAPABILITIES: CapabilityItem[] = [
  {
    tag: "3D Modeling",
    title: "3D Part Modeling",
    description:
      "We create detailed three-dimensional models of individual components based on sketches, measurements, design notes, or reference materials. These models serve as the foundation for engineering analysis, prototyping, and manufacturing.",
    bullets: [
      "Sketch-to-CAD translation",
      "Reference- and measurement-based modeling",
      "Foundation for analysis & prototyping",
      "Manufacturing-ready geometry",
    ],
    icon: Box,
  },
  {
    tag: "Assemblies",
    title: "Assembly Modeling",
    description:
      "Products often consist of multiple components that must interact correctly. We build structured assemblies that define part relationships, clearances, and motion where applicable, making it easier to evaluate integration and identify design issues early.",
    bullets: [
      "Part relationships & mates",
      "Clearance & interference checks",
      "Motion studies where applicable",
      "Integration review",
    ],
    icon: Boxes,
  },
  {
    tag: "Drawings",
    title: "Technical Drawings",
    description:
      "Manufacturers rely on complete and accurate drawings to produce parts correctly. We prepare documentation that communicates design intent clearly and reduces ambiguity during fabrication.",
    bullets: [
      "Dimensions and tolerances",
      "Material specifications",
      "Surface finish requirements",
      "Section and detail views",
      "Revision tracking",
    ],
    icon: Ruler,
  },
  {
    tag: "BOM",
    title: "Bill of Materials (BOM)",
    description:
      "For multi-part products, we generate organized bills of materials listing part numbers, descriptions, and quantities. This improves purchasing, assembly planning, and document control.",
    bullets: [
      "Part numbers & descriptions",
      "Quantities & units",
      "Purchasing-ready format",
      "Assembly planning support",
    ],
    icon: ListChecks,
  },
  {
    tag: "Revisions",
    title: "CAD Revisions and Updates",
    description:
      "Existing models and drawings can be modified to reflect design changes, engineering improvements, or updated manufacturing requirements. This service is particularly useful for maintaining product lines and implementing continuous improvements.",
    bullets: [
      "Design change incorporation",
      "Engineering improvements",
      "Updated manufacturing requirements",
      "Product line maintenance",
    ],
    icon: History,
  },
  {
    tag: "Visualization",
    title: "Visualization and Renderings",
    description:
      "When needed, we create rendered images that help communicate design intent to stakeholders, investors, and marketing teams.",
    bullets: [
      "Stakeholder-ready visuals",
      "Investor & pitch imagery",
      "Marketing renderings",
      "Design intent communication",
    ],
    icon: ImageIcon,
  },
];

type IndustryItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const CAPABILITY_CARD_IMAGE =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/photo-1715498886689-c6aaf5d7601d.jpeg";

const INDUSTRIES: IndustryItem[] = [
  {
    title: "Product Development",
    description:
      "Convert concepts into detailed digital models that support engineering, prototyping, and supplier communication.",
    imageSrc:
      "https://images.unsplash.com/photo-1586868538513-51335a0c5337?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Engineers reviewing a CAD model for product development",
  },
  {
    title: "Manufacturing and Fabrication",
    description:
      "Prepare precise drawings and assemblies for machining, sheet metal fabrication, welding, and assembly operations.",
    imageSrc:
      "https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=800&q=80&auto=format&fit=crop",
    imageAlt: "CNC machining and manufacturing fabrication context",
  },
  {
    title: "Industrial Equipment",
    description:
      "Document complex parts and systems used in machinery and production environments.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/6indus-scaled.jpg",
    imageAlt: "Industrial equipment CAD documentation context",
  },
  {
    title: "Consumer Products",
    description:
      "Develop organized design files for products requiring frequent revisions and rapid iteration.",
    imageSrc:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Consumer product design and CAD iteration context",
  },
  {
    title: "Engineering Departments",
    description:
      "Provide additional modeling capacity for internal teams facing tight deadlines or specialized tasks.",
    imageSrc:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Engineering department prototyping and CAD support work",
  },
];

type ProcessStep = {
  title: string;
  description: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Review Project Requirements",
    description:
      "We gather reference materials, design objectives, and documentation needs.",
  },
  {
    title: "Develop the CAD Model",
    description:
      "Parts and assemblies are built according to the required level of detail and intended application.",
  },
  {
    title: "Perform Internal Checks",
    description:
      "Models and drawings are reviewed for dimensional consistency, assembly logic, and completeness.",
  },
  {
    title: "Generate Documentation",
    description:
      "Technical drawings, bills of materials, and supporting files are prepared.",
  },
  {
    title: "Incorporate Feedback",
    description:
      "Requested revisions are implemented to ensure the deliverables align with project expectations.",
  },
  {
    title: "Deliver Final Files",
    description:
      "Completed CAD data is provided in the formats required for your workflow.",
  },
];

const RELATED_SERVICES = [
  "Product Design",
  "Reverse Engineering",
  "Mechanical Engineering & Simulation",
  "Prototyping & 3D Printing",
  "Design for Manufacturing",
];

const INDUSTRY_CARD_SCRIM =
  "bg-[linear-gradient(to_top,#242c37_0%,#242c37_60%,transparent_100%)]";

const CAPABILITY_MOTION =
  "duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function CADServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [accordionOpenIndex, setAccordionOpenIndex] = useState<number | null>(
    null
  );
  const activeCapability = CAPABILITIES[activeIndex];

  return (
    <>
      <Seo
        title={SERVICE_PAGE_SEO.CADServices.title}
        description={SERVICE_PAGE_SEO.CADServices.description}
        canonical={SERVICE_PAGE_SEO.CADServices.path}
        jsonLd={serviceJsonLd("CADServices")}
      />
    <div>
      {/* HERO — dual trees: mobile-only vs exact desktop */}
      <div className="relative overflow-hidden bg-[#121926]">
        {/* Mobile hero — gradient bg; image in box under CTA */}
        <div className="relative z-10 flex min-h-[100svh] flex-col bg-[linear-gradient(to_bottom_right,#121926,#01628a)] md:hidden">
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start gap-5 px-6 pb-4 pt-36 text-left">
            <div>
              <h4 className="!mb-0 !text-[0.6875rem] !font-medium !uppercase !tracking-[0.14em] !text-white/90">
                CAD <span className="text-[#ff6726]">SERVICES</span>
              </h4>
              <h1 className="max-w-3xl !text-[2rem] !leading-[1.1] font-bold text-white pt-4">
                <span className="text-[#ff6726]">Precision</span> CAD Models and
                Technical Drawings That Keep Projects Moving
              </h1>
              <h3 className="max-w-2xl !text-[1.125rem] text-white/80">
                Accurate design data is the foundation of every successful
                engineering project. Whether you are developing a new product,
                documenting an existing design, or preparing files for
                fabrication, well-structured CAD models and drawings are
                essential.
              </h3>
              <div className="mt-6 flex w-full flex-col items-stretch gap-3">
                <Link
                  href={quotePageUrl("cad")}
                  className="button-primary inline-block w-full text-center"
                >
                  Start Your CAD Project
                </Link>
                <Link
                  href="/contact"
                  className="button-secondary inline-block w-full text-center"
                >
                  Request a Consultation
                </Link>
              </div>
              <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#121926] shadow-lg">
                <img
                  src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/ip4-1.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain p-4"
                  aria-hidden
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-auto shrink-0 p-0">
            <ExtraBadges className="[&>div]:!mt-0" />
          </div>
        </div>

        {/* Desktop hero — exact current markup */}
        <DotPattern className="relative hidden min-h-[100vh] overflow-hidden bg-black/95 md:block">
          <div
            className="pointer-events-none absolute right-0 top-1/2 z-0 w-[50vw] max-w-[50vw] -translate-y-1/2 translate-x-[8%] md:translate-x-[4%]"
            aria-hidden
          >
            <div className="relative aspect-square w-full">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="cad-hero-glow-orb-1 absolute left-[5%] top-[15%] h-[58%] w-[62%] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.7)_0%,rgba(0,140,255,0.35)_45%,transparent_70%)] blur-3xl" />
                <div className="cad-hero-glow-orb-2 absolute bottom-[10%] right-[0%] h-[48%] w-[52%] rounded-full bg-[radial-gradient(circle,rgba(0,160,255,0.55)_0%,rgba(0,100,255,0.2)_50%,transparent_72%)] blur-[48px]" />
                <div className="cad-hero-glow-orb-3 absolute bottom-[28%] left-[28%] h-[32%] w-[36%] rounded-full bg-[radial-gradient(circle,rgba(80,220,255,0.5)_0%,transparent_68%)] blur-2xl" />
              </div>
              <img
                src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/ip4-1.png"
                alt=""
                className="relative z-10 h-full w-full object-contain opacity-50 sm:opacity-70"
              />
            </div>
          </div>

          <div className="relative z-10 mx-auto !pt-[20vh] flex max-w-7xl flex-col gap-6 px-4 py-12 md:py-16 lg:py-24">
            <div>
              <h4>
                CAD <span className="text-[#ff6726]">SERVICES</span>
              </h4>
              <h1 className="max-w-3xl !text-6xl !leading-none font-bold text-white pt-5">
                <span className="text-[#ff6726]">Precision</span> CAD Models and
                Technical Drawings That Keep Projects Moving
              </h1>
              <h3 className="max-w-2xl text-lg text-white/80">
                Accurate design data is the foundation of every successful
                engineering project. Whether you are developing a new product,
                documenting an existing design, or preparing files for
                fabrication, well-structured CAD models and drawings are
                essential.
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link href={quotePageUrl("cad")} className="button-primary inline-block">
                  Start Your CAD Project
                </Link>
                <Link href="/contact" className="button-secondary inline-block">
                  Request a Consultation
                </Link>
              </div>
            </div>
          </div>
          <div className="relative z-10 py-8">
            <ExtraBadges />
          </div>
        </DotPattern>
      </div>

      {/* PROBLEM RECOGNITION — S2 */}
      <section className="bg-[#f8f9fa] py-24 text-left md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="text-left lg:col-span-5 lg:col-start-1 xl:col-span-5">
              <h2 className="max-w-xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-neutral-950 max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-5xl lg:text-[2.75rem] lg:leading-[1.06]">
                FormaSharp CAD Services
              </h2>
              <p className="mx-auto max-w-3xl max-md:!text-[1.125rem]">
                CAD services convert ideas and engineering requirements into
                structured digital models and manufacturing documentation.
                FormaSharp develops CAD deliverables that are clear, accurate, and
                easy for internal teams, suppliers, and manufacturers to use.
              </p>

              <Link href="/contact" className="button-tertiary mt-10 inline-block w-fit">
                Book a Consultation →
              </Link>
            </div>

            <div className="w-full lg:col-span-7 lg:col-start-6 xl:col-span-7 xl:col-start-6">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 max-md:rounded-2xl lg:aspect-[5/4] lg:min-h-[min(520px,55vh)]">
                <img
                  src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/photo-1730266681489-12825532acb2.jpeg"
                  alt="Engineering and CAD documentation"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CAPABILITIES — mobile accordion; desktop exact tabs */}
      <section
        id="capabilities"
        className="border-y border-black/5 bg-stone-50 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-4xl md:mb-16">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              CAD Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-black max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl">
              Structured CAD deliverables,
              <br />
              tailored to your project requirements.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/70 max-md:!text-[1.125rem] md:text-lg">
              From single components to complex assemblies, we create organized
              design files that support product development, quoting,
              prototyping, and production.
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
                          href={quotePageUrl("cad")}
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

          {/* Desktop: exact tabs + panel */}
          <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-12 md:gap-10">
            <div
              role="tablist"
              aria-label="CAD capabilities"
              className="md:col-span-4 md:flex md:flex-col md:gap-1"
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
                    aria-controls={`cad-cap-panel-${index}`}
                    id={`cad-cap-tab-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group relative flex items-center gap-3 whitespace-normal border-l-2 px-5 py-3 text-left transition-colors",
                      CAPABILITY_MOTION,
                      isActive
                        ? "border-[#ff6726] bg-transparent"
                        : "border-transparent bg-transparent hover:bg-black/5"
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
                        "text-base font-semibold transition-colors",
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
              id={`cad-cap-panel-${activeIndex}`}
              aria-labelledby={`cad-cap-tab-${activeIndex}`}
              className="rounded-2xl border border-black/5 bg-blue-900/10 p-8 shadow-sm md:col-span-8"
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
                      href={quotePageUrl("cad")}
                      className="group/cta inline-flex w-fit items-center gap-3 rounded-full bg-[#121926] py-2 pl-5 pr-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#ff6726]"
                    >
                      <span>Discuss this capability</span>
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

      {/* PROCESS — S5 */}
      <section className="relative z-10 bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl md:mb-16">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Our CAD Development Process
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl">
              A Structured Workflow for Accurate Engineering Deliverables
            </h2>
            <p className="mt-4 text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
              Our CAD process is designed to create reliable models and
              documentation while keeping projects organized and efficient.
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

      {/* APPLICATIONS & INDUSTRIES — S6 */}
      <section
        aria-labelledby="cad-industries-heading"
        className="bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-5xl md:mb-14">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Applications & Industries
            </div>
            <h2
              id="cad-industries-heading"
              className="text-3xl font-bold tracking-tight text-white max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl"
            >
              CAD Services for Product Development, Manufacturing, and
              Engineering Support
            </h2>
            <p className="mt-4 text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
              Accurate CAD data is essential across nearly every industry that
              relies on engineered products and fabricated components.
            </p>
          </div>

          <div
            className={cn(
              "-mx-6 flex gap-4 overflow-x-auto px-6 pb-2",
              "md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0",
              "lg:grid-cols-3 xl:grid-cols-5"
            )}
          >
            {INDUSTRIES.map((item) => (
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
      </section>

      <CadShowcase />

      {/* RELATED SERVICES — S8 (chip row)
      <section className="bg-stone-50 border-y border-black/5 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Related Services
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
            CAD services are frequently used alongside:
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            These services work together to create, validate, and prepare
            products for production.
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

      {/* FINAL CTA — S9 */}
      <DotPattern className="bg-black/95">
        <div
          id="cta"
          className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32"
        >
          <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Get Started
          </div>
          <h1 className="!text-6xl !leading-none font-bold text-white max-md:!text-[2rem] max-md:!leading-[1.1]">
            Turn Your Concepts and Requirements into{" "}
            <span className="italic text-[#ff6726]">
              Accurate Engineering Files
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
            Whether you need a new CAD model, manufacturing drawings, or updates
            to an existing design, FormaSharp can provide the technical
            documentation required to keep your project moving. Share your
            sketches, specifications, or current files, and our team will help
            determine the most efficient way to support your project.
          </p>
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 max-md:w-full max-md:items-stretch max-md:gap-3 sm:flex-row">
            <Link
              href={quotePageUrl("cad")}
              className="button-primary inline-block max-md:w-full max-md:text-center"
            >
              Start Your CAD Project
            </Link>
            <Link
              href="/contact"
              className="button-secondary inline-block max-md:w-full max-md:text-center"
            >
              Request a Consultation
            </Link>
          </div>
          <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
            3D Modeling · Assemblies · Drawings · BOMs · Revisions · Renderings
          </div>
        </div>
      </DotPattern>
    </div>
    </>
  );
}

export default CADServices;
