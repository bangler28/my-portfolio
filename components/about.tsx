"use client"

import { useRef } from "react"
import Image from "next/image"
import { User, Code2, Rocket, Sparkles, Cpu, Smartphone } from "lucide-react"
import { useAnimatedCounter } from "@/hooks/use-animated-counter"
import { useScrollAnimation, useStaggerAnimation, useParallax } from "@/lib/gsap-utils"

export default function About() {
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const contentRef = useScrollAnimation({ triggerStart: "top 75%" })
  const statsRef = useStaggerAnimation(0.15, { triggerStart: "top 80%" })
  
  // Background parallax elements
  const blob1Ref = useParallax(0.1)
  const blob2Ref = useParallax(0.2)
  const iconRef = useParallax(0.15)

  const yearsCount = useAnimatedCounter(1, 2000)
  const projectsCount = useAnimatedCounter(3, 2000)
  const technologiesCount = useAnimatedCounter(10, 2000)

  return (
    <section
      id="about"
      className="py-20 sm:py-32 bg-[#1a1918] relative overflow-hidden"
    >
      {/* Background Elements - More organic and subtle */}
      <div ref={blob1Ref as React.RefObject<HTMLDivElement>} className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div ref={blob2Ref as React.RefObject<HTMLDivElement>} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-500/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Narrative */}
          <div ref={contentRef as React.RefObject<HTMLDivElement>}>
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-px w-8 bg-amber-400"></span>
              <h2 className="text-amber-400 font-medium tracking-wider text-sm uppercase">Who is Ferdiansyah?</h2>
            </div>
            
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Transforming ideas into <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">
                digital reality
              </span>
            </h3>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I am a passionate <span className="text-white font-medium">Frontend Developer & Bug Hunter</span> dedicated to crafting intuitive and visually stunning digital experiences.
              </p>
              <p>
                With <span className="text-white font-medium">1 years</span> of focused learning and hands-on practice, I bridge the gap between creative design and technical implementation. My goal is to build applications that not only look good but feel natural to use.
              </p>
              <p>
                I constantly explore new technologies and design trends to keep my work modern and effective, ensuring every project I touch meets the highest professional standards.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="cursor-target px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" /> Responsive Design
              </div>
              <div className="cursor-target px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Modern Design
              </div>
              <div className="cursor-target px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" /> Performance
              </div>
            </div>
          </div>

          {/* Right Column: Creative Stats / Visuals */}
          <div ref={statsRef as React.RefObject<HTMLDivElement>} className="relative">
            {/* Abstract Visual Composition */}
            <div className="relative w-full flex flex-col gap-6 lg:block lg:aspect-square max-w-[500px] mx-auto lg:mx-0">
               
               {/* Decorative Circle - Desktop Only */}
               <div className="hidden lg:block absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
               <div className="hidden lg:block absolute inset-[10%] border border-white/5 rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]" />

               {/* Floating Stats Elements */}
               
               {/* Stat 1: Experience */}
               <div className="cursor-target relative w-full lg:w-auto lg:absolute lg:top-10 lg:left-10 bg-[#232325]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl lg:transform lg:-rotate-3 hover:rotate-0 transition-transform duration-300 hover:border-amber-400/30 group">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors">
                     <Rocket className="w-6 h-6 text-amber-400" />
                   </div>
                   <div>
                     <h3 className="text-4xl font-bold text-white">{yearsCount}</h3>
                     <p className="text-sm text-gray-400 mt-1">Years Learning</p>
                   </div>
                 </div>
               </div>

               {/* Stat 2: Projects */}
               <div className="cursor-target relative w-full lg:w-auto lg:absolute lg:bottom-20 lg:right-10 bg-[#232325]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl lg:transform lg:rotate-3 hover:rotate-0 transition-transform duration-300 hover:border-amber-400/30 group z-10">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                     <Code2 className="w-6 h-6 text-blue-400" />
                   </div>
                   <div>
                     <h3 className="text-4xl font-bold text-white">{projectsCount}+</h3>
                     <p className="text-sm text-gray-400 mt-1">Projects Done</p>
                   </div>
                 </div>
               </div>

               {/* Stat 3: Tech */}
               <div className="cursor-target relative w-full lg:w-auto lg:absolute lg:bottom-0 lg:left-20 bg-[#232325]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl lg:transform lg:-rotate-2 hover:rotate-0 transition-transform duration-300 hover:border-amber-400/30 group">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                     <Cpu className="w-6 h-6 text-purple-400" />
                   </div>
                   <div>
                     <h3 className="text-4xl font-bold text-white">{technologiesCount}+</h3>
                     <p className="text-sm text-gray-400 mt-1">Technologies</p>
                   </div>
                 </div>
               </div>

               {/* Center Visual Element - Desktop Only */}
               <div ref={iconRef as React.RefObject<HTMLDivElement>} className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                  <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/5 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image 
                      src="/uka.png" 
                      alt="Profile" 
                      fill 
                      className="object-cover opacity-50 hover:opacity-100 transition-opacity duration-500"
                      sizes="(max-width: 1024px) 300px, 300px"
                    />
                  </div>
               </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
