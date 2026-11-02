import Link from "next/link"
import { fmtDate, type PublicationFull } from "@/lib/pub-utils"
import { ShareBar } from "@/components/publications/share-bar"

export function ArticleView({ publication: p }: { publication: PublicationFull }) {
  const meta = [p.author, fmtDate(p.published_at), p.read_time].filter(Boolean).join(" · ")

  return (
    <article className="bg-[#f6f4ef] text-[#141414]">
      <header className="px-5 pb-10 pt-28 sm:px-8 sm:pt-36 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Link href="/publications" className="text-xs uppercase tracking-[0.15em] text-[#6b6b66] transition-colors hover:text-[#141414]">← Toutes les publications</Link>
          {p.category && <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{p.category}</p>}
          <h1 className="mt-4 max-w-[22ch] text-balance font-serif text-[clamp(2.2rem,5.5vw,4.75rem)] font-normal leading-[1.06] tracking-tight">{p.title}</h1>
          {meta && <p className="mt-6 text-sm text-[#6b6b66]">{meta}</p>}
        </div>
      </header>

      {p.cover_image && (
        <section className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1100px] bg-[#e8e4da]">
            <img src={p.cover_image} alt={p.title} decoding="async" className="mx-auto block h-auto max-h-[75vh] w-auto max-w-full" />
          </div>
        </section>
      )}

      <div className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[720px]">
          {p.description && <p className="mb-10 font-serif text-xl leading-relaxed sm:text-2xl">{p.description}</p>}

          {p.content && <div className="afc-prose" dangerouslySetInnerHTML={{ __html: p.content }} />}

          {p.tags && p.tags.length > 0 && (
            <div className="mt-14 flex flex-wrap gap-2 border-t border-[#dcd8cf] pt-8">
              {p.tags.map((tag) => (
                <span key={tag} className="border border-[#dcd8cf] px-3 py-1.5 text-xs text-[#4a4a46]">{tag}</span>
              ))}
            </div>
          )}

          <div className="mt-14 border-t border-[#dcd8cf] pt-8">
            <ShareBar id={p.id} title={p.title} description={p.description} />
          </div>

          <div className="mt-14">
            <Link href="/publications" className="inline-block border border-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">← Toutes les publications</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
