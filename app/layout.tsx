import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NewsletterBanner from '@/components/NewsletterBanner'
import ScrollWatcher from '@/components/ScrollWatcher'

const SITE_URL = 'https://www.lifebetweentitles.com'
const SITE_NAME = 'Life Between Titles'
const SITE_DESC = 'Life Between Titles is a podcast network for career transitions. Honest, unscripted stories from people navigating layoffs, identity shifts, burnout, and the uncertain space between one chapter and the next.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Podcast Network for Career Transitions`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    'career transition podcast', 'job loss podcast', 'layoff recovery',
    'career change stories', 'career identity', 'work podcast',
    'Life Between Titles', 'Savan Kong', 'career pivot podcast',
    'burnout podcast', 'professional reinvention',
  ],
  authors: [{ name: 'Savan Kong', url: `${SITE_URL}/about` }],
  creator: 'Savan Kong',
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Podcast Network for Career Transitions`,
    description: SITE_DESC,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lifebetweentitles',
    title: `${SITE_NAME} | Podcast Network for Career Transitions`,
    description: SITE_DESC,
  },
  alternates: { canonical: SITE_URL },
  category: 'podcast',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Issue 13: standalone Person schema so AI systems can correctly identify the host
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person-savan-kong`,
      name: 'Savanrith Kong',
      alternateName: 'Savan Kong',
      jobTitle: 'Chief Customer Experience Officer, Department of Defense',
      description: 'Former DoD Chief Customer Experience Officer (CXO) and product executive. Founder and host of the Life Between Titles podcast network, which covers career transitions, professional identity, and reinvention.',
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/savan-about.png`,
      sameAs: [
        'https://www.linkedin.com/in/savankong/',
        'https://www.youtube.com/@LifeBetweenTitles',
        'https://lifebetweentitles.substack.com',
        'https://www.instagram.com/lifebetweentitles',
        'https://buymeacoffee.com/lifebtwtitles',
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESC,
      founder: { '@id': `${SITE_URL}/#person-savan-kong` },
      sameAs: [
        'https://www.youtube.com/@LifeBetweenTitles',
        'https://lifebetweentitles.substack.com',
        'https://www.instagram.com/lifebetweentitles',
        'https://www.linkedin.com/company/life-between-titles/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/shows?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'PodcastSeries',
      name: 'Life Between Titles',
      description: 'Raw, unscripted conversations with people in the middle of, or just on the other side of, a major career transition. Layoffs, pivots, burnout, reinvention.',
      url: `${SITE_URL}/shows#life-between-titles`,
      author: { '@id': `${SITE_URL}/#organization` },
      genre: 'Careers',
      inLanguage: 'en-US',
      webFeed: 'https://lifebetweentitles.substack.com/feed',
    },
    {
      '@type': 'PodcastSeries',
      name: 'Office Hours',
      description: 'Structured, practical conversations with coaches, recruiters, therapists, and executives who help people navigate career transitions.',
      url: `${SITE_URL}/shows#office-hours`,
      author: { '@id': `${SITE_URL}/#organization` },
      genre: 'Careers',
      inLanguage: 'en-US',
    },
    {
      '@type': 'PodcastSeries',
      name: 'Work, Unscripted',
      description: 'A deep dive into careers most people have never considered. Unusual, surprising paths that do not show up in guidance counselors\' offices.',
      url: `${SITE_URL}/shows#work-unscripted`,
      author: { '@id': `${SITE_URL}/#organization` },
      genre: 'Careers',
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollWatcher />
        <NewsletterBanner />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="lifebtwtitles"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#ff1b8d"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
