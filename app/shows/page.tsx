import type { Metadata } from 'next'
import Link from 'next/link'
import ShowsClient from '@/components/ShowsClient'

export const metadata: Metadata = {
  title: 'Shows',
  description: 'Life Between Titles hosts three podcasts: the flagship Life Between Titles show, Office Hours with career experts, and Work Unscripted exploring unusual careers. Free on YouTube, Spotify, and Apple Podcasts.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/shows' },
  openGraph: { title: 'The Shows | Life Between Titles', description: 'Three podcasts. One honest conversation about career transitions, identity, and what it means to start over.' },
}

const SHOWS = [
  {
    tag: 'Flagship Show',
    title: 'Life Between Titles',
    color: '#C26A4A',
    description: 'Raw, unscripted conversations with people in the middle of, or just on the other side of, a major career transition. Layoffs, pivots, reinventions — the messy, human stuff that does not make it onto a résumé.',
  },
  {
    tag: 'Unique Careers',
    title: 'Work, Unscripted',
    color: '#4a7ec2',
    description: "A deep dive series into careers most people have never considered — the ones that do not show up in a guidance counselor's office. From niche professionals to unconventional paths, this is the show for the curious.",
  },
  {
    tag: 'Expert Conversations',
    title: 'Office Hours',
    color: '#7c4ac2',
    description: 'Structured, practical conversations with experts who have built careers helping other people navigate theirs. Think career coaches, recruiters, therapists, and executives who have seen it all — and have something real to say about it.',
  },
]

export default function ShowsPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">The Network</span>
            <h1>The Shows</h1>
            <p>Some career advice is built for people who already know where they&apos;re going. This is for everyone else.</p>
          </div>
        </div>
      </header>

      {/* Show overview cards */}
      <section className="section" style={{paddingBottom:0}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:72}}>
            {SHOWS.map(s => (
              <div key={s.title} className="glass" style={{borderRadius:18,overflow:'hidden'}}>
                <div style={{height:4,background:s.color}} />
                <div style={{padding:'28px 28px 32px'}}>
                  <span className="label" style={{color:s.color,marginBottom:12,display:'block'}}>{s.tag}</span>
                  <h3 style={{marginBottom:14,fontSize:'1.3rem'}}>{s.title}</h3>
                  <p style={{fontSize:'.88rem',lineHeight:1.7}}>{s.description}</p>
                  <div style={{display:'flex',gap:10,marginTop:24,flexWrap:'wrap'}}>
                    <a href="https://www.youtube.com/@LifeBetweenTitles" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{fontSize:'.8rem',padding:'9px 16px'}}>YouTube</a>
                    <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{fontSize:'.8rem',padding:'9px 16px'}}>Substack</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{borderTop:'1px solid var(--border)',paddingTop:56}}>
            <span className="label" style={{marginBottom:8,display:'block'}}>Browse Episodes</span>
            <h2 style={{marginBottom:4,fontSize:'clamp(1.6rem,3vw,2.6rem)'}}>Every conversation, in one place.</h2>
            <p style={{marginBottom:0,fontSize:'1rem'}}>Filter by show or browse everything we&apos;ve published.</p>
          </div>
        </div>
      </section>

      <ShowsClient />

      <div className="divider" />
      <section className="cta-section">
        <div className="cta-box">
          <span className="label">Be Part of the Conversation</span>
          <h2>Know someone with a story to tell?</h2>
          <p>We&apos;re always looking for guests who have lived through a real career transition — and are willing to talk about it honestly.</p>
          <div className="cta-actions">
            <Link href="/guest-submission" className="btn btn-gold">Submit a Guest</Link>
            <Link href="/guests" className="btn btn-glass">Browse Past Guests</Link>
          </div>
        </div>
      </section>
    </>
  )
}
