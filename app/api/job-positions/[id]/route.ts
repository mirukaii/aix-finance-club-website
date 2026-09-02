import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
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
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update position' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminClient()
    const { error } = await supabase.from('job_positions').delete().eq('id', params.id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete position' }, { status: 500 })
  }
}
