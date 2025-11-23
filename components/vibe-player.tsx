"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music2 } from "lucide-react"

interface Song {
  title: string
  artist: string
  src: string
}

const PLAYLIST: Song[] = [
  {
    title: "It's Not Living (If It's Not With You)",
    artist: "The 1975",
    src: "/songs/The 1975 ~ It's Not Living (If It's Not With You) Lyrics - heartbroke corner.mp3",
  },
  {
    title: "Turning Green",
    artist: "Maki",
    src: "/songs/Maki - 'turning green' Official Lyric Video - Tarsier Records.mp3",
  },
  {
    title: "Dilaw",
    artist: "Maki",
    src: "/songs/“Dilaw” - Maki (Official Lyric Video) - Tarsier Records.mp3",
  },
  {
    title: "About You / Robbers (Medley)",
    artist: "The 1975",
    src: "/songs/The 1975 __ About You - Robbers - An Encounter - I Always Wanna Die - Medicine - Head.Cars.Bending - Up And Drumming.mp3",
  },
]

export default function VibePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const initAudio = () => {
    if (audioRef.current) return

    audioRef.current = new Audio(PLAYLIST[0].src)
    audioRef.current.volume = 0.5
    
    const audio = audioRef.current

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleEnded = () => {
      playNext()
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("ended", handleEnded)
    setIsInitialized(true)
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        // We can't easily remove specific listeners if functions are defined inside initAudio
        // But since component unmounts, it's mostly fine.
        // Better to move functions out or use refs.
      }
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, isInitialized])

  useEffect(() => {
    if (!isInitialized) return
    if (audioRef.current) {
      const wasPlaying = isPlaying
      audioRef.current.src = PLAYLIST[currentSongIndex].src
      audioRef.current.load()
      if (wasPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentSongIndex, isInitialized])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const togglePlay = () => {
    if (!isInitialized) initAudio()
    setIsPlaying(!isPlaying)
  }
  
  const playNext = () => {
    if (!isInitialized) initAudio()
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length)
  }

  const playPrev = () => {
    if (!isInitialized) initAudio()
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length)
  }

  const toggleMute = () => setIsMuted(!isMuted)

  return (
    <div 
      className="cursor-target fixed bottom-6 left-6 z-50 transition-all duration-500 ease-out"
      onMouseEnter={() => {
        setIsHovered(true)
        // Optional: Init on hover to prepare
        // initAudio() 
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Liquid Glass Container */}
      <div className={`
        relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl p-4
        transition-all duration-500 ease-out
        ${isHovered ? "w-80" : "w-14 h-14 p-0 rounded-full flex items-center justify-center cursor-pointer"}
      `}>
        
        {/* Compact Mode (Icon only) */}
        {!isHovered && (
          <div className="relative w-full h-full flex items-center justify-center" onClick={() => setIsHovered(true)}>
             <div className={`absolute inset-0 bg-amber-500/20 rounded-full ${isPlaying ? 'animate-ping' : ''}`} />
             <Music2 className={`w-6 h-6 text-amber-400 ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
        )}

        {/* Expanded Mode */}
        <div className={`transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0 hidden"}`}>
          {/* Song Info */}
          <div className="flex items-start justify-between mb-3">
            <div className="overflow-hidden">
              <h3 className="text-white font-bold text-sm truncate w-48">{PLAYLIST[currentSongIndex].title}</h3>
              <p className="text-gray-400 text-xs truncate">{PLAYLIST[currentSongIndex].artist}</p>
            </div>
            
            {/* Visualizer Bars */}
            <div className="flex items-end gap-1 h-6">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 bg-amber-400 rounded-t-sm transition-all duration-300 ${isPlaying ? 'animate-music-bar' : 'h-1'}`}
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    height: isPlaying ? `${Math.random() * 100}%` : '4px'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-1 mb-4">
            <div 
              className="bg-linear-to-r from-amber-400 to-orange-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <div className="flex items-center gap-4">
              <button onClick={playPrev} className="text-gray-300 hover:text-amber-400 transition-colors">
                <SkipBack size={18} fill="currentColor" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/30 hover:scale-110 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
              </button>

              <button onClick={playNext} className="text-gray-300 hover:text-amber-400 transition-colors">
                <SkipForward size={18} fill="currentColor" />
              </button>
            </div>
             
             <div className="w-4" /> {/* Spacer to balance layout */}
          </div>
        </div>

        {/* Glass Reflection Effect */}
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-white opacity-10 pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
