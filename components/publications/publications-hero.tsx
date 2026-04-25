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
      <section className="pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-5 block">
            Publications
          </span>
          <h1 className="font-serif font-medium text-white mb-7">
            Nos analyses
          </h1>
          <p className="text-lg sm:text-xl text-white/40 leading-relaxed max-w-2xl font-light">
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
    <section className="pt-20 bg-[#0a0a0a]">
      {/* Featured Article - Full Width Hero */}
      <Link 
        href={`/publications/${featuredPub.id}`}
        className="block relative group"
      >
        <div className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end overflow-hidden">
          {/* Background Image */}
          {coverImage ? (
            <div className="absolute inset-0">
              <img
                src={coverImage}
                alt={featuredPub.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
              <div className="absolute inset-0 bg-[#0a0a0a]/20" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-[#0a0a0a]" />
          )}

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 lg:pb-24">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent/20 backdrop-blur-sm text-accent text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase rounded-full border border-accent/20">
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
                  <span className="px-4 py-2 bg-white/[0.05] backdrop-blur-sm text-white/70 text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase rounded-full border border-white/10">
                    {featuredPub.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif font-medium text-white mb-5 sm:mb-7 text-balance leading-[1.1]">
                {featuredPub.title}
              </h1>

              {/* Description */}
              {featuredPub.description && (
                <p className="text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed mb-7 sm:mb-10 line-clamp-3 font-light">
                  {featuredPub.description}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-sm text-white/40">
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
