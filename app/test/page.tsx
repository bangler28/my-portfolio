"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestSupabase() {
  const [status, setStatus] = useState("Checking...")
  const [envInfo, setEnvInfo] = useState<any>({})

  useEffect(() => {
    async function check() {
      try {
        // 1. Cek Env Vars (tanpa menampilkan key penuh demi keamanan)
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        const info = {
          urlPresent: !!url,
          keyPresent: !!key,
          urlValue: url,
          keyLength: key?.length,
          keyPrefix: key?.substring(0, 10)
        }
        setEnvInfo(info)

        // 2. Cek Koneksi
        const { data, error } = await supabase.from("projects").select("count", { count: "exact", head: true })
        
        if (error) {
            console.error("Supabase Error Full:", error)
            setStatus(`CONNECTION FAILED: ${JSON.stringify(error)}`)
        } else {
            setStatus("CONNECTION SUCCESS! Database is connected.")
        }
      } catch (e: any) {
        console.error("Catch Error:", e)
        setStatus(`CRITICAL ERROR: ${e.message || JSON.stringify(e)}`)
      }
    }
    
    check()
  }, [])

  return (
    <div className="p-10 bg-black text-white font-mono">
      <h1 className="text-2xl font-bold mb-4">Supabase Diagnostics</h1>
      <div className="border border-white/20 p-4 rounded mb-4">
        <h2 className="text-xl mb-2">Environment Variables</h2>
        <pre>{JSON.stringify(envInfo, null, 2)}</pre>
      </div>
      <div className="border border-red-500/50 p-4 rounded">
         <h2 className="text-xl mb-2">Connection Status</h2>
         <p className="text-lg">{status}</p>
      </div>
    </div>
  )
}
