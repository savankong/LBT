/**
 * Auto-generate keyInsights and FAQs for published episodes using Claude.
 *
 * Usage:
 *   NETLIFY_DB_URL=<url> ANTHROPIC_API_KEY=<key> npx tsx scripts/generate-insights.ts
 *
 * Get DB URL:  netlify database connect --json
 *
 * Flags:
 *   --dry-run          Print output without writing to DB
 *   --slug <slug>      Only process one episode
 *   --overwrite        Re-generate even if fields are already set
 *   --insights-only    Only generate keyInsights (skip FAQs)
 *   --faq-only         Only generate FAQs (skip keyInsights)
 */

import Anthropic from '@anthropic-ai/sdk'
import { getDatabase } from '@netlify/database'

const args = process.argv.slice(2)
const DRY_RUN      = args.includes('--dry-run')
const OVERWRITE    = args.includes('--overwrite')
const INSIGHTS_ONLY = args.includes('--insights-only')
const FAQ_ONLY     = args.includes('--faq-only')
const SLUG         = args[args.indexOf('--slug') + 1] ?? null

if (!process.env.NETLIFY_DB_URL) {
  console.error('❌  Set NETLIFY_DB_URL. Get it from: netlify database connect --json')
  process.exit(1)
}
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌  Set ANTHROPIC_API_KEY.')
  process.exit(1)
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const { sql } = getDatabase()

type Row = {
  slug: string
  guest: string
  show_name: string
  youtube_title: string
  description: string
  guest_bio: string | null
  key_insights: string[] | null
  faq: { q: string; a: string }[] | null
}

async function generateInsights(row: Row): Promise<string[]> {
  const prompt = `You are writing 4–5 key takeaways for a podcast episode page.

Guest: ${row.guest}
Show: ${row.show_name}
Episode title: ${row.youtube_title}
Description: ${row.description}
${row.guest_bio ? `Guest bio: ${row.guest_bio}` : ''}

Write 4–5 concise key insights or takeaways from this episode (based on the description).
Each insight should be 10–25 words, specific and interesting.
Written as standalone statements, not as "In this episode..." phrases.
Focus on actionable, surprising, or counter-intuitive ideas.

Return a JSON array of strings only, no other text. Example:
["Insight one here.", "Insight two here.", "Insight three here."]`

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  })

  const block = msg.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  const text = block.text.trim()
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) throw new Error(`Could not parse JSON array from: ${text}`)
  return JSON.parse(match[0]) as string[]
}

async function generateFAQs(row: Row): Promise<{ q: string; a: string }[]> {
  const prompt = `You are writing 2–3 FAQ entries for a podcast episode page.

Guest: ${row.guest}
Show: ${row.show_name}
Episode title: ${row.youtube_title}
Description: ${row.description}
${row.guest_bio ? `Guest bio: ${row.guest_bio}` : ''}

Write 2–3 questions that someone would realistically search for about this topic,
and concise answers (2–4 sentences each) drawn from the description.
Questions should be specific, not generic ("What did X do when..." not "Who is X?").
Answers should be informative and complete enough to stand alone.

Return a JSON array of objects only, no other text. Example:
[{"q": "Question here?", "a": "Answer here."}]`

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
  })

  const block = msg.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type')
  const text = block.text.trim()
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) throw new Error(`Could not parse JSON array from: ${text}`)
  return JSON.parse(match[0]) as { q: string; a: string }[]
}

async function main() {
  console.log(`\n🤖  generate-insights${DRY_RUN ? ' [DRY RUN]' : ''}${OVERWRITE ? ' [OVERWRITE]' : ''}\n`)

  let rows: Row[]
  if (SLUG) {
    rows = await sql`SELECT slug, guest, show_name, youtube_title, description, guest_bio, key_insights, faq FROM episodes WHERE slug = ${SLUG}`
  } else {
    rows = await sql`SELECT slug, guest, show_name, youtube_title, description, guest_bio, key_insights, faq FROM episodes WHERE status = 'Published' ORDER BY video_number`
  }

  const toProcess = rows.filter(r => {
    if (r.guest === 'Savan Kong') return false
    if (!r.description) return false
    const needsInsights = !r.key_insights || OVERWRITE
    const needsFaq = !r.faq || OVERWRITE
    if (INSIGHTS_ONLY) return needsInsights
    if (FAQ_ONLY) return needsFaq
    return needsInsights || needsFaq
  })

  if (toProcess.length === 0) {
    console.log('✅  Nothing to process. Use --overwrite to regenerate.')
    return
  }

  console.log(`Found ${rows.length} published episodes, processing ${toProcess.length}...\n`)

  let done = 0, errors = 0

  for (const row of toProcess) {
    process.stdout.write(`[${done + 1}/${toProcess.length}] ${row.guest} (${row.slug})… `)

    try {
      const needsInsights = (!row.key_insights || OVERWRITE) && !FAQ_ONLY
      const needsFaq = (!row.faq || OVERWRITE) && !INSIGHTS_ONLY

      const [insights, faqs] = await Promise.all([
        needsInsights ? generateInsights(row) : Promise.resolve(null),
        needsFaq ? generateFAQs(row) : Promise.resolve(null),
      ])

      if (DRY_RUN) {
        if (insights) console.log('\n  Insights: ' + JSON.stringify(insights))
        if (faqs) console.log('  FAQs: ' + JSON.stringify(faqs))
        console.log()
      } else {
        if (insights && faqs) {
          await sql`UPDATE episodes SET key_insights = ${JSON.stringify(insights)}, faq = ${JSON.stringify(faqs)} WHERE slug = ${row.slug}`
        } else if (insights) {
          await sql`UPDATE episodes SET key_insights = ${JSON.stringify(insights)} WHERE slug = ${row.slug}`
        } else if (faqs) {
          await sql`UPDATE episodes SET faq = ${JSON.stringify(faqs)} WHERE slug = ${row.slug}`
        }
        console.log('✅')
      }
      done++
    } catch (err) {
      console.log(`❌  ${(err as Error).message}`)
      errors++
    }

    if (!DRY_RUN) await new Promise(r => setTimeout(r, 400))
  }

  console.log(`\nDone. ${done} updated, ${errors} errors.`)
  if (DRY_RUN) console.log('(Dry run — remove --dry-run to apply.)')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
