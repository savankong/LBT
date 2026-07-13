import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS ccat_questions (
      id         SERIAL PRIMARY KEY,
      category   TEXT NOT NULL CHECK (category IN ('Math','Verbal','Spatial')),
      prompt     TEXT NOT NULL,
      choices    JSONB NOT NULL,
      correct_index INTEGER NOT NULL,
      explanation TEXT NOT NULL DEFAULT '',
      active     BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export async function GET() {
  await ensureTable()
  const rows = await sql`
    SELECT id, category, prompt, choices, correct_index, explanation, active
    FROM ccat_questions
    ORDER BY id
  `
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return NextResponse.json((rows as any[]).map(r => ({
    id: r.id,
    category: r.category,
    prompt: r.prompt,
    choices: r.choices,
    correctIndex: r.correct_index,
    explanation: r.explanation,
    active: r.active,
  })))
}

export async function POST(req: NextRequest) {
  await ensureTable()
  const body = await req.json()
  const { category, prompt, choices, correctIndex, explanation } = body
  const result = await sql`
    INSERT INTO ccat_questions (category, prompt, choices, correct_index, explanation)
    VALUES (${category}, ${prompt}, ${JSON.stringify(choices)}, ${correctIndex}, ${explanation ?? ''})
    RETURNING id
  `
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return NextResponse.json({ ok: true, id: (result as any[])[0]?.id })
}
