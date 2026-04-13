import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

interface Project {
  title: string
  description: string
  year: string
  link: string
  image: string
}

const projects: Project[] = [
  {
    title: "Rapid 3D Printing",
    description: "We use advanced 3D printing methods to quickly produce physical representations of your design. This allows you to move from digital model to physical prototype in a short timeframe, accelerating development and enabling faster decision-making.Rapid prototyping is especially valuable in early-stage development, where multiple iterations are required to refine the design.",
    year: "Early-Stage Development",
    link: "#",
    image: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/3d-printing-toronto.jpg",
  },
  {
    title: "Functional Prototypes",
    description: "For products that require performance validation, we develop functional prototypes that simulate real-world use. These prototypes allow you to test mechanical systems, moving components, and structural integrity. This ensures that your product performs as expected before committing to production tooling or manufacturing.",
    year: "Performance Validation",
    link: "#",
    image: "https://images.squarespace-cdn.com/content/v1/68336a436acf0028ccedc8c9/2585fe7d-dbc1-46c1-9d8f-8ca0bd0519c8/IMG_0955.png?format=2500w",
  },
  {
    title: "Form & Fit Evaluation",
    description: "Understanding how parts fit together is critical in product development. Prototypes allow you to verify dimensions, tolerances, and assembly processes. This step helps identify alignment issues and ensures that components integrate properly within the overall design.",
    year: "Form & Fit Evaluation",
    link: "#",
    image: "https://images.squarespace-cdn.com/content/v1/68336a436acf0028ccedc8c9/0243f5f1-1cbb-4ddf-addd-aee7f8288d23/CP0016-0000-A_Camera_Default+Camera+6.png?format=2500w",
  },
  {
    title: "Design Iteration & Refinement",
    description: "Prototyping is most effective when used as part of an iterative process. After evaluating each prototype, we refine the design and produce improved versions. This cycle continues until the product meets performance, usability, and manufacturing requirements.",
    year: "Design Iteration & Refinement",
    link: "#",
    image: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/unnamed.png",
  },
  {
    title: "Assembly & Usability Testing",
    description: "Prototypes allow teams to test how a product is assembled and used in real-world scenarios. This includes evaluating user interaction, accessibility, and overall product experience. These insights are essential for identifying improvements that may not be apparent in digital models.",
    year: "Assembly & Usability Testing",
    link: "#",
    image: "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/entreprise-de-prototypage.jpeg",
  },
]

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-7xl mx-auto px-6 py-16 bg-slate-300 rounded-xl">
      <h3 className="text-black text-[50px] font-bold mb-8">PROTOTYPING CAPABILITIES</h3>

      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[280px] h-[180px] bg-secondary rounded-xl overflow-hidden">
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-5 border-t border-border transition-all duration-300 ease-out">
              {/* Background highlight on hover */}
              <div
                className={`
                  absolute inset-0 -mx-4 px-4 bg-secondary/50 rounded-lg
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Title with animated underline */}
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-foreground font-medium text-lg tracking-tight">
                      <span className="relative">
                        {project.title}
                        {/* Animated underline */}
                        <span
                          className={`
                            absolute left-0 -bottom-0.5 h-px bg-foreground
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </span>
                    </h3>

                    {/* Arrow that slides in */}
                    <ArrowUpRight
                      className={`
                        w-4 h-4 text-muted-foreground
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 -translate-x-2 translate-y-2"
                        }
                      `}
                    />
                  </div>

                  {/* Description with fade effect */}
                  <p
                    className={`
                      text-black/70 text-sm mt-1 leading-relaxed
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-foreground/70" : "text-black/70"}
                    `}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Year badge */}
                <span
                  className={`
                    text-xs font-mono text-muted-foreground tabular-nums
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? "text-orange-500" : ""}
                  `}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </a>
        ))}

        {/* Bottom border for last item */}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
