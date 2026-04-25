"use client"

import { useState, useEffect, useCallback } from "react"
import { getPublications, createPublication, updatePublication, deletePublication } from "@/app/admin/actions"
import { Plus, Pencil, Trash2, X, Loader2, FileText, Layers, ExternalLink } from "lucide-react"
import { MultiImageUploader } from "./multi-image-uploader"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Publication {
  id: string
  title: string
  description: string | null
  type: string | null
  category: string | null
  content: string | null
  author: string | null
  read_time: string | null
  cover_image: string | null
  slides: string[]
  tags: string[] | null
  published_at: string
  created_at: string
}

export function PublicationsManager() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPub, setEditingPub] = useState<Publication | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [slides, setSlides] = useState<string[]>([])
  const [pubType, setPubType] = useState<"article" | "carousel">("carousel")

  const fetchPublications = useCallback(async () => {
    setLoading(true)
    const result = await getPublications()
    if (result.data) setPublications(result.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPublications()
  }, [fetchPublications])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    formData.set('slides', JSON.stringify(slides))
    formData.set('type', pubType)

    // Handle tags
    const tagsInput = formData.get('tags') as string
    if (tagsInput) {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      formData.set('tags', JSON.stringify(tags))
    } else {
      formData.set('tags', JSON.stringify([]))
    }

    const result = editingPub
      ? await updatePublication(editingPub.id, formData)
      : await createPublication(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setShowForm(false)
      setEditingPub(null)
      setSlides([])
      setPubType("carousel")
      await fetchPublications()
    }
    setSubmitting(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette publication ?")) return
    const result = await deletePublication(id)
    if (result.error) {
      setError(result.error)
    } else {
      await fetchPublications()
    }
  }

  function openEdit(pub: Publication) {
    setEditingPub(pub)
    setSlides(pub.slides || [])
    setPubType(pub.type === "article" ? "article" : "carousel")
    setShowForm(true)
    setError("")
  }

  function openCreate() {
    setEditingPub(null)
    setSlides([])
    setPubType("carousel")
    setShowForm(true)
    setError("")
  }

  function closeForm() {
    setShowForm(false)
    setEditingPub(null)
    setSlides([])
    setPubType("carousel")
    setError("")
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
          <h2 className="text-xl font-semibold text-foreground">Publications</h2>
          <p className="text-sm text-muted-foreground mt-1">{publications.length} publication(s)</p>
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
          <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
              <h3 className="text-lg font-semibold text-foreground">
                {editingPub ? "Modifier la publication" : "Nouvelle publication"}
              </h3>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Type Selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type de publication *</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPubType("carousel")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                      pubType === "carousel"
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-secondary text-foreground border-border hover:border-accent/50"
                    )}
                  >
                    <Layers className="w-4 h-4" />
                    Carousel
                  </button>
                  <button
                    type="button"
                    onClick={() => setPubType("article")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                      pubType === "article"
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-secondary text-foreground border-border hover:border-accent/50"
                    )}
                  >
                    <FileText className="w-4 h-4" />
                    Article
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Titre *</label>
                  <input
                    name="title"
                    defaultValue={editingPub?.title || ""}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Auteur</label>
                  <input
                    name="author"
                    defaultValue={editingPub?.author || ""}
                    placeholder="Nom de l'auteur"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Temps de lecture</label>
                  <input
                    name="read_time"
                    defaultValue={editingPub?.read_time || ""}
                    placeholder="ex: 5 min"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingPub?.description || ""}
                  rows={2}
                  placeholder="Résumé ou introduction de la publication"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Catégorie</label>
                  <input
                    name="category"
                    defaultValue={editingPub?.category || ""}
                    placeholder="ex: Focus Entreprise"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Date de publication</label>
                  <input
                    name="published_at"
                    type="date"
                    defaultValue={editingPub?.published_at?.split('T')[0] || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Image de couverture</label>
                <input
                  name="cover_image"
                  defaultValue={editingPub?.cover_image || ""}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <p className="text-xs text-muted-foreground mt-1">URL de l'image hero (format 16:9 recommandé)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Tags</label>
                <input
                  name="tags"
                  defaultValue={editingPub?.tags?.join(', ') || ""}
                  placeholder="Finance, M&A, Tech (séparés par des virgules)"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              {/* Conditional Fields based on Type */}
              {pubType === "article" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Contenu de l'article (HTML)
                  </label>
                  <textarea
                    name="content"
                    defaultValue={editingPub?.content || ""}
                    rows={10}
                    placeholder="<h2>Introduction</h2><p>Votre contenu ici...</p>"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y font-mono text-xs"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    HTML supporté : h2, h3, h4, p, strong, em, a, ul, ol, li, blockquote, code, img
                  </p>
                </div>
              )}

              {pubType === "carousel" && (
                <MultiImageUploader 
                  onUploadUrls={setSlides}
                  currentUrls={slides}
                  label="Slides du carousel"
                />
              )}

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
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 px-4 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Enregistrement..." : editingPub ? "Modifier" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publications Table */}
      {publications.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground mb-4">Aucune publication pour le moment</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Créer la première
          </button>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Publication</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub) => {
                const isCarousel = pub.type === "carousel" || (pub.slides?.length > 0 && !pub.content)
                return (
                  <tr key={pub.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {pub.cover_image || pub.slides?.[0] ? (
                          <img 
                            src={pub.cover_image || pub.slides?.[0]} 
                            alt="" 
                            className="w-12 h-12 rounded-lg object-cover bg-secondary"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                            {isCarousel ? <Layers className="w-5 h-5 text-muted-foreground" /> : <FileText className="w-5 h-5 text-muted-foreground" />}
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-foreground block truncate">{pub.title}</span>
                          {pub.author && (
                            <span className="text-xs text-muted-foreground">{pub.author}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium",
                        isCarousel ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
                      )}>
                        {isCarousel ? (
                          <>
                            <Layers className="w-3 h-3" />
                            Carousel
                          </>
                        ) : (
                          <>
                            <FileText className="w-3 h-3" />
                            Article
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{pub.category || "-"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        {new Date(pub.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/publications/${pub.id}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Voir"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEdit(pub)}
                          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pub.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
