"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const STATS: StatItem[] = [
  { value: 9, suffix: "", label: "Years of engineering experience" },
  { value: 10, suffix: "+", label: "Manufacturing processes supported" },
  { value: 15, suffix: "+", label: "Industries supported" },
  { value: 24, suffix: "h", label: "Average response time" },
];

type StatsBandProps = {
  variant?: "light" | "dark";
};

function useCountUp(target: number, isInView: boolean, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, isInView, duration]);

  return count;
}

function StatCell({
  stat,
  index,
  variant,
  total,
}: {
  stat: StatItem;
  index: number;
  variant: "light" | "dark";
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp(stat.value, isInView);
  const isDark = variant === "dark";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-8",
        index % 2 === 0 && "border-r",
        index < 2 && "border-b lg:border-b-0",
        index < total - 1 && "lg:border-r",
        isDark ? "border-white" : "border-black/10",
      )}
    >
      <div
        className={cn(
          "flex items-start font-bold leading-none tracking-tight",
          isDark ? "text-white" : "text-neutral-950",
        )}
      >
        <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">{count}</span>
        {stat.suffix && (
          <span className="text-lg text-[#ff6726] sm:text-2xl md:text-3xl lg:text-4xl">
            {stat.suffix}
          </span>
        )}
      </div>

      <p
        className={cn(
          "mt-4 !mb-0 max-w-none font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] sm:mt-6 sm:max-w-[14ch] sm:text-xs sm:tracking-[0.18em]",
          isDark ? "!text-white" : "text-black/50",
        )}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsBand({ variant = "dark" }: StatsBandProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative z-20 w-full overflow-x-hidden",
        isDark
          ? "bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-24 md:py-32"
          : "bg-white py-24 md:py-32",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4",
            isDark ? "border-x border-white" : "border-x border-black/10",
          )}
        >
          {STATS.map((stat, index) => (
            <StatCell
              key={stat.label}
              stat={stat}
              index={index}
              variant={variant}
              total={STATS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
