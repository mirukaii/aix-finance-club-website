import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { MapPin, Briefcase, Clock, Info } from "lucide-react"
import Image from "next/image"
import CandidaturesClient from "@/components/candidatures-client"

export const revalidate = 60

async function getData() {
  try {
    const supabase = await createClient()
    const [posRes, slotRes] = await Promise.all([
      supabase.from('job_positions').select('*').eq('is_open', true).order('display_order', { ascending: true }),
      supabase.from('interview_slots').select('*').eq('is_active', true).order('display_order', { ascending: true }),
    ])
    return {
      positions: posRes.data || [],
      slots: slotRes.data || [],
    }
  } catch {
    return { positions: [], slots: [] }
  }
}

export default async function CandidaturesPage() {
  const { positions, slots } = await getData()
  const departments = [...new Set(positions.map((p: any) => p.department))]

  return (
    <>
      <Navigation />
      <main className="bg-[#0a0a0a] min-h-screen">

        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>
          <div className="relative w-full max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-semibold tracking-[0.15em] uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Candidatures ouvertes
            </div>
            <h1 className="font-serif font-medium text-white mb-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              Rejoindre<br />
              <span className="text-white/40">Aix Finance Club</span>
            </h1>
            <p className="text-base sm:text-xl text-white/40 leading-relaxed max-w-2xl mx-auto font-light">
              Vous êtes passionné par la finance et souhaitez développer vos compétences au sein d&apos;une association d&apos;excellence ?
            </p>
          </div>
        </section>

        {/* Postes disponibles */}
        {positions.length > 0 && (
          <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
            <div className="w-full max-w-5xl mx-auto">
              <div className="mb-12">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 block">Postes à pourvoir</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white">Nous recrutons</h2>
              </div>
              {departments.map((dept: any) => (
                <div key={dept} className="mb-12">
                  <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-4 pb-3 border-b border-white/[0.06]">{dept}</h3>
                  <div className="space-y-3">
                    {positions.filter((p: any) => p.department === dept).map((pos: any) => (
                      <div key={pos.id} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-white text-lg">{pos.title}</h4>
                              <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-semibold tracking-wide uppercase">Ouvert</span>
                            </div>
                            {pos.description && <p className="text-white/50 text-sm leading-relaxed">{pos.description}</p>}
                            {pos.responsibilities && <p className="text-white/30 text-xs mt-2 leading-relaxed">{pos.responsibilities}</p>}
                          </div>
                          <Briefcase className="w-5 h-5 text-white/20 shrink-0 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Créneaux */}
        {slots.length > 0 && (
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.01] border-t border-white/[0.06]">
            <div className="w-full max-w-5xl mx-auto">
              <div className="mb-10">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 block">Calendrier</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">Créneaux d&apos;entretien</h2>
                <p className="text-white/40 text-base font-light">Sélectionnez votre disponibilité dans le formulaire ci-dessous.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots.map((slot: any) => (
                  <div key={slot.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-accent/20 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-xs text-white/30 font-medium uppercase tracking-wide">Disponible</span>
                    </div>
                    <p className="text-white font-medium text-sm leading-relaxed">{slot.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Infos pratiques */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 block">Informations pratiques</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white mb-8">Déroulement des entretiens</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <Briefcase className="h-5 w-5 text-white/60" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Dress code</h3>
                      <p className="text-sm text-white/40">Tenue professionnelle exigée</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-white/60" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Lieu des entretiens</h3>
                      <p className="text-sm text-white/40">Salle des Actes</p>
                      <p className="text-sm text-white/40">Campus de la Pauliane</p>
                      <p className="text-sm text-white/40">Faculté d&apos;Économie et de Gestion (FEG)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <Info className="h-5 w-5 text-white/60" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Comment candidater ?</h3>
                      <p className="text-sm text-white/40 leading-relaxed">Remplissez le formulaire ci-dessous. Votre client email s&apos;ouvrira automatiquement. <strong className="text-white/60">N&apos;oubliez pas de joindre votre CV en PDF.</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06]">
                <Image src="/images/salle-des-actes.jpg" alt="Salle des Actes" fill className="object-cover object-center opacity-70" />
              </div>
            </div>
          </div>
        </section>

        {/* Processus */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.01] border-t border-white/[0.06]">
          <div className="w-full max-w-5xl mx-auto">
            <div className="mb-12">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 block">Comment ça marche</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">Processus de recrutement</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { num: '01', title: 'Candidature', desc: 'Dépôt des candidatures via le formulaire ci-dessous.', status: 'En cours', active: true },
                { num: '02', title: 'Entretien', desc: 'Échange avec le bureau pour mieux vous connaître.', status: 'À venir', active: false },
                { num: '03', title: 'Intégration', desc: "Bienvenue dans l'équipe Aix Finance Club !", status: 'À venir', active: false },
              ].map(step => (
                <div key={step.num} className={`p-8 rounded-2xl border transition-all ${step.active ? 'bg-white text-black border-white' : 'bg-white/[0.02] border-white/[0.05] text-white'}`}>
                  <div className={`text-5xl font-serif font-light mb-6 ${step.active ? 'text-black/30' : 'text-white/20'}`}>{step.num}</div>
                  <h3 className={`text-lg font-semibold mb-3 ${step.active ? 'text-black' : 'text-white'}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed mb-4 ${step.active ? 'text-black/60' : 'text-white/40'}`}>{step.desc}</p>
                  <span className={`inline-block text-[11px] font-semibold px-3 py-1.5 rounded-full ${step.active ? 'bg-black text-white' : 'bg-white/[0.05] text-white/40'}`}>{step.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CandidaturesClient positions={positions} slots={slots} />

      </main>
      <Footer />
    </>
  )
}
