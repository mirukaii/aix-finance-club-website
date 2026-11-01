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

const INITIATIVES = [
  { n: "01", title: "Événements", text: "Conférences, networking et rencontres avec des professionnels de la finance." },
  { n: "02", title: "Formations & Ateliers", text: "Sessions de formation technique et développement des compétences financières." },
  { n: "03", title: "Publications & Veille", text: "Analyses de marchés, articles macro-économiques et veille sectorielle." },
]

function SectionHeader({ title, href, cta }: { title: string; href?: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between border-b border-[#141414] pb-3">
      <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">{title}</h2>
      {href && cta && <Link href={href} className="text-xs uppercase tracking-[0.15em] text-[#141414] transition-colors hover:text-accent">{cta} →</Link>}
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

  const loop = partners.length > 0 ? Array.from({ length: Math.max(2, Math.ceil(10 / partners.length)) }).flatMap(() => partners) : []

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
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/a-propos" className="border border-[#141414] bg-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-[#f6f4ef] transition-colors hover:bg-transparent hover:text-[#141414]">Découvrir le club</Link>
              <Link href="/evenements" className="border border-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Nos événements</Link>
            </div>
          </div>
        </section>

        <section className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4da] sm:aspect-[5/4]">
              <Image src="/images/img-5043.jpg" alt="Intervenant lors d'une conférence d'Aix Finance Club" fill priority sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-center" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e4da] sm:aspect-[5/4]">
              <Image src="/images/img-5023.jpg" alt="Étudiants lors d'une conférence d'Aix Finance Club" fill priority sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-center" />
            </div>
          </div>
        </section>

        {loop.length > 0 && (
          <section className="mt-16 border-y border-[#dcd8cf] py-10 sm:mt-24 sm:py-14">
            <div className="mx-auto mb-8 flex max-w-[1400px] items-end justify-between px-5 sm:px-8 lg:px-12">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Nos partenaires</p>
              <Link href="/partenaires" className="text-xs uppercase tracking-[0.15em] transition-colors hover:text-accent">Voir les partenaires →</Link>
            </div>
            <div className="overflow-hidden">
              <div className="afc-marquee items-center">
                {[...loop, ...loop].map((pt, i) => (
                  <Link key={`${pt.id}-${i}`} href="/partenaires" className="mx-8 shrink-0 sm:mx-14" aria-label={pt.name}>
                    {pt.logo_url ? <img src={pt.logo_url} alt={pt.name} loading="lazy" decoding="async" className="h-12 w-auto object-contain sm:h-16" /> : <span className="font-serif text-2xl">{pt.name}</span>}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-[1400px] px-5 sm:px-8 lg:px-12">
              <Link href="/contact" className="text-xs uppercase tracking-[0.15em] underline decoration-[#141414]/30 underline-offset-4 hover:decoration-[#141414]">Devenir partenaire →</Link>
            </div>
          </section>
        )}

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

        <section className="mt-20 px-5 sm:mt-32 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader title="Nos initiatives" />
            <p className="mt-4 max-w-2xl text-[#4a4a46]">Des activités pensées pour développer vos compétences et élargir votre réseau professionnel.</p>
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {INITIATIVES.map((it) => (
                <div key={it.n} className="border-t border-[#dcd8cf] pt-6">
                  <p className="text-xs tracking-[0.2em] text-[#6b6b66]">{it.n}</p>
                  <h3 className="mt-3 font-serif text-2xl">{it.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a4a46]">{it.text}</p>
                </div>
              ))}
            </div>
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
            <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
              <Link href="/candidatures" className="inline-block border border-[#f6f4ef] px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#f6f4ef] hover:text-[#141414]">Voir les postes</Link>
              <Link href="/a-propos" className="inline-block border border-[#f6f4ef]/40 px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors hover:border-[#f6f4ef]">En savoir plus</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
