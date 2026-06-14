import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guests',
  description: 'Meet the guests of Life Between Titles — retired generals, surgeons, professional athletes, and people who have navigated extraordinary career transitions. Real stories, honestly told.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/guests' },
  openGraph: { title: 'Guests | Life Between Titles', description: 'From retired generals to pediatric surgeons to professional disc golfers — every guest has a real career story.' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Life Between Titles Podcast Guests',
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Person', name: 'Danielle Frank', description: 'Former wine industry professional who quit without a plan' } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Person', name: 'Lt. Gen. Matthew "Jerry" Glavy', jobTitle: 'Retired Marine Lieutenant General' } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Person', name: 'Dr. Jordan Swanson', jobTitle: 'Pediatric Craniofacial Surgeon' } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Person', name: 'Nate Sexton', jobTitle: 'Professional Disc Golfer' } },
  ],
}

const GUESTS = [
  { name: 'Danielle Frank', episode: 'Quitting Without a Plan, 22 Years in Wine, and the Book She Carried Forward', show: 'Life Between Titles', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/5bc26bd9-46e8-4def-8ea5-3b5342ab93a6/image0.jpeg' },
  { name: 'Lt. Gen. Matthew "Jerry" Glavy', episode: 'Retired Marine General on Service, Identity, and Life After the Military', show: 'Work, Unscripted — S2E3', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/8e662514-5308-4700-9261-3a0ec5ba6806/Lt._Gen._Matthew_G._Glavy.jpg' },
  { name: 'Dr. Jordan Swanson', episode: 'Pediatric Craniofacial Surgeon on the Path Nobody Plans For', show: 'Work, Unscripted — S2E2', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/0b0a42f3-82f0-4a68-9e84-abfcae015c60/BioPhoto-PLA-JordanSwanson-2624x1720.jpeg' },
  { name: 'Nate Sexton', episode: 'Professional Disc Golfer on Building a Career in an Unlikely Sport', show: 'Work, Unscripted — S2E1', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/24d599c3-60c9-4ffd-808d-679a84e9b06b/EO-161.jpg' },
  { name: 'Savan Kong', episode: 'The Founder of Life Between Titles on Starting Over', show: 'Life Between Titles — S1E33', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/ca15d266-eeb0-4750-8266-828ab73926ab/savan-thumb.png' },
  { name: 'David Mazzeo', episode: 'A Career Path You Didn\'t See Coming', show: 'Work, Unscripted — S1E3', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/01703312-cada-40fb-a061-685b731af4f7/IMG_2290.jpeg' },
  { name: 'Andy Alvarado', episode: 'Finding Purpose in the Unconventional', show: 'Work, Unscripted — S1E2', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/97202540-f5be-4d9d-8d52-5f436be05a2b/andy-solo.jpg' },
  { name: 'Aaron Brooks', episode: 'Federal Bureau of Prisons Food Service Supervisor', show: 'Work, Unscripted', img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/e17b79aa-72fc-425d-aef8-8c4a8d7b5ce7/IMG_5986.jpeg' },
]

export default function GuestsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">The Guests</span>
            <h1>Every story is a real one.</h1>
            <p>From retired generals to pediatric surgeons to professional disc golfers — our guests are people who have built lives worth talking about.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="guests-grid">
            {GUESTS.map(g => (
              <div className="guest-card" key={g.name}>
                <div className="guest-card-img">
                  <img src={g.img} alt={g.name} referrerPolicy="no-referrer" />
                </div>
                <div className="guest-card-body">
                  <div className="guest-show-tag">{g.show}</div>
                  <h3 className="guest-card-name" style={{fontFamily:'var(--font-display,inherit)',fontSize:'1rem',fontWeight:700,color:'var(--ink)',marginBottom:6}}>{g.name}</h3>
                  <p>{g.episode}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />
      <section className="cta-section">
        <div className="cta-box">
          <span className="label">Join the Conversation</span>
          <h2>Know someone with a story to tell?</h2>
          <p>We look for guests who have lived through real transitions and are willing to talk about it honestly — not the polished version, the real one.</p>
          <div className="cta-actions">
            <Link href="/guest-submission" className="btn btn-gold">Submit a Guest</Link>
            <Link href="/about" className="btn btn-glass">About the Show</Link>
          </div>
        </div>
      </section>
    </>
  )
}
