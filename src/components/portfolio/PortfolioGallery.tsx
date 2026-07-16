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

    track.scrollTo({
      left: slide.offsetLeft,
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

      const scrollLeft = track.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft - scrollLeft);
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
    <section className="overflow-hidden bg-[#121926] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-8 max-w-3xl md:mb-12">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Gallery
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Project visuals
          </h2>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="portfolio-gallery-track flex gap-5 overflow-x-auto scroll-smooth px-6 pb-2 md:gap-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))]"
          aria-label="Project gallery"
        >
          {images.map((image, index) => (
            <figure
              key={`${image.sourceUrl}-${index}`}
              className="portfolio-gallery-slide relative shrink-0 overflow-hidden rounded-2xl bg-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.sourceUrl}
                alt={image.altText || `Project image ${index + 1}`}
                className="h-[min(52vh,520px)] w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>

        {images.length > 1 ? (
          <div className="mx-auto mt-6 flex max-w-7xl items-center gap-2 px-6 lg:px-10">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to gallery image ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 bg-[#ff6726]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
