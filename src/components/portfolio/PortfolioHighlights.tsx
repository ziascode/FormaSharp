import { motion, type Variants } from "framer-motion";
import type { PortfolioHighlight } from "@/lib/portfolio";

type PortfolioHighlightsProps = {
  items: PortfolioHighlight[];
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const viewport = { once: true, amount: 0.2 } as const;

export default function PortfolioHighlights({ items }: PortfolioHighlightsProps) {
  if (items.length === 0) return null;

  return (
    <section className="bg-[#f8f9fa] py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          className="mb-8 max-w-3xl md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <div className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#ff6726] md:text-xs">
            Project Highlights
          </div>
          <h2 className="!text-[1.875rem] !font-bold !leading-[1.15] tracking-tight text-neutral-950 md:!text-4xl md:!leading-none">
            Key design decisions
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          {items.map((item, index) => (
            <motion.article
              key={`${item.title}-${index}`}
              variants={fadeUp}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e] p-5 shadow-[0_20px_40px_-20px_rgba(18,25,38,0.45)] md:p-8"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#121926_0%,#01628a_100%)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.40), transparent 60%)",
                }}
                aria-hidden
              />
              <div className="relative z-10 flex h-full flex-col">
                <span className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#ff6726] md:mb-4">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 !text-lg !font-bold !text-white md:!text-xl">
                  {item.title}
                </h3>
                <p className="mb-0 text-base leading-relaxed !text-white max-md:!text-[1.125rem]">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
