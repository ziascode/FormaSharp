import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Scale, ShieldCheck } from "lucide-react";

const PEO_LOGO =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-logo-for-certificate-of-authorization-designation-from-peo.jpeg";

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    label: "Licensed professional engineering oversight",
  },
  {
    icon: Scale,
    label: "Compliant with Ontario engineering regulations",
  },
  {
    icon: BadgeCheck,
    label: "Trusted for design, analysis, and production support",
  },
];

export default function CofABanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0f1e]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 15% 50%, rgba(1,98,138,0.45), transparent 55%), radial-gradient(ellipse 55% 60% at 90% 20%, rgba(255,103,38,0.12), transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="!mb-4 inline-flex items-center gap-2 !text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[#ff6726]">
              <span aria-hidden>&#9670;</span>
              Professional Engineers Ontario
            </p>
            <h2 className="!mb-5 max-w-2xl !text-3xl !font-semibold !leading-[1.08] !tracking-tight !text-white md:!text-4xl lg:!text-[2.75rem]">
              Certificate of Authorization{" "}
              <span className="text-white/75">(CofA)</span>
            </h2>
            <p className="!mb-8 max-w-xl !text-base !leading-relaxed !text-white/75 md:!text-lg">
              FormaSharp is authorized to legally provide professional
              engineering services in Ontario. That means your product development
              is backed by regulated engineering standards.
            </p>

            <ul className="mb-8 space-y-3">
              {TRUST_POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <li
                    key={point.label}
                    className="flex items-start gap-3 text-sm text-white/80 md:text-base"
                  >
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#ff6726]">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="leading-relaxed">{point.label}</span>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:text-[#ff6726]"
            >
              Learn about our credentials
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative mx-auto max-w-md lg:ml-auto lg:max-w-none">
              <div
                className="absolute -inset-4 rounded-3xl bg-[#01628a]/20 blur-2xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121926]/80 p-8 shadow-[0_28px_60px_-12px_rgba(0,0,0,0.55),0_12px_24px_-8px_rgba(1,98,138,0.35)] backdrop-blur-sm md:p-10">
                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_12px_32px_rgba(0,0,0,0.2)] md:h-32 md:w-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PEO_LOGO}
                    alt="Professional Engineers Ontario Certificate of Authorization"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="text-center">
                  <p className="!mb-2 !text-xs !font-semibold !uppercase !tracking-[0.16em] !text-[#ff6726]">
                    Certificate of Authorization
                  </p>
                  <p className="!mb-0 !text-lg !font-semibold !leading-snug !text-white md:!text-xl">
                    Authorized to provide professional engineering services in
                    Ontario
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
