import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password !== (process.env.ADMIN_PASSWORD || 'lbt2025')) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }
  await sql`DELETE FROM ccat_questions`
  return NextResponse.json({ ok: true })
}
