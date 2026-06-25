import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Box, Microscope, Minimize2, Thermometer, Wind } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { DotPattern } from "@/components/ui/DotPatternProps";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { SimulationShowcase } from "@/components/ui/simulation-showcase";
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
  // {
  //   tag: "FEA / Structural",
  //   title: "Finite Element Analysis",
  //   description:
  //     "Find out if your part will survive real operating loads before you cut a single piece of material.",
  //   bullets: [
  //     "Stress & force evaluation",
  //     "Deflection & deformation",
  //     "Vibration & fatigue life",
  //     "Factor of safety mapping",
  //     "Pressure & constraints",
  //   ],
  //   colSpan: 2,
  //   icon: Box,
  // },
  // {
  //   tag: "CFD / Fluid",
  //   title: "Computational Fluid Dynamics",
  //   description:
  //     "CFD models the movement of air and liquids through and around a product.",
  //   bullets: [
  //     "Cooling performance",
  //     "Aerodynamic  Optimization",
  //     "Pressure distribution",
  //     "Fan & duct optimization",
  //     "Internal fluid behavior",
  //   ],
  //   colSpan: 2,
  //   icon: Wind,
  // },
  {
    tag: "Thermal",
    title: "Thermal Analysis",
    description:
      "Identify hot spots, heat transfer failures, and cooling limits before they damage your product or your reputation.",
    bullets: [
      "Hot spot detection",
      "Heat transfer mapping",
      "Cooling system limits",
      "Thermal reliability risks",
      "Electronics & battery systems",
    ],
    colSpan: 2,
    icon: Thermometer,
  },
  {
    tag: "Optimization",
    title: "Structural Optimization",
    description:
      "Remove weight and material without sacrificing strength. Cut cost without cutting performance.",
    bullets: [
      "Geometry refinement",
      "Strength-to-weight ratio",
      "Material reduction",
      "Manufacturability review",
    ],
    colSpan: 2,
    icon: Minimize2,
  },
  {
    tag: "Forensics",
    title: "Failure Investigation",
    description:
      "Something cracked, distorted, or overheated. We use simulation to diagnose the cause and prescribe the fix.",
    bullets: [
      "Root cause identification",
      "Redesign recommendations",
      "Engineering-backed evidence",
      "Prevention analysis",
    ],
    colSpan: 2,
    icon: Microscope,
  },
];

type WhoWeWorkWithItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const CARD_IMAGE_PLACEHOLDER =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/ecommerce-engi.jpg";

const WHO_WE_WORK_WITH: WhoWeWorkWithItem[] = [
  {
    title: "Consumer Electronics",
    description:
      "Enclosure cooling, thermal management, structural performance for compact devices.",
    imageSrc: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/premium_photo-1710962439403-a35fbc684b15.jpeg",
    imageAlt: "Engineering workspace representing consumer electronics development",
  },
  {
    title: "Industrial Equipment",
    description:
      "Brackets, housings, and structural assemblies under demanding operating conditions.",
    imageSrc: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/6indus-scaled.jpg",
    imageAlt: "Industrial equipment and structural engineering context",
  },
  {
    title: "Automotive",
    description:
      "Vibration, heat transfer, and mechanical stress for vehicle systems and hardware.",
    imageSrc: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/2cars-scaled.jpg",
    imageAlt: "Automotive engineering and vehicle systems analysis",
  },
  {
    title: "Medical Devices",
    description:
      "Precision validation where durability, reliability, and thermal control are non-negotiable.",
    imageSrc: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/3med-scaled.jpg",
    imageAlt: "Medical device engineering and precision validation",
  },
  {
    title: "R&D & Innovation",
    description:
      "Concept studies, engineering investigations, and design comparison for emerging products.",
    imageSrc: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/randd.jpg",
    imageAlt: "Research and development engineering workspace",
  },
];

/** Solid slate at the bottom of the scrim, short fade to transparent at the top of the scrim element. */
const WHO_WE_CARD_SCRIM =
  "bg-[linear-gradient(to_top,#242c37_0%,#242c37_60%,transparent_100%)]";

/** Same 800ms + easing on every capability card surface and text node. */
const CAPABILITY_MOTION =
  "duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function Simulation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const highlightedIndex = hoveredIndex ?? activeIndex;

  return (
    <div>

    {/* HERO — video background */}
    <div className="relative min-h-[100vh] overflow-hidden bg-[#121926]">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/rc4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      {/* Diagonal scrim: darker bottom-left for hero copy, fading transparent toward top-right */}
      <div
        
      />
      <div className="relative z-10 mx-auto !pt-[20vh] flex flex-row items-center justify-start max-w-7xl flex-col gap-6 px-4 py-12 md:py-16 lg:py-24">
        <div>
            <h4>MECHANICAL ENGINEERING & <span className="text-[#ff6726]">SIMULATION</span></h4>
            <h1 className="max-w-3xl !text-6xl !leading-none font-bold text-white pt-5">
            Better engineering decisions start <span className="text-[#ff6726]">before</span> production.
            </h1>
            <h3 className="max-w-2xl text-lg text-white/80">
            Formasharp uses thermal analysis, structural optimization, and failure investigation to reveal crucial fail points in your design, before manufacturing locks you in. Fewer prototypes. No surprises at production.
            </h3>
            <div>
            <InteractiveHoverButton className="button-primary">
            Request Engineering Analysis
            </InteractiveHoverButton>
            </div>
        </div>
        
        
      </div>
      <div className="relative z-10 py-8">
        <ExtraBadges/>
      </div>
    </div>

  

    {/* SERVICES — Capabilities (from static HTML → JSX) */}
    <section
      id="services"
      className="border-y border-black/5 bg-stone-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-12 max-w-3xl md:mb-16 ">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Capabilities
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            Every tool you need
            <br />
            to validate a design.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            From structural integrity to aerodynamic  optimization and failure
            investigation, FormaSharp covers the full spectrum of mechanical
            engineering simulation.
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

  {/* intro section for engineering analysis */}
    <div className="max-w-7xl mx-auto px-6 py-26 !mb-[-35vh]">
       {/* <ExtraBadges /> */}
       <div className="text-black/90 flex flex-col justify-center text-center">
        <h2 className=" max-w-2xl mx-auto"> Engineering analysis<span className="text-[#ff6726]"> for early-stage design</span></h2>
        <p className=" max-w-7xl mx-auto"> Engineering decisions carry real consequences. A component that appears robust on screen
may crack under load or overheat during operation.
FormaSharp provides mechanical engineering and simulation services that help startups,
manufacturers, and engineering teams evaluate designs before committing to tooling or
production. We uncover performance issues early and identify opportunities for
improvement.</p>
        <button className="button-tertiary mx-auto">Book a Consultation →</button>
       </div>
    </div>

    <div className="relative z-20 h-[70vh] flex items-center justify-center max-w-7xl mx-auto translate-y-[35vh]">
        <div className="w-[80vw] h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
        <img
          className="h-full w-full rounded-2xl object-cover"
          alt="Engineering analysis for early-stage design"
          src="https://cf-images.us-east-1.prod.boltdns.net/v1/static/1532789042001/15289edf-06a6-4ba1-b93c-ae6b104c0de9/c9aea21f-44e3-4083-8b33-993a42a89e71/1280x720/match/image.jpg"   
        />
        </div>
    </div>

    <section
      aria-labelledby="who-we-work-with-heading"
      className="bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-16 md:py-32 "
    >
      <div className="mx-auto max-w-7xl px-6 pt-[35vh]">
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Who we work with
          </div>
          <h2
            id="who-we-work-with-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            Built for teams that can&apos;t afford to guess.
          </h2>
          <p className="mt-4 text-base leading-relaxed !text-white md:text-lg">
            Simulation-backed clarity for product teams shipping hardware under
            real-world constraints.
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

    

    

    {/* <div className="vh-100 relative z-10 flex flex-col items-center justify-center  bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 pb-28 ">
      <h3 className="pt-26">How it works</h3>
      <hr className="w-1/2 border-white/50 pb-12 -translate-y-[1vh] border-top-[#ff6726]" /> 
      <div className="max-w-7xl mx-auto flex flex-row items-center text-center justify-center gap-12 ">
        
        <div className="w-[30%]">
          <h3 className=" !font-extrabold text-white">1. Upload your CAD files</h3>
          <p className="!text-[1em] !text-white !font-light">Send your STL, STEP, or CAD file. We accept all major formats and provide a free DFP (Design for Printability) review with every order.</p>
        </div>

        <div className="w-[30%]">
          <h3 className=" !font-extrabold text-white">2. Get Your Quote</h3>
          <p className="!text-[1em] !text-white !font-light">Receive a transparent quote within 48 hours — material options, lead times, and finish levels clearly outlined.</p>
        </div>

        <div className="w-[30%]">
          <h3 className=" !font-extrabold text-white">3. Print Your Prototype</h3>
          <p className="!text-[1em] !text-white !font-light">We print your prototype using high-resolution, engineering-grade materials — precisely, repeatably, and on your timeline.</p>
        </div>

      </div>
      <button className="button-secondary mt-10 mx-auto !px-18 text-center">Upload a file 
      </button>

    </div> */}

    {/* <hr style={{ border: 'none', borderTop: '1px solid rgb(28, 27, 27)', margin: '20px 0' }} /> */}

    
    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8  py-12 md:pt-32">
            <h2 className=" font-bold text-black w-[40%]">Simulation That Supports Engineering Decisions</h2>
            <p className="text-lg text-black w-[60%]">Engineering analysis is most valuable when results are interpreted in the context of design intent and project goals. FormaSharp combines simulation expertise with product development experience to deliver findings that are technically rigorous and directly actionable. Whether you need to verify structural strength, improve cooling, or investigate a design concern,
            FormaSharp can provide the analysis needed to support better decisions.</p>
        </div>
    

    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8">
        <ImageMasking1  imageSrc="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/4eng-scaled.jpg" className="w-[90%]"/>
        {/* <div className="w-[40%]">
            <h2 className=" text-black">Prototyping is more than just creating a physical model; it is a structured process used to evaluate, improve, and finalize product designs.</h2>
        </div>
         */}
    </div>

    <div className="max-w-7xl mx-auto py-40 px-6 gap-4 flex flex-col items-start justify-start ">
       
        
        <SimulationShowcase />
    </div>

    {/* Final CTA */}
    <DotPattern className="bg-black/95">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
          Get Started
        </div>
        <h1 className="!text-6xl !leading-none font-bold text-white">
          Stop guessing.
          <br />
          Start <span className="italic text-[#ff6726]">knowing</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
          Share your CAD files, design goals, or performance concerns and
          we&apos;ll recommend the most effective engineering approach for your
          project.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <InteractiveHoverButton className="button-primary">
            Request Engineering Analysis
          </InteractiveHoverButton>
          <button className="button-secondary">Speak With an Engineer</button>
        </div>
        <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
          Structural Optimization · Aerodynamic Optimization · Failure Investigation
        </div>
      </div>
    </DotPattern>

    </div>


  );
}

export default Simulation;
