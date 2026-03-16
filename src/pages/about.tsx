import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import { GET_PAGE_BY_URI } from "@/lib/queries";
import { normalizePageType } from "@/lib/normalizePageType";

type AboutPageProps = {
  page: {
    title: string;
    content?: string | null;
    uri: string;
    pageSettings?: {
      pageType?: string | string[] | null;
    } | null;
  } | null;
  pageType: string | null;
};

export default function About({ page, pageType }: AboutPageProps) {
  const title = page?.title || "About";

  return (
    <Layout>
      <Seo
        title={title}
        description={pageType ? `${pageType} page` : undefined}
        canonical={page?.uri ?? undefined}
      />

      {/* About — intro from WP */}
      <section className="border-b border-neutral-800 bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-neutral-50 md:text-5xl">
            {page?.title ?? "About"}
          </h1>
          <div className="max-w-3xl text-neutral-400 [&_a]:text-amber-500">
            <RichText html={page?.content ?? null} />
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="border-b border-neutral-800 bg-neutral-900/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            Credentials
          </h2>
          <p className="max-w-3xl text-neutral-400">
            Our team holds industry-recognized qualifications and experience in
            product design, CAD, and engineering. We combine technical expertise
            with a commitment to quality and client success.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-neutral-800 bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            Process
          </h2>
          <ul className="max-w-3xl list-disc space-y-2 pl-6 text-neutral-400">
            <li>End-to-end product design and CAD services</li>
            <li>Concept development through to production-ready designs</li>
            <li>
              Patent services — we refer you to trusted legal partners for
              patent filing and protection. Contact us to be connected with a
              lawyer.
            </li>
          </ul>
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-b border-neutral-800 bg-neutral-900/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            Why choose us
          </h2>
          <p className="mb-8 max-w-3xl text-neutral-400">
            We focus on clear communication, on-time delivery, and designs that
            are ready for manufacture. Our clients benefit from a single point
            of contact and a process built around their goals.
          </p>
          <ul className="max-w-3xl list-disc space-y-2 pl-6 text-neutral-400">
            <li>Experienced in SolidWorks and industry-standard tools</li>
            <li>Pragmatic approach from idea to production</li>
            <li>Transparent pricing and project timelines</li>
          </ul>
        </div>
      </section>

      {/* Local / Toronto */}
      <section className="border-b border-neutral-800 bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            Local presence — Toronto
          </h2>
          <p className="max-w-3xl text-neutral-400">
            We are based in the Greater Toronto Area and serve clients locally
            and across Canada. Working with a Toronto-based team means
            time-zone alignment, easy collaboration, and a partner who
            understands the North American market.
          </p>
        </div>
      </section>

      {/* Long term: North America + Book virtual appointment */}
      <section className="border-b border-neutral-800 bg-amber-500/10 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
            Long term: targeting North America
          </h2>
          <p className="mb-8 text-neutral-400">
            We are expanding our reach across North America. Wherever you are,
            you can work with us remotely.
          </p>
          <Link
            href="#"
            className="inline-flex items-center rounded-lg bg-amber-500 px-8 py-4 text-base font-semibold text-neutral-950 transition hover:bg-amber-400"
          >
            Book virtual appointment
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const data = await wpFetch<{ page: AboutPageProps["page"] }>(
    GET_PAGE_BY_URI,
    {
      uri: "/about/",
    },
  );

  const page = data.page ?? null;
  const pageType = normalizePageType(page?.pageSettings?.pageType);

  return {
    props: {
      page,
      pageType,
    },
    revalidate: 60,
  };
};
