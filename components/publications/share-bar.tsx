"use client"

import Link from "next/link"
import { useState } from "react"

const SITE_URL = "https://www.aixfinanceclub.com"
const btn = "border border-[#dcd8cf] px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-[#141414] transition-colors hover:border-[#141414]"

export function ShareBar({ id, title, description }: { id: string; title: string; description?: string | null }) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE_URL}/publications/${id}`
  const text = `${title} - Aix Finance Club`

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: description || text, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // partage annulé par l'utilisateur
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-2 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Partager</span>
      <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={btn}>LinkedIn</Link>
      <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={btn}>X</Link>
      <button type="button" onClick={share} className={btn}>{copied ? "Lien copié" : "Copier / partager"}</button>
    </div>
  )
}
