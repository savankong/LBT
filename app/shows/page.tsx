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

// Issue 11: server-rendered prose about each show for GEO/AI citation
function ShowsAbout() {
  return (
    <section aria-label="About the Shows" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
      <div className="container" style={{ maxWidth: 1100, paddingTop: 56, paddingBottom: 64 }}>
        <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', textAlign: 'center', marginBottom: 48 }}>About the Shows</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>

          {/* Life Between Titles */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#ff1b8d', flexShrink: 0 }} />
              <h2 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Life Between Titles</h2>
            </div>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 14 }}>
              The flagship show. Raw, unscripted conversations with people who have lived through the kind of career moments nobody talks about honestly: the layoff that came out of nowhere, the burnout that took years to build, the identity that collapsed when the job title disappeared.
            </p>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 14 }}>
              Guests are not brought on because they have a polished success story to sell. They come on because they were willing to describe what it actually felt like in the middle. Guests have included a USAID humanitarian worker whose agency was dismantled overnight, a DoD senior executive who took early retirement to move to Mexico, a former VA attorney who became a veterans&rsquo; advocacy leader after watching the system fail the people she represented, a UX designer who changed careers through a coding bootcamp in her forties, and a single mother who rebuilt her professional life from nothing after a devastating loss.
            </p>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)' }}>
              The show is for anyone sitting in that uncertain space between one professional chapter and the next — wondering whether the disorientation they feel is a crisis or just the beginning of something better.
            </p>
          </div>

          {/* Work Unscripted */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#00e0ff', flexShrink: 0 }} />
              <h2 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Work Unscripted</h2>
            </div>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 14 }}>
              A deep dive into careers that never show up in guidance counselors&rsquo; offices. Work Unscripted is built on a simple premise: most people have a very narrow idea of what work can look like, and that is worth expanding. Every episode profiles someone who has built a life around doing something most people have never considered pursuing.
            </p>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 14 }}>
              Guests have included the world&rsquo;s top professional disc golfer, a pediatric craniofacial surgeon who performs facial reconstruction surgeries on children born with complex conditions, a Marine General who led U.S. Cyber Command, a scientist who bet his entire career on insect protein fourteen years before it became a mainstream idea, a Federal CIO who led technology transformation across one of the largest government agencies in the country, and an immigration attorney who built her practice specifically to serve communities that larger firms overlooked.
            </p>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)' }}>
              The conversations are about craft, about the unconventional path that led someone to where they are, and about what it actually takes to build a career around work that most people don&rsquo;t know exists.
            </p>
          </div>

          {/* Office Hours */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#ffb800', flexShrink: 0 }} />
              <h2 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Office Hours</h2>
            </div>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 14 }}>
              The practical counterpart to the other two shows. Where Life Between Titles features people going through career transitions and Work Unscripted explores unusual paths, Office Hours brings in the professionals whose entire work is to help people navigate those exact moments. Career coaches, executive recruiters, leadership consultants, therapists, and organizational experts share frameworks, honest assessments, and hard-won perspective.
            </p>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 14 }}>
              Guests have included a career coach who specializes in helping people through the hardest professional transitions, a leadership consultant who has spent decades studying the mechanics of bad management and what it takes to fix it, and a feedback culture expert who advises organizations on how to build environments where honest communication is actually possible.
            </p>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted)' }}>
              Office Hours is deliberately shorter and more structured than the other shows. Each episode is organized around a specific question or challenge that comes up repeatedly in career transitions: how to give feedback that changes behavior, how to find your next role when you are not sure what you want, what it actually takes to become a leader worth following. The goal is that you leave each episode with something concrete you can use.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
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

      <ShowsAbout />

      <ShowsClient episodes={episodes} />

      <div style={{ height: 80 }} />
    </>
  )
}
