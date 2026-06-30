'use client'
import { useState } from 'react'

const BMC_URL = 'https://buymeacoffee.com/lifebtwtitles'

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function SupportForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const bmcLink = `${BMC_URL}${form.message ? `?message=${encodeURIComponent(form.message)}` : ''}`

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'support-lbt', ...form }),
      })
      setSubmitted(true)
      window.open(bmcLink, '_blank', 'noopener,noreferrer')
    } catch {
      setError('Something went wrong — you can still support us directly on Buy Me a Coffee below.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-gold" style={{ padding: 48, textAlign: 'center', maxWidth: 560 }}>
        <h3 style={{ marginBottom: 12 }}>Thank you!</h3>
        <p style={{ marginBottom: 20 }}>A Buy Me a Coffee tab should have opened to finish your contribution. If it didn&apos;t, use the button below.</p>
        <a href={bmcLink} target="_blank" rel="noopener noreferrer" className="btn btn-gold">Continue on Buy Me a Coffee →</a>
      </div>
    )
  }

  return (
    <form name="support-lbt" method="POST" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <input type="hidden" name="form-name" value="support-lbt" />
      <div className="form-group">
        <label className="form-label" htmlFor="name">Your Name</label>
        <input id="name" name="name" className="form-input" type="text" required placeholder="Jane Smith" value={form.name} onChange={set('name')} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="email">Your Email</label>
        <input id="email" name="email" className="form-input" type="email" required placeholder="jane@example.com" value={form.email} onChange={set('email')} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="message">Message (optional)</label>
        <textarea id="message" name="message" className="form-textarea" placeholder="Tell us why you're supporting LBT — we read every one." value={form.message} onChange={set('message')} style={{ minHeight: 90 }} />
      </div>
      <button type="submit" className="btn btn-gold" style={{ alignSelf: 'flex-start' }} disabled={submitting}>
        {submitting ? 'Continuing…' : 'Continue to Buy Me a Coffee →'}
      </button>
      {error && <p style={{ fontSize: '.8rem', color: 'var(--terra)' }}>{error}</p>}
      <p style={{ fontSize: '.78rem', color: 'var(--faint)' }}>You&apos;ll finish your contribution securely on Buy Me a Coffee — we never see your payment details.</p>
    </form>
  )
}
