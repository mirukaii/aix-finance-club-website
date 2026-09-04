'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Loader2, Calendar, Briefcase } from 'lucide-react'

interface JobPosition {
  id: string
  title: string
  department: string
  description: string | null
  responsibilities: string | null
  is_open: boolean
  display_order: number
}

interface InterviewSlot {
  id: string
  label: string
  date_start: string
  date_end: string
  is_active: boolean
  display_order: number
}

const DEPARTMENTS = [
  'Direction Générale',
  'Trésorerie',
  'Partenariats & Sponsoring',
  'Communication & Content',
  'Secrétariat & Administration',
]

export function CandidaturesManager() {
  const [activeTab, setActiveTab] = useState<'positions' | 'slots'>('positions')
  const [positions, setPositions] = useState<JobPosition[]>([])
  const [slots, setSlots] = useState<InterviewSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null)
  const [editingSlot, setEditingSlot] = useState<InterviewSlot | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [posRes, slotRes] = await Promise.all([
        fetch('/api/job-positions'),
        fetch('/api/interview-slots'),
      ])
      const { data: posData } = await posRes.json()
      const { data: slotData } = await slotRes.json()
      setPositions(posData || [])
      setSlots(slotData || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleSubmitPosition(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const body = {
      title: fd.get('title'),
      department: fd.get('department'),
      description: fd.get('description'),
      responsibilities: fd.get('responsibilities'),
      is_open: fd.get('is_open') === 'true',
      display_order: parseInt(fd.get('display_order') as string) || 0,
    }
    const method = editingPosition ? 'PUT' : 'POST'
    const url = editingPosition ? `/api/job-positions/${editingPosition.id}` : '/api/job-positions'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Erreur lors de la sauvegarde')
      closeForm()
      await fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setSubmitting(false)
    }
  }

  async function deletePosition(id: string) {
    if (!confirm('Supprimer ce poste ?')) return
    await fetch(`/api/job-positions/${id}`, { method: 'DELETE' })
    await fetchData()
  }

  async function handleSubmitSlot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const body = {
      label: fd.get('label'),
      date_start: new Date(fd.get('date_start') as string).toISOString(),
      date_end: new Date(fd.get('date_end') as string).toISOString(),
      is_active: fd.get('is_active') === 'true',
      display_order: parseInt(fd.get('display_order') as string) || 0,
    }
    const method = editingSlot ? 'PUT' : 'POST'
    const url = editingSlot ? `/api/interview-slots/${editingSlot.id}` : '/api/interview-slots'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Erreur lors de la sauvegarde')
      closeForm()
      await fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setSubmitting(false)
    }
  }

  async function deleteSlot(id: string) {
    if (!confirm('Supprimer ce créneau ?')) return
    await fetch(`/api/interview-slots/${id}`, { method: 'DELETE' })
    await fetchData()
  }

  function closeForm() {
    setShowForm(false)
    setEditingPosition(null)
    setEditingSlot(null)
    setError('')
  }

  function formatDate(iso: string) {
    if (!iso) return ''
    return new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  function toLocalInput(iso?: string) {
    if (!iso) return ''
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Candidatures</h2>
          <p className="text-sm text-muted-foreground mt-1">{positions.length} poste(s) · {slots.length} créneau(x)</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      <div className="flex gap-1 mb-8 p-1 bg-secondary rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('positions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'positions' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Briefcase className="w-4 h-4" />
          Postes ({positions.length})
        </button>
        <button
          onClick={() => setActiveTab('slots')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'slots' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Calendar className="w-4 h-4" />
          Créneaux ({slots.length})
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
              <h3 className="text-lg font-semibold text-foreground">
                {activeTab === 'positions'
                  ? (editingPosition ? 'Modifier le poste' : 'Nouveau poste')
                  : (editingSlot ? 'Modifier le créneau' : 'Nouveau créneau')}
              </h3>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeTab === 'positions' && (
              <form onSubmit={handleSubmitPosition} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Intitulé du poste *</label>
                  <input name="title" defaultValue={editingPosition?.title || ''} required placeholder="Ex: Vice-Président 2" className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Département *</label>
                  <select name="department" defaultValue={editingPosition?.department || ''} required className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
                    <option value="">Sélectionner</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                  <textarea name="description" defaultValue={editingPosition?.description || ''} rows={3} placeholder="Description courte du poste..." className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Responsabilités</label>
                  <textarea name="responsibilities" defaultValue={editingPosition?.responsibilities || ''} rows={4} placeholder="Liste des responsabilités..." className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Statut</label>
                  <select name="is_open" defaultValue={editingPosition ? String(editingPosition.is_open) : 'true'} className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
                    <option value="true">✅ Poste ouvert</option>
                    <option value="false">❌ Poste fermé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Ordre d'affichage</label>
                  <input name="display_order" type="number" defaultValue={editingPosition?.display_order ?? positions.length + 1} min={0} className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeForm} className="flex-1 py-2.5 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary">Annuler</button>
                  <button type="submit" disabled={submitting} className="flex-1 py-2.5 px-4 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-50">
                    {submitting ? 'Enregistrement...' : editingPosition ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'slots' && (
              <form onSubmit={handleSubmitSlot} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Libellé du créneau *</label>
                  <input name="label" defaultValue={editingSlot?.label || ''} required placeholder="Ex: Lundi 27 Janvier de 9h à 13h" className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Début *</label>
                    <input name="date_start" type="datetime-local" defaultValue={toLocalInput(editingSlot?.date_start)} required className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Fin *</label>
                    <input name="date_end" type="datetime-local" defaultValue={toLocalInput(editingSlot?.date_end)} required className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Statut</label>
                  <select name="is_active" defaultValue={editingSlot ? String(editingSlot.is_active) : 'true'} className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
                    <option value="true">✅ Créneau actif</option>
                    <option value="false">❌ Créneau désactivé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Ordre d'affichage</label>
                  <input name="display_order" type="number" defaultValue={editingSlot?.display_order ?? slots.length + 1} min={0} className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeForm} className="flex-1 py-2.5 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary">Annuler</button>
                  <button type="submit" disabled={submitting} className="flex-1 py-2.5 px-4 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-50">
                    {submitting ? 'Enregistrement...' : editingSlot ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {activeTab === 'positions' && (
        <div className="space-y-3">
          {positions.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground">Aucun poste</p>
            </div>
          ) : positions.map(pos => (
            <div key={pos.id} className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-accent/30 transition-all">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${pos.is_open ? 'bg-green-500' : 'bg-red-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground">{pos.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${pos.is_open ? 'bg-green-500/10 text-green-500' : 'bg-red-400/10 text-red-400'}`}>
                    {pos.is_open ? 'Ouvert' : 'Fermé'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{pos.department}</p>
                {pos.description && <p className="text-xs text-muted-foreground/60 mt-1 line-clamp-1">{pos.description}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditingPosition(pos); setShowForm(true) }} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => deletePosition(pos.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'slots' && (
        <div className="space-y-3">
          {slots.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground">Aucun créneau</p>
            </div>
          ) : slots.map(slot => (
            <div key={slot.id} className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-accent/30 transition-all">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${slot.is_active ? 'bg-green-500' : 'bg-red-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground">{slot.label}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${slot.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-400/10 text-red-400'}`}>
                    {slot.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{formatDate(slot.date_start)} → {formatDate(slot.date_end)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditingSlot(slot); setShowForm(true) }} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => deleteSlot(slot.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
