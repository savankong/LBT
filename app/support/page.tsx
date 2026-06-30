import type { Metadata } from 'next'
import SupportForm from '@/components/SupportForm'

export const metadata: Metadata = {
  title: 'Support LBT',
  description: 'Support Life Between Titles with a one-time coffee or a monthly membership on Buy Me a Coffee — every bit helps keep these conversations free.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/support' },
}

const TIERS = [
  { label: 'Monthly Member', price: '$5', unit: '/ month' },
  { label: 'Buy a Coffee', price: '$1', unit: '' },
  { label: 'Buy a Coffee', price: '$25', unit: '' },
  { label: 'Buy a Coffee', price: '$50', unit: '' },
]

export default function SupportPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Keep It Free</span>
            <h1>Support LBT</h1>
            <p>Life Between Titles is free, ad-light, and independent. If it&apos;s helped you, a coffee or a monthly membership goes straight back into making more of it.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="nl-page-layout">
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 18 }}>Ways to Support</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 40 }}>
                {TIERS.map((t, i) => (
                  <div key={i} className="glass-gold" style={{ padding: '20px 22px' }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.6rem', color: 'var(--ink)' }}>{t.price}<span style={{ fontSize: '.8rem', color: 'var(--faint)', fontWeight: 600 }}>{t.unit}</span></div>
                    <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: '.72rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)', marginTop: 4 }}>{t.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, maxWidth: 500 }}>
                Fill out the form and we&apos;ll open Buy Me a Coffee in a new tab to finish your contribution securely — we never handle or see your payment details.
              </p>
            </div>

            <div>
              <span className="label" style={{ display: 'block', marginBottom: 24 }}>Your Info</span>
              <SupportForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
