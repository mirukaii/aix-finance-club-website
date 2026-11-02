import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArticleView } from "@/components/publications/article-view"
import { CarouselView } from "@/components/publications/carousel-view"
import { getPublicationById } from "@/lib/public-data"
import { isCarouselPub } from "@/lib/pub-utils"

export const revalidate = 60

type PageProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const p = await getPublicationById(id)
  if (!p) return { title: "Publication introuvable | Aix Finance Club" }
  const description = p.description || "Publication d'Aix Finance Club"
  const image = p.cover_image || (p.slides && p.slides[0]) || undefined
  return {
    title: `${p.title} | Aix Finance Club`,
    description,
    openGraph: { title: p.title, description, type: "article", images: image ? [image] : undefined },
  }
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { id } = await params
  const publication = await getPublicationById(id)
  if (!publication) notFound()

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#f6f4ef]">
        {isCarouselPub(publication) ? <CarouselView publication={publication} /> : <ArticleView publication={publication} />}
      </main>
      <Footer />
    </>
  )
}
