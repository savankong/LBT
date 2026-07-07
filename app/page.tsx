import type { Metadata } from 'next'
import Link from 'next/link'
import { getEpisodes, getFeaturedEpisodes } from '@/lib/episodes-db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Life Between Titles | Podcast Network for Career Transitions',
  description: 'Honest, unscripted stories from people navigating layoffs, career pivots, burnout, and identity shifts. Three shows. Free everywhere you listen.',
  alternates: { canonical: 'https://www.lifebetweentitles.com' },
  openGraph: {
    title: 'Life Between Titles | Podcast Network for Career Transitions',
    description: 'Honest, unscripted stories from people navigating layoffs, career pivots, burnout, and identity shifts. Three shows. Free everywhere you listen.',
    images: [{ url: 'https://www.lifebetweentitles.com/savan-homepage.png', width: 1200, height: 630, alt: 'Life Between Titles — Podcast Network for Career Transitions' }],
  },
}

const SHOW_COLOR: Record<string, string> = {
  'Life Between Titles': '#ff1b8d',
  'Work Unscripted': '#00e0ff',
  'Office Hours': '#ffb800',
}

export default async function HomePage() {
  const [episodes, spotlightEps] = await Promise.all([getEpisodes(), getFeaturedEpisodes()])
  // Hero featured: first manually-featured ep, else newest published with photo
  const featured = spotlightEps[0] ?? episodes.find(e => e.status === 'Published' && e.photo) ?? episodes[0]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <div className="hero-pillars" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-top-row">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/savan-bw.png" alt="" className="hero-figure" aria-hidden="true" />
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
                    <span className="featured-ep-badge">{featured.homepageFeatured ? 'Spotlight' : 'Latest Episode'}</span>
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

      {/* ── Book Promo ───────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px,7vh,80px) 0', background: '#0d0d0d', borderBottom: '1px solid #1a1a1a' }} aria-label="The Book">
        <div style={{ maxWidth: '100%', padding: '0 clamp(24px,5vw,80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', maxWidth: 1400, margin: '0 auto' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/book">
              <img src="/Cover-LaidOff.jpg" alt="Laid Off and Lost book cover"
                style={{ width: 'clamp(110px,13vw,180px)', height: 'auto', display: 'block', filter: 'drop-shadow(0 16px 40px rgba(0,0,0,.7))', borderRadius: 4 }} />
            </Link>
            <div>
              <span className="label" style={{ color: 'var(--terra)', display: 'block', marginBottom: 10 }}>New Book. Now Available.</span>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem,3vw,2.4rem)', marginBottom: 14, lineHeight: 1.05 }}>
                Laid Off and Lost.
              </h2>
              <p style={{ color: '#bbb', fontSize: 'clamp(.88rem,1.2vw,1rem)', lineHeight: 1.8, marginBottom: 10, maxWidth: 680 }}>
                Most career books teach you how to craft a new resume. This one tells you the whole truth about what happens when the career comes to an end and nobody talks about it: the identity crisis that emerges when you lose your title, the isolation that silently worsens the situation, and the process of clarifying what you are actually trying to rebuild.
              </p>
              <p style={{ color: '#888', fontSize: 'clamp(.85rem,1.1vw,.95rem)', lineHeight: 1.75, marginBottom: 24, maxWidth: 680 }}>
                Written from inside the transition itself, not the other side of it. Savan Kong was unemployed for a year after leaving the Department of Defense, received an ADHD diagnosis at 46, and wrote every page while still figuring it out. Each chapter ends with a Try This section: specific, doable actions for that week.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="https://www.amazon.com/dp/B0H7P4DGHX" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 22px', borderRadius: 10, background: 'var(--terra)', color: '#fff', fontWeight: 600, fontSize: '.88rem', textDecoration: 'none', letterSpacing: '.02em' }}>
                  Kindle →
                </a>
                <a href="https://www.amazon.com/dp/B0H7QDNCB2" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 22px', borderRadius: 10, border: '1.5px solid #444', color: '#fff', fontWeight: 600, fontSize: '.88rem', textDecoration: 'none' }}>
                  Paperback →
                </a>
                <Link href="/book" style={{ color: '#555', fontWeight: 600, fontSize: '.85rem', textDecoration: 'none' }}>
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Spotlight Episodes (admin-curated) ───────────── */}
      {spotlightEps.length > 1 && (
        <section style={{ padding: '56px 0', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }} aria-label="Spotlight Episodes">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
              <div>
                <span className="label">Spotlight</span>
                <h2 style={{ margin: 0, fontSize: 'clamp(1.4rem,3vw,2rem)' }}>Episodes worth revisiting.</h2>
              </div>
              <Link href="/shows" className="link-arrow" style={{ flexShrink: 0 }}>All episodes →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
              {spotlightEps.filter(ep => ep.slug !== featured?.slug).map(ep => {
                const color = SHOW_COLOR[ep.show] ?? '#ff1b8d'
                return (
                  <Link key={ep.slug} href={`/shows/${ep.slug}`} style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', textDecoration: 'none', transition: 'box-shadow .2s' }}>
                    {ep.photo ? (
                      <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer"
                        style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', objectPosition: 'center 20%' }} />
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '16/9', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color }} />
                    )}
                    <div style={{ padding: '14px 16px', flex: 1 }}>
                      <p style={{ margin: '0 0 6px', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color }}>{ep.show}</p>
                      <p style={{ margin: '0 0 4px', fontSize: '.92rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35 }}>{ep.guest}</p>
                      <p style={{ margin: 0, fontSize: '.78rem', color: 'var(--faint)', lineHeight: 1.4 }}>{ep.youtubeTitle}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

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
          <div className="stat-band-text">Conversations and counting. Free everywhere you listen.</div>
        </div>
      </section>

      {/* ── Origin Story ─────────────────────────────────── */}
      <section className="origin-section" id="story" aria-labelledby="story-heading">
        <div className="container origin-grid">
          <div>
            <Link href="/about" style={{ display: 'block' }}>
              <span className="label">The Origin Story</span>
              <h2 id="story-heading">It started with the end…</h2>
            </Link>
            <p className="origin-quote">
              &ldquo;Nobody wants to sit in the part where you don&apos;t yet know who you are without the title.&rdquo;
            </p>
            <p className="origin-body">
              There&apos;s a version of this story that starts with a job title. A pretty good one. Then one day, it was gone. Life Between Titles is for that middle part, after the door closes and before anything new opens.
            </p>
            <Link href="/about" className="link-arrow origin-link">Read our story →</Link>
          </div>
          <Link href="/about" className="origin-aside">
            <div className="origin-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/savan-homepage.png" alt="Savan Kong, Founder and Host of Life Between Titles" />
            </div>
            <div className="origin-name">Savan Kong</div>
            <div className="origin-role">Founder &amp; Host</div>
            <div className="origin-launched">Launched Oct 2025</div>
          </Link>
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
          <p className="cta-bleach-sub">Know someone in the middle of it? Put them forward. Or just press play.</p>
          <div className="cta-bleach-actions">
            <Link href="/guest-submission" className="btn btn-glass">Submit a Guest →</Link>
            <Link href="/shows" className="btn btn-gold">Listen Now</Link>
          </div>
        </div>
      </section>
    </>
  )
}
