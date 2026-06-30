import { sql } from './db'
import { EPISODES, type Episode, type Show, type Status } from './episodes'

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
    spotifyUrl: r.spotify_url as string | undefined,
    appleUrl: r.apple_url as string | undefined,
    amazonUrl: r.amazon_url as string | undefined,
    substack: r.substack as string | undefined,
    guestBio: r.guest_bio as string | undefined,
    keyInsights: (r.key_insights as string[] | null) ?? undefined,
    faq: (r.faq as { q: string; a: string }[] | null) ?? undefined,
    transcriptFile: r.transcript_file as string | undefined,
    quote: r.quote as string | undefined,
    additionalPhotos: (() => {
      if (!r.additional_photos) return undefined
      try { return JSON.parse(r.additional_photos as string) as string[] } catch { return undefined }
    })(),
    taxonomyTags: (() => {
      if (!r.tags) return []
      if (Array.isArray(r.tags)) return r.tags as string[]
      try { return JSON.parse(r.tags as string) as string[] } catch { return [] }
    })(),
  }
}

// Falls back to static data if DB is unavailable (e.g. local build without netlify dev)
async function withFallback<T>(
  fn: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  try {
    return await fn()
  } catch {
    return fallback()
  }
}

export async function getEpisodes(): Promise<Episode[]> {
  return withFallback(
    async () => {
      const rows = await sql`SELECT * FROM episodes ORDER BY video_number DESC NULLS LAST, id DESC`
      return rows.map(rowToEpisode)
    },
    () => [...EPISODES]
  )
}

export async function getEpisode(slug: string): Promise<Episode | null> {
  return withFallback(
    async () => {
      const rows = await sql`SELECT * FROM episodes WHERE slug = ${slug} LIMIT 1`
      return rows[0] ? rowToEpisode(rows[0]) : null
    },
    () => EPISODES.find(e => e.slug === slug) ?? null
  )
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
      youtube_url, spotify_url, apple_url, amazon_url, substack, guest_bio,
      key_insights, faq, transcript_file
    ) VALUES (
      ${ep.slug}, ${ep.videoNumber ?? null}, ${ep.show}, ${ep.season},
      ${ep.episode ?? null}, ${ep.guest}, ${ep.youtubeTitle}, ${ep.description},
      ${ep.mainTags}, ${ep.tags}, ${ep.resources}, ${ep.status}, ${ep.photo},
      ${ep.youtubeUrl ?? null}, ${ep.spotifyUrl ?? null}, ${ep.appleUrl ?? null},
      ${ep.amazonUrl ?? null}, ${ep.substack ?? null}, ${ep.guestBio ?? null},
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
      spotify_url     = ${ep.spotifyUrl ?? null},
      apple_url       = ${ep.appleUrl ?? null},
      amazon_url      = ${ep.amazonUrl ?? null},
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
