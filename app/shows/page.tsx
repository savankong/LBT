import type { Metadata } from 'next'
import ShowsClient from '@/components/ShowsClient'
import { getEpisodes } from '@/lib/episodes-db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Episodes | Life Between Titles',
  description: 'Every episode of Life Between Titles, Work Unscripted, and Office Hours. Raw conversations about career transitions, identity, and what comes next.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/shows' },
  openGraph: {
    title: 'Episodes | Life Between Titles',
    description: 'Three shows. One honest conversation about what happens between one chapter and the next.',
  },
}

export default async function ShowsPage() {
  const episodes = await getEpisodes()

  return (
    <>
      <div style={{ paddingTop: 'var(--nav-h)', borderBottom: '3px solid var(--ink)', background: 'var(--bg)' }}>
        <div className="container" style={{ textAlign: 'center', paddingTop: 56, paddingBottom: 8 }}>
          <span className="label" style={{ display: 'block', marginBottom: 10 }}>New episodes every week</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginBottom: 0 }}>All Episodes</h1>
        </div>
      </div>

      <ShowsClient episodes={episodes} />

      <div style={{ height: 80 }} />
    </>
  )
}
