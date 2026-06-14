import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Life Between Titles — Podcast Network for Career Transitions',
  description: 'Honest, unscripted stories from people navigating layoffs, career pivots, burnout, and identity shifts. Three shows. Free everywhere you listen.',
  alternates: { canonical: 'https://www.lifebetweentitles.com' },
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <div className="container">
          <div className="hero-grid-layout">
            {/* Left copy */}
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                <span className="hero-badge-text">A Podcast Network for Career Transitions</span>
              </div>
              <h1>
                Where one title ends<span style={{color:'var(--terra)'}}> and the real story begins.</span>
              </h1>
              <p className="hero-sub">
                Honest stories of anxiety, loss, and the light that finds you when you least expect it.
              </p>
              <div className="hero-actions">
                <Link href="/shows" className="btn btn-gold">See All Episodes →</Link>
                <Link href="/guest-submission" className="btn btn-glass">Submit a Guest</Link>
              </div>
              <div className="hero-scroll-cue">
                <span className="hero-scroll-cue-label">Scroll</span>
                <span className="hero-scroll-arrow">↓</span>
              </div>
            </div>

            {/* Right: phone mockup */}
            <div className="hero-mock" aria-hidden="true">
              <div className="hero-phone">
                <div className="phone-shell">
                  <div className="phone-screen">
                    <div className="phone-topbar">
                      <span>9:41</span>
                      <span>Life Between Titles</span>
                    </div>
                    <div className="phone-art">
                      <img
                        src="https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/5bc26bd9-46e8-4def-8ea5-3b5342ab93a6/image0.jpeg"
                        alt=""
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="phone-info">
                      <div className="phone-now-playing">Now Playing</div>
                      <div className="phone-title">Quitting Without a Plan</div>
                      <div className="phone-sub">Danielle Frank · Ep. 14</div>
                    </div>
                    <div className="phone-progress">
                      <div className="phone-progress-fill" />
                      <div className="phone-progress-dot" />
                    </div>
                    <div className="phone-controls">
                      <span className="phone-ctl">⏮</span>
                      <div className="phone-play">▶</div>
                      <span className="phone-ctl">⏭</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-float-card">
                <img src="https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/8e662514-5308-4700-9261-3a0ec5ba6806/Lt._Gen._Matthew_G._Glavy.jpg" alt="" referrerPolicy="no-referrer" />
                <div>
                  <div className="hero-float-show">Work, Unscripted</div>
                  <div className="hero-float-name">Lt. Gen. (Ret) Matthew Glavy</div>
                </div>
              </div>
              <div className="hero-listen-pill">
                <span className="hero-pill-dot">▶</span>
                <span className="hero-pill-text">3 shows · weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shows ────────────────────────────────────────── */}
      <section className="section" id="shows" aria-labelledby="shows-heading">
        <div className="container">
          <div className="two-col">
            <div className="two-col-text">
              <span className="label">The Shows</span>
              <h2 id="shows-heading">Three shows.<br />One honest conversation.</h2>
              <p>Three distinct shows, one shared belief: the messy human stuff in the middle of a career is the part worth talking about.</p>
              <Link href="/shows" className="link-arrow">Browse all shows →</Link>
            </div>
            <div className="show-cards-stack">
              {[
                { n:'I', tag:'Flagship Show', name:'Life Between Titles', desc:'Raw, unscripted conversations with people in the middle of a major career transition.' },
                { n:'II', tag:'Expert Conversations', name:'Office Hours', desc:'Practical conversations with coaches, recruiters, therapists and executives.' },
                { n:'III', tag:'Unique Careers', name:'Work, Unscripted', desc:'A deep dive into careers most people have never considered.' },
              ].map(s => (
                <div className="show-float-card" key={s.n}>
                  <div className="show-num">{s.n}</div>
                  <div>
                    <div className="show-tag-sm">{s.tag}</div>
                    <div className="show-name">{s.name}</div>
                    <p className="show-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Episodes ─────────────────────────────────────── */}
      <section className="section section-sand" id="episodes" aria-labelledby="episodes-heading">
        <div className="container">
          <div className="two-col">
            <div className="ep-masonry" aria-hidden="true">
              <div className="ep-masonry-col">
                {[
                  { src:'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/0b0a42f3-82f0-4a68-9e84-abfcae015c60/BioPhoto-PLA-JordanSwanson-2624x1720.jpeg', show:'Work, Unscripted', title:'Dr. Jordan Swanson — Craniofacial Surgeon' },
                  { src:'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/24d599c3-60c9-4ffd-808d-679a84e9b06b/EO-161.jpg', show:'Work, Unscripted', title:'Nate Sexton — Pro Disc Golfer' },
                ].map(e => (
                  <div className="ep-card-float" key={e.title}>
                    <div className="ep-img"><img src={e.src} alt="" referrerPolicy="no-referrer" /></div>
                    <div className="ep-info">
                      <div className="ep-show-sm">{e.show}</div>
                      <div className="ep-title-sm">{e.title}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ep-masonry-col">
                <div className="ep-card-float-r">
                  <div className="ep-img"><img src="https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/5bc26bd9-46e8-4def-8ea5-3b5342ab93a6/image0.jpeg" alt="" referrerPolicy="no-referrer" /></div>
                  <div className="ep-info">
                    <div className="ep-show-sm">Life Between Titles</div>
                    <div className="ep-title-sm">Danielle Frank on Quitting Without a Plan</div>
                  </div>
                </div>
                <div className="ep-card-float-alt">
                  <div className="ep-stat-big">40+</div>
                  <div className="ep-stat-sub">conversations and counting, free everywhere you listen.</div>
                </div>
              </div>
            </div>
            <div className="two-col-text">
              <span className="label">Recent Episodes</span>
              <h2 id="episodes-heading">Conversations<br />worth having.</h2>
              <p>Real people, mid-transition. The layoff email, the Sunday dread, the slow work of figuring out who you are without the title.</p>
              <Link href="/shows" className="link-arrow">All episodes →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Origin Story ──────────────────────────────────── */}
      <section className="section" id="story" aria-labelledby="story-heading">
        <div className="container">
          <div className="two-col">
            <div className="two-col-text">
              <span className="label">The Origin Story</span>
              <h2 id="story-heading">It started<span style={{color:'var(--terra)'}}> with the end…</span></h2>
              <p style={{fontSize:'clamp(17px,1.4vw,21px)',lineHeight:1.6,color:'var(--ink)',fontWeight:500,maxWidth:480,marginTop:26}}>
                &ldquo;Nobody wants to sit in the part where you don&apos;t yet know who you are without the title.&rdquo;
              </p>
              <p style={{marginTop:18,fontSize:16,lineHeight:1.65,maxWidth:480}}>
                There&apos;s a version of this story that starts with a job title — a pretty good one. Then one day, it was gone. Life Between Titles is for that middle part, after the door closes and before anything new opens.
              </p>
              <div className="founder-tagline">
                <span className="founder-tagline-text">Titles are temporary. Identity is not.</span>
              </div>
              <div style={{marginTop:24}}>
                <Link href="/about" className="link-arrow">Read our story →</Link>
              </div>
            </div>
            <div className="founder-card-wrap">
              <div className="founder-photo-card">
                <div className="founder-photo-inner">
                  <div className="founder-photo-img">
                    <img src="https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/ca15d266-eeb0-4750-8266-828ab73926ab/savan-thumb.png" alt="Savan Kong — Founder and Host of Life Between Titles" referrerPolicy="no-referrer" />
                  </div>
                  <div className="founder-photo-name">Savan Kong</div>
                  <div className="founder-photo-role">Founder &amp; Host</div>
                </div>
                <div className="founder-badge">Launched Oct 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────── */}
      <section className="section section-sand" aria-labelledby="mission-heading">
        <div className="container">
          <div className="mission-block">
            <span className="label" style={{display:'block',marginBottom:22}}>Our Mission</span>
            <h2 id="mission-heading">
              Most career content is about destinations.{' '}
              <span style={{color:'var(--terra)'}}>The real story lives in the gap.</span>
            </h2>
            <p>
              The weeks after the layoff email. The Sunday dread before a job you&apos;ve outgrown. The quiet identity crisis that doesn&apos;t have a name yet. We exist for the person asking: <em>now what?</em>
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section cta-black" id="submit" aria-label="Call to action">
        <div className="container">
          <div className="cta-black-inner">
            <h2>Your transition<br />is the story.</h2>
            <p>Know someone in the middle of it? Put them forward — or just press play.</p>
            <div className="cta-black-actions">
              <Link href="/guest-submission" className="btn btn-white">Submit a Guest →</Link>
              <Link href="/shows" className="btn btn-glass" style={{color:'#fff',borderColor:'rgba(255,255,255,.3)'}}>Listen Now</Link>
            </div>
          </div>
          <div className="cta-black-glow" aria-hidden="true" />
        </div>
      </section>
    </>
  )
}
