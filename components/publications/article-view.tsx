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
    <article>
      {/* Hero Header */}
      <header className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end">
        {/* Background Image */}
        {publication.cover_image ? (
          <div className="absolute inset-0">
            <img
              src={publication.cover_image}
              alt={publication.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        )}

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-32">
            {/* Back Button */}
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Toutes les publications
            </Link>

            {/* Category */}
            {publication.category && (
              <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                {publication.category}
              </span>
            )}

            {/* Title */}
            <h1 className="font-serif font-medium text-foreground mb-6 text-balance leading-[1.1]">
              {publication.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-foreground/60">
              {publication.author && (
                <span className="inline-flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium text-foreground">{publication.author}</span>
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(publication.published_at).toLocaleDateString("fr-FR", { 
                  day: "numeric", 
                  month: "long", 
                  year: "numeric" 
                })}
              </span>
              {publication.read_time && (
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {publication.read_time}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Description/Lead */}
        {publication.description && (
          <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed mb-10 sm:mb-12 font-medium">
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
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {publication.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-secondary text-foreground/70 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Partager cet article</span>
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
                onClick={handleShare}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                aria-label="Partager"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Back to Publications */}
        <div className="mt-12 text-center">
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voir toutes les publications
          </Link>
        </div>
      </div>
    </article>
  )
}
