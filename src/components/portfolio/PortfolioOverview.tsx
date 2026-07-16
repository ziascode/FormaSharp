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
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={
            hasImage
              ? "grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-16 xl:gap-20"
              : "max-w-3xl"
          }
        >
          <div className={hasImage ? "lg:col-span-6 xl:col-span-7" : undefined}>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
              Project Overview
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
              About this project
            </h2>
            {isHtml ? (
              <RichText
                html={content}
                variant="blog"
                className="text-lg leading-relaxed text-neutral-700"
              />
            ) : (
              <div className="text-lg leading-relaxed text-neutral-700 whitespace-pre-wrap">
                {content}
              </div>
            )}
          </div>

          {hasImage ? (
            <div className="flex lg:col-span-6 lg:items-center xl:col-span-5">
              <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto lg:max-w-none">
                <div
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_28px_60px_-12px_rgba(0,0,0,0.22),0_12px_24px_-8px_rgba(1,98,138,0.18)]"
                  style={{ transform: "translateY(-6px)" }}
                >
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
