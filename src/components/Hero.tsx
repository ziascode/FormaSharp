"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const HERO_VIDEO_SRC = "/videos/decon2-scrub.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
    }

    return () => video.removeEventListener("loadeddata", tryPlay);
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
    <div className="relative isolate m-0 flex h-[110vh] flex-col overflow-hidden bg-[#111]">
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl text-left text-white">
            <span className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/90">
              Mechanical engineering & product development
            </span>

            <h1
              className="!mb-5 max-w-xl !text-4xl !leading-[1.05] font-bold text-white sm:!text-5xl lg:!text-6xl"
              style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
            >
              Engineering ideas into products.
            </h1>

            <p className="!mb-8 max-w-lg !text-base !text-white/85 sm:!text-lg">
              Mechanical design, DFM, and 3D prototyping for startups and
              manufacturers who need parts that work the first time on the line.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="button-primary inline-block text-center">
                Request a quote
              </Link>
              <a
                href="#services"
                onClick={scrollToServices}
                className="button-secondary inline-flex items-center justify-center gap-2 text-center"
              >
                Explore Our Services
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
