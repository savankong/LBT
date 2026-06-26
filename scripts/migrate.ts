import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const sql = neon(process.env.DATABASE_URL!)

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

  console.log('✓ Migration complete')
}

migrate().catch(err => {
  console.error(err)
  process.exit(1)
})
