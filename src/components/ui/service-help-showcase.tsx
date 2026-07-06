"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { motion } from "framer-motion";

export type HelpShowcaseCard = {
  title: string;
  question: string;
  description: string;
  icon: ReactNode;
};

export type ServiceHelpShowcaseProps = {
  heading: ReactNode;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref?: string;
  cards: HelpShowcaseCard[];
};

function HelpShowcaseCard({
  card,
  index,
  ctaLabel,
  ctaHref,
}: {
  card: HelpShowcaseCard;
  index: number;
  ctaLabel: string;
  ctaHref: string;
}) {
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
        href={ctaHref}
        className="group relative block min-h-[280px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#121926] via-[#162030] to-[#1a3344]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,103,38,0.18) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[280px] flex-col justify-center gap-3 px-8 py-10 lg:px-14">
          <div className="text-[#ff6726] transition-colors duration-300 group-hover:text-white">
            {card.icon}
          </div>

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

        <span className="absolute bottom-6 right-6 z-10 inline-flex translate-y-3 items-center gap-2 rounded-full bg-[#ff6726] px-6 py-3 text-sm font-semibold text-[#202020] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          {ctaLabel}
        </span>
      </Link>
    </motion.div>
  );
}

export function ServiceHelpShowcase({
  heading,
  paragraphs,
  ctaLabel,
  ctaHref = "#cta",
  cards,
}: ServiceHelpShowcaseProps) {
  return (
    <section className="bg-[#FAFAFA] pb-16 pt-12 md:pb-24 md:pt-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:gap-16">
        <div className="h-fit shrink-0 lg:sticky lg:top-[calc(7rem+5vh)] lg:w-[340px]">
          <h2
            className="!mb-6 !text-4xl font-bold !leading-[1.1] text-neutral-900 md:!text-5xl"
            style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
          >
            {heading}
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="!mb-4 last:!mb-0 !text-base text-neutral-600"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex grow flex-col gap-5">
          {cards.map((card, index) => (
            <HelpShowcaseCard
              key={card.title}
              card={card}
              index={index}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
