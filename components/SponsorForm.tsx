'use client'
import { useState } from 'react'

const TIERS = ['Presenting Sponsor', 'Mid-Roll Sponsor', 'Newsletter Sponsor', 'Not Sure — Let\'s Talk']

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function SponsorForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', website: '', tier: '', message: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'sponsor-inquiry', ...form }),
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
      <div className="glass-gold" style={{ padding: 48, textAlign: 'center', maxWidth: 560 }}>
        <h3 style={{ marginBottom: 12 }}>Thanks, {form.name.split(' ')[0] || 'there'}!</h3>
        <p>We&apos;ve got your inquiry for {form.company || 'your brand'}{form.tier ? ` (${form.tier})` : ''} and review every submission within a week — we&apos;ll reply to {form.email}.</p>
      </div>
    )
  }

  return (
    <form
      name="sponsor-inquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <input type="hidden" name="form-name" value="sponsor-inquiry" />
      <p style={{ display: 'none' }}>
        <label>Don&apos;t fill this out: <input name="bot-field" onChange={() => {}} /></label>
      </p>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Your Name</label>
          <input id="name" name="name" className="form-input" type="text" required placeholder="Jane Smith" value={form.name} onChange={set('name')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Your Email</label>
          <input id="email" name="email" className="form-input" type="email" required placeholder="jane@brand.com" value={form.email} onChange={set('email')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="company">Company / Brand</label>
          <input id="company" name="company" className="form-input" type="text" required placeholder="Brand name" value={form.company} onChange={set('company')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="website">Website</label>
          <input id="website" name="website" className="form-input" type="text" placeholder="yourbrand.com" value={form.website} onChange={set('website')} />
        </div>
        <div className="form-group full">
          <label className="form-label" htmlFor="tier">Sponsorship Tier</label>
          <select id="tier" name="tier" className="form-select" value={form.tier} onChange={set('tier')}>
            <option value="">Select a tier…</option>
            {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group full">
          <label className="form-label" htmlFor="message">Tell us about your brand and goals</label>
          <textarea id="message" name="message" className="form-textarea" required placeholder="What does your brand do, who are you trying to reach, and why does Life Between Titles feel like the right fit?" value={form.message} onChange={set('message')} />
        </div>
      </div>
      <button type="submit" className="btn btn-gold" style={{ alignSelf: 'flex-start' }} disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Inquiry →'}
      </button>
      {error && <p style={{ fontSize: '.8rem', color: 'var(--terra)' }}>{error}</p>}
      <p style={{ fontSize: '.78rem', color: 'var(--faint)' }}>We review every submission and respond within a week.</p>
    </form>
  )
}
