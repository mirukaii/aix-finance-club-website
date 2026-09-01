import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('interview_slots')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { data, error } = await supabase
      .from('interview_slots')
      .insert({
        label: body.label,
        date_start: body.date_start,
        date_end: body.date_end,
        is_active: body.is_active ?? true,
        display_order: body.display_order ?? 0,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slot' }, { status: 500 })
  }
}
