import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { fmtDate, isCarouselPub, pubImage, type PublicationFull } from "@/lib/pub-utils"

export function PublicationsHero({ publications }: { publications: PublicationFull[] }) {
  const f = publications[0]

  if (!f) {
    return (
      <>
        <PageHeader label="Publications" title="Nos analyses" intro="Articles d'analyse et Focus visuels sur les marchés financiers, l'économie et les métiers de la finance." />
        <section className="px-5 pb-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-serif text-3xl tracking-tight">Publications à venir</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-[#4a4a46]">Notre équipe rédactionnelle prépare des analyses de qualité sur les marchés financiers et l&apos;actualité économique.</p>
          </div>
        </section>
      </>
    )
  }

  const img = pubImage(f)
  const carousel = isCarouselPub(f)
  const label = [carousel ? "Carousel" : "Article", f.category].filter(Boolean).join(" · ")
  const meta = [f.author, fmtDate(f.published_at), f.read_time, carousel && f.slides && f.slides.length > 0 ? `${f.slides.length} slides` : null].filter(Boolean).join(" · ")

  return (
    <>
      <PageHeader label="Publications" title="Nos analyses" intro="Articles d'analyse et Focus visuels sur les marchés financiers, l'économie et les métiers de la finance." />
      <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">À la une</p>
          <Link href={`/publications/${f.id}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4da] lg:col-span-7">
              {img && <img src={img} alt={f.title} decoding="async" className="absolute inset-0 h-full w-full object-contain" />}
            </div>
            <div className="flex flex-col justify-end lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{label}</p>
              <h2 className="mt-3 text-balance font-serif text-3xl leading-tight tracking-tight decoration-[#141414]/30 underline-offset-4 group-hover:underline sm:text-4xl">{f.title}</h2>
              {f.description && <p className="mt-4 line-clamp-4 leading-relaxed text-[#4a4a46]">{f.description}</p>}
              {meta && <p className="mt-5 text-sm text-[#6b6b66]">{meta}</p>}
              <p className="mt-6 text-xs uppercase tracking-[0.2em]">Lire →</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
