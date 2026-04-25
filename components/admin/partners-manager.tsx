'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react'
import { ImageUploader } from './image-uploader'

interface Partner {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  category: string
  created_at: string
}

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
      const response = await fetch(url, {
        method,
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to save partner')

      setShowForm(false)
      setEditingPartner(null)
      setLogoUrl('')
      await fetchPartners()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving partner')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this partner?')) return
    try {
      const response = await fetch(`/api/partners/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete')
      await fetchPartners()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting partner')
    }
  }

  function openEdit(partner: Partner) {
    setEditingPartner(partner)
    setLogoUrl(partner.logo_url || '')
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
          <h2 className="text-xl font-semibold text-foreground">Partners</h2>
          <p className="text-sm text-muted-foreground mt-1">{partners.length} partner(s)</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
              <h3 className="text-lg font-semibold text-foreground">
                {editingPartner ? 'Edit Partner' : 'New Partner'}
              </h3>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                <input
                  name="name"
                  defaultValue={editingPartner?.name || ''}
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                <input
                  name="category"
                  defaultValue={editingPartner?.category || ''}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <ImageUploader onUpload={setLogoUrl} currentImageUrl={logoUrl} label="Logo" />

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Website URL</label>
                <input
                  name="website_url"
                  defaultValue={editingPartner?.website_url || ''}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 px-4 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingPartner ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {partners.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground mb-4">No partners yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all">
              {partner.logo_url && (
                <img src={partner.logo_url} alt={partner.name} className="h-16 object-contain mb-4" />
              )}
              <h3 className="font-semibold text-foreground mb-2">{partner.name}</h3>
              {partner.category && <p className="text-sm text-muted-foreground mb-4">{partner.category}</p>}
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(partner)}
                  className="flex-1 p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="flex-1 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                >
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
