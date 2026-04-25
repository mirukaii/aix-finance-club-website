import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8">
            <div className="text-6xl font-serif font-bold text-accent mb-4">404</div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">Événement non trouvé</h1>
            <p className="text-lg text-muted-foreground mb-8">
              L'événement que vous recherchez n'existe pas ou a été supprimé.
            </p>
          </div>

          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux événements
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
