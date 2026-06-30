import type { Metadata } from 'next'
import FAQClient from '@/components/FAQClient'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Life Between Titles — what the show is, who it\'s for, how to submit a guest, sponsorship options, and how to listen.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/faq' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Life Between Titles?', acceptedAnswer: { '@type': 'Answer', text: 'Life Between Titles is a podcast network for people navigating career transitions, identity shifts, and the uncertain space between one chapter and the next. We have three shows: Life Between Titles (the flagship), Office Hours, and Work, Unscripted.' } },
    { '@type': 'Question', name: 'Who is the Life Between Titles podcast for?', acceptedAnswer: { '@type': 'Answer', text: 'Anyone who has experienced a layoff, career pivot, burnout, or significant identity shift tied to their work — and anyone curious about what other people\'s careers actually look like from the inside.' } },
    { '@type': 'Question', name: 'Where can I listen to Life Between Titles?', acceptedAnswer: { '@type': 'Answer', text: 'Episodes are available on YouTube, Substack, Spotify, and Apple Podcasts.' } },
    { '@type': 'Question', name: 'How can I submit a guest to Life Between Titles?', acceptedAnswer: { '@type': 'Answer', text: 'Use the guest submission form at lifebetweentitles.com/guest-submission. We review every submission and respond within a week.' } },
    { '@type': 'Question', name: 'When did Life Between Titles launch?', acceptedAnswer: { '@type': 'Answer', text: 'Life Between Titles launched in October 2025.' } },
    { '@type': 'Question', name: "What's the difference between the three Life Between Titles shows?", acceptedAnswer: { '@type': 'Answer', text: 'Life Between Titles is raw, unscripted conversations with people mid-transition. Office Hours features career experts — coaches, recruiters, therapists. Work, Unscripted is a deep dive into unusual careers most people have never considered.' } },
    { '@type': 'Question', name: 'How do I become a sponsor of Life Between Titles?', acceptedAnswer: { '@type': 'Answer', text: 'We only partner with sponsors whose products or services genuinely help people improve their careers, lives, or wellbeing. Reach out through the sponsorship page at lifebetweentitles.com/sponsor.' } },
    { '@type': 'Question', name: 'How do I contact Life Between Titles?', acceptedAnswer: { '@type': 'Answer', text: 'Use the contact form at lifebetweentitles.com/contact. We read everything.' } },
  ],
}

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Questions</span>
            <h1>Frequently Asked Questions</h1>
            <p>Everything you want to know about Life Between Titles, the shows, and how to get involved.</p>
          </div>
        </div>
      </header>
      <FAQClient />
    </>
  )
}
