// Runs as a DigitalOcean App Platform PRE_DEPLOY job. DATABASE_URL is
// injected by DO at run time — never touches a local/dev environment.
// Idempotent: safe to run on every deploy.
import postgres from 'postgres'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' })

async function main() {
  console.log('Ensuring schema…')

  await sql`
    CREATE TABLE IF NOT EXISTS episodes (
      id              SERIAL PRIMARY KEY,
      slug            TEXT UNIQUE NOT NULL,
      video_number    INTEGER,
      show_name       TEXT NOT NULL,
      season          INTEGER NOT NULL DEFAULT 1,
      episode_number  INTEGER,
      guest           TEXT NOT NULL,
      youtube_title   TEXT NOT NULL DEFAULT '',
      description     TEXT NOT NULL DEFAULT '',
      main_tags       TEXT NOT NULL DEFAULT '',
      tags            TEXT NOT NULL DEFAULT '',
      resources       TEXT NOT NULL DEFAULT '',
      status          TEXT NOT NULL DEFAULT 'Recorded',
      photo           TEXT NOT NULL DEFAULT '',
      youtube_url     TEXT,
      substack        TEXT,
      guest_bio       TEXT,
      key_insights    JSONB,
      faq             JSONB,
      transcript_file TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      spotify_url     TEXT,
      apple_url       TEXT,
      amazon_url      TEXT,
      quote           TEXT
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS episodes_slug_idx ON episodes (slug)`
  await sql`CREATE INDEX IF NOT EXISTS episodes_show_idx ON episodes (show_name)`
  await sql`CREATE INDEX IF NOT EXISTS episodes_status_idx ON episodes (status)`

  // These three were never in the live schema this was migrated from either —
  // the old app added them via one-off "hit this URL once" API routes
  // (app/api/add-homepage-featured, app/api/add-promo-links). Managing them
  // here instead makes them part of the real, repeatable schema going forward.
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS homepage_featured BOOLEAN DEFAULT FALSE`
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS promo_links JSONB`
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS additional_photos TEXT`

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    )
  `

  const [{ count }] = await sql`SELECT count(*)::int FROM episodes`
  if (count > 0) {
    console.log(`episodes already has ${count} rows — skipping seed`)
    await sql.end()
    return
  }

  console.log('Seeding episodes from migrated Netlify DB export…')
  const rows = JSON.parse(readFileSync(join(__dirname, 'seed-data', 'episodes.json'), 'utf8'))

  for (const r of rows) {
    await sql`
      INSERT INTO episodes (
        id, slug, video_number, show_name, season, episode_number, guest,
        youtube_title, description, main_tags, tags, resources, status, photo,
        youtube_url, substack, guest_bio, key_insights, faq, transcript_file,
        created_at, updated_at, spotify_url, apple_url, amazon_url, quote
      ) VALUES (
        ${r.id}, ${r.slug}, ${r.video_number}, ${r.show_name}, ${r.season}, ${r.episode_number}, ${r.guest},
        ${r.youtube_title}, ${r.description}, ${r.main_tags}, ${r.tags}, ${r.resources}, ${r.status}, ${r.photo},
        ${r.youtube_url}, ${r.substack}, ${r.guest_bio}, ${r.key_insights}, ${r.faq}, ${r.transcript_file},
        ${r.created_at}, ${r.updated_at}, ${r.spotify_url}, ${r.apple_url}, ${r.amazon_url}, ${r.quote}
      )
      ON CONFLICT (id) DO NOTHING
    `
  }

  await sql`SELECT setval('episodes_id_seq', (SELECT COALESCE(MAX(id), 1) FROM episodes))`

  const [{ count: after }] = await sql`SELECT count(*)::int FROM episodes`
  console.log(`✓ Seeded ${after} episodes`)
  await sql.end()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
