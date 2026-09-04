"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "À propos" },
    { href: "/evenements", label: "Événements" },
    { href: "/publications", label: "Publications" },
    { href: "/equipe", label: "Équipe" },
    { href: "/partenaires", label: "Partenaires" },
    { href: "/candidatures", label: "Candidatures" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/20" 
        : "bg-transparent"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 sm:h-22">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO_SANS_ARRIERE_PLAN_VF-zb3KKrAQl2KTSvWnNF5ovBZ2EIWjm2.png"
              alt="Aix Finance Club"
              width={160}
              height={53}
              className="h-9 sm:h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - visible above 1024px */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[11px] xl:text-[12px] font-medium tracking-[0.15em] uppercase transition-all duration-300 text-white/60 hover:text-white whitespace-nowrap group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent to-accent/50 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <Button 
              size="sm" 
              asChild 
              className="rounded-full px-5 xl:px-7 py-2.5 text-[11px] xl:text-[12px] font-semibold tracking-wider uppercase bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
            >
              <Link href="/candidatures">Rejoindre</Link>
            </Button>
          </div>

          {/* Mobile Menu Button - visible below 1024px */}
          <button 
            className="lg:hidden p-2 -mr-2 text-foreground" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - fond opaque noir complet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black overflow-y-auto">
          <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-white/10">
            <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/images/logo-sans-arriere-plan.png"
                alt="Aix Finance Club"
                width={160}
                height={53}
                className="h-9 sm:h-11 w-auto"
              />
            </Link>
            <button 
              className="p-2 -mr-2 text-white" 
              onClick={() => setMobileMenuOpen(false)} 
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 sm:py-4 text-base sm:text-lg font-medium text-white border-b border-white/10 transition-colors hover:text-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-6 sm:pt-8">
              <Button className="w-full rounded-full py-5 sm:py-6 text-sm sm:text-base bg-accent text-white hover:bg-accent/90" asChild>
                <Link href="/candidatures" onClick={() => setMobileMenuOpen(false)}>
                  Rejoindre le club
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
