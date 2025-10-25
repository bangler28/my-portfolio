"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, MapPin, ChevronDown } from "lucide-react"
import FlipCard from "./flip-card"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#252423] via-[#2a2826] to-[#1a1918]">
        <div className="absolute inset-0 opacity-20 sm:opacity-30">
          <div className="absolute top-0 -left-4 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-slate-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="mb-6">
              <h2 className="text-amber-400 text-base sm:text-lg md:text-xl font-medium mb-2">Hello, I'm</h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">
                Gusti Gibran
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Avattar
                </span>
              </h1>
              <div className="flex flex-col space-y-1 sm:space-y-2">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">UI/UX Designer</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
                  & Frontend Developer
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              Passionate about creating beautiful, user-friendly digital experiences with 3 years of learning and
              development expertise.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <a
                href="mailto:gustigibranavattr@gmail.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors duration-300"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm md:text-base truncate">gustigibranavattr@gmail.com</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base">Malang, Jawa Timur, Indonesia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://github.com/BranProHengker"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target p-2 sm:p-3 bg-white/10 hover:bg-amber-400/20 rounded-lg transition-all duration-300 hover:scale-110 group"
              >
                <Github size={20} className="sm:w-6 sm:h-6 text-white group-hover:text-amber-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/gusti-gibran-avattar-819455389/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target p-2 sm:p-3 bg-white/10 hover:bg-amber-400/20 rounded-lg transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6 text-white group-hover:text-amber-400" />
              </a>
              <a
                href="mailto:gustigibranavattr@gmail.com"
                className="cursor-target p-2 sm:p-3 bg-white/10 hover:bg-amber-400/20 rounded-lg transition-all duration-300 hover:scale-110 group"
              >
                <Mail size={20} className="sm:w-6 sm:h-6 text-white group-hover:text-amber-400" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="cursor-target relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-slate-500/30 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              <div className="relative bg-gradient-to-br from-slate-700/50 to-zinc-800/50 p-1 sm:p-2 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-white/10">
                <FlipCard
                  images={[
                    "https://customer-assets.emergentagent.com/job_ada78b0a-4215-4e2c-a7d4-38851bd4db0f/artifacts/g6kbryy4_gw%20ver%20ai.png",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gibran2-6ZTUkhqTJBZ7dZmClui09wy3aN96yl.jpg",
                  ]}
                  interval={4000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-amber-400 transition-colors duration-300 animate-bounce"
      >
        <ChevronDown size={24} className="sm:w-8 sm:h-8" />
      </button>
    </section>
  )
}
