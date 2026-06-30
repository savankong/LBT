'use client'
import { useState } from 'react'

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function BookEarlyAccessForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'book-early-access', email }),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email hello@lifebetweentitles.com.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return <p style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--ink)' }}>You&apos;re on the list — we&apos;ll email you the moment it&apos;s available.</p>
  }

  return (
    <form name="book-early-access" method="POST" onSubmit={handleSubmit} style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
      <input type="hidden" name="form-name" value="book-early-access" />
      <input
        type="email"
        name="email"
        required
        placeholder="YOUR EMAIL"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="form-input"
        style={{ flex: '1 1 220px', borderRight: 'none' }}
      />
      <button type="submit" className="btn btn-gold" disabled={submitting} style={{ flexShrink: 0 }}>
        {submitting ? '...' : 'Get Early Access →'}
      </button>
      {error && <p style={{ fontSize: '.78rem', color: 'var(--terra)', width: '100%', marginTop: 8 }}>{error}</p>}
    </form>
  )
}
