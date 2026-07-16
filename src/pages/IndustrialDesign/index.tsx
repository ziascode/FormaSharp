import Link from "next/link";
import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  Hand,
  Image as ImageIcon,
  Palette,
  Sparkles,
} from "lucide-react";
import { DotPattern } from "@/components/ui/DotPatternProps";
import { IndustrialDesignShowcase } from "@/components/ui/industrial-design-showcase";
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
    tag: "Form",
    title: "Product Form Development",
    description:
      "The physical form of a product shapes the first impression users have when they see or interact with it. Proportions, silhouette, geometry, and surface treatment all contribute to how a product communicates quality and purpose.",
    bullets: [
      "Proportions and silhouette development",
      "Surface treatment and geometry",
      "Modern, rugged, or consumer-focused aesthetics",
      "Design direction tailored to audience and application",
    ],
    icon: Palette,
  },
  {
    tag: "Ergonomics",
    title: "Ergonomics & User Interaction",
    description:
      "Products should feel intuitive from the moment they are used. We evaluate how users physically interact with products by considering grip, comfort, accessibility, reach, movement, and repeated use scenarios.",
    bullets: [
      "Handheld products",
      "Tools and equipment",
      "Wearable devices",
      "Frequently used consumer products",
    ],
    icon: Hand,
  },
  {
    tag: "Visualization",
    title: "Concept Visualization & Rendering",
    description:
      "Strong visual communication is essential during product development. Our design team produces high-quality renderings and concept visuals that help clients evaluate design direction before physical development begins.",
    bullets: [
      "Internal approvals",
      "Investor presentations",
      "Marketing preparation",
      "Concept evaluation",
      "Early stakeholder feedback",
    ],
    icon: ImageIcon,
  },
  {
    tag: "Refinement",
    title: "Design Refinement & Aesthetic Development",
    description:
      "The refinement stage focuses on elevating the overall product experience. Small adjustments to geometry, transitions, proportions, and detailing can dramatically improve how polished a product feels.",
    bullets: [
      "Refining product surfaces",
      "Simplifying visual complexity",
      "Improving visual consistency",
      "Aligning design language across product lines",
    ], 
    icon: Sparkles, 
  },
];  

type IndustryItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const CARD_IMAGE_PLACEHOLDER =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/photo-1730266681489-12825532acb2.jpeg";

const INDUSTRIES: IndustryItem[] = [
  {
    title: "Consumer Products",
    description:
      "Developing products that combine usability, strong visual identity, and intuitive interaction for retail and consumer-facing markets.",
    imageSrc: CARD_IMAGE_PLACEHOLDER,
    imageAlt: "Consumer product industrial design context",
  },
  {
    title: "Professional Tools & Equipment",
    description:
      "Designing durable and ergonomic products used in industrial, commercial, and professional environments.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/dfm2.jpg",
    imageAlt: "Professional tools industrial design context",
  },
  {
    title: "Startup Hardware Products",
    description:
      "Helping emerging companies develop polished product concepts that communicate professionalism and market readiness.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/cad-early-stage-design.jpg",
    imageAlt: "Startup hardware industrial design context",
  },
  {
    title: "Medical & Technical Devices",
    description:
      "Creating clean, approachable product designs that balance usability, clarity, and technical function.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/ecommerce-engi.jpg",
    imageAlt: "Medical and technical device design context",
  },
  {
    title: "Smart Devices & Electronics",
    description:
      "Refining the interaction and appearance of connected devices, electronic enclosures, and technology-driven products.",
    imageSrc:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/cad-design.jpg",
    imageAlt: "Smart device industrial design context",
  },
];

type ProcessStep = {
  title: string;
  description: string;
  detail?: string;
  bullets?: string[];
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Discovery & Product Understanding",
    description:
      "We begin by learning about the product, target audience, intended use environment, and business goals. This stage helps establish the visual direction and usability priorities that will guide the project.",
    detail:
      "We also identify constraints related to engineering, manufacturing, materials, or market positioning early in the process.",
  },
  {
    title: "Concept Exploration",
    description:
      "Initial concepts are developed to explore different visual directions, product layouts, and interaction approaches. This stage encourages creativity while helping narrow down the strongest ideas.",
    bullets: [
      "Rough sketches",
      "Digital concepts",
      "Design references",
      "Form studies",
      "Usability considerations",
    ],
  },
  {
    title: "Design Development",
    description:
      "Once a direction is selected, the design is refined into a more detailed and structured product concept. Proportions, ergonomics, surfaces, and component relationships are adjusted to improve both usability and visual quality.",
    detail:
      "This stage involves close collaboration between industrial design and engineering development.",
  },
  {
    title: "Visualization & Feedback",
    description:
      "Detailed renderings and visual presentations are created to communicate the design clearly. These materials help stakeholders evaluate the product and provide feedback before prototyping begins.",
    detail:
      "Iterative feedback during this stage helps strengthen the final design outcome.",
  },
  {
    title: "Engineering Coordination",
    description:
      "As the design progresses toward development, we coordinate closely with CAD and engineering workflows to ensure the product remains practical to manufacture and assemble.",
    detail:
      "This alignment reduces redesigns later in the development process and creates a smoother transition into prototyping and production preparation.",
  },
];

const RELATED_SERVICES = [
  { label: "Product Design", href: "/ProductDesign" },
  { label: "Mechanical Engineering & Simulation", href: "/Simulation" },
  { label: "CAD Services", href: "/CADServices" },
  { label: "Prototyping & 3D Printing", href: "/3dprinting" },
  { label: "Design for Manufacturing", href: "/DesignForManufacturing" },
];

const PROBLEM_SIGNALS = [
  "An early-stage concept needs visual direction",
  "A product feels too technical or visually outdated",
  "User interaction and ergonomics require improvement",
  "A prototype lacks refinement or brand identity",
  "A design must stand out in a competitive market",
];

const SERVICE_SUPPORTS = [
  "Consumer product development",
  "Product appearance refinement",
  "Ergonomic improvement",
  "Product visualization",
  "Early-stage concept development",
  "Design refinement prior to prototyping",
];

const INDUSTRY_CARD_SCRIM =
  "bg-[linear-gradient(to_top,#242c37_0%,#242c37_60%,transparent_100%)]";

const CAPABILITY_MOTION =
  "duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

function IndustrialDesign() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCapability = CAPABILITIES[activeIndex];

  return (
    <div>
      {/* HERO */}
      <div className="relative min-h-[100vh] overflow-hidden bg-[#121926]">
        <img
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/ergo-obj-1.jpg"
          alt=""
          fetchPriority="high"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top_right,rgba(18,25,38,0.46)_20%,rgba(18,25,38,0.36)_45%,rgba(18,25,38,0.21)_70%,rgba(18,25,38,0.09)_82%,transparent_92%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto !pt-[20vh] flex max-w-7xl flex-col gap-6 px-4 py-12 md:py-16 lg:py-24">
          <div>
            <h4>
              INDUSTRIAL <span className="text-[#ff6726]">DESIGN</span>
            </h4>
            <h1 className="max-w-4xl !text-6xl !leading-none font-bold text-white pt-5">
              Industrial Design for Products People Want to{" "}
              <span className="text-[#ff6726]">Use</span>
            </h1>
            <h3 className="max-w-2xl text-lg text-white/80">
              FormaSharp's industrial design practice balances usability,
              aesthetics, and engineering, so your product looks right, feels
              right, and performs in the real world.
            </h3>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <Link href={quotePageUrl("industrial-design")} className="button-primary inline-block">
                Discuss Your Product Concept
              </Link>
              <a href="#capabilities" className="button-secondary inline-block">
                View Our Design Services
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-10 py-8">
          <ExtraBadges />
        </div>
      </div>

      {/* PROBLEM RECOGNITION */}
      <section className="bg-[#f8f9fa] py-24 text-left md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <div className="text-left lg:col-span-5">
              <h2 className="max-w-xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-neutral-950 md:text-5xl">
                Products Need More Than Functionality to Succeed
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 md:text-lg">
                A product may perform well technically, but if it feels awkward
                to use, lacks visual appeal, or fails to connect with its
                audience, it can struggle in the market.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-700 md:text-lg">
                Industrial design bridges the gap between engineering and user
                experience. It shapes how a product is perceived, how intuitive
                it feels, and how effectively it communicates value to the end
                user.
              </p>
              <Link href="/contact" className="button-tertiary mt-10 inline-block w-fit">
                Book a Consultation →
              </Link>
            </div>

            <div className="w-full lg:col-span-7">
              <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
                <p className="!mb-4 !text-base font-semibold text-neutral-900">
                  Companies often seek industrial design support when:
                </p>
                <ul className="space-y-3">
                  {PROBLEM_SIGNALS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-[#ff6726]"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span className="text-base leading-relaxed text-neutral-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 !mb-0 !text-base leading-relaxed text-neutral-600">
                  FormaSharp approaches industrial design with a balance of
                  creativity and technical awareness. Every design decision
                  considers appearance, usability, manufacturing feasibility,
                  durability, and product intent. The goal is to create products
                  that feel purposeful, intuitive, and professionally developed.
                </p>
              </div>
              <div className="mt-6 aspect-[4/3] w-full overflow-hidden bg-neutral-200 lg:aspect-[5/4]">
                <img
                  src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/egg-1.jpg"
                  alt="Industrial design concept development"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT SERVICES INCLUDE */}
      <section className="border-y border-black/5 bg-stone-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
                What We Include
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
                Designing Products Around the User Experience
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
                Industrial design influences nearly every aspect of how users
                interact with a product. Shape, proportion, surface transitions,
                tactile interaction, and usability all contribute to how a product
                is experienced in the hands of the user.
              </p>
              <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
                FormaSharp develops industrial design solutions that align product
                functionality with human interaction and visual identity. Our team
                works closely with engineering requirements while refining the
                physical form of the product to ensure it feels cohesive,
                intentional, and user-focused.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
              <p className="!mb-4 !text-base font-semibold text-neutral-900">
                Our industrial design services support:
              </p>
              <ul className="space-y-3">
                {SERVICE_SUPPORTS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-[#ff6726]"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-neutral-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 !mb-0 !text-base leading-relaxed text-neutral-600">
                By combining industrial design thinking with engineering
                awareness, we help ensure that product concepts remain practical
                throughout development while still achieving a refined and
                professional appearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section
        id="capabilities"
        className="border-y border-black/5 bg-white py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl md:mb-16">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Industrial Design Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
              Form, ergonomics, visualization, and refinement
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
              From early concept exploration to refined product form development,
              we design products that are visually compelling while remaining
              practical to produce.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
            <div
              role="tablist"
              aria-label="Industrial design capabilities"
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
                    aria-controls={`id-cap-panel-${index}`}
                    id={`id-cap-tab-${index}`}
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
                        "size-8 shrink-0 transition-colors md:size-10",
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
              id={`id-cap-panel-${activeIndex}`}
              aria-labelledby={`id-cap-tab-${activeIndex}`}
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
                      href={quotePageUrl("industrial-design")}
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

      {/* PROCESS */}
      <section className="relative z-10 bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl md:mb-16">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Our Industrial Design Process
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              A Thoughtful Approach to Product Experience
            </h2>
            <p className="mt-4 text-base leading-relaxed !text-white md:text-lg">
              Industrial design is most effective when it follows a structured
              process that considers both user needs and technical limitations.
              Our workflow encourages exploration while keeping projects grounded
              in practical development goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                {step.detail ? (
                  <p className="mt-3 !text-sm !text-white/65">{step.detail}</p>
                ) : null}
                {step.bullets ? (
                  <ul className="mt-4 space-y-2">
                    {step.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-white/75"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#ff6726]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>


      <IndustrialDesignShowcase />

     

      {/* FINAL CTA */}
      <DotPattern className="bg-black/95">
        <div
          id="cta"
          className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32"
        >
          <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Get Started
          </div>
          <h1 className="!text-6xl !leading-none font-bold text-white">
            Create a Product Experience That Feels{" "}
            <span className="italic text-[#ff6726]">Thoughtfully Designed</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
            Whether you are developing a new consumer product, refining usability,
            or improving the appearance of an existing concept, FormaSharp can
            help translate ideas into refined product experiences that balance
            design intent with technical practicality. Tell us about your product
            goals, target users, or current development stage.
          </p>
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
            <Link href={quotePageUrl("industrial-design")} className="button-primary inline-block">
              Start Your Design Project
            </Link>
            <Link href="/contact" className="button-secondary inline-block">
              Schedule a Consultation
            </Link>
          </div>
          <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
            Form Development · Ergonomics · Visualization · Refinement ·
            Engineering Coordination
          </div>
        </div>
      </DotPattern>
    </div>
  );
}

export default IndustrialDesign;
