import type { Metadata } from 'next'
import Link from 'next/link'
import { getEpisodes } from '@/lib/episodes-db'
import type { Show } from '@/lib/episodes'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Guests',
  description: 'Meet the guests of Life Between Titles — retired generals, surgeons, professional athletes, and people who have navigated extraordinary career transitions. Real stories, honestly told.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/guests' },
  openGraph: { title: 'Guests | Life Between Titles', description: 'From retired generals to pediatric surgeons to professional disc golfers — every guest has a real career story.' },
}

const SHOW_COLOR: Record<Show, string> = {
  'Life Between Titles': '#C26A4A',
  'Work Unscripted': '#4a7ec2',
  'Office Hours': '#7c4ac2',
}

const SHOW_ORDER: Show[] = ['Life Between Titles', 'Work Unscripted', 'Office Hours']

function episodeLabel(show: Show, season: number | undefined, episode: number | undefined) {
  if (!season && !episode) return show
  const abbr = show === 'Life Between Titles' ? 'LBT' : show === 'Work Unscripted' ? 'WU' : 'OH'
  return `${abbr} S${season ?? '?'}E${episode ?? '?'}`
}

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
            <p>From retired generals to pediatric surgeons to professional disc golfers — our guests are people who have built lives worth talking about.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="guests-grid">
            {guests.map(eps => {
              const ep = eps[0]
              const color = SHOW_COLOR[ep.show]
              return (
                <div className="guest-card" key={ep.guest} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Photo */}
                  <div className="guest-card-img" style={{ position: 'relative' }}>
                    {ep.photo ? (
                      <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color }}>
                        {ep.guest.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                    )}
                    {/* color bar at bottom of photo */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: color }} />
                  </div>

                  {/* Body */}
                  <div className="guest-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Show tag */}
                    <div className="guest-show-tag" style={{ color }}>
                      {eps.map(e => episodeLabel(e.show, e.season, e.episode)).join(' · ')}
                    </div>

                    {/* Name */}
                    <h4 style={{ fontFamily: 'var(--font-display, inherit)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.3 }}>
                      {ep.guest}
                    </h4>

                    {/* Episode title(s) */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {eps.map(e => (
                        <p key={e.slug} style={{ fontSize: '.78rem', color: 'var(--faint)', lineHeight: 1.45, margin: 0 }}>
                          {e.youtubeTitle || e.description?.slice(0, 80)}
                        </p>
                      ))}
                    </div>

                    {/* Episode link(s) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                      {eps.map(e => (
                        <Link
                          key={e.slug}
                          href={`/shows/${e.slug}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: '.68rem',
                            fontWeight: 700,
                            letterSpacing: '.08em',
                            textTransform: 'uppercase',
                            color,
                            textDecoration: 'none',
                            paddingTop: 6,
                            borderTop: '1px solid var(--border)',
                          }}
                        >
                          <span style={{ opacity: .7 }}>▶</span>
                          {eps.length > 1
                            ? episodeLabel(e.show, e.season, e.episode)
                            : 'Watch Episode'}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="divider" />
      <section className="cta-section">
        <div className="cta-box">
          <span className="label">Join the Conversation</span>
          <h2>Know someone with a story to tell?</h2>
          <p>We look for guests who have lived through real transitions and are willing to talk about it honestly — not the polished version, the real one.</p>
          <div className="cta-actions">
            <Link href="/guest-submission" className="btn btn-gold">Submit a Guest</Link>
            <Link href="/about" className="btn btn-glass">About the Show</Link>
          </div>
        </div>
      </section>
    </>
  )
}
