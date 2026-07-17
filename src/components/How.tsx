"use client";

import React, { type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { section } from "@/lib/sectionSpacing";

type HelpCardData = {
  title: string;
  question: string;
  description: string;
  image: string;
  href: string;
  icon: ReactNode;
};

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 56,
  height: 56,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#ff6726",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CARDS: HelpCardData[] = [
  {
    title: "Early-stage product development",
    question: "Starting with an idea or early concept?",
    description:
      "We help transform initial ideas into structured product concepts by defining functionality, evaluating feasibility, and identifying the most effective design approach.",
    image:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/3d-printing-toronto.jpg",
    href: "/contact",
    icon: (
      <svg {...svgProps} strokeWidth={0.7}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 14l11 -11" />
        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
      </svg>
    ),
  },
  {
    title: "Startup & Innovators",
    question: "Need to turn your concept into a real design?",
    description:
      "Our team develops detailed CAD models, mechanical systems, and engineering solutions that bring your product to life while ensuring it performs as intended.",
    image:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/startup2-1.jpg",
    href: "/contact",
    icon: (
      <svg {...svgProps} strokeWidth={0.8}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12h6" />
        <path d="M21 12h-6" />
        <path d="M12 3v6" />
        <path d="M12 15v6" />
        <path d="M5.636 5.636l4.243 4.243" />
        <path d="M18.364 18.364l-4.243 -4.243" />
        <path d="M18.364 5.636l-4.243 4.243" />
        <path d="M9.879 14.121l-4.243 4.243" />
      </svg>
    ),
  },
  {
    title: "Manufacturers",
    question: "Preparing your product for real-world production?",
    description:
      "We optimize designs for manufacturing, ensuring efficiency, cost control, and smooth production with complete technical documentation.",
    image:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/dfm2.jpg",
    href: "/contact",
    icon: (
      <svg {...svgProps} strokeWidth={0.6}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1 -2.184 0l-6.75 -4.27a2.23 2.23 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98l-.033 0" />
        <path d="M15.5 9.422c.312 .18 .503 .515 .5 .876v3.277c0 .364 -.197 .7 -.515 .877l-3 1.922a1 1 0 0 1 -.97 0l-3 -1.922a1 1 0 0 1 -.515 -.876v-3.278c0 -.364 .197 -.7 .514 -.877l3 -1.79c.311 -.174 .69 -.174 1 0l3 1.79h-.014l0 .001" />
      </svg>
    ),
  },
  {
    title: "E-commerce",
    question: "Do you need to test your product before full scale production?",
    description:
      "We create functional prototypes and 3D models to validate designs, refine functionality, and ensure products meet your expectations before moving to mass production.",
    image:
      "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/ecommerce-engi.jpg",
    href: "/contact",
    icon: (
      <svg {...svgProps} strokeWidth={0.5}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M21 8.007v7.986a2 2 0 0 1 -1.006 1.735l-7 4.007a2 2 0 0 1 -1.988 0l-7 -4.007a2 2 0 0 1 -1.006 -1.735v-7.986a2 2 0 0 1 1.006 -1.735l7 -4.007a2 2 0 0 1 1.988 0l7 4.007a2 2 0 0 1 1.006 1.735" />
        <path d="M3.29 6.97l4.21 2.03" />
        <path d="M20.71 6.97l-4.21 2.03" />
        <path d="M20.7 17h-17.4" />
        <path d="M11.76 2.03l-4.26 6.97l-4.3 7.84" />
        <path d="M12.24 2.03q 2.797 4.44 4.26 6.97t 4.3 7.84" />
        <path d="M12 17l-4.5 -8h9l-4.5 8" />
        <path d="M12 17v5" />
      </svg>
    ),
  },
];

function HelpCard({ card, index }: { card: HelpCardData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={card.href}
        className="group relative block min-h-[340px] overflow-hidden rounded-3xl"
      >
        {/* Background image with zoom on hover */}
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Navy scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121926]/90 via-[#121926]/65 to-[#121926]/25" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[340px] flex-col justify-center gap-3 px-8 py-14 lg:px-14">
          <div>{card.icon}</div>

          <h3
            className="!mb-0 max-w-xl !text-2xl font-semibold !text-white md:!text-3xl"
            style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            {card.title}
          </h3>

          <p className="!mb-0 max-w-xl !text-base !text-white/85">
            <span className="font-semibold !text-white">{card.question}</span>
            <br />
            {card.description}
          </p>
        </div>

        {/* CTA revealed on hover */}
        <span className="absolute bottom-6 right-6 z-10 inline-flex translate-y-3 items-center gap-2 rounded-full bg-[#ff6726] px-6 py-3 text-sm font-semibold text-[#202020] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          Start your project ↗
        </span>
      </Link>
    </motion.div>
  );
}

function How() {
  return (
    <div className="relative z-10">
      <section className={`bg-[#FAFAFA] ${section.padding}`}>
        <div className={`${section.container} flex flex-col gap-12 lg:flex-row lg:gap-16`}>
          {/* LEFT — sticky heading + description */}
          <div className="h-fit shrink-0 lg:sticky lg:top-[calc(7rem+5vh)] lg:w-[340px]">
            <h2
              className="!mb-4 !text-3xl font-bold !leading-[1.1] text-neutral-900 md:!mb-6 md:!text-5xl"
              style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
            >
              How we can <span className="text-[#ff6726]">help you</span>
            </h2>
            <p className={`${section.intro} !text-base text-neutral-600`}>
              Wherever you are in your product journey, whether a first sketch,
              a working concept, or a design headed for the production line, we
              bring the engineering, design, and prototyping expertise to move
              it forward.
            </p>
            <Link href="/contact" className="button-primary inline-block">
              Start your project ↗
            </Link>
          </div>

          {/* RIGHT — stacked cards */}
          <div className="flex grow flex-col gap-5">
            {CARDS.map((card, index) => (
              <HelpCard key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default How;
