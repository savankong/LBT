import type { Metadata } from 'next'
import Link from 'next/link'
import { getEpisodes } from '@/lib/episodes-db'
import type { Show } from '@/lib/episodes'
import GuestsClient from '@/components/GuestsClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Guests',
  description: 'Meet the guests of Life Between Titles: retired generals, surgeons, professional athletes, and people who have navigated extraordinary career transitions. Real stories, honestly told.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/guests' },
  openGraph: { title: 'Guests | Life Between Titles', description: 'From retired generals to pediatric surgeons to professional disc golfers. Every guest has a real career story.' },
}

const SHOW_ORDER: Show[] = ['Life Between Titles', 'Work Unscripted', 'Office Hours']

export default async function GuestsPage() {
  const all = await getEpisodes()

  // published only, sort by show order → season → episode
  const published = all
    .filter(ep => ep.status?.toLowerCase() === 'published' && ep.guest.toLowerCase() !== 'savan kong')
    .sort((a, b) => {
      const si = SHOW_ORDER.indexOf(a.show) - SHOW_ORDER.indexOf(b.show)
      if (si !== 0) return si
      const sd = (a.season ?? 99) - (b.season ?? 99)
      if (sd !== 0) return sd
      return (a.episode ?? 999) - (b.episode ?? 999)
    })

  // group by guest name — preserve first-occurrence sort order
  const guestMap = new Map<string, typeof published>()
  for (const ep of published) {
    const key = ep.guest
    if (!guestMap.has(key)) guestMap.set(key, [])
    guestMap.get(key)!.push(ep)
  }

  const guests = Array.from(guestMap.values())

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Life Between Titles Podcast Guests',
    itemListElement: guests.map((eps, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Person', name: eps[0].guest },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">The Guests</span>
            <h1>Every story is a real one.</h1>
            <p>From retired generals to pediatric surgeons to professional disc golfers. Our guests are people who have built lives worth talking about.</p>
          </div>
        </div>
      </header>

      <GuestsClient guests={guests} />

      <div className="divider" />
      <section className="cta-section">
        <div className="cta-box">
          <span className="label">Join the Conversation</span>
          <h2>Know someone with a story to tell?</h2>
          <p>We look for guests who have lived through real transitions and are willing to talk about it honestly. Not the polished version. The real one.</p>
          <div className="cta-actions">
            <Link href="/guest-submission" className="btn btn-gold">Submit a Guest</Link>
            <Link href="/about" className="btn btn-glass">About the Show</Link>
          </div>
        </div>
      </section>
    </>
  )
}
