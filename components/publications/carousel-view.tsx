"use client"

import { useCallback, useEffect, useState, type TouchEvent as ReactTouchEvent } from "react"
import Link from "next/link"
import { fmtDate, type PublicationFull } from "@/lib/pub-utils"
import { ShareBar } from "@/components/publications/share-bar"

const arrow = "absolute top-1/2 -translate-y-1/2 border border-[#141414] bg-[#f6f4ef] px-3.5 py-3 text-lg leading-none text-[#141414] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]"

export function CarouselView({ publication }: { publication: PublicationFull }) {
  const slides = publication.slides || []
  const total = slides.length
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const goTo = useCallback(
    (i: number) => {
      if (total === 0) return
      setCurrent(((i % total) + total) % total)
    },
    [total]
  )

  const onTouchStart = (e: ReactTouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e: ReactTouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return
    const distance = touchStart - touchEnd
    if (distance > 50) goTo(current + 1)
    if (distance < -50) goTo(current - 1)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1)
      if (e.key === "ArrowRight") goTo(current + 1)
      if (e.key === "Escape") setFullscreen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [current, goTo])

  useEffect(() => {
    if (total < 2) return
    ;[current + 1, current - 1].forEach((i) => {
      const src = slides[((i % total) + total) % total]
      if (src) {
        const img = new window.Image()
        img.src = src
      }
    })
  }, [current, slides, total])

  useEffect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [fullscreen])

  if (total === 0) {
    return (
      <div className="bg-[#f6f4ef] px-5 pb-24 pt-40 text-center text-[#141414]">
        <p className="text-[#4a4a46]">Aucune slide disponible.</p>
        <Link href="/publications" className="mt-6 inline-block border border-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Retour aux publications</Link>
      </div>
    )
  }

  const meta = [publication.author, fmtDate(publication.published_at), `${total} slides`].filter(Boolean).join(" · ")

  return (
    <div className="bg-[#f6f4ef] text-[#141414]">
      <header className="px-5 pb-8 pt-28 sm:px-8 sm:pt-36 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Link href="/publications" className="text-xs uppercase tracking-[0.15em] text-[#6b6b66] transition-colors hover:text-[#141414]">← Toutes les publications</Link>
          {publication.category && <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{publication.category} · Carousel</p>}
          <h1 className="mt-4 max-w-[22ch] text-balance font-serif text-[clamp(2.2rem,5vw,4.25rem)] font-normal leading-[1.06] tracking-tight">{publication.title}</h1>
          {publication.description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4a4a46] sm:text-lg">{publication.description}</p>}
          <p className="mt-5 text-sm text-[#6b6b66]">{meta}</p>
        </div>
      </header>

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative aspect-[4/3] w-full select-none overflow-hidden bg-[#e8e4da] sm:aspect-[16/10]" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <img key={current} src={slides[current]} alt={`${publication.title}, slide ${current + 1}`} decoding="async" className="absolute inset-0 h-full w-full object-contain" />
            {total > 1 && (
              <>
                <button type="button" onClick={() => goTo(current - 1)} className={`${arrow} left-3`} aria-label="Slide précédente">←</button>
                <button type="button" onClick={() => goTo(current + 1)} className={`${arrow} right-3`} aria-label="Slide suivante">→</button>
              </>
            )}
            <div className="absolute right-3 top-3 border border-[#141414] bg-[#f6f4ef] px-3 py-1.5 text-xs tracking-[0.1em]">{current + 1} / {total}</div>
          </div>

          {total > 1 && (
            <div className="mt-5 h-px w-full bg-[#dcd8cf]">
              <div className="h-px bg-[#141414] transition-all duration-300" style={{ width: `${((current + 1) / total) * 100}%` }} />
            </div>
          )}

          {total > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {slides.map((src, i) => (
                <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Aller à la slide ${i + 1}`} className={`h-14 w-20 overflow-hidden border transition-opacity ${current === i ? "border-[#141414] opacity-100" : "border-[#dcd8cf] opacity-60 hover:opacity-100"}`}>
                  <img src={src} alt={`Miniature ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[#dcd8cf] pt-8">
            <ShareBar id={publication.id} title={publication.title} description={publication.description} />
            <button type="button" onClick={() => setFullscreen(true)} className="border border-[#141414] px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Plein écran</button>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Link href="/publications" className="inline-block border border-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">← Toutes les publications</Link>
        </div>
      </section>

      {fullscreen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <button type="button" onClick={() => setFullscreen(false)} className="absolute right-4 top-4 z-30 border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black" aria-label="Fermer">Fermer ✕</button>
          <div className="absolute left-4 top-4 z-30 text-sm text-white/80">{current + 1} / {total}</div>
          <div className="flex h-full w-full items-center justify-center p-4 sm:p-8">
            <img src={slides[current]} alt={`${publication.title}, slide ${current + 1}`} className="max-h-full max-w-full object-contain" />
          </div>
          {total > 1 && (
            <>
              <button type="button" onClick={() => goTo(current - 1)} className="absolute left-4 top-1/2 z-30 -translate-y-1/2 border border-white/40 px-4 py-3 text-xl text-white transition-colors hover:bg-white hover:text-black" aria-label="Slide précédente">←</button>
              <button type="button" onClick={() => goTo(current + 1)} className="absolute right-4 top-1/2 z-30 -translate-y-1/2 border border-white/40 px-4 py-3 text-xl text-white transition-colors hover:bg-white hover:text-black" aria-label="Slide suivante">→</button>
              <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
                {slides.map((_, i) => (
                  <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Aller à la slide ${i + 1}`} className={`h-2 rounded-full transition-all ${current === i ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
