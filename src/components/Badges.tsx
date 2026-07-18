import React, { useEffect, useState } from "react";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.cjs.jsx";
import { TextReveal } from "@/components/ui/text-reveal";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { section } from "@/lib/sectionSpacing";
import { prefersWebCodecsForScrolly } from "@/lib/safariVideo";

const COPY =
  "We are an engineering partner focused on developing products that can actually be built.";
const IMAGE_SRC =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/3dproduct-opt.jpg";
const VIDEO_SRC =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/hero-animation.mp4";

function ScrollVideo({ className }: { className?: string }) {
  const [useWebCodecs, setUseWebCodecs] = useState(false);

  useEffect(() => {
    setUseWebCodecs(prefersWebCodecsForScrolly());
  }, []);

  return (
    <div className={className}>
      <ScrollyVideo
        videoPercentage={0}
        transitionSpeed={16}
        frameThreshold={0.05}
        useWebCodecs={useWebCodecs}
        full
        src={VIDEO_SRC}
      />
    </div>
  );
}

function Badges() {
  return (
    <div className="bg-white -mb-[20vh]">
      {/* Mobile: image flush to section above → text → video */}
      <div className="md:hidden">
        <img
          src={IMAGE_SRC}
          alt="3D printed product"
          className="block h-auto w-full object-cover"
        />
        <div className={`${section.container} pt-24 pb-12`}>
          <TextReveal className="!h-auto !translate-y-0 !overflow-visible !px-0 pb-6">
            {COPY}
          </TextReveal>
          <ScrollVideo className="-mt-2 h-[70vh] w-full -translate-y-[45%]" />
        </div>
      </div>

      {/* Desktop: side-by-side (unchanged) */}
      <div
        className={`bottom-section ${section.container} hidden py-24 md:block md:py-32`}
      >
        <div className="flex flex-row items-center justify-center bg-cover bg-center py-24">
          <div className="w-1/2 -translate-y-[200px]">
            <TextReveal className="color-black!important">{COPY}</TextReveal>
            <ImageMasking1 imageSrc={IMAGE_SRC} alt="3D printed product" />
          </div>
          <ScrollVideo className="h-[130vh] w-1/2 -translate-y-[150px]" />
        </div>
      </div>
    </div>
  );
}

export default Badges;
