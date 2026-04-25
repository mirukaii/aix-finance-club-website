"use client"

import { useState } from "react"
import { ImageCarousel } from "./image-carousel"
import { X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Publication {
  id: string
  title: string
  description: string | null
  category: string | null
  cover_image: string | null
  slides: string[]
  published_at: string
  created_at: string
}

interface PublicationsGridProps {
  publications: Publication[]
}

export function PublicationsGrid({ publications }: PublicationsGridProps) {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const categories = ["Tous", ...Array.from(new Set(publications.map((p) => p.category).filter(Boolean)))]

  const filtered = selectedCategory === "Tous"
    ? publications
    : publications.filter((p) => p.category === selectedCategory)

  return (
    <>
      {/* Category filter */}
      {categories.length > 2 && (
        <div className="flex gap-2 flex-wrap mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as string)}
              className={cn(
                "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors",
                selectedCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground border border-border hover:bg-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Publications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((pub) => (
          <button
            key={pub.id}
            onClick={() => setSelectedPub(pub)}
            className="group text-left bg-background rounded-xl sm:rounded-2xl border border-border/50 hover:border-border hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            {/* Cover Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
              {pub.cover_image ? (
                <img
                  src={pub.cover_image}
                  alt={pub.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              ) : pub.slides?.[0] ? (
                <img
                  src={pub.slides[0]}
                  alt={pub.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-serif text-muted-foreground/50">{pub.title[0]}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 sm:p-6">
              {pub.category && (
                <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-secondary text-foreground text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase rounded-md mb-2 sm:mb-3">
                  {pub.category}
                </span>
              )}
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2 text-balance">{pub.title}</h3>
              {pub.description && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">{pub.description}</p>
              )}
              <div className="flex items-center gap-2 mt-3 sm:mt-4 text-[10px] sm:text-xs text-muted-foreground">
                <span>{new Date(pub.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                {pub.slides?.length > 0 && (
                  <>
                    <span className="text-border">|</span>
                    <span>{pub.slides.length} slides</span>
                  </>
                )}
              </div>
              <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs sm:text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                Consulter
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-90" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedPub && (
        <div className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-background rounded-xl sm:rounded-2xl border border-border w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border sticky top-0 bg-background z-10">
              <div className="min-w-0 flex-1">
                {selectedPub.category && (
                  <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-secondary text-foreground text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase rounded-md mb-1.5 sm:mb-2">
                    {selectedPub.category}
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">{selectedPub.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPub(null)}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-3 sm:ml-4 p-1"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              {selectedPub.description && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">{selectedPub.description}</p>
              )}
              {selectedPub.slides?.length > 0 && (
                <ImageCarousel images={selectedPub.slides} title={selectedPub.title} />
              )}
              <p className="text-xs sm:text-sm text-muted-foreground text-center mt-4 sm:mt-6">
                {"Publie le "}
                {new Date(selectedPub.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
