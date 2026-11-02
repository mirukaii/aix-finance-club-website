export type PublicationFull = {
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
  published_at: string | null
  tags: string[] | null
}

export function isCarouselPub(p: PublicationFull): boolean {
  return p.type === "carousel" || (!!p.slides && p.slides.length > 0 && !p.content)
}

export function fmtDate(iso?: string | null, month: "long" | "short" = "long"): string {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month, year: "numeric", timeZone: "Europe/Paris" })
}

export function pubImage(p: PublicationFull): string | null {
  return p.cover_image || (p.slides && p.slides[0]) || null
}
