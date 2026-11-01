import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  getLatestPublications,
  getUpcomingEvents,
  getPartners,
  getOpenPositionsCount,
  formatDateFr,
} from "@/lib/public-data"

export const revalidate = 300

const PUB_DETAIL = true
const EVT_DETAIL = true

const LINKEDIN_URL = "https://www.linkedin.com/company/aix-finance-club"
const INSTAGRAM_URL = "https://instagram.com/aixfinanceclub"

// À vérifier avant mise en ligne : ces chiffres viennent de ton CV
const FACTS = [
  { value: "2025", label: "Année de fondation" },
  { value: "300+", label: "Participants à notre conférence avec Jokariz" },
  { value: "BNP Paribas", label: "Partenaire stratégique" },
]

function SectionHeader({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <div className="flex items-end justify-between border-b border-[#141414] pb-3">
      <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">{title}</h2>
      <Link href={href} className="text-xs uppercase tracking-[0.15em] text-[#141414] transition-colors hover:text-accent">{cta} →</Link>
    </div>
  )
}

export default async function HomePage() {
  const [publications, events, partners, openPositions] = await Promise.all([
    getLatestPublications(3),
    getUpcomingEvents(3),
    getPartners(),
    getOpenPositionsCount(),
  ])

  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <section className="px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Association étudiante · Université d&apos;Aix-Marseille</p>
            <h1 className="max-w-[20ch] font-serif text-[clamp(2.4rem,6.5vw,6rem)] font-normal leading-[1.04] tracking-tight">
              L&apos;association de finance de référence à Aix-en-Provence.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4a4a46] sm:text-lg">
              Formation, networking et excellence autour des métiers de la finance.
            </p>
          </div>
        </section>

        <section className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8e4da] sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image src="/images/img-5043.jpg" alt="Intervenant lors d'une conférence d'Aix Finance Club" fill priority sizes="(min-width: 1400px) 1400px, 100vw" className="object-cover object-center" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.15em] text-[#6b6b66]">
              <span>Conférences · Ateliers · Publications</span>
              <Link href="/a-propos" className="text-[#141414] underline decoration-[#141414]/30 underline-offset-4 hover:decoration-[#141414]">Découvrir le club</Link>
            </div>
          </div>
        </section>

        <section className="mt-16 px-5 sm:mt-24 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 border-t border-[#dcd8cf] sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label} className="border-b border-[#dcd8cf] py-6 sm:border-b-0 sm:py-8 sm:pr-8">
                <p className="font-serif text-3xl sm:text-4xl">{f.value}</p>
                <p className="mt-2 text-sm text-[#6b6b66]">{f.label}</p>
              </div>
            ))}
          </div>
        </section>

        {publications.length > 0 && (
          <section className="mt-20 px-5 sm:mt-32 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1400px]">
              <SectionHeader title="Publications" href="/publications" cta="Toutes les publications" />
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
                {publications.map((p) => {
                  const label = [p.category, p.type === "carousel" ? "Carousel" : null].filter(Boolean).join(" · ")
                  const meta = [formatDateFr(p.date), p.read_time].filter(Boolean).join(" · ")
                  return (
                    <Link key={p.id} href={PUB_DETAIL ? `/publications/${p.id}` : "/publications"} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4da]">
                        {p.image && <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />}
                      </div>
                      <div className="mt-4">
                        {label && <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{label}</p>}
                        <h3 className="mt-2 font-serif text-xl leading-snug decoration-[#141414]/30 underline-offset-4 group-hover:underline sm:text-2xl">{p.title}</h3>
                        {p.excerpt && <p className="mt-2 line-clamp-2 text-sm text-[#4a4a46]">{p.excerpt}</p>}
                        {meta && <p className="mt-3 text-xs text-[#6b6b66]">{meta}</p>}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        <section className="mt-20 px-5 sm:mt-32 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Prochains événements" href="/evenements" cta="Tous les événements" />
            {events.length > 0 ? (
              <ul>
                {events.map((e) => (
                  <li key={e.id} className="border-b border-[#dcd8cf]">
                    <Link href={EVT_DETAIL ? `/evenements/${e.id}` : "/evenements"} className="group grid grid-cols-12 items-center gap-4 py-6 sm:py-8">
                      <div className="col-span-12 sm:col-span-3">
                        <p className="font-serif text-2xl sm:text-3xl">{formatDateFr(e.date)}</p>
                        {e.time && <p className="mt-1 text-sm text-[#6b6b66]">{e.time}</p>}
                      </div>
                      <div className="col-span-12 sm:col-span-7">
                        <h3 className="font-serif text-xl decoration-[#141414]/30 underline-offset-4 group-hover:underline sm:text-2xl">{e.title}</h3>
                        {e.location && <p className="mt-1 text-sm text-[#6b6b66]">{e.location}</p>}
                      </div>
                      <div className="col-span-2 hidden text-right text-xs uppercase tracking-[0.15em] sm:block">Détails →</div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-10 text-[#4a4a46]">
                Aucun événement n&apos;est programmé pour le moment. Suivez-nous sur <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</Link> et <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Instagram</Link> pour connaître les prochaines dates.
              </p>
            )}
          </div>
        </section>

        {partners.length > 0 && (
          <section className="mt-20 px-5 sm:mt-32 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1400px]">
              <SectionHeader title="Partenaires" href="/partenaires" cta="Voir les partenaires" />
              <div className="mt-10 flex flex-wrap items-center gap-x-14 gap-y-8">
                {partners.map((pt) =>
                  pt.logo_url ? (
                    <img key={pt.id} src={pt.logo_url} alt={pt.name} loading="lazy" decoding="async" className="h-8 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-10" />
                  ) : (
                    <span key={pt.id} className="text-sm uppercase tracking-[0.2em] text-[#6b6b66]">{pt.name}</span>
                  )
                )}
              </div>
            </div>
          </section>
        )}

        <section className="mt-20 bg-[#141414] px-5 py-20 text-[#f6f4ef] sm:mt-32 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[#f6f4ef]/60">Rejoindre le bureau</p>
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">Rejoignez l&apos;équipe qui fait vivre Aix Finance Club.</h2>
              {openPositions > 0 && (
                <p className="mt-5 text-[#f6f4ef]/70">
                  {openPositions} poste{openPositions > 1 ? "s" : ""} ouvert{openPositions > 1 ? "s" : ""} au bureau.
                </p>
              )}
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href="/candidatures" className="inline-block border border-[#f6f4ef] px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#f6f4ef] hover:text-[#141414]">Voir les postes</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
