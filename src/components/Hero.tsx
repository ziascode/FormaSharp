"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import ExtraBadges from "@/components/ExtraBadges";
import { enableSafariAutoplay } from "@/lib/safariVideo";

const HERO_VIDEO_SRC = "/videos/decon2-scrub.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    return enableSafariAutoplay(video);
  }, []);

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("services");
    if (!target) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative isolate m-0 flex min-h-[100svh] flex-col overflow-hidden bg-[#111] md:h-[110vh] md:min-h-0">
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full origin-center object-cover object-[48%_center] scale-[1.15] md:translate-x-0 md:scale-100 md:object-center"
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Mobile-only scrim — very light in top-left text area */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_75%_at_0%_15%,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.1)_40%,rgba(0,0,0,0.4)_100%)] md:hidden"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl text-left text-white">
            <span className="mb-4 inline-flex whitespace-nowrap border-0 bg-transparent px-0 py-0 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90 md:mb-6 md:rounded-full md:border md:border-white/20 md:bg-white/10 md:px-4 md:py-2 md:text-xs md:tracking-[0.18em]">
              Mechanical engineering & product development
            </span>

            <h1
              className="!mb-5 max-w-[60vw] !text-4xl !leading-[1.05] font-bold text-white md:max-w-xl md:!text-5xl lg:!text-6xl"
              style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
            >
              Engineering ideas into products.
            </h1>

            <p className="!mb-8 max-w-lg !text-base !text-white/85 md:!text-lg">
              Mechanical design, DFM, and 3D prototyping for startups and
              manufacturers who need parts that work the first time on the line.
            </p>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="button-primary inline-block w-full text-center sm:w-auto">
                Request quote
              </Link>
              <a
                href="#services"
                onClick={scrollToServices}
                className="button-secondary inline-flex w-full items-center justify-center gap-2 text-center sm:w-auto"
              >
                Explore Our Services
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto p-0 md:py-8">
        <div className="w-full max-w-none px-0 md:mx-auto md:max-w-7xl md:px-10 lg:px-16 xl:px-24">
          <ExtraBadges contentAlign="start" className="[&>div]:!mt-0" />
        </div>
      </div>
    </div>
  );
}
