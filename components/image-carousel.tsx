"use client"

import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: string[]
  title?: string
  className?: string
}

export function ImageCarousel({ images, title, className }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const total = images.length

  const goTo = useCallback((index: number) => {
    if (index < 0) setCurrent(total - 1)
    else if (index >= total) setCurrent(0)
    else setCurrent(index)
  }, [total])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) goTo(current + 1)
    if (distance < -50) goTo(current - 1)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1)
      if (e.key === "ArrowRight") goTo(current + 1)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [current, goTo])

  if (!images.length) return null

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)} role="region" aria-label={title || "Carousel"}>
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/30 shadow-lg"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <img
              src={src}
              alt={`${title || "Slide"} ${i + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}

        {total > 1 && (
          <>
            <button
              onClick={() => goTo(current - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-md z-20"
              aria-label="Slide precedente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-md z-20"
              aria-label="Slide suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {total > 0 && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-foreground/80 backdrop-blur-sm text-background text-[12px] font-medium z-20">
            {current + 1} / {total}
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap max-w-full px-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "transition-all duration-300 rounded-full",
                current === i ? "w-6 h-2 bg-foreground" : "w-2 h-2 bg-border hover:bg-muted-foreground"
              )}
              aria-label={`Aller a la slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
