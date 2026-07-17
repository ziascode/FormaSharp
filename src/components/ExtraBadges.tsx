import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const BADGES = [
  {
    src: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-badge-for-certified-solidworks-associate.jpeg",
    label: "Certified SolidWorks Associate",
  },
  {
    src: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-logo-for-certificate-of-authorization-designation-from-peo.jpeg",
    label: "CofA from Professional Engineers Ontario",
  },
  {
    src: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-badge-for-NX-design-associate.jpeg",
    label: "NX Design Associate from Siemens",
  },
] as const;

interface ExtraBadgesProps {
  className?: string;
  /** When "start", badge row aligns left (e.g. under left-aligned hero). */
  contentAlign?: "center" | "start";
}

export default function ExtraBadges({
  className,
  contentAlign = "center",
}: ExtraBadgesProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Mobile: full-bleed 3-col strip — logos aligned across columns */}
      <div className="mt-0 grid w-full grid-cols-3 items-stretch gap-0 border border-white/15 md:hidden">
        {BADGES.map((badge, index) => (
          <motion.div
            key={badge.label}
            variants={itemVariants}
            className={cn(
              "flex flex-col items-center bg-black/25 px-2 pb-4 pt-4 text-center backdrop-blur-sm",
              index > 0 && "border-l border-white/15"
            )}
          >
            <div className="mb-2 flex h-11 w-full shrink-0 items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden bg-white">
                <img
                  className="h-full w-full object-contain p-1"
                  src={badge.src}
                  alt=""
                />
              </div>
            </div>
            <span className="w-full text-[10px] font-medium leading-tight text-white/80">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Desktop: rounded pills */}
      <div
        className={cn(
          "mt-16 hidden max-w-5xl flex-row flex-wrap items-center gap-4 md:flex",
          contentAlign === "start"
            ? "mx-0 justify-start"
            : "mx-auto justify-center"
        )}
      >
        {BADGES.map((badge) => (
          <motion.div
            key={badge.label}
            variants={itemVariants}
            className="flex max-w-full flex-row items-center gap-4 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-5 backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              <img
                className="h-full w-full object-contain p-1"
                src={badge.src}
                alt=""
              />
            </div>
            <span className="text-sm font-medium leading-tight text-white/80">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
