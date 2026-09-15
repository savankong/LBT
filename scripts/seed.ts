/**
 * Seeds episodes table from lib/episodes.ts static data.
 * Usage: DATABASE_URL=<url> npx tsx scripts/seed.ts
 */
import { sql } from '../lib/db'

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Set DATABASE_URL first')
    process.exit(1)
  }

  const { EPISODES } = await import('../lib/episodes.js')

  console.log(`Seeding ${EPISODES.length} episodes…`)
  let inserted = 0
  let updated = 0

  for (const ep of EPISODES) {
    const exists = await sql`SELECT id FROM episodes WHERE slug = ${ep.slug}`
    if (exists.length > 0) {
      await sql`
        UPDATE episodes SET
          video_number       = ${ep.videoNumber ?? null},
          show_name          = ${ep.show},
          season              = ${ep.season},
          episode_number      = ${ep.episode ?? null},
          guest               = ${ep.guest},
          youtube_title       = ${ep.youtubeTitle},
          description         = ${ep.description},
          main_tags           = ${ep.mainTags},
          tags                = ${ep.tags},
          resources           = ${ep.resources},
          status              = ${ep.status},
          photo               = ${ep.photo},
          youtube_url         = ${ep.youtubeUrl ?? null},
          spotify_url         = ${ep.spotifyUrl ?? null},
          apple_url           = ${ep.appleUrl ?? null},
          amazon_url          = ${ep.amazonUrl ?? null},
          substack            = ${ep.substack ?? null},
          guest_bio           = ${ep.guestBio ?? null},
          key_insights        = ${ep.keyInsights ? JSON.stringify(ep.keyInsights) : null},
          faq                 = ${ep.faq ? JSON.stringify(ep.faq) : null},
          transcript_file     = ${ep.transcriptFile ?? null},
          promo_links         = ${ep.promoLinks ? JSON.stringify(ep.promoLinks) : null},
          quote               = ${ep.quote ?? null},
          additional_photos   = ${ep.additionalPhotos ? JSON.stringify(ep.additionalPhotos) : null},
          homepage_featured   = ${ep.homepageFeatured ?? false},
          updated_at          = NOW()
        WHERE slug = ${ep.slug}
      `
      updated++
    } else {
      await sql`
        INSERT INTO episodes (
          slug, video_number, show_name, season, episode_number, guest,
          youtube_title, description, main_tags, tags, resources, status, photo,
          youtube_url, spotify_url, apple_url, amazon_url, substack, guest_bio,
          key_insights, faq, transcript_file, promo_links, quote, additional_photos,
          homepage_featured
        ) VALUES (
          ${ep.slug}, ${ep.videoNumber ?? null}, ${ep.show}, ${ep.season},
          ${ep.episode ?? null}, ${ep.guest}, ${ep.youtubeTitle}, ${ep.description},
          ${ep.mainTags}, ${ep.tags}, ${ep.resources}, ${ep.status}, ${ep.photo},
          ${ep.youtubeUrl ?? null}, ${ep.spotifyUrl ?? null}, ${ep.appleUrl ?? null},
          ${ep.amazonUrl ?? null}, ${ep.substack ?? null}, ${ep.guestBio ?? null},
          ${ep.keyInsights ? JSON.stringify(ep.keyInsights) : null},
          ${ep.faq ? JSON.stringify(ep.faq) : null},
          ${ep.transcriptFile ?? null},
          ${ep.promoLinks ? JSON.stringify(ep.promoLinks) : null},
          ${ep.quote ?? null},
          ${ep.additionalPhotos ? JSON.stringify(ep.additionalPhotos) : null},
          ${ep.homepageFeatured ?? false}
        )
      `
      inserted++
    }
  }

  console.log(`✓ Done — ${inserted} inserted, ${updated} updated`)
}

main().catch(err => { console.error(err); process.exit(1) })
