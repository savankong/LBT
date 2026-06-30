'use client'
import Link from 'next/link'
import { useState } from 'react'

const LINKS = [
  { href: '/shows',   label: 'Shows' },
  { href: '/guests',  label: 'Guests' },
  { href: '/about',   label: 'About' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/book',    label: 'The Book' },
  { href: '/sponsor', label: 'Sponsor' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" onClick={close}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lbt-logo.png" alt="LBT" style={{ height: 36, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
          </Link>
          <div className="nav-links">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
            ))}
          </div>
          <Link href="/support" className="nav-cta" onClick={close}>Support LBT</Link>
          <button
            className="nav-burger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span style={open ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
            <span style={open ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
          </button>
        </div>
      </nav>
      <div className={`nav-mobile${open ? ' open' : ''}`}>
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} className="nav-link" onClick={close}>{l.label}</Link>
        ))}
        <Link href="/support" className="nav-cta" onClick={close}>Support LBT</Link>
      </div>
    </>
  )
}
