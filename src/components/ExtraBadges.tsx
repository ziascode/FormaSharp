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
      {/* Credibility Badges */}
      <div
        className={cn(
          "mt-16 flex max-w-5xl flex-row flex-wrap items-center gap-2 sm:gap-4",
          contentAlign === "start"
            ? "mx-0 justify-start"
            : "mx-auto justify-center"
        )}
      >
        <motion.div
          variants={itemVariants}
          className="flex max-w-full flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 backdrop-blur-sm sm:gap-4 sm:py-2 sm:pl-2 sm:pr-5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-12 sm:w-12">
            <img
              className="h-full w-full object-contain p-1"
              src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-badge-for-certified-solidworks-associate.jpeg"
              alt=""
            />
          </div>
          <span className="text-xs font-medium leading-tight text-white/80 sm:text-sm">
            Certified SolidWorks Associate
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex max-w-full flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 backdrop-blur-sm sm:gap-4 sm:py-2 sm:pl-2 sm:pr-5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-12 sm:w-12">
            <img
              className="h-full w-full object-contain p-1"
              src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-logo-for-certificate-of-authorization-designation-from-peo.jpeg"
              alt=""
            />
          </div>
          <span className="text-xs font-medium leading-tight text-white/80 sm:text-sm">
            CofA from Professional Engineers Ontario
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex max-w-full flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 backdrop-blur-sm sm:gap-4 sm:py-2 sm:pl-2 sm:pr-5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-12 sm:w-12">
            <img
              className="h-full w-full object-contain p-1"
              src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-badge-for-NX-design-associate.jpeg"
              alt=""
            />
          </div>
          <span className="text-xs font-medium leading-tight text-white/80 sm:text-sm">
            NX Design Associate from Siemens
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
