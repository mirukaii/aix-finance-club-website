'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updatePageContent } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Eye, Save, X } from 'lucide-react'

interface PageContent {
  id: string
  page_name: string
  content: Record<string, any>
  updated_at: string
}

const EDITABLE_PAGES = [
  'home',
  'about',
  'mission',
  'resources',
  'contact',
  'footer',
  'navigation'
]

export function PagesManager() {
  const [pages, setPages] = useState<PageContent[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPage, setEditingPage] = useState<PageContent | null>(null)
  const [jsonContent, setJsonContent] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    fetchPages()
  }, [])

  async function fetchPages() {
    const supabase = createClient()
    const { data } = await supabase
      .from('page_content')
      .select('*')
      .order('page_name', { ascending: true })

    if (data) {
      setPages(data)
    }
    setLoading(false)
  }

  async function handleSave() {
    setError('')
    setSaving(true)
    
    if (!editingPage) return

    try {
      const content = JSON.parse(jsonContent)
      
      const result = await updatePageContent(editingPage.id, content)

      if (result.error) {
        setError(result.error)
        setSaving(false)
        return
      }

      setEditingPage(null)
      setJsonContent('')
      setSaving(false)
      fetchPages()
    } catch (e) {
      setError('Format JSON invalide')
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Chargement...</div>
  }

  if (editingPage) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Modifier: {editingPage.page_name}</h2>
          <button
            onClick={() => {
              setEditingPage(null)
              setJsonContent('')
            }}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Contenu JSON</label>
          <textarea
            value={jsonContent}
            onChange={(e) => setJsonContent(e.target.value)}
            className="w-full h-96 p-4 font-mono text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Entrez le contenu JSON..."
          />
          <p className="text-xs text-muted-foreground mt-2">
            Dernière mise à jour: {new Date(editingPage.updated_at).toLocaleString('fr-FR')}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          <Button
            onClick={() => setPreviewOpen(!previewOpen)}
            variant="outline"
          >
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
        </div>

        {previewOpen && jsonContent && (
          <div className="p-6 bg-secondary rounded-lg border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Aperçu JSON</h3>
            <pre className="text-xs text-muted-foreground overflow-auto max-h-96 bg-background p-4 rounded border border-border">
              {JSON.stringify(JSON.parse(jsonContent || '{}'), null, 2)}
            </pre>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Pages</h2>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border hover:border-foreground/20 transition-colors"
          >
            <div>
              <h3 className="font-medium text-foreground capitalize mb-1">{page.page_name}</h3>
              <p className="text-sm text-muted-foreground">
                Modifié: {new Date(page.updated_at).toLocaleString('fr-FR')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setEditingPage(page)
                  setJsonContent(JSON.stringify(page.content, null, 2))
                }}
                size="sm"
                variant="outline"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
