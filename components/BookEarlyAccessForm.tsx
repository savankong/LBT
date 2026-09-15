'use client'
import { useState } from 'react'

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
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'form-name': 'book-early-access', email }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return <p style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--ink)' }}>You&apos;re on the list — we&apos;ll email {email} the moment it&apos;s available.</p>
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
