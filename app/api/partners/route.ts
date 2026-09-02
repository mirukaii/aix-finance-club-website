import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET() {
  try {
    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getAdminClient()
    const formData = await request.formData()
    const { data, error } = await supabase
      .from('partners')
      .insert({
        name: formData.get('name'),
        category: formData.get('category') || null,
        logo_url: formData.get('logo_url') || null,
        website_url: formData.get('website_url') || null,
        partnership_description: formData.get('partnership_description') || null,
        display_order: parseInt(formData.get('display_order') as string) || 0,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 })
  }
}
