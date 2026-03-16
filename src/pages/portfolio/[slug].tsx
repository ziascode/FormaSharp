import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import {
  GET_PORTFOLIO_BY_SLUG,
  GET_PORTFOLIO_SLUGS,
} from "@/lib/queries";

type PortfolioItem = {
  id: string;
  title: string;
  content?: string | null;
  uri: string;
  excerpt?: string | null;
};

type PortfolioPageProps = {
  item: PortfolioItem | null;
};

export default function PortfolioDetail({ item }: PortfolioPageProps) {
  if (!item) return null;

  return (
    <Layout>
      <Seo
        title={item.title}
        description={item.excerpt ?? undefined}
        canonical={item.uri}
      />
      <article className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight">
          {item.title}
        </h1>
        <RichText html={item.content ?? null} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await wpFetch<{
    portfolioItems: { nodes: { slug: string }[] };
  }>(GET_PORTFOLIO_SLUGS);

  const paths =
    data.portfolioItems?.nodes?.map((item) => ({
      params: { slug: item.slug },
    })) ?? [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PortfolioPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  const data = await wpFetch<{ portfolioItem: PortfolioItem | null }>(
    GET_PORTFOLIO_BY_SLUG,
    { slug },
  );

  if (!data.portfolioItem) {
    return { notFound: true };
  }

  return {
    props: {
      item: data.portfolioItem,
    },
    revalidate: 60,
  };
};

