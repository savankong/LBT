import type { Metadata } from 'next'
import SpotlightClient from '../SpotlightClient'

export const metadata: Metadata = {
  title: 'Admin — Spotlight | Life Between Titles',
  robots: { index: false, follow: false },
}

export default function SpotlightPage() {
  return <SpotlightClient />
}
