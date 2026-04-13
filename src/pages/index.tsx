import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import { GET_PAGE_BY_URI, GET_SERVICES_LIST } from "@/lib/queries";
import { normalizePageType } from "@/lib/normalizePageType";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import Video from "@/components/Video";
import EngineeringBento from "@/components/BentoSection";
import HeroAlt from "@/components/HeroAlt";
import Badges from "@/components/Badges";
import WhyChooseUs from "@/components/WhyChooseUs";
import Who from "@/components/Who";
import QuickService from "@/components/QuickService";
import Process from "@/components/Process";
import How from "@/components/How";

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
    <>
    <div className="bg-slate-300">
      <Seo
        title={title}
        description={pageType ? `${pageType} page` : undefined}
        canonical={page?.uri ?? undefined}
      />

      <Hero />
      <QuickService />
      <Badges />
      <How />
      {/* <ServiceCards /> */}
      <Video />
      <WhyChooseUs />
      <Process />

     

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
      </div>
    </>
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
