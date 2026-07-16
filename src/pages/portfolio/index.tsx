import type { GetStaticProps } from "next";
import Link from "next/link";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import {
  type PortfolioItem,
  resolvePortfolioPage,
} from "@/lib/portfolio";
import { wpFetch } from "@/lib/wpFetch";
import {
  GET_PAGE_BY_URI,
  GET_PORTFOLIO_LIST,
} from "@/lib/queries";
import { normalizePageType } from "@/lib/normalizePageType";

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
  items: PortfolioItem[];
};

function cardImage(item: PortfolioItem): string | undefined {
  const resolved = resolvePortfolioPage(item);
  return (
    item.featuredImage?.node?.sourceUrl ??
    resolved.heroImage?.sourceUrl ??
    undefined
  );
}

export default function PortfolioIndex({
  page,
  pageType,
  items,
}: PortfolioIndexProps) {
  const title = page?.title || "Portfolio";

  return (
    <>
      <Seo
        title={title}
        description={pageType ? `${pageType} page` : undefined}
        canonical={page?.uri ?? "/portfolio/"}
      />

      {/* HERO — aligned with service page typography */}
      <section className="relative overflow-hidden bg-[#121926]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.35), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h4 className="!mb-0 !text-white">
                OUR <span className="text-[#ff6726]">WORK</span>
              </h4>
              <h1 className="max-w-2xl !pt-5 !text-5xl !font-bold !leading-none !text-white md:!text-6xl">
                {page?.title ?? "Portfolio"}
              </h1>
            </div>
            <div className="max-w-xl lg:pb-2">
              {page?.content ? (
                <div className="rich-text-content max-w-none !text-lg !leading-relaxed !text-white/80 [&_p]:!mb-4 [&_p]:!text-white/80 [&_p:last-child]:!mb-0">
                  <RichText html={page.content} />
                </div>
              ) : (
                <h3 className="!mb-0 max-w-2xl !text-lg !font-normal !leading-relaxed !text-white/80">
                  Explore product design and engineering projects from concept
                  through to production-ready solutions.
                </h3>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT GRID — 2 columns at all breakpoints */}
      <section className="bg-[#f8f9fa] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 max-w-3xl md:mb-14">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Case Studies
            </div>
            <h2 className="!mb-0 text-3xl font-bold leading-[1.08] tracking-tight text-neutral-950 md:text-4xl lg:text-[2.75rem] lg:leading-[1.06]">
              Selected projects
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {items.map((item) => {
              const image = cardImage(item);

              return (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#01628a]/25 hover:shadow-[0_20px_40px_-20px_rgba(18,25,38,0.25)]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image}
                        alt={
                          item.featuredImage?.node?.altText ||
                          item.title
                        }
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#121926_0%,#01628a_100%)] px-4 text-center">
                        <span className="text-sm font-medium !text-white/70">
                          {item.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#ff6726] sm:text-xs">
                      Case Study
                    </p>
                    <h3 className="!mb-4 !text-base !font-bold !leading-snug !text-neutral-950 transition-colors group-hover:!text-[#01628a] sm:!text-lg md:!text-xl">
                      {item.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium !text-[#01628a] transition-colors group-hover:!text-[#ff6726] sm:text-base">
                      Explore case study
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<PortfolioIndexProps> = async () => {
  const [{ page }, portfolioData] = await Promise.all([
    wpFetch<{ page: PortfolioIndexProps["page"] }>(GET_PAGE_BY_URI, {
      uri: "/portfolio/",
    }),
    wpFetch<{ portfolioItems: { nodes: PortfolioItem[] } }>(
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
