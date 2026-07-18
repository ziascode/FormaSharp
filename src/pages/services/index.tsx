import Link from "next/link";
import type { ReactNode } from "react";
import Seo from "@/components/Seo";
import { DotPattern } from "@/components/ui/DotPatternProps";
import { quotePageUrl } from "@/lib/quoteForm";
import { section } from "@/lib/sectionSpacing";

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "square" as const,
};

const ICONS = {
  productDesign: (
    <svg {...iconProps}>
      <path d="M24 6 L40 14 V34 L24 42 L8 34 V14 Z" />
      <path d="M8 14 L24 22 L40 14" />
      <path d="M24 22 V42" />
      <path d="M16 10 L32 18" strokeDasharray="2.5 3" />
    </svg>
  ),
  industrialDesign: (
    <svg {...iconProps}>
      <path d="M10 38 L28 20" />
      <path d="M28 20 l6 -6 a4.24 4.24 0 0 1 6 6 l-6 6 z" />
      <path d="M10 38 l-3 3 l1 -7 z" />
      <path d="M6 8 H20" />
      <path d="M6 8 V22" strokeDasharray="2.5 3" />
    </svg>
  ),
  simulation: (
    <svg {...iconProps}>
      <circle cx="24" cy="24" r="7" />
      <path d="M24 6 V13" />
      <path d="M24 35 V42" />
      <path d="M6 24 H13" />
      <path d="M35 24 H42" />
      <path d="M11 11 l5 5" strokeDasharray="2.5 3" />
      <path d="M32 32 l5 5" strokeDasharray="2.5 3" />
      <path d="M37 11 l-5 5" strokeDasharray="2.5 3" />
      <path d="M16 32 l-5 5" strokeDasharray="2.5 3" />
    </svg>
  ),
  printing: (
    <svg {...iconProps}>
      <path d="M8 7 H40" />
      <path d="M10 7 V37 M38 7 V37" />
      <path d="M19 7 h10 v5 l-5 5 l-5 -5 z" />
      <path d="M24 19 V24" strokeDasharray="2.5 3" />
      <path d="M17 25 h14 v11 h-14 z" />
      <path d="M17 30 h14" />
      <path d="M6 41 H42" />
    </svg>
  ),
  cad: (
    <svg {...iconProps}>
      <path d="M8 8 H40 V40 H8 Z" />
      <path d="M8 16 H40" />
      <path d="M16 8 V16" />
      <path d="M14 24 h12 v10 h-12 z" />
      <path d="M30 24 h4 M30 29 h4 M30 34 h4" strokeDasharray="2.5 3" />
    </svg>
  ),
  reverse: (
    <svg {...iconProps}>
      <path d="M14 14 h13 v13 h-13 z" />
      <path d="M20.5 14 V27 M14 20.5 H27" strokeDasharray="2.5 3" />
      <circle cx="30" cy="30" r="9" />
      <path d="M37 37 L43 43" />
    </svg>
  ),
  dfm: (
    <svg {...iconProps}>
      <path d="M6 41 V17 l10 7 V17 l10 7 V10 h16 v31" />
      <path d="M6 41 H42" />
      <path d="M34 17 h4 M34 24 h4 M34 31 h4" strokeDasharray="2.5 3" />
    </svg>
  ),
};

type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

const SERVICES: ServiceItem[] = [
  {
    title: "Mechanical Engineering & Simulation",
    description:
      "Performance validated with detailed engineering analysis before you build.",
    href: "/Simulation",
    icon: ICONS.simulation,
  },
  {
    title: "Product Design",
    description:
      "Ideas engineered into production-ready products with functional mechanical systems.",
    href: "/ProductDesign",
    icon: ICONS.productDesign,
  },
  {
    title: "Industrial Design",
    description:
      "Product form, usability, and visual appeal balanced with manufacturability.",
    href: "/IndustrialDesign",
    icon: ICONS.industrialDesign,
  },
  {
    title: "Design for Manufacturing (DFM)",
    description:
      "Designs optimized for efficient, scalable, and cost-effective production.",
    href: "/DesignForManufacturing",
    icon: ICONS.dfm,
  },
  {
    title: "CAD Services",
    description:
      "Precise 3D models, assemblies, and technical drawings for engineering and production.",
    href: "/CADServices",
    icon: ICONS.cad,
  },
  {
    title: "Reverse Engineering",
    description:
      "Accurate CAD models rebuilt from existing parts for reproduction or improvement.",
    href: "/ReverseEngineering",
    icon: ICONS.reverse,
  },
  {
    title: "Prototyping & 3D Printing",
    description:
      "Rapid prototyping and low-volume production in engineering-grade materials.",
    href: "/3dprinting",
    icon: ICONS.printing,
  },
];

export default function ServicesIndex() {
  return (
    <>
      <Seo
        title="Services"
        description="Engineering services in Toronto and Ontario: product design, CAD, simulation, reverse engineering, DFM, and 3D printing from FormaSharp."
        canonical="/services"
      />

      {/* HERO */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-[#0a0f1e] md:min-h-[55vh]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.40), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-2 !pt-42 text-center md:py-8">
          <h1 className="!mb-0 !text-[2rem] !font-semibold !leading-[1.1] !tracking-tight !text-white md:!text-6xl md:!leading-none lg:!text-7xl">
            Engineering Services
          </h1>
          <p className="mt-10 max-w-full md:w-[75vw] text-center  text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
            We provide engineering services in Toronto and across
            Ontario. We help teams take products from concept to
            production with clear, build-ready deliverables. <span className="hidden md:inline">Use this page to find the service you need and how it fits into
            your development process.</span>
          </p>
          
        </div>
      </section>

      {/* SERVICES GRID — homepage card shape, current blue/white colors */}
      <section className={`w-full bg-white ${section.padding}`}>
        <style>{`
          .svc-card {
            position: relative;
            display: block;
            width: 100%;
            aspect-ratio: 1 / 1;
            clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
            background: #01628a;
            padding: 2px;
            box-sizing: border-box;
            text-decoration: none;
            cursor: pointer;
            transition: transform 0.12s cubic-bezier(.22,.61,.36,1);
          }
          .svc-card:hover { transform: translateY(-3px); }
          .svc-card-inner {
            height: 100%;
            width: 100%;
            clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%);
            background: #ffffff;
            padding: 16px 18px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            transition: background 0.15s ease;
          }
          .svc-card:hover .svc-card-inner { background: #01628a; }
          .svc-icontile {
            width: 44px; height: 44px; border-radius: 8px; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            background: rgba(1, 98, 138, 0.08);
            color: #ff6726;
            transition: background 0.15s ease, color 0.15s ease;
          }
          .svc-card:hover .svc-icontile {
            background: rgba(255,255,255,0.12);
            color: #ffffff;
          }
          .svc-card svg { transition: stroke 0.15s ease; }
          .svc-title {
            margin: 0 0 10px;
            font-size: clamp(16px, 1.5vw, 22px);
            font-weight: 700;
            letter-spacing: -0.01em;
            color: #01628a;
            line-height: 1.15;
            font-family: 'Clash Grotesk', 'Helvetica Neue', Helvetica, sans-serif;
            transition: color 0.15s ease;
          }
          .svc-card:hover .svc-title { color: #ffffff; }
          .svc-desc {
            margin: 0;
            font-size: clamp(13px, 0.95vw, 15px);
            line-height: 1.45;
            color: rgba(0,0,0,0.7);
            font-weight: 400;
            transition: color 0.15s ease;
          }
          .svc-card:hover .svc-desc { color: #ffffff; }
          .svc-see {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.12em;
            color: #01628a;
            transition: letter-spacing 0.12s ease, color 0.15s ease;
          }
          .svc-card:hover .svc-see { letter-spacing: 0.2em; color: #ffffff; }
          .svc-sq { background: #01628a; transition: background 0.15s ease; }
          .svc-sq-half { background: rgba(1, 98, 138, 0.45); }
          .svc-card:hover .svc-sq { background: #ffffff; }
          .svc-card:hover .svc-sq-half { background: rgba(255,255,255,0.5); }
          @media (max-width: 767px) {
            .svc-card {
              aspect-ratio: 1 / 1;
              min-height: 0;
              transition: none;
            }
            .svc-card:hover { transform: none; }
            .svc-card-inner {
              padding: 12px;
              background: #01628a;
              transition: none;
            }
            .svc-icontile {
              width: 40px;
              height: 40px;
              background: rgba(255,255,255,0.12);
              color: #ffffff;
              transition: none;
            }
            .svc-icontile svg { width: 24px; height: 24px; }
            .svc-title {
              font-size: 0.9375rem;
              margin-bottom: 0;
              color: #ffffff;
              transition: none;
            }
            .svc-desc { display: none; }
            .svc-see {
              font-size: 9px;
              color: #ffffff;
              letter-spacing: 0.2em;
              transition: none;
            }
            .svc-sq {
              background: #ffffff;
              transition: none;
            }
            .svc-sq-half { background: rgba(255,255,255,0.5); }
          }
        `}</style>
        <div className={section.container}>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href} className="svc-card">
                <div className="svc-card-inner">
                  <div className="svc-icontile">{service.icon}</div>
                  <div style={{ flex: 1 }} />
                  <h2 className="svc-title">{service.title}</h2>
                  <p className="svc-desc">{service.description}</p>
                  <div style={{ flex: 1 }} />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <span className="svc-see">[ LEARN MORE&nbsp;&nbsp;+ ]</span>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "7px 7px",
                        gridTemplateRows: "7px 7px",
                        gap: 4,
                      }}
                    >
                      <div />
                      <div className="svc-sq svc-sq-half" />
                      <div className="svc-sq" />
                      <div className="svc-sq" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <DotPattern className="bg-black/95">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32">
          <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Get Started
          </div>
          <h2 className="!text-6xl !leading-none font-bold text-white max-md:!text-[2rem] max-md:!leading-[1.1]">
            Not sure which service{" "}
            <span className="italic text-[#ff6726]">fits your project</span>?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
            Tell us where you are in your project and we&apos;ll
            recommend the right path forward.
          </p>
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 max-md:w-full max-md:items-stretch max-md:gap-3 sm:flex-row">
            <Link
              href={quotePageUrl()}
              className="button-primary inline-block max-md:w-full max-md:text-center"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="button-secondary inline-block max-md:w-full max-md:text-center"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </DotPattern>
    </>
  );
}
