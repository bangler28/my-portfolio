"use client"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Calculate scroll progress for blur intensity
      const maxScroll = 500
      const progress = Math.min(currentScrollY / maxScroll, 1)
      setScrollProgress(progress)
      
      setIsScrolled(currentScrollY > 50)
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsMobileMenuOpen(false)
      }
      
      setLastScrollY(currentScrollY)

      // Detect active section
      const sections = ["home", "about", "skills", "experience", "projects", "contact"]
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  // Dynamic blur based on scroll
  const blurClass = scrollProgress < 0.3 ? "backdrop-blur-lg" : scrollProgress < 0.6 ? "backdrop-blur-xl" : "backdrop-blur-2xl"
  
  // Dynamic background opacity with gradient accent
  const bgOpacity = 0.05 + (scrollProgress * 0.1)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="cursor-target max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between h-12 sm:h-14 md:h-16 px-4 sm:px-6 rounded-full transition-all duration-500 ${blurClass} border border-white/20 relative overflow-hidden`}
          style={{
            backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
            boxShadow: isScrolled 
              ? '0 8px 32px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)' 
              : '0 8px 32px 0 rgba(255, 255, 255, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Gradient accent overlay */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(250, 237, 206, 0.1) 0%, rgba(160, 160, 160, 0.05) 50%, rgba(250, 237, 206, 0.1) 100%)'
            }}
          />

          <button onClick={() => scrollToSection("home")} className="relative hover:opacity-80 transition-opacity duration-300">
            <svg
              width="70"
              height="35"
              viewBox="0 0 512 256"
              className="h-7 sm:h-8 w-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" fill="transparent" />
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="Montserrat, sans-serif"
                fontSize="80"
                letterSpacing="5"
              >
                <tspan fill="#A0A0A0">GU</tspan>
                <tspan fill="#FAEDCE">TSI</tspan>
              </text>
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-3 relative">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {/* Active background with gradient */}
                {activeSection === item.id && (
                  <span 
                    className="absolute inset-0 rounded-full transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(250, 237, 206, 0.25) 0%, rgba(160, 160, 160, 0.15) 100%)',
                      boxShadow: '0 4px 12px rgba(250, 237, 206, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    }}
                  />
                )}
                
                {/* Hover background */}
                <span className="absolute inset-0 bg-white/0 hover:bg-white/10 rounded-full transition-all duration-300" />
                
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className={`md:hidden mt-4 mx-4 rounded-3xl ${blurClass} border border-white/20 overflow-hidden relative`}
          style={{
            backgroundColor: `rgba(255, 255, 255, ${bgOpacity + 0.05})`,
            boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Gradient accent overlay for mobile */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(250, 237, 206, 0.1) 0%, rgba(160, 160, 160, 0.05) 100%)'
            }}
          />
          
          <nav className="px-4 py-3 space-y-1 relative">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 text-sm relative overflow-hidden ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Active background for mobile */}
                {activeSection === item.id && (
                  <span 
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(250, 237, 206, 0.25) 0%, rgba(160, 160, 160, 0.15) 100%)',
                      boxShadow: '0 2px 8px rgba(250, 237, 206, 0.2)'
                    }}
                  />
                )}
                
                {/* Hover background for mobile */}
                <span className="absolute inset-0 bg-white/0 hover:bg-white/10 rounded-lg transition-all duration-300" />
                
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}