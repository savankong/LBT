import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Laid Off and Lost — The Book by Savan Kong',
  description: 'Laid Off and Lost by Savanrith Kong. Available now in Kindle and Paperback. A book for everyone who has ever sat in the middle part of a career transition and wondered if they were going to be okay.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/book' },
  openGraph: {
    title: 'Laid Off and Lost — by Savan Kong',
    description: 'Available now on Amazon. Kindle and Paperback.',
    images: [{ url: 'https://www.lifebetweentitles.com/Cover-LaidOff.jpg', width: 800, height: 1000, alt: 'Laid Off and Lost book cover' }],
  },
}

const KINDLE_URL = 'https://www.amazon.com/dp/B0H7P4DGHX'
const PAPERBACK_URL = 'https://www.amazon.com/dp/B0H7QDNCB2'
const AUTHOR_URL = 'https://www.amazon.com/author/savanrithkong'

export default function BookPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div style={{ paddingTop: 'var(--nav-h)', background: '#111', borderBottom: '1px solid #1e1e1e' }}>
        <div className="container" style={{ paddingTop: 'clamp(48px,8vh,96px)', paddingBottom: 'clamp(48px,8vh,96px)' }}>
          <div className="book-grid">
            {/* Copy */}
            <div className="book-copy">
              <span className="label" style={{ color: 'var(--terra)' }}>Now Available</span>
              <h1 style={{ color: '#fff', fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 1.05, marginBottom: 12, letterSpacing: '-.02em' }}>
                Laid Off<br />
                <span style={{ color: 'var(--terra)' }}>and Lost.</span>
              </h1>
              <p style={{ color: '#bbb', fontSize: 'clamp(.95rem,1.3vw,1.1rem)', lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
                A raw, honest account of what it really feels like to lose a title and what becomes possible when you stop letting one define you. By Savanrith Kong, founder of Life Between Titles.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={KINDLE_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: 10, background: 'var(--terra)', color: '#fff', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none', letterSpacing: '.02em' }}>
                  Buy on Kindle →
                </a>
                <a href={PAPERBACK_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: 10, border: '1.5px solid #444', color: '#fff', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none' }}>
                  Buy Paperback →
                </a>
              </div>
              <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: 20, fontSize: '.78rem', color: '#555', textDecoration: 'none', letterSpacing: '.04em' }}>
                View author page on Amazon →
              </a>
            </div>

            {/* Cover */}
            <div className="book-cover-wrap">
              <img src="/Cover-LaidOff.jpg" alt="Laid Off and Lost — book cover" className="book-cover-img" />
            </div>
          </div>
        </div>
      </div>

      {/* ── About the book ── */}
      <section style={{ padding: 'clamp(56px,8vh,96px) 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="label" style={{ display: 'block', marginBottom: 12 }}>About the Book</span>
          <h2 style={{ marginBottom: 28, fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>
            Titles are temporary.<br /><em>Identity is not.</em>
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20 }}>
            Most career books teach you how to craft a new resume. This one tells you the whole truth about what happens when the career comes to an end and nobody talks about it: the identity crisis that emerges when you lose your title, the isolation that silently worsens the situation, and the process of clarifying what you are actually trying to rebuild.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20 }}>
            It took a year of interviews with 29 people to write it down: a Pentagon executive who lost two identities within one morning, a USAID employee who witnessed the collapse of her agency, a professional disc golf player whose career was never planned, a single mother who returned to school at 52 to finally chase her lifelong passion, a federal prison employee who earns the respect of those serving life sentences by working with dignity. Different experiences, backgrounds, and titles. The same core problems underneath.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20 }}>
            Savan Kong wrote this book while still in the middle of the transition himself, not on the other side of it. He was unemployed for a year after leaving the Department of Defense. He received an ADHD diagnosis at 46. Christmas was tough; the budget was tough. He is still figuring it out, and that honesty runs through every page.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20 }}>
            If you just lost a job and do not know who you are without it, this is for you. If you are still searching and doing everything right but feel completely alone in it, this is for you. If you have got the next job lined up but cannot name what you are actually rebuilding toward, this is for you too.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 40 }}>
            Each chapter ends with a Try This section: specific, doable actions for that week, not someday advice. You are not behind. You are not broken.
          </p>

          {/* Book details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px 32px', marginBottom: 40, padding: '24px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {[
              { label: 'Print Length', value: '63 pages' },
              { label: 'Language', value: 'English' },
              { label: 'Published', value: 'July 3, 2026' },
              { label: 'ISBN', value: '979-8185390962' },
            ].map(d => (
              <div key={d.label}>
                <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--faint)', margin: '0 0 4px' }}>{d.label}</p>
                <p style={{ fontSize: '.92rem', color: 'var(--ink)', margin: 0, fontWeight: 600 }}>{d.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={KINDLE_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: 10, background: 'var(--terra)', color: '#fff', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none' }}>
              Kindle Edition →
            </a>
            <a href={PAPERBACK_URL} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'var(--bg2)', color: 'var(--ink)', border: '1.5px solid var(--border-med)', fontWeight: 600 }}>
              Paperback Edition →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(48px,7vh,80px) 0', background: 'var(--bg2)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <span className="label" style={{ display: 'block', marginBottom: 12 }}>The Podcast</span>
          <h2 style={{ marginBottom: 16, fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}>Listen while you read.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 28, lineHeight: 1.7 }}>Every conversation in the book started as an episode. Go deeper with the audio.</p>
          <Link href="/shows" className="btn btn-gold">Browse All Episodes →</Link>
        </div>
      </section>
    </>
  )
}
