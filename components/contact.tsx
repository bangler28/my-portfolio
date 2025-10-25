"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Linkedin, Github, Send } from "lucide-react"

interface ContactCard {
  icon: React.ReactNode
  title: string
  value: string
  link?: string
}

export default function Contact() {
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

  const contactCards: ContactCard[] = [
    {
      icon: <Mail size={24} className="sm:w-8 sm:h-8 text-amber-400" />,
      title: "Email",
      value: "gustigibranavattr@gmail.com",
      link: "mailto:gustigibranavattr@gmail.com",
    },
    {
      icon: <MapPin size={24} className="sm:w-8 sm:h-8 text-amber-400" />,
      title: "Location",
      value: "Malang, Jawa Timur, Indonesia",
    },
    {
      icon: <Linkedin size={24} className="sm:w-8 sm:h-8 text-amber-400" />,
      title: "LinkedIn",
      value: "gusti-gibran-avattar",
      link: "https://www.linkedin.com/in/gusti-gibran-avattar-819455389/",
    },
    {
      icon: <Github size={24} className="sm:w-8 sm:h-8 text-amber-400" />,
      title: "GitHub",
      value: "BranProHengker",
      link: "https://github.com/BranProHengker",
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-20 md:py-32 bg-[#252423] relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/5 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-slate-500/5 rounded-full blur-2xl sm:blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <Send className="text-amber-400 w-7 h-7 sm:w-8 sm:h-8" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Get In Touch</h2>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Subtitle */}
        <div
          className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-gray-400 text-xs sm:text-base md:text-lg max-w-2xl mx-auto">
            Saya terbuka untuk kolaborasi dan proyek baru. Jangan ragu untuk menghubungi saya!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={card.link}
                target={card.link?.startsWith("http") ? "_blank" : undefined}
                rel={card.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group h-full"
              >
                <div className="h-full bg-gradient-to-br from-slate-700/30 to-zinc-800/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-2xl flex flex-col items-center text-center">
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-amber-400/10 rounded-lg group-hover:bg-amber-400/20 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{card.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                    {card.value}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-700/30 to-zinc-800/30 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Mari Bekerja Sama!</h3>
            <p className="text-gray-300 text-xs sm:text-base md:text-lg mb-6 sm:mb-8">
              Apakah Anda memiliki proyek atau ide? Saya siap membantu mewujudkannya.
            </p>
            <a
              href="mailto:gustigibranavattr@gmail.com"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Mail size={18} className="sm:w-5 sm:h-5" />
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
