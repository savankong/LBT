import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Become a Sponsor' }

const TIERS = [
  {
    tier: 'Presenting',
    price: 'Custom',
    description: 'Full-episode presenting sponsorship across one or more shows. Includes host-read ad, dedicated email mention, social promotion, and website placement. Best for brands seeking deep integration with our audience.',
    features: ['Host-read 60s ad', 'Episode newsletter mention', 'Social media feature', 'Website sponsor badge', 'Custom engagement package'],
  },
  {
    tier: 'Mid-Roll',
    price: 'Custom',
    description: 'A focused, authentic mid-roll placement within individual episodes. Host-read and tailored to feel native to the conversation rather than a standard commercial break.',
    features: ['Host-read 30s ad', 'Episode show notes mention', 'Authentic brand integration', 'Audience trust premium'],
  },
  {
    tier: 'Newsletter',
    price: 'Custom',
    description: 'Direct placement in the Life Between Titles Substack newsletter — a highly engaged audience of professionals actively thinking about career and identity.',
    features: ['Sponsored content block', 'Audience: career transitioners', 'High open-rate readership', 'Link placement'],
  },
]

export default function SponsorPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Work With Us</span>
            <h1>Sponsorship<br /><em>that means something</em></h1>
            <p>
              We only partner with sponsors that genuinely help people improve their careers, lives, or wellbeing. Trust with our audience matters more than volume.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <span className="label">Our Philosophy</span>
              <h2 style={{ marginBottom: '20px' }}>We choose<br /><em>partners, not advertisers.</em></h2>
              <p style={{ marginBottom: '16px', fontSize: '1.02rem', lineHeight: '1.8' }}>
                Life Between Titles only partners with sponsors that genuinely help people improve their careers, lives, or wellbeing.
              </p>
              <p style={{ marginBottom: '16px', fontSize: '1.02rem', lineHeight: '1.8' }}>
                We believe trust with our audience matters more than volume of advertising. That means we choose partners carefully and prioritize authentic alignment over reach metrics.
              </p>
              <p style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--gold-l)' }}>
                If that approach resonates with you, we would love to talk.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { stat: '3', label: 'Active Shows' },
                { stat: '8+', label: 'Episodes Published' },
                { stat: '100%', label: 'Organic Audience' },
                { stat: '0', label: 'Irrelevant Sponsors' },
              ].map(s => (
                <div key={s.stat} className="glass" style={{ borderRadius: '12px', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', color: 'var(--gold)', fontWeight: 300, lineHeight: 1 }}>{s.stat}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-2)', fontWeight: 500 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <span className="label" style={{ marginBottom: '24px' }}>Sponsorship Options</span>
          <div className="sponsor-grid">
            {TIERS.map(t => (
              <div key={t.tier} className="sponsor-card glass">
                <div className="show-card-tag">{t.tier} Sponsor</div>
                <h3>{t.tier}</h3>
                <div className="sponsor-price">{t.price}</div>
                <p>{t.description}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {t.features.map(f => (
                    <li key={f} style={{ fontSize: '0.84rem', color: 'var(--text-2)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✦</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="cta-section">
        <div className="cta-box glass-gold">
          <span className="label">Get in Touch</span>
          <h2>Ready to<br /><em>start the conversation?</em></h2>
          <p>Reach out directly and tell us about your brand, your goals, and why you think Life Between Titles is the right fit.</p>
          <div className="cta-actions">
            <a href="mailto:hello@lifebetweentitles.com?subject=Sponsorship%20Inquiry" className="btn btn-gold">
              Apply to Become a Sponsor
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
