import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "end 0.9"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")
  const total = words.length

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex h-[30vh] items-start justify-start overflow-hidden bg-transparent px-4 -translate-y-[10vh] "
    >
      <div className="mx-auto w-full max-w-5xl">
        <span className="flex flex-wrap justify-start whitespace-pre-wrap text-center text-3xl font-semibold tracking-tight text-black/12 md:text-4xl lg:text-5xl dark:text-white/12">
          {words.map((word, i) => {
            const step = 1 / total
            const start = i * step
            const end = start + step * 1.0

            return (
              <Word
                key={`${word}-${i}`}
                progress={smoothProgress}
                range={[start, end]}
              >
                {word}
              </Word>
            )
          })}
        </span>
      </div>
    </section>
  )
}
interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [10, 0])
  const scale = useTransform(progress, range, [0.985, 1])

  return (
    <span className="relative mr-[0.25em] mb-[0.15em] inline-block">
      <span className="pointer-events-none absolute inset-0 opacity-20">
        {children}
      </span>

      <motion.span
        style={{
          opacity,
          y,
          scale,
        }}
        className="inline-block text-black will-change-transform will-change-opacity dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  )
}
