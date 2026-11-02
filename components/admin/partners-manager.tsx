'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react'
import { ImageUploader } from './image-uploader'

interface Partner {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  category: string | null
  partnership_description: string | null
  display_order: number | null
  created_at: string
}

const CATEGORY_SUGGESTIONS = [
  'Banque',
  'Association',
  'Partenaire Officiel',
  'Partenaire Académique',
  'Partenaire Média',
  'Partenaire Stratégique',
]

const inputCls =
  'w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50'

export function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  const fetchPartners = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/partners')
      const { data } = await response.json()
      setPartners(data || [])
    } catch (err) {
      console.error('Error fetching partners:', err)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPartners()
  }, [fetchPartners])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    formData.set('logo_url', logoUrl)

    const method = editingPartner ? 'PUT' : 'POST'
    const url = editingPartner ? `/api/partners/${editingPartner.id}` : '/api/partners'

    try {
      const response = await fetch(url, { method, body: formData })
      if (!response.ok) {
        let message = "Erreur lors de l'enregistrement"
        try {
          const json = await response.json()
          if (json?.error) message = json.error
        } catch {
          // réponse sans JSON
        }
        throw new Error(message)
      }
      closeForm()
      await fetchPartners()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce partenaire ?')) return
    try {
      const response = await fetch(`/api/partners/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Suppression impossible')
      await fetchPartners()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Suppression impossible')
    }
  }

  function openNew() {
    setEditingPartner(null)
    setLogoUrl('')
    setError('')
    setShowForm(true)
  }

  function openEdit(partner: Partner) {
    setEditingPartner(partner)
    setLogoUrl(partner.logo_url || '')
    setError('')
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingPartner(null)
    setLogoUrl('')
    setError('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Partenaires</h2>
          <p className="text-sm text-muted-foreground mt-1">{partners.length} partenaire(s)</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
              <h3 className="text-lg font-semibold text-foreground">
                {editingPartner ? 'Modifier le partenaire' : 'Nouveau partenaire'}
              </h3>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground" aria-label="Fermer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nom *</label>
                <input name="name" defaultValue={editingPartner?.name || ''} required className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Catégorie</label>
                <input name="category" list="partner-categories" defaultValue={editingPartner?.category || ''} placeholder="Ex : Banque, Association" className={inputCls} />
                <datalist id="partner-categories">
                  {CATEGORY_SUGGESTIONS.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <ImageUploader onUpload={setLogoUrl} currentImageUrl={logoUrl} label="Logo" />

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description du partenariat</label>
                <p className="text-xs text-muted-foreground mb-2">Pourquoi ce partenariat, ce qu&apos;il apporte aux membres. Affiché sur la page Partenaires.</p>
                <textarea name="partnership_description" rows={5} defaultValue={editingPartner?.partnership_description || ''} className={`${inputCls} resize-y`} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Site web</label>
                <input name="website_url" defaultValue={editingPartner?.website_url || ''} placeholder="https://..." className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Ordre d&apos;affichage</label>
                <input name="display_order" type="number" min={0} defaultValue={editingPartner?.display_order ?? partners.length + 1} className={inputCls} />
              </div>

              {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 py-2.5 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary">
                  Annuler
                </button>
                <button type="submit" disabled={submitting} className="flex-1 py-2.5 px-4 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-50">
                  {submitting ? 'Enregistrement...' : editingPartner ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!showForm && error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      {partners.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">Aucun partenaire pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all">
              {partner.logo_url && <img src={partner.logo_url} alt={partner.name} className="h-16 object-contain mb-4" />}
              <h3 className="font-semibold text-foreground mb-1">{partner.name}</h3>
              {partner.category && <p className="text-sm text-muted-foreground mb-2">{partner.category}</p>}
              {partner.partnership_description ? (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{partner.partnership_description}</p>
              ) : (
                <p className="text-xs text-muted-foreground/60 mb-4">Aucune description</p>
              )}
              <div className="flex gap-2">
                <button onClick={() => openEdit(partner)} className="flex-1 p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground" aria-label="Modifier">
                  <Pencil className="w-4 h-4 mx-auto" />
                </button>
                <button onClick={() => handleDelete(partner.id)} className="flex-1 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive" aria-label="Supprimer">
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
