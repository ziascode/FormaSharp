import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import { GET_PAGE_BY_URI, GET_SERVICES_LIST } from "@/lib/queries";
import { normalizePageType } from "@/lib/normalizePageType";

type ServiceNode = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
};

type HomePageProps = {
  page: {
    title: string;
    content?: string | null;
    uri: string;
    pageSettings?: {
      pageType?: string | string[] | null;
    } | null;
  } | null;
  pageType: string | null;
  services: ServiceNode[];
};

const HERO_TITLE_FALLBACK = "Engineering Ideas into Real-World Products";
const HERO_DESCRIPTION_FALLBACK =
  "From concept development to production-ready designs, FormaSharp provides professional engineering, product design, and prototyping services that help innovators, startups, and manufacturers bring ideas to life.";
const ABOUT_HEADING = "Shortly About Us.";
const ABOUT_FALLBACK =
  "We are a leading construction company with 30+ years of experience in the industry. We are dedicated to providing the highest quality construction services to our customers meeting their special needs on schedule and within their budgets.";
const SECTORS_HEADING = "We Deliver the Best Services in Different Sectors.";
const SECTORS = [
  {
    title: "Startups",
    description:
      "We help startups bring their ideas to life with professional engineering and product design services.",
    href: "/services",
  },
  {
    title: "Manufacturers",
    description: "We help manufacturers bring their products to life with professional engineering and product design services.",
    href: "/services",
  },
  {
    title: "Inventors",
    description:
      "We help inventors bring their ideas to life with professional engineering and product design services.",
    href: "/services",
  },
  {
    title: "Ecommerce",
    description:
      "We help ecommerce businesses bring their ideas to life with professional engineering and product design services.",
    href: "/services",
  },
];
const STATS = [
  { value: "Credential 1", label: "Details" },
  { value: "Credential 2", label: "Details" },
  { value: "Credential 3", label: "Details" },
];

export default function Home({ page, pageType, services }: HomePageProps) {
  const title = page?.title || "Home";
  const heroTitle = page?.title || HERO_TITLE_FALLBACK;
  const heroDescription = page?.content
    ? undefined
    : HERO_DESCRIPTION_FALLBACK;
  const aboutParagraph = page?.content || ABOUT_FALLBACK;

  return (
    <Layout>
      <Seo
        title={title}
        description={pageType ? `${pageType} page` : undefined}
        canonical={page?.uri ?? undefined}
      />

      {/* Hero */}
      <section
        className=" bg-cover bg-no-repeat bg-center relative flex min-h-[100vh] flex-col items-start justify-start overflow-hidden bg-neutral-950 px-6 py-24"
        style={{
          backgroundImage: "url(https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/hero-bg.jpg)",
        }}
      >
        <div className="py-10 mt-10 mx-6 relative z-10 max-w-2xl text-left items-start">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl">
            {heroTitle}
          </h1>
          {heroDescription ? (
            <p className="mb-10 text-lg text-neutral-300 sm:text-xl">
              {heroDescription}
            </p>
          ) : (
            <div className="mb-10 text-left text-neutral-300 [&>p]:mb-2 [&>p]:text-lg">
              <RichText html={page?.content ?? null} />
            </div>
          )}
          <div className="flex flex-wrap items-center justify-start gap-4">
            <Link
              href="#"
              className="inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
            >
              Start Your Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-lg border border-neutral-500 bg-transparent px-6 py-3 text-sm font-semibold text-neutral-50 transition hover:border-neutral-400 hover:bg-neutral-800"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t  border-neutral-800 bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            Our Services
          </h2>
          <p className="mb-12 max-w-2xl text-neutral-400">
            Whatever your task is, we can implement it delivering the highest
            quality possible.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition hover:border-amber-500/50 hover:bg-neutral-900"
              >
                <h3 className="mb-2 text-lg font-semibold text-neutral-50 group-hover:text-amber-400">
                  {service.title}
                </h3>
                <span className="mt-auto text-sm font-medium text-amber-500 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/services"
              className="text-sm font-semibold text-amber-500 hover:underline"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* About / Stats */}
      <section className="border-t border-neutral-800 bg-neutral-900/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            About Us
          </h2>
          <div className="mb-16 max-w-2xl">
            <p>FormaSharp Product Design Inc. is a proudly Canadian dedicated product design company specializing in CAD services and end-to-end design support. With a strong foundation in SolidWorks and real-world experience, we help innovators, startups, and manufacturers bring ideas to lifeefficiently and accurately.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6 text-center"
              >
                <div className="text-3xl font-bold text-amber-500 md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="border-t border-neutral-800 bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            Who We Help
          </h2>
          <p className="mb-12 max-w-2xl text-neutral-400">
          Our multidisciplinary team combines mechanical engineering, industrial design, and advanced CAD development to create products that are functional, manufacturable, and ready for real-world use. Whether you are developing a new product, refining an existing design, or preparing for manufacturing, FormaSharp delivers the technical expertise needed to move your project forward with confidence.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {SECTORS.map((sector) => (
              <Link
                key={sector.title}
                href={sector.href}
                className="group rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition hover:border-neutral-600 hover:bg-neutral-900"
              >
                <h3 className="mb-2 text-lg font-semibold text-neutral-50">
                  {sector.title}
                </h3>
                <p className="mb-4 text-sm text-neutral-400">
                  {sector.description}
                </p>
                <span className="text-sm font-medium text-amber-500 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-neutral-800 bg-amber-500/10 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            Stop Dreaming! Start Building.
          </h2>
          <Link
            href="/services"
            className="inline-flex items-center rounded-lg bg-amber-500 px-8 py-4 text-base font-semibold text-neutral-950 transition hover:bg-amber-400"
          >
            Request a quote
          </Link>
        </div>
      </section>

      {/* Contact strip */}
      <section className="border-t border-neutral-800 bg-neutral-950 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-50 md:text-3xl">
            Contact Us to Specify Your Next Project Details Right Now!
          </h2>
          <form action="#" className="flex flex-col gap-4">
            <input type="text" placeholder="Name" className="w-full p-2 rounded-md border border-neutral-800 bg-neutral-950/60 text-neutral-50" />
            <input type="email" placeholder="Email" className="w-full p-2 rounded-md border border-neutral-800 bg-neutral-950/60 text-neutral-50"   />
            <input type="text" placeholder="Message" className="w-full p-2 rounded-md border border-neutral-800 bg-neutral-950/60 text-neutral-50" />
            
          </form>
          <Link
            href="/about"
            className="inline-flex items-center rounded-lg border border-amber-500 bg-transparent px-6 py-3 text-sm font-semibold text-amber-500 transition hover:bg-amber-500/10"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [pageData, servicesData] = await Promise.all([
    wpFetch<{ page: HomePageProps["page"] }>(GET_PAGE_BY_URI, {
      uri: "/",
    }),
    wpFetch<{ services: { nodes: ServiceNode[] } }>(GET_SERVICES_LIST),
  ]);

  const page = pageData.page ?? null;
  const pageType = normalizePageType(page?.pageSettings?.pageType);
  const services = servicesData.services?.nodes ?? [];

  return {
    props: {
      page,
      pageType,
      services,
    },
    revalidate: 60,
  };
};
