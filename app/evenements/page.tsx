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
        {/* Featured Hero Event */}
        {featuredEvent ? (
          <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden bg-background">
            {featuredEvent.image_url && (
              <div className="absolute inset-0 z-0">
                <img
                  src={featuredEvent.image_url}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>
            )}

            {/* Overlay gradient */}
            {!featuredEvent.image_url && (
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-background z-0" />
            )}

            {/* Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
              <div className="w-full max-w-6xl mx-auto">
                <div className="mb-4 sm:mb-6">
                  <span className="inline-block px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-semibold rounded-full">
                    Prochain événement
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 leading-tight">
                  {featuredEvent.title}
                </h1>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-8 sm:mb-12">
                  <div className="flex items-center gap-3 text-lg text-foreground">
                    <Calendar className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wide">Date & Heure</div>
                      <div className="font-semibold">
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
                    <div className="flex items-center gap-3 text-lg text-foreground">
                      <MapPin className="h-5 w-5 text-accent shrink-0" />
                      <div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wide">Lieu</div>
                        <div className="font-semibold">{featuredEvent.location}</div>
                      </div>
                    </div>
                  )}
                </div>

                {featuredEvent.ticket_url && (
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href={featuredEvent.ticket_url} target="_blank" rel="noopener noreferrer">
                      Réserver ma place
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background pt-20">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">Aucun événement à venir</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Suivez-nous sur Instagram pour être informé de nos prochains événements.</p>
            </div>
          </section>
        )}

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 1 && (
          <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-12 sm:mb-16">
                <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-accent mb-3 block">
                  Prochainement
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Autres événements à venir</h2>
              </div>

              <div className="space-y-6">
                {upcomingEvents.slice(1).map((event, idx) => (
                  <Link
                    href={`/evenements/${event.id}`}
                    key={event.id}
                    className="group block animate-fade-in-up"
                    style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-background rounded-xl hover:border-accent transition-all duration-300 border border-border/50 hover:shadow-lg hover:shadow-accent/10">
                      {event.image_url && (
                        <div className="w-full sm:w-[40%] aspect-video sm:aspect-auto rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className={event.image_url ? 'sm:w-[60%]' : 'w-full'}>
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-6 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-accent" />
                            <span>
                              {new Date(event.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                              {event.time && ` - ${event.time}`}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-accent" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.description && (
                          <p className="text-base text-muted-foreground mb-6 line-clamp-2">{event.description}</p>
                        )}

                        {event.ticket_url && (
                          <Button
                            asChild
                            size="sm"
                            className="bg-accent/20 text-accent hover:bg-accent/30"
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

        {/* Past Events Section */}
        {filteredPastEvents.length > 0 && (
          <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-12 sm:mb-16">
                <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-accent mb-3 block">
                  Rétrospective
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8">Événements passés</h2>

                {/* Category Filters */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        !selectedCategory
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                      }`}
                    >
                      Tous
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === cat
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPastEvents.map((event, idx) => (
                  <Link
                    href={`/evenements/${event.id}`}
                    key={event.id}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${(idx + 1) * 0.05}s` }}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-secondary hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer h-full flex flex-col">
                      {event.image_url && (
                        <div className="relative w-full aspect-video overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute top-4 right-4 px-3 py-1 bg-background/90 backdrop-blur text-accent text-xs font-semibold rounded-full">
                            Passé
                          </div>
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {event.title}
                        </h3>

                        {event.category && (
                          <span className="inline-block w-fit mb-3 px-2 py-1 bg-secondary/50 text-accent text-xs font-semibold rounded">
                            {event.category}
                          </span>
                        )}

                        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
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
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-accent" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.description && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{event.description}</p>
                        )}

                        <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all">
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

        {/* Legacy Past Event */}
        {events.length === 0 && (
          <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="w-full max-w-7xl mx-auto text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">Aucun événement enregistré</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Revenez bientôt pour découvrir nos futurs événements.</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
