'use client'

import { useState } from 'react'

interface JobPosition {
  id: string
  title: string
  department: string
  is_open: boolean
}

interface InterviewSlot {
  id: string
  label: string
  is_active: boolean
}

export default function CandidaturesClient({ positions, slots }: { positions: JobPosition[], slots: InterviewSlot[] }) {
  const [formData, setFormData] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    universite: '', annee: '', poles: [] as string[],
    disponibilites: '', motivation: '', linkedin: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.poles.length === 0) { alert('Veuillez sélectionner au moins un poste'); return }
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
Poste(s) : ${formData.poles.join(', ')}
Créneau d'entretien : ${formData.disponibilites}${formData.linkedin ? `\nLinkedIn : ${formData.linkedin}` : ''}

────────────────────────
MOTIVATION
────────────────────────
${formData.motivation}

Cordialement,
${formData.prenom} ${formData.nom}

CV à joindre obligatoirement (format PDF).`

    window.open(`mailto:aixfinanceclub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self')
  }

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 block">Candidature</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">Formulaire de candidature</h2>
        </div>
        <div className="p-8 lg:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div>
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6">Informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { id: 'prenom', label: 'Prénom', type: 'text' },
                  { id: 'nom', label: 'Nom', type: 'text' },
                  { id: 'email', label: 'Email', type: 'email' },
                  { id: 'telephone', label: 'Téléphone', type: 'tel' },
                ].map(field => (
                  <div key={field.id}>
                    <label className="block text-sm text-white/50 mb-2">{field.label} <span className="text-red-400">*</span></label>
                    <input
                      type={field.type}
                      required
                      value={formData[field.id as keyof typeof formData] as string}
                      onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/40 placeholder:text-white/20 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6">Formation</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Université / Formation <span className="text-red-400">*</span></label>
                  <input type="text" required placeholder="Ex: Université d'Aix-Marseille — Master Finance" value={formData.universite} onChange={e => setFormData({ ...formData, universite: e.target.value })} className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-white/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Année d'études <span className="text-red-400">*</span></label>
                  <select required value={formData.annee} onChange={e => setFormData({ ...formData, annee: e.target.value })} className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all">
                    <option value="" className="bg-[#1a1a1a]">Sélectionner</option>
                    <option value="L1" className="bg-[#1a1a1a]">Licence 1</option>
                    <option value="L2" className="bg-[#1a1a1a]">Licence 2</option>
                    <option value="L3" className="bg-[#1a1a1a]">Licence 3</option>
                    <option value="M1" className="bg-[#1a1a1a]">Master 1</option>
                    <option value="M2" className="bg-[#1a1a1a]">Master 2</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6">
                Poste(s) souhaité(s) <span className="text-red-400">*</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {positions.map(pos => (
                  <label key={pos.id} className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${formData.poles.includes(pos.title) ? 'border-accent/40 bg-accent/5' : 'border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02]'}`}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-blue-500"
                      checked={formData.poles.includes(pos.title)}
                      onChange={e => {
                        if (e.target.checked) setFormData({ ...formData, poles: [...formData.poles, pos.title] })
                        else setFormData({ ...formData, poles: formData.poles.filter(p => p !== pos.title) })
                      }}
                    />
                    <div>
                      <span className="text-sm text-white font-medium">{pos.title}</span>
                      <span className="block text-xs text-white/30">{pos.department}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {slots.length > 0 && (
              <div className="pt-6 border-t border-white/[0.06]">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6">
                  Créneau d'entretien <span className="text-red-400">*</span>
                </h3>
                <select required value={formData.disponibilites} onChange={e => setFormData({ ...formData, disponibilites: e.target.value })} className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all">
                  <option value="" className="bg-[#1a1a1a]">Sélectionner un créneau</option>
                  {slots.map(slot => <option key={slot.id} value={slot.label} className="bg-[#1a1a1a]">{slot.label}</option>)}
                </select>
              </div>
            )}

            <div className="pt-6 border-t border-white/[0.06]">
              <label className="block text-sm text-white/50 mb-2">Lettre de motivation <span className="text-red-400">*</span></label>
              <textarea required rows={8} placeholder="Expliquez-nous vos motivations pour rejoindre Aix Finance Club..." value={formData.motivation} onChange={e => setFormData({ ...formData, motivation: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-white/20 resize-y transition-all" />
            </div>

            <div>
              <label className="block text-sm text-white/50 mb-2">Profil LinkedIn (optionnel)</label>
              <input type="url" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-white/20 transition-all" />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full py-5 rounded-full bg-white text-black text-sm font-semibold tracking-wider uppercase hover:bg-white/90 hover:scale-[1.01] transition-all duration-300 shadow-2xl shadow-white/10">
                Envoyer ma candidature
              </button>
              <p className="text-xs text-white/30 text-center mt-4">Votre client email va s'ouvrir. N'oubliez pas de joindre votre CV avant d'envoyer.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
