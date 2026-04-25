import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Target, Users, TrendingUp, Award, Mail, Instagram, ArrowUpRight } from "lucide-react"

export default function AProposPage() {
  const initiatives = [
    {
      icon: Target,
      title: "Conférences et interventions",
      description: "Rencontres avec des professionnels de la finance, traders, analystes et dirigeants d'entreprise.",
    },
    {
      icon: Users,
      title: "Networking",
      description: "Événements de networking, alumni meetings et rencontres avec les acteurs du secteur.",
    },
    {
      icon: TrendingUp,
      title: "Formations techniques",
      description: "Ateliers pratiques sur le trading, la modélisation financière et l'analyse de marchés.",
    },
    {
      icon: Award,
      title: "Publications et veille",
      description: "Articles d'analyse, notes de marchés et veille sectorielle régulière.",
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="min-h-[50vh] sm:min-h-[60vh] flex items-center px-4 sm:px-6 lg:px-8 bg-foreground text-background pt-20">
          <div className="w-full max-w-5xl mx-auto py-16 sm:py-24">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-background/50 mb-4 sm:mb-6 block">
              À propos
            </span>
            <h1 className="font-serif font-medium mb-6 sm:mb-8">Notre mission</h1>
            <p className="text-base sm:text-xl md:text-2xl text-background/70 leading-relaxed max-w-3xl font-light">
              Former, connecter et préparer les étudiants aux métiers de la finance de demain.
            </p>
          </div>
        </section>

        {/* Qui sommes-nous */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                  Qui sommes-nous
                </span>
                <h2 className="font-serif font-medium text-foreground mb-6 sm:mb-8">
                  Une association d'excellence
                </h2>
                <div className="space-y-4 sm:space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
                  <p>
                    Aix Finance Club est une association étudiante de l'Université d'Aix-Marseille (AMU), basée sur le
                    campus Pauliane à Aix-en-Provence. Nous réunissons des étudiants passionnés par la finance, l'économie
                    et les marchés financiers.
                  </p>
                  <p>
                    Notre objectif est de créer un pont entre le monde académique et le monde professionnel, en offrant à
                    nos membres des opportunités de développement personnel et professionnel à travers des événements, des
                    formations et un réseau solide.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-secondary/30">
                    <img
                      src="/images/img-5016.jpg"
                      alt="Networking Aix Finance Club"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-secondary/30">
                    <img 
                      src="/images/img-5038.jpg" 
                      alt="Étudiants attentifs" 
                      className="absolute inset-0 w-full h-full object-cover object-center" 
                    />
                  </div>
                </div>
                <div className="pt-6 sm:pt-8">
                  <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-secondary/30">
                    <img
                      src="/images/img-5151.jpeg"
                      alt="Participants MasterClass"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre approche */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="w-full max-w-4xl mx-auto">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
              Notre approche
            </span>
            <h2 className="font-serif font-medium text-foreground mb-6 sm:mb-8">
              Excellence et professionnalisme
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Nous adoptons une approche institutionnelle et professionnelle, inspirée des standards des grandes
                institutions financières. Notre club se distingue par son sérieux, sa rigueur et son engagement envers
                l'excellence académique et professionnelle.
              </p>
              <p>
                Chaque membre bénéficie d'un accompagnement personnalisé, d'un accès privilégié à notre réseau de
                professionnels et d'opportunités de formation continue dans un environnement stimulant et collaboratif.
              </p>
            </div>
          </div>
        </section>

        {/* Nos initiatives */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl mb-10 sm:mb-16">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                Ce que nous faisons
              </span>
              <h2 className="font-serif font-medium text-foreground">
                Nos initiatives
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {initiatives.map((initiative, index) => (
                <div 
                  key={initiative.title} 
                  className="group p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-border/50 bg-background hover:border-border hover:shadow-xl hover:shadow-foreground/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-foreground text-background flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                    <initiative.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">{initiative.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{initiative.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre ambition */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="w-full max-w-4xl mx-auto">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
              Vision
            </span>
            <h2 className="font-serif font-medium text-foreground mb-6 sm:mb-8">
              Notre ambition
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Devenir la référence des associations étudiantes finance dans le sud de la France. Nous visons à créer un
                écosystème dynamique où les étudiants peuvent explorer les différentes facettes de la finance, développer
                leurs compétences techniques et construire un réseau professionnel solide.
              </p>
              <p>
                À travers nos actions, nous souhaitons faciliter l'insertion professionnelle de nos membres dans les
                métiers du conseil en fusion-acquisition, des marchés financiers, du private equity, de la gestion
                d'actifs et du corporate finance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="w-full max-w-5xl mx-auto">
            <div className="max-w-3xl mb-10 sm:mb-16">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                Contact
              </span>
              <h2 className="font-serif font-medium text-foreground">
                Nous contacter
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <a 
                href="mailto:aixfinanceclub@gmail.com"
                className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
              >
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-foreground mb-4 sm:mb-6" strokeWidth={1.5} />
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2">Email</h3>
                <p className="text-muted-foreground text-xs sm:text-sm group-hover:text-foreground transition-colors break-all">
                  aixfinanceclub@gmail.com
                </p>
              </a>
              <a 
                href="https://instagram.com/aixfinanceclub"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
              >
                <Instagram className="h-6 w-6 sm:h-8 sm:w-8 text-foreground mb-4 sm:mb-6" strokeWidth={1.5} />
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2 inline-flex items-center gap-1">
                  Instagram
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm group-hover:text-foreground transition-colors">
                  @aixfinanceclub
                </p>
              </a>
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-secondary/50 sm:col-span-2 md:col-span-1">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-foreground mb-4 sm:mb-6" />
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2">Campus</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Université d'Aix-Marseille (AMU)<br />
                  Campus Pauliane, Aix-en-Provence
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
