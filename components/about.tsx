"use client"

import { useEffect, useRef, useState } from "react"
import { User } from "lucide-react"
import { useAnimatedCounter } from "@/hooks/use-animated-counter"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const yearsCount = useAnimatedCounter(3, 2000)
  const projectsCount = useAnimatedCounter(5, 2000)
  const technologiesCount = useAnimatedCounter(10, 2000)

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 sm:py-20 md:py-32 bg-gradient-to-b from-[#252423] to-[#1a1918] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/5 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-slate-500/5 rounded-full blur-2xl sm:blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <User className="text-amber-400 w-7 h-7 sm:w-8 sm:h-8" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">About Me</h2>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Content */}
        <div
          className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-slate-700/30 to-zinc-800/30 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              I am a{" "}
              <span className="text-amber-400 font-semibold">UI/UX Designer & Frontend Developer</span> with learning experience <span className="text-amber-400 font-semibold">3 years</span> in schools in creating and designing responsive and user-friendly applications and websites.
            </p>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
             Having mastered various skills in this field, I continue to develop my abilities to become a professional in the technology industry.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-slate-700/20 to-zinc-800/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 focus-within:ring-2 focus-within:ring-amber-400">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-1 sm:mb-2">{yearsCount}</h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base">Years Learning</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-slate-700/20 to-zinc-800/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 focus-within:ring-2 focus-within:ring-amber-400">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-1 sm:mb-2">{projectsCount}+</h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base">Projects Completed</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-slate-700/20 to-zinc-800/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 focus-within:ring-2 focus-within:ring-amber-400">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-1 sm:mb-2">
              {technologiesCount}+
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base">Technologies</p>
          </div>
        </div>
      </div>
    </section>
  )
}
