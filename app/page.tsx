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
        {/* Hero Section - Immersive Premium */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
          {/* Premium animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient orbs */}
            <div className="absolute top-1/4 -left-20 w-[60vw] max-w-[800px] h-[60vw] max-h-[800px] bg-accent/[0.03] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute -bottom-40 right-0 w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] bg-accent/[0.05] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] h-[40vw] max-h-[500px] bg-white/[0.01] rounded-full blur-[80px]" />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            {/* Radial gradient vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_70%)]" />
          </div>
          
          <div className="relative w-full max-w-6xl mx-auto text-center pt-24 sm:pt-32 px-4">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.03] text-white/50 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase mb-10 sm:mb-14 border border-white/[0.06] backdrop-blur-sm animate-fade-in-down">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Université d&apos;Aix-Marseille</span>
            </div>
            
            {/* Main title with gradient */}
            <h1 className="font-serif font-medium tracking-tight text-white mb-8 sm:mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="block text-white/90">Aix Finance</span>
              <span className="block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">Club</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/40 mb-12 sm:mb-16 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              L&apos;association de finance de référence à Aix-en-Provence.<br className="hidden sm:block" />
              <span className="text-white/25">Excellence, networking et opportunités.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                size="lg" 
                asChild 
                className="w-full sm:w-auto rounded-full px-8 sm:px-10 py-6 sm:py-7 text-sm sm:text-[13px] font-semibold tracking-wider uppercase bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-[1.02]"
              >
                <Link href="/a-propos">
                  Découvrir le club
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto rounded-full px-8 sm:px-10 py-6 sm:py-7 text-sm sm:text-[13px] font-medium tracking-wider uppercase bg-transparent border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-300"
              >
                <Link href="/evenements">Nos événements</Link>
              </Button>
            </div>
          </div>
          
          {/* Premium scroll indicator */}
          <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">Scroll</span>
            <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          </div>
        </section>

        {/* Photo Showcase Section - Premium Gallery */}
        <section className="py-20 sm:py-28 lg:py-40 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
          {/* Subtle top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-auto lg:h-[600px] group overflow-hidden rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.04]">
                <img
                  src="/images/img-5043.jpg"
                  alt="Intervenant MasterClass Aix Finance Club"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                
                {/* Premium overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium">Conférence</span>
                  <h3 className="text-lg sm:text-xl font-serif text-white mt-1">MasterClass Finance</h3>
                </div>
              </div>
              <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-auto lg:h-[600px] group overflow-hidden rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.04]">
                <img
                  src="/images/img-5023.jpg"
                  alt="Étudiants lors d&apos;une conférence"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                
                {/* Premium overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium">Événement</span>
                  <h3 className="text-lg sm:text-xl font-serif text-white mt-1">Networking Session</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Premium Cards */}
        <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] relative">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl mb-16 sm:mb-20 lg:mb-28">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
                Ce que nous proposons
              </span>
              <h2 className="font-serif font-medium text-white mb-5 sm:mb-7">
                Nos initiatives
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/40 font-light leading-relaxed">
                Des activités pensées pour développer vos compétences et élargir votre réseau professionnel.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative p-7 sm:p-9 lg:p-11 bg-white/[0.02] rounded-2xl sm:rounded-3xl border border-white/[0.04] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/[0.06] text-white flex items-center justify-center mb-7 sm:mb-9 group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:scale-105 transition-all duration-500">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white/60 group-hover:text-accent transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 group-hover:text-white transition-colors">{feature.title}</h3>
                    <p className="text-sm sm:text-[15px] text-white/40 leading-relaxed group-hover:text-white/50 transition-colors">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Publications Section - Editorial Style */}
        <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
          {/* Subtle top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-14 sm:mb-20">
              <div className="max-w-2xl">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
                  Ressources
                </span>
                <h2 className="font-serif font-medium text-white mb-4 sm:mb-5">
                  Dernières publications
                </h2>
                <p className="text-base sm:text-lg text-white/40 font-light">
                  Analyses, veille et insights sur les marchés financiers
                </p>
              </div>
              <Button 
                variant="outline" 
                asChild 
                className="hidden md:inline-flex rounded-full px-7 py-3 bg-transparent border-white/10 text-white/60 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-300 group shrink-0"
              >
                <Link href="/publications">
                  Voir tout
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {latestPublications.map((pub, index) => (
                <Link
                  href="/publications"
                  key={pub.title}
                  className="group p-6 sm:p-7 lg:p-9 bg-white/[0.02] rounded-2xl sm:rounded-3xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-5 sm:mb-7">
                    <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
                      {pub.category}
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-white/30">{pub.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-5 group-hover:text-white/90 transition-colors line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-white/35 leading-relaxed mb-5 sm:mb-7 line-clamp-2">{pub.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-white/[0.04]">
                    <span className="text-[11px] sm:text-[12px] text-white/25">{pub.date}</span>
                    <span className="text-[11px] sm:text-[12px] font-semibold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                      Lire
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 sm:mt-12 text-center md:hidden">
              <Button variant="outline" asChild className="w-full sm:w-auto rounded-full px-8 py-3 bg-transparent border-white/10 text-white/60 hover:border-white/20 hover:text-white">
                <Link href="/publications">Voir toutes les publications</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section - Premium White */}
        <section className="py-28 sm:py-36 lg:py-48 px-4 sm:px-6 lg:px-8 bg-white text-black relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="w-full max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-serif font-medium text-black mb-7 sm:mb-9">
              Découvrez Aix Finance Club
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black/50 mb-10 sm:mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              Une association étudiante dédiée à l&apos;excellence en finance, au networking et au développement professionnel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <Button 
                size="lg" 
                asChild 
                className="w-full sm:w-auto bg-black text-white hover:bg-black/90 rounded-full px-8 sm:px-10 py-6 sm:py-7 text-sm sm:text-[13px] font-semibold tracking-wider uppercase shadow-2xl shadow-black/20 hover:shadow-black/30 hover:scale-[1.02] transition-all duration-300"
              >
                <Link href="/a-propos">
                  En savoir plus
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="w-full sm:w-auto border-black/10 text-black/70 hover:bg-black/5 hover:border-black/20 hover:text-black rounded-full px-8 sm:px-10 py-6 sm:py-7 text-sm sm:text-[13px] font-medium tracking-wider uppercase bg-transparent transition-all duration-300"
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
