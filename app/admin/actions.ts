"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { sanitizeHtmlContent } from "@/lib/security/sanitize"

// Simple password-based admin auth - no rate limiting for now
export async function adminLogin(password: string) {
  // Simple password check against env variable (server-side only)
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Mot de passe incorrect" }
  }

  // Create session cookie
  const cookieStore = await cookies()
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })

  return { success: true }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  return { success: true }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get("admin_session")?.value === "authenticated"
}

// ---------- EVENTS CRUD ----------

export async function getEvents() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false })

  if (error) return { error: error.message, data: null }
  return { data, error: null }
}

export async function createEvent(formData: FormData) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  // Sanitize description to prevent XSS
  const description = formData.get("description") as string
  const sanitizedDescription = description ? sanitizeHtmlContent(description) : null

  const supabase = await createClient()
  const { error } = await supabase.from("events").insert({
    title: formData.get("title") as string,
    description: sanitizedDescription,
    date: formData.get("date") as string,
    time: (formData.get("time") as string) || null,
    location: (formData.get("location") as string) || null,
    category: (formData.get("category") as string) || null,
    image_url: (formData.get("image_url") as string) || null,
    ticket_url: (formData.get("ticket_url") as string) || null,
    status: (formData.get("status") as string) || "upcoming",
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function updateEvent(id: string, formData: FormData) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  // Sanitize description to prevent XSS
  const description = formData.get("description") as string
  const sanitizedDescription = description ? sanitizeHtmlContent(description) : null

  const supabase = await createClient()
  const { error } = await supabase
    .from("events")
    .update({
      title: formData.get("title") as string,
      description: sanitizedDescription,
      date: formData.get("date") as string,
      time: (formData.get("time") as string) || null,
      location: (formData.get("location") as string) || null,
      category: (formData.get("category") as string) || null,
      image_url: (formData.get("image_url") as string) || null,
      ticket_url: (formData.get("ticket_url") as string) || null,
      status: (formData.get("status") as string) || "upcoming",
    })
    .eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}

export async function deleteEvent(id: string) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase.from("events").delete().eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}

// ---------- PUBLICATIONS CRUD ----------

export async function getPublications() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .order("published_at", { ascending: false })

  if (error) return { error: error.message, data: null }
  return { data, error: null }
}

export async function createPublication(formData: FormData) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const slidesRaw = formData.get("slides") as string
  let slides: string[] = []
  try {
    slides = JSON.parse(slidesRaw)
  } catch {
    slides = slidesRaw.split("\n").map(s => s.trim()).filter(Boolean)
  }

  const tagsRaw = formData.get("tags") as string
  let tags: string[] = []
  try {
    tags = JSON.parse(tagsRaw)
  } catch {
    tags = tagsRaw ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean) : []
  }

  // Sanitize HTML content to prevent XSS
  const content = formData.get("content") as string
  const sanitizedContent = content ? sanitizeHtmlContent(content) : null

  const supabase = await createClient()
  const { error } = await supabase.from("publications").insert({
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    type: formData.get("type") as string || "carousel",
    category: (formData.get("category") as string) || null,
    author: (formData.get("author") as string) || null,
    read_time: (formData.get("read_time") as string) || null,
    content: sanitizedContent,
    cover_image: (formData.get("cover_image") as string) || null,
    slides,
    tags,
    published_at: formData.get("published_at") as string || new Date().toISOString().split("T")[0],
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function updatePublication(id: string, formData: FormData) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const slidesRaw = formData.get("slides") as string
  let slides: string[] = []
  try {
    slides = JSON.parse(slidesRaw)
  } catch {
    slides = slidesRaw.split("\n").map(s => s.trim()).filter(Boolean)
  }

  const tagsRaw = formData.get("tags") as string
  let tags: string[] = []
  try {
    tags = JSON.parse(tagsRaw)
  } catch {
    tags = tagsRaw ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean) : []
  }

  // Sanitize HTML content to prevent XSS
  const content = formData.get("content") as string
  const sanitizedContent = content ? sanitizeHtmlContent(content) : null

  const supabase = await createClient()
  const { error } = await supabase
    .from("publications")
    .update({
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      type: formData.get("type") as string || "carousel",
      category: (formData.get("category") as string) || null,
      author: (formData.get("author") as string) || null,
      read_time: (formData.get("read_time") as string) || null,
      content: sanitizedContent,
      cover_image: (formData.get("cover_image") as string) || null,
      slides,
      tags,
      published_at: formData.get("published_at") as string,
    })
    .eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}

export async function deletePublication(id: string) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase.from("publications").delete().eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}

// ---------- PARTNERS CRUD ----------

export async function getPartners() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("display_order", { ascending: true })

  if (error) return { error: error.message, data: null }
  return { data, error: null }
}

export async function createPartner(formData: FormData) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase.from("partners").insert({
    name: formData.get("name") as string,
    logo_url: (formData.get("logo_url") as string) || null,
    description: (formData.get("description") as string) || null,
    website_url: (formData.get("website_url") as string) || null,
    display_order: parseInt(formData.get("display_order") as string) || 0,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function updatePartner(id: string, formData: FormData) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase
    .from("partners")
    .update({
      name: formData.get("name") as string,
      logo_url: (formData.get("logo_url") as string) || null,
      description: (formData.get("description") as string) || null,
      website_url: (formData.get("website_url") as string) || null,
      display_order: parseInt(formData.get("display_order") as string) || 0,
    })
    .eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}

export async function deletePartner(id: string) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase.from("partners").delete().eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}

// ---------- PAGE CONTENT CRUD ----------

export async function getPageContent(pageName: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("page_content")
    .select("*")
    .eq("page_name", pageName)
    .single()

  if (error) return { error: error.message, data: null }
  return { data, error: null }
}

export async function updatePageContent(id: string, content: Record<string, any>) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase
    .from("page_content")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}

// ---------- TEAM MEMBERS CRUD ----------

export async function getTeamMembers() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true })

  if (error) return { error: error.message, data: null }
  return { data, error: null }
}

export async function createTeamMember(formData: FormData) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase.from("team_members").insert({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    role: formData.get("role") as string,
    photo_url: (formData.get("photo_url") as string) || null,
    linkedin_url: (formData.get("linkedin_url") as string) || null,
    display_order: parseInt(formData.get("display_order") as string) || 0,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function updateTeamMember(id: string, formData: FormData) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase
    .from("team_members")
    .update({
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      role: formData.get("role") as string,
      photo_url: (formData.get("photo_url") as string) || null,
      linkedin_url: (formData.get("linkedin_url") as string) || null,
      display_order: parseInt(formData.get("display_order") as string) || 0,
    })
    .eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}

export async function deleteTeamMember(id: string) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) return { error: "Non autorisé" }

  const supabase = await createClient()
  const { error } = await supabase.from("team_members").delete().eq("id", id)

  if (error) return { error: error.message }
  return { success: true }
}
