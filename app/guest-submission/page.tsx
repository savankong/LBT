'use client'
import type { Metadata } from 'next'
import { useState } from 'react'

// Note: metadata export doesn't work in 'use client' components,
// set it in a parent server component or layout if needed.

const SHOWS = ['Life Between Titles (Flagship)', 'Office Hours', 'Work, Unscripted', 'Not Sure — Open to Any']

export default function GuestSubmissionPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    yourName: '', yourEmail: '', guestName: '', guestLink: '', show: '', why: '',
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `Your Name: ${form.yourName}\nYour Email: ${form.yourEmail}\n\nGuest Name: ${form.guestName}\nGuest Link: ${form.guestLink}\nShow: ${form.show}\n\nWhy this guest:\n${form.why}`
    )
    window.location.href = `mailto:hello@lifebetweentitles.com?subject=Guest%20Submission%3A%20${encodeURIComponent(form.guestName)}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Be Part of the Show</span>
            <h1>Submit<br /><em>a Guest</em></h1>
            <p>
              Know someone with a real story? Someone who has lived through a career transition and is willing to talk about it honestly? We want to hear about them.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-start' }}>
            <div>
              <span className="label">What We Look For</span>
              <h2 style={{ marginBottom: '28px', fontSize: '2.4rem' }}>Real stories.<br /><em>Not résumés.</em></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { title: 'Genuine transition', body: 'Someone who has lived through a layoff, pivot, burnout, or significant career shift — not just a job change.' },
                  { title: 'Willingness to be honest', body: 'Guests who can talk about what it actually felt like, not just the polished version they tell at dinner parties.' },
                  { title: 'A unique perspective', body: 'We love unconventional careers, surprising paths, and people who ended up somewhere they never expected.' },
                  { title: 'Any industry, any background', body: 'Marines, surgeons, athletes, food service supervisors — if the story is real, we want to tell it.' },
                ].map(i => (
                  <div key={i.title} className="glass" style={{ borderRadius: '12px', padding: '24px 28px' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{i.title}</h4>
                    <p style={{ fontSize: '0.88rem' }}>{i.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-wrap" style={{ maxWidth: '100%' }}>
              <span className="label" style={{ marginBottom: '24px' }}>The Submission Form</span>
              {submitted ? (
                <div className="glass-gold" style={{ borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '12px' }}>Thank you!</h3>
                  <p>Your email client should have opened with the submission. If not, reach us directly at <a href="mailto:hello@lifebetweentitles.com" style={{ color: 'var(--gold-l)' }}>hello@lifebetweentitles.com</a>.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                      <textarea
                        id="why"
                        className="form-textarea"
                        required
                        placeholder="Tell us about their story. What transition have they been through? Why would they make a compelling guest? Be specific — the more context, the better."
                        value={form.why}
                        onChange={set('why')}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-gold" style={{ alignSelf: 'flex-start' }}>
                    Submit Guest →
                  </button>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                    Submitting will open your email client with a pre-filled message. We review every submission and respond within a week.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
