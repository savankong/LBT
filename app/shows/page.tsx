import type { Metadata } from 'next'
import ShowsClient from '@/components/ShowsClient'
import { getEpisodes } from '@/lib/episodes-db'

export const dynamic = 'force-dynamic'

// Issue 7: was "Episodes | Life Between Titles" → template doubled it to "... | Life Between Titles | Life Between Titles"
// Issue 9: add og:image fallback
export const metadata: Metadata = {
  title: 'All Episodes',
  description: 'Every episode of Life Between Titles, Work Unscripted, and Office Hours. Raw conversations about career transitions, identity, and what comes next.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/shows' },
  openGraph: {
    title: 'All Episodes | Life Between Titles',
    description: 'Three shows. One honest conversation about what happens between one chapter and the next.',
    images: [{ url: 'https://www.lifebetweentitles.com/savan-homepage.png', width: 1200, height: 630, alt: 'Life Between Titles — Podcast Network for Career Transitions' }],
  },
}

// Issue 11: server-rendered show descriptions for GEO/AI — visually compact, subordinate to episode grid
function ShowsAbout() {
  const shows = [
    {
      color: '#ff1b8d',
      name: 'Life Between Titles',
      tagline: 'The flagship show.',
      desc: 'Raw, unscripted conversations with people navigating layoffs, burnout, and career identity shifts. Guests include a USAID humanitarian worker whose agency was dismantled, a DoD senior executive who retired early to Mexico, a former VA attorney who became a veterans’ advocacy leader, and a UX designer who pivoted careers in her forties. For anyone in the uncertain space between one chapter and the next.',
    },
    {
      color: '#00e0ff',
      name: 'Work Unscripted',
      tagline: 'Careers most people have never considered.',
      desc: 'Deep dives into unusual professional paths. Guests include the world’s top professional disc golfer, a pediatric craniofacial surgeon at Children’s Hospital of Philadelphia, a Marine General who led U.S. Cyber Command, the DoD Chief Information Officer, a scientist who pioneered insect protein research, and an immigration attorney who built her practice to serve underrepresented communities.',
    },
    {
      color: '#ffb800',
      name: 'Office Hours',
      tagline: 'The practical counterpart.',
      desc: 'Structured conversations with the coaches, consultants, and experts whose work is to help people navigate career transitions. Shorter and more focused than the other shows — each episode addresses a specific question: how to give feedback, how to find the next role, what it takes to become a leader worth following.',
    },
  ]

  return (
    <section aria-label="About the Shows" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div className="container" style={{ maxWidth: 1100, paddingTop: 20, paddingBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 32px' }}>
          {shows.map(s => (
            <details key={s.name} open style={{ borderTop: `2px solid ${s.color}`, paddingTop: 12, paddingBottom: 12 }}>
              <summary style={{ listStyle: 'none', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 8, userSelect: 'none' }}>
                <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: s.color, whiteSpace: 'nowrap' }}>{s.name}</span>
                <span style={{ fontSize: '.75rem', color: 'var(--faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{s.tagline}</span>
                <span style={{ fontSize: '.65rem', color: 'var(--faint)', flexShrink: 0 }}>▸</span>
              </summary>
              <p style={{ fontSize: '.78rem', lineHeight: 1.7, color: 'var(--muted)', marginTop: 10, marginBottom: 0 }}>{s.desc}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lifebetweentitles.com' },
    { '@type': 'ListItem', position: 2, name: 'Episodes', item: 'https://www.lifebetweentitles.com/shows' },
  ],
}

export default async function ShowsPage() {
  const episodes = await getEpisodes()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div style={{ paddingTop: 'var(--nav-h)', borderBottom: '3px solid var(--ink)', background: 'var(--bg)' }}>
        <div className="container" style={{ textAlign: 'center', paddingTop: 56, paddingBottom: 8 }}>
          <span className="label" style={{ display: 'block', marginBottom: 10 }}>New episodes every week</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginBottom: 0 }}>All Episodes</h1>
        </div>
      </div>

      <ShowsAbout />

      <ShowsClient episodes={episodes} />

      <div style={{ height: 80 }} />
    </>
  )
}
