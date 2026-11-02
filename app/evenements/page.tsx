import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { PastEvents } from "@/components/past-events"
import { getAllEvents, formatDateFr, stripHtml } from "@/lib/public-data"

export const revalidate = 60

export const metadata = {
  title: "Événements | Aix Finance Club",
  description: "Conférences, networking et rencontres avec des professionnels de la finance organisés par Aix Finance Club à Aix-en-Provence.",
}

const LINKEDIN_URL = "https://www.linkedin.com/company/aix-finance-club"
const INSTAGRAM_URL = "https://instagram.com/aixfinanceclub"

export default async function EvenementsPage() {
  const events = await getAllEvents()
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  const upcoming = events.filter((e) => new Date(e.date) >= start)
  const past = events
    .filter((e) => new Date(e.date) < start)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const [nextEvent, ...later] = upcoming
  const excerpt = nextEvent ? stripHtml(nextEvent.description, 260) : ""

  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <PageHeader label="Événements" title="Nos événements" intro="Conférences, networking et rencontres avec des professionnels de la finance." />

        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="border-b border-[#141414] pb-3">
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Prochain événement</h2>
            </div>

            {nextEvent ? (
              <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-12 lg:gap-12">
                <Link href={`/evenements/${nextEvent.id}`} className="relative block aspect-[4/3] overflow-hidden bg-[#e8e4da] lg:col-span-7">
                  {nextEvent.image_url && <img src={nextEvent.image_url} alt={nextEvent.title} decoding="async" className="absolute inset-0 h-full w-full object-contain" />}
                </Link>
                <div className="flex flex-col justify-end lg:col-span-5">
                  <p className="font-serif text-2xl sm:text-3xl">{formatDateFr(nextEvent.date)}{nextEvent.time ? `, ${nextEvent.time}` : ""}</p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{nextEvent.title}</h3>
                  {nextEvent.location && <p className="mt-3 text-sm text-[#6b6b66]">{nextEvent.location}</p>}
                  {excerpt && <p className="mt-5 leading-relaxed text-[#4a4a46]">{excerpt}</p>}
                  <div className="mt-8 flex flex-wrap gap-4">
                    {nextEvent.ticket_url && <Link href={nextEvent.ticket_url} target="_blank" rel="noopener noreferrer" className="bg-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-[#f6f4ef] transition-colors hover:bg-[#2a2a2a]">Réserver ma place</Link>}
                    <Link href={`/evenements/${nextEvent.id}`} className="border border-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Voir les détails</Link>
                  </div>
                </div>
              </div>
            ) : (
              <p className="py-10 text-[#4a4a46]">
                Aucun événement n&apos;est programmé pour le moment. Suivez-nous sur <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</Link> et <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Instagram</Link> pour connaître les prochaines dates.
              </p>
            )}
          </div>
        </section>

        {later.length > 0 && (
          <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
            <div className="mx-auto max-w-[1400px]">
              <div className="border-b border-[#141414] pb-3">
                <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Autres événements à venir</h2>
              </div>
              <ul>
                {later.map((e) => (
                  <li key={e.id} className="grid grid-cols-12 items-center gap-4 border-b border-[#dcd8cf] py-6 sm:py-8">
                    <Link href={`/evenements/${e.id}`} className="group col-span-12 grid grid-cols-1 gap-2 sm:col-span-9 sm:grid-cols-9 sm:gap-4">
                      <div className="sm:col-span-4">
                        <p className="font-serif text-2xl">{formatDateFr(e.date)}</p>
                        {e.time && <p className="mt-1 text-sm text-[#6b6b66]">{e.time}</p>}
                      </div>
                      <div className="sm:col-span-5">
                        <h3 className="font-serif text-xl decoration-[#141414]/30 underline-offset-4 group-hover:underline sm:text-2xl">{e.title}</h3>
                        {e.location && <p className="mt-1 text-sm text-[#6b6b66]">{e.location}</p>}
                      </div>
                    </Link>
                    <div className="col-span-12 sm:col-span-3 sm:text-right">
                      {e.ticket_url && <Link href={e.ticket_url} target="_blank" rel="noopener noreferrer" className="inline-block border border-[#141414] px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Réserver</Link>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
            <div className="mx-auto max-w-[1400px]">
              <div className="border-b border-[#141414] pb-3">
                <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Événements passés</h2>
              </div>
              <PastEvents events={past.map((e) => ({ id: e.id, title: e.title, date: e.date, location: e.location, image_url: e.image_url, category: e.category }))} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
