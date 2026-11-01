import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"

const INITIATIVES = [
  { n: "01", title: "Conférences et interventions", text: "Rencontres avec des professionnels de la finance, traders, analystes et dirigeants d'entreprise." },
  { n: "02", title: "Networking", text: "Événements de networking, alumni meetings et rencontres avec les acteurs du secteur." },
  { n: "03", title: "Formations techniques", text: "Ateliers pratiques sur le trading, la modélisation financière et l'analyse de marchés." },
  { n: "04", title: "Publications et veille", text: "Articles d'analyse, notes de marchés et veille sectorielle régulière." },
]

function Block({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 border-b border-[#dcd8cf] py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{label}</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-[#4a4a46] sm:text-lg lg:col-span-8">{children}</div>
      </div>
    </section>
  )
}

export default function AProposPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <PageHeader label="À propos" title="Notre mission" intro="Former, connecter et préparer les étudiants aux métiers de la finance de demain." />

        <Block label="Qui sommes-nous" title="Une association d'excellence">
          <p>
            Aix Finance Club est une association étudiante de l&apos;Université d&apos;Aix-Marseille (AMU), basée sur le campus Pauliane à Aix-en-Provence. Nous réunissons des étudiants passionnés par la finance, l&apos;économie et les marchés financiers.
          </p>
          <p>
            Notre objectif est de créer un pont entre le monde académique et le monde professionnel, en offrant à nos membres des opportunités de développement personnel et professionnel à travers des événements, des formations et un réseau solide.
          </p>
        </Block>

        <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4da]">
              <Image src="/images/img-5016.jpg" alt="Networking Aix Finance Club" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover object-center" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4da]">
              <Image src="/images/img-5038.jpg" alt="Étudiants attentifs" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover object-center" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4da]">
              <Image src="/images/img-5151.jpeg" alt="Participants MasterClass" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover object-center" />
            </div>
          </div>
        </section>

        <Block label="Notre approche" title="Excellence et professionnalisme">
          <p>
            Nous adoptons une approche institutionnelle et professionnelle, inspirée des standards des grandes institutions financières. Notre club se distingue par son sérieux, sa rigueur et son engagement envers l&apos;excellence académique et professionnelle.
          </p>
          <p>
            Chaque membre bénéficie d&apos;un accompagnement personnalisé, d&apos;un accès privilégié à notre réseau de professionnels et d&apos;opportunités de formation continue dans un environnement stimulant et collaboratif.
          </p>
        </Block>

        <Block label="Ce que nous faisons" title="Nos initiatives">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {INITIATIVES.map((it) => (
              <div key={it.n} className="border-t border-[#dcd8cf] pt-5">
                <p className="text-xs tracking-[0.2em] text-[#6b6b66]">{it.n}</p>
                <h3 className="mt-3 font-serif text-2xl text-[#141414]">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed sm:text-base">{it.text}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="Vision" title="Notre ambition">
          <p>
            Devenir la référence des associations étudiantes finance dans le sud de la France. Nous visons à créer un écosystème dynamique où les étudiants peuvent explorer les différentes facettes de la finance, développer leurs compétences techniques et construire un réseau professionnel solide.
          </p>
          <p>
            À travers nos actions, nous souhaitons faciliter l&apos;insertion professionnelle de nos membres dans les métiers du conseil en fusion-acquisition, des marchés financiers, du private equity, de la gestion d&apos;actifs et du corporate finance.
          </p>
        </Block>

        <Block label="Contact" title="Nous contacter">
          <ul className="divide-y divide-[#dcd8cf] border-y border-[#dcd8cf]">
            <li>
              <Link href="mailto:aixfinanceclub@gmail.com" className="group flex flex-wrap items-center justify-between gap-2 py-5">
                <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b66]">Email</span>
                <span className="text-[#141414] underline-offset-4 group-hover:underline">aixfinanceclub@gmail.com</span>
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com/aixfinanceclub" target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-center justify-between gap-2 py-5">
                <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b66]">Instagram</span>
                <span className="text-[#141414] underline-offset-4 group-hover:underline">@aixfinanceclub</span>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/company/aix-finance-club" target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-center justify-between gap-2 py-5">
                <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b66]">LinkedIn</span>
                <span className="text-[#141414] underline-offset-4 group-hover:underline">Aix Finance Club</span>
              </Link>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 py-5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b66]">Campus</span>
              <span className="text-[#141414]">Université d&apos;Aix-Marseille (AMU), Campus Pauliane, Aix-en-Provence</span>
            </li>
          </ul>
        </Block>
      </main>
      <Footer />
    </>
  )
}
