'use client'
import { useState, useRef } from 'react'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return
    setStatus('loading')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()

    if (data.ok) {
      setStatus('success')
      setMsg('You\'re in! Check your inbox.')
    } else {
      setStatus('error')
      setMsg(data.error ?? 'Something went wrong.')
    }
  }

  return (
    <div className="nl-banner">
      <div className="nl-banner-inner">
        {/* Left: copy */}
        <div className="nl-copy">
          <span className="nl-icon" aria-hidden="true">◎</span>
          <div>
            <p className="nl-headline">NEW EPISODES. REAL STORIES. DELIVERED TO YOUR INBOX.</p>
            <p className="nl-sub">Join listeners navigating the space between one chapter and the next.</p>
          </div>
        </div>

        {/* Right: form */}
        {status === 'success' ? (
          <p className="nl-success">{msg}</p>
        ) : (
          <form className="nl-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="email"
              className="nl-input"
              placeholder="EMAIL"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email address"
              disabled={status === 'loading'}
            />
            <button type="submit" className="nl-btn" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'SUBSCRIBE'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="nl-error">{msg}</p>}
      </div>
    </div>
  )
}
