"use client";

import { useState, useEffect } from "react";
import {
  FolderGit2,
  ExternalLink,
  Github,
  Figma,
  Loader2,
  Globe,
} from "lucide-react";
import ImageLightbox from "./image-lightbox";
import { useScrollAnimation, useStaggerAnimation } from "@/lib/gsap-utils";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";
import Image from "next/image";
import SkeletonImage from "./skeleton-image";

export default function Projects({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectImages, setCurrentProjectImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"project" | "playgrounds">("project");
  // We don't fetch internally anymore! We just use the server-passed initialProjects.
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const headerRef = useScrollAnimation({ triggerStart: "top 80%" });
  const projectsGridRef = useStaggerAnimation(0.12, { triggerStart: "top 75%" });

  // Fallback update if projects are updated
  useEffect(() => {
    if (initialProjects.length > 0) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const filteredProjects = projects.filter((project) => {
    return project.category.includes(selectedCategory);
  });

  const openLightbox = (imageUrl: string) => {
    setCurrentProjectImages([imageUrl]);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === currentProjectImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentProjectImages.length - 1 : prev - 1));
  };

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
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">
                Projects
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A showcase of my latest work, featuring web applications, designs, and creative experiments.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: "project", label: "Project" },
              { id: "playgrounds", label: "Playgrounds" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as "project" | "playgrounds")}
                className={`
                  relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                  ${selectedCategory === cat.id
                    ? "text-black font-bold"
                    : "text-gray-400 hover:text-white"} cursor-pointer cursor-target
                `}
              >
                {selectedCategory === cat.id && (
                  <div className="absolute inset-0 bg-amber-400 rounded-full -z-10" />
                )}
                {selectedCategory !== cat.id && (
                  <div className="absolute inset-0 border border-white/10 rounded-full -z-10 bg-white/5 hover:bg-white/10 transition-colors" />
                )}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div ref={projectsGridRef as React.RefObject<HTMLDivElement>}>
            {projects.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-gray-400 text-lg">No projects found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProjects.map((project, index) => (
                  <div key={project.id || index} className="group relative">
                    {/* Card Container */}
                    <div className="cursor-target relative h-full bg-[#232325] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 flex flex-col">
                      {/* Image Section */}
                      <div
                        className="relative aspect-video overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(project.image)}
                        role="button"
                        tabIndex={0}
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
                                rel="noopener noreferrer"
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
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                                title="View Design"
                              >
                                <Figma size={18} />
                              </a>
                            )}
                            {project.website && (
                              <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                                title="Visit Website"
                              >
                                <Globe size={18} />
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
            )}
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
  );
}

function ProjectImage({
  src,
  title,
  priority = false,
}: {
  src: string;
  title: string;
  priority?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const safeSrc = src?.startsWith("/") || src?.startsWith("http") ? src : "/placeholder.svg";

  return (
    <>
      {isLoading && <SkeletonImage />}
      {/* Blur Background replacement to prevent unoptimized double-fetch */}
      <div className="absolute inset-0 bg-[#2a2a2c] blur-md" />
      {/* Main Image */}
      <Image
        src={safeSrc}
        alt={title}
        fill
        priority={priority}
        className={`relative w-full h-full object-cover transition-all duration-700 ${
          isLoading ? "opacity-0" : "opacity-100 group-hover:scale-110"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={80}
      />
    </>
  );
}
