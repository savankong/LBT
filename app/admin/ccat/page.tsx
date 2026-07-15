import type { Metadata } from 'next'
import CcatClient from '../CcatClient'

export const metadata: Metadata = {
  title: 'Admin — CCAT | Life Between Titles',
  robots: { index: false, follow: false },
}

export default function CcatPage() {
  return <CcatClient />
}
