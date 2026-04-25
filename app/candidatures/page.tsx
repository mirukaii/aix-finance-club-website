"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Briefcase, Clock, Info } from "lucide-react"
import Image from "next/image"

export default function CandidaturesPage() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    universite: "",
    annee: "",
    poles: [] as string[],
    disponibilites: "",
    motivation: "",
    linkedin: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.poles.length === 0) {
      alert("Veuillez sélectionner au moins un pôle")
      return
    }

    const subject = `Candidature – Aix Finance Club | ${formData.prenom} ${formData.nom}`
    const body = `Madame, Monsieur,

Je vous adresse par la présente ma candidature pour rejoindre Aix Finance Club.

Vous trouverez ci-dessous l'ensemble des informations relatives à mon profil.

────────────────────────
INFORMATIONS PERSONNELLES
────────────────────────
Prénom : ${formData.prenom}
Nom : ${formData.nom}
Email : ${formData.email}
Téléphone : ${formData.telephone}

────────────────────────
FORMATION
────────────────────────
Université : ${formData.universite}
Année d'études : ${formData.annee}

────────────────────────
POSTE(S) SOUHAITÉ(S)
────────────────────────
Pôle(s) : ${formData.poles.join(", ")}
Disponibilités : ${formData.disponibilites}${formData.linkedin ? `\nLinkedIn : ${formData.linkedin}` : ""}

────────────────────────
MOTIVATION
────────────────────────
${formData.motivation}

Je vous remercie par avance pour l'attention portée à ma candidature.

Cordialement,

${formData.prenom} ${formData.nom}

CV à joindre obligatoirement (format PDF).`

    const mailtoLink = `mailto:aixfinanceclub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, "_self")
  }

  const poles = ["Vice Secrétaire", "Vice Trésorier", "Vice Responsable Communication", "Partenariats"]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="min-h-[40vh] sm:min-h-[50vh] flex items-center px-4 sm:px-6 lg:px-8 bg-background pt-20">
          <div className="w-full max-w-5xl mx-auto py-16 sm:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground text-background text-[11px] sm:text-[13px] font-medium tracking-wide mb-8 sm:mb-10">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Candidatures ouvertes</span>
            </div>
            <h1 className="font-serif font-medium text-foreground mb-6 sm:mb-8">
              Rejoindre Aix Finance Club
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
              Vous êtes passionné par la finance et souhaitez développer vos compétences au sein d&apos;une association dynamique ? 
            </p>
          </div>
        </section>

        {/* Informations Entretiens */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                  Informations pratiques
                </span>
                <h2 className="font-serif font-medium text-foreground mb-6 sm:mb-8">
                  Informations Entretiens
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Dress code</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Tenue professionnelle exigée</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Lieu des entretiens</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Salle des Actes</p>
                      <p className="text-sm sm:text-base text-muted-foreground">Campus de la Pauliane</p>
                      <p className="text-sm sm:text-base text-muted-foreground">Faculté d'Économie et de Gestion (FEG)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-secondary/30">
                <Image
                  src="/images/salle-des-actes.jpg"
                  alt="Salle des Actes - FEG Pauliane"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Info CV */}
        <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-secondary/30">
          <div className="w-full max-w-5xl mx-auto">
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background border border-border/50">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 sm:mb-2">Comment candidater ?</h3>
                  <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                    Après avoir rempli le formulaire, votre client email s'ouvrira automatiquement avec vos
                    informations pré-remplies.
                    <strong className="text-foreground"> N'oubliez pas de joindre votre CV en PDF avant d'envoyer l'email.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Processus de recrutement */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="w-full max-w-5xl mx-auto">
            <div className="mb-10 sm:mb-16">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                Comment ça marche
              </span>
              <h2 className="font-serif font-medium text-foreground">Processus de recrutement</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-foreground text-background">
                <div className="text-4xl sm:text-5xl font-serif font-light mb-4 sm:mb-6 opacity-50">01</div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Candidature</h3>
                <p className="text-background/70 text-sm sm:text-[15px] leading-relaxed mb-3 sm:mb-4">
                  Dépôt des candidatures via le formulaire ci-dessous.
                </p>
                <span className="inline-block text-[11px] sm:text-[12px] font-medium text-foreground bg-background px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">En cours</span>
              </div>
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-border/50 bg-background">
                <div className="text-4xl sm:text-5xl font-serif font-light mb-4 sm:mb-6 text-muted-foreground/30">02</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Entretien</h3>
                <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed mb-3 sm:mb-4">Échange avec le bureau pour mieux vous connaître.</p>
                <span className="inline-block text-[11px] sm:text-[12px] font-medium text-muted-foreground bg-secondary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">À venir</span>
              </div>
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-border/50 bg-background sm:col-span-2 md:col-span-1">
                <div className="text-4xl sm:text-5xl font-serif font-light mb-4 sm:mb-6 text-muted-foreground/30">03</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Intégration</h3>
                <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed mb-3 sm:mb-4">Bienvenue dans l'équipe Aix Finance Club !</p>
                <span className="inline-block text-[11px] sm:text-[12px] font-medium text-muted-foreground bg-secondary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">À venir</span>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="w-full max-w-3xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                Candidature
              </span>
              <h2 className="font-serif font-medium text-foreground">Formulaire de candidature</h2>
            </div>
            <div className="p-5 sm:p-8 lg:p-12 rounded-xl sm:rounded-2xl bg-background border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-6">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="prenom" className="text-[13px]">
                        Prénom <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="prenom"
                        required
                        className="h-12 rounded-xl"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      />
                    </div>
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
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Label htmlFor="telephone" className="text-[13px]">
                      Téléphone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="telephone"
                      type="tel"
                      required
                      className="h-12 rounded-xl"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Formation</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="universite" className="text-[13px]">
                        Université / Formation <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="universite"
                        required
                        className="h-12 rounded-xl"
                        placeholder="Ex: Université d'Aix-Marseille - Master Finance"
                        value={formData.universite}
                        onChange={(e) => setFormData({ ...formData, universite: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="annee" className="text-[13px]">
                        Année d'études <span className="text-destructive">*</span>
                      </Label>
                      <select
                        id="annee"
                        required
                        className="w-full h-12 rounded-xl border border-input bg-background px-4 text-[15px]"
                        value={formData.annee}
                        onChange={(e) => setFormData({ ...formData, annee: e.target.value })}
                      >
                        <option value="">Sélectionner</option>
                        <option value="L1">Licence 1</option>
                        <option value="L2">Licence 2</option>
                        <option value="L3">Licence 3</option>
                        <option value="M1">Master 1</option>
                        <option value="M2">Master 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Pôle(s) souhaité(s) <span className="text-destructive">*</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {poles.map((pole) => (
                      <label key={pole} className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded"
                          checked={formData.poles.includes(pole)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, poles: [...formData.poles, pole] })
                            } else {
                              setFormData({ ...formData, poles: formData.poles.filter((p) => p !== pole) })
                            }
                          }}
                        />
                        <span className="text-[15px] text-foreground">{pole}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disponibilites" className="text-[13px]">
                    Créneaux d'entretien disponibles <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="disponibilites"
                    required
                    className="w-full h-12 rounded-xl border border-input bg-background px-4 text-[15px]"
                    value={formData.disponibilites}
                    onChange={(e) => setFormData({ ...formData, disponibilites: e.target.value })}
                  >
                    <option value="">Sélectionner un créneau</option>
                    <option value="Lundi 27 Janvier de 9h à 13h">Lundi 27 Janvier de 9h à 13h</option>
                    <option value="Mardi 28 Janvier de 13h à 17h">Mardi 28 Janvier de 13h à 17h</option>
                    <option value="Jeudi 30 Janvier de 15h à 17h30">Jeudi 30 Janvier de 15h à 17h30</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-[13px]">
                      Lettre de motivation <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="motivation"
                      required
                      rows={8}
                      className="rounded-xl"
                      placeholder="Expliquez-nous vos motivations pour rejoindre Aix Finance Club..."
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-[13px]">Profil LinkedIn (optionnel)</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    className="h-12 rounded-xl"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>

                <div className="pt-6">
                  <Button type="submit" size="lg" className="w-full rounded-full py-6 text-[15px] font-medium">
                    Envoyer ma candidature
                  </Button>
                  <p className="text-[13px] text-muted-foreground text-center mt-4">
                    Votre client email va s'ouvrir. N'oubliez pas de joindre votre CV avant d'envoyer.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
