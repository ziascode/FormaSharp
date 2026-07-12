import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Box,
  Factory,
  FileCheck,
  Lightbulb,
  PencilRuler,
  Shield,
} from "lucide-react";
import Seo from "@/components/Seo";
import { openContactPopup } from "@/components/ExitIntentPopup";
import { section } from "@/lib/sectionSpacing";
import { cn } from "@/lib/utils";

const HERO_IMAGE =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/patent3.jpg";

const WHEN_ITEMS = [
  {
    title: "Developing a New Product Idea",
    description:
      "You have created a unique concept, mechanism, or solution and want to understand potential protection options.",
    icon: Lightbulb,
  },
  {
    title: "Creating a Prototype",
    description:
      "You have developed a physical representation of your idea and need guidance before presenting it publicly or sharing it with external partners.",
    icon: Box,
  },
  {
    title: "Preparing for Manufacturing",
    description:
      "Your product is moving toward production and you need to understand how intellectual property considerations fit into your commercialization strategy.",
    icon: Factory,
  },
  {
    title: "Launching a New Product",
    description:
      "You are preparing to introduce your product to the market and want to ensure appropriate steps have been considered.",
    icon: FileCheck,
  },
];

const JOURNEY = [
  {
    title: "Concept Development",
    description: "Defining the product idea, purpose, and opportunity.",
    highlight: false,
  },
  {
    title: "Product Design & Engineering",
    description:
      "Creating functional designs, CAD models, and technical solutions.",
    highlight: false,
  },
  {
    title: "Prototyping & Validation",
    description: "Testing and refining the product before production.",
    highlight: false,
  },
  {
    title: "Intellectual Property Guidance",
    description:
      "Connecting with patent professionals to explore protection strategies.",
    highlight: true,
  },
  {
    title: "Manufacturing & Commercialization",
    description:
      "Preparing the product for production and market introduction.",
    highlight: false,
  },
];

const SPECIALTIES = [
  "Product Design",
  "Industrial Design",
  "Mechanical Engineering",
  "CAD Development",
  "Prototyping & 3D Printing",
  "Design for Manufacturing",
];

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

export default function PatentIpPage() {
  return (
    <div>
      <Seo
        title="Patent & Intellectual Property Services"
        description="FormaSharp connects inventors, startups, and businesses with trusted patent professionals for intellectual property guidance throughout product development."
        canonical="/patent-ip"
      />

      {/* HERO — About-style dark field, left title + lifted image */}
      <section className="relative overflow-hidden bg-[#0a0f1e]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.40), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-28 md:px-8 md:py-32 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <motion.div
            className="lg:col-span-6"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1
              variants={fadeUp}
              className="!mb-6 max-w-xl !text-4xl !font-semibold !leading-[1.08] !tracking-tight !text-white md:!text-5xl lg:!text-6xl"
            >
              Patent & Intellectual Property Guidance{" "}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="!mb-8 max-w-lg !text-base !leading-relaxed !text-white/75 md:!text-lg"
            >
              Protect your innovation with the right professional support,
              connected through FormaSharp as you move from concept to market.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button
                type="button"
                onClick={openContactPopup}
                className="button-primary inline-flex items-center gap-2"
              >
                Connect With a Patent Professional
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mx-auto max-w-lg lg:ml-auto lg:max-w-none">
              <div
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#121926] shadow-[0_28px_60px_-12px_rgba(0,0,0,0.55),0_12px_24px_-8px_rgba(1,98,138,0.35)]"
                style={{ transform: "translateY(-6px)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HERO_IMAGE}
                  alt="Product development and intellectual property planning"
                  className="aspect-[4/3] w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className={`${section.padding} bg-white`}>
        <div className={section.container}>
          <motion.div
            className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.div className="lg:col-span-5" variants={fadeUp}>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
                Professional Support
              </div>
              <h2 className="!mb-0 max-w-md !text-3xl !font-bold !leading-[1.1] !tracking-tight !text-neutral-950 md:!text-4xl">
                Protect Your Innovation With the Right Professional Support
              </h2>
            </motion.div>
            <motion.div className="lg:col-span-7" variants={fadeUp}>
              <p className="!mb-5 !text-base !leading-relaxed !text-neutral-700 md:!text-lg">
                Bringing a new product to market involves more than design and
                engineering. For many innovators, protecting intellectual
                property is an important step in securing the value of their
                idea before sharing it with manufacturers, investors, or
                commercial partners.
              </p>
              <p className="!mb-5 !text-base !leading-relaxed !text-neutral-700 md:!text-lg">
                FormaSharp helps transform product concepts into developed
                solutions through product design, engineering, CAD development,
                and prototyping. As part of supporting clients throughout their
                development journey, we connect inventors, startups, and
                businesses with trusted patent professionals who can provide
                specialized guidance on intellectual property protection.
              </p>
              <p className="!mb-0 !text-base !leading-relaxed !text-neutral-700 md:!text-lg">
                Whether you are developing a new invention, refining a
                prototype, or preparing for commercialization, having the right
                support at the right stage can help you make informed decisions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHEN */}
      <section className={`${section.padding} relative overflow-hidden bg-[#f8f9fa]`}>
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#01628a]/8 blur-3xl"
          aria-hidden
        />
        <div className={section.container}>
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <motion.div
              className="lg:col-span-5"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
                Timing
              </div>
              <h2 className="!mb-4 !text-3xl !font-bold !leading-[1.1] !tracking-tight !text-neutral-950 md:!text-4xl">
                When Should You Consider Patent Guidance?
              </h2>
              <p className="!mb-0 !text-base !leading-relaxed !text-neutral-700 md:!text-lg">
                Protecting your product starts with understanding your options.
                Many innovators wait until late in the development process
                before considering intellectual property protection. Early
                guidance can help you better understand your options before
                sharing designs, creating partnerships, or entering
                manufacturing discussions.
              </p>
            </motion.div>
            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
            >
              <div className="relative overflow-hidden border border-[#01628a]/15 bg-[linear-gradient(135deg,#121926_0%,#01628a_100%)] p-6 text-white md:p-8">
                <p className="!mb-2 !text-[0.7rem] !font-semibold !uppercase !tracking-[0.18em] !text-[#ff6726]">
                  Better earlier than later
                </p>
                <p className="!mb-0 max-w-md !text-lg !font-medium !leading-snug !text-white md:!text-xl">
                  You may benefit from speaking with a patent professional if
                  you are at any of these stages.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {WHEN_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  className="group relative flex h-full flex-col overflow-hidden border border-black/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#01628a]/30 hover:shadow-[0_20px_40px_-20px_rgba(18,25,38,0.35)]"
                >
                  <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                    <span className="font-mono text-2xl font-semibold tracking-tight text-[#01628a]/25 transition-colors group-hover:text-[#ff6726]/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="inline-flex size-9 items-center justify-center rounded-full bg-[#01628a]/10 text-[#01628a] transition-colors group-hover:bg-[#ff6726]/15 group-hover:text-[#ff6726]">
                      <Icon className="size-4" aria-hidden />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="!mb-3 !text-base !font-semibold !leading-snug !text-neutral-950 md:!text-lg">
                      {item.title}
                    </h3>
                    <p className="!mb-0 !text-sm !leading-relaxed !text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                  <div
                    className="h-1 w-full origin-left scale-x-0 bg-[#ff6726] transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className={`${section.padding} relative overflow-hidden bg-[#0a0f1e]`}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 10% 20%, rgba(1,98,138,0.35), transparent 55%), radial-gradient(ellipse 50% 50% at 90% 80%, rgba(255,103,38,0.12), transparent 50%)",
          }}
          aria-hidden
        />
        <div className={`relative z-10 ${section.container}`}>
          <motion.div
            className={`${section.heading} max-w-3xl`}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              From Concept to Market
            </div>
            <h2 className="!mb-4 !text-3xl !font-bold !leading-[1.1] !tracking-tight !text-white md:!text-4xl">
              Supporting Your Journey From Concept to Market
            </h2>
            <p className="!mb-0 !text-base !leading-relaxed !text-white/70 md:!text-lg">
              The right expertise at each stage of product development.
              Successful products require multiple areas of expertise working
              together.
            </p>
          </motion.div>

          {/* Desktop horizontal process */}
          <motion.ol
            className="hidden lg:grid lg:grid-cols-5 lg:gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {JOURNEY.map((step, index) => (
              <motion.li
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col"
              >
                <div className="relative z-10 mb-5 flex justify-center">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full text-sm font-semibold",
                      step.highlight
                        ? "bg-[#ff6726] text-[#121926] shadow-[0_0_0_6px_rgba(255,103,38,0.2)]"
                        : "bg-white/10 text-white ring-1 ring-white/20",
                    )}
                  >
                    {index + 1}
                  </div>
                </div>
                <div
                  className={cn(
                    "flex h-full flex-col border p-5",
                    step.highlight
                      ? "border-[#ff6726]/50 bg-[#ff6726]/10"
                      : "border-white/10 bg-white/5",
                  )}
                >
                  {step.highlight && (
                    <span className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#ff6726]">
                      FormaSharp connects you here
                    </span>
                  )}
                  <h3 className="!mb-2 !text-base !font-semibold !leading-snug !text-white">
                    {step.title}
                  </h3>
                  <p className="!mb-0 !text-sm !leading-relaxed !text-white/65">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* Mobile / tablet vertical process */}
          <motion.ol
            className="relative space-y-4 lg:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {JOURNEY.map((step, index) => (
              <motion.li
                key={step.title}
                variants={fadeUp}
                className="relative flex gap-5"
              >
                <div
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    step.highlight
                      ? "bg-[#ff6726] text-[#121926] shadow-[0_0_0_6px_rgba(255,103,38,0.2)]"
                      : "bg-[#0a0f1e] text-white ring-1 ring-white/25",
                  )}
                >
                  {index + 1}
                </div>
                <div
                  className={cn(
                    "flex-1 border p-5",
                    step.highlight
                      ? "border-[#ff6726]/50 bg-[#ff6726]/10"
                      : "border-white/10 bg-white/5",
                  )}
                >
                  {step.highlight && (
                    <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#ff6726]">
                      FormaSharp connects you here
                    </span>
                  )}
                  <h3 className="!mb-2 !text-base !font-semibold !text-white">
                    {step.title}
                  </h3>
                  <p className="!mb-0 !text-sm !leading-relaxed !text-white/65">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <motion.p
            className="mt-12 max-w-3xl !text-base !leading-relaxed !text-white/70 md:!text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            FormaSharp supports the product development stages leading up to
            intellectual property review, while trusted patent professionals
            provide the specialized legal guidance required for patent-related
            decisions.
          </motion.p>
        </div>
      </section>

      {/* WHY */}
      <section className={`${section.padding} bg-[#f8f9fa]`}>
        <div className={section.container}>
          <motion.div
            className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.div className="lg:col-span-6" variants={fadeUp}>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
                Why FormaSharp
              </div>
              <h2 className="!mb-4 !text-3xl !font-bold !leading-[1.1] !tracking-tight !text-neutral-950 md:!text-4xl">
                Why FormaSharp Provides Patent Professional Connections
              </h2>
              <p className="!mb-5 !text-base !leading-relaxed !text-neutral-700 md:!text-lg">
                Helping clients access the right expertise. Developing a
                successful product often requires collaboration between
                designers, engineers, manufacturers, and legal professionals.
              </p>
              <p className="!mb-0 !text-base !leading-relaxed !text-neutral-700 md:!text-lg">
                When intellectual property questions arise, we help connect
                clients with experienced patent professionals who understand the
                importance of protecting innovative products. This allows
                clients to access the right expertise at each stage of their
                product development journey.
              </p>
            </motion.div>

            <motion.div className="lg:col-span-6" variants={fadeUp}>
              <div className="border border-black/8 bg-white p-6 md:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#ff6726]/10 text-[#ff6726]">
                    <PencilRuler className="size-5" aria-hidden />
                  </div>
                  <h3 className="!mb-0 !text-lg !font-semibold !text-neutral-950">
                    FormaSharp specializes in
                  </h3>
                </div>
                <ul className="space-y-3">
                  {SPECIALTIES.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-black/5 pb-3 text-neutral-800 last:border-none last:pb-0"
                    >
                      <Shield
                        className="size-4 shrink-0 text-[#01628a]"
                        aria-hidden
                      />
                      <span className="text-base font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="!mb-4 !text-3xl !font-bold !leading-tight !tracking-tight !text-white md:!text-4xl">
            Continue Developing Your Product With FormaSharp
          </h2>
          <p className="!mb-10 !text-base !leading-relaxed !text-white/80 md:!text-lg">
            Have an idea you want to transform into a market-ready product?
            FormaSharp helps innovators and businesses move from concept
            development to engineering, prototyping, and manufacturing
            preparation.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/ProductDesign" className="button-primary inline-block">
              Explore Our Product Development Services
            </Link>
            <button
              type="button"
              onClick={openContactPopup}
              className="button-secondary inline-flex items-center gap-2"
            >
              Connect With a Patent Professional
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
