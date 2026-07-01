import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

type Row = {
  slug: string
  guest: string
  show_name: string
  youtube_title: string
  description: string
  guest_bio: string | null
}

async function generateBio(guest: string, show: string, title: string, description: string): Promise<string> {
  const prompt = `You are writing a brief, factual "About the Guest" bio for a podcast episode page.

Guest name: ${guest}
Show: ${show}
Episode title: ${title}
Episode description: ${description.slice(0, 800)}

Write 2–3 sentences (60–100 words) that:
- State who this person is and what they do or did professionally
- Include their most notable title, organization, or credential visible in the description
- Are written in third person, present or past tense as appropriate
- Sound authoritative and informative, not promotional
- Do NOT invent facts not present in the description above
- Do NOT include phrases like "In this episode" or references to the podcast

Return ONLY the bio text, no quotes, no labels, no explanation.`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic API error ${res.status}: ${err}`)
  }

  const data = await res.json() as { content: { type: string; text: string }[] }
  const block = data.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  return block.text.trim()
}

// GET /api/gen-bios              — generate bios for all episodes missing one
// GET /api/gen-bios?overwrite=1  — regenerate ALL bios
// GET /api/gen-bios?slug=<slug>  — one episode only
// GET /api/gen-bios?dry=1        — preview without writing
export async function GET(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set in Netlify env vars' }, { status: 500 })
  }

  const { searchParams } = new URL(req.url)
  const overwrite = searchParams.get('overwrite') === '1'
  const dryRun   = searchParams.get('dry') === '1'
  const slug     = searchParams.get('slug')

  let rows: Row[]
  if (slug) {
    rows = await sql`SELECT slug, guest, show_name, youtube_title, description, guest_bio FROM episodes WHERE slug = ${slug}` as unknown as Row[]
  } else {
    rows = await sql`SELECT slug, guest, show_name, youtube_title, description, guest_bio FROM episodes WHERE status = 'Published' ORDER BY video_number` as unknown as Row[]
  }

  const toProcess = rows.filter(r => {
    if (r.guest === 'Savan Kong') return false
    if (r.guest_bio && !overwrite) return false
    return true
  })

  const results: { slug: string; guest: string; bio: string; status: string }[] = []

  for (const row of toProcess) {
    try {
      const bio = await generateBio(
        row.guest,
        row.show_name,
        row.youtube_title,
        (row.description ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' '),
      )

      if (!dryRun) {
        await sql`UPDATE episodes SET guest_bio = ${bio} WHERE slug = ${row.slug}`
      }

      results.push({ slug: row.slug, guest: row.guest, bio, status: dryRun ? 'preview' : 'written' })
    } catch (err) {
      results.push({ slug: row.slug, guest: row.guest, bio: '', status: `error: ${(err as Error).message}` })
    }

    // Stay within Anthropic rate limits
    await new Promise(r => setTimeout(r, 300))
  }

  return NextResponse.json({
    processed: results.length,
    dryRun,
    results,
  })
}
