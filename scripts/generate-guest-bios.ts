/**
 * Auto-generate guest bios using Claude, then write them to the DB.
 *
 * Usage:
 *   NETLIFY_DB_URL=<url> ANTHROPIC_API_KEY=<key> npx tsx scripts/generate-guest-bios.ts
 *
 * Get DB URL:  netlify database connect --json
 * Get API key: https://console.anthropic.com/settings/keys
 *
 * Flags:
 *   --dry-run          Print generated bios without writing to DB
 *   --slug <slug>      Only process one episode (for testing)
 *   --overwrite        Re-generate even if guest_bio is already set
 *   --show <name>      Only process episodes from one show
 */

import Anthropic from '@anthropic-ai/sdk'
import { getDatabase } from '@netlify/database'

// ── CLI flags ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const DRY_RUN   = args.includes('--dry-run')
const OVERWRITE = args.includes('--overwrite')
const SLUG      = args[args.indexOf('--slug') + 1] ?? null
const SHOW      = args[args.indexOf('--show') + 1] ?? null

// ── Validate env ───────────────────────────────────────────────────────────
if (!process.env.NETLIFY_DB_URL) {
  console.error('❌  Set NETLIFY_DB_URL. Get it from: netlify database connect --json')
  process.exit(1)
}
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌  Set ANTHROPIC_API_KEY. Get it from: https://console.anthropic.com/settings/keys')
  process.exit(1)
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const { sql } = getDatabase()

// ── Bio generation ─────────────────────────────────────────────────────────
async function generateBio(guest: string, show: string, title: string, description: string): Promise<string> {
  const prompt = `You are writing a brief, factual "About the Guest" bio for a podcast episode page.

Guest name: ${guest}
Show: ${show}
Episode title: ${title}
Episode description: ${description}

Write 2–3 sentences (60–100 words) that:
- State who this person is and what they do or did professionally
- Include their most notable title, organization, or credential if evident from the description
- Are written in third person, present or past tense as appropriate
- Sound authoritative and informative, not promotional
- Do NOT invent facts not in the description
- Do NOT include phrases like "In this episode" or references to the podcast

Return ONLY the bio text, no quotes, no labels, no explanation.`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }],
  })

  const block = message.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  return block.text.trim()
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🤖  generate-guest-bios${DRY_RUN ? ' [DRY RUN]' : ''}${OVERWRITE ? ' [OVERWRITE]' : ''}\n`)

  // Build query
  let rows: { slug: string; guest: string; show_name: string; youtube_title: string; description: string; guest_bio: string | null }[]

  if (SLUG) {
    rows = await sql`SELECT slug, guest, show_name, youtube_title, description, guest_bio FROM episodes WHERE slug = ${SLUG}`
  } else if (SHOW) {
    rows = await sql`SELECT slug, guest, show_name, youtube_title, description, guest_bio FROM episodes WHERE show_name = ${SHOW} AND status = 'Published' ORDER BY video_number`
  } else {
    rows = await sql`SELECT slug, guest, show_name, youtube_title, description, guest_bio FROM episodes WHERE status = 'Published' ORDER BY video_number`
  }

  // Filter: skip episodes where bio exists unless --overwrite
  const toProcess = rows.filter(r => {
    if (r.guest === 'Savan Kong') return false  // skip host-only episodes
    if (r.guest_bio && !OVERWRITE) return false
    return true
  })

  if (toProcess.length === 0) {
    console.log('✅  Nothing to process. Use --overwrite to regenerate existing bios.')
    return
  }

  console.log(`Found ${rows.length} published episodes, processing ${toProcess.length}...\n`)

  let done = 0
  let skipped = 0
  let errors = 0

  for (const row of toProcess) {
    process.stdout.write(`[${done + 1}/${toProcess.length}] ${row.guest} (${row.slug})… `)

    try {
      const bio = await generateBio(
        row.guest,
        row.show_name,
        row.youtube_title,
        (row.description ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').slice(0, 800),
      )

      if (DRY_RUN) {
        console.log('\n   ' + bio + '\n')
      } else {
        await sql`UPDATE episodes SET guest_bio = ${bio} WHERE slug = ${row.slug}`
        console.log('✅')
      }
      done++
    } catch (err) {
      console.log(`❌  ${(err as Error).message}`)
      errors++
    }

    // Small delay to stay well within rate limits
    if (!DRY_RUN) await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\nDone. ${done} generated, ${skipped} skipped, ${errors} errors.`)
  if (DRY_RUN) console.log('(Dry run — nothing written to DB. Remove --dry-run to apply.)')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
