'use client'
import { useState } from 'react'

const SHOWS = ['Life Between Titles (Flagship)', 'Office Hours', 'Work, Unscripted', 'Not Sure — Open to Any']

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function GuestSubmissionForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ yourName: '', yourEmail: '', guestName: '', guestLink: '', show: '', why: '' })
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
        body: encode({ 'form-name': 'guest-submission', ...form }),
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
      <div className="glass-gold" style={{padding:48,textAlign:'center',maxWidth:520}}>
        <h3 style={{marginBottom:12}}>Thank you!</h3>
        <p>We review every submission and respond within a week. If it&apos;s urgent, reach us directly at <a href="mailto:hello@lifebetweentitles.com" style={{color:'var(--terra)'}}>hello@lifebetweentitles.com</a>.</p>
      </div>
    )
  }

  return (
    <form name="guest-submission" method="POST" onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:20}}>
      <input type="hidden" name="form-name" value="guest-submission" />
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="yourName">Your Name</label>
          <input id="yourName" name="yourName" className="form-input" type="text" required placeholder="Jane Smith" value={form.yourName} onChange={set('yourName')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="yourEmail">Your Email</label>
          <input id="yourEmail" name="yourEmail" className="form-input" type="email" required placeholder="jane@example.com" value={form.yourEmail} onChange={set('yourEmail')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="guestName">Guest Name</label>
          <input id="guestName" name="guestName" className="form-input" type="text" required placeholder="Full name" value={form.guestName} onChange={set('guestName')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="guestLink">Guest LinkedIn / Website</label>
          <input id="guestLink" name="guestLink" className="form-input" type="text" placeholder="linkedin.com/in/..." value={form.guestLink} onChange={set('guestLink')} />
        </div>
        <div className="form-group full">
          <label className="form-label" htmlFor="show">Which Show?</label>
          <select id="show" name="show" className="form-select" value={form.show} onChange={set('show')}>
            <option value="">Select a show…</option>
            {SHOWS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group full">
          <label className="form-label" htmlFor="why">Why this guest?</label>
          <textarea id="why" name="why" className="form-textarea" required placeholder="Tell us about their story. What transition have they been through? Why would they make a compelling guest? Be specific — the more context, the better." value={form.why} onChange={set('why')} />
        </div>
      </div>
      <button type="submit" className="btn btn-gold" style={{alignSelf:'flex-start'}} disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Guest →'}
      </button>
      {error && <p style={{ fontSize: '.8rem', color: 'var(--terra)' }}>{error}</p>}
      <p style={{fontSize:'.78rem',color:'var(--faint)'}}>We review every submission and respond within a week.</p>
    </form>
  )
}
