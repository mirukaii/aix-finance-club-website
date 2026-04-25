import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { PublicationsHero } from "@/components/publications/publications-hero"
import { PublicationsFilters } from "@/components/publications/publications-filters"

export const metadata = {
  title: "Publications | Aix Finance Club",
  description: "Articles d'analyse et Focus visuels sur les marchés financiers par Aix Finance Club.",
}

export const revalidate = 60

export default async function PublicationsPage() {
  const supabase = await createClient()
  
  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .order("published_at", { ascending: false })

  const pubs = publications || []

  // Extract unique categories for filters
  const categories = Array.from(new Set(pubs.map((p) => p.category).filter(Boolean))) as string[]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section with Featured Article */}
        <PublicationsHero publications={pubs} />
        
        {/* Publications Grid with Filters */}
        <PublicationsFilters publications={pubs} categories={categories} />
      </main>
      <Footer />
    </>
  )
}
