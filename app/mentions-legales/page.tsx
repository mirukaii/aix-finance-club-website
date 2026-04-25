import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Building2, Server, Scale } from "lucide-react"

export default function MentionsLegalesPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="min-h-[35vh] sm:min-h-[40vh] flex items-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] pt-24 sm:pt-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-[40vw] max-w-[400px] h-[40vw] max-h-[400px] bg-accent/[0.02] rounded-full blur-[100px]" />
          </div>
          
          <div className="w-full max-w-5xl mx-auto py-12 sm:py-16 relative z-10">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
              Informations legales
            </span>
            <h1 className="font-serif font-medium text-white mb-5 sm:mb-6">
              Mentions legales
            </h1>
            <p className="text-base sm:text-lg text-white/40 leading-relaxed max-w-2xl font-light">
              Informations legales relatives au site web d&apos;Aix Finance Club.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
          <div className="w-full max-w-4xl mx-auto">
            <div className="space-y-8 sm:space-y-12">
              {/* Editeur */}
              <div className="p-6 sm:p-10 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">Editeur du site</h2>
                    <p className="text-sm text-white/40">Responsable de la publication</p>
                  </div>
                </div>
                <div className="space-y-3 text-[15px] text-white/60 leading-relaxed pl-0 sm:pl-[68px]">
                  <p className="text-white font-medium">Aix Finance Club</p>
                  <p>Association etudiante loi 1901</p>
                  <p>Universite d&apos;Aix-Marseille</p>
                  <p>Campus Pauliane, Aix-en-Provence</p>
                  <p className="pt-2">
                    <a href="mailto:aixfinanceclub@gmail.com" className="text-accent hover:text-accent/80 transition-colors">
                      aixfinanceclub@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Hebergement */}
              <div className="p-6 sm:p-10 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Server className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">Hebergement</h2>
                    <p className="text-sm text-white/40">Infrastructure technique</p>
                  </div>
                </div>
                <div className="space-y-3 text-[15px] text-white/60 leading-relaxed pl-0 sm:pl-[68px]">
                  <p className="text-white font-medium">Vercel Inc.</p>
                  <p>340 S Lemon Ave #4133</p>
                  <p>Walnut, CA 91789, USA</p>
                </div>
              </div>

              {/* Propriete intellectuelle */}
              <div className="p-6 sm:p-10 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">Propriete intellectuelle</h2>
                    <p className="text-sm text-white/40">Droits d&apos;auteur et reproduction</p>
                  </div>
                </div>
                <div className="text-[15px] text-white/60 leading-relaxed pl-0 sm:pl-[68px]">
                  <p>
                    L&apos;ensemble du contenu de ce site (textes, images, videos) est la propriete exclusive d&apos;Aix Finance Club,
                    sauf mention contraire. Toute reproduction, meme partielle, est interdite sans autorisation prealable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
