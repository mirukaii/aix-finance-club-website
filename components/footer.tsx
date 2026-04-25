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
    <footer className="bg-foreground text-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 sm:py-16 lg:py-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4">
            <div className="font-serif text-xl sm:text-2xl font-semibold tracking-tight mb-3 sm:mb-4">Aix Finance Club</div>
            <p className="text-sm sm:text-base text-background/60 leading-relaxed max-w-sm">
              L'association de finance de référence à Aix-en-Provence. Formation, networking et excellence.
            </p>
            <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
              <a
                href="https://www.linkedin.com/company/aix-finance-club"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/aixfinanceclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:aixfinanceclub@gmail.com"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1 lg:col-span-2">
              <h3 className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-background/40 mb-4 sm:mb-6">{category}</h3>
              <ul className="space-y-3 sm:space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-background/70 hover:text-background transition-colors duration-200 inline-flex items-center gap-1 group break-all"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-200 shrink-0" />
                      </a>
                    ) : (
                      <Link 
                        href={link.href} 
                        className="text-xs sm:text-sm text-background/70 hover:text-background transition-colors duration-200"
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
        <div className="py-6 sm:py-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[11px] sm:text-[13px] text-background/40 text-center sm:text-left">
            © {new Date().getFullYear()} Aix Finance Club. Tous droits réservés.
          </p>
          <div className="flex gap-4 sm:gap-8">
            <Link 
              href="/mentions-legales" 
              className="text-[11px] sm:text-[13px] text-background/40 hover:text-background/70 transition-colors duration-200"
            >
              Mentions légales
            </Link>
            <Link 
              href="/confidentialite" 
              className="text-[11px] sm:text-[13px] text-background/40 hover:text-background/70 transition-colors duration-200"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
