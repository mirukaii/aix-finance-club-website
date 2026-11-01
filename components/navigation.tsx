"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/evenements", label: "Événements" },
  { href: "/publications", label: "Publications" },
  { href: "/equipe", label: "Équipe" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/candidatures", label: "Candidatures" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname() || ""
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"))

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f6f4ef] border-b border-[#dcd8cf]">
      <div className="mx-auto flex h-16 sm:h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="shrink-0" aria-label="Aix Finance Club, accueil">
          <Image src="/images/logo-sans-arriere-plan.png" alt="Aix Finance Club" width={160} height={53} className="h-9 sm:h-10 w-auto" priority />
        </Link>

        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`text-[11px] 2xl:text-[12px] tracking-[0.15em] uppercase whitespace-nowrap transition-colors ${isActive(l.href) ? "text-[#141414] underline underline-offset-8 decoration-1" : "text-[#4a4a46] hover:text-[#141414]"}`}>{l.label}</Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link href="/candidatures" className="border border-[#141414] px-6 py-2.5 text-[12px] tracking-[0.18em] uppercase text-[#141414] hover:bg-[#141414] hover:text-[#f6f4ef] transition-colors">Rejoindre</Link>
        </div>

        <button type="button" className="xl:hidden -mr-2 p-2 text-[#141414]" onClick={() => setOpen(true)} aria-label="Ouvrir le menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="xl:hidden fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#f6f4ef]">
          <div className="flex h-16 items-center justify-between border-b border-[#dcd8cf] px-5">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Accueil">
              <Image src="/images/logo-sans-arriere-plan.png" alt="Aix Finance Club" width={160} height={53} className="h-9 w-auto" />
            </Link>
            <button type="button" className="-mr-2 p-2 text-[#141414]" onClick={() => setOpen(false)} aria-label="Fermer le menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-5 py-6" aria-label="Menu mobile">
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`block border-b border-[#dcd8cf] py-3.5 font-serif text-2xl sm:text-3xl ${isActive(l.href) ? "text-accent" : "text-[#141414]"}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <Link href="/candidatures" className="mt-8 block border border-[#141414] py-4 text-center text-xs uppercase tracking-[0.2em] text-[#141414]">Rejoindre le club</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
