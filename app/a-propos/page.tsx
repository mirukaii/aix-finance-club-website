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
        {/* Hero - Premium White */}
        <section className="min-h-[55vh] sm:min-h-[65vh] flex items-center px-4 sm:px-6 lg:px-8 bg-white text-black pt-24 sm:pt-28 relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="w-full max-w-5xl mx-auto py-16 sm:py-24 relative z-10">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-black/40 mb-5 sm:mb-7 block">
              À propos
            </span>
            <h1 className="font-serif font-medium text-black mb-7 sm:mb-9">Notre mission</h1>
            <p className="text-base sm:text-xl md:text-2xl text-black/50 leading-relaxed max-w-3xl font-light">
              Former, connecter et préparer les étudiants aux métiers de la finance de demain.
            </p>
          </div>
        </section>

        {/* Qui sommes-nous - Premium Dark */}
        <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-28 items-center">
              <div>
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
                  Qui sommes-nous
                </span>
                <h2 className="font-serif font-medium text-white mb-7 sm:mb-9">
                  Une association d&apos;excellence
                </h2>
                <div className="space-y-5 sm:space-y-7 text-white/40 leading-relaxed text-base sm:text-lg">
                  <p>
                    Aix Finance Club est une association étudiante de l&apos;Université d&apos;Aix-Marseille (AMU), basée sur le
                    campus Pauliane à Aix-en-Provence. Nous réunissons des étudiants passionnés par la finance, l&apos;économie
                    et les marchés financiers.
                  </p>
                  <p>
                    Notre objectif est de créer un pont entre le monde académique et le monde professionnel, en offrant à
                    nos membres des opportunités de développement personnel et professionnel à travers des événements, des
                    formations et un réseau solide.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-4 sm:space-y-5">
                  <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.04] group">
                    <img
                      src="/images/img-5016.jpg"
                      alt="Networking Aix Finance Club"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.04] group">
                    <img 
                      src="/images/img-5038.jpg" 
                      alt="Étudiants attentifs" 
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                </div>
                <div className="pt-8 sm:pt-10">
                  <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.04] group">
                    <img
                      src="/images/img-5151.jpeg"
                      alt="Participants MasterClass"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre approche - Premium */}
        <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          
          <div className="w-full max-w-4xl mx-auto">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
              Notre approche
            </span>
            <h2 className="font-serif font-medium text-white mb-7 sm:mb-9">
              Excellence et professionnalisme
            </h2>
            <div className="space-y-5 sm:space-y-7 text-base sm:text-lg text-white/40 leading-relaxed">
              <p>
                Nous adoptons une approche institutionnelle et professionnelle, inspirée des standards des grandes
                institutions financières. Notre club se distingue par son sérieux, sa rigueur et son engagement envers
                l&apos;excellence académique et professionnelle.
              </p>
              <p>
                Chaque membre bénéficie d&apos;un accompagnement personnalisé, d&apos;un accès privilégié à notre réseau de
                professionnels et d&apos;opportunités de formation continue dans un environnement stimulant et collaboratif.
              </p>
            </div>
          </div>
        </section>

        {/* Nos initiatives - Premium Grid */}
        <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14 sm:mb-20">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
                Ce que nous faisons
              </span>
              <h2 className="font-serif font-medium text-white">
                Nos initiatives
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {initiatives.map((initiative, index) => (
                <div 
                  key={initiative.title} 
                  className="group relative p-7 sm:p-9 lg:p-11 rounded-2xl sm:rounded-3xl border border-white/[0.04] bg-white/[0.02] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/[0.06] text-white flex items-center justify-center mb-7 sm:mb-9 group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:scale-105 transition-all duration-500">
                      <initiative.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white/60 group-hover:text-accent transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{initiative.title}</h3>
                    <p className="text-sm sm:text-[15px] text-white/40 leading-relaxed">{initiative.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre ambition - Premium */}
        <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          
          <div className="w-full max-w-4xl mx-auto">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
              Vision
            </span>
            <h2 className="font-serif font-medium text-white mb-7 sm:mb-9">
              Notre ambition
            </h2>
            <div className="space-y-5 sm:space-y-7 text-base sm:text-lg text-white/40 leading-relaxed">
              <p>
                Devenir la référence des associations étudiantes finance dans le sud de la France. Nous visons à créer un
                écosystème dynamique où les étudiants peuvent explorer les différentes facettes de la finance, développer
                leurs compétences techniques et construire un réseau professionnel solide.
              </p>
              <p>
                À travers nos actions, nous souhaitons faciliter l&apos;insertion professionnelle de nos membres dans les
                métiers du conseil en fusion-acquisition, des marchés financiers, du private equity, de la gestion
                d&apos;actifs et du corporate finance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact - Premium */}
        <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          
          <div className="w-full max-w-5xl mx-auto">
            <div className="max-w-3xl mb-14 sm:mb-20">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
                Contact
              </span>
              <h2 className="font-serif font-medium text-white">
                Nous contacter
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              <a 
                href="mailto:aixfinanceclub@gmail.com"
                className="group p-7 sm:p-9 rounded-2xl sm:rounded-3xl border border-white/[0.04] bg-white/[0.02] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500"
              >
                <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-white/60 mb-5 sm:mb-7 group-hover:text-accent transition-colors duration-500" strokeWidth={1.5} />
                <h3 className="font-semibold text-white mb-2 sm:mb-3">Email</h3>
                <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors break-all">
                  aixfinanceclub@gmail.com
                </p>
              </a>
              <a 
                href="https://instagram.com/aixfinanceclub"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-7 sm:p-9 rounded-2xl sm:rounded-3xl border border-white/[0.04] bg-white/[0.02] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500"
              >
                <Instagram className="h-7 w-7 sm:h-8 sm:w-8 text-white/60 mb-5 sm:mb-7 group-hover:text-accent transition-colors duration-500" strokeWidth={1.5} />
                <h3 className="font-semibold text-white mb-2 sm:mb-3 inline-flex items-center gap-1">
                  Instagram
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>
                <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors">
                  @aixfinanceclub
                </p>
              </a>
              <div className="p-7 sm:p-9 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.04] sm:col-span-2 md:col-span-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/20 mb-5 sm:mb-7" />
                <h3 className="font-semibold text-white mb-2 sm:mb-3">Campus</h3>
                <p className="text-white/40 text-sm">
                  Université d&apos;Aix-Marseille (AMU)<br />
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
