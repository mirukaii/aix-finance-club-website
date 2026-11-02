import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import CandidaturesClient from "@/components/candidatures-client"
import { getOpenPositions, getActiveSlots } from "@/lib/public-data"

export const revalidate = 60

export const metadata = {
  title: "Candidatures | Aix Finance Club",
  description: "Rejoignez le bureau d'Aix Finance Club : postes ouverts, créneaux d'entretien et formulaire de candidature.",
}

const STEPS = [
  { n: "01", title: "Candidature", text: "Dépôt des candidatures via le formulaire ci-dessous.", status: "En cours" },
  { n: "02", title: "Entretien", text: "Échange avec le bureau pour mieux vous connaître.", status: "À venir" },
  { n: "03", title: "Intégration", text: "Bienvenue dans l'équipe Aix Finance Club !", status: "À venir" },
]

export default async function CandidaturesPage() {
  const [positions, slots] = await Promise.all([getOpenPositions(), getActiveSlots()])
  const departments = Array.from(new Set(positions.map((p) => p.department)))

  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <PageHeader label={positions.length > 0 ? "Candidatures ouvertes" : "Candidatures"} title="Rejoindre Aix Finance Club" intro="Vous êtes passionné par la finance et souhaitez développer vos compétences au sein d'une association d'excellence ?" />

        {positions.length > 0 && (
          <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
            <div className="mx-auto max-w-[1400px]">
              <div className="border-b border-[#141414] pb-3">
                <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Postes à pourvoir</h2>
              </div>
              {departments.map((dept) => (
                <div key={dept} className="grid grid-cols-1 gap-6 border-b border-[#dcd8cf] py-10 lg:grid-cols-12 lg:gap-12">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66] lg:col-span-3">{dept}</p>
                  <div className="space-y-8 lg:col-span-9">
                    {positions.filter((p) => p.department === dept).map((p) => (
                      <div key={p.id}>
                        <h3 className="font-serif text-2xl">{p.title}</h3>
                        {p.description && <p className="mt-2 leading-relaxed text-[#4a4a46]">{p.description}</p>}
                        {p.responsibilities && <p className="mt-2 text-sm leading-relaxed text-[#6b6b66]">{p.responsibilities}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {slots.length > 0 && (
          <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
            <div className="mx-auto max-w-[1400px]">
              <div className="border-b border-[#141414] pb-3">
                <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Créneaux d&apos;entretien</h2>
              </div>
              <p className="mt-4 text-[#4a4a46]">Choisissez votre disponibilité dans le formulaire ci-dessous.</p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {slots.map((s) => (
                  <li key={s.id} className="border border-[#dcd8cf] bg-white px-5 py-4">{s.label}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Informations pratiques</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">Déroulement des entretiens</h2>
              <dl className="mt-8 divide-y divide-[#dcd8cf] border-y border-[#dcd8cf]">
                <div className="py-5">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Dress code</dt>
                  <dd className="mt-1">Tenue professionnelle exigée</dd>
                </div>
                <div className="py-5">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Lieu des entretiens</dt>
                  <dd className="mt-1">Salle des Actes, Campus de la Pauliane, Faculté d&apos;Économie et de Gestion (FEG)</dd>
                </div>
                <div className="py-5">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Comment candidater</dt>
                  <dd className="mt-1">Remplissez le formulaire : votre messagerie s&apos;ouvre avec vos informations. N&apos;oubliez pas de joindre votre CV en PDF.</dd>
                </div>
              </dl>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4da] lg:col-span-6">
              <Image src="/images/salle-des-actes.jpg" alt="Salle des Actes, FEG Pauliane" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="border-b border-[#141414] pb-3">
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Processus de recrutement</h2>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map((s) => (
                <div key={s.n} className="border-t border-[#dcd8cf] pt-6">
                  <p className="text-xs tracking-[0.2em] text-[#6b6b66]">{s.n}</p>
                  <h3 className="mt-3 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a4a46]">{s.text}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em]">{s.status}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CandidaturesClient positions={positions} slots={slots} />
      </main>
      <Footer />
    </>
  )
}
