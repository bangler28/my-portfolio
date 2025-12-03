"use client"

import { useState } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from "next/navigation"
import TargetCursor from "@/components/TargetCursor"
import { Eye, EyeOff, Loader2, ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Convert simple username to email format
    const email = username.includes("@") ? username : `${username}@admin.com`

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      setSuccess(true)
      
      // Smooth transition
      setTimeout(() => {
        router.refresh()
        window.location.href = "/avttr"
      }, 800)
      
    } catch (error: any) {
      console.error("Login error:", error)
      setError("Access Denied. Please verify credentials.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-[#050505] font-sans selection:bg-amber-500/30">
      {/* Left Side - Visual Branding (60%) */}
      <div className="hidden lg:flex w-[60%] relative bg-black items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        {/* Ambient Lighting */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-amber-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[120px]" />

        <div className="relative z-20 flex flex-col items-start max-w-xl px-12">
            <div className="cursor-target mb-8 p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl inline-flex items-center justify-center">
               <Image src="/gutsi-logo.svg" alt="Logo" width={40} height={40} className="w-10 h-10" />
            </div>
            
            <h1 className="text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Gutsi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500">
                Dashboard
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 leading-relaxed max-w-md border-l-2 border-amber-500/30 pl-6">
              Manage your portfolio, projects, and content in a secure, high-performance environment designed for creators.
            </p>
           
        </div>
      </div>

      {/* Right Side - Login Form (40%) */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 relative bg-[#050505] border-l border-white/5">
        
        <div className="w-full max-w-[380px] space-y-8 relative z-10">
          
          <div className="text-center mb-10">
            <div className="cursor-target w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
               <Image src="/gutsi-logo.svg" alt="Logo" width={32} height={32} className="w-8 h-8 invert brightness-0" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="cursor-target w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-gray-700 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all duration-200 hover:border-white/20"
                placeholder="Enter your username"
                required
                disabled={loading || success}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cursor-target w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-4 pr-12 text-white text-sm placeholder:text-gray-700 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all duration-200 hover:border-white/20 "
                  placeholder="Enter your password"
                  required
                  disabled={loading || success}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  disabled={loading || success}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg text-red-400 text-xs font-medium text-center animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className={`
                w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-target
                ${success 
                    ? "bg-green-500 text-white cursor-default" 
                    : "bg-white text-black hover:bg-gray-200 hover:shadow-lg hover:shadow-white/5 hover:-translate-y-0.5 active:translate-y-0"}
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
              `} 
            >
              {loading ? (
                success ? (
                    <>
                        <CheckCircle2 size={18} className="cursor-targetanimate-in zoom-in duration-300" /> 
                        Authorized
                    </>
                ) : (
                    <Loader2 size={18} className="animate-spin" />
                )
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
             <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                Authorized Personnel Only
             </p>
          </div>
        </div>
      </div>
       <TargetCursor spinDuration={2} hideDefaultCursor={true} />
    </div>
  )
}
