import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Build Your Own Show' }

const STEPS = [
  { num: '01', title: 'Define Your Thesis', body: 'Every great show starts with a clear point of view — not just a topic. We help you find the idea that only you can tell.' },
  { num: '02', title: 'Shape Your Format', body: 'Interview show, narrative series, solo commentary, or hybrid — we help you match format to your strengths and your audience.' },
  { num: '03', title: 'Build Your Brand', body: 'Name, visual identity, show art, and tone. Everything that makes a listener say "yes, this is for me."' },
  { num: '04', title: 'Launch and Grow', body: 'From first episode to first 100 listeners — we help you do it right, not just fast.' },
]

export default function BuildPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Build With Us</span>
            <h1>Build Your<br /><em>Own Show</em></h1>
            <p>
              We built Life Between Titles from scratch. Now we help others do the same — with the same level of care, intention, and honesty.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <span className="label">Why We Do This</span>
              <h2 style={{ marginBottom: '24px' }}>We learned<br /><em>the hard way.</em></h2>
              <p style={{ marginBottom: '18px', lineHeight: '1.82', fontSize: '1rem' }}>
                Building a podcast from zero is harder than it looks. Not because the technology is complicated — it isn&apos;t. But because figuring out what you actually want to say, and who you want to say it to, is the work nobody talks about.
              </p>
              <p style={{ marginBottom: '18px', lineHeight: '1.82', fontSize: '1rem' }}>
                We&apos;ve done that work. We&apos;ve made the mistakes, refined the process, and built something we&apos;re genuinely proud of. If you have a story to tell — or an audience you want to build — we can help you do it with intention.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--gold-l)', lineHeight: 1.55 }}>
                Not just a podcast. A point of view.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {STEPS.map(s => (
                <div key={s.num} className="value-item glass" style={{ borderRadius: '12px' }}>
                  <div className="value-num" style={{ fontSize: '2.5rem' }}>{s.num}</div>
                  <div className="value-title">{s.title}</div>
                  <p className="value-body" style={{ fontSize: '0.88rem' }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="cta-section">
        <div className="cta-box glass-gold">
          <span className="label">Let&apos;s Talk</span>
          <h2>Ready to<br /><em>start building?</em></h2>
          <p>Tell us about your idea and we&apos;ll tell you whether we think we can help. No pitch required — just a real conversation.</p>
          <div className="cta-actions">
            <a href="mailto:hello@lifebetweentitles.com?subject=Build%20My%20Show" className="btn btn-gold">Get in Touch</a>
          </div>
        </div>
      </section>
    </>
  )
}
