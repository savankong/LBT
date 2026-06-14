import type { Metadata } from 'next'
import GuestSubmissionForm from '@/components/GuestSubmissionForm'

export const metadata: Metadata = {
  title: 'Submit a Guest',
  description: 'Know someone who has navigated a real career transition — a layoff, pivot, burnout, or reinvention? Submit them as a guest on Life Between Titles. We review every submission.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/guest-submission' },
}

const CRITERIA = [
  { title: 'Genuine transition', body: 'Someone who has lived through a layoff, pivot, burnout, or significant career shift — not just a job change.' },
  { title: 'Willingness to be honest', body: 'Guests who can talk about what it actually felt like, not just the polished version they tell at dinner parties.' },
  { title: 'A unique perspective', body: 'We love unconventional careers, surprising paths, and people who ended up somewhere they never expected.' },
  { title: 'Any industry, any background', body: 'Marines, surgeons, athletes, food service supervisors — if the story is real, we want to tell it.' },
]

export default function GuestSubmissionPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Be Part of the Show</span>
            <h1>Submit a Guest</h1>
            <p>Know someone with a real story? Someone who has lived through a career transition and is willing to talk about it honestly? We want to hear about them.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'flex-start'}}>
            <div>
              <span className="label">What We Look For</span>
              <h2 style={{marginBottom:28,fontSize:'2.4rem'}}>Real stories. Not résumés.</h2>
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {CRITERIA.map(c => (
                  <div key={c.title} className="glass" style={{borderRadius:12,padding:'24px 28px'}}>
                    <h3 style={{fontSize:'1rem',fontWeight:700,marginBottom:8,letterSpacing:'-.01em'}}>{c.title}</h3>
                    <p style={{fontSize:'.88rem'}}>{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-wrap" style={{maxWidth:'100%'}}>
              <span className="label" style={{marginBottom:24,display:'block'}}>The Submission Form</span>
              <GuestSubmissionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
