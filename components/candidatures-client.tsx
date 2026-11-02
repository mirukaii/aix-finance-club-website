"use client"

import Link from "next/link"
import { useState } from "react"

interface JobPosition {
  id: string
  title: string
  department: string
}

interface InterviewSlot {
  id: string
  label: string
}

const input = "h-12 w-full border border-[#dcd8cf] bg-white px-4 text-[15px] text-[#141414] outline-none transition-colors placeholder:text-[#9a968c] focus:border-[#141414]"
const lab = "mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]"
const group = "mb-6 text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]"

const PERSONAL = [
  { id: "prenom", label: "Prénom", type: "text" },
  { id: "nom", label: "Nom", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "telephone", label: "Téléphone", type: "tel" },
] as const

const YEARS = [
  { v: "L1", l: "Licence 1" },
  { v: "L2", l: "Licence 2" },
  { v: "L3", l: "Licence 3" },
  { v: "M1", l: "Master 1" },
  { v: "M2", l: "Master 2" },
]

export default function CandidaturesClient({ positions, slots }: { positions: JobPosition[]; slots: InterviewSlot[] }) {
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
      alert("Veuillez sélectionner au moins un poste")
      return
    }
    const subject = `Candidature – Aix Finance Club | ${formData.prenom} ${formData.nom}`
    const body = `Madame, Monsieur,

Je vous adresse ma candidature pour rejoindre Aix Finance Club.

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
Poste(s) : ${formData.poles.join(", ")}
Créneau d'entretien : ${formData.disponibilites}${formData.linkedin ? `\nLinkedIn : ${formData.linkedin}` : ""}

────────────────────────
MOTIVATION
────────────────────────
${formData.motivation}

Cordialement,
${formData.prenom} ${formData.nom}

CV à joindre obligatoirement (format PDF).`
    window.open(`mailto:aixfinanceclub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self")
  }

  const togglePole = (title: string, checked: boolean) =>
    setFormData({ ...formData, poles: checked ? [...formData.poles, title] : formData.poles.filter((p) => p !== title) })

  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
      <div className="mx-auto max-w-[1400px] border-t border-[#141414] pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Candidature</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">Formulaire de candidature</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#4a4a46]">Votre messagerie s&apos;ouvrira avec vos informations. N&apos;oubliez pas de joindre votre CV en PDF avant d&apos;envoyer.</p>
          </div>

          {positions.length === 0 ? (
            <div className="lg:col-span-8">
              <p className="text-lg text-[#4a4a46]">Aucun poste n&apos;est ouvert pour le moment.</p>
              <Link href="mailto:aixfinanceclub@gmail.com" className="mt-6 inline-block border border-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Nous écrire</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12 lg:col-span-8">
              <div>
                <p className={group}>Informations personnelles</p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {PERSONAL.map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className={lab}>{f.label} *</label>
                      <input id={f.id} type={f.type} required className={input} value={formData[f.id]} onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className={group}>Formation</p>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="universite" className={lab}>Université / Formation *</label>
                    <input id="universite" required placeholder="Ex : Université d'Aix-Marseille, Master Finance" className={input} value={formData.universite} onChange={(e) => setFormData({ ...formData, universite: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="annee" className={lab}>Année d&apos;études *</label>
                    <select id="annee" required className={input} value={formData.annee} onChange={(e) => setFormData({ ...formData, annee: e.target.value })}>
                      <option value="">Sélectionner</option>
                      {YEARS.map((y) => (
                        <option key={y.v} value={y.v}>{y.l}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p className={group}>Poste(s) souhaité(s) *</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {positions.map((pos) => (
                    <label key={pos.id} className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${formData.poles.includes(pos.title) ? "border-[#141414] bg-white" : "border-[#dcd8cf] hover:border-[#141414]"}`}>
                      <input type="checkbox" className="mt-1 h-4 w-4 accent-[#141414]" checked={formData.poles.includes(pos.title)} onChange={(e) => togglePole(pos.title, e.target.checked)} />
                      <span>
                        <span className="block text-[15px] text-[#141414]">{pos.title}</span>
                        <span className="block text-xs text-[#6b6b66]">{pos.department}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {slots.length > 0 && (
                <div>
                  <p className={group}>Créneau d&apos;entretien *</p>
                  <select required className={input} value={formData.disponibilites} onChange={(e) => setFormData({ ...formData, disponibilites: e.target.value })}>
                    <option value="">Sélectionner un créneau</option>
                    {slots.map((s) => (
                      <option key={s.id} value={s.label}>{s.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="motivation" className={lab}>Lettre de motivation *</label>
                <textarea id="motivation" required rows={8} placeholder="Expliquez-nous vos motivations pour rejoindre Aix Finance Club..." className="w-full border border-[#dcd8cf] bg-white px-4 py-3 text-[15px] text-[#141414] outline-none transition-colors placeholder:text-[#9a968c] focus:border-[#141414]" value={formData.motivation} onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} />
              </div>

              <div>
                <label htmlFor="linkedin" className={lab}>Profil LinkedIn (optionnel)</label>
                <input id="linkedin" type="url" placeholder="https://linkedin.com/in/..." className={input} value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
              </div>

              <button type="submit" className="w-full bg-[#141414] py-4 text-xs uppercase tracking-[0.2em] text-[#f6f4ef] transition-colors hover:bg-[#2a2a2a]">Envoyer ma candidature</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
