import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'The LBT Book' }

export default function BookPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Coming Soon</span>
            <h1>The LBT<br /><em>Book</em></h1>
            <p>
              The next chapter of Life Between Titles — a book for everyone who has ever sat in the middle part and wondered if they were going to be okay.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <span className="label">About the Book</span>
              <h2 style={{ marginBottom: '24px' }}>Titles are temporary.<br /><em>Identity is not.</em></h2>
              <p style={{ marginBottom: '18px', fontSize: '1.02rem', lineHeight: '1.82' }}>
                The Life Between Titles book is a natural extension of the conversations we&apos;ve been having since October 2025 — an exploration of what it really means to lose a title, and what&apos;s possible when you stop letting one define you.
              </p>
              <p style={{ marginBottom: '18px', fontSize: '1.02rem', lineHeight: '1.82' }}>
                Drawing from dozens of honest conversations with people who have lived through layoffs, career pivots, burnout, and reinvention, the book will go deeper than any single episode can.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--gold-l)', lineHeight: '1.5' }}>
                More details — and a way to be first to know when it&apos;s available — coming soon.
              </p>
              <div style={{ marginTop: '36px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href="https://lifebetweentitles.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  Get Early Access Updates
                </a>
                <Link href="/about" className="btn btn-glass">Our Story</Link>
              </div>
            </div>
            <div className="glass-gold" style={{ borderRadius: '24px', padding: '64px 48px', textAlign: 'center', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block' }}>Life Between Titles</span>
              <h3 style={{ fontSize: '2.8rem', fontWeight: 300, lineHeight: 1.1, maxWidth: '240px' }}>Titles Are Temporary. Identity Is Not.</h3>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: 'var(--text-3)', marginTop: '12px' }}>Coming Soon</span>
              <div style={{ width: '40px', height: '2px', background: 'var(--gold)', marginTop: '24px', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="cta-section">
        <div className="cta-box glass-gold">
          <span className="label">Stay in the Loop</span>
          <h2>Be the first<br /><em>to know</em></h2>
          <p>Subscribe to the Life Between Titles newsletter to get updates on the book, new episodes, and everything in between.</p>
          <div className="cta-actions">
            <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe on Substack</a>
            <Link href="/shows" className="btn btn-glass">Listen to the Show</Link>
          </div>
        </div>
      </section>
    </>
  )
}
