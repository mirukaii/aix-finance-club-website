'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  photo_url: string | null
  linkedin_url: string | null
  display_order: number
}

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const supabase = createClient()
        const { data, error: err } = await supabase
          .from('team_members')
          .select('*')
          .order('display_order', { ascending: true })

        if (err) {
          setError(err.message)
          setMembers([])
        } else {
          setMembers(data || [])
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch team members')
        setMembers([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  return { members, loading, error }
}
