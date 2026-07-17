"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

const features = [
  {
    title: "Engineering-First Approach",
    description:
      "We approach every project with a focus on engineering excellence, ensuring designs built on a solid technical foundation.",
    icon: <IconTerminal2 />,
  },
  {
    title: "Designed for Real Manufacturing Conditions",
    description:
      "Our designs are optimized for manufacturing, ensuring they can be produced efficiently and cost-effectively.",
    icon: <IconEaseInOut />,
  },
  {
    title: "Integrated Product Development",
    description:
      "Our services are structured to support the entire product lifecycle; from concept to production.",
    icon: <IconCurrencyDollar />,
  },
  {
    title: "Collaborative & Transparent Workflow",
    description:
      "We believe in open communication and collaboration, ensuring every step of the process is transparent and clear.",
    icon: <IconCloud />,
  },
  {
    title: "Focus on Long-Term Product Success",
    description:
      "Our goal is not just to complete a design but to also deliver a product that performs reliably over time and can be manufactured efficiently at scale.",
    icon: <IconRouteAltLeft />,
  },
  {
    title: "Clear Project Roadmap & Milestones",
    description:
      "We provide a clear roadmap and milestones for each project, ensuring everyone is on the same page and the project stays on track.",
    icon: <IconHelp />,
  },
  {
    title: "Transparent Pricing & Budget Management",
    description:
      "We provide transparent pricing and budget management, ensuring you know exactly what you're getting and how much it will cost.",
    icon: <IconAdjustmentsBolt />,
  },
  {
    title: "Ongoing Support & Maintenance",
    description:
      "We offer ongoing support and maintenance to ensure your product continues to perform reliably and efficiently over time.",
    icon: <IconHeart />,
  },
];

export default function FeaturesSectionDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Mobile: accordion */}
      <div className="flex w-full flex-col md:hidden">
        {features.map((feature, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={feature.title}
              className="border-b border-white/15 first:border-t"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center gap-3 py-4 text-left"
              >
                <span className="shrink-0 text-[#ff5e19] [&_svg]:size-5">
                  {feature.icon}
                </span>
                <span className="min-w-0 flex-1 text-base font-bold leading-snug text-white">
                  {feature.title}
                </span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-white/70 transition-transform duration-200",
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
                  <p className="!mb-0 pb-4 pl-8 pr-2 text-sm leading-relaxed !text-neutral-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: feature grid */}
      <div className="relative z-10 mx-auto hidden max-w-7xl pb-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 lg:border-r lg:border-[#ff5e19]",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-10 dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-10 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-[#ff5e19] transition-all duration-200 group-hover/feature:h-8" />
        <span className="inline-block text-white transition-all duration-200 group-hover/feature:translate-x-2 group-hover/feature:text-[#ff5e19]">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm !mb-0 !text-neutral-400 transition-colors duration-200 group-hover/feature:!text-white">
        {description}
      </p>
    </div>
  );
};
