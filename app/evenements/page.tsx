'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, ArrowUpRight, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'

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

export default function EvenementsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      const supabase = createClient()
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (data) {
        setEvents(data)
      }
      setLoading(false)
    }

    fetchEvents()
  }, [])

  const upcomingEvents = useMemo(() => {
    const now = new Date()
    return events
      .filter((e) => new Date(e.date) > now && e.status === 'upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events])

  const pastEvents = useMemo(() => {
    const now = new Date()
    return events
      .filter((e) => new Date(e.date) <= now && e.status === 'past')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [events])

  const categories = useMemo(() => {
    const cats = new Set(pastEvents.filter((e) => e.category).map((e) => e.category))
    return Array.from(cats)
  }, [pastEvents])

  const filteredPastEvents = useMemo(() => {
    if (!selectedCategory) return pastEvents
    return pastEvents.filter((e) => e.category === selectedCategory)
  }, [pastEvents, selectedCategory])

  const featuredEvent = upcomingEvents[0]

  return (
    <>
      <Navigation />
      <main>
        {/* Featured Hero Event - Premium Immersive */}
        {featuredEvent ? (
          <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden bg-[#0a0a0a]">
            {featuredEvent.image_url && (
              <div className="absolute inset-0 z-0">
                <img
                  src={featuredEvent.image_url}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
                <div className="absolute inset-0 bg-[#0a0a0a]/30" />
              </div>
            )}

            {/* Overlay gradient */}
            {!featuredEvent.image_url && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-[#0a0a0a] z-0" />
            )}

            {/* Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
              <div className="w-full max-w-6xl mx-auto">
                <div className="mb-6 sm:mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm text-accent text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full border border-accent/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Prochain événement
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-8 sm:mb-10 leading-[1.1] max-w-4xl">
                  {featuredEvent.title}
                </h1>
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 mb-10 sm:mb-14">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.15em] mb-1">Date & Heure</div>
                      <div className="text-base sm:text-lg font-medium text-white">
                        {new Date(featuredEvent.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                        {featuredEvent.time && ` - ${featuredEvent.time}`}
                      </div>
                    </div>
                  </div>
                  {featuredEvent.location && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.15em] mb-1">Lieu</div>
                        <div className="text-base sm:text-lg font-medium text-white">{featuredEvent.location}</div>
                      </div>
                    </div>
                  )}
                </div>

                {featuredEvent.ticket_url && (
                  <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-[13px] font-semibold tracking-wider uppercase shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-[1.02] transition-all duration-300">
                    <a href={featuredEvent.ticket_url} target="_blank" rel="noopener noreferrer">
                      Réserver ma place
                      <ArrowUpRight className="ml-3 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] pt-24">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-8">
                <Calendar className="h-8 w-8 text-white/30" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-white mb-5">Aucun événement à venir</h2>
              <p className="text-white/40 max-w-md mx-auto text-base sm:text-lg">Suivez-nous sur Instagram pour être informé de nos prochains événements.</p>
            </div>
          </section>
        )}

        {/* Upcoming Events Section - Premium */}
        {upcomingEvents.length > 1 && (
          <section className="py-20 sm:py-28 lg:py-40 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-14 sm:mb-20">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 block">
                  Prochainement
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white">Autres événements à venir</h2>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {upcomingEvents.slice(1).map((event, idx) => (
                  <Link
                    href={`/evenements/${event.id}`}
                    key={event.id}
                    className="group block animate-fade-in-up"
                    style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10 bg-white/[0.02] rounded-2xl sm:rounded-3xl hover:bg-white/[0.04] transition-all duration-500 border border-white/[0.04] hover:border-accent/30">
                      {event.image_url && (
                        <div className="w-full sm:w-[40%] aspect-video sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 bg-white/[0.02]">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className={event.image_url ? 'sm:w-[60%] flex flex-col justify-center' : 'w-full'}>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium text-white mb-5 group-hover:text-white/90 transition-colors">
                          {event.title}
                        </h3>

                        <div className="space-y-3 mb-6 text-white/50">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-accent" />
                            <span className="text-sm sm:text-base">
                              {new Date(event.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                              {event.time && ` - ${event.time}`}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-3">
                              <MapPin className="h-4 w-4 text-accent" />
                              <span className="text-sm sm:text-base">{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.description && (
                          <p className="text-sm sm:text-base text-white/35 mb-7 line-clamp-2 leading-relaxed">{event.description}</p>
                        )}

                        {event.ticket_url && (
                          <Button
                            asChild
                            size="sm"
                            className="w-fit bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 rounded-full px-6 py-2.5 text-[11px] font-semibold tracking-wider uppercase transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">
                              Réserver
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Past Events Section - Premium Grid */}
        {filteredPastEvents.length > 0 && (
          <section className="py-20 sm:py-28 lg:py-40 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-14 sm:mb-20">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 block">
                  Rétrospective
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-10">Événements passés</h2>

                {/* Category Filters - Premium */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                        !selectedCategory
                          ? 'bg-white text-black'
                          : 'bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/70 border border-white/[0.06]'
                      }`}
                    >
                      Tous
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                          selectedCategory === cat
                            ? 'bg-white text-black'
                            : 'bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/70 border border-white/[0.06]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredPastEvents.map((event, idx) => (
                  <Link
                    href={`/evenements/${event.id}`}
                    key={event.id}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${(idx + 1) * 0.05}s` }}
                  >
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-500 cursor-pointer h-full flex flex-col">
                      {event.image_url && (
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/[0.02] flex-shrink-0">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white/70 text-[10px] font-semibold tracking-wider uppercase rounded-full border border-white/10">
                            Passé
                          </div>
                        </div>
                      )}

                      <div className="p-6 sm:p-7 flex flex-col flex-grow">
                        <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-4 group-hover:text-white/90 transition-colors line-clamp-2">
                          {event.title}
                        </h3>

                        {event.category && (
                          <span className="inline-block w-fit mb-4 px-3 py-1 bg-accent/10 text-accent text-[10px] font-semibold tracking-wider uppercase rounded-full">
                            {event.category}
                          </span>
                        )}

                        <div className="space-y-2.5 mb-5 text-sm text-white/40">
                          <div className="flex items-center gap-2.5">
                            <Calendar className="h-4 w-4 text-accent" />
                            <span>
                              {new Date(event.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2.5">
                              <MapPin className="h-4 w-4 text-accent" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.description && (
                          <p className="text-sm text-white/30 mb-5 line-clamp-2 flex-grow leading-relaxed">{event.description}</p>
                        )}

                        <div className="flex items-center text-accent font-semibold text-[12px] tracking-wider uppercase group-hover:gap-2 transition-all">
                          Voir plus
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Legacy Past Event - Premium Empty State */}
        {events.length === 0 && (
          <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
            <div className="w-full max-w-7xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-8">
                <Calendar className="h-8 w-8 text-white/30" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-white mb-5">Aucun événement enregistré</h2>
              <p className="text-white/40 max-w-md mx-auto text-base sm:text-lg">Revenez bientôt pour découvrir nos futurs événements.</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
