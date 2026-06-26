/**
 * Generates a SQL seed file from lib/episodes.ts
 * Run: npx tsx scripts/generate-seed-sql.ts > /tmp/seed.sql
 * Then: netlify database connect --query "$(cat /tmp/seed.sql)"
 */
import { EPISODES } from '../lib/episodes.js'

function escape(s: string | undefined | null): string {
  if (s == null) return 'NULL'
  return `$$${s.replace(/\$\$/g, '\\$\\$')}$$`
}

function num(n: number | undefined | null): string {
  return n == null ? 'NULL' : String(n)
}

function jsonb(v: unknown): string {
  if (v == null || (Array.isArray(v) && v.length === 0)) return 'NULL'
  return `$$${JSON.stringify(v)}$$::jsonb`
}

const lines: string[] = []

for (const ep of EPISODES) {
  lines.push(`INSERT INTO episodes (
  slug, video_number, show_name, season, episode_number, guest,
  youtube_title, description, main_tags, tags, resources, status, photo,
  youtube_url, substack, guest_bio, key_insights, faq, transcript_file
) VALUES (
  ${escape(ep.slug)}, ${num(ep.videoNumber)}, ${escape(ep.show)}, ${num(ep.season)},
  ${num(ep.episode)}, ${escape(ep.guest)}, ${escape(ep.youtubeTitle)}, ${escape(ep.description)},
  ${escape(ep.mainTags)}, ${escape(ep.tags)}, ${escape(ep.resources)}, ${escape(ep.status)}, ${escape(ep.photo)},
  ${escape(ep.youtubeUrl)}, ${escape(ep.substack)}, ${escape(ep.guestBio)},
  ${jsonb(ep.keyInsights)}, ${jsonb(ep.faq)}, ${escape(ep.transcriptFile)}
) ON CONFLICT (slug) DO UPDATE SET
  video_number = EXCLUDED.video_number,
  show_name = EXCLUDED.show_name,
  season = EXCLUDED.season,
  episode_number = EXCLUDED.episode_number,
  guest = EXCLUDED.guest,
  youtube_title = EXCLUDED.youtube_title,
  description = EXCLUDED.description,
  main_tags = EXCLUDED.main_tags,
  tags = EXCLUDED.tags,
  resources = EXCLUDED.resources,
  status = EXCLUDED.status,
  photo = EXCLUDED.photo,
  youtube_url = EXCLUDED.youtube_url,
  substack = EXCLUDED.substack,
  guest_bio = EXCLUDED.guest_bio,
  key_insights = EXCLUDED.key_insights,
  faq = EXCLUDED.faq,
  transcript_file = EXCLUDED.transcript_file,
  updated_at = NOW();`)
}

process.stdout.write(lines.join('\n') + '\n')
process.stderr.write(`Generated ${EPISODES.length} INSERT statements\n`)
