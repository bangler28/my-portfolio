"use client"

import { useEffect, useState } from "react"

interface FlipCardProps {
  images: string[]
  interval?: number
}

export default function FlipCard({ images, interval = 4000 }: FlipCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsFlipping(false)
      }, 300)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="relative w-full h-full">
      <style>{`
        @keyframes flipCard {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            transform: rotateY(360deg);
            opacity: 1;
          }
        }
        
        .flip-card-image {
          animation: ${isFlipping ? "flipCard 0.6s ease-in-out" : "none"};
          transform-style: preserve-3d;
        }
      `}</style>

      <img
        src={images[currentImageIndex] || "/placeholder.svg"}
        alt="Profile"
        className="flip-card-image w-full h-full rounded-xl sm:rounded-2xl shadow-2xl object-cover"
        loading="lazy"
      />
    </div>
  )
}
