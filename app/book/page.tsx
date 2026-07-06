import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Laid Off and Lost — The Book by Savan Kong',
  description: 'Laid Off and Lost by Savanrith Kong. Available now in Kindle and Paperback. A book for everyone who has ever sat in the middle part of a career transition and wondered if they were going to be okay.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/book' },
  openGraph: {
    title: 'Laid Off and Lost — by Savan Kong',
    description: 'Available now on Amazon. Kindle and Paperback.',
    images: [{ url: 'https://www.lifebetweentitles.com/ebook.png', width: 800, height: 1000, alt: 'Laid Off and Lost book cover' }],
  },
}

const KINDLE_URL = 'https://www.amazon.com/dp/B0H7P4DGHX'
const PAPERBACK_URL = 'https://www.amazon.com/dp/B0H7QDNCB2'
const AUTHOR_URL = 'https://www.amazon.com/author/savanrithkong'

export default function BookPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--ink)', borderBottom: '1px solid #222' }}>
        <div className="container" style={{ paddingTop: 'clamp(48px,8vh,96px)', paddingBottom: 'clamp(48px,8vh,96px)' }}>
          <div className="book-grid">
            {/* Copy */}
            <div className="book-copy">
              <span className="label" style={{ color: 'var(--terra)' }}>Now Available</span>
              <h1 style={{ color: '#fff', fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 1.05, marginBottom: 12, letterSpacing: '-.02em' }}>
                Laid Off<br />
                <span style={{ color: 'var(--terra)' }}>and Lost.</span>
              </h1>
              <p style={{ color: '#aaa', fontSize: 'clamp(.95rem,1.3vw,1.1rem)', lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
                A raw, honest account of what it really feels like to lose a title — and what becomes possible when you stop letting one define you. By Savanrith Kong, founder of Life Between Titles.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={KINDLE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold"
                  style={{ fontWeight: 700 }}>
                  Buy on Kindle →
                </a>
                <a href={PAPERBACK_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: 10, border: '1.5px solid #444', color: '#fff', fontWeight: 700, fontSize: '.88rem', letterSpacing: '.04em', textDecoration: 'none', background: 'transparent', transition: 'border-color .2s' }}>
                  Buy Paperback →
                </a>
              </div>
              <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: 20, fontSize: '.78rem', color: '#666', textDecoration: 'none', letterSpacing: '.04em' }}>
                View author page on Amazon →
              </a>
            </div>

            {/* Cover */}
            <div className="book-cover-wrap">
              <img src="/ebook.png" alt="Laid Off and Lost — book cover" className="book-cover-img" />
            </div>
          </div>
        </div>
      </div>

      {/* ── About the book ── */}
      <section style={{ padding: 'clamp(56px,8vh,96px) 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="label" style={{ display: 'block', marginBottom: 12 }}>About the Book</span>
          <h2 style={{ marginBottom: 28, fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>
            Titles are temporary.<br /><em>Identity is not.</em>
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20 }}>
            This book started with one question: why does losing a job feel like losing yourself? Drawing from dozens of honest conversations with people who have lived through layoffs, career pivots, burnout, and reinvention, <em>Laid Off and Lost</em> goes deeper than any single episode of the podcast can.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20 }}>
            It&apos;s for the person in the messy middle — after the door closes and before anything new opens. For anyone who has ever stared at a blank job application and wondered if they were going to be okay.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 40 }}>
            The answer, it turns out, is yes. But the path there is rarely the one you planned.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={KINDLE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">Kindle Edition →</a>
            <a href={PAPERBACK_URL} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'var(--bg2)', color: 'var(--ink)', border: '1.5px solid var(--border-med)' }}>Paperback Edition →</a>
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
