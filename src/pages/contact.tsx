import React from "react";
import Link from "next/link";
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
import CalendlyPopupButton from "@/components/CalendlyPopupButton";

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
    href: undefined as string | undefined,
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

      {/* HERO — Calendly CTA left, contact details right */}
      <section
        id="book-consultation"
        className="relative scroll-mt-20 overflow-hidden bg-[#0a0f1e] pt-32 pb-16 md:min-h-[85vh] md:pb-20 md:pt-[18vh]"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.40), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            {/* Left — booking CTA */}
            <div className="text-left">
              <div className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#ff6726] md:text-xs">
                Contact
              </div>
              <h1 className="!mb-0 max-w-xl !text-[2rem] !leading-[1.1] font-bold text-white md:!text-5xl md:!leading-[1.05] lg:!text-[3.25rem]">
                Book your{" "}
                <span className="text-[#ff6726]">free strategy call</span>{" "}
                today
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed !text-white/95 max-md:!text-[1.125rem] md:mt-6 md:text-lg">
                Pick a time that works for you. We&apos;ll review your project
                goals and outline clear next steps, with no commitment required.
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                <CalendlyPopupButton
                  url={CALENDLY_URL}
                  className="button-primary inline-block w-full text-center sm:w-auto disabled:cursor-wait disabled:opacity-80"
                >
                  Book a Free Call
                </CalendlyPopupButton>
                <Link
                  href="/request-a-quote"
                  className="button-secondary inline-block w-full text-center sm:w-auto"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Right — email, phone, location */}
            <div className="flex flex-col gap-3 md:gap-4">
              {CONTACT_METHODS.map((method) => {
                const Icon = method.icon;
                const inner = (
                  <>
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#ff6726]/15 md:size-12">
                      <Icon
                        className="size-5 text-[#ff6726] md:size-6"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                    <span className="min-w-0 text-left">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 md:text-xs">
                        {method.label}
                      </span>
                      <span className="mt-0.5 block text-base font-semibold text-white md:text-lg">
                        {method.value}
                      </span>
                    </span>
                  </>
                );

                const cardClass =
                  "flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-colors md:px-6 md:py-5";

                return method.href ? (
                  <a
                    key={method.label}
                    href={method.href}
                    className={`${cardClass} hover:border-[#ff6726]/40 hover:bg-[#ff6726]/10`}
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
        </div>
      </section>

      {/* SOCIAL */}
      <section className="bg-[#f8f9fa] py-16 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/50">
            Follow us
          </p>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
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
      </section>

      {/* APPROACH */}
      <section className="relative z-10 bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl md:mb-16">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              How We Work With You
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white max-md:!text-[1.875rem] max-md:!leading-[1.15] md:text-4xl">
              Clear communication, from first message to final delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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
                  <p className="!mb-0 !text-base !text-white/80 max-md:!text-[1.125rem]">
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
