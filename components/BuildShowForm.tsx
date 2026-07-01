'use client'
import { useState } from 'react'

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function BuildShowForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'build-your-own-show', ...form }),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong submitting the form. Please try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-gold" style={{ padding: 40, textAlign: 'center' }}>
        <h3 style={{ marginBottom: 12 }}>Thanks, {form.name.split(' ')[0] || 'there'}!</h3>
        <p>We&apos;ve got your idea and review every message within a week — we&apos;ll reply to {form.email}.</p>
      </div>
    )
  }

  return (
    <form name="build-your-own-show" method="POST" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <input type="hidden" name="form-name" value="build-your-own-show" />
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Your Name</label>
          <input id="name" name="name" className="form-input" type="text" required placeholder="Jane Smith" value={form.name} onChange={set('name')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Your Email</label>
          <input id="email" name="email" className="form-input" type="email" required placeholder="jane@example.com" value={form.email} onChange={set('email')} />
        </div>
        <div className="form-group full">
          <label className="form-label" htmlFor="message">Tell us about your idea</label>
          <textarea id="message" name="message" className="form-textarea" required placeholder="What's the show? Who's it for? Where are you in the process: just an idea, or already recording?" value={form.message} onChange={set('message')} />
        </div>
      </div>
      <button type="submit" className="btn btn-gold" style={{ alignSelf: 'flex-start' }} disabled={submitting}>
        {submitting ? 'Sending…' : 'Get in Touch →'}
      </button>
      {error && <p style={{ fontSize: '.8rem', color: 'var(--terra)' }}>{error}</p>}
      <p style={{ fontSize: '.78rem', color: 'var(--faint)' }}>We review every submission and respond within a week.</p>
    </form>
  )
}
