import type { MetadataRoute } from 'next'
import { getEpisodes } from '@/lib/episodes-db'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await getEpisodes()
  const published = episodes.filter(e => (e.status as string).toLowerCase() === 'published')

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://www.lifebetweentitles.com', priority: 1.0, changeFrequency: 'weekly' },
    { url: 'https://www.lifebetweentitles.com/shows', priority: 0.9, changeFrequency: 'daily' },
    { url: 'https://www.lifebetweentitles.com/guests', priority: 0.8, changeFrequency: 'weekly' },
    { url: 'https://www.lifebetweentitles.com/about', priority: 0.7, changeFrequency: 'monthly' },
    { url: 'https://www.lifebetweentitles.com/newsletter', priority: 0.7, changeFrequency: 'monthly' },
    { url: 'https://www.lifebetweentitles.com/sponsor', priority: 0.6, changeFrequency: 'monthly' },
    { url: 'https://www.lifebetweentitles.com/book', priority: 0.6, changeFrequency: 'monthly' },
    { url: 'https://www.lifebetweentitles.com/faq', priority: 0.5, changeFrequency: 'monthly' },
    { url: 'https://www.lifebetweentitles.com/contact', priority: 0.5, changeFrequency: 'monthly' },
    { url: 'https://www.lifebetweentitles.com/guest-submission', priority: 0.5, changeFrequency: 'monthly' },
  ]

  const episodePages: MetadataRoute.Sitemap = published.map(ep => ({
    url: `https://www.lifebetweentitles.com/shows/${ep.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  return [...staticPages, ...episodePages]
}
