"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Project } from "@/lib/types"
import TargetCursor from "@/components/TargetCursor"
import { Plus, Pencil, Trash2, Save, X, Loader2, Upload, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url")
  const router = useRouter()

  // Form State
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    image: "",
    technologies: [],
    github: "",
    figma: "",
    website: "",
    color: "from-blue-500/20 to-purple-500/20",
    category: ["all"],
  })

  // ... (fetchProjects, handleSubmit, handleDelete, closeForm remain mostly same)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function handleLogout() {
    try {
      await supabase.auth.signOut()
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  async function fetchProjects() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false })

      if (error) throw error
      if (data) setProjects(data)
    } catch (error: any) {
      console.error("Error fetching projects:", error)
      alert(`Error fetching projects: ${JSON.stringify(error, null, 2)}`)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingProject?.id) {
        const { error } = await supabase
          .from("projects")
          .update(formData)
          .eq("id", editingProject.id)
        
        if (error) throw error
        alert("Project updated successfully!")
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([formData])
        
        if (error) throw error
        alert("Project created successfully!")
      }
      
      closeForm()
      fetchProjects()
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Error saving project")
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id)
      if (error) throw error
      setProjects(projects.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Error deleting project")
    }
  }

  function openEdit(project: Project) {
    setEditingProject(project)
    setFormData(project)
    setIsFormOpen(true)
    // Auto detect mode based on current image value
    setUploadMode(project.image.startsWith("http") && project.image.includes("supabase") ? "file" : "url")
  }

  function openCreate() {
    setEditingProject(null)
    setFormData({
      title: "",
      description: "",
      image: "",
      technologies: [],
      github: "",
      figma: "",
      website: "",
      color: "from-blue-500/20 to-purple-500/20",
      category: ["all"],
    })
    setIsFormOpen(true)
    setUploadMode("url")
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  function handleTechChange(e: React.ChangeEvent<HTMLInputElement>) {
    const techs = e.target.value.split(",").map((t) => t.trim())
    setFormData({ ...formData, technologies: techs })
  }

  function toggleCategory(cat: "all" | "frontend" | "uiux") {
    const current = [...formData.category]
    if (current.includes(cat)) {
      setFormData({ ...formData, category: current.filter(c => c !== cat) })
    } else {
      setFormData({ ...formData, category: [...current, cat] })
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    setIsUploading(true)
    try {
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath)

      setFormData({ ...formData, image: data.publicUrl })
    } catch (error: any) {
      alert(`Error uploading image: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1918] text-white p-8">
      {/* Header & List (Same as before) */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Project Admin</h1>
          <button
            onClick={openCreate}
            className="cursor-target flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin w-10 h-10 text-amber-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-[#232325] border border-white/5 rounded-xl overflow-hidden group">
                <div className="relative h-48">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEdit(project)}
                      className="p-2 bg-blue-500 rounded-full text-white hover:scale-110 transition-transform"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => project.id && handleDelete(project.id)}
                      className="p-2 bg-red-500 rounded-full text-white hover:scale-110 transition-transform"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.category.map((cat) => (
                      <span key={cat} className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#232325] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#232325] z-10">
                <h2 className="text-xl font-bold">{editingProject ? "Edit Project" : "New Project"}</h2>
                <button onClick={closeForm} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title & Image Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Image Source</label>
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setUploadMode("url")}
                        className={`px-3 py-1 rounded text-xs ${uploadMode === "url" ? "bg-amber-500 text-black" : "bg-white/10"}`}
                      >
                        URL Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMode("file")}
                        className={`px-3 py-1 rounded text-xs ${uploadMode === "file" ? "bg-amber-500 text-black" : "bg-white/10"}`}
                      >
                        Upload File
                      </button>
                    </div>

                    {uploadMode === "url" ? (
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-amber-500 outline-none"
                      />
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center justify-center w-full p-2 border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5"
                        >
                          {isUploading ? (
                            <Loader2 className="animate-spin text-amber-500" />
                          ) : (
                            <span className="text-sm text-gray-400 flex items-center gap-2">
                              <Upload size={16} /> Choose File
                            </span>
                          )}
                        </label>
                        {formData.image && formData.image.includes("supabase") && (
                          <p className="text-xs text-green-500 mt-1 truncate">Image uploaded!</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-amber-500 outline-none h-24"
                    required
                  />
                </div>

                {/* Technologies & Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={formData.technologies.join(", ")}
                      onChange={handleTechChange}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-amber-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {["all", "frontend", "uiux"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat as any)}
                          className={`
                            px-3 py-1 rounded-full text-xs border transition-colors
                            ${formData.category.includes(cat as any)
                              ? "bg-amber-500 border-amber-500 text-black font-bold"
                              : "bg-transparent border-white/20 text-gray-400 hover:border-white"}
                          `}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Github URL</label>
                    <input
                      type="text"
                      value={formData.github || ""}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="Optional"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Figma URL</label>
                    <input
                      type="text"
                      value={formData.figma || ""}
                      onChange={(e) => setFormData({ ...formData, figma: e.target.value })}
                      placeholder="Optional"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Website URL</label>
                    <input
                      type="text"
                      value={formData.website || ""}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="Optional"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
                
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Color (Tailwind Gradient)</label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-amber-500 outline-none"
                    />
                  </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-4">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="x-7 py-2 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    {isUploading ? "Uploading..." : "Save Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
         <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      </div>

      {/* Floating Logout Button */}
      <div className="fixed bottom-8 right-8 z-40 cursor-target">
        <button
          onClick={handleLogout}
          className="group bg-[#232325] hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 text-gray-400 hover:text-red-500 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-0 hover:gap-2 overflow-hidden"
          title="Logout"
        >
          <LogOut size={20} />
          <span className="max-w-0 group-hover:max-w-[100px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium text-sm">
            Logout
          </span>
        </button>
      </div>
    </div>
  )
}
