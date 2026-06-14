'use client'
import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  { q: 'What is Life Between Titles?', a: 'Life Between Titles is a podcast network for people navigating career transitions, identity shifts, and the uncertain space between one chapter and the next. We have three shows: Life Between Titles (the flagship), Office Hours, and Work, Unscripted.' },
  { q: 'Who is the show for?', a: "Anyone who has experienced a layoff, career pivot, burnout, or significant identity shift tied to their work. And honestly — anyone who is curious about what other people's careers actually look like from the inside." },
  { q: 'Where can I listen?', a: 'Episodes are available on YouTube, Substack, Spotify, and Apple Podcasts. Links to all platforms are in the footer of this site.' },
  { q: 'How can I submit a guest?', a: 'We love guest submissions. Use our guest submission form to tell us about someone you think would make a compelling guest. We review every submission and respond within a week.' },
  { q: 'Can I be a guest myself?', a: "Absolutely. If you've lived through a real career transition and are willing to talk about it honestly — not the polished version, the real one — we'd love to hear from you. Use the guest submission form and tell us your story." },
  { q: 'What makes a good guest for the show?', a: "We look for people who have been through something real: a layoff, a pivot, a burnout, a radical career change. We're less interested in where you ended up than in what it felt like in the middle — and whether you're willing to talk about it honestly." },
  { q: 'How do I become a sponsor?', a: "We only partner with sponsors whose products or services genuinely help people improve their careers, lives, or wellbeing. If that's you, reach out through our sponsorship page and tell us about your brand." },
  { q: 'What is the Life Between Titles newsletter?', a: 'The newsletter lives on Substack and explores themes of career transition, identity, and what it means to start over. It\'s free. Subscribe at lifebetweentitles.substack.com.' },
  { q: "What's the difference between the three shows?", a: 'Life Between Titles is raw, unscripted conversations with people in the middle of career transitions. Office Hours features structured conversations with experts who help people navigate careers for a living. Work, Unscripted is a deep dive into careers most people have never considered — the unusual, the surprising, the ones that don\'t show up in guidance counselors\' offices.' },
  { q: 'When did the show launch?', a: 'Life Between Titles launched in October 2025.' },
  { q: 'How can I support the show?', a: 'The best ways to support us: listen, share episodes with people who need them, subscribe to the newsletter, and tell us about guests we should talk to. If you want to do more, we have a "Buy Me a Coffee" link and sponsorship options available.' },
  { q: 'How do I get in touch?', a: 'Email us at hello@lifebetweentitles.com. We read everything.' },
]

export default function FAQClient() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <section className="section">
        <div className="container" style={{maxWidth:800}}>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  className={`faq-q${open === i ? ' open' : ''}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{faq.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                {open === i && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
          <div style={{marginTop:64,textAlign:'center'}}>
            <p style={{marginBottom:20}}>Still have questions?</p>
            <a href="mailto:hello@lifebetweentitles.com" className="btn btn-gold">Email Us Directly</a>
          </div>
        </div>
      </section>

      <div className="divider" />
      <section className="cta-section">
        <div className="cta-box">
          <span className="label">Ready to Explore?</span>
          <h2>Start with the shows</h2>
          <p>The fastest way to understand what Life Between Titles is about is to listen. Start anywhere — every episode stands on its own.</p>
          <div className="cta-actions">
            <Link href="/shows" className="btn btn-gold">Browse All Episodes</Link>
            <Link href="/guest-submission" className="btn btn-glass">Submit a Guest</Link>
          </div>
        </div>
      </section>
    </>
  )
}
