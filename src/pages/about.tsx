import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { DotPattern } from "@/components/ui/DotPatternProps";
import Seo from "@/components/Seo";
import StatsBand from "@/components/StatsBand";

const LOGO_SRC =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/logo-light2.png";

const IMG = {
  pGraphic:
    "https://images.squarespace-cdn.com/content/v1/68336a436acf0028ccedc8c9/ba47a3ff-5bb7-4ccf-90ec-d14a5f468fc2/Ai+File3.png?format=1500w",
  productRender:
    "https://images.squarespace-cdn.com/content/v1/68336a436acf0028ccedc8c9/d5980bd1-d68a-4b12-8a11-11c05cbb0dc1/CP0020-0001_Camera_Default+Camera+3.png?format=1500w",
  founder:
    "https://images.squarespace-cdn.com/content/v1/68336a436acf0028ccedc8c9/287e5879-6c3e-4302-93df-8ce4753801cb/Suhair+Sabir+2019.jpg?format=1500w",
  cswaBadge:
    "https://images.squarespace-cdn.com/content/v1/68336a436acf0028ccedc8c9/e424ec9e-0848-4df9-b6d4-6f9a530e7fa0/ASSOCIATE+-+MECHANICAL+DESIGN.png?format=1000w",
  peoLogo:
    "https://images.squarespace-cdn.com/content/v1/68336a436acf0028ccedc8c9/ba56deb2-f4b3-4e48-a14c-957ffa7c1208/peo-logo.png?format=1000w",
  nxBadge:
    "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-badge-for-NX-design-associate.jpeg",
};

type ServiceItem = {
  href: string;
  label: string;
  description: string;
};

const SERVICES: ServiceItem[] = [
  {
    href: "/ProductDesign",
    label: "Product Design",
    description: "Concept to production-ready engineered products.",
  },
  {
    href: "/CADServices",
    label: "CAD Services",
    description: "Precision 3D models, assemblies, and technical drawings.",
  },
  {
    href: "/Simulation",
    label: "Mechanical Engineering & Simulation",
    description: "FEA, CFD, and thermal analysis for engineering decisions.",
  },
  {
    href: "/DesignForManufacturing",
    label: "Design for Manufacturing (DFM)",
    description: "Optimize designs for efficient, cost-effective production.",
  },
  {
    href: "/ReverseEngineering",
    label: "Reverse Engineering",
    description: "Rebuild accurate CAD models from existing physical parts.",
  },
  {
    href: "/3dprinting",
    label: "Prototyping & 3D Printing",
    description: "High-resolution prototypes on engineering-grade materials.",
  },
];

const CREDENTIALS = [
  {
    image: IMG.cswaBadge,
    title: "Certified SolidWorks Associate",
    description:
      "Every design meets recognized industry standards for precision and quality.",
  },
  {
    image: IMG.peoLogo,
    title: "Professional Engineering Foundation",
    description:
      "Grounded in formal engineering education and mechanical systems expertise.",
  },
  {
    image: IMG.nxBadge,
    title: "NX Design Associate",
    description:
      "Certified in Siemens NX for advanced product design and modeling workflows.",
  },
];

const credentialsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const credentialItemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function About() {
  return (
    <div>
      <Seo
        title="About Us"
        description="FormaSharp Product Design Inc. is a Canadian product design company specializing in CAD services and end-to-end design support."
        canonical="/about/"
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0f1e]">
        {/* Blue glow, top-right */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.40), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10  mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-24 md:grid-cols-2 md:gap-16 md:pb-20 md:pt-[30vh] lg:px-10">
          <div className="flex flex-col items-start text-left">
            <h1 className="!mb-4 !text-2xl !font-light !leading-none !text-white md:!text-3xl">
              About Us
            </h1>
            <img
              src={LOGO_SRC}
              alt="FormaSharp"
              className="h-24 w-auto md:h-36 lg:h-44"
              loading="eager"
            />
          </div>

          <div className="justify-self-end text-left md:max-w-xl">
            <p className="!mb-0 !text-base !leading-relaxed !text-white/80 md:!text-lg">
              FormaSharp Product Design Inc. is a proudly Canadian dedicated
              product design company specializing in CAD services and end-to-end
              design support. With a strong foundation in SolidWorks and
              real-world experience, we help innovators, startups, and
              manufacturers bring ideas to life—efficiently and accurately.
            </p>
          </div>
        </div>
      </section>

      <div className="-mt-px">
        <StatsBand variant="light" />
      </div>

      {/* ABOUT THE FOUNDER */}
      <section className="bg-[#f8f9fa] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl bg-neutral-200 shadow-sm">
                <img
                  src={IMG.founder}
                  alt="Syed S., founder of FormaSharp Product Design Inc."
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
                About the Founder
              </div>
              <h2 className="text-4xl font-bold leading-[1.08] tracking-tight text-neutral-950 md:text-5xl">
                Engineering depth behind every project
              </h2>
              <p>
                FormaSharp Product Design Inc. was founded in 2025 in Mississauga,
                Ontario, Canada by Syed S., who brings extensive experience in
                heavy machinery equipment design along with a deep understanding
                of mechanical systems, precision engineering, and
                manufacturability.
              </p>
              <p>
                Syed holds a Bachelor of Engineering in Nuclear Engineering from
                the University of Ontario Institute of Technology (UOIT) and has
                authored several research papers, presenting at the 27th
                International Conference on Nuclear Engineering (ICONE-27) in
                Tsukuba, Japan and the 39th Annual Conference of the Canadian
                Nuclear Society in Ottawa, Canada. As a Certified SolidWorks
                Associate (CSWA), he ensures every design meets industry standards
                for precision and quality.
              </p>
              <p>
                He started this company to offer the same level of quality and
                professionalism to entrepreneurs, startups, and growing
                businesses, without the red tape. That hands-on expertise, paired
                with a passion for problem-solving and product development, drives
                everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS / RECOGNITION */}
      <section className="relative z-10 bg-[linear-gradient(to_bottom_right,#121926,#01628a)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT: text */}
            <div className="max-w-xl">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
                Credentials & Recognition
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Built on certified, industry-recognized expertise
              </h2>
              <p className="mt-4 !text-base leading-relaxed !text-white/80 md:text-lg">
                Our qualifications back up the work, so you can trust that every
                deliverable is accurate, manufacturable, and held to a
                professional standard.
              </p>
            </div>

            {/* RIGHT: stacked badges with appear-up on scroll */}
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={credentialsContainerVariants}
            >
              {CREDENTIALS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={credentialItemVariants}
                  className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
                >
                  <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="!mb-2 !text-xl !font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="!mb-0 !text-base !text-white/80">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-3xl md:mb-16">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              What We Do
            </div>
            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight text-neutral-950 md:text-5xl">
              Engineering services that move products forward
            </h2>
            <p>
              From the first sketch to manufacturing-ready files, we cover the
              full range of design and engineering work under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col rounded-2xl border border-black/10 bg-stone-50 p-6 transition-colors hover:border-[#ff6726]/40 hover:bg-[#ff6726]/5 md:p-7"
              >
                <h3 className="!mb-2 !text-xl !font-bold text-neutral-950">
                  {service.label}
                </h3>
                <p className="!mb-6 !text-base !text-black/70">
                  {service.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#ff6726]">
                  Learn more
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <DotPattern className="bg-black/95">
        <div
          id="cta"
          className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32"
        >
          <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Contact Us
          </div>
          <h1 className="!text-6xl !leading-none font-bold text-white">
            Interested in working{" "}
            <span className="italic text-[#ff6726]">together?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
            Share a few details about your project and we will be in touch
            shortly. Whether you are bringing a new product to life or refining a
            mechanical system, we are here to help you build it right.
          </p>
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
            <InteractiveHoverButton className="button-primary">
              Start Your Project
            </InteractiveHoverButton>
            <Link href="/contact" className="button-secondary inline-block">
              Book a Consultation
            </Link>
          </div>

          <div className="mt-12 flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs tracking-wider text-white/50 sm:flex-row">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5 text-[#ff6726]" strokeWidth={2} aria-hidden />
              Mississauga, ON
            </span>
            <a
              href="mailto:admin@formasharp.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="size-3.5 text-[#ff6726]" strokeWidth={2} aria-hidden />
              admin@formasharp.com
            </a>
            <a
              href="tel:+14164719300"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="size-3.5 text-[#ff6726]" strokeWidth={2} aria-hidden />
              (416) 471-9300
            </a>
          </div>
        </div>
      </DotPattern>
    </div>
  );
}
