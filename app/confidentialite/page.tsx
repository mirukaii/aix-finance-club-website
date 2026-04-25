import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ConfidentialitePage() {
  return (
    <>
      <Navigation />
      <main className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-12">Politique de confidentialité</h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Collecte des données</h2>
              <p>
                Aix Finance Club collecte uniquement les données personnelles nécessaires au traitement des candidatures
                et à la communication avec nos membres et partenaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Utilisation des données</h2>
              <p>Les données collectées sont utilisées exclusivement pour:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Le traitement des candidatures</li>
                <li>La communication d'informations relatives aux événements et activités du club</li>
                <li>L'amélioration de nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Conservation des données</h2>
              <p>
                Les données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles
                ont été collectées, conformément à la réglementation en vigueur (RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de
                portabilité de vos données. Pour exercer ces droits, contactez-nous à aixfinanceclub@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
