import React, { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Archive, Box, Boxes, FileText, Scan, Wrench } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { DotPattern } from "@/components/ui/DotPatternProps";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { ReverseShowcase } from "@/components/ui/reverse-showcase";
import { cn } from "@/lib/utils";
import ExtraBadges from "@/components/ExtraBadges";

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

/** Same 800ms + easing on every capability card surface and text node. */
const CAPABILITY_MOTION =
  "duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function ReverseEngineering() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const highlightedIndex = hoveredIndex ?? activeIndex;

  const featureVideoRef = useRef<HTMLVideoElement>(null);
  const dirRef = useRef<"fwd" | "rev">("fwd");
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const video = featureVideoRef.current;
    if (!video) return;

    const EPS = 0.08;
    const reverseSpeed = 1;

    const clearRaf = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTsRef.current = null;
    };

    const revFrame = (ts: number) => {
      if (dirRef.current !== "rev") return;
      const last = lastTsRef.current ?? ts;
      lastTsRef.current = ts;
      const dt = Math.min((ts - last) / 1000, 0.05) * reverseSpeed;
      video.currentTime = Math.max(0, video.currentTime - dt);

      if (video.currentTime <= EPS) {
        video.currentTime = 0;
        clearRaf();
        dirRef.current = "fwd";
        void video.play();
        return;
      }
      rafRef.current = requestAnimationFrame(revFrame);
    };

    const startReverse = () => {
      if (dirRef.current !== "fwd") return;
      video.pause();
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = Math.min(
          video.currentTime,
          Math.max(EPS * 2, video.duration - EPS * 2)
        );
      }
      dirRef.current = "rev";
      lastTsRef.current = null;
      clearRaf();
      rafRef.current = requestAnimationFrame(revFrame);
    };

    const onTimeUpdate = () => {
      if (dirRef.current !== "fwd" || !Number.isFinite(video.duration)) return;
      if (video.currentTime >= video.duration - EPS) {
        startReverse();
      }
    };

    const onEnded = () => {
      if (dirRef.current === "fwd") {
        startReverse();
      }
    };

    const kickoff = () => {
      dirRef.current = "fwd";
      void video.play();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      kickoff();
    } else {
      video.addEventListener("loadeddata", kickoff, { once: true });
    }

    return () => {
      clearRaf();
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", kickoff);
      video.pause();
    };
  }, []);

  return (
    <div>

    {/* HERO — S1 */}
    <div className="relative min-h-[100vh] overflow-hidden bg-[#121926]">
      <img
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/re8hd-1.jpg"
        alt=""
        fetchPriority="high"
        aria-hidden
      />
      {/* Diagonal scrim: darker bottom-left for hero copy, fading transparent toward top-right */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top_right,rgba(18,25,38,0.92)_20%,rgba(18,25,38,0.72)_45%,rgba(18,25,38,0.42)_70%,rgba(18,25,38,0.18)_82%,transparent_92%,transparent_100%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto !pt-[40vh] flex flex-row items-center justify-start max-w-7xl flex-col gap-6 px-4 py-8 md:py-16 lg:py-24">
        <div>
            <h4>REVERSE ENGINEERING <span className="text-[#ff6726]">SERVICES</span></h4>
            <h1 className="max-w-3xl !text-6xl !leading-none font-bold text-white pt-5">
            Rebuild <span className="text-[#ff6726]">Accurate CAD Models</span> from Existing Parts
            </h1>
            <h3 className="max-w-2xl text-lg text-white/80">
            Not every component comes with a complete set of design files. When original drawings are missing, outdated, or never created, reverse engineering provides a reliable way to recover the technical data needed to reproduce and improve a part.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
            <InteractiveHoverButton className="button-primary">
            Start Your Reverse Engineering Project
            </InteractiveHoverButton>
            <button className="button-secondary">Request a Consultation</button>
            </div>
        </div>
      </div>
      <div className="relative z-10 py-8">
        <ExtraBadges/>
      </div>
    </div>


   


    {/* S3 — WHAT WE DELIVER (centered intro variation) */}
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="text-black/90 flex flex-col justify-center text-center">
        <h2 className="max-w-3xl mx-auto">
          Digital Engineering Data <span className="text-[#ff6726]">Reconstructed from Physical Components</span>
        </h2>
        <p className="max-w-3xl mx-auto">
          Reverse engineering is the process of capturing the dimensions, features, and relationships of an existing part and rebuilding them as accurate digital models.
        </p>

        <p className="max-w-3xl mx-auto">
          Whether you have a worn component, a supplier sample, or an assembled product, we can convert physical hardware into usable design documentation.
        </p>
      </div>
    </div>


    {/* S4 — CAPABILITIES (Simulation grid pattern) */}
    <section
      id="capabilities"
      className="border-y border-black/5 bg-stone-50 py-16 md:py-24 !mb-[-35vh]"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 max-w-3xl md:mb-16 ">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            Every detail you need
            <br />
            to reproduce a part.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            From measurement and CAD reconstruction to legacy documentation, FormaSharp covers the full reverse engineering workflow.
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

    {/* Feature video — between Capabilities and Process */}
    <div className="relative z-20 mx-auto flex h-[70vh] max-w-7xl translate-y-[35vh] items-center justify-center">
      <div
        className="pointer-events-none relative h-[70vh] w-[80vw] overflow-hidden rounded-2xl bg-black shadow-2xl"
        aria-hidden
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-x-0 top-[-8%] h-[116%] w-full">
            <video
              ref={featureVideoRef}
              className="h-full w-full object-cover object-top"
              src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/refinal.mp4"
              muted
              playsInline
              preload="auto"
            />
          </div>
        </div>
      </div>
    </div>


    {/* S5 — PROCESS (3-col numbered grid on dark gradient) */}
    <section className="relative z-10 bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl pt-[35vh]">
        <div className="mb-12 max-w-3xl md:mb-16">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Our Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            A <span className="text-[#ff6726]">Methodical Approach</span> to Recovering Design Information
          </h2>
          <p className="mt-4 text-base leading-relaxed !text-white md:text-lg">
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
              <p className="!text-base !font-light !text-white/80">
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
      className="bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-16 md:py-32 "
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Applications & Industries
          </div>
          <h2
            id="re-industries-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            Reverse Engineering for Maintenance, Product Development, and <span className="text-[#ff6726]">Modernization</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed !text-white md:text-lg">
            Reverse engineering is valuable whenever physical components must be reproduced, documented, or improved.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {WHO_WE_WORK_WITH.map((item) => (
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


    {/* S7 — WHY FORMA SHARP (preamble + image + accordion, Simulation pattern) */}
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start justify-around gap-14 py-12 md:pt-32">
        <h2 className="font-bold text-black w-full md:w-[40%]">
          Reverse Engineering with <span className="text-[#ff6726]"> Precision</span>
        </h2>
        <div className="w-full md:w-[60%] space-y-4">
          <p className="text-lg text-black">
            Accurate reconstruction requires more than measuring dimensions. It also requires understanding how the part functions and how it interfaces with surrounding components.
          </p>
          <p className="text-lg text-black">
            FormaSharp combines measurement, CAD development, and mechanical engineering to deliver design files that are practical and dependable.
          </p>
        </div>
    </div>


    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8">
        <ImageMasking1 imageSrc="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/4eng-scaled.jpg" className="w-[90%]"/>
    </div>

    <div className="max-w-7xl mx-auto py-40 px-6 gap-4 flex flex-col items-start justify-start ">
        <ReverseShowcase />
    </div>


    {/* S8 — RELATED SERVICES (chip row) */}
    <section className="bg-stone-50 border-y border-black/5 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
          Related Services
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
          Reverse engineering is commonly combined with:
        </h2>
        <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
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
        <h1 className="!text-6xl !leading-none font-bold text-white">
          Recover the <span className="italic text-[#ff6726]">Design Data</span> You Need to Move Forward
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
          Whether you need to reproduce an obsolete part, document a legacy component, or build on an existing design, FormaSharp can convert physical hardware into accurate CAD models and technical drawings.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
          Tell us about the component, assembly, or equipment you need to recreate, and our team will recommend the most effective approach.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <InteractiveHoverButton className="button-primary">
            Start Your Reverse Engineering Project
          </InteractiveHoverButton>
          <button className="button-secondary">Request a Consultation</button>
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
