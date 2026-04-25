'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function usePageContent(pageName: string) {
  const [content, setContent] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPageContent() {
      try {
        const supabase = createClient()
        const { data, error: err } = await supabase
          .from('page_content')
          .select('content')
          .eq('page_name', pageName)
          .single()

        if (err) {
          setError(err.message)
          setContent(null)
        } else {
          setContent(data?.content || null)
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch page content')
        setContent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPageContent()
  }, [pageName])

  return { content, loading, error }
}
