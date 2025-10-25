"use client"

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
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

  return (
    <footer className="bg-[#1a1918] border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/5 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-slate-500/5 rounded-full blur-2xl sm:blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10">
          {/* Logo */}
          <div>
            <button
              onClick={() => scrollToSection("home")}
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <svg
                width="80"
                height="40"
                viewBox="0 0 512 256"
                className="h-8 sm:h-10 w-auto"
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
            <p className="text-gray-400 text-xs sm:text-sm mt-2">UI/UX Designer & Frontend Developer</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Navigation</h3>
            <nav className="space-y-1 sm:space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-gray-400 hover:text-amber-400 transition-colors duration-300 text-xs sm:text-sm"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h3>
            <div className="space-y-1 sm:space-y-2">
              <a
                href="https://github.com/BranProHengker"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-amber-400 transition-colors duration-300 text-xs sm:text-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/gusti-gibran-avattar-819455389/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-amber-400 transition-colors duration-300 text-xs sm:text-sm"
              >
                LinkedIn
              </a>
              <a
                href="mailto:gustigibranavattr@gmail.com"
                className="block text-gray-400 hover:text-amber-400 transition-colors duration-300 text-xs sm:text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © 2025 Gusti Gibran Avattar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
