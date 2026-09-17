"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

export interface Project {
  title: string
  description: string
  year: string
  link: string
  image: string
}

const defaultProjects: Project[] = [
  {
    title: "Lumina",
    description: "AI-powered design system generator.",
    year: "2024",
    link: "https://github.com/AlmightyDMJR",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Flux",
    description: "Real-time collaboration for creative teams.",
    year: "2024",
    link: "https://github.com/AlmightyDMJR",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Prism",
    description: "Color palette extraction from any image.",
    year: "2023",
    link: "https://github.com/AlmightyDMJR",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Vertex",
    description: "3D modeling toolkit for the web.",
    year: "2023",
    link: "https://github.com/AlmightyDMJR",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  },
]

export interface ProjectShowcaseProps {
  projects?: Project[]
  title?: string
  className?: string
}

export function ProjectShowcase({
  projects = defaultProjects,
  title = "Selected Work",
  className = "",
}: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [containerOffset, setContainerOffset] = useState({ left: 0, top: 0 })
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
      setContainerOffset({ left: rect.left, top: rect.top })
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerOffset({ left: rect.left, top: rect.top })
    }
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 ${className}`}
    >
      {title && (
        <h2 className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-8">
          {title}
        </h2>
      )}

      {/* Floating cursor preview card (Desktop only) */}
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl transition-all hidden md:block"
        style={{
          left: containerOffset.left,
          top: containerOffset.top,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition:
            "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[280px] h-[180px] bg-secondary rounded-xl overflow-hidden border border-border shadow-2xl">
          {projects.map((project, index) => (
            <img
              key={`${project.title}-${index}`}
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
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => {
          const isExternal =
            project.link.startsWith("http://") ||
            project.link.startsWith("https://")

          return (
            <a
              key={`${project.title}-${index}`}
              href={project.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group block"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative py-6 border-t border-border transition-all duration-300 ease-out">
                {/* Background highlight on hover */}
                <div
                  className={`
                    absolute inset-0 -mx-4 px-4 bg-secondary/40 backdrop-blur-sm rounded-xl
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                  `}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Title with animated underline */}
                    <div className="inline-flex items-center gap-2">
                      <h3 className="text-foreground font-semibold text-lg md:text-xl tracking-tight transition-colors group-hover:text-lavender">
                        <span className="relative">
                          {project.title}
                          {/* Animated underline */}
                          <span
                            className={`
                              absolute left-0 -bottom-0.5 h-0.5 bg-lavender
                              transition-all duration-300 ease-out
                              ${hoveredIndex === index ? "w-full" : "w-0"}
                            `}
                          />
                        </span>
                      </h3>

                      {/* Arrow that slides in */}
                      <ArrowUpRight
                        className={`
                          w-4 h-4 text-muted-foreground group-hover:text-lavender
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
                        text-muted-foreground text-sm mt-1.5 leading-relaxed max-w-xl
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index ? "text-neutral-200" : "text-muted-foreground"}
                      `}
                    >
                      {project.description}
                    </p>

                    {/* Mobile-only inline preview image */}
                    {project.image && (
                      <div className="block md:hidden mt-3 rounded-xl overflow-hidden border border-border/40 w-full h-44 bg-secondary/30 relative shadow-md">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Year badge */}
                  <span
                    className={`
                      text-xs font-mono px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground tabular-nums shrink-0
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-lavender border-lavender/40 bg-lavender/10" : "bg-card/40"}
                    `}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </a>
          )
        })}

        {/* Bottom border for last item */}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
