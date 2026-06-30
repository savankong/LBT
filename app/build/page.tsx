import type { Metadata } from 'next'
import BuildShowForm from '@/components/BuildShowForm'

export const metadata: Metadata = {
  title: 'Build Your Own Show',
  description: 'We built Life Between Titles from scratch. Now we help others do the same — with the same level of care, intention, and honesty. Build your podcast with us.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/build' },
}

const STEPS = [
  { num: '01', title: 'Define Your Thesis', body: 'Every great show starts with a clear point of view — not just a topic. We help you find the idea that only you can tell.' },
  { num: '02', title: 'Shape Your Format', body: 'Interview show, narrative series, solo commentary, or hybrid — we help you match format to your strengths and your audience.' },
  { num: '03', title: 'Build Your Brand', body: 'Name, visual identity, show art, and tone. Everything that makes a listener say "yes, this is for me."' },
  { num: '04', title: 'Launch and Grow', body: 'From first episode to first 100 listeners — we help you do it right, not just fast.' },
]

export default function BuildPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Build With Us</span>
            <h1>Build Your Own Show</h1>
            <p>We built Life Between Titles from scratch. Now we help others do the same — with the same level of care, intention, and honesty.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center',marginBottom:80}}>
            <div>
              <span className="label">Why We Do This</span>
              <h2 style={{marginBottom:24}}>We learned the hard way.</h2>
              <p style={{marginBottom:18,lineHeight:1.82,fontSize:'1rem'}}>Building a podcast from zero is harder than it looks. Not because the technology is complicated — it isn&apos;t. But because figuring out what you actually want to say, and who you want to say it to, is the work nobody talks about.</p>
              <p style={{marginBottom:18,lineHeight:1.82,fontSize:'1rem'}}>We&apos;ve done that work. We&apos;ve made the mistakes, refined the process, and built something we&apos;re genuinely proud of. If you have a story to tell — or an audience you want to build — we can help you do it with intention.</p>
              <p style={{fontStyle:'italic',fontSize:'1.2rem',color:'var(--terra)',lineHeight:1.55}}>Not just a podcast. A point of view.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {STEPS.map(s => (
                <div key={s.num} className="glass" style={{borderRadius:12,padding:'24px 28px',display:'flex',gap:20,alignItems:'flex-start'}}>
                  <span style={{fontFamily:'var(--font-display,inherit)',fontSize:'2rem',color:'var(--terra)',fontWeight:800,lineHeight:1,flexShrink:0}}>{s.num}</span>
                  <div>
                    <h4 style={{marginBottom:6,fontSize:'1rem',fontWeight:700}}>{s.title}</h4>
                    <p style={{fontSize:'.88rem'}}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />
      <section className="cta-section">
        <div className="cta-box" style={{ maxWidth: 640, textAlign: 'left' }}>
          <span className="label">Let&apos;s Talk</span>
          <h2 style={{ marginBottom: 20 }}>Ready to start building?</h2>
          <p style={{ marginBottom: 28 }}>Tell us about your idea and we&apos;ll tell you whether we think we can help. No pitch required — just a real conversation.</p>
          <BuildShowForm />
        </div>
      </section>
    </>
  )
}
