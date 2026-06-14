import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shows',
  description: 'Life Between Titles hosts three podcasts: the flagship Life Between Titles show, Office Hours with career experts, and Work Unscripted exploring unusual careers. Free on YouTube, Spotify, and Apple Podcasts.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/shows' },
  openGraph: { title: 'The Shows | Life Between Titles', description: 'Three podcasts. One honest conversation about career transitions, identity, and what it means to start over.' },
}

const SHOWS = [
  {
    id: 'life-between-titles',
    tag: 'Flagship Show',
    title: 'Life Between Titles',
    description: 'Raw, unscripted conversations with people in the middle of, or just on the other side of, a major career transition. Layoffs, pivots, reinventions — the messy, human stuff that does not make it onto a résumé.',
    episodes: [
      { title: 'Danielle Frank on Quitting Without a Plan, 22 Years in Wine, and the Book She Carried Forward', guest: 'Danielle Frank', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/5bc26bd9-46e8-4def-8ea5-3b5342ab93a6/image0.jpeg' },
      { title: 'Savan Kong — From Corporate to Podcaster', guest: 'Savan Kong', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/ca15d266-eeb0-4750-8266-828ab73926ab/savan-thumb.png' },
    ],
  },
  {
    id: 'office-hours',
    tag: 'Expert Conversations',
    title: 'Office Hours',
    description: 'Structured, practical conversations with experts who have built careers helping other people navigate theirs. Think career coaches, recruiters, therapists, and executives who have seen it all — and have something real to say about it.',
    episodes: [],
  },
  {
    id: 'work-unscripted',
    tag: 'Unique Careers',
    title: 'Work, Unscripted',
    description: "A deep dive series into careers most people have never considered — the ones that do not show up in a guidance counselor's office. From niche professionals to unconventional paths, this is the show for the curious.",
    episodes: [
      { title: 'Lt. Gen. (Ret) Matthew "Jerry" Glavy — S2E3', guest: 'Lt. Gen. Matthew Glavy', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/8e662514-5308-4700-9261-3a0ec5ba6806/Lt._Gen._Matthew_G._Glavy.jpg' },
      { title: 'Dr. Jordan Swanson — Pediatric Craniofacial Surgeon — S2E2', guest: 'Dr. Jordan Swanson', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/0b0a42f3-82f0-4a68-9e84-abfcae015c60/BioPhoto-PLA-JordanSwanson-2624x1720.jpeg' },
      { title: 'Nate Sexton — Professional Disc Golfer — S2E1', guest: 'Nate Sexton', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/24d599c3-60c9-4ffd-808d-679a84e9b06b/EO-161.jpg' },
      { title: 'David Mazzeo — S1E3', guest: 'David Mazzeo', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/01703312-cada-40fb-a061-685b731af4f7/IMG_2290.jpeg' },
      { title: 'Andy Alvarado — S1E2', guest: 'Andy Alvarado', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/97202540-f5be-4d9d-8d52-5f436be05a2b/andy-solo.jpg' },
      { title: 'Aaron Brooks — Federal Bureau of Prisons Food Service Supervisor', guest: 'Aaron Brooks', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/e17b79aa-72fc-425d-aef8-8c4a8d7b5ce7/IMG_5986.jpeg' },
    ],
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

      {SHOWS.map((show, i) => (
        <div key={show.id}>
          {i > 0 && <div className="divider" />}
          <section className={`section${i % 2 === 1 ? ' section-sand' : ''}`} id={show.id}>
            <div className="container">
              <div style={{maxWidth:680,marginBottom:56}}>
                <span className="label">{show.tag}</span>
                <h2 style={{marginBottom:16}}>{show.title}</h2>
                <p style={{fontSize:'1.05rem',lineHeight:1.78}}>{show.description}</p>
                <div style={{display:'flex',gap:12,marginTop:28,flexWrap:'wrap'}}>
                  <a href="https://www.youtube.com/@LifeBetweenTitles" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Watch on YouTube</a>
                  <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-glass">Listen on Substack</a>
                </div>
              </div>
              {show.episodes.length > 0 ? (
                <>
                  <span className="label" style={{marginBottom:24,display:'block'}}>Episodes</span>
                  <div className="episodes-grid">
                    {show.episodes.map(ep => (
                      <div className="episode-card" key={ep.title}>
                        <div className="episode-card-img">
                          <img src={ep.img} alt={ep.guest} referrerPolicy="no-referrer" />
                        </div>
                        <div className="episode-card-body">
                          <div className="ep-show-tag">{show.title}</div>
                          <h4>{ep.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="glass" style={{borderRadius:16,padding:48,textAlign:'center',maxWidth:500}}>
                  <p style={{fontSize:'.95rem',marginBottom:20}}>Episodes coming soon. Subscribe to stay in the loop.</p>
                  <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe</a>
                </div>
              )}
            </div>
          </section>
        </div>
      ))}

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
