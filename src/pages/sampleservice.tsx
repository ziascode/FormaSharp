import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import { GET_SERVICE_BY_SLUG } from "@/lib/queries";

type Service = {
  id: string;
  title: string;
  content?: string | null;
  uri: string;
  excerpt?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string | null;
    } | null;
  } | null;
};

type SampleServicePageProps = {
  service: Service | null;
};

const PRODUCT_DESIGN_SLUG = "product-design";

export default function SampleService({ service }: SampleServicePageProps) {
  const title = service?.title ?? "Product Design";
  const excerpt = service?.excerpt ?? null;
  const content = service?.content ?? null;
  const heroImage = service?.featuredImage?.node?.sourceUrl;

  return (
    <Layout>
      <Seo
        title={title}
        description={excerpt ?? undefined}
        canonical={service?.uri ?? undefined}
      />

      {/* Hero — Kaleidoscope-style: bold headline + supporting copy + CTA */}
      <section
        className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden px-6 pb-24 pt-32 md:px-12 lg:px-16"
        style={
          heroImage
            ? {
                backgroundImage: `linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.95) 100%), url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)",
              }
        }
      >
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-6 text-sm italic text-neutral-500">
            Section — Overview
          </p>
          <h1 className="mb-10 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {excerpt && (
            <div className="mb-10 max-w-2xl leading-relaxed text-lg text-neutral-300 [&_p]:mb-4">
              <RichText html={excerpt} />
            </div>
          )}
          <Link
            href="/about"
            className="inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>

      {/* Section — Human-centered focus */}
      <section className="border-t border-neutral-800 bg-neutral-950 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm italic text-neutral-500">
            Section — Human-centered solutions
          </p>
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-neutral-50 md:text-4xl">
            Human-centered solutions
          </h2>
          <h3 className="mb-8 text-xl font-bold text-neutral-50 md:text-2xl">
            Focused on form, function, and user experience
          </h3>
          <p className="mb-6 leading-relaxed text-neutral-400">
            Our process starts with understanding your users and the problem you
            want to solve. We combine disciplined research with creative
            execution to deliver product design that is both functional and
            desirable.
          </p>
          <p className="mb-4 leading-relaxed text-neutral-400">
            You may benefit from this approach if:
          </p>
          <ul className="mb-12 list-disc space-y-4 pl-6 leading-relaxed text-neutral-400">
            <li>Form, function, and user experience in every decision</li>
            <li>Concept iteration and prototyping to de-risk early</li>
            <li>Design for manufacturing built into the process</li>
            <li>Clear communication and alignment with your goals</li>
          </ul>
          <Link
            href="/about"
            className="inline-flex items-center rounded-lg border border-amber-500 px-6 py-3 text-sm font-semibold text-amber-500 transition hover:bg-amber-500/10"
          >
            Book a consultation
          </Link>
        </div>
      </section>

      {/* Main content from WP */}
      {content && (
        <section className="border-t border-neutral-800 bg-neutral-900/30 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-sm italic text-neutral-500">
              Section — What we deliver
            </p>
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-neutral-50 md:text-4xl">
              What we deliver
            </h2>
            <div className="prose prose-invert prose-neutral max-w-none leading-relaxed [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-bold [&_p]:mb-6 [&_p]:text-neutral-400 [&_ul]:mb-8 [&_ul]:list-disc [&_ul]:space-y-4 [&_ul]:pl-6 [&_li]:leading-relaxed [&_li]:text-neutral-400">
              <RichText html={content} />
            </div>
          </div>
        </section>
      )}

      {/* Section — Expertise beyond product design */}
      <section className="border-t border-neutral-800 bg-neutral-950 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm italic text-neutral-500">
            Section — Expertise
          </p>
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-neutral-50 md:text-4xl">
            Our expertise goes beyond product design
          </h2>
          <h3 className="mb-8 text-xl font-bold text-neutral-50 md:text-2xl">
            Resources and support
          </h3>
          <p className="mb-4 leading-relaxed text-neutral-400">
            We can support you in the following ways:
          </p>
          <ul className="mb-12 list-disc space-y-4 pl-6 leading-relaxed text-neutral-400">
            <li>From CAD and engineering support to prototyping and design for manufacture, we work alongside you so your product is ready for the next step.</li>
            <li>We bring a single point of contact and a process that fits your timeline and budget.</li>
          </ul>
          <p className="mb-4 leading-relaxed text-neutral-400">
            Our capabilities include:
          </p>
          <ul className="mb-10 list-disc space-y-4 pl-6 leading-relaxed text-neutral-400">
            <li>CAD & engineering</li>
            <li>Prototyping</li>
            <li>Design for manufacture</li>
          </ul>
          <Link
            href="/services"
            className="text-sm font-semibold text-amber-500 hover:underline"
          >
            View all services →
          </Link>
        </div>
      </section>

      {/* Section — Testimonial */}
      <section className="border-t border-neutral-800 bg-amber-500/5 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm italic text-neutral-500">
            Section — Client feedback
          </p>
          <blockquote className="text-xl font-medium italic leading-relaxed text-neutral-300 md:text-2xl">
            &ldquo;Clear process, on-time delivery, and designs that were ready
            for our manufacturer. We&apos;d work with them again.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-neutral-500">
            — Client feedback
          </p>
        </div>
      </section>

      {/* Section — CTA */}
      <section className="border-t border-neutral-800 bg-neutral-950 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm italic text-neutral-500">
            Section — Get in touch
          </p>
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-neutral-50 md:text-4xl">
            Ready to bring your product to life?
          </h2>
          <p className="mb-12 leading-relaxed text-neutral-400">
            We welcome the chance to support your product design needs. Get in
            touch.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center rounded-lg bg-amber-500 px-8 py-4 text-base font-semibold text-neutral-950 transition hover:bg-amber-400"
          >
            Schedule a consultation
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<SampleServicePageProps> = async () => {
  const data = await wpFetch<{ service: Service | null }>(
    GET_SERVICE_BY_SLUG,
    { slug: PRODUCT_DESIGN_SLUG }
  );

  return {
    props: {
      service: data.service ?? null,
    },
    revalidate: 60,
  };
};
