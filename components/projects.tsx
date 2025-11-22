"use client"

import { useRef, useState } from "react"
import { FolderGit2, ExternalLink, Github } from "lucide-react"
import ImageLightbox from "./image-lightbox"
import { useScrollAnimation, useStaggerAnimation, useParallax } from "@/lib/gsap-utils"

import Image from "next/image"
import SkeletonImage from "./skeleton-image"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  figma?: string
  color: string
  category: ("all" | "frontend" | "uiux")[]
}

export default function Projects() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProjectImages, setCurrentProjectImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<"all" | "frontend" | "uiux">("all")
  
  const headerRef = useScrollAnimation({ triggerStart: "top 80%" })
  const projectsGridRef = useStaggerAnimation(0.12, { triggerStart: "top 75%" })
  const blob1Ref = useParallax(0.2)
  const blob2Ref = useParallax(0.25)

  const projects: Project[] = [
    {
      title: "Bonkey Rent Web",
      description: "Website rental untuk kebutuhan sewa barang dengan fitur pencarian dan pemesanan yang mudah.",
      image: "/bonkey-rent-web-home.png",
      technologies: ["NextJS", "React", "Tailwind CSS", "Typescript"],
      github: "https://github.com/Sretes-PiceF/Project-Besar",
      color: "from-cyan-500/20 to-blue-500/20",
      category: ["all", "frontend"],
    },
    {
      title: "Bonkey Stream",
      description:
        "Database anime website menggunakan Next.js dengan API dari Jikan untuk menampilkan informasi lengkap tentang anime.",
      image: "/Bonkey-Stream-Home.png",
      technologies: ["NextJS", "Typescript", "Jikan API", "Tailwind CSS"],
      github: "https://github.com/BranProHengker/Bonkey-Stream",
      color: "from-blue-500/20 to-purple-500/20",
      category: ["all"],
    },
    {
      title: "CV Website",
      description: "Website portfolio CV pribadi yang dibangun menggunakan Next.js dengan desain modern dan responsif.",
      image: "/gwtuhj.png",
      technologies: ["NextJS", "React", "CSS", "Typescript"],
      github: "https://gustigibranavattarcv.vercel.app/",
      color: "from-emerald-500/20 to-teal-500/20",
      category: ["all"],
    },
    {
      title: "Bonkey-Rent",
      description: "Aplikasi rental mobile menggunakan React Native Expo untuk mempermudah proses penyewaan alat alat yang di butuhkan.",
      image: "/bonkey-rent-mobile.png",
      technologies: ["React Native Expo","Typescript", "Mobile"],
      figma: "https://www.figma.com/design/hivoCY70p5RJBM8o5FRHa2/Bonkey-Rent?node-id=0-1&t=fbzUkTDQnhpr4suL-1",
      color: "from-orange-500/20 to-red-500/20",
      category: ["all", "uiux"],
    },
    {
      title: "GameSeed Design",
      description:
        "Design game untuk lomba GameSeed dengan fokus pada user interface dan user experience yang menarik.",
      image:
        "/Beat-Tactic-GameSeed.png",
      technologies: ["Figma", "UI/UX Design", "Game Design"],
      figma: "https://www.figma.com/design/Fbl5iEursIBtpWrkI3FOZd/DESIGN-GAME-SEED?node-id=0-1&t=uU9zQ7h3pyNxc7pt-1",
      color: "from-pink-500/20 to-rose-500/20",
      category: ["all", "uiux"],
    },
    {
      title: "WhatsApp Clone",
      description: "Aplikasi chat real-time yang meniru fitur WhatsApp dengan teknologi modern dan responsif.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OqA0uPIxxZRJo4ZYYkyl80rGK8qqdt.png",
      technologies: ["React Native Expo", "Typescript",  "School Task"],
      github: "https://github.com/BranProHengker/WhatsApp-Clone",
      color: "from-green-500/20 to-emerald-500/20",
      category: ["frontend"],
    },
    {
      title: "Remove BG",
      description:
        "Tool untuk menghapus background dari gambar menggunakan API remove.bg dengan interface yang user-friendly.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q1nTT3Rpiru9w0fMyAIu4LnnNvJM5A.png",
      technologies: ["NextJS", "Remove.bg API", "Tailwind CSS", "Typescript"],
      github: "https://branprohengker.github.io/remove-bg-burek-edition/iki.html",
      color: "from-yellow-500/20 to-orange-500/20",
      category: ["frontend"],
    },
    {
      title: "SMKN 6 Malang",
      description:
        "Website landing page untuk SMK Negeri 6 Malang dengan informasi lengkap tentang sekolah dan program.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0JA1xHOmIV1XTp6QLdHfiiJ0SAmfZo.png",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "School Project"],
      github: "https://branprohengker.github.io/landing-page-smk6-kw/",
      color: "from-blue-500/20 to-cyan-500/20",
      category: ["frontend"],
    },
    {
      title: "NameCard",
      description: "Interactive name card dengan desain modern dan animasi yang menarik untuk personal branding.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6XAZ6j7a78n38TZMxSAAuSklOSasFr.png",
      technologies: ["HTML", "CSS", "JavaScript", "Animation"],
      github: "https://branprohengker.github.io/name-card-bran/ini.html",
      color: "from-purple-500/20 to-pink-500/20",
      category: ["frontend"],
    },
  ]

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "all") {
      return project.category.includes("all")
    }
    return project.category.includes(selectedCategory)
  })

  const openLightbox = (imageUrl: string) => {
    setCurrentProjectImages([imageUrl])
    setCurrentImageIndex(0)
    setLightboxOpen(true)
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === currentProjectImages.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentProjectImages.length - 1 : prev - 1))
  }

  return (
    <>
      <section id="projects" className="cursor-target py-12 sm:py-20 md:py-32 bg-[#252423] relative overflow-hidden">
        <div  className="absolute top-1/3 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-slate-500/5 rounded-full blur-2xl sm:blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
              <FolderGit2 className="text-amber-400 w-7 h-7 sm:w-8 sm:h-8" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Featured Projects</h2>
            </div>
            <div className="w-20 sm:w-24 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {[
              { id: "all", label: "All Projects" },
              { id: "frontend", label: "Front End" },
              { id: "uiux", label: "UI/UX" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as "all" | "frontend" | "uiux")}
                className={`cursor-target px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#252423] ${
                  selectedCategory === cat.id
                    ? "bg-amber-400 text-black shadow-lg shadow-amber-400/50 focus:ring-amber-600"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20 focus:ring-amber-400"
                }`}
                aria-pressed={selectedCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div ref={projectsGridRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index}>
                <div className="cursor-target group h-full bg-linear-to-br from-slate-700/30 to-zinc-800/30 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:transform hover:-translate-y-2">
                  <div
                    className="relative overflow-hidden h-40 sm:h-48 md:h-64 cursor-pointer"
                    onClick={() => openLightbox(project.image)}
                  >
                    <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-50`} />
                    <ProjectImage src={project.image} title={project.title} priority={index < 2} />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <ExternalLink size={32} className="sm:w-12 sm:h-12 mx-auto mb-2" />
                        <p className="text-xs sm:text-sm font-medium">Click to view</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-amber-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 sm:px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex space-x-3 sm:space-x-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github size={18} className="sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm">GitHub</span>
                        </a>
                      )}
                      {project.figma && (
                        <a
                          href={project.figma}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1"
                          aria-label={`View ${project.title} on Figma`}
                        >
                          <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm">Figma</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={currentProjectImages}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={currentProjectImages.length > 1 ? handleNext : undefined}
          onPrev={currentProjectImages.length > 1 ? handlePrev : undefined}
        />
      )}
    </>
  )
}

function ProjectImage({ src, title, priority = false }: { src: string; title: string; priority?: boolean }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <SkeletonImage />}
      <Image
        src={src || "/placeholder.svg"}
        alt={title}
        fill
        priority={priority}
        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={90}
      />
    </>
  )
}
