"use client"

import { useRef, useState } from "react"
import { FolderGit2, ExternalLink, Github, Code2, Figma } from "lucide-react"
import ImageLightbox from "./image-lightbox"
import { useScrollAnimation, useStaggerAnimation } from "@/lib/gsap-utils"

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
      <section id="projects" className="py-20 sm:py-32 bg-[#1a1918] relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-amber-500/5 rounded-full blur-[60px] sm:blur-[120px]" />
           <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-500/5 rounded-full blur-[60px] sm:blur-[120px]" />
           <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 sm:opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div ref={headerRef as React.RefObject<HTMLDivElement>} className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-white/5 rounded-full mb-4 backdrop-blur-sm border border-white/10">
               <FolderGit2 className="text-amber-400 w-5 h-5 mr-2" />
               <span className="text-amber-100 text-sm font-medium px-2">My Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
               A showcase of my latest work, featuring web applications, designs, and creative experiments.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: "all", label: "All Projects" },
              { id: "frontend", label: "Front End" },
              { id: "uiux", label: "UI/UX Design" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as "all" | "frontend" | "uiux")}
                className={`
                  relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                  ${selectedCategory === cat.id
                    ? "text-black font-bold"
                    : "text-gray-400 hover:text-white"}
                `}
              >
                {selectedCategory === cat.id && (
                  <div className="absolute inset-0 bg-amber-400 rounded-full -z-10 layout-id-active-tab" />
                )}
                {selectedCategory !== cat.id && (
                  <div className="absolute inset-0 border border-white/10 rounded-full -z-10 bg-white/5 hover:bg-white/10 transition-colors" />
                )}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div ref={projectsGridRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="group relative">
                {/* Card Container */}
                <div className="relative h-full bg-[#232325] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 flex flex-col">
                  
                  {/* Image Section */}
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(project.image)}
                  >
                    <ProjectImage src={project.image} title={project.title} priority={index < 2} />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#232325] via-transparent to-transparent opacity-60" />
                    
                    {/* Hover Action */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                          <ExternalLink className="w-6 h-6 text-white" />
                       </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-start mb-3">
                       <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                         {project.title}
                       </h3>
                       <div className="flex gap-2">
                          {project.github && (
                            <a 
                              href={project.github}
                              target="_blank"
                              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                              title="View Code"
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {project.figma && (
                            <a 
                              href={project.figma}
                              target="_blank"
                              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                              title="View Design"
                            >
                              <Figma size={18} />
                            </a>
                          )}
                       </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-xs font-medium text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                           <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-xs font-medium text-gray-300">
                             +{project.technologies.length - 3}
                           </span>
                        )}
                      </div>
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
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoading ? "opacity-0" : "opacity-100 group-hover:scale-110"
        }`}
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={80}
      />
    </>
  )
}
