import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const { sql } = await import('../lib/db')

async function migrate() {
  console.log('Running migration…')

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
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // Index for fast slug lookups
  await sql`
    CREATE INDEX IF NOT EXISTS episodes_slug_idx ON episodes (slug)
  `

  // Index for show filtering
  await sql`
    CREATE INDEX IF NOT EXISTS episodes_show_idx ON episodes (show_name)
  `

  // Index for status filtering
  await sql`
    CREATE INDEX IF NOT EXISTS episodes_status_idx ON episodes (status)
  `

  // 0002: platform URLs
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS spotify_url TEXT`
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS apple_url TEXT`
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS amazon_url TEXT`

  // 0003: spotlight, promo links, pull quote, additional photos
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS homepage_featured BOOLEAN NOT NULL DEFAULT FALSE`
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS promo_links JSONB`
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS quote TEXT`
  await sql`ALTER TABLE episodes ADD COLUMN IF NOT EXISTS additional_photos JSONB`
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    )
  `

  console.log('✓ Migration complete')
}

migrate().catch(err => {
  console.error(err)
  process.exit(1)
})
