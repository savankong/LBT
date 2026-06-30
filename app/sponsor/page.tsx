import type { Metadata } from 'next'
import SponsorForm from '@/components/SponsorForm'

export const metadata: Metadata = {
  title: 'Become a Sponsor',
  description: 'Partner with Life Between Titles to reach an engaged audience of professionals navigating career transitions. We only work with sponsors that genuinely help people improve their careers.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/sponsor' },
}

const TIERS = [
  { tier:'Presenting', price:'$600', unit:'/ month', description:'Full-episode presenting sponsorship across one or more shows. Includes host-read ad, dedicated email mention, social promotion, and website placement. Best for brands seeking deep integration with our audience.', features:['Host-read 60s ad','Episode newsletter mention','Social media feature','Website sponsor badge','Custom engagement package'] },
  { tier:'Mid-Roll', price:'$150', unit:'/ episode', description:'A focused, authentic mid-roll placement within individual episodes. Host-read and tailored to feel native to the conversation rather than a standard commercial break.', features:['Host-read 30s ad','Episode show notes mention','Authentic brand integration','Audience trust premium'] },
  { tier:'Newsletter', price:'$125', unit:'/ issue', description:'Direct placement in the Life Between Titles Substack newsletter — a highly engaged audience of professionals actively thinking about career and identity.', features:['Sponsored content block','Audience: career transitioners','High open-rate readership','Link placement'] },
]

const STATS = [
  { stat:'3', label:'Active Shows' },
  { stat:'40+', label:'Episodes Published' },
  { stat:'100%', label:'Organic Audience' },
  { stat:'0', label:'Irrelevant Sponsors' },
]

export default function SponsorPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Work With Us</span>
            <h1>Sponsorship that means something</h1>
            <p>We only partner with sponsors that genuinely help people improve their careers, lives, or wellbeing. Trust with our audience matters more than volume.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center',marginBottom:80}}>
            <div>
              <span className="label">Our Philosophy</span>
              <h2 style={{marginBottom:20}}>We choose partners, not advertisers.</h2>
              <p style={{marginBottom:16,fontSize:'1.02rem',lineHeight:1.8}}>Life Between Titles only partners with sponsors that genuinely help people improve their careers, lives, or wellbeing.</p>
              <p style={{marginBottom:16,fontSize:'1.02rem',lineHeight:1.8}}>We believe trust with our audience matters more than volume of advertising. That means we choose partners carefully and prioritize authentic alignment over reach metrics.</p>
              <p style={{fontStyle:'italic',fontSize:'1.2rem',color:'var(--terra)',lineHeight:1.55}}>If that approach resonates with you, we would love to talk.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {STATS.map(s => (
                <div key={s.stat} className="glass" style={{borderRadius:12,padding:'20px 28px',display:'flex',alignItems:'center',gap:20}}>
                  <span style={{fontFamily:'var(--font-display,inherit)',fontSize:'2.6rem',color:'var(--terra)',fontWeight:800,lineHeight:1}}>{s.stat}</span>
                  <span style={{fontSize:'.9rem',color:'var(--muted)',fontWeight:500}}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <span className="label" style={{marginBottom:8,display:'block'}}>Sponsorship Options</span>
          <p style={{fontSize:'.85rem',color:'var(--faint)',marginBottom:24}}>Founding-partner rates — locked in for early sponsors as the audience grows.</p>
          <div className="sponsor-grid">
            {TIERS.map(t => (
              <div key={t.tier} className="sponsor-card">
                <div className="show-card-tag">{t.tier} Sponsor</div>
                <h3>{t.tier}</h3>
                <div className="sponsor-price">{t.price}<span style={{fontSize:'.9rem',color:'var(--faint)',fontWeight:600}}>{t.unit}</span></div>
                <p>{t.description}</p>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:8,marginTop:8}}>
                  {t.features.map(f => (
                    <li key={f} style={{fontSize:'.84rem',color:'var(--muted)',display:'flex',gap:8,alignItems:'flex-start'}}>
                      <span style={{color:'var(--terra)',flexShrink:0}}>✦</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />
      <section className="section section-sand">
        <div className="container" style={{maxWidth:760}}>
          <span className="label">Apply</span>
          <h2 style={{marginBottom:20}}>Tell us about your brand</h2>
          <SponsorForm />
        </div>
      </section>
    </>
  )
}
