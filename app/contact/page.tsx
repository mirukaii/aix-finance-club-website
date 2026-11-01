"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"

const field = "w-full border border-[#dcd8cf] bg-white px-4 text-[15px] text-[#141414] outline-none transition-colors focus:border-[#141414]"
const labelCls = "mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]"

const REASONS = [
  { n: "01", title: "Visibilité ciblée", text: "Accès direct à des étudiants motivés et passionnés par la finance." },
  { n: "02", title: "Recrutement", text: "Identifier et rencontrer les futurs talents de votre organisation." },
  { n: "03", title: "Impact formation", text: "Contribuer à la formation de la prochaine génération de professionnels." },
]

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

    setTimeout(() => {
      setSubmitted(true)
    }, 1000)
  }

  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <PageHeader label="Contact" title="Partenariats & Contact" intro="Développons ensemble des synergies pour former la prochaine génération de professionnels de la finance." />

        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end justify-between border-b border-[#141414] pb-3">
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Pourquoi nous soutenir</h2>
              <Link href="/partenaires" className="text-xs uppercase tracking-[0.15em] transition-colors hover:text-accent">Nos partenaires →</Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {REASONS.map((r) => (
                <div key={r.n} className="border-t border-[#dcd8cf] pt-6">
                  <p className="text-xs tracking-[0.2em] text-[#6b6b66]">{r.n}</p>
                  <h3 className="mt-3 font-serif text-2xl">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a4a46]">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 border-t border-[#141414] pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Coordonnées</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">Nous contacter</h2>
              <ul className="mt-8 divide-y divide-[#dcd8cf] border-y border-[#dcd8cf]">
                <li>
                  <Link href="mailto:aixfinanceclub@gmail.com" className="group flex flex-wrap items-center justify-between gap-2 py-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b66]">Email</span>
                    <span className="underline-offset-4 group-hover:underline">aixfinanceclub@gmail.com</span>
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com/aixfinanceclub" target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-center justify-between gap-2 py-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b66]">Instagram</span>
                    <span className="underline-offset-4 group-hover:underline">@aixfinanceclub</span>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/aix-finance-club" target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-center justify-between gap-2 py-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b66]">LinkedIn</span>
                    <span className="underline-offset-4 group-hover:underline">Aix Finance Club</span>
                  </Link>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-2 py-5">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b66]">Campus</span>
                  <span>Université d&apos;Aix-Marseille, Campus Pauliane, Aix-en-Provence</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Message</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">Envoyer un message</h2>

              {submitted ? (
                <div className="mt-8 border border-[#dcd8cf] bg-white p-8 sm:p-12">
                  <h3 className="font-serif text-2xl">Message envoyé</h3>
                  <p className="mt-3 text-[#4a4a46]">Nous vous répondrons dans les plus brefs délais.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-8 border border-[#141414] px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Envoyer un autre message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="nom" className={labelCls}>Nom *</label>
                    <input id="nom" required className={`${field} h-12`} value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>Email *</label>
                    <input id="email" type="email" required className={`${field} h-12`} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="objet" className={labelCls}>Objet *</label>
                    <select id="objet" required className={`${field} h-12`} value={formData.objet} onChange={(e) => setFormData({ ...formData, objet: e.target.value })}>
                      <option value="">Sélectionner</option>
                      <option value="partenariat">Opportunité de partenariat</option>
                      <option value="evenement">Organisation d&apos;événement</option>
                      <option value="question">Question générale</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className={labelCls}>Message *</label>
                    <textarea id="message" required rows={6} placeholder="Votre message..." className={`${field} py-3`} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" className="w-full bg-[#141414] py-4 text-xs uppercase tracking-[0.2em] text-[#f6f4ef] transition-colors hover:bg-[#2a2a2a]">Envoyer</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
