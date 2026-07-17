"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* Icons drawn in the same line-art style as the reference card:
   stroke #FF6726, strokeWidth 2.4, square caps, 48x48 viewBox */

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "#FF6726",
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

type Service = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    title: "PRODUCT DESIGN",
    description:
      "Ideas engineered into production-ready products with functional mechanical systems.",
    href: "/ProductDesign",
    icon: ICONS.productDesign,
  },
  {
    title: "INDUSTRIAL DESIGN",
    description:
      "Product form, usability, and visual appeal balanced with manufacturability.",
    href: "/IndustrialDesign",
    icon: ICONS.industrialDesign,
  },
  {
    title: "ENG. & SIMULATION",
    description:
      "Performance validated with detailed engineering analysis before you build.",
    href: "/Simulation",
    icon: ICONS.simulation,
  },
  {
    title: "3D PRINTING",
    description:
      "Rapid prototyping and low-volume production in engineering-grade materials.",
    href: "/3dprinting",
    icon: ICONS.printing,
  },
  {
    title: "CAD SERVICES",
    description:
      "Precise 3D models, assemblies, and technical drawings for engineering and production.",
    href: "/CADServices",
    icon: ICONS.cad,
  },
  {
    title: "REVERSE ENGINEERING",
    description:
      "Accurate CAD models rebuilt from existing parts for reproduction or improvement.",
    href: "/ReverseEngineering",
    icon: ICONS.reverse,
  },
  {
    title: "DESIGN FOR MANUFACTURING",
    description:
      "Designs optimized for efficient, scalable, and cost-effective production.",
    href: "/DesignForManufacturing",
    icon: ICONS.dfm,
  },
];

const TOP_ROW = SERVICES.slice(0, 4);
const BOTTOM_ROW = SERVICES.slice(4);

function ServiceCard({ title, description, href, icon }: Service) {
  return (
    <Link href={href} className="fs-card">
      <div className="fs-icontile">{icon}</div>

      <div style={{ flex: 1 }} />

      <h3 className="fs-title">{title}</h3>

      <p className="fs-desc">{description}</p>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <span className="fs-see">[ LEARN MORE&nbsp;&nbsp;+ ]</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "7px 7px",
            gridTemplateRows: "7px 7px",
            gap: 4,
          }}
        >
          <div />
          <div className="fs-sq fs-sq-half" />
          <div className="fs-sq" />
          <div className="fs-sq" />
        </div>
      </div>
    </Link>
  );
}

function ServiceRow({
  services,
  style,
}: {
  services: Service[];
  style: { x: MotionValue<string> };
}) {
  return (
    <motion.div style={style} className="fs-row">
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </motion.div>
  );
}

import { section } from "@/lib/sectionSpacing";

export default function QuickService() {
  const sectionRef = useRef<HTMLElement>(null);

  // Progress goes 0 -> 1 as the section scrolls from entering the viewport
  // to being centered, and back down when scrolling up, so the rows always
  // animate in both scroll directions.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });

  const topX = useTransform(progress, [0, 1], ["55vw", "0vw"]);
  const bottomX = useTransform(progress, [0, 1], ["-55vw", "0vw"]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`scroll-mt-28 overflow-hidden bg-white ${section.padding}`}
    >
      <style>{`
        .fs-card {
          flex: 0 0 auto;
          width: calc((100% - 60px) / 4); /* 60px = 3 gaps x 20px */
          aspect-ratio: 1 / 1; background: #074866;
          clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
          padding: 22px 24px; box-sizing: border-box;
          display: flex; flex-direction: column;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(.22,.61,.36,1), background 0.3s ease;
          text-decoration: none;
        }
        .fs-card:hover { transform: translateY(-3px); background: #ff5e19; }
        .fs-icontile {
          width: 52px; height: 52px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.055); transition: background 0.3s ease;
        }
        .fs-card:hover .fs-icontile { background: rgba(0,0,0,0.15); }
        .fs-card svg { transition: stroke 0.3s ease; }
        .fs-card:hover svg { stroke: #1c1c1c; }
        .fs-title {
          margin: 0 0 10px; font-size: clamp(18px, 1.7vw, 24px); font-weight: 700;
          letter-spacing: -0.01em; color: #FFFFFF; line-height: 1;
          font-family: 'Clash Grotesk', 'Helvetica Neue', Helvetica, sans-serif;
          transition: color 0.3s ease;
        }
        .fs-card:hover .fs-title { color: #1c1c1c; }
        .fs-desc {
          margin: 0; font-size: clamp(13px, 0.95vw, 15px); line-height: 1.45;
          color: rgba(255,255,255,0.85); font-weight: 400;
          transition: color 0.3s ease;
        }
        .fs-card:hover .fs-desc { color: rgba(28,28,28,0.85); }
        .fs-see {
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500;
          letter-spacing: 0.12em; color: #FF6726;
          transition: letter-spacing 0.2s ease, color 0.3s ease;
        }
        .fs-card:hover .fs-see { letter-spacing: 0.2em; color: #1c1c1c; }
        .fs-sq { background: #FF6726; transition: background 0.3s ease; }
        .fs-sq-half { background: rgba(255,103,38,0.5); }
        .fs-card:hover .fs-sq { background: #1c1c1c; }
        .fs-card:hover .fs-sq-half { background: rgba(28,28,28,0.5); }
        .fs-row {
          display: flex; gap: 20px; justify-content: center;
        }
        .fs-mobile-grid .fs-card {
          width: 100%;
          flex: none;
          min-height: 0;
          aspect-ratio: 1 / 1;
          padding: 14px 14px;
        }
        .fs-mobile-grid .fs-card.fs-card-span {
          aspect-ratio: auto;
          min-height: 160px;
        }
        .fs-mobile-grid .fs-icontile {
          width: 40px; height: 40px;
        }
        .fs-mobile-grid .fs-icontile svg {
          width: 24px; height: 24px;
        }
        .fs-mobile-grid .fs-title {
          font-size: 15px; margin-bottom: 6px; line-height: 1.15;
        }
        .fs-mobile-grid .fs-desc {
          font-size: 12px; line-height: 1.4;
        }
        .fs-mobile-grid .fs-see {
          font-size: 9px; letter-spacing: 0.08em;
        }
      `}</style>

      <div className={section.container}>
        <h2
          className={`${section.heading} !text-3xl font-bold !leading-[1.1] text-neutral-900 md:!text-5xl`}
          style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
        >
          Our Services
        </h2>

        {/* Mobile: 2-col grid, 7th spans full width, appear-on-scroll */}
        <div className="fs-mobile-grid grid grid-cols-2 gap-3 md:hidden">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className={i === 6 ? "col-span-2" : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: Math.min(i, 5) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={service.href}
                className={`fs-card${i === 6 ? " fs-card-span" : ""}`}
              >
                <div className="fs-icontile">{service.icon}</div>
                <div style={{ flex: 1 }} />
                <h3 className="fs-title">{service.title}</h3>
                <p className="fs-desc">{service.description}</p>
                <div style={{ flex: 1 }} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <span className="fs-see">[ LEARN MORE&nbsp;&nbsp;+ ]</span>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "7px 7px",
                      gridTemplateRows: "7px 7px",
                      gap: 4,
                    }}
                  >
                    <div />
                    <div className="fs-sq fs-sq-half" />
                    <div className="fs-sq" />
                    <div className="fs-sq" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop: scroll-linked rows — unchanged */}
        <div className="hidden flex-col gap-5 md:flex">
          <ServiceRow services={TOP_ROW} style={{ x: topX }} />
          <ServiceRow services={BOTTOM_ROW} style={{ x: bottomX }} />
        </div>
      </div>
    </section>
  );
}
