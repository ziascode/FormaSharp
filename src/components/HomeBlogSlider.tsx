"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { section } from "@/lib/sectionSpacing";

export type HomeBlogPost = {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
};

type HomeBlogSliderProps = {
  posts: HomeBlogPost[];
};

const GAP = 32;
const INTERVAL_MS = 3000;

export default function HomeBlogSlider({ posts }: HomeBlogSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const loopingRef = useRef(false);

  const getStep = useCallback(() => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>("[data-blog-card]");
    if (!card) return 0;
    return card.offsetWidth + GAP;
  }, []);

  const getSetWidth = useCallback(() => {
    return getStep() * posts.length;
  }, [getStep, posts.length]);

  const normalizeScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || posts.length === 0) return;

    const setWidth = getSetWidth();
    if (setWidth <= 0) return;

    if (scroller.scrollLeft >= setWidth) {
      loopingRef.current = true;
      scroller.scrollLeft -= setWidth;
      requestAnimationFrame(() => {
        loopingRef.current = false;
      });
    }
  }, [getSetWidth, posts.length]);

  useEffect(() => {
    if (posts.length <= 1 || paused) return;

    const id = window.setInterval(() => {
      const scroller = scrollerRef.current;
      if (!scroller || loopingRef.current) return;

      const step = getStep();
      if (step <= 0) return;

      scroller.scrollBy({ left: step, behavior: "smooth" });

      // Normalize after the smooth scroll settles
      window.setTimeout(() => {
        normalizeScroll();
      }, 750);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [posts.length, paused, getStep, normalizeScroll]);

  if (posts.length === 0) return null;

  const loopPosts = [...posts, ...posts];

  return (
    <section className={`w-full bg-white ${section.padding}`}>
      <div className={section.container}>
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
            Insights
          </div>
          <h2 className="!mb-0 text-3xl font-bold tracking-tight text-black md:text-4xl">
            From the <span className="text-[#ff6726]">blog</span>
          </h2>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-8 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onScroll={normalizeScroll}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {loopPosts.map((post, i) => {
            const image = post.featuredImage?.node;

            return (
              <article
                key={`${post.id}-${i}`}
                data-blog-card
                className="w-[85%] shrink-0 sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="overflow-hidden bg-neutral-100">
                    {image?.sourceUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image.sourceUrl}
                        alt={image.altText || post.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="aspect-[16/10] w-full bg-gradient-to-br from-[#121926] to-[#01628a]" />
                    )}
                  </div>
                  <h3
                    className="!mb-3 !mt-5 !text-2xl !font-bold !leading-tight !text-[#121926] transition-colors group-hover:!text-[#01628a]"
                    style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
                  >
                    {post.title}
                  </h3>
                  <span className="text-base !text-[#121926] transition-colors group-hover:!text-[#ff6726]">
                    Learn More →
                  </span>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/blog"
            className="text-sm font-medium text-[#121926]/70 underline-offset-4 transition-colors hover:text-[#ff6726] hover:underline"
          >
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
