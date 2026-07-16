import type { GetStaticPaths, GetStaticProps } from "next";
import Seo from "@/components/Seo";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioHighlights from "@/components/portfolio/PortfolioHighlights";
import PortfolioOverview from "@/components/portfolio/PortfolioOverview";
import {
  type PortfolioItem,
  resolvePortfolioPage,
} from "@/lib/portfolio";
import { wpFetch } from "@/lib/wpFetch";
import {
  GET_PORTFOLIO_BY_SLUG,
  GET_PORTFOLIO_SLUGS,
} from "@/lib/queries";

type PortfolioPageProps = {
  item: PortfolioItem | null;
};

export default function PortfolioDetail({ item }: PortfolioPageProps) {
  if (!item) return null;

  const page = resolvePortfolioPage(item);

  return (
    <>
      <Seo
        title={page.heroTitle}
        description={page.overview || item.excerpt || undefined}
        canonical={`/portfolio/${item.slug}`}
        ogImage={page.heroImage?.sourceUrl ?? undefined}
      />
      <article>
        <PortfolioHero title={page.heroTitle} image={page.heroImage} />
        {page.overview ? (
          <PortfolioOverview
            content={page.overview}
            featuredImage={item.featuredImage?.node ?? null}
          />
        ) : null}
        <PortfolioHighlights items={page.highlights} />
        <PortfolioGallery images={page.gallery} />
      </article>
    </>
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
