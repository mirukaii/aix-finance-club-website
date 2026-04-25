'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, ArrowUpRight, ArrowLeft } from 'lucide-react'
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
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/40">Chargement...</p>
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
      <main className="bg-[#0a0a0a]">
        {/* Hero Banner - Premium */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          {event.image_url && (
            <div className="absolute inset-0 z-0">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
              <div className="absolute inset-0 bg-[#0a0a0a]/30" />
            </div>
          )}

          {!event.image_url && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-[#0a0a0a]" />
          )}

          {/* Content */}
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 pt-32">
            <div className="w-full max-w-6xl mx-auto">
              {/* Back Link */}
              <Link
                href="/evenements"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Tous les evenements
              </Link>

              {event.category && (
                <div className="mb-6 sm:mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm text-accent text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full border border-accent/20">
                    {event.category}
                  </span>
                </div>
              )}
              
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8 sm:mb-10 leading-[1.1] max-w-4xl">
                {event.title}
              </h1>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.15em] mb-1">Date</div>
                    <div className="text-base sm:text-lg font-medium text-white capitalize">{formattedDate}</div>
                  </div>
                </div>

                {event.time && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.15em] mb-1">Heure</div>
                      <div className="text-base sm:text-lg font-medium text-white">{event.time}</div>
                    </div>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.15em] mb-1">Lieu</div>
                      <div className="text-base sm:text-lg font-medium text-white">{event.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section - Premium */}
        <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {event.description && (
                <div className="animate-fade-in-up">
                  <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-6 block">
                    A propos
                  </span>
                  <div 
                    className="prose-article text-white/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: event.description }} 
                  />
                </div>
              )}

              {!event.description && (
                <div className="text-center py-16">
                  <p className="text-white/40">Aucune description disponible pour cet evenement.</p>
                </div>
              )}
            </div>

            {/* Sticky Info Card - Premium */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white/[0.02] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/[0.06] animate-fade-in-up">
                <h2 className="font-serif text-xl font-medium text-white mb-8">Informations</h2>

                {/* Date */}
                <div className="mb-6 pb-6 border-b border-white/[0.06]">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">Date</div>
                      <div className="text-white font-medium capitalize">{formattedDate}</div>
                    </div>
                  </div>
                </div>

                {/* Time */}
                {event.time && (
                  <div className="mb-6 pb-6 border-b border-white/[0.06]">
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">Heure</div>
                        <div className="text-white font-medium">{event.time}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                {event.location && (
                  <div className="mb-8 pb-6 border-b border-white/[0.06]">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">Lieu</div>
                        <div className="text-white font-medium">{event.location}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {event.ticket_url && (
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-black hover:bg-white/90 rounded-full py-6 text-[13px] font-semibold tracking-wider uppercase shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300"
                  >
                    <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">
                      Reserver ma place
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}

                {!event.ticket_url && (
                  <div className="w-full p-5 bg-accent/10 border border-accent/20 rounded-xl text-center">
                    <p className="text-accent font-semibold text-sm">Entree libre</p>
                  </div>
                )}

                {/* Event Status */}
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <div className="text-center">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase ${
                        event.status === 'upcoming'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-white/[0.05] text-white/40'
                      }`}
                    >
                      {event.status === 'upcoming' ? 'A venir' : 'Passe'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Events - Premium */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          
          <div className="w-full max-w-6xl mx-auto text-center">
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.03] border border-white/[0.06] text-white rounded-full text-sm font-medium hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Voir tous les evenements
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
