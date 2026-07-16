import React from "react";
import Link from "next/link";
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

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/formasharp",
    label: "Instagram",
    value: "@formasharp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/formasharp/",
    label: "LinkedIn",
    value: "FormaSharp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
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

      {/* BOOK + CALENDLY */}
      <section className="relative min-h-screen overflow-hidden bg-[#0a0f1e] pt-[18vh] pb-10 lg:pb-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.40), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
            <div className="text-left pt-6 lg:pt-14">
              <h1 className="!mb-6 max-w-xl !text-4xl !leading-[1.05] font-bold text-white md:!text-5xl lg:!text-[3.25rem]">
                Book your{" "}
                <span className="text-[#ff6726]">free strategy call</span> today
              </h1>
              <p className="max-w-md text-lg !text-white/75">
                Walk away with clarity, priorities, and practical next steps.
              </p>
              <p className="mt-6 max-w-md text-sm !text-white/55">
                Pick a time that works for you. No obligation, just a focused
                conversation about your project.
              </p>
              <Link
                href="/request-a-quote"
                className="mt-8 inline-flex max-w-lg items-center gap-2 border-b border-white/30 pb-0.5 text-lg font-medium !text-white transition-colors hover:border-[#ff6726] hover:!text-[#ff6726]"
              >
                Or request a detailed quote to start your project
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>

            <div
              className="calendly-inline-widget w-full overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_12px_48px_rgba(0,0,0,0.35)]"
              data-url={CALENDLY_URL}
              style={{
                minWidth: "280px",
                height: "min(680px, calc(100svh - 11rem))",
              }}
            />
          </div>
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="bg-[#f8f9fa] py-24 md:py-32">
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

          <div className="mt-10 flex flex-col items-center gap-5 md:mt-14">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/50">
              Follow us
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-3.5 shadow-sm transition-colors hover:border-[#ff6726]/40 hover:bg-[#ff6726]/5"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#ff6726]/10 text-[#ff6726] transition-colors group-hover:bg-[#ff6726]/15">
                    {social.icon}
                  </span>
                  <span className="text-left">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-black/50">
                      {social.label}
                    </span>
                    <span className="block text-sm font-semibold text-neutral-950">
                      {social.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
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

          <p className="mt-14 text-center font-mono text-sm uppercase tracking-[0.3em] !text-white">
            Designs That Shape Possibility
          </p>
        </div>
      </section>
    </div>
  );
}
