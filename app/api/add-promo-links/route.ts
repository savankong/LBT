import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS promo_links JSONB`
  return NextResponse.json({ ok: true, message: 'promo_links column added' })
}
