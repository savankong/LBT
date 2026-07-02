import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS homepage_featured BOOLEAN DEFAULT FALSE`
  return NextResponse.json({ ok: true, message: 'homepage_featured column added' })
}
