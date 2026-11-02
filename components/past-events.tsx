"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

export type PastEventItem = {
  id: string
  title: string
  date: string
  location: string | null
  image_url: string | null
  category: string | null
}

const chip = "border px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-colors"

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" })
}

export function PastEvents({ events }: { events: PastEventItem[] }) {
  const [cat, setCat] = useState<string | null>(null)
  const categories = useMemo(
    () => Array.from(new Set(events.map((e) => e.category).filter((c): c is string => Boolean(c)))),
    [events]
  )
  const shown = useMemo(() => (cat ? events.filter((e) => e.category === cat) : events), [events, cat])

  return (
    <div>
      {categories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={() => setCat(null)} className={`${chip} ${cat === null ? "border-[#141414] bg-[#141414] text-[#f6f4ef]" : "border-[#dcd8cf] text-[#4a4a46] hover:border-[#141414]"}`}>Tous</button>
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className={`${chip} ${cat === c ? "border-[#141414] bg-[#141414] text-[#f6f4ef]" : "border-[#dcd8cf] text-[#4a4a46] hover:border-[#141414]"}`}>{c}</button>
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e) => (
          <Link key={e.id} href={`/evenements/${e.id}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e4da]">
              {e.image_url && <img src={e.image_url} alt={e.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" style={{ objectPosition: "50% 25%" }} />}
            </div>
            <div className="mt-4">
              {e.category && <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{e.category}</p>}
              <h3 className="mt-2 font-serif text-xl leading-snug decoration-[#141414]/30 underline-offset-4 group-hover:underline">{e.title}</h3>
              <p className="mt-2 text-sm text-[#6b6b66]">{fmt(e.date)}{e.location ? ` · ${e.location}` : ""}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
