import React from "react";
import Script from "next/script";
import {
  ArrowRight,
  Lightbulb,
  Mail,
  MapPin,
  MessagesSquare,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Seo from "@/components/Seo";

const CONTACT = {
  email: "admin@formasharp.com",
  phoneDisplay: "+1 (416) 471-9300",
  phoneHref: "tel:+14164719300",
  location: "Mississauga, ON, L5B 4N3",
};

const CALENDLY_URL = "https://calendly.com/suhair-sabir-formasharp/30min";

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneHref,
  },
  {
    icon: MapPin,
    label: "Location",
    value: CONTACT.location,
    href: undefined,
  },
];

const APPROACH = [
  {
    icon: MessagesSquare,
    title: "Direct communication",
    description:
      "We value clear communication and straightforward collaboration. Whether you are beginning a new product idea or refining an existing design, we help you move forward with clarity and confidence, responding promptly with guidance tailored to your goals.",
  },
  {
    icon: Lightbulb,
    title: "Start a conversation",
    description:
      "If you are unsure where your idea fits, feel free to start a conversation. Many projects begin as a simple question or a rough concept. Describe your idea in your own words. Sketches, notes, and early challenges are all welcome.",
  },
  {
    icon: ArrowRight,
    title: "Request a quote",
    description:
      "Ready to move toward development? Share a brief description of your project along with any sketches or files so we can estimate scope, effort, and timeline. We tailor every estimate to the project, with no templates and no generic pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Our commitment",
    description:
      "When you contact FormaSharp, you reach a team that values thoughtful design, clear communication, and a collaborative approach. We treat every inquiry with care, whether it is a fully scoped project or an early-stage idea still taking shape.",
  },
];

export default function Contact() {
  return (
    <div>
      <Seo
        title="Contact Us"
        description="Contact FormaSharp to begin your next project. Book a 30 minute consultation, email, or call."
        canonical="/contact/"
      />

      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#0a0f1e]">
        {/* Blue glow, top-right */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.40), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          <div className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/80">
            // FormaSharp &middot; Strategy Call
          </div>
          <h1 className="!mb-6 !text-5xl !leading-[1.05] font-bold text-white md:!text-6xl">
            Book your{" "}
            <span className="text-[#ff6726]">free strategy call</span> today
          </h1>
          <p className="max-w-2xl text-lg !text-white/70">
            Walk away with clarity, priorities, and practical next steps.
          </p>
        </div>
      </section>

      {/* CALENDLY EMBED */}
      <section className="bg-white py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div
            className="calendly-inline-widget overflow-hidden rounded-2xl border border-black/10 shadow-sm"
            data-url={CALENDLY_URL}
            style={{ minWidth: "320px", height: "700px" }}
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="bg-[#f8f9fa] py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 max-w-3xl text-center md:mx-auto md:mb-14">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Get in Touch
            </div>
            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight text-neutral-950 md:text-5xl">
              Other ways to reach us
            </h2>
            <p className="mx-auto">
              Prefer email or a quick phone call? We respond to messages promptly
              and are happy to help however suits you best.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CONTACT_METHODS.map((method) => {
              const Icon = method.icon;
              const inner = (
                <>
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#ff6726]/10">
                    <Icon className="size-7 text-[#ff6726]" strokeWidth={2} aria-hidden />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-black/50">
                    {method.label}
                  </span>
                  <span className="mt-1 text-lg font-semibold text-neutral-950">
                    {method.value}
                  </span>
                </>
              );

              const cardClass =
                "group flex flex-col items-start rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-colors";

              return method.href ? (
                <a
                  key={method.label}
                  href={method.href}
                  className={`${cardClass} hover:border-[#ff6726]/40 hover:bg-[#ff6726]/5`}
                >
                  {inner}
                </a>
              ) : (
                <div key={method.label} className={cardClass}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="relative z-10 bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl md:mb-16">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              How We Work With You
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Clear communication, from first message to final delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {APPROACH.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#ff6726]/15">
                    <Icon className="size-6 text-[#ff6726]" strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="!mb-2 !text-xl !font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="!mb-0 !text-base !text-white/80">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-14 text-center font-mono text-sm uppercase tracking-[0.3em] text-white/40">
            Designs That Shape Possibility
          </p>
        </div>
      </section>
    </div>
  );
}
