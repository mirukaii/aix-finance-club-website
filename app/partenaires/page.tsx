import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@supabase/supabase-js"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Link from "next/link"

export const revalidate = 60

async function getPartners() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return []
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("display_order", { ascending: true })
    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export default async function PartenairesPage() {
  const partners = await getPartners()

  return (
    <>
      <Navigation />
      <main className="bg-[#0a0a0a] min-h-screen">

        <section className="relative pt-40 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>
          <div className="relative w-full max-w-5xl mx-auto text-center">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-6 block">
              Nos partenaires
            </span>
            <h1 className="font-serif font-medium text-white mb-8 text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              Des partenariats<br />
              <span className="text-white/40">stratégiques</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
              Des institutions et entreprises de premier plan qui soutiennent notre mission et enrichissent l&apos;expérience de nos membres.
            </p>
          </div>
        </section>

        {partners.length > 0 && (
          <section className="py-12 border-y border-white/[0.06] overflow-hidden relative bg-white/[0.01]">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...partners, ...partners, ...partners].map((partner: any, i: number) => (
                <div key={`${partner.id}-${i}`} className="inline-flex items-center mx-12 sm:mx-16">
                  {partner.logo_url ? (
                    <img src={partner.logo_url} alt={partner.name} className="h-10 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity duration-300" />
                  ) : (
                    <span className="text-white/30 text-sm font-semibold tracking-widest uppercase">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {partners.length > 0 ? (
          <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl mx-auto">
              {partners.map((partner: any, index: number) => (
                <div
                  key={partner.id}
                  className={`group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 sm:py-28 border-b border-white/[0.06] ${index === 0 ? "border-t border-white/[0.06]" : ""}`}
                >
                  <div className={`flex items-center justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative w-full max-w-xs aspect-square flex items-center justify-center rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.05] group-hover:border-accent/20 transition-all duration-500 p-10 sm:p-14">
                      {partner.logo_url ? (
                        <img src={partner.logo_url} alt={partner.name} className="relative z-10 max-h-24 sm:max-h-32 w-auto object-contain" />
                      ) : (
                        <span className="relative z-10 text-3xl font-serif text-white/30">{partner.name?.charAt(0)}</span>
                      )}
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    {partner.category && (
                      <span className="inline-block px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase mb-6">
                        {partner.category}
                      </span>
                    )}
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                      {partner.name}
                    </h2>
                    {partner.partnership_description ? (
                      <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 font-light whitespace-pre-line">
                        {partner.partnership_description}
                      </p>
                    ) : (
                      <p className="text-white/30 text-base sm:text-lg leading-relaxed mb-8 font-light italic">
                        Un partenaire de confiance au service de nos membres.
                      </p>
                    )}
                    {partner.website_url && (
                      
                        href={partner.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/10 text-white/60 text-sm font-medium tracking-wide hover:border-accent/40 hover:text-white hover:bg-white/[0.03] transition-all duration-300 group/btn"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visiter le site
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="py-44 px-4 text-center">
            <p className="text-white/20 text-lg font-light">Aucun partenaire pour le moment.</p>
          </section>
        )}

        <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-white/[0.01] border-t border-white/[0.06]">
          <div className="w-full max-w-3xl mx-auto text-center">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-6 block">
              Rejoindre notre réseau
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Vous souhaitez devenir<br />
              <span className="text-white/40">partenaire ?</span>
            </h2>
            <p className="text-white/40 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
              Rejoignez notre réseau de partenaires et contribuez au développement des talents de demain en finance.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black text-sm font-semibold tracking-wider uppercase hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-white/10"
            >
              Nous contacter
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
