import Link from "next/link"

const EMAIL = "aixfinanceclub@gmail.com"
const LINKEDIN_URL = "https://www.linkedin.com/company/aix-finance-club"
const INSTAGRAM_URL = "https://instagram.com/aixfinanceclub"

const COLUMNS = [
  {
    title: "Le club",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/equipe", label: "Équipe" },
      { href: "/partenaires", label: "Partenaires" },
    ],
  },
  {
    title: "Activités",
    links: [
      { href: "/evenements", label: "Événements" },
      { href: "/publications", label: "Publications" },
      { href: "/candidatures", label: "Candidatures" },
    ],
  },
]

const titleCls = "mb-4 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]"
const linkCls = "text-sm text-[#141414] hover:underline underline-offset-4"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#141414] bg-[#f6f4ef] text-[#141414]">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-3xl tracking-tight sm:text-4xl">Aix Finance Club</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#4a4a46]">
              Association étudiante basée à Aix-en-Provence, dédiée à la formation, aux échanges et au networking autour des métiers de la finance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className={titleCls}>{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <p className={titleCls}>Contact</p>
              <ul className="space-y-3">
                <li><Link href={`mailto:${EMAIL}`} className={linkCls}>{EMAIL}</Link></li>
                <li><Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>LinkedIn</Link></li>
                <li><Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>Instagram</Link></li>
                <li><Link href="/contact" className={linkCls}>Devenir partenaire</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[#dcd8cf] pt-6 text-xs text-[#6b6b66] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Aix Finance Club. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-[#141414]">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-[#141414]">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
