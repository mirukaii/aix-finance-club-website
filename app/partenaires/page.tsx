import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { getPartnersFull } from "@/lib/public-data"

export const revalidate = 60

export const metadata = {
  title: "Partenaires | Aix Finance Club",
  description: "Les institutions et entreprises qui soutiennent Aix Finance Club et enrichissent l'expérience de nos membres.",
}

export default async function PartenairesPage() {
  const partners = await getPartnersFull()
  const loop = partners.length > 0 ? Array.from({ length: Math.max(2, Math.ceil(10 / partners.length)) }).flatMap(() => partners) : []

  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <PageHeader label="Nos partenaires" title="Des partenariats stratégiques" intro="Des institutions et entreprises de premier plan qui soutiennent notre mission et enrichissent l'expérience de nos membres." />

        {loop.length > 0 && (
          <section className="overflow-hidden border-y border-[#dcd8cf] py-10 sm:py-14">
            <div className="afc-marquee items-center">
              {[...loop, ...loop].map((p, i) => (
                <div key={`${p.id}-${i}`} className="mx-8 shrink-0 sm:mx-14">
                  {p.logo_url ? <img src={p.logo_url} alt={p.name} loading="lazy" decoding="async" className="h-12 w-auto object-contain sm:h-16" /> : <span className="font-serif text-2xl">{p.name}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            {partners.length === 0 && <p className="py-16 text-[#4a4a46]">Aucun partenaire à afficher pour le moment.</p>}
            {partners.map((p, i) => (
              <div key={p.id} className="grid grid-cols-1 items-center gap-8 border-b border-[#dcd8cf] py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
                <div className={`flex items-center justify-center bg-white p-10 sm:p-14 lg:col-span-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  {p.logo_url ? <img src={p.logo_url} alt={p.name} loading="lazy" decoding="async" className="max-h-28 w-auto object-contain sm:max-h-36" /> : <span className="font-serif text-4xl text-[#6b6b66]">{p.name.charAt(0)}</span>}
                </div>
                <div className={`lg:col-span-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  {p.category && <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{p.category}</p>}
                  <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-5xl">{p.name}</h2>
                  {p.partnership_description && <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-relaxed text-[#4a4a46] sm:text-lg">{p.partnership_description}</p>}
                  {p.website_url && <Link href={p.website_url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block border border-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Visiter le site →</Link>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 bg-[#141414] px-5 py-20 text-[#f6f4ef] sm:mt-28 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[#f6f4ef]/60">Rejoindre notre réseau</p>
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">Vous souhaitez devenir partenaire ?</h2>
              <p className="mt-5 max-w-xl text-[#f6f4ef]/70">Rejoignez notre réseau et contribuez au développement des talents de demain en finance.</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href="/contact" className="inline-block border border-[#f6f4ef] px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#f6f4ef] hover:text-[#141414]">Nous contacter</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
