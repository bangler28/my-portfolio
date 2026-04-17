"use client"

import { useRef, useState } from "react"
import { Code2, Palette, Layers, Smartphone, Terminal, Cpu, Globe } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation, useParallax } from "@/lib/gsap-utils"

interface SkillCategory {
  id: string
  icon: LucideIcon
  title: string
  description: string
  skills: string[]
}

export default function Skills() {
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const contentRef = useScrollAnimation({ triggerStart: "top 75%" })
  
  // Interactive state for hover effects
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const skillCategories: SkillCategory[] = [
    {
      id: "languages",
      icon: Terminal,
      title: "Languages",
      description: "The programming languages that I often use.",
      skills: ["JavaScript", "TypeScript"],
    },
    {
      id: "frameworks",
      icon: Layers,
      title: "Frameworks",
      description: "A great tool for building today's growing applications.",
      skills: ["Next.js", "React", "React Native Expo", "Astro", "AngularJS"],
    },
    {
      id: "design",
      icon: Palette,
      title: "Design Tools",
      description: "Crafting beautiful and intuitive interfaces.",
      skills: ["Figma", "Canva", "Alight Motion"],
    },
  ]

  return (
    <section id="skills" className="py-20 sm:py-32 bg-[#1a1918] relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/10 rounded-full blur-[50px] sm:blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
         <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-blue-500/5 rounded-full blur-[60px] sm:blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A curated set of tools and technologies I use to bring digital products to life.
          </p>
        </div>

        {/* Skills Interactive Grid */}
        <div ref={contentRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id

            return (
              <div 
                key={category.id}
                className={`
                  relative group rounded-3xl p-1 transition-all duration-500 ease-out
                  ${isActive ? 'scale-105 z-10' : 'hover:scale-[1.02]'}
                `}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-white/0 rounded-3xl opacity-100 mask-image-gradient" />
                <div className={`
                   absolute inset-0 bg-linear-to-br from-amber-500/20 via-transparent to-transparent rounded-3xl opacity-0 transition-opacity duration-500
                   ${isActive ? 'opacity-100' : 'group-hover:opacity-50'}
                `} />

                {/* Card Content */}
                <div className="cursor-target relative h-full bg-[#232325]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 border border-white/5 overflow-hidden flex flex-col">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`
                      p-3 rounded-2xl transition-colors duration-300
                      ${isActive ? 'bg-amber-500 text-white' : 'bg-white/5 text-amber-400 group-hover:bg-white/10'}
                    `}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className={`
                      opacity-0 transform translate-x-4 transition-all duration-300
                      ${isActive ? 'opacity-100 translate-x-0' : ''}
                    `}>
                      <Globe className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 min-h-\[40px]\">{category.description}</p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className={`
                          px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-300
                          ${isActive 
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'}
                        `}
                        style={{
                           transitionDelay: `${idx * 50}ms`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
