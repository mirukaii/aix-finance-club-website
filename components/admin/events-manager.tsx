"use client"

import { useState, useEffect, useCallback } from "react"
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/app/admin/actions"
import { Plus, Pencil, Trash2, X, Loader2, Eye, Calendar, MapPin } from "lucide-react"
import { ImageUploader } from "./image-uploader"
import { PreviewModal } from "./preview-modal"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  description: string | null
  date: string
  time: string | null
  location: string | null
  image_url: string | null
  ticket_url: string | null
  category: string | null
  status: string
  created_at: string
}

export function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewData, setPreviewData] = useState<Partial<Event> | null>(null)

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    const result = await getEvents()
    if (result.data) setEvents(result.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    formData.set('image_url', imageUrl)

    const result = editingEvent
      ? await updateEvent(editingEvent.id, formData)
      : await createEvent(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setShowForm(false)
      setEditingEvent(null)
      setImageUrl("")
      await fetchEvents()
    }
    setSubmitting(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet evenement ?")) return
    const result = await deleteEvent(id)
    if (result.error) {
      setError(result.error)
    } else {
      await fetchEvents()
    }
  }

  function openEdit(event: Event) {
    setEditingEvent(event)
    setImageUrl(event.image_url || "")
    setShowForm(true)
    setError("")
  }

  function openCreate() {
    setEditingEvent(null)
    setImageUrl("")
    setShowForm(true)
    setError("")
  }

  function closeForm() {
    setShowForm(false)
    setEditingEvent(null)
    setImageUrl("")
    setError("")
  }

  function handlePreview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setPreviewData({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      image_url: imageUrl,
      ticket_url: formData.get("ticket_url") as string,
    })
    setPreviewOpen(true)
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
          <h2 className="text-xl font-semibold text-foreground">Evenements</h2>
          <p className="text-sm text-muted-foreground mt-1">{events.length} evenement(s)</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {editingEvent ? "Modifier l'evenement" : "Nouvel evenement"}
              </h3>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Titre *</label>
                <input
                  name="title"
                  defaultValue={editingEvent?.title || ""}
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingEvent?.description || ""}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Date *</label>
                  <input
                    name="date"
                    type="date"
                    defaultValue={editingEvent?.date || ""}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Heure</label>
                  <input
                    name="time"
                    type="time"
                    defaultValue={editingEvent?.time || ""}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Lieu</label>
                  <input
                    name="location"
                    defaultValue={editingEvent?.location || ""}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Catégorie</label>
                  <input
                    name="category"
                    defaultValue={editingEvent?.category || ""}
                    placeholder="ex: Conférence, Atelier..."
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>
              
              <ImageUploader 
                onUpload={setImageUrl}
                currentImageUrl={imageUrl}
                label="Image de l'evenement"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">URL des tickets</label>
                <input
                  name="ticket_url"
                  defaultValue={editingEvent?.ticket_url || ""}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Statut</label>
                <select
                  name="status"
                  defaultValue={editingEvent?.status || "upcoming"}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="upcoming">A venir</option>
                  <option value="past">Passe</option>
                </select>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handlePreview}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-accent/50 text-sm font-medium text-accent hover:bg-accent/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Aperçu
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 px-4 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Enregistrement..." : editingEvent ? "Modifier" : "Creer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewData && (
        <PreviewModal
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          title="Aperçu de l'événement"
          content={
            <div className="space-y-6">
              {previewData.image_url && (
                <div className="rounded-xl overflow-hidden">
                  <img src={previewData.image_url} alt={previewData.title} className="w-full h-64 object-cover" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{previewData.title}</h2>
                <div className="space-y-2 text-muted-foreground mb-6">
                  {previewData.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(previewData.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                        {previewData.time ? ` à ${previewData.time}` : ""}
                      </span>
                    </div>
                  )}
                  {previewData.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{previewData.location}</span>
                    </div>
                  )}
                </div>
                {previewData.description && (
                  <p className="text-foreground mb-6 leading-relaxed">{previewData.description}</p>
                )}
                {previewData.ticket_url && (
                  <a 
                    href={previewData.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                  >
                    Réserver ma place
                  </a>
                )}
              </div>
            </div>
          }
        />
      )}

      {/* Events Table */}
      {events.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground mb-4">Aucun evenement pour le moment</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Creer le premier
          </button>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Titre</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Lieu</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-foreground">{event.title}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{event.location || "-"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex px-2 py-1 rounded-md text-xs font-medium",
                      event.status === "upcoming"
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {event.status === "upcoming" ? "A venir" : "Passe"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(event)}
                        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Modifier"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
