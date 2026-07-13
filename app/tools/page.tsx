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
    desc: 'The Criteria Cognitive Aptitude Test is used by thousands of employers in their hiring process. Practice free — timed full tests (50 questions, 15 min), sprints, and drills by category (math, verbal, spatial).',
    meta: ['50 questions', '15-min timed', 'Math · Verbal · Spatial'],
    href: '/ccat/index.html',
    cta: 'Start Practicing →',
    primary: true,
    badge: 'Free',
  },
  {
    tag: 'Coming Soon',
    title: 'Resume Tips',
    desc: 'Proven frameworks for writing a resume that actually gets read — what to cut, what to lead with, and how to frame a transition without apologizing for it.',
    meta: ['Checklist', 'Examples'],
    href: '#',
    cta: 'Coming Soon',
    primary: false,
    badge: 'Soon',
  },
  {
    tag: 'Coming Soon',
    title: 'Interview Prep',
    desc: 'Common interview question banks and frameworks for answering behavioral questions confidently, including the ones you hate most.',
    meta: ['Question bank', 'STAR method'],
    href: '#',
    cta: 'Coming Soon',
    primary: false,
    badge: 'Soon',
  },
]

export default function ToolsPage() {
  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-inner">
          <span className="label" style={{ color: 'var(--terra)' }}>Free Resources</span>
          <h1>Career Toolkit</h1>
          <p>Practical tools to help you navigate whatever transition you&apos;re in the middle of. All free.</p>
        </div>
      </div>

      {/* Tools grid */}
      <section style={{ padding: 'clamp(48px,7vh,80px) 0', background: 'var(--bg2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 20 }}>
            {TOOLS.map(t => (
              <div key={t.title} style={{
                background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12,
                padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.9rem',
                position: 'relative', opacity: t.href === '#' ? 0.6 : 1,
              }}>
                <span style={{
                  position: 'absolute', top: '1.1rem', right: '1.1rem',
                  fontSize: '.68rem', fontWeight: 700, letterSpacing: '.06em',
                  border: '1px solid var(--border-med)', borderRadius: 4, padding: '2px 7px',
                  color: t.primary ? 'var(--terra)' : 'var(--faint)',
                  borderColor: t.primary ? 'var(--terra)' : 'var(--border-med)',
                }}>{t.badge}</span>

                <div>
                  <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 8 }}>{t.tag}</p>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>{t.title}</h3>
                </div>

                <p style={{ fontSize: '.95rem', lineHeight: 1.75, color: 'var(--ink)', flex: 1 }}>{t.desc}</p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {t.meta.map(m => (
                    <span key={m} style={{ fontSize: '.75rem', fontWeight: 600, background: 'var(--bg2)', border: '1px solid var(--border-med)', borderRadius: 20, padding: '4px 12px', color: 'var(--muted)' }}>{m}</span>
                  ))}
                </div>

                {t.href !== '#' ? (
                  <Link href={t.href} className="btn btn-gold" style={{ textAlign: 'center', fontWeight: 600 }}>{t.cta}</Link>
                ) : (
                  <span className="btn" style={{ textAlign: 'center', opacity: 0.4, cursor: 'default', fontWeight: 600 }}>{t.cta}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ padding: 'clamp(40px,6vh,64px) 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
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
