import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('job_positions')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch positions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { data, error } = await supabase
      .from('job_positions')
      .insert({
        title: body.title,
        department: body.department,
        description: body.description || null,
        responsibilities: body.responsibilities || null,
        is_open: body.is_open ?? true,
        display_order: body.display_order ?? 0,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create position' }, { status: 500 })
  }
}
