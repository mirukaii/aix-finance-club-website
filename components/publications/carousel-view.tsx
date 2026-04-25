"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, X, Share2, Linkedin, Twitter, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Publication {
  id: string
  title: string
  description: string | null
  type: string | null
  category: string | null
  cover_image: string | null
  slides: string[] | null
  author: string | null
  read_time: string | null
  published_at: string
}

interface CarouselViewProps {
  publication: Publication
}

export function CarouselView({ publication }: CarouselViewProps) {
  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const slides = publication.slides || []
  const total = slides.length

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `${publication.title} - Aix Finance Club`

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

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1)
      if (e.key === "ArrowRight") goTo(current + 1)
      if (e.key === "Escape") setIsFullscreen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [current, goTo])

  if (slides.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <p className="text-muted-foreground">Aucune slide disponible</p>
        <Link href="/publications" className="text-accent mt-4 inline-block">
          Retour aux publications
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <header className="pt-24 sm:pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Toutes les publications
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              {/* Category */}
              {publication.category && (
                <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                  {publication.category}
                </span>
              )}

              {/* Title */}
              <h1 className="font-serif font-medium text-foreground mb-4 text-balance">
                {publication.title}
              </h1>

              {/* Description */}
              {publication.description && (
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {publication.description}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                {publication.author && (
                  <span>{publication.author}</span>
                )}
                <span>
                  {new Date(publication.published_at).toLocaleDateString("fr-FR", { 
                    day: "numeric", 
                    month: "long", 
                    year: "numeric" 
                  })}
                </span>
                <span>{total} slides</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                aria-label="Partager sur LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                aria-label="Partager sur Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsFullscreen(true)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                aria-label="Plein écran"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Carousel */}
      <section className="pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Slide */}
          <div
            className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden bg-secondary/30 shadow-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {slides.map((src, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <img
                  src={src}
                  alt={`${publication.title} - Slide ${i + 1}`}
                  className="w-full h-full object-contain bg-card"
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={() => goTo(current - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg z-20"
                  aria-label="Slide précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => goTo(current + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg z-20"
                  aria-label="Slide suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Progress Counter */}
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium z-20">
              {current + 1} / {total}
            </div>
          </div>

          {/* Progress Bar */}
          {total > 1 && (
            <div className="mt-6 sm:mt-8">
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${((current + 1) / total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Thumbnails */}
          {total > 1 && (
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {slides.map((src, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all",
                    current === i 
                      ? "border-accent ring-2 ring-accent/30" 
                      : "border-border/50 opacity-60 hover:opacity-100"
                  )}
                  aria-label={`Aller à la slide ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`Miniature ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-30"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium z-30">
            {current + 1} / {total}
          </div>

          {/* Slide */}
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
            <img
              src={slides[current]}
              alt={`${publication.title} - Slide ${current + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation */}
          {total > 1 && (
            <>
              <button
                onClick={() => goTo(current - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-30"
                aria-label="Slide précédente"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={() => goTo(current + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-30"
                aria-label="Slide suivante"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          {/* Progress Dots */}
          {total > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    current === i 
                      ? "w-8 h-2 bg-white" 
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Aller à la slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Back Link */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voir toutes les publications
          </Link>
        </div>
      </section>
    </>
  )
}
