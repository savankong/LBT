'use client'
import Link from 'next/link'

export default function CCATPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Slim breadcrumb bar */}
      <div style={{
        paddingTop: 'var(--nav-h)',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <div style={{
          maxWidth: 1140, margin: '0 auto',
          padding: '10px clamp(20px,5vw,48px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.72rem', color: 'var(--faint)', fontWeight: 600, letterSpacing: '.04em' }}>
            <Link href="/" style={{ color: 'var(--faint)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/tools" style={{ color: 'var(--faint)', textDecoration: 'none' }}>Toolkit</Link>
            <span>/</span>
            <span style={{ color: 'var(--muted)' }}>CCAT Practice</span>
          </div>
          <Link href="/tools" style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--muted)', textDecoration: 'none' }}>
            ← Back to Toolkit
          </Link>
        </div>
      </div>

      {/* Full-height iframe */}
      <iframe
        src="/ccat/index.html"
        style={{ flex: 1, border: 'none', width: '100%', display: 'block' }}
        title="CCAT Practice Tool"
      />
    </div>
  )
}
