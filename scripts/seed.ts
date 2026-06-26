/**
 * Seeds the episodes table from the existing lib/episodes.ts static array.
 * Run once after migrate: npx tsx scripts/seed.ts
 * Safe to re-run — uses INSERT ... ON CONFLICT DO UPDATE.
 */
import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

// Dynamic import so this script can run standalone
async function main() {
  const sql = neon(process.env.DATABASE_URL!)

  // Load episodes from the TS source
  const { EPISODES } = await import('../lib/episodes.js')

  console.log(`Seeding ${EPISODES.length} episodes…`)
  let inserted = 0
  let updated = 0

  for (const ep of EPISODES) {
    const exists = await sql`SELECT id FROM episodes WHERE slug = ${ep.slug}`
    if (exists.length > 0) {
      await sql`
        UPDATE episodes SET
          video_number    = ${ep.videoNumber ?? null},
          show_name       = ${ep.show},
          season          = ${ep.season},
          episode_number  = ${ep.episode ?? null},
          guest           = ${ep.guest},
          youtube_title   = ${ep.youtubeTitle},
          description     = ${ep.description},
          main_tags       = ${ep.mainTags},
          tags            = ${ep.tags},
          resources       = ${ep.resources},
          status          = ${ep.status},
          photo           = ${ep.photo},
          youtube_url     = ${ep.youtubeUrl ?? null},
          substack        = ${ep.substack ?? null},
          guest_bio       = ${ep.guestBio ?? null},
          key_insights    = ${ep.keyInsights ? JSON.stringify(ep.keyInsights) : null},
          faq             = ${ep.faq ? JSON.stringify(ep.faq) : null},
          transcript_file = ${ep.transcriptFile ?? null},
          updated_at      = NOW()
        WHERE slug = ${ep.slug}
      `
      updated++
    } else {
      await sql`
        INSERT INTO episodes (
          slug, video_number, show_name, season, episode_number, guest,
          youtube_title, description, main_tags, tags, resources, status, photo,
          youtube_url, substack, guest_bio, key_insights, faq, transcript_file
        ) VALUES (
          ${ep.slug}, ${ep.videoNumber ?? null}, ${ep.show}, ${ep.season},
          ${ep.episode ?? null}, ${ep.guest}, ${ep.youtubeTitle}, ${ep.description},
          ${ep.mainTags}, ${ep.tags}, ${ep.resources}, ${ep.status}, ${ep.photo},
          ${ep.youtubeUrl ?? null}, ${ep.substack ?? null}, ${ep.guestBio ?? null},
          ${ep.keyInsights ? JSON.stringify(ep.keyInsights) : null},
          ${ep.faq ? JSON.stringify(ep.faq) : null},
          ${ep.transcriptFile ?? null}
        )
      `
      inserted++
    }
  }

  console.log(`✓ Done — ${inserted} inserted, ${updated} updated`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
