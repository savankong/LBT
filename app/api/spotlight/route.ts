import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function ensureSettingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    )
  `
}

async function getSpotlightOrder(): Promise<string[]> {
  const rows = await sql`SELECT value FROM site_settings WHERE key = 'spotlight_order'`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = (rows as any[])[0]
  if (!row?.value) return []
  try { return JSON.parse(row.value) } catch { return [] }
}

// GET: return featured episodes ordered by stored spotlight_order
export async function GET() {
  try {
    await ensureSettingsTable()
    const order = await getSpotlightOrder()

    const rows = await sql`
      SELECT slug, guest, photo, show, youtube_title
      FROM episodes
      WHERE homepage_featured = TRUE AND status = 'Published'
    `
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eps = (rows as any[]).map(r => ({
      slug: r.slug, guest: r.guest, photo: r.photo,
      show: r.show, youtubeTitle: r.youtube_title,
    }))

    // Sort by stored order; unordered ones go to the end
    const orderMap = new Map(order.map((slug, i) => [slug, i]))
    eps.sort((a, b) => {
      const ai = orderMap.has(a.slug) ? orderMap.get(a.slug)! : 9999
      const bi = orderMap.has(b.slug) ? orderMap.get(b.slug)! : 9999
      return ai - bi
    })

    return NextResponse.json(eps)
  } catch (err) {
    console.error('GET /api/spotlight', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// PUT: save new ordered array of slugs
export async function PUT(req: NextRequest) {
  try {
    await ensureSettingsTable()
    const { slugs } = await req.json() as { slugs: string[] }
    const value = JSON.stringify(slugs)
    await sql`
      INSERT INTO site_settings (key, value) VALUES ('spotlight_order', ${value})
      ON CONFLICT (key) DO UPDATE SET value = ${value}
    `
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/spotlight', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
