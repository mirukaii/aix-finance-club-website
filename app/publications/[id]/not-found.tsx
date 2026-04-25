import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { FileX, ArrowLeft } from "lucide-react"

export default function PublicationNotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-8 flex items-center justify-center">
            <FileX className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-foreground mb-4">
            Publication introuvable
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {"Cette publication n'existe pas ou a été supprimée."}
          </p>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux publications
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
