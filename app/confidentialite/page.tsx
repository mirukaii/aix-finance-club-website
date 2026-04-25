import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Database, FileCheck, Clock, UserCheck } from "lucide-react"

export default function ConfidentialitePage() {
  const sections = [
    {
      icon: Database,
      title: "Collecte des donnees",
      subtitle: "Donnees personnelles",
      content: "Aix Finance Club collecte uniquement les donnees personnelles necessaires au traitement des candidatures et a la communication avec nos membres et partenaires."
    },
    {
      icon: FileCheck,
      title: "Utilisation des donnees",
      subtitle: "Finalites du traitement",
      content: null,
      list: [
        "Le traitement des candidatures",
        "La communication d'informations relatives aux evenements et activites du club",
        "L'amelioration de nos services"
      ]
    },
    {
      icon: Clock,
      title: "Conservation des donnees",
      subtitle: "Duree de retention",
      content: "Les donnees personnelles sont conservees pendant la duree necessaire aux finalites pour lesquelles elles ont ete collectees, conformement a la reglementation en vigueur (RGPD)."
    },
    {
      icon: UserCheck,
      title: "Vos droits",
      subtitle: "Conformite RGPD",
      content: "Conformement au RGPD, vous disposez d'un droit d'acces, de rectification, de suppression et de portabilite de vos donnees."
    }
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="min-h-[35vh] sm:min-h-[40vh] flex items-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] pt-24 sm:pt-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-[40vw] max-w-[400px] h-[40vw] max-h-[400px] bg-accent/[0.02] rounded-full blur-[100px]" />
          </div>
          
          <div className="w-full max-w-5xl mx-auto py-12 sm:py-16 relative z-10">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
              Protection des donnees
            </span>
            <h1 className="font-serif font-medium text-white mb-5 sm:mb-6">
              Politique de confidentialite
            </h1>
            <p className="text-base sm:text-lg text-white/40 leading-relaxed max-w-2xl font-light">
              Comment nous collectons, utilisons et protegeons vos donnees personnelles.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
          <div className="w-full max-w-4xl mx-auto">
            <div className="space-y-8 sm:space-y-12">
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <div key={index} className="p-6 sm:p-10 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">{section.title}</h2>
                        <p className="text-sm text-white/40">{section.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-[15px] text-white/60 leading-relaxed pl-0 sm:pl-[68px]">
                      {section.content && <p>{section.content}</p>}
                      {section.list && (
                        <>
                          <p className="mb-4">Les donnees collectees sont utilisees exclusivement pour :</p>
                          <ul className="space-y-3">
                            {section.list.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Contact CTA */}
              <div className="p-6 sm:p-10 rounded-xl sm:rounded-2xl bg-accent/5 border border-accent/20 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Exercer vos droits</h3>
                <p className="text-[15px] text-white/60 mb-6 max-w-lg mx-auto">
                  Pour exercer vos droits d&apos;acces, de rectification, de suppression ou de portabilite, contactez-nous a :
                </p>
                <a 
                  href="mailto:aixfinanceclub@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  aixfinanceclub@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
