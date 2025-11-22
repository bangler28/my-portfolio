"use client"

import type React from "react"
import { Mail, MapPin, Linkedin, Github, MessageSquare, ArrowUpRight, Copy, CheckCheck } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation, useParallax, useMagnetic } from "@/lib/gsap-utils"
import { useState } from "react"

interface ContactCard {
  id: string
  icon: React.ReactNode
  title: string
  value: string
  link?: string
  action?: "copy" | "link"
}

export default function Contact() {
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const contentRef = useScrollAnimation({ triggerStart: "top 75%" })
  const blob1Ref = useParallax(0.2)
  const blob2Ref = useParallax(0.25)
  
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20 sm:py-32 bg-[#1a1918] relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" />
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Header & Context */}
          <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center lg:text-left">
            <div className="cursor-target inline-flex items-center justify-center p-2 bg-white/5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
               <MessageSquare className="text-amber-400 w-5 h-5 mr-2" />
               <span className="text-amber-100 text-sm font-medium px-2">Let's Connect</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to start your <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">next project?</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="hidden lg:block">
               <MagneticButton href="mailto:gustigibranavattr@gmail.com" />
            </div>
          </div>

          {/* Right Column: Contact Cards */}
          <div ref={contentRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             
             {/* Email Card */}
             <div className="group relative bg-[#232325] p-1 rounded-2xl hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cursor-target relative h-full bg-[#232325]/90 backdrop-blur-xl rounded-xl p-6 border border-white/5 flex flex-col justify-between">
                   <div className="mb-6">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 text-amber-400">
                         <Mail size={24} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">Email Me</h3>
                      <p className="text-gray-400 text-sm">gustigibranavattr@gmail.com</p>
                   </div>
                   <button 
                     onClick={() => copyToClipboard("gustigibranavattr@gmail.com")}
                     className="flex items-center justify-between w-full py-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                   >
                     <span>{copied ? "Copied!" : "Copy Email"}</span>
                     {copied ? <CheckCheck size={16} className="text-green-400" /> : <Copy size={16} />}
                   </button>
                </div>
             </div>

             {/* Socials Card */}
             <div className="group relative bg-[#232325] p-1 rounded-2xl hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cursor-target relative h-full bg-[#232325]/90 backdrop-blur-xl rounded-xl p-6 border border-white/5 flex flex-col justify-between">
                   <div className="mb-6">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-400">
                         <Linkedin size={24} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">LinkedIn</h3>
                      <p className="text-gray-400 text-sm">Professional Profile</p>
                   </div>
                   <a 
                     href="https://www.linkedin.com/in/gusti-gibran-avattar-819455389/"
                     target="_blank"
                     className="flex items-center justify-between w-full py-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                   >
                     <span>Connect</span>
                     <ArrowUpRight size={16} />
                   </a>
                </div>
             </div>

             {/* GitHub Card */}
             <div className="group relative bg-[#232325] p-1 rounded-2xl hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cursor-target relative h-full bg-[#232325]/90 backdrop-blur-xl rounded-xl p-6 border border-white/5 flex flex-col justify-between">
                   <div className="mb-6">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 text-purple-400">
                         <Github size={24} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">GitHub</h3>
                      <p className="text-gray-400 text-sm">Code Repository</p>
                   </div>
                   <a 
                     href="https://github.com/BranProHengker"
                     target="_blank"
                     className="flex items-center justify-between w-full py-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                   >
                     <span>Follow</span>
                     <ArrowUpRight size={16} />
                   </a>
                </div>
             </div>

             {/* Location Card */}
             <div className="group relative bg-[#232325] p-1 rounded-2xl hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="cursor-target relative h-full bg-[#232325]/90 backdrop-blur-xl rounded-xl p-6 border border-white/5 flex flex-col justify-between">
                   <div className="mb-6">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                         <MapPin size={24} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">Location</h3>
                      <p className="text-gray-400 text-sm">Malang, Indonesia</p>
                   </div>
                   <div className="flex items-center justify-between w-full py-2 px-4 bg-white/5 rounded-lg text-sm text-gray-500 cursor-default">
                     <span>Remote / On-site</span>
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   </div>
                </div>
             </div>

          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden text-center mt-8">
             <MagneticButton href="mailto:gustigibranavattr@gmail.com" />
          </div>

        </div>
      </div>
    </section>
  )
}

// Magnetic Button Component
function MagneticButton({ href }: { href: string }) {
  const buttonRef = useMagnetic(0.4)

  return (
    <a
      ref={buttonRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      className="cursor-target inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full transition-all duration-300 hover:bg-amber-400 group"
    >
      <span className="mr-2">Write me an email</span>
      <Mail size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
    </a>
  )
}
