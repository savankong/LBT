import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { category, prompt, choices, correctIndex, explanation, active } = body
  await sql`
    UPDATE ccat_questions
    SET category      = ${category},
        prompt        = ${prompt},
        choices       = ${JSON.stringify(choices)},
        correct_index = ${correctIndex},
        explanation   = ${explanation ?? ''},
        active        = ${active ?? true}
    WHERE id = ${Number(id)}
  `
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await sql`DELETE FROM ccat_questions WHERE id = ${Number(id)}`
  return NextResponse.json({ ok: true })
}
