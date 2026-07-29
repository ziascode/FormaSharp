import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import { GET_PAGE_BY_URI, GET_POSTS_LIST, GET_SERVICES_LIST } from "@/lib/queries";
import { normalizePageType } from "@/lib/normalizePageType";
import Hero from "@/components/Hero";
import CofABanner from "@/components/CofABanner";
import ServiceCards from "@/components/ServiceCards";
import Video from "@/components/Video";
import EngineeringBento from "@/components/BentoSection";
import HeroAlt from "@/components/HeroAlt";
import Badges from "@/components/Badges";
import WhyChooseUs from "@/components/WhyChooseUs";
import Who from "@/components/Who";
import QuickService from "@/components/QuickService";
import Process from "@/components/Process";
import StatsBand from "@/components/StatsBand";
import How from "@/components/How";
import FinalCta from "@/components/FinalCta";
import HomeBlogSlider, {
  type HomeBlogPost,
} from "@/components/HomeBlogSlider";

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
  posts: HomeBlogPost[];
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

export default function Home({ page, services, posts }: HomePageProps) {
  const heroTitle = page?.title || HERO_TITLE_FALLBACK;
  const heroDescription = page?.content
    ? undefined
    : HERO_DESCRIPTION_FALLBACK;
  const aboutParagraph = page?.content || ABOUT_FALLBACK;

  return (
    <>
    <div className="bg-slate-300">
      <Seo
        title="Engineering & Product Design in Toronto"
        description="FormaSharp provides product design, CAD, simulation, DFM, and 3D prototyping for manufacturers and startups in Toronto, the GTA, and Southern Ontario."
        canonical="/"
      />

      <Hero />
      <QuickService />
      <CofABanner />
      <Badges />
      <StatsBand />
      <How />
      {/* <ServiceCards /> */}
      {/* <Video /> */}
      <WhyChooseUs />
      <HomeBlogSlider posts={posts} />
      <FinalCta />
      {/* <Process /> */}

      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [pageData, servicesData, postsData] = await Promise.all([
    wpFetch<{ page: HomePageProps["page"] }>(GET_PAGE_BY_URI, {
      uri: "/",
    }),
    wpFetch<{ services: { nodes: ServiceNode[] } }>(GET_SERVICES_LIST),
    wpFetch<{ posts: { nodes: HomeBlogPost[] } }>(GET_POSTS_LIST, {
      first: 12,
    }),
  ]);

  const page = pageData.page ?? null;
  const pageType = normalizePageType(page?.pageSettings?.pageType);
  const services = servicesData.services?.nodes ?? [];
  const posts = postsData.posts?.nodes ?? [];

  return {
    props: {
      page,
      pageType,
      services,
      posts,
    },
    revalidate: 60,
  };
};
