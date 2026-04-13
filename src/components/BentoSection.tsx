import Image from "next/image"
import type { CSSProperties } from "react"

type CardProps = {
  title: string
  description: string
  imageSrc: string
  bgClassName: string
  className?: string
  textMaxWidth?: string
  mediaClassName?: string
  imageClassName?: string
  hoverX?: string
  hoverY?: string
  accent?: React.ReactNode
  priority?: boolean
}

function BentoCard({
  title,
  description,
  imageSrc,
  bgClassName,
  className = "",
  textMaxWidth = "max-w-[30rem]",
  mediaClassName = "",
  imageClassName = "",
  hoverX = "0px",
  hoverY = "-8px",
  accent,
  priority = false,
}: CardProps) {
  const style = {
    ["--hover-x" as string]: hoverX,
    ["--hover-y" as string]: hoverY,
  } as CSSProperties

  return (
    <article
      style={style}
      className={[
        "group relative overflow-hidden rounded-[28px] p-8 md:p-9",
        "min-h-[420px] md:min-h-[500px]",
        "shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_70px_rgba(15,23,42,0.06)]",
        bgClassName,
        className,
      ].join(" ")}
    >
      <div className={`relative z-20 ${textMaxWidth}`}>
        <h3 className="text-[clamp(2rem,2.5vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#171717]">
          {title}
        </h3>

        <p className="mt-4 max-w-[34rem] text-[15px] leading-7 text-black/62 md:text-[16px]">
          {description}
        </p>
      </div>

      <div
        className={[
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[58%] overflow-hidden",
          mediaClassName,
        ].join(" ")}
      >
        {accent}

        <Image
          src={imageSrc}
          alt={title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={[
            "object-contain object-bottom",
            "transform-gpu transition-transform duration-[900ms]",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:scale-[1.06]",
            "group-hover:translate-x-[var(--hover-x)]",
            "group-hover:translate-y-[var(--hover-y)]",
            imageClassName,
          ].join(" ")}
        />
      </div>
    </article>
  )
}

export default function EngineeringBento() {
  return (
    <section className="bg-[#f6f3ee] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-4">
          <BentoCard
            title="Product design that feels manufacturable"
            description="We turn concepts into clean, production-ready forms with a focus on usability, proportion, and real-world buildability."
            imageSrc="/bento/product-design.png"
            bgClassName="bg-[#ff5e1940] "
            className="md:col-span-5"
            textMaxWidth="max-w-[24rem]"
            mediaClassName="h-[60%]"
            imageClassName="object-bottom-right px-8 pb-0"
            hoverX="10px"
            hoverY="-12px"
            priority
            accent={
              <div className="absolute -bottom-10 -left-12 h-[280px] w-[280px] rounded-full bg-[#ff9a73]" />
            }
          />

          <BentoCard
            title="Engineering systems that stay elegant"
            description="From assemblies to internal packaging, we design with structural logic, precision, and a visual standard that still feels premium."
            imageSrc="/bento/engineering-system.png"
            bgClassName="bg-[#3bc0dc88]"
            className="md:col-span-7"
            textMaxWidth="max-w-[38rem]"
            mediaClassName="h-[56%]"
            imageClassName="object-bottom px-10 pb-4"
            hoverX="-12px"
            hoverY="-10px"
            priority
          />

          <BentoCard
            title="Reverse engineering with clarity"
            description="We rebuild parts and assemblies into precise digital geometry, creating clean CAD foundations for redesign, documentation, and production."
            imageSrc="/bento/reverse-engineering.png"
            bgClassName="bg-[#25252540]"
            className="md:col-span-7"
            textMaxWidth="max-w-[36rem]"
            mediaClassName="h-[60%]"
            imageClassName="object-bottom-left px-8 pb-5"
            hoverX="12px"
            hoverY="-8px"
          />

          <BentoCard
            title="Prototyping that brings design to life"
            description="Validate fit, function, and form with high-quality prototypes that help bridge the gap between concept and final manufacturing."
            imageSrc="/bento/prototyping.png"
            bgClassName="bg-[#ff5e1940]"
            className="md:col-span-5"
            textMaxWidth="max-w-[24rem]"
            mediaClassName="h-[58%]"
            imageClassName="object-bottom px-8 pb-5"
            hoverX="-8px"
            hoverY="-10px"
          />
        </div>
      </div>
    </section>
  )
}