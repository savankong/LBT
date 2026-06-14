import Link from 'next/link'

const EPISODES = [
  {
    title: 'Danielle Frank on Quitting Without a Plan, 22 Years in Wine, and the Book She Carried Forward',
    show: 'Life Between Titles',
    guest: 'Danielle Frank',
    img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/5bc26bd9-46e8-4def-8ea5-3b5342ab93a6/image0.jpeg',
  },
  {
    title: 'Lt. Gen. (Ret) Matthew "Jerry" Glavy',
    show: 'Work, Unscripted',
    guest: 'Lt. Gen. Matthew Glavy',
    img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/8e662514-5308-4700-9261-3a0ec5ba6806/Lt._Gen._Matthew_G._Glavy.jpg',
  },
  {
    title: 'Dr. Jordan Swanson — Pediatric Craniofacial Surgeon',
    show: 'Work, Unscripted',
    guest: 'Dr. Jordan Swanson',
    img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/0b0a42f3-82f0-4a68-9e84-abfcae015c60/BioPhoto-PLA-JordanSwanson-2624x1720.jpeg',
  },
  {
    title: 'Nate Sexton — Professional Disc Golfer',
    show: 'Work, Unscripted',
    guest: 'Nate Sexton',
    img: 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/24d599c3-60c9-4ffd-808d-679a84e9b06b/EO-161.jpg',
  },
]

const VALUES = [
  {
    num: '01',
    title: 'Honesty over inspiration',
    body: 'The career content world runs on highlight reels. We try to do something different. We believe the middle is the whole point.',
    mantra: 'We will always choose the harder, truer thing.',
  },
  {
    num: '02',
    title: 'Identity is not a job title',
    body: 'Titles are assigned. They change. They get taken away without warning. The person underneath does not change with an org chart.',
    mantra: 'We treat every guest and listener as a full human being first.',
  },
  {
    num: '03',
    title: 'The transition is the story',
    body: 'Most narratives are told in retrospect. We are more interested in what it felt like in the room when the news came.',
    mantra: 'We do not rush past the hard part. We try to stay there.',
  },
  {
    num: '04',
    title: 'Real over polished',
    body: 'We have no interest in content that sounds good but costs nothing to say.',
    mantra: 'If it did not cost something to say, it probably was not worth saying.',
  },
  {
    num: '05',
    title: 'Everyone deserves a thoughtful transition',
    body: 'Career transition support has historically gone to people who could afford a coach. Life Between Titles is free, and built for everyone.',
    mantra: 'Access to perspective should not depend on your severance package.',
  },
  {
    num: '06',
    title: 'Curiosity is a career strategy',
    body: 'Getting genuinely curious about other people\'s paths expands your sense of what is possible for your own.',
    mantra: 'Knowing what is possible is half the work of figuring out what you want.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="container hero-content">
          <div className="hero-badge">A Podcast Network for Career Transitions</div>
          <h1>
            Where one title ends<br />
            <em>and the real story begins.</em>
          </h1>
          <p className="hero-sub">
            Honest stories of anxiety, loss, and the light that finds you when you least expect it.
          </p>
          <div className="hero-actions">
            <Link href="/shows" className="btn btn-gold">See All Episodes</Link>
            <Link href="/guest-submission" className="btn btn-glass">Submit a Guest</Link>
          </div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {/* ── Three Shows ──────────────────────────────────── */}
      <section className="section" id="shows">
        <div className="container">
          <span className="label">The Shows</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ maxWidth: '520px' }}>Three shows.<br /><em>One honest conversation.</em></h2>
            <Link href="/shows" className="btn btn-glass">Browse All →</Link>
          </div>
          <div className="shows-grid">
            <div className="show-card glass-gold">
              <span className="show-card-num">I</span>
              <div className="show-card-tag">Flagship Show</div>
              <h3>Life Between Titles</h3>
              <p>Raw, unscripted conversations with people in the middle of, or just on the other side of, a major career transition. The messy, human stuff that does not make it onto a résumé.</p>
              <Link href="/shows#life-between-titles" className="btn btn-gold show-card-link">Listen Now</Link>
            </div>
            <div className="show-card glass">
              <span className="show-card-num">II</span>
              <div className="show-card-tag">Expert Conversations</div>
              <h3>Office Hours</h3>
              <p>Structured, practical conversations with experts who have built careers helping other people navigate theirs — coaches, recruiters, therapists, executives.</p>
              <Link href="/shows#office-hours" className="btn btn-glass show-card-link">Listen Now</Link>
            </div>
            <div className="show-card glass">
              <span className="show-card-num">III</span>
              <div className="show-card-tag">Unique Careers</div>
              <h3>Work, Unscripted</h3>
              <p>A deep dive into careers most people have never considered — the ones that do not show up in a guidance counselor&apos;s office. For the genuinely curious.</p>
              <Link href="/shows#work-unscripted" className="btn btn-glass show-card-link">Listen Now</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Recent Episodes ──────────────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="label">Recent Episodes</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ maxWidth: '380px' }}>Conversations <em>worth having</em></h2>
            <Link href="/shows" className="btn btn-glass">All Episodes →</Link>
          </div>
          <div className="episodes-grid">
            {EPISODES.map(ep => (
              <div className="episode-card" key={ep.title}>
                <div className="episode-card-img">
                  <img src={ep.img} alt={ep.guest} />
                </div>
                <div className="episode-card-body">
                  <div className="ep-show-tag">{ep.show}</div>
                  <h4>{ep.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Founder Story ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="founder-grid">
            <div className="founder-img">
              <img
                src="https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367/ca15d266-eeb0-4750-8266-828ab73926ab/savan-thumb.png"
                alt="Savan Kong — Life Between Titles"
              />
            </div>
            <div className="founder-copy">
              <span className="label">The Origin Story</span>
              <h2 style={{ marginBottom: '8px' }}>It started<br /><em>with the end…</em></h2>
              <div className="founder-quote">
                "Nobody wants to sit in the part where you don&apos;t know yet who you are without the title."
              </div>
              <p>There&apos;s a version of this story that starts with a job title — and a pretty good one. The kind that fills in the blank when someone at a dinner party asks what you do.</p>
              <p style={{ marginTop: '14px' }}>Then one day, it was gone.</p>
              <p style={{ marginTop: '14px' }}>I spent a long time in that space. The middle part, after the door closes and before anything new opens. What I noticed was that nobody was really talking about it honestly. The career advice industry wants to fast-forward to the bounce-back.</p>
              <p style={{ marginTop: '14px' }}>Life Between Titles launched in October 2025 as a show for people in that middle part. Not about how to update your resume. About what it actually feels like to lose the identity you built your life around — and the slow, surprising work of figuring out who you are without it.</p>
              <p className="founder-thesis"><strong>The thesis is simple:</strong> Titles are temporary. Identity is not.</p>
              <Link href="/about" className="btn btn-gold">Read Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="editorial-section">
        <div className="container">
          <span className="label" style={{ display: 'block', marginBottom: '16px' }}>Our Mission</span>
          <h2>The real story lives<br /><em>in the gap.</em></h2>
          <p style={{ maxWidth: '680px', margin: '24px auto 32px', fontSize: '1rem', lineHeight: '1.82' }}>
            Most career content is built around destinations — the promotion, the pivot, the &quot;and then it all worked out&quot; moment. But the real story lives in the gap. The weeks after the layoff email. The Sunday dread before a job you&apos;ve outgrown. The quiet identity crisis that doesn&apos;t have a name yet.
          </p>
          <p className="lead">
            Life Between Titles exists for that moment. For the person asking: <em>Now what?</em>
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* ── Values ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="label">What We Believe</span>
          <h2 style={{ maxWidth: '440px', marginBottom: '56px' }}>Six things we<br /><em>hold to be true</em></h2>
          <div className="values-grid">
            {VALUES.map(v => (
              <div key={v.num} className="value-item glass" style={{ borderRadius: '16px' }}>
                <div className="value-num">{v.num}</div>
                <div className="value-title">{v.title}</div>
                <p className="value-body">{v.body}</p>
                <p className="value-mantra">{v.mantra}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Sponsor CTA ─────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-box glass-gold">
          <span className="label">Work With Us</span>
          <h2>Sponsorship<br /><em>that means something</em></h2>
          <p>
            Life Between Titles only partners with sponsors that genuinely help people improve their careers, lives, or wellbeing. We believe trust with our audience matters more than volume of advertising.
          </p>
          <div className="cta-actions">
            <Link href="/sponsor" className="btn btn-gold">Apply to Become a Sponsor</Link>
            <Link href="/guest-submission" className="btn btn-glass">Submit a Guest</Link>
          </div>
        </div>
      </section>
    </>
  )
}
