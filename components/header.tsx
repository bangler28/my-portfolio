"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, User, Code2, Briefcase, FolderGit2, Mail, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"
import OptimizedImage from "./optimized-image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    // 1. Scroll handler for Header Visibility (Smart Hide)
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY)
        setIsScrolled(true)
      } else {
        setIsVisible(true)
        setIsScrolled(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // 2. Intersection Observer for Active Section Detection
    const sections = ["home", "about", "skills", "workflow", "experience", "projects", "contact"]
    
    // We observe all section elements instead of using scroll events
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the intersecting entry that takes up the most ratio or is primarily visible
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Trigger when section passes a certain threshold in the middle of viewport
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [lastScrollY])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "workflow", label: "Workflow", icon: Workflow },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  return (
    <header
      className={cn(
        " fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform flex justify-center",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 flex justify-center">
        <div
          className={cn(
            " relative flex items-center justify-between px-4 py-2 rounded-full border transition-all duration-500 w-full md:w-auto md:gap-8",
            isScrolled 
              ? "bg-[#1a1918]/80 border-amber-500/20 backdrop-blur-xl shadow-lg shadow-amber-500/5" 
              : "bg-transparent border-transparent"
          )}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="group relative z-10 flex items-center gap-3"
          >
          <div className="cursor-target relative w-12 h-12 group-hover:scale-110 transition-transform">
                  <OptimizedImage
                    src="/gutsi-logo-copy.png"
                    fallbackSrc="/gutsi-logo-copy.png"
                    alt="Gutsi Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    quality={75}
                  />
                </div>
            <div className="cursor-target flex flex-col items-start">
              <span className="text-white font-bold text-lg leading-none tracking-tight group-hover:text-amber-400 transition-colors">
                Gusti Gibran Avattar
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Portfolio</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="cursor-target hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeSection === item.id
                    ? "text-black bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden relative z-10 p-2 text-gray-300 hover:text-amber-400 transition-colors"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "absolute top-full left-0 right-0 mx-4 mt-2 p-4 rounded-3xl bg-[#1a1918]/95 border border-amber-500/10 backdrop-blur-xl transition-all duration-300 origin-top md:hidden",
            isMobileMenuOpen 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          )}
        >
          <nav className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                  activeSection === item.id
                    ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                    : "hover:bg-white/5 text-gray-400 hover:text-white"
                )}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

