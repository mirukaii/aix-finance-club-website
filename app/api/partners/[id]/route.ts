import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error(`ENV MANQUANTE: url=${!!url} key=${!!key}`)
  return createClient(url, key)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = getAdminClient()
    const formData = await request.formData()
    const { data, error } = await supabase
      .from('partners')
      .update({
        name: formData.get('name'),
        category: formData.get('category') || null,
        logo_url: formData.get('logo_url') || null,
        website_url: formData.get('website_url') || null,
        partnership_description: formData.get('partnership_description') || null,
        display_order: parseInt(formData.get('display_order') as string) || 0,
      })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || String(error), code: error.code, details: error.details, hint: error.hint }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = getAdminClient()
    const { error } = await supabase.from('partners').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || String(error), code: error.code, details: error.details, hint: error.hint }, { status: 500 })
  }
}
