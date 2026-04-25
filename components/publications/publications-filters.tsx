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
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-8 flex items-center justify-center">
            <FileText className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-medium text-foreground mb-6">
            Publications à venir
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {"Notre équipe rédactionnelle prépare des analyses de qualité sur les marchés financiers et l'actualité économique."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-2 block">
              Explorer
            </span>
            <h2 className="font-serif font-medium text-foreground">
              Toutes nos publications
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Type Filter */}
            <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-full">
              <button
                onClick={() => setSelectedType(null)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  !selectedType
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedType("article")}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all inline-flex items-center gap-1.5",
                  selectedType === "article"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <FileText className="w-3 h-3" />
                Articles
              </button>
              <button
                onClick={() => setSelectedType("carousel")}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all inline-flex items-center gap-1.5",
                  selectedType === "carousel"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Layers className="w-3 h-3" />
                Carousels
              </button>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-full">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    !selectedCategory
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Toutes
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                      selectedCategory === cat
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
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
          <div className="text-center py-16 border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">Aucune publication dans cette catégorie</p>
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
      className="group block bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
        {coverImage ? (
          <img
            src={coverImage}
            alt={publication.title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-background">
            <span className="text-4xl font-serif text-muted-foreground/30">{publication.title[0]}</span>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-semibold tracking-wide uppercase rounded-full">
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
      <div className="p-5 sm:p-6">
        {/* Category */}
        {publication.category && (
          <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-accent mb-3">
            {publication.category}
          </span>
        )}

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground mb-3 text-balance leading-snug group-hover:text-accent transition-colors">
          {publication.title}
        </h3>

        {/* Description */}
        {publication.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {publication.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
        <div className="mt-5 pt-5 border-t border-border/50">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent group-hover:gap-3 transition-all">
            Lire
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
