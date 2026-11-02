import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getEventById, stripHtml } from "@/lib/public-data"

export const revalidate = 60

type PageProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const event = await getEventById(id)
  if (!event) return { title: "Événement introuvable | Aix Finance Club" }
  return {
    title: `${event.title} | Aix Finance Club`,
    description: stripHtml(event.description, 160) || "Événement organisé par Aix Finance Club.",
  }
}

const dt = "text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]"

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params
  const event = await getEventById(id)
  if (!event) notFound()

  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const isPast = new Date(event.date) < start
  const longDate = new Date(event.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" })
  const label = [event.category, isPast ? "Événement passé" : "À venir"].filter(Boolean).join(" · ")

  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <section className="px-5 pb-10 pt-28 sm:px-8 sm:pt-36 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <Link href="/evenements" className="text-xs uppercase tracking-[0.15em] text-[#6b6b66] transition-colors hover:text-[#141414]">← Tous les événements</Link>
            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{label}</p>
            <h1 className="mt-4 max-w-[22ch] font-serif text-[clamp(2.2rem,5.5vw,5rem)] font-normal leading-[1.06] tracking-tight">{event.title}</h1>
          </div>
        </section>

        {event.image_url && (
          <section className="px-5 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1400px] bg-[#e8e4da]">
              <img src={event.image_url} alt={event.title} decoding="async" className="mx-auto block h-auto max-h-[75vh] w-auto max-w-full" />
            </div>
          </section>
        )}

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              {event.description ? (
                <div className="afc-prose max-w-[68ch]" dangerouslySetInnerHTML={{ __html: event.description }} />
              ) : (
                <p className="text-[#6b6b66]">Aucune description disponible pour cet événement.</p>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="border border-[#dcd8cf] bg-white p-6 sm:p-8 lg:sticky lg:top-28">
                <p className={dt}>Informations</p>
                <dl className="mt-6 divide-y divide-[#dcd8cf] border-y border-[#dcd8cf]">
                  <div className="py-4">
                    <dt className={dt}>Date</dt>
                    <dd className="mt-1 capitalize">{longDate}</dd>
                  </div>
                  {event.time && (
                    <div className="py-4">
                      <dt className={dt}>Heure</dt>
                      <dd className="mt-1">{event.time}</dd>
                    </div>
                  )}
                  {event.location && (
                    <div className="py-4">
                      <dt className={dt}>Lieu</dt>
                      <dd className="mt-1">{event.location}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-6">
                  {isPast ? (
                    <p className="text-sm text-[#6b6b66]">Cet événement a eu lieu.</p>
                  ) : event.ticket_url ? (
                    <Link href={event.ticket_url} target="_blank" rel="noopener noreferrer" className="block bg-[#141414] py-4 text-center text-xs uppercase tracking-[0.2em] text-[#f6f4ef] transition-colors hover:bg-[#2a2a2a]">Réserver ma place</Link>
                  ) : (
                    <p className="border border-[#dcd8cf] py-4 text-center text-xs uppercase tracking-[0.2em]">Entrée libre</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
