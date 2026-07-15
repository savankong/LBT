import type { Metadata } from 'next'
import EpisodesClient from './EpisodesClient'

export const metadata: Metadata = {
  title: 'Admin | Life Between Titles',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <EpisodesClient />
}
