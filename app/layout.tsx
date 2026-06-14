import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Life Between Titles', template: '%s | Life Between Titles' },
  description: 'Honest stories of anxiety, loss, and the light that finds you when you least expect it. A podcast network for people navigating career transitions.',
  openGraph: {
    title: 'Life Between Titles',
    description: 'A media platform for people navigating career transitions, identity shifts, and the uncertain space between chapters.',
    url: 'https://www.lifebetweentitles.com',
    siteName: 'Life Between Titles',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Between Titles',
    description: 'Honest stories of anxiety, loss, and the light that finds you when you least expect it.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
