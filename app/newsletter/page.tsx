import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'The Life Between Titles newsletter explores career transition, identity, and what it really means to start over — delivered to your inbox via Substack.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/newsletter' },
}

const CARDS = [
  { title: 'Real Stories', body: "Deep dives into the experiences of people navigating major life and career transitions — the parts they don't put on LinkedIn." },
  { title: 'Honest Reflection', body: 'No highlight reels. No "and then it all worked out." Just honest writing about what transition actually feels like from the inside.' },
  { title: 'Practical Insight', body: "Perspectives from guests, readers, and the founder — things that are actually useful when you're in the middle of figuring it out." },
]

export default function NewsletterPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Stay Connected</span>
            <h1>The Newsletter</h1>
            <p>Thoughts on career transition, identity, and what it really means to start over — delivered to your inbox.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="glass-gold" style={{borderRadius:20,padding:'56px 48px',marginBottom:80}}>
            <span className="label" style={{display:'block',marginBottom:16}}>Life Between Titles on Substack</span>
            <h2 style={{marginBottom:16}}>The job title is gone.<br /><em>The panic is real.</em></h2>
            <p style={{maxWidth:600,fontSize:'1.02rem',lineHeight:1.8}}>LBT is where people just like you found what was left — and what was actually worth keeping. The newsletter explores life transitions after job loss: the identity crisis nobody talks about, the slow work of figuring out who you are without a title, and the surprising things that happen when you stop rushing to the next chapter.</p>
            <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{marginTop:32,display:'inline-flex'}}>Subscribe on Substack →</a>
          </div>

          <span className="label" style={{marginBottom:24,display:'block'}}>What to Expect</span>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
            {CARDS.map(c => (
              <div key={c.title} className="glass" style={{borderRadius:16,padding:'36px 28px'}}>
                <h4 style={{marginBottom:12,fontSize:'1.1rem'}}>{c.title}</h4>
                <p style={{fontSize:'.9rem'}}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />
      <section className="cta-section">
        <div className="cta-box">
          <span className="label">Free to Read</span>
          <h2>Join the community</h2>
          <p>Subscribe on Substack and get every new issue in your inbox. No spam, no upsells — just honest writing about what matters.</p>
          <div className="cta-actions">
            <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe on Substack</a>
          </div>
        </div>
      </section>
    </>
  )
}
