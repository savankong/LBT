import type { Metadata } from 'next'
import Link from 'next/link'
import { getEpisodes } from '@/lib/episodes-db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Life Between Titles — Podcast Network for Career Transitions',
  description: 'Honest, unscripted stories from people navigating layoffs, career pivots, burnout, and identity shifts. Three shows. Free everywhere you listen.',
  alternates: { canonical: 'https://www.lifebetweentitles.com' },
}

export default async function HomePage() {
  const episodes = await getEpisodes()
  const featured = episodes.find(e => e.status === 'Published' && e.photo) ?? episodes[0]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <div className="hero-pillars" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/savan-bw.png" alt="" className="hero-figure" aria-hidden="true" />
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-bar" />
              <span className="hero-badge-text">A Podcast Network for Career Transitions</span>
            </div>
            <h1>
              <span>Where one</span>
              <span className="split">title ends</span>
              <span className="magenta">&amp; the real</span>
              <span className="split">story begins.</span>
            </h1>
            <p className="hero-subtitle">
              Honest stories of anxiety, loss, and the light that finds you when you least expect it.
            </p>
            <div className="hero-actions">
              <Link href="/shows" className="btn btn-gold">See All Episodes →</Link>
              <Link href="/guest-submission" className="btn btn-glass" style={{ color: '#fff', borderColor: '#fff' }}>Submit a Guest</Link>
            </div>
          </div>

          {featured && (
            <Link href={`/shows/${featured.slug}`} className="featured-ep-link">
              <div className="featured-ep">
                <div className="featured-ep-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.photo} alt={featured.guest} referrerPolicy="no-referrer" />
                </div>
                <div className="featured-ep-body">
                  <div className="featured-ep-meta">
                    <span className="featured-ep-badge">Latest Episode</span>
                    <span className="featured-ep-show">
                      {featured.show} · S{String(featured.season ?? 1).padStart(2, '0')}
                      {featured.episode ? ` E${String(featured.episode).padStart(2, '0')}` : ''}
                    </span>
                  </div>
                  <div className="featured-ep-title">{featured.youtubeTitle}</div>
                  <div className="featured-ep-guest">With {featured.guest}</div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ── Three Shows ──────────────────────────────────── */}
      <section className="shows-section" id="shows" aria-labelledby="shows-heading">
        <div className="container">
          <div className="shows-section-head">
            <div>
              <span className="label">The Shows</span>
              <h2 id="shows-heading">Three shows.<br />One honest conversation.</h2>
            </div>
            <Link href="/shows" className="link-arrow">Browse all shows →</Link>
          </div>
          <div className="shows-grid-3">
            {[
              { n: 'I', tag: 'Flagship Show', name: 'Life Between Titles', desc: 'Raw, unscripted conversations with people in the middle of a major career transition.' },
              { n: 'II', tag: 'Expert Conversations', name: 'Office Hours', desc: 'Practical conversations with coaches, recruiters, therapists and executives.' },
              { n: 'III', tag: 'Unique Careers', name: 'Work, Unscripted', desc: 'A deep dive into careers most people have never considered.' },
            ].map(s => (
              <div className="shows-grid-3-cell" key={s.n}>
                <div className="shows-grid-3-numeral">{s.n}</div>
                <div className="shows-grid-3-tag">{s.tag}</div>
                <div className="shows-grid-3-title">{s.name}</div>
                <p className="shows-grid-3-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stat band ────────────────────────────────────── */}
      <section className="stat-band" aria-label="Stat">
        <div className="container stat-band-inner">
          <div className="stat-band-num">40+</div>
          <div className="stat-band-text">Conversations and counting — free everywhere you listen.</div>
        </div>
      </section>

      {/* ── Origin Story ─────────────────────────────────── */}
      <section className="origin-section" id="story" aria-labelledby="story-heading">
        <div className="container origin-grid">
          <div>
            <span className="label">The Origin Story</span>
            <h2 id="story-heading">It started with the end…</h2>
            <p className="origin-quote">
              &ldquo;Nobody wants to sit in the part where you don&apos;t yet know who you are without the title.&rdquo;
            </p>
            <p className="origin-body">
              There&apos;s a version of this story that starts with a job title — a pretty good one. Then one day, it was gone. Life Between Titles is for that middle part, after the door closes and before anything new opens.
            </p>
            <Link href="/about" className="link-arrow origin-link">Read our story →</Link>
          </div>
          <div className="origin-aside">
            <div className="origin-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/savan-homepage.png" alt="Savan Kong, Founder and Host of Life Between Titles" />
            </div>
            <div className="origin-name">Savan Kong</div>
            <div className="origin-role">Founder &amp; Host</div>
            <div className="origin-launched">Launched Oct 2025</div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-bleach" id="submit" aria-label="Call to action">
        <div className="cta-bleach-glow" aria-hidden="true" />
        <div className="container cta-bleach-inner">
          <span className="label">Your Transition Is The Story</span>
          <h2>
            <span className="black">Now</span><br />
            <span className="magenta-split">What?</span>
          </h2>
          <p className="cta-bleach-sub">Know someone in the middle of it? Put them forward — or just press play.</p>
          <div className="cta-bleach-actions">
            <Link href="/guest-submission" className="btn btn-glass">Submit a Guest →</Link>
            <Link href="/shows" className="btn btn-gold">Listen Now</Link>
          </div>
        </div>
      </section>
    </>
  )
}
