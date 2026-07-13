import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import questions from '@/public/ccat/questions.json'

export const dynamic = 'force-dynamic'

export async function POST() {
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
  const existing = await sql`SELECT COUNT(*) as c FROM ccat_questions`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (Number((existing as any[])[0]?.c) > 0) {
    return NextResponse.json({ ok: false, message: 'Table already has data. Clear it first if you want to re-seed.' })
  }
  for (const q of questions as { category: string; prompt: string; choices: string[]; correctIndex: number; explanation: string }[]) {
    await sql`
      INSERT INTO ccat_questions (category, prompt, choices, correct_index, explanation)
      VALUES (${q.category}, ${q.prompt}, ${JSON.stringify(q.choices)}, ${q.correctIndex}, ${q.explanation})
    `
  }
  return NextResponse.json({ ok: true, inserted: questions.length })
}
