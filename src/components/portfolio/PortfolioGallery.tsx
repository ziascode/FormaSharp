import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioImage } from "@/lib/portfolio";

type PortfolioGalleryProps = {
  images: PortfolioImage[];
};

const AUTO_ADVANCE_MS = 4500;

export default function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const left = isMobile
      ? slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2
      : slide.offsetLeft;

    track.scrollTo({
      left: Math.max(0, left),
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % images.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [images.length, isPaused, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length === 0) return;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const reference = isMobile
        ? track.scrollLeft + track.clientWidth / 2
        : track.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const slidePoint = isMobile
          ? slide.offsetLeft + slide.clientWidth / 2
          : slide.offsetLeft;
        const distance = Math.abs(slidePoint - reference);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <section className="overflow-hidden bg-[#121926] py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-12">
          <div className="max-w-3xl">
            <div className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#ff6726] md:text-xs">
              Gallery
            </div>
            <h2 className="!mb-0 !text-[1.875rem] !font-bold !leading-[1.15] tracking-tight text-white md:!text-4xl md:!leading-none">
              Project visuals
            </h2>
          </div>
          {images.length > 1 ? (
            <p className="shrink-0 pb-1 font-mono text-xs tracking-wide text-white/50 md:hidden">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
          ) : null}
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="portfolio-gallery-track flex gap-3 overflow-x-auto scroll-smooth px-4 pb-2 max-md:snap-x max-md:snap-mandatory md:gap-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))]"
          aria-label="Project gallery"
        >
          {images.map((image, index) => (
            <figure
              key={`${image.sourceUrl}-${index}`}
              className="portfolio-gallery-slide relative shrink-0 overflow-hidden rounded-xl bg-white/5 max-md:snap-center md:rounded-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.sourceUrl}
                alt={image.altText || `Project image ${index + 1}`}
                className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-[min(52vh,520px)]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>

        {images.length > 1 ? (
          <div className="mx-auto mt-5 flex max-w-7xl items-center justify-center gap-2 px-6 md:mt-6 md:justify-start lg:px-10">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to gallery image ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`rounded-full transition-all max-md:h-2.5 ${
                  index === activeIndex
                    ? "h-2 w-8 bg-[#ff6726] max-md:w-7"
                    : "h-2 w-2 bg-white/30 hover:bg-white/50 max-md:w-2.5"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
