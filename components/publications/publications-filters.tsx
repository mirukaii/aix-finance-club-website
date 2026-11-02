"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { fmtDate, isCarouselPub, pubImage, type PublicationFull } from "@/lib/pub-utils"

interface PublicationsFiltersProps {
  publications: PublicationFull[]
  categories: string[]
}

const chip = "border px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-colors"
const on = "border-[#141414] bg-[#141414] text-[#f6f4ef]"
const off = "border-[#dcd8cf] text-[#4a4a46] hover:border-[#141414]"

export function PublicationsFilters({ publications, categories }: PublicationsFiltersProps) {
  const [category, setCategory] = useState<string | null>(null)
  const [type, setType] = useState<"article" | "carousel" | null>(null)

  const rest = useMemo(() => publications.slice(1), [publications])
  const filtered = useMemo(
    () =>
      rest.filter((p) => {
        const okCat = !category || p.category === category
        const car = isCarouselPub(p)
        const okType = !type || (type === "carousel" ? car : !car)
        return okCat && okType
      }),
    [rest, category, type]
  )

  if (rest.length === 0) return null

  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-b border-[#141414] pb-3">
          <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Toutes nos publications</h2>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setType(null)} className={`${chip} ${type === null ? on : off}`}>Tous les formats</button>
            <button type="button" onClick={() => setType("article")} className={`${chip} ${type === "article" ? on : off}`}>Articles</button>
            <button type="button" onClick={() => setType("carousel")} className={`${chip} ${type === "carousel" ? on : off}`}>Carousels</button>
          </div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setCategory(null)} className={`${chip} ${category === null ? on : off}`}>Toutes les catégories</button>
              {categories.map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)} className={`${chip} ${category === c ? on : off}`}>{c}</button>
              ))}
            </div>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const img = pubImage(p)
              const car = isCarouselPub(p)
              const label = [car ? "Carousel" : "Article", p.category].filter(Boolean).join(" · ")
              const meta = [p.author, fmtDate(p.published_at, "short"), p.read_time, car && p.slides && p.slides.length > 0 ? `${p.slides.length} slides` : null].filter(Boolean).join(" · ")
              return (
                <Link key={p.id} href={`/publications/${p.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4da]">
                    {img && <img src={img} alt={p.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]" />}
                  </div>
                  <div className="mt-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{label}</p>
                    <h3 className="mt-2 text-balance font-serif text-xl leading-snug decoration-[#141414]/30 underline-offset-4 group-hover:underline sm:text-2xl">{p.title}</h3>
                    {p.description && <p className="mt-2 line-clamp-2 text-sm text-[#4a4a46]">{p.description}</p>}
                    {meta && <p className="mt-3 text-xs text-[#6b6b66]">{meta}</p>}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="mt-10 border border-dashed border-[#dcd8cf] py-14 text-center text-[#6b6b66]">Aucune publication pour cette sélection.</p>
        )}
      </div>
    </section>
  )
}
