import { sql } from './db'
import { EPISODES, type Episode, type Show, type Status } from './episodes'

// Map DB row → Episode interface
function rowToEpisode(r: Record<string, unknown>): Episode {
  return {
    slug: r.slug as string,
    videoNumber: r.video_number as number | undefined,
    show: r.show_name as Show,
    season: r.season as number,
    episode: r.episode_number as number | undefined,
    guest: r.guest as string,
    youtubeTitle: r.youtube_title as string,
    description: r.description as string,
    mainTags: r.main_tags as string,
    tags: r.tags as string,
    resources: r.resources as string,
    status: r.status as Status,
    photo: r.photo as string,
    youtubeUrl: r.youtube_url as string | undefined,
    substack: r.substack as string | undefined,
    guestBio: r.guest_bio as string | undefined,
    keyInsights: (r.key_insights as string[] | null) ?? undefined,
    faq: (r.faq as { q: string; a: string }[] | null) ?? undefined,
    transcriptFile: r.transcript_file as string | undefined,
  }
}

const hasRealDb = () =>
  !!(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder'))

export async function getEpisodes(): Promise<Episode[]> {
  if (!hasRealDb()) return [...EPISODES]
  try {
    const rows = await sql`
      SELECT * FROM episodes ORDER BY video_number DESC NULLS LAST, id DESC
    `
    return rows.map(rowToEpisode)
  } catch {
    return [...EPISODES]
  }
}

export async function getEpisode(slug: string): Promise<Episode | null> {
  if (!hasRealDb()) return EPISODES.find(e => e.slug === slug) ?? null
  try {
    const rows = await sql`SELECT * FROM episodes WHERE slug = ${slug} LIMIT 1`
    return rows[0] ? rowToEpisode(rows[0]) : null
  } catch {
    return EPISODES.find(e => e.slug === slug) ?? null
  }
}

export async function getPublishedEpisodeSlugs(): Promise<string[]> {
  if (!hasRealDb()) return EPISODES.map(e => e.slug)
  try {
    const rows = await sql`SELECT slug FROM episodes ORDER BY video_number DESC NULLS LAST`
    return rows.map(r => r.slug as string)
  } catch {
    return EPISODES.map(e => e.slug)
  }
}

export async function getAdjacentEpisodesDB(slug: string): Promise<{ prev: Episode | null; next: Episode | null }> {
  const episodes = await getEpisodes()
  const sorted = [...episodes].sort((a, b) => (a.videoNumber ?? 999) - (b.videoNumber ?? 999))
  const idx = sorted.findIndex(e => e.slug === slug)
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  }
}

export async function createEpisode(ep: Episode): Promise<Episode> {
  const rows = await sql`
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
    RETURNING *
  `
  return rowToEpisode(rows[0])
}

export async function updateEpisode(slug: string, ep: Episode): Promise<Episode> {
  const rows = await sql`
    UPDATE episodes SET
      slug            = ${ep.slug},
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
    WHERE slug = ${slug}
    RETURNING *
  `
  return rowToEpisode(rows[0])
}

export async function deleteEpisode(slug: string): Promise<void> {
  await sql`DELETE FROM episodes WHERE slug = ${slug}`
}
