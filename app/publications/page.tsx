import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PublicationsHero } from "@/components/publications/publications-hero"
import { PublicationsFilters } from "@/components/publications/publications-filters"
import { getAllPublications } from "@/lib/public-data"

export const metadata = {
  title: "Publications | Aix Finance Club",
  description: "Articles d'analyse et Focus visuels sur les marchés financiers par Aix Finance Club.",
}

export const revalidate = 60

export default async function PublicationsPage() {
  const pubs = await getAllPublications()
  const categories = Array.from(new Set(pubs.map((p) => p.category).filter((c): c is string => Boolean(c))))

  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <PublicationsHero publications={pubs} />
        <PublicationsFilters publications={pubs} categories={categories} />
      </main>
      <Footer />
    </>
  )
}
