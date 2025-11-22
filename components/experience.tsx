"use client"

import { useRef } from "react"
import { Briefcase, Calendar, MapPin, GraduationCap, Building2 } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation } from "@/lib/gsap-utils"

export default function Experience() {
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const timelineRef = useStaggerAnimation(0.2, { triggerStart: "top 75%" })

  return (
    <section
      id="experience"
      className="py-20 sm:py-32 bg-[#1a1918] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -translate-x-1/2" />
        <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            The path that shaped my skills and professional growth.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          <div ref={timelineRef as React.RefObject<HTMLDivElement>}>
            <div className="relative space-y-12">
              {/* Connecting Line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-linear-to-b from-amber-500/50 via-slate-500/30 to-transparent hidden sm:block" />

              {/* Experience Item */}
              <div className="relative pl-0 sm:pl-24 group">
                {/* Timeline Dot */}
                <div className="absolute left-8 top-8 w-4 h-4 -translate-x-[7px] rounded-full border-2 border-amber-500 bg-[#1a1918] group-hover:bg-amber-500 transition-colors duration-300 z-10 hidden sm:block">
                   <div className="absolute inset-0 bg-amber-500/50 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                </div>

                <div className="relative bg-[#232325] rounded-3xl p-1 transition-all duration-300 hover:scale-[1.02]">
                   <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   
                   <div className="cursor-target relative bg-[#232325]/90 backdrop-blur-xl rounded-[20px] p-6 sm:p-8 border border-white/5 overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-500/10 rounded-xl">
                               <Briefcase className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                               <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">UI/UX Designer</h3>
                               <div className="flex items-center gap-2 text-amber-400/80 font-medium">
                                  <Building2 className="w-4 h-4" />
                                  <span>GameSeed</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex flex-col items-start md:items-end gap-1 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
                            <div className="flex items-center gap-2">
                               <Calendar className="w-4 h-4" />
                               <span>Jul 2025 – Aug 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <MapPin className="w-4 h-4" />
                               <span>Remote, ID</span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="space-y-3 pl-0 sm:pl-[68px]">
                         <p className="text-gray-300 leading-relaxed">
                           Collaborated with a team to design user interfaces for a game development competition. 
                           Focused on creating intuitive and immersive player experiences.
                         </p>
                         <div className="flex flex-wrap gap-2 mt-4">
                            <span className="px-3 py-1 text-xs font-medium text-amber-300 bg-amber-500/10 rounded-full border border-amber-500/20">UI Design</span>
                            <span className="px-3 py-1 text-xs font-medium text-amber-300 bg-amber-500/10 rounded-full border border-amber-500/20">Game Assets</span>
                            <span className="px-3 py-1 text-xs font-medium text-amber-300 bg-amber-500/10 rounded-full border border-amber-500/20">Prototyping</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Education Item */}
              <div className="relative pl-0 sm:pl-24 group">
                {/* Timeline Dot */}
                <div className="absolute left-8 top-8 w-4 h-4 -translate-x-[7px] rounded-full border-2 border-slate-500 bg-[#1a1918] group-hover:bg-slate-500 transition-colors duration-300 z-10 hidden sm:block" />

                <div className="cursor-target relative bg-[#232325] rounded-3xl p-1 transition-all duration-300 hover:scale-[1.02]">
                   <div className="absolute inset-0 bg-linear-to-br from-slate-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   
                   <div className="relative bg-[#232325]/90 backdrop-blur-xl rounded-[20px] p-6 sm:p-8 border border-white/5 overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-slate-500/10 rounded-xl">
                               <GraduationCap className="w-6 h-6 text-slate-400" />
                            </div>
                            <div>
                               <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Software Engineering</h3>
                               <div className="flex items-center gap-2 text-slate-400/80 font-medium">
                                  <Building2 className="w-4 h-4" />
                                  <span>SMK Negeri 6 Malang</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex flex-col items-start md:items-end gap-1 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
                            <div className="flex items-center gap-2">
                               <Calendar className="w-4 h-4" />
                               <span>2023 – 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <MapPin className="w-4 h-4" />
                               <span>Malang, ID</span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="space-y-3 pl-0 sm:pl-[68px]">
                         <p className="text-gray-300 leading-relaxed">
                           Focused on Software Engineering (RPL) with a strong interest in Frontend Development and UI/UX Design. 
                           Actively participating in tech communities and school projects.
                         </p>
                         <div className="flex flex-wrap gap-2 mt-4">
                            <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-500/10 rounded-full border border-slate-500/20">Software Engineering</span>
                            <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-500/10 rounded-full border border-slate-500/20">Web Development</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
