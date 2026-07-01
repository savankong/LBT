import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'The Life Between Titles newsletter explores career transition, identity, and what it really means to start over. Delivered to your inbox via Substack.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/newsletter' },
}

const CARDS = [
  { title: 'Real Stories', body: "Deep dives into the experiences of people navigating major life and career transitions. The parts they don't put on LinkedIn." },
  { title: 'Honest Reflection', body: 'No highlight reels. No "and then it all worked out." Just honest writing about what transition actually feels like from the inside.' },
  { title: 'Practical Insight', body: "Perspectives from guests, readers, and the founder. Things that are actually useful when you're in the middle of figuring it out." },
]

export default function NewsletterPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Stay Connected</span>
            <h1>The Newsletter</h1>
            <p>Thoughts on career transition, identity, and what it really means to start over. Delivered to your inbox.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="nl-page-layout">
            <div>
              <p style={{ maxWidth: 640, fontSize: '1.02rem', lineHeight: 1.8, marginBottom: 18 }}>
                Each issue is a written companion to the show. Essays on what it actually feels like to lose the
                identity you built your life around, written from the middle of it, not the comfortable other side.
                No frameworks, no &ldquo;5 steps to reinvent yourself.&rdquo; Just honest writing about the gap.
              </p>
              <p style={{ maxWidth: 640, fontSize: '1.02rem', lineHeight: 1.8, marginBottom: 18 }}>
                You&apos;ll get first access to new episodes, behind-the-scenes notes from conversations that didn&apos;t
                make the final cut, and reflections on the questions listeners and guests keep coming back to.
                Things like who am I without this job, and what do I actually do with the silence.
              </p>
              <p style={{ maxWidth: 640, fontSize: '1.02rem', lineHeight: 1.8, marginBottom: 40 }}>
                Free, no spam, no upsells. Unsubscribe anytime. Most people stick around for the part where
                it stops feeling like advice and starts feeling like company.
              </p>

              <span className="label" style={{ marginBottom: 24, display: 'block' }}>What to Expect</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="nl-cards-grid">
                {CARDS.map(c => (
                  <div key={c.title} className="glass" style={{ borderRadius: 0, padding: '36px 28px' }}>
                    <h4 style={{ marginBottom: 12, fontSize: '1.1rem' }}>{c.title}</h4>
                    <p style={{ fontSize: '.9rem' }}>{c.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="nl-page-aside">
              <div className="nl-page-subscribe-box">
                <span className="label">Free Newsletter</span>
                <h3>Subscribe on Substack</h3>
                <p>Get every new issue in your inbox the moment it&apos;s published. Read recent issues first if you want a feel for it.</p>
                <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe →</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
