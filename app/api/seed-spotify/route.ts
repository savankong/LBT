import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

const MAPPING: Record<string, string> = {
  'aaron-dossey-insect-protein-scientist': 'https://open.spotify.com/episode/20vdzsky5PrD9hJ7ZlqDOv',
  'brett-cohen-viral-radio-times-square': 'https://open.spotify.com/episode/60gASoC4dmYZK6lR89AZOg',
  'anthony-dyer-tito-basketball-book': 'https://open.spotify.com/episode/5ZHRwerUWIvvPKwnwF5SPI',
  'john-sherman-dod-kindness-leadership': 'https://open.spotify.com/episode/54U6uRGqZgV0xRY556aTKh',
  'gladdys-uribe-immigration-attorney': 'https://open.spotify.com/episode/27i2XYVGQ1rwEMvqk4sZr4',
  'ann-dunkin-federal-cio-technology-leadership': 'https://open.spotify.com/episode/0hd1jYV2ql93TtWsouIROR',
  'danielle-frank-wine-spirits-author-reinvention': 'https://open.spotify.com/episode/61QycWzbLwl0HHtPcI1aM0',
  'jerry-glavy-marine-general-cyber-command': 'https://open.spotify.com/episode/781dnohIg02Riqcp1eM9tw',
  'jordan-swanson-pediatric-craniofacial-surgeon': 'https://open.spotify.com/episode/6EiJPfPCJgqLl7bMDGPwNe',
  'nate-sexton-pro-disc-golfer': 'https://open.spotify.com/episode/2RUzS3faTpcV8Ba7xgRjuE',
}

export async function GET() {
  const results: { slug: string; updated: boolean }[] = []
  for (const [slug, url] of Object.entries(MAPPING)) {
    const rows = await sql`UPDATE episodes SET spotify_url = ${url} WHERE slug = ${slug} RETURNING slug`
    results.push({ slug, updated: rows.length > 0 })
  }
  return NextResponse.json({ results })
}
