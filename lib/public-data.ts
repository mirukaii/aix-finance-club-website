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

export type TeamMemberItem = {
  id: string
  first_name: string
  last_name: string
  role: string
  photo_url: string | null
  linkedin_url: string | null
  display_order: number
}

export async function getTeamMembers(): Promise<TeamMemberItem[]> {
  try {
    const supabase = db()
    if (!supabase) return []
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true })
    if (error || !data) return []
    return data.map((m: any) => ({
      id: String(m.id),
      first_name: m.first_name || "",
      last_name: m.last_name || "",
      role: m.role || "",
      photo_url: m.photo_url || null,
      linkedin_url: m.linkedin_url || null,
      display_order: Number(m.display_order) || 0,
    }))
  } catch {
    return []
  }
}

export type EventFull = {
  id: string
  title: string
  description: string | null
  date: string
  time: string | null
  location: string | null
  image_url: string | null
  ticket_url: string | null
  category: string | null
}

function mapEvent(e: any): EventFull {
  return {
    id: String(e.id),
    title: e.title || "",
    description: e.description || null,
    date: e.date,
    time: e.time || null,
    location: e.location || null,
    image_url: e.image_url || null,
    ticket_url: e.ticket_url || null,
    category: e.category || null,
  }
}

export async function getAllEvents(): Promise<EventFull[]> {
  try {
    const supabase = db()
    if (!supabase) return []
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })
    if (error || !data) return []
    return data.filter((e: any) => e.date).map(mapEvent)
  } catch {
    return []
  }
}

export async function getEventById(id: string): Promise<EventFull | null> {
  try {
    const supabase = db()
    if (!supabase) return null
    const { data, error } = await supabase.from("events").select("*").eq("id", id).maybeSingle()
    if (error || !data) return null
    return mapEvent(data)
  } catch {
    return null
  }
}

import type { PublicationFull } from "@/lib/pub-utils"

function mapPublication(p: any): PublicationFull {
  return {
    id: String(p.id),
    title: p.title || "",
    description: p.description || null,
    type: p.type || null,
    category: p.category || null,
    cover_image: p.cover_image || null,
    slides: Array.isArray(p.slides) ? p.slides.filter(Boolean) : null,
    content: p.content || null,
    author: p.author || null,
    read_time: p.read_time ? String(p.read_time) : null,
    published_at: p.published_at || p.created_at || null,
    tags: Array.isArray(p.tags) ? p.tags : null,
  }
}

export async function getAllPublications(): Promise<PublicationFull[]> {
  try {
    const supabase = db()
    if (!supabase) return []
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("published_at", { ascending: false, nullsFirst: false })
    if (error || !data) return []
    return data.map(mapPublication)
  } catch {
    return []
  }
}

export async function getPublicationById(id: string): Promise<PublicationFull | null> {
  try {
    const supabase = db()
    if (!supabase) return null
    const { data, error } = await supabase.from("publications").select("*").eq("id", id).maybeSingle()
    if (error || !data) return null
    return mapPublication(data)
  } catch {
    return null
  }
}
