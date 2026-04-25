"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Mail, Instagram, MapPin, CheckCircle2, Linkedin, ArrowUpRight } from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const subject = `Demande de Contact – Aix Finance Club | ${formData.nom}`
    const body = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                DEMANDE DE CONTACT – AIX FINANCE CLUB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIONS DU CONTACT
──────────────────────────────────────────────────────────────

Nom                    : ${formData.nom}
Email                  : ${formData.email}
Objet                  : ${formData.objet}


MESSAGE
──────────────────────────────────────────────────────────────

${formData.message}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cordialement,
${formData.nom}
`.trim()

    const mailtoLink = `mailto:aixfinanceclub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink

    // Show success message after a short delay
    setTimeout(() => {
      setSubmitted(true)
    }, 1000)
  }

  // Mock partner logos
  const partners: { name: string; logo: string }[] = []

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="min-h-[40vh] sm:min-h-[50vh] flex items-center px-4 sm:px-6 lg:px-8 bg-background pt-20">
          <div className="w-full max-w-5xl mx-auto py-16 sm:py-24">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4 sm:mb-6 block">
              Contact
            </span>
            <h1 className="font-serif font-medium text-foreground mb-6 sm:mb-8">
              Partenariats & Contact
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light">
              Développons ensemble des synergies pour former la prochaine génération de professionnels de la finance.
            </p>
          </div>
        </section>

        {/* Partnership Value */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="w-full max-w-5xl mx-auto">
            <div className="mb-10 sm:mb-16">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                Partenariat
              </span>
              <h2 className="font-serif font-medium text-foreground">Pourquoi nous soutenir</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-background border border-border/50">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Visibilité ciblée</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Accès direct à des étudiants motivés et passionnés par la finance.
                </p>
              </div>
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-background border border-border/50">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Recrutement</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Identifier et rencontrer les futurs talents de votre organisation.
                </p>
              </div>
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-background border border-border/50 sm:col-span-2 md:col-span-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Impact formation</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Contribuer à la formation de la prochaine génération de professionnels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        {partners.length > 0 && (
          <section className="py-32 px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Ils nous font confiance
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">Nos partenaires</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-10 rounded-2xl border border-border/50 hover:border-border transition-colors"
                  >
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="max-w-full h-auto opacity-60"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Form */}
        <section className="py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Contact Info */}
              <div>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Coordonnées
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-12">Nous contacter</h2>
                <div className="space-y-6">
                  <a 
                    href="mailto:aixfinanceclub@gmail.com"
                    className="group flex items-start gap-4 p-6 rounded-2xl border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 inline-flex items-center gap-1">
                        Email
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-muted-foreground">aixfinanceclub@gmail.com</p>
                    </div>
                  </a>

                  <a 
                    href="https://instagram.com/aixfinanceclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-6 rounded-2xl border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 inline-flex items-center gap-1">
                        Instagram
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-muted-foreground">@aixfinanceclub</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/company/aix-finance-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-6 rounded-2xl border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 inline-flex items-center gap-1">
                        LinkedIn
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-muted-foreground">Aix Finance Club</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/50">
                    <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Campus</h3>
                      <p className="text-muted-foreground">Université d'Aix-Marseille</p>
                      <p className="text-muted-foreground">Campus Pauliane, Aix-en-Provence</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Message
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-12">Envoyer un message</h3>
                {submitted ? (
                  <div className="p-12 rounded-2xl bg-secondary/30 border border-border/50 text-center">
                    <CheckCircle2 className="h-16 w-16 text-foreground mx-auto mb-6" strokeWidth={1.5} />
                    <h3 className="text-xl font-semibold text-foreground mb-4">Message envoyé</h3>
                    <p className="text-muted-foreground mb-8">Nous vous répondrons dans les plus brefs délais.</p>
                    <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-full px-6 bg-transparent">
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <div className="p-8 lg:p-10 rounded-2xl bg-secondary/30 border border-border/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="nom" className="text-[13px]">
                          Nom <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="nom"
                          required
                          className="h-12 rounded-xl"
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[13px]">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          className="h-12 rounded-xl"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="objet" className="text-[13px]">
                          Objet <span className="text-destructive">*</span>
                        </Label>
                        <select
                          id="objet"
                          required
                          className="w-full h-12 rounded-xl border border-input bg-background px-4 text-[15px]"
                          value={formData.objet}
                          onChange={(e) => setFormData({ ...formData, objet: e.target.value })}
                        >
                          <option value="">Sélectionner</option>
                          <option value="partenariat">Opportunité de partenariat</option>
                          <option value="evenement">Organisation d'événement</option>
                          <option value="question">Question générale</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-[13px]">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          required
                          rows={6}
                          className="rounded-xl"
                          placeholder="Votre message..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full rounded-full py-6 text-[15px] font-medium">
                        Envoyer
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
