import Link from "next/link";
import type { PortfolioImage } from "@/lib/portfolio";

type PortfolioHeroProps = {
  title: string;
  image: PortfolioImage | null;
};

export default function PortfolioHero({ title, image }: PortfolioHeroProps) {
  return (
    <header className="relative flex min-h-[55vh] items-end overflow-hidden bg-[#121926] md:min-h-[65vh]">
      {image?.sourceUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.sourceUrl}
          alt={image.altText || ""}
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top_right,rgba(18,25,38,0.72)_0%,rgba(18,25,38,0.4)_45%,rgba(18,25,38,0.15)_100%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32">
        <p className="mb-4">
          <Link
            href="/portfolio"
            className="text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            ← Portfolio
          </Link>
        </p>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] !text-[#ff6726]">
          Case Study
        </p>
        <h1 className="max-w-4xl !text-4xl !font-bold !leading-[1.05] text-white md:!text-5xl lg:!text-6xl">
          {title}
        </h1>
      </div>
    </header>
  );
}
