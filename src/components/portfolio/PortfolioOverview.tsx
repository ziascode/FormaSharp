import RichText from "@/components/RichText";
import type { PortfolioImage } from "@/lib/portfolio";

type PortfolioOverviewProps = {
  content: string;
  featuredImage?: PortfolioImage | null;
};

export default function PortfolioOverview({
  content,
  featuredImage,
}: PortfolioOverviewProps) {
  const isHtml = /<[^>]+>/.test(content);
  const hasImage = Boolean(featuredImage?.sourceUrl);

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={
            hasImage
              ? "grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-12 lg:items-center lg:gap-16 xl:gap-20"
              : "max-w-3xl"
          }
        >
          <div
            className={
              hasImage
                ? "max-md:order-2 lg:col-span-6 xl:col-span-7"
                : undefined
            }
          >
            <div className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#ff6726] md:mb-4 md:text-xs">
              Project Overview
            </div>
            <h2 className="mb-5 !text-[1.875rem] !font-bold !leading-[1.15] tracking-tight text-neutral-950 md:mb-6 md:!text-4xl md:!leading-none">
              About this project
            </h2>
            {isHtml ? (
              <RichText
                html={content}
                variant="blog"
                className="!text-[1.125rem] leading-relaxed text-neutral-700 md:!text-lg"
              />
            ) : (
              <div className="whitespace-pre-wrap !text-[1.125rem] leading-relaxed text-neutral-700 md:!text-lg">
                {content}
              </div>
            )}
          </div>

          {hasImage ? (
            <div className="flex max-md:order-1 lg:col-span-6 lg:items-center xl:col-span-5">
              <div className="relative w-full lg:ml-auto lg:max-w-none">
                <div className="overflow-hidden rounded-xl border border-black/10 bg-white max-md:rounded-2xl md:rounded-2xl md:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.22),0_12px_24px_-8px_rgba(1,98,138,0.18)] md:translate-y-[-6px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredImage!.sourceUrl}
                    alt={featuredImage!.altText || "Project featured image"}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
