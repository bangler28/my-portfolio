"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Palette, Layers, Smartphone } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SkillCategory {
  icon: LucideIcon
  title: string
  skills: string[]
  color: string
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const skillCategories: SkillCategory[] = [
    {
      icon: Code2,
      title: "Languages",
      skills: ["JavaScript", "TypeScript", "PHP"],
      color: "amber",
    },
    {
      icon: Layers,
      title: "Frameworks & Libraries",
      skills: ["Next.js", "React", "React Native Expo", "Laravel"],
      color: "slate",
    },
    {
      icon: Palette,
      title: "Design Tools",
      skills: ["Figma", "Canva", "Alight Motion"],
      color: "amber",
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-12 sm:py-20 md:py-32 bg-[#252423] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/5 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-slate-500/5 rounded-full blur-2xl sm:blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <Smartphone className="text-amber-400 w-7 h-7 sm:w-8 sm:h-8" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Skills & Technologies</h2>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-full bg-gradient-to-br from-slate-700/30 to-zinc-800/30 p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 sm:p-3 bg-amber-400/20 rounded-lg">
                      <Icon className="text-amber-400 w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{category.title}</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center space-x-3 group">
                        <div className="w-2 h-2 bg-amber-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                        <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                          {skill}
                        </span>
                      </div>
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
