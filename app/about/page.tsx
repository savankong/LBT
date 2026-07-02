import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Life Between Titles was founded by Savan Kong — the DoD\'s first Customer Experience Officer and former first employee at Redfin — after experiencing a career transition firsthand. Learn about the mission and story behind the podcast.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/about' },
  openGraph: { title: 'About Life Between Titles', description: 'Founded in 2025 by Savan Kong. Built for people navigating the uncertain middle space between who they were and who they\'re becoming.' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Life Between Titles',
  url: 'https://www.lifebetweentitles.com/about',
  description: 'Life Between Titles is a podcast network for career transitions, founded by Savan Kong in October 2025.',
  mainEntity: {
    '@type': 'Person',
    name: 'Savan Kong',
    jobTitle: 'Founder & Host',
    worksFor: { '@type': 'Organization', name: 'Life Between Titles' },
    description: 'Savanrith "Savan" Kong is an award-winning executive, the DoD\'s first Customer Experience Officer, and former first employee at Redfin. He founded Life Between Titles in October 2025 after experiencing a career transition firsthand. He is also the author of the forthcoming memoir Half-Way Light.',
  },
}

const VALUES = [
  { num:'01', title:'Honesty over inspiration', body:'The career content world runs on highlight reels and pivot stories that skip the messy middle. We try to do something different. We believe the middle is the whole point, and that the most useful thing we can offer someone in transition is an honest account of what it actually feels like. Not a polished version designed to produce a temporary feeling of motivation.', mantra:'We will always choose the harder, truer thing over the easier, shinier one.' },
  { num:'02', title:'Identity is not a job title', body:'This is the belief the entire channel is built on. Titles are assigned. They change. They get taken away without warning. But the person underneath: the way you think, what you care about, what you are drawn toward, who you are when nobody is watching. That does not change with an org chart.', mantra:'We treat every guest and every listener as a full human being first. Their career is context, not their identity.' },
  { num:'03', title:'The transition is the story', body:'Most narratives about career change are told in retrospect, from the safety of the other side. We are more interested in what it felt like in the room when the news came, in the weeks when nothing had a name yet, in the decisions made without a roadmap.', mantra:'We do not rush past the hard part. We try to stay there.' },
  { num:'04', title:'Real over polished', body:'We have no interest in content that sounds good but costs nothing to say. The conversations on this channel should feel like the ones people have when the professional armor comes off and they start telling the truth.', mantra:'If it did not cost something to say, it probably was not worth saying.' },
  { num:'05', title:'Everyone deserves a thoughtful transition', body:'Career transition support has historically gone to people who could afford a coach, had a strong network, or worked somewhere with outplacement services. Most people do not have that. Life Between Titles is free, honest, and built for that person as much as anyone else.', mantra:'Access to perspective should not depend on your severance package.' },
  { num:'06', title:'The personal and professional are the same conversation', body:'We do not believe that work stress lives only at work, or that burnout is just a scheduling problem. The way someone loses a job can shape their sense of self for years. We treat career transitions as whole-person experiences, because that is what they are.', mantra:'We have never believed the human and the professional were different things.' },
  { num:'07', title:'Curiosity is a career strategy', body:"One of the things we believe most deeply is that getting genuinely curious about other people's paths expands your sense of what is possible for your own. The person who knows what a craniofacial surgeon's day looks like, or what a post-military career really feels like, has a wider map than they started with.", mantra:'Knowing what is possible is half the work of figuring out what you want.' },
  { num:'08', title:'You do not have to have it figured out', body:"Most of our guests said yes to this show before they had a tidy ending to their story. Some still don't. We are not interested in waiting for resolution before a story is worth telling. The not-knowing is the story, and pretending otherwise just teaches people to perform certainty they do not feel.", mantra:'Clarity is not a prerequisite for being heard.' },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Our Story</span>
            <h1>Built for the middle part.</h1>
            <p>Life Between Titles launched in October 2025. This is the story of why.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="founder-grid">
            <div className="founder-img">
              <img src="/savan-about.png" alt="Savan Kong, Founder and Host of Life Between Titles" />
            </div>
            <div className="founder-copy">
              <span className="label">The Founder</span>
              <h2 style={{marginBottom:8}}>It started with the end…</h2>
              <blockquote className="founder-quote">
                &ldquo;Nobody wants to sit in the part where you don&apos;t know yet who you are without the title.&rdquo;
              </blockquote>
              <p>There&apos;s a version of this story that starts with a résumé. <strong>Savanrith &ldquo;Savan&rdquo; Kong</strong> was the first employee at Redfin, where he co-authored patented real estate search technology. He went on to serve in the Department of Defense&apos;s Digital Services team, and eventually became the DoD&apos;s first <strong>Customer Experience Officer (CXO)</strong> — leading enterprise-wide CX transformation across one of the largest organizations on the planet. The kind of title that fills in the blank when someone at a dinner party asks what you do.</p>
              <p style={{marginTop:14}}>Then one day, it was gone.</p>
              <p style={{marginTop:14}}>Savan grew up in South Seattle, raised by Cambodian parents who fled the Khmer Rouge. He went to Lakeside School — the same school as Bill Gates — and spent his career moving between worlds: startups, defense, technology, public service. The through line was always the same question: how do we make opportunity more accessible to the people who&apos;ve historically been left out?</p>
              <p style={{marginTop:14}}>When the CXO chapter ended, he found himself asking a different version of that question — this time about himself. What I noticed was that nobody was really talking about this honestly. The career advice industry wants to fast-forward to the bounce-back. Nobody wants to sit in the part where you don&apos;t know yet who you are without the title.</p>
              <p style={{marginTop:14}}>A conversation with a friend named Amita pushed me to stop thinking and start building.</p>
              <p style={{marginTop:14}}>Life Between Titles launched in October 2025 as a show for people in that middle part. Not about how to update your resume. About what it actually feels like to lose the identity you built your life around. And the slow, surprising work of figuring out who you are without it.</p>
              <p className="founder-thesis"><strong>The thesis is simple:</strong> Titles are temporary. Identity is not.</p>
              <p style={{marginTop:4}}>If you&apos;ve ever found yourself between who you were and who you&apos;re becoming, this show was made for you.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="editorial-section">
        <div className="container">
          <span className="label" style={{display:'block',marginBottom:16}}>Our Mission</span>
          <h2>The real story lives in the gap.</h2>
          <p style={{maxWidth:680,margin:'24px auto 32px',fontSize:'1rem',lineHeight:1.82}}>
            Most career content is built around destinations: the promotion, the pivot, the &quot;and then it all worked out&quot; moment. But the real story lives in the gap. The weeks after the layoff email. The Sunday dread before a job you&apos;ve outgrown. The quiet identity crisis that doesn&apos;t have a name yet.
          </p>
          <p className="lead">Life Between Titles exists for that moment. For the person asking: <em>Now what?</em></p>
          <p style={{maxWidth:620,margin:'32px auto 0',fontSize:'.95rem',lineHeight:1.8}}>
            We believe that transition isn&apos;t a detour but rather a part of the path. And that the most important career conversations are the ones nobody&apos;s having out loud.
          </p>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container" style={{maxWidth:820}}>
          <span className="label">Our Vision</span>
          <h2 style={{marginBottom:28}}>A world that listens to the silence.</h2>
          <p style={{fontSize:'1.05rem',lineHeight:1.85,marginBottom:20}}>A world where career transitions are met with reflection, not just reaction. Where the question &quot;who am I without this job?&quot; is treated as the beginning of something, not the end.</p>
          <p style={{fontSize:'1.05rem',lineHeight:1.85,marginBottom:20}}>We&apos;re building toward a future where the gap between titles is understood as one of the most formative chapters a person can live through. Where the instinct isn&apos;t to fill the silence as fast as possible. But to listen to it.</p>
          <p style={{fontSize:'1.2rem',fontStyle:'italic',color:'var(--terra)',lineHeight:1.55}}>Life Between Titles wants to be the channel that generations of career transitioners point to and say: that&apos;s the show that made me feel like I was going to be okay.</p>
        </div>
      </section>

      <div className="divider" />

      <section className="section section-sand">
        <div className="container">
          <span className="label">What We Believe</span>
          <h2 style={{maxWidth:440,marginBottom:56}}>Eight things we hold to be true</h2>
          <div className="values-grid">
            {VALUES.map(v => (
              <div key={v.num} className="value-item">
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

      <section className="cta-section">
        <div className="cta-box">
          <span className="label">Be Part of It</span>
          <h2>If you&apos;ve ever been between chapters</h2>
          <p>Subscribe to the newsletter, submit a guest, or just listen. The conversation is already happening.</p>
          <div className="cta-actions">
            <Link href="/newsletter" className="btn btn-gold">Subscribe to the Newsletter</Link>
            <Link href="/shows" className="btn btn-glass">Listen to the Shows</Link>
          </div>
        </div>
      </section>

      <section className="cta-bleach" style={{ padding: '90px 0' }}>
        <div className="container cta-bleach-inner" style={{ maxWidth: 720 }}>
          <span className="label">For Brands &amp; Partners</span>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)' }}>
            <span className="black">Want in front of this</span><br />
            <span className="magenta-split">audience?</span>
          </h2>
          <p className="cta-bleach-sub">
            We partner with a small number of sponsors who genuinely help people improve their careers, lives, or
            wellbeing. Trust with our audience matters more than ad volume.
          </p>
          <div className="cta-bleach-actions">
            <Link href="/sponsor" className="btn btn-gold">Become a Sponsor →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
