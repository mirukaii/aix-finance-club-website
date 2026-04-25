'use client'

import { useState, useEffect, useCallback } from 'react'
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '@/app/admin/actions'
import { Plus, Pencil, Trash2, X, Loader2, Linkedin } from 'lucide-react'
import { ImageUploader } from './image-uploader'
import { cn } from '@/lib/utils'

interface TeamMember {
  id: string
  first_name: string
  last_name: string
  role: string
  photo_url: string | null
  linkedin_url: string | null
  display_order: number
  created_at: string
}

export function TeamMembersManager() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: '',
    linkedin_url: '',
    display_order: 0,
  })

  const fetchMembers = useCallback(async () => {
    setLoading(true)
    const result = await getTeamMembers()
    if (result.data) setMembers(result.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const payload = new FormData()
    payload.append('first_name', formData.first_name)
    payload.append('last_name', formData.last_name)
    payload.append('role', formData.role)
    payload.append('photo_url', photoUrl || '')
    payload.append('linkedin_url', formData.linkedin_url)
    payload.append('display_order', formData.display_order.toString())

    const result = editingMember
      ? await updateTeamMember(editingMember.id, payload)
      : await createTeamMember(payload)

    if (result.error) {
      setError(result.error)
    } else {
      setShowForm(false)
      setEditingMember(null)
      setFormData({ first_name: '', last_name: '', role: '', linkedin_url: '', display_order: 0 })
      setPhotoUrl('')
      await fetchMembers()
    }
    setSubmitting(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return
    const result = await deleteTeamMember(id)
    if (result.error) {
      setError(result.error)
    } else {
      await fetchMembers()
    }
  }

  function openEdit(member: TeamMember) {
    setEditingMember(member)
    setFormData({
      first_name: member.first_name,
      last_name: member.last_name,
      role: member.role,
      linkedin_url: member.linkedin_url || '',
      display_order: member.display_order,
    })
    setPhotoUrl(member.photo_url || '')
    setShowForm(true)
    setError('')
  }

  function openCreate() {
    setEditingMember(null)
    setFormData({ first_name: '', last_name: '', role: '', linkedin_url: '', display_order: 0 })
    setPhotoUrl('')
    setShowForm(true)
    setError('')
  }

  function closeForm() {
    setShowForm(false)
    setEditingMember(null)
    setFormData({ first_name: '', last_name: '', role: '', linkedin_url: '', display_order: 0 })
    setPhotoUrl('')
    setError('')
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
      </div>
    )
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-xl font-semibold text-foreground'>Équipe</h2>
          <p className='text-sm text-muted-foreground mt-1'>{members.length} membre(s)</p>
        </div>
        <button
          onClick={openCreate}
          className='inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors'
        >
          <Plus className='w-4 h-4' />
          Ajouter
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className='fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4'>
          <div className='bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10'>
              <h3 className='text-lg font-semibold text-foreground'>
                {editingMember ? 'Modifier le membre' : 'Ajouter un membre'}
              </h3>
              <button onClick={closeForm} className='text-muted-foreground hover:text-foreground transition-colors'>
                <X className='w-5 h-5' />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-4'>
              {error && (
                <div className='p-3 bg-red-500/10 border border-red-500/30 rounded-lg'>
                  <p className='text-sm text-red-500'>{error}</p>
                </div>
              )}

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-foreground mb-1.5'>Prénom</label>
                  <input
                    type='text'
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                    className='w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-foreground mb-1.5'>Nom</label>
                  <input
                    type='text'
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                    className='w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-foreground mb-1.5'>Rôle / Poste</label>
                <input
                  type='text'
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder='Ex: Responsable Partenariat'
                  required
                  className='w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50'
                />
              </div>

              <ImageUploader
                onUpload={(url) => setPhotoUrl(url)}
                currentImageUrl={photoUrl}
                label='Photo du membre'
              />

              <div>
                <label className='block text-sm font-medium text-foreground mb-1.5'>Lien LinkedIn (optionnel)</label>
                <input
                  type='url'
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder='https://linkedin.com/in/...'
                  className='w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-foreground mb-1.5'>Ordre d&apos;affichage</label>
                <input
                  type='number'
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  className='w-full px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50'
                />
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='submit'
                  disabled={submitting}
                  className='flex-1 py-2.5 px-4 bg-accent text-accent-foreground rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors disabled:opacity-50'
                >
                  {submitting ? 'Enregistrement...' : editingMember ? 'Modifier' : 'Créer'}
                </button>
                <button
                  type='button'
                  onClick={closeForm}
                  className='flex-1 py-2.5 px-4 border border-border rounded-lg font-medium text-sm text-foreground hover:bg-secondary transition-colors'
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className='space-y-3'>
        {members.length === 0 ? (
          <div className='text-center py-12 text-muted-foreground'>
            <p>Aucun membre ajouté</p>
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className='flex items-center justify-between p-4 bg-secondary rounded-lg border border-border hover:border-foreground/20 transition-colors'
            >
              <div className='flex items-center gap-4 flex-1'>
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={`${member.first_name} ${member.last_name}`}
                    className='w-12 h-12 rounded-full object-cover bg-secondary'
                  />
                ) : (
                  <div className='w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold text-accent'>
                    {member.first_name[0]}
                    {member.last_name[0]}
                  </div>
                )}
                <div className='flex-1'>
                  <h3 className='font-medium text-foreground'>
                    {member.first_name} {member.last_name}
                  </h3>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <p>{member.role}</p>
                    {member.linkedin_url && (
                      <>
                        <span>•</span>
                        <a
                          href={member.linkedin_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-accent hover:text-accent/80 transition-colors flex items-center gap-1'
                        >
                          <Linkedin className='w-3 h-3' />
                          LinkedIn
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => openEdit(member)}
                  className='p-2 hover:bg-background rounded-lg transition-colors text-muted-foreground hover:text-foreground'
                >
                  <Pencil className='w-4 h-4' />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className='p-2 hover:bg-background rounded-lg transition-colors text-muted-foreground hover:text-red-500'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
