"use client"

import Link from "next/link"
import { ArrowLeft, Clock, User, Calendar, Share2, Linkedin, Twitter } from "lucide-react"

interface Publication {
  id: string
  title: string
  description: string | null
  type: string | null
  category: string | null
  cover_image: string | null
  content: string | null
  author: string | null
  read_time: string | null
  published_at: string
  tags: string[] | null
}

interface ArticleViewProps {
  publication: Publication
}

export function ArticleView({ publication }: ArticleViewProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `${publication.title} - Aix Finance Club`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: publication.title,
          text: publication.description || "",
          url: shareUrl,
        })
      } catch {
        // User cancelled or error
      }
    }
  }

  return (
    <article className="bg-[#0a0a0a]">
      {/* Hero Header - Premium */}
      <header className="relative min-h-[55vh] sm:min-h-[65vh] flex items-end">
        {/* Background Image */}
        {publication.cover_image ? (
          <div className="absolute inset-0">
            <img
              src={publication.cover_image}
              alt={publication.title}
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
            <div className="absolute inset-0 bg-[#0a0a0a]/30" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-[#0a0a0a]" />
        )}

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-32">
            {/* Back Button */}
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Toutes les publications
            </Link>

            {/* Category */}
            {publication.category && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm text-accent text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full border border-accent/20 mb-6">
                {publication.category}
              </span>
            )}

            {/* Title */}
            <h1 className="font-serif font-medium text-white mb-8 text-balance leading-[1.1]">
              {publication.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-white/40">
              {publication.author && (
                <span className="inline-flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  <span className="font-medium text-white">{publication.author}</span>
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {new Date(publication.published_at).toLocaleDateString("fr-FR", { 
                  day: "numeric", 
                  month: "long", 
                  year: "numeric" 
                })}
              </span>
              {publication.read_time && (
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  {publication.read_time}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Article Body - Premium */}
      <div className="bg-[#0f0f0f] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          {/* Description/Lead */}
          {publication.description && (
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-12 sm:mb-14 font-medium">
              {publication.description}
            </p>
          )}

          {/* Content - TipTap HTML */}
          {publication.content && (
            <div 
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: publication.content }}
            />
          )}

          {/* Tags */}
          {publication.tags && publication.tags.length > 0 && (
            <div className="mt-14 pt-10 border-t border-white/[0.06]">
              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-white/60 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-14 pt-10 border-t border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/40">Partager cet article</span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/50 transition-colors"
                  aria-label="Partager sur LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/50 transition-colors"
                  aria-label="Partager sur Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/50 transition-colors"
                  aria-label="Partager"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Back to Publications */}
          <div className="mt-14 text-center">
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Toutes les publications
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
