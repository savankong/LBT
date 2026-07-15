import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function ensureColumn() {
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS spotlight_order INTEGER`
}

// GET: return featured episodes in spotlight_order
export async function GET() {
  await ensureColumn()
  const rows = await sql`
    SELECT slug, guest, photo, show, youtube_title, spotlight_order
    FROM episodes
    WHERE homepage_featured = TRUE AND status = 'Published'
    ORDER BY spotlight_order ASC NULLS LAST, video_number DESC NULLS LAST
  `
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return NextResponse.json((rows as any[]).map(r => ({
    slug: r.slug, guest: r.guest, photo: r.photo,
    show: r.show, youtubeTitle: r.youtube_title,
    spotlightOrder: r.spotlight_order,
  })))
}

// PUT: accept ordered array of slugs, update spotlight_order for each
export async function PUT(req: NextRequest) {
  await ensureColumn()
  const { slugs } = await req.json() as { slugs: string[] }
  for (let i = 0; i < slugs.length; i++) {
    await sql`UPDATE episodes SET spotlight_order = ${i + 1} WHERE slug = ${slugs[i]}`
  }
  return NextResponse.json({ ok: true })
}
