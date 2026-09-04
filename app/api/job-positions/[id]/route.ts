import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error(`ENV MANQUANTE: url=${!!url} key=${!!key}`)
  return createClient(url, key)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminClient()
    const body = await request.json()
    const { data, error } = await supabase
      .from('job_positions')
      .update({
        title: body.title,
        department: body.department,
        description: body.description || null,
        responsibilities: body.responsibilities || null,
        is_open: body.is_open ?? true,
        display_order: body.display_order ?? 0,
      })
      .eq('id', params.id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || String(error), code: error.code, details: error.details, hint: error.hint }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminClient()
    const { error } = await supabase.from('job_positions').delete().eq('id', params.id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || String(error), code: error.code, details: error.details, hint: error.hint }, { status: 500 })
  }
}
