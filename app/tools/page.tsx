import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Career Toolkit | Life Between Titles',
  description: 'Free tools to help you navigate your career transition — CCAT practice tests, resume tips, and more.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/tools' },
  openGraph: {
    title: 'Career Toolkit | Life Between Titles',
    description: 'Free tools to help you navigate your career transition.',
    images: [{ url: 'https://www.lifebetweentitles.com/savan-homepage.png', width: 1200, height: 630 }],
  },
}

const TOOLS = [
  {
    tag: 'Aptitude Testing',
    title: 'CCAT Practice',
    body: 'The Criteria Cognitive Aptitude Test is used by thousands of employers in their hiring process. Practice free — timed full tests (50 questions, 15 min), sprints, and drills by category: math, verbal, and spatial reasoning.',
    href: '/ccat/index.html',
    live: true,
  },
  {
    tag: 'Resume',
    title: 'Resume Tips',
    body: 'Proven frameworks for writing a resume that actually gets read — what to cut, what to lead with, and how to frame a career transition without apologizing for it.',
    href: '#',
    live: false,
  },
  {
    tag: 'Interviewing',
    title: 'Interview Prep',
    body: 'Common behavioral question banks and frameworks for answering confidently, including the ones that catch people off guard when they are mid-transition.',
    href: '#',
    live: false,
  },
]

export default function ToolsPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Free Resources</span>
            <h1>Career Toolkit</h1>
            <p>Practical tools for people navigating a career transition. All free, no sign-up required.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="nl-page-layout">

            {/* ── Main content ── */}
            <div>
              <p style={{ maxWidth: 640, fontSize: '1.02rem', lineHeight: 1.8, marginBottom: 18 }}>
                Most career resources assume you already know what you want. These don&apos;t. They meet you where most
                transitions actually start — in the middle of the uncertainty, before anything is clear.
              </p>
              <p style={{ maxWidth: 640, fontSize: '1.02rem', lineHeight: 1.8, marginBottom: 40 }}>
                We built this section to give you concrete things to do when &ldquo;just take it one day at a time&rdquo;
                isn&apos;t enough. Start with the CCAT if you&apos;re job hunting — it shows up in more hiring processes
                than most people realize, and practicing it takes the surprise out of it.
              </p>

              <span className="label" style={{ marginBottom: 24, display: 'block' }}>What&apos;s Here</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="nl-cards-grid">
                {TOOLS.map(t => (
                  <div key={t.title} className="glass" style={{ borderRadius: 0, padding: '36px 28px', opacity: t.live ? 1 : 0.55 }}>
                    <span className="label" style={{ display: 'block', marginBottom: 10, color: 'var(--terra)' }}>{t.tag}</span>
                    <h4 style={{ marginBottom: 12, fontSize: '1.1rem' }}>{t.title}</h4>
                    <p style={{ fontSize: '.9rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 20 }}>{t.body}</p>
                    {t.live ? (
                      <a href={t.href} className="btn btn-gold" style={{ display: 'inline-flex', textDecoration: 'none', fontSize: '.85rem' }}>
                        Start Practicing →
                      </a>
                    ) : (
                      <span style={{ fontSize: '.8rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>Coming Soon</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Aside ── */}
            <aside className="nl-page-aside">
              <div className="nl-page-subscribe-box">
                <span className="label">Free · No Sign-up</span>
                <h3>CCAT Practice</h3>
                <p>50 questions, 15-minute timer — the real format. Timed full tests, 20-question sprints, or untimed drills with instant feedback. Your history saves automatically.</p>
                <a href="/ccat/index.html" className="btn btn-gold">Launch Practice Test →</a>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ padding: 'clamp(40px,6vh,64px) 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 560 }}>
          <span className="label" style={{ display: 'block', marginBottom: 10 }}>While You&apos;re Practicing</span>
          <h2 style={{ marginBottom: 14, fontSize: 'clamp(1.3rem,2.5vw,1.9rem)' }}>Hear from people who made it through.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24, lineHeight: 1.7 }}>Every episode is a conversation with someone who was exactly where you are — and figured something out.</p>
          <Link href="/shows" className="btn btn-gold">Browse All Episodes →</Link>
        </div>
      </section>
    </>
  )
}
