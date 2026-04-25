import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ArticleView } from "@/components/publications/article-view"
import { CarouselView } from "@/components/publications/carousel-view"

export const revalidate = 60

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: publication } = await supabase
    .from("publications")
    .select("title, description")
    .eq("id", id)
    .single()

  if (!publication) {
    return {
      title: "Publication non trouvée | Aix Finance Club",
    }
  }

  return {
    title: `${publication.title} | Aix Finance Club`,
    description: publication.description || "Publication du Aix Finance Club",
  }
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: publication } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .single()

  if (!publication) {
    notFound()
  }

  // Determine if this is a carousel or article
  const isCarousel = publication.type === "carousel" || 
    (publication.slides && publication.slides.length > 0 && !publication.content)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {isCarousel ? (
          <CarouselView publication={publication} />
        ) : (
          <ArticleView publication={publication} />
        )}
      </main>
      <Footer />
    </>
  )
}
