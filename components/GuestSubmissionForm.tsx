'use client'
import { useState } from 'react'

const SHOWS = ['Life Between Titles (Flagship)', 'Office Hours', 'Work, Unscripted', 'Not Sure — Open to Any']

export default function GuestSubmissionForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ yourName:'', yourEmail:'', guestName:'', guestLink:'', show:'', why:'' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = encodeURIComponent(`Your Name: ${form.yourName}\nYour Email: ${form.yourEmail}\n\nGuest Name: ${form.guestName}\nGuest Link: ${form.guestLink}\nShow: ${form.show}\n\nWhy this guest:\n${form.why}`)
    window.location.href = `mailto:hello@lifebetweentitles.com?subject=Guest%20Submission%3A%20${encodeURIComponent(form.guestName)}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="glass-gold" style={{borderRadius:16,padding:48,textAlign:'center',maxWidth:520}}>
        <h3 style={{marginBottom:12}}>Thank you!</h3>
        <p>Your email client should have opened with the submission. If not, reach us directly at <a href="mailto:hello@lifebetweentitles.com" style={{color:'var(--terra)'}}>hello@lifebetweentitles.com</a>.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:20}}>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="yourName">Your Name</label>
          <input id="yourName" className="form-input" type="text" required placeholder="Jane Smith" value={form.yourName} onChange={set('yourName')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="yourEmail">Your Email</label>
          <input id="yourEmail" className="form-input" type="email" required placeholder="jane@example.com" value={form.yourEmail} onChange={set('yourEmail')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="guestName">Guest Name</label>
          <input id="guestName" className="form-input" type="text" required placeholder="Full name" value={form.guestName} onChange={set('guestName')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="guestLink">Guest LinkedIn / Website</label>
          <input id="guestLink" className="form-input" type="url" placeholder="https://" value={form.guestLink} onChange={set('guestLink')} />
        </div>
        <div className="form-group full">
          <label className="form-label" htmlFor="show">Which Show?</label>
          <select id="show" className="form-select" value={form.show} onChange={set('show')}>
            <option value="">Select a show…</option>
            {SHOWS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group full">
          <label className="form-label" htmlFor="why">Why this guest?</label>
          <textarea id="why" className="form-textarea" required placeholder="Tell us about their story. What transition have they been through? Why would they make a compelling guest? Be specific — the more context, the better." value={form.why} onChange={set('why')} />
        </div>
      </div>
      <button type="submit" className="btn btn-gold" style={{alignSelf:'flex-start'}}>Submit Guest →</button>
      <p style={{fontSize:'.78rem',color:'var(--faint)'}}>Submitting will open your email client with a pre-filled message. We review every submission and respond within a week.</p>
    </form>
  )
}
