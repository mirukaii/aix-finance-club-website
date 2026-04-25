"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"

export function IntroHero() {
  const [dismissed, setDismissed] = useState(false)
  const [hidden, setHidden] = useState(false)
  const hasTriggered = useRef(false)

  const dismiss = useCallback(() => {
    if (hasTriggered.current) return
    hasTriggered.current = true
    setDismissed(true)
    // After transition ends, fully remove from layout
    setTimeout(() => setHidden(true), 600)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) dismiss()
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY
      if (deltaY > 30) dismiss()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        dismiss()
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [dismiss])

  if (hidden) return null

  return (
    <section
      className="relative flex items-center justify-center bg-background overflow-hidden"
      style={{
        height: dismissed ? 0 : "100vh",
        opacity: dismissed ? 0 : 1,
        transform: dismissed ? "translateY(-40px)" : "translateY(0)",
        transition: "opacity 500ms ease, transform 500ms ease, height 0ms 500ms",
        pointerEvents: dismissed ? "none" : "auto",
      }}
      aria-hidden={dismissed}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-muted/40 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          opacity: dismissed ? 0 : 1,
          transform: dismissed ? "scale(0.95)" : "scale(1)",
          transition: "opacity 400ms ease, transform 400ms ease",
        }}
      >
        <Image
          src="/images/logo-sans-arriere-plan.png"
          alt="Aix Finance Club"
          width={280}
          height={93}
          className="h-20 md:h-28 w-auto"
          priority
        />
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground"
        style={{
          opacity: dismissed ? 0 : 1,
          transition: "opacity 300ms ease",
        }}
      >
        <span className="text-[11px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-border to-transparent animate-pulse" />
      </div>
    </section>
  )
}
