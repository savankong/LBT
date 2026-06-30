'use client'
import { useState } from 'react'

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function ContactForm() {
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
        body: encode({ 'form-name': 'contact', ...form }),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong submitting the form. Please email hello@lifebetweentitles.com directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-gold" style={{ padding: 40, textAlign: 'center' }}>
        <h3 style={{ marginBottom: 12 }}>Thanks for reaching out!</h3>
        <p>We review every message and respond within a week. If it&apos;s urgent, email us directly at <a href="mailto:hello@lifebetweentitles.com" style={{ color: 'var(--terra)' }}>hello@lifebetweentitles.com</a>.</p>
      </div>
    )
  }

  return (
    <form name="contact" method="POST" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <input type="hidden" name="form-name" value="contact" />
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
          <label className="form-label" htmlFor="message">Message</label>
          <textarea id="message" name="message" className="form-textarea" required placeholder="What's on your mind?" value={form.message} onChange={set('message')} />
        </div>
      </div>
      <button type="submit" className="btn btn-gold" style={{ alignSelf: 'flex-start' }} disabled={submitting}>
        {submitting ? 'Sending…' : 'Send Message →'}
      </button>
      {error && <p style={{ fontSize: '.8rem', color: 'var(--terra)' }}>{error}</p>}
      <p style={{ fontSize: '.78rem', color: 'var(--faint)' }}>We review every message and respond within a week.</p>
    </form>
  )
}
