"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const MAIN_LINKS = [
  { href: "/publications", label: "Publications" },
  { href: "/evenements", label: "Événements" },
]

const CLUB_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/equipe", label: "Équipe" },
  { href: "/partenaires", label: "Partenaires" },
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")
  const clubActive = CLUB_LINKS.some((l) => isActive(l.href))
  const base = "text-[12px] tracking-[0.18em] uppercase transition-colors"
  const on = "text-[#141414] underline underline-offset-8 decoration-1"
  const off = "text-[#4a4a46] hover:text-[#141414]"

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f6f4ef] border-b border-[#dcd8cf]">
      <div className="mx-auto flex h-16 sm:h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="shrink-0" aria-label="Aix Finance Club, accueil">
          <Image src="/images/logo-sans-arriere-plan.png" alt="Aix Finance Club" width={160} height={53} className="h-9 sm:h-10 w-auto" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-10" aria-label="Navigation principale">
          {MAIN_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`${base} ${isActive(l.href) ? on : off}`}>{l.label}</Link>
          ))}

          <div className="relative group">
            <Link href="/a-propos" className={`${base} ${clubActive ? on : off}`}>Le club</Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-150 absolute left-1/2 top-full -translate-x-1/2 pt-5">
              <div className="min-w-[200px] border border-[#dcd8cf] bg-[#f6f4ef] py-2">
                {CLUB_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="block px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase text-[#4a4a46] hover:text-[#141414] hover:bg-[#ece8de]">{l.label}</Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contact" className={`${base} ${isActive("/contact") ? on : off}`}>Contact</Link>
        </nav>

        <div className="hidden lg:block">
          <Link href="/candidatures" className="border border-[#141414] px-6 py-2.5 text-[12px] tracking-[0.18em] uppercase text-[#141414] hover:bg-[#141414] hover:text-[#f6f4ef] transition-colors">Rejoindre</Link>
        </div>

        <button type="button" className="lg:hidden -mr-2 p-2 text-[#141414]" onClick={() => setOpen(true)} aria-label="Ouvrir le menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#f6f4ef]">
          <div className="flex h-16 items-center justify-between border-b border-[#dcd8cf] px-5">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Accueil">
              <Image src="/images/logo-sans-arriere-plan.png" alt="Aix Finance Club" width={160} height={53} className="h-9 w-auto" />
            </Link>
            <button type="button" className="-mr-2 p-2 text-[#141414]" onClick={() => setOpen(false)} aria-label="Fermer le menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-5 py-8" aria-label="Menu mobile">
            <ul>
              {[...MAIN_LINKS, { href: "/contact", label: "Contact" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block border-b border-[#dcd8cf] py-4 font-serif text-3xl text-[#141414]">{l.label}</Link>
                </li>
              ))}
            </ul>

            <p className="mb-2 mt-10 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Le club</p>
            <ul>
              {CLUB_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block border-b border-[#dcd8cf] py-3 text-lg text-[#141414]">{l.label}</Link>
                </li>
              ))}
            </ul>

            <Link href="/candidatures" className="mt-10 block border border-[#141414] py-4 text-center text-xs uppercase tracking-[0.2em] text-[#141414]">Rejoindre le club</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
