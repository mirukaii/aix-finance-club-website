'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, ArrowUpRight, ChevronLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Event {
  id: string
  title: string
  description: string | null
  date: string
  time: string | null
  location: string | null
  image_url: string | null
  ticket_url: string | null
  category: string | null
  status: string
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [paramId, setParamId] = useState<string>('')

  useEffect(() => {
    (async () => {
      const resolvedParams = await params
      setParamId(resolvedParams.id)
    })()
  }, [params])

  useEffect(() => {
    if (!paramId) return

    async function fetchEvent() {
      const supabase = createClient()
      const { data } = await supabase.from('events').select('*').eq('id', paramId).single()

      if (data) {
        setEvent(data)
      } else {
        notFound()
      }
      setLoading(false)
    }

    fetchEvent()
  }, [paramId])

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Chargement de l'événement...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!event) {
    return notFound()
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  })

  return (
    <>
      <Navigation />
      <main>
        {/* Back Link */}
        <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/evenements" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium">
              <ChevronLeft className="h-4 w-4" />
              Retour aux événements
            </Link>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden bg-secondary/30">
          {event.image_url && (
            <div className="absolute inset-0 z-0">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          )}

          {!event.image_url && <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />}

          {/* Content */}
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
            <div className="w-full max-w-6xl mx-auto">
              {event.category && (
                <div className="mb-4 sm:mb-6">
                  <span className="inline-block px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-semibold rounded-full">
                    {event.category}
                  </span>
                </div>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {event.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {event.description && (
                <div className="prose-article mb-12 animate-fade-in-up">
                  {/* Render HTML description */}
                  <div dangerouslySetInnerHTML={{ __html: event.description }} />
                </div>
              )}

              {!event.description && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucune description disponible pour cet événement.</p>
                </div>
              )}
            </div>

            {/* Sticky Info Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-secondary/50 backdrop-blur rounded-xl p-6 sm:p-8 border border-border/50 animate-fade-in-up">
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">Informations pratiques</h2>

                {/* Date */}
                <div className="mb-6 pb-6 border-b border-border/50">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">Date</div>
                      <div className="text-foreground font-medium">{formattedDate}</div>
                    </div>
                  </div>
                </div>

                {/* Time */}
                {event.time && (
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">Heure</div>
                        <div className="text-foreground font-medium">{event.time}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                {event.location && (
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">Lieu</div>
                        <div className="text-foreground font-medium">{event.location}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {event.ticket_url && (
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  >
                    <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">
                      Réserver ma place
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                )}

                {!event.ticket_url && (
                  <div className="w-full p-4 bg-accent/10 border border-accent/20 rounded-lg text-center">
                    <p className="text-accent font-semibold">Entrée libre</p>
                  </div>
                )}

                {/* Event Status */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'upcoming'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {event.status === 'upcoming' ? 'À venir' : 'Passé'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Events */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-t border-border/50">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Autres événements</h2>
              <Link href="/evenements" className="text-accent hover:text-accent/80 transition-colors font-medium flex items-center gap-2">
                Tous les événements
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="text-center py-12 text-muted-foreground">
              <p>Consultez notre page d'événements pour découvrir nos autres activités.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
