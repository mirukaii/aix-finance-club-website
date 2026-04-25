import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, FileText, ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: "Événements",
      description: "Conférences, networking et rencontres avec des professionnels de la finance.",
    },
    {
      icon: BookOpen,
      title: "Formations & Ateliers",
      description: "Sessions de formation technique et développement des compétences financières.",
    },
    {
      icon: FileText,
      title: "Publications & Veille",
      description: "Analyses de marchés, articles macro-économiques et veille sectorielle.",
    },
  ]

  const latestPublications = [
    {
      title: "Analyse des Marchés Obligataires 2026",
      excerpt: "Vue d'ensemble des tendances des marchés obligataires et perspectives macroéconomiques.",
      date: "10 janvier 2026",
      category: "Marchés",
      readTime: "8 min",
    },
    {
      title: "Guide Carrières : Investment Banking",
      excerpt: "Parcours, recrutement et conseils pour réussir dans le conseil en fusion-acquisition.",
      date: "8 janvier 2026",
      category: "Carrière",
      readTime: "12 min",
    },
    {
      title: "Private Equity en France : État des Lieux",
      excerpt: "Analyse du marché français du capital-investissement et opportunités sectorielles.",
      date: "5 janvier 2026",
      category: "Analyse",
      readTime: "10 min",
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section - Full screen minimal */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] bg-muted/50 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[35vw] max-w-[400px] h-[35vw] max-h-[400px] bg-muted/30 rounded-full blur-3xl" />
          </div>
          <div className="relative w-full max-w-5xl mx-auto text-center pt-20 px-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-secondary text-foreground/70 text-xs sm:text-[13px] font-medium tracking-wide mb-8 sm:mb-10 border border-border/50">
              <span className="w-2 h-2 rounded-full bg-foreground/40 shrink-0" />
              <span>Université d'Aix-Marseille</span>
            </div>
            <h1 className="font-serif font-medium tracking-tight text-foreground mb-6 sm:mb-8">
              Aix Finance Club
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              L'association de finance de référence à Aix-en-Provence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button 
                size="lg" 
                asChild 
                className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-[15px] font-medium tracking-wide"
              >
                <Link href="/a-propos">
                  Découvrir le club
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-[15px] font-medium tracking-wide bg-transparent"
              >
                <Link href="/evenements">Nos événements</Link>
              </Button>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-[10px] sm:text-[11px] tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-border to-transparent" />
          </div>
        </section>

        {/* Photo Showcase Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-auto lg:h-[550px] group overflow-hidden rounded-xl sm:rounded-2xl bg-secondary/30">
                <img
                  src="/images/img-5043.jpg"
                  alt="Intervenant MasterClass Aix Finance Club"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-auto lg:h-[550px] group overflow-hidden rounded-xl sm:rounded-2xl bg-secondary/30">
                <img
                  src="/images/img-5023.jpg"
                  alt="Étudiants lors d'une conférence"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                Ce que nous proposons
              </span>
              <h2 className="font-serif font-medium text-foreground mb-4 sm:mb-6">
                Nos initiatives
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-light leading-relaxed">
                Des activités pensées pour développer vos compétences et élargir votre réseau professionnel.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-6 sm:p-8 lg:p-10 bg-background rounded-xl sm:rounded-2xl border border-border/50 hover:border-border hover:shadow-xl hover:shadow-foreground/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-foreground text-background flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Publications Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
              <div className="max-w-2xl">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                  Ressources
                </span>
                <h2 className="font-serif font-medium text-foreground mb-3 sm:mb-4">
                  Dernières publications
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground font-light">
                  Analyses, veille et insights sur les marchés financiers
                </p>
              </div>
              <Button 
                variant="outline" 
                asChild 
                className="hidden md:inline-flex rounded-full px-6 bg-transparent group shrink-0"
              >
                <Link href="/publications">
                  Voir tout
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {latestPublications.map((pub, index) => (
                <Link
                  href="/publications"
                  key={pub.title}
                  className="group p-5 sm:p-6 lg:p-8 bg-secondary/30 rounded-xl sm:rounded-2xl hover:bg-secondary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-background text-foreground text-[11px] sm:text-[12px] font-medium">
                      {pub.category}
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-muted-foreground">{pub.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 group-hover:text-foreground/80 transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed mb-4 sm:mb-6">{pub.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border/50">
                    <span className="text-[12px] sm:text-[13px] text-muted-foreground">{pub.date}</span>
                    <span className="text-[12px] sm:text-[13px] font-medium text-foreground group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Lire
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 sm:mt-10 text-center md:hidden">
              <Button variant="outline" asChild className="w-full sm:w-auto rounded-full px-8 bg-transparent">
                <Link href="/publications">Voir toutes les publications</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-medium mb-6 sm:mb-8">
              Découvrez Aix Finance Club
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-background/70 mb-8 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Une association étudiante dédiée à l'excellence en finance, au networking et au développement professionnel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button 
                size="lg" 
                asChild 
                className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90 rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-[15px] font-medium"
              >
                <Link href="/a-propos">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="w-full sm:w-auto border-background/30 text-background hover:bg-background hover:text-foreground rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-[15px] font-medium bg-transparent"
              >
                <Link href="/evenements">Nos événements</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
