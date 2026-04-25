"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Clock, User, FileText, Layers, ArrowRight } from "lucide-react"

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
  content: string | null
}

interface PublicationsFiltersProps {
  publications: Publication[]
  categories: string[]
}

export function PublicationsFilters({ publications, categories }: PublicationsFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Skip the first publication (featured in hero)
  const remainingPubs = publications.slice(1)

  // Filter publications
  const filteredPubs = remainingPubs.filter((pub) => {
    const matchesCategory = !selectedCategory || pub.category === selectedCategory
    const isCarousel = pub.type === "carousel" || (pub.slides && pub.slides.length > 0 && !pub.content)
    const matchesType = !selectedType || 
      (selectedType === "article" && !isCarousel) || 
      (selectedType === "carousel" && isCarousel)
    return matchesCategory && matchesType
  })

  if (publications.length === 0) {
    return (
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] mx-auto mb-10 flex items-center justify-center">
            <FileText className="h-8 w-8 text-white/30" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-white mb-6">
            Publications à venir
          </h3>
          <p className="text-white/40 leading-relaxed text-base sm:text-lg">
            {"Notre équipe rédactionnelle prépare des analyses de qualité sur les marchés financiers et l'actualité économique."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-3 block">
              Explorer
            </span>
            <h2 className="font-serif font-medium text-white">
              Toutes nos publications
            </h2>
          </div>

          {/* Filters - Premium */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Type Filter */}
            <div className="flex items-center gap-1 p-1.5 bg-white/[0.02] border border-white/[0.06] rounded-full">
              <button
                onClick={() => setSelectedType(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300",
                  !selectedType
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white/70"
                )}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedType("article")}
                className={cn(
                  "px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 inline-flex items-center gap-1.5",
                  selectedType === "article"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white/70"
                )}
              >
                <FileText className="w-3 h-3" />
                Articles
              </button>
              <button
                onClick={() => setSelectedType("carousel")}
                className={cn(
                  "px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 inline-flex items-center gap-1.5",
                  selectedType === "carousel"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white/70"
                )}
              >
                <Layers className="w-3 h-3" />
                Carousels
              </button>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex items-center gap-1 p-1.5 bg-white/[0.02] border border-white/[0.06] rounded-full">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300",
                    !selectedCategory
                      ? "bg-accent text-white"
                      : "text-white/50 hover:text-white/70"
                  )}
                >
                  Toutes
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap",
                      selectedCategory === cat
                        ? "bg-accent text-white"
                        : "text-white/50 hover:text-white/70"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Publications Grid */}
        {filteredPubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPubs.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/[0.06] rounded-3xl bg-white/[0.01]">
            <p className="text-white/40">Aucune publication dans cette catégorie</p>
          </div>
        )}
      </div>
    </section>
  )
}

function PublicationCard({ publication }: { publication: Publication }) {
  const isCarousel = publication.type === "carousel" || (publication.slides && publication.slides.length > 0 && !publication.content)
  const coverImage = publication.cover_image || (publication.slides?.[0])

  return (
    <Link
      href={`/publications/${publication.id}`}
      className="group block bg-white/[0.02] rounded-2xl sm:rounded-3xl border border-white/[0.04] overflow-hidden hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
        {coverImage ? (
          <img
            src={coverImage}
            alt={publication.title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
            <span className="text-4xl font-serif text-white/10">{publication.title[0]}</span>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-semibold tracking-wider uppercase rounded-full border border-white/10">
            {isCarousel ? (
              <>
                <Layers className="w-3 h-3" />
                Carousel
              </>
            ) : (
              <>
                <FileText className="w-3 h-3" />
                Article
              </>
            )}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        {/* Category */}
        {publication.category && (
          <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            {publication.category}
          </span>
        )}

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-4 text-balance leading-snug group-hover:text-white/90 transition-colors">
          {publication.title}
        </h3>

        {/* Description */}
        {publication.description && (
          <p className="text-sm text-white/35 leading-relaxed line-clamp-2 mb-5">
            {publication.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/30">
          {publication.author && (
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {publication.author}
            </span>
          )}
          <span>
            {new Date(publication.published_at).toLocaleDateString("fr-FR", { 
              day: "numeric", 
              month: "short", 
              year: "numeric" 
            })}
          </span>
          {publication.read_time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {publication.read_time}
            </span>
          )}
          {isCarousel && publication.slides && publication.slides.length > 0 && (
            <span>{publication.slides.length} slides</span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 pt-6 border-t border-white/[0.04]">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider uppercase text-accent group-hover:gap-3 transition-all">
            Lire
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
