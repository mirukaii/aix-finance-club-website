import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function MentionsLegalesPage() {
  return (
    <>
      <Navigation />
      <main className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-12">Mentions légales</h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Éditeur du site</h2>
              <p>Aix Finance Club</p>
              <p>Association étudiante loi 1901</p>
              <p>Université d'Aix-Marseille</p>
              <p>Campus Pauliane, Aix-en-Provence</p>
              <p>Email: aixfinanceclub@gmail.com</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Hébergement</h2>
              <p>Ce site est hébergé par Vercel Inc.</p>
              <p>340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos) est la propriété exclusive d'Aix Finance Club,
                sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
