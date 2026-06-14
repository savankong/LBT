import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Newsletter' }

export default function NewsletterPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Stay Connected</span>
            <h1>The Newsletter</h1>
            <p>
              Thoughts on career transition, identity, and what it really means to start over — delivered to your inbox.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="newsletter-card glass-gold">
            <span className="label" style={{ display: 'block', marginBottom: '16px' }}>Life Between Titles on Substack</span>
            <h2 style={{ marginBottom: '16px' }}>
              The job title is gone.<br /><em>The panic is real.</em>
            </h2>
            <p>
              LBT is where people just like you found what was left — and what was actually worth keeping. The newsletter explores life transitions after job loss: the identity crisis nobody talks about, the slow work of figuring out who you are without a title, and the surprising things that happen when you stop rushing to the next chapter.
            </p>
            <a
              href="https://lifebetweentitles.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ marginTop: '32px', display: 'inline-flex' }}
            >
              Subscribe on Substack →
            </a>
          </div>

          <div style={{ marginTop: '80px' }}>
            <span className="label" style={{ marginBottom: '24px' }}>What to Expect</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {[
                {
                  title: 'Real Stories',
                  body: 'Deep dives into the experiences of people navigating major life and career transitions — the parts they don\'t put on LinkedIn.',
                },
                {
                  title: 'Honest Reflection',
                  body: 'No highlight reels. No "and then it all worked out." Just honest writing about what transition actually feels like from the inside.',
                },
                {
                  title: 'Practical Insight',
                  body: 'Perspectives from guests, readers, and the founder — things that are actually useful when you\'re in the middle of figuring it out.',
                },
              ].map(c => (
                <div key={c.title} className="glass" style={{ borderRadius: '16px', padding: '36px 28px' }}>
                  <h4 style={{ marginBottom: '12px', fontSize: '1.3rem' }}>{c.title}</h4>
                  <p style={{ fontSize: '0.9rem' }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
