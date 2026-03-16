import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import {
  GET_PAGE_BY_URI,
  GET_PORTFOLIO_LIST,
} from "@/lib/queries";
import { normalizePageType } from "@/lib/normalizePageType";

type PortfolioNode = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
};

type PortfolioIndexProps = {
  page: {
    title: string;
    content?: string | null;
    uri: string;
    pageSettings?: {
      pageType?: string | string[] | null;
    } | null;
  } | null;
  pageType: string | null;
  items: PortfolioNode[];
};

export default function PortfolioIndex({
  page,
  pageType,
  items,
}: PortfolioIndexProps) {
  const title = page?.title || "Portfolio";

  return (
    <Layout>
      <Seo
        title={title}
        description={pageType ? `${pageType} page` : undefined}
        canonical={page?.uri ?? undefined}
      />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">
            {page?.title ?? "Portfolio"}
          </h1>
          <RichText html={page?.content ?? null} />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition hover:border-neutral-500 hover:bg-neutral-900"
            >
              <h2 className="mb-2 text-lg font-semibold group-hover:text-neutral-50">
                {item.title}
              </h2>
              {item.excerpt && (
                <div className="text-sm text-neutral-400">
                  <RichText html={item.excerpt} />
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<PortfolioIndexProps> = async () => {
  const [{ page }, portfolioData] = await Promise.all([
    wpFetch<{ page: PortfolioIndexProps["page"] }>(GET_PAGE_BY_URI, {
      uri: "/portfolio/",
    }),
    wpFetch<{ portfolioItems: { nodes: PortfolioNode[] } }>(
      GET_PORTFOLIO_LIST,
    ),
  ]);

  const pageType = normalizePageType(page?.pageSettings?.pageType);

  return {
    props: {
      page: page ?? null,
      pageType,
      items: portfolioData.portfolioItems?.nodes ?? [],
    },
    revalidate: 60,
  };
};

