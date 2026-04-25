import Link from "next/link"
import { Instagram, Mail, Linkedin, ArrowUpRight } from "lucide-react"

export function Footer() {
  const footerLinks = {
    "À propos": [
      { label: "Notre mission", href: "/a-propos" },
      { label: "Équipe", href: "/equipe" },
      { label: "Candidatures", href: "/candidatures" },
    ],
    Activités: [
      { label: "Événements", href: "/evenements" },
      { label: "Publications", href: "/publications" },
      { label: "Partenariats", href: "/contact" },
    ],
    Contact: [
      { label: "aixfinanceclub@gmail.com", href: "mailto:aixfinanceclub@gmail.com", isExternal: true },
      { label: "Instagram", href: "https://instagram.com/aixfinanceclub", isExternal: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/aix-finance-club", isExternal: true },
    ],
  }

  return (
    <footer className="bg-[#0a0a0a] text-white relative">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 sm:py-20 lg:py-28 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4">
            <div className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-4 sm:mb-5 text-white">Aix Finance Club</div>
            <p className="text-sm sm:text-[15px] text-white/40 leading-relaxed max-w-sm">
              L&apos;association de finance de référence à Aix-en-Provence. Formation, networking et excellence.
            </p>
            <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-10">
              <a
                href="https://www.linkedin.com/company/aix-finance-club"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/aixfinanceclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:aixfinanceclub@gmail.com"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1 lg:col-span-2">
              <h3 className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-white/25 mb-5 sm:mb-7">{category}</h3>
              <ul className="space-y-4 sm:space-y-5">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] sm:text-sm text-white/50 hover:text-white transition-all duration-300 inline-flex items-center gap-1 group break-all"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-300 shrink-0" />
                      </a>
                    ) : (
                      <Link 
                        href={link.href} 
                        className="text-[13px] sm:text-sm text-white/50 hover:text-white transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-8 sm:py-10 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5">
          <p className="text-[11px] sm:text-[12px] text-white/25 text-center sm:text-left tracking-wide">
            © {new Date().getFullYear()} Aix Finance Club. Tous droits réservés.
          </p>
          <div className="flex gap-6 sm:gap-10">
            <Link 
              href="/mentions-legales" 
              className="text-[11px] sm:text-[12px] text-white/25 hover:text-white/50 transition-all duration-300 tracking-wide"
            >
              Mentions légales
            </Link>
            <Link 
              href="/confidentialite" 
              className="text-[11px] sm:text-[12px] text-white/25 hover:text-white/50 transition-all duration-300 tracking-wide"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
