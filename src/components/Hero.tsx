import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const HERO_VIDEO_SRC =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/hero-vid1.mp4";

export default function Hero() {
  return (
    <div className="relative isolate m-0 flex h-[100vh] flex-col items-start justify-center overflow-hidden bg-[#111]">
      <video
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-black/35" aria-hidden />

      <div className="relative z-10 max-w-5xl px-6 sm:px-6 md:px-[30vw] lg:px-[5vw]">
        <div className="max-w-xl text-left text-white">
          <h1 className="max-w-2xl text-4xl font-bold">
            Engineering Ideas into Products
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg">
            From early-stage concepts to production-ready designs, FormaSharp
            helps startups, manufacturers, and engineering teams develop
            products that are functional, optimized, and ready for real-world
            manufacturing.{" "}
          </p>
          <InteractiveHoverButton className="button-primary mt-6">
            Explore Services
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
}
