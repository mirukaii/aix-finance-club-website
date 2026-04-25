"use client"

import Link from "next/link"
import { Clock, User, FileText, Layers } from "lucide-react"

interface Publication {
  id: string
  title: string
  description: string | null
  type: string | null
  category: string | null
  cover_image: string | null
  slides: string[] | null
  content: string | null
  author: string | null
  read_time: string | null
  published_at: string
}

interface PublicationsHeroProps {
  publications: Publication[]
}

export function PublicationsHero({ publications }: PublicationsHeroProps) {
  const featuredPub = publications[0]

  if (!featuredPub) {
    return (
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
            Publications
          </span>
          <h1 className="font-serif font-medium text-foreground mb-6">
            Nos analyses
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {"Articles d'analyse et Focus visuels sur les marchés financiers, l'économie et les métiers de la finance."}
          </p>
        </div>
      </section>
    )
  }

  const isCarousel = featuredPub.type === "carousel" || (featuredPub.slides && featuredPub.slides.length > 0 && !featuredPub.content)
  const hasContent = featuredPub.content && featuredPub.content.trim().length > 0
  const coverImage = featuredPub.cover_image || (featuredPub.slides?.[0])

  return (
    <section className="pt-20">
      {/* Featured Article - Full Width Hero */}
      <Link 
        href={`/publications/${featuredPub.id}`}
        className="block relative group"
      >
        <div className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden">
          {/* Background Image */}
          {coverImage ? (
            <div className="absolute inset-0">
              <img
                src={coverImage}
                alt={featuredPub.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />
          )}

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground text-[11px] font-semibold tracking-wide uppercase rounded-full">
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
                {featuredPub.category && (
                  <span className="px-3 py-1.5 bg-foreground/10 backdrop-blur-sm text-foreground text-[11px] font-medium tracking-wide uppercase rounded-full border border-foreground/20">
                    {featuredPub.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif font-medium text-foreground mb-4 sm:mb-6 text-balance leading-[1.1]">
                {featuredPub.title}
              </h1>

              {/* Description */}
              {featuredPub.description && (
                <p className="text-base sm:text-lg lg:text-xl text-foreground/80 leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                  {featuredPub.description}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-foreground/60">
                {featuredPub.author && (
                  <span className="inline-flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featuredPub.author}
                  </span>
                )}
                <span>
                  {new Date(featuredPub.published_at).toLocaleDateString("fr-FR", { 
                    day: "numeric", 
                    month: "long", 
                    year: "numeric" 
                  })}
                </span>
                {featuredPub.read_time && (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredPub.read_time}
                  </span>
                )}
                {isCarousel && featuredPub.slides && featuredPub.slides.length > 0 && (
                  <span>{featuredPub.slides.length} slides</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
