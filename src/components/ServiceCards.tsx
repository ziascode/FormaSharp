"use client";

import { useState } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Search,
  Radar,
  Layers3,
} from "lucide-react";

const services = [
  {
    title: "Product Design",
    description:
      "Transform ideas into engineered products with functional mechanical systems and production-ready CAD modelss",
    icon: BarChart3,
  },
  {
    title: "Industrial Design",
    description:
      "Develop product form, usability, and visual appeal while ensuring designs remain practical for manufacturing.",
    icon: Search,
  },
  {
    title: "Mechanical Engineering & Simulation",
    description:
      "Optimize designs for manufacturing, validate performance, and reduce prototyping costs with detailed engineering analysis.",
    icon: Radar,
  },
  {
    title: "Prototyping & 3D Printing",
    description:
      "Evaluate designs with functional prototypes and 3D printing to identify design flaws and improve performance before production.",
    icon: Layers3,
  },
  {
    title: "CAD Services",
    description:
      "Develop precise 3D models, assemblies, and technical drawings used for engineering and production.",
    icon: Layers3,
  },
  {
    title: "Reverse Engineering",
    description:
      "Recreate digital CAD models from existing parts to enable reproduction, modification, or improvement.",
    icon: Layers3,
  },
  {
    title: "Design for Manufacturing",
    description:
      "Optimize product designs for efficient, scalable, and cost-effective production.",
    icon: Layers3,
  },
  
];

export default function ServiceCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const highlightedIndex = hoveredIndex ?? activeIndex;

  return (
    <section className="bg-slate-300 md:py-40 -mt-80 z-100">
      
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 pb-[20vh] -mb-[20vh] flex flex-col items-center justify-center">

        <h2 className="text-2xl max-w-3xl text-black/80 font-bold pb-[50px] text-center">Product Development Services Built for Real-World Results</h2>
        
        <div className="flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHighlighted = highlightedIndex === index;

            return (
              <motion.button
                
                key={service.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-pressed={activeIndex === index}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: 1,
                  y: isHighlighted ? -8 : 0,
                  scale: isHighlighted ? 1.015 : 1,
                }}
                transition={{
                  opacity: { duration: 0.4, delay: index * 0.06 },
                  y: { type: "spring", stiffness: 260, damping: 22 },
                  scale: { type: "spring", stiffness: 260, damping: 22 },
                }}
                whileTap={{ scale: 0.995 }}
                className={`group relative min-h-[360px] min-w-[280px] snap-start overflow-hidden rounded-lg border p-6 text-left transition-colors duration-300 md:min-w-0 ${
                  isHighlighted
                    ? "border-transparent bg-[#ff5e19] text-[#1c1c1c]"
                    : "border-black/20 bg-[white] text-[#1c1c1c]"
                }`}
              >
                

                {/* glow */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    isHighlighted ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0" />
                </div>

                <div className="relative z-10 flex h-full flex-col">
                  
                  {/* icon */}
                  <div className=" pointer-events-none absolute top-0 right-0 h-[55%] w-[55%] translate-x-[6%] translate-y-[6%]">
                      <img className='w-full' src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/3d-printer-1.png" alt="" />
                  </div>

                  {/* title and description */}
                  <div className="mt-auto">
                    <h3 className="max-w-[12ch] text-2xl font-semibold leading-[1.05] tracking-[-0.04em]">
                      {service.title}
                    </h3>

                    <motion.p
                      animate={{
                        opacity: isHighlighted ? 1 : 0.9,
                        y: isHighlighted ? 0 : 8,
                      }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 max-w-[28ch] text-xs leading-6 text-current/75"
                    >
                      {service.description}
                    </motion.p>

                    {/* learn more button */}
                    <motion.p
                      animate={{
                        opacity: isHighlighted ? 1 : 0.65,
                        y: isHighlighted ? -70 : 8,
                      }}
                      transition={{ duration: 0.35 }}
                      className="mt-0 max-w-[28ch] text-sm leading-6 text-current/75 absolute -bottom-[100px] right-0 ] "
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm opacity-90">Learn More</span> 
                        <ArrowUpRight className="h-4 w-4" /> 
                      </span>
                      
                    </motion.p>

                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}