"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Calendar, MapPin } from "lucide-react"

export default function Experience() {
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-12 sm:py-20 md:py-32 bg-gradient-to-b from-[#252423] to-[#1a1918] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-slate-500/5 rounded-full blur-2xl sm:blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <Briefcase className="text-amber-400 w-7 h-7 sm:w-8 sm:h-8" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Experience</h2>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute left-3 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-slate-500" />

              {/* Experience Item */}
              <div className="cursor-targetrelative pl-12 sm:pl-20 pb-8 sm:pb-12">
                <div className="absolute left-0 sm:left-5 top-2 w-6 h-6 bg-amber-400 rounded-full border-4 border-[#252423]" />

                <div className="cursor-target bg-gradient-to-br from-slate-700/30 to-zinc-800/30 p-4 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-0">UI/UX Designer</h3>
                    <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-amber-400/20 rounded-full text-amber-400 text-xs sm:text-sm font-medium w-fit">
                      GameSeed
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                      <Calendar size={14} className="sm:w-4 sm:h-4" />
                      <span>25 Juli 2025 – 4 Agustus 2025</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                      <MapPin size={14} className="sm:w-4 sm:h-4" />
                      <span>Malang, Jawa Timur (Online)</span>
                    </div>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start space-x-2 sm:space-x-3 text-gray-300 text-xs sm:text-base">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>Membuat desain antarmuka untuk lomba pembuatan game</span>
                    </li>
                    <li className="flex items-start space-x-2 sm:space-x-3 text-gray-300 text-xs sm:text-base">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>Berkolaborasi secara online dengan tim untuk pengembangan konsep dan desain</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Education Item */}
              <div className="relative pl-12 sm:pl-20">
                <div className="absolute left-0 sm:left-5 top-2 w-6 h-6 bg-slate-400 rounded-full border-4 border-[#252423]" />

                <div className="cursor-target bg-gradient-to-br from-slate-700/30 to-zinc-800/30 p-4 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-0">
                      SMK Negeri 6 Malang
                    </h3>
                    <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-slate-400/20 rounded-full text-slate-300 text-xs sm:text-sm font-medium w-fit">
                      Education
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                      <Calendar size={14} className="sm:w-4 sm:h-4" />
                      <span>2023 – 2025</span>
                    </div>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start space-x-2 sm:space-x-3 text-gray-300 text-xs sm:text-base">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>
                        <strong>Rekayasa Perangkat Lunak (RPL)</strong>
                      </span>
                    </li>
                    <li className="flex items-start space-x-2 sm:space-x-3 text-gray-300 text-xs sm:text-base">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>Interest pada bidang desain antarmuka (UI/UX) dan pengembangan front-end</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
