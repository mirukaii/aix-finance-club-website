import { createClient } from "@supabase/supabase-js"

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

export function stripHtml(html?: string | null, max = 150) {
  if (!html) return ""
  const text = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text
}

export function formatDateFr(iso?: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" })
}

export type PublicationItem = {
  id: string
  title: string
  excerpt: string
  category: string | null
  type: string | null
  read_time: string | null
  date: string | null
  image: string | null
}

export type EventItem = {
  id: string
  title: string
  date: string
  time: string | null
  location: string | null
  image: string | null
}

export type PartnerItem = {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
}

export async function getLatestPublications(limit = 3): Promise<PublicationItem[]> {
  try {
    const supabase = db()
    if (!supabase) return []
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(limit)
    if (error || !data) return []
    return data.map((p: any) => ({
      id: String(p.id),
      title: p.title || "",
      excerpt: stripHtml(p.description || p.content),
      category: p.category || null,
      type: p.type || null,
      read_time: p.read_time ? String(p.read_time) : null,
      date: p.published_at || p.created_at || null,
      image:
        p.cover_image || p.cover_image_url || p.cover_url || p.image_url || p.image ||
        (Array.isArray(p.images) && p.images[0]) ||
        (Array.isArray(p.slides) && p.slides[0]) ||
        null,
    }))
  } catch {
    return []
  }
}

export async function getUpcomingEvents(limit = 3): Promise<EventItem[]> {
  try {
    const supabase = db()
    if (!supabase) return []
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("date", start.toISOString())
      .order("date", { ascending: true })
      .limit(limit)
    if (error || !data) return []
    return data.map((e: any) => ({
      id: String(e.id),
      title: e.title || "",
      date: e.date,
      time: e.time || null,
      location: e.location || null,
      image: e.image_url || null,
    }))
  } catch {
    return []
  }
}

export async function getPartners(): Promise<PartnerItem[]> {
  try {
    const supabase = db()
    if (!supabase) return []
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("display_order", { ascending: true })
    if (error || !data) return []
    return data.map((p: any) => ({
      id: String(p.id),
      name: p.name || "",
      logo_url: p.logo_url || null,
      website_url: p.website_url || null,
    }))
  } catch {
    return []
  }
}

export async function getOpenPositionsCount(): Promise<number> {
  try {
    const supabase = db()
    if (!supabase) return 0
    const { count, error } = await supabase
      .from("job_positions")
      .select("id", { count: "exact", head: true })
      .eq("is_open", true)
    if (error) return 0
    return count ?? 0
  } catch {
    return 0
  }
}
