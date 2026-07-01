import type { Metadata } from 'next'
import GuestSubmissionForm from '@/components/GuestSubmissionForm'

export const metadata: Metadata = {
  title: 'Submit a Guest',
  description: 'Know someone who has navigated a real career transition: a layoff, pivot, burnout, or reinvention? Submit them as a guest on Life Between Titles. We review every submission.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/guest-submission' },
}

export default function GuestSubmissionPage() {
  return (
    <>
      <header className="page-header" style={{ paddingBottom: 'clamp(32px,5vh,48px)' }}>
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Be Part of the Show</span>
            <h1>Submit a Guest</h1>
            <p>Know someone with a real story? Someone who has lived through a career transition and is willing to talk about it honestly? We want to hear about them.</p>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 'clamp(36px,5vh,56px)' }}>
        <div className="container">
          <div className="form-wrap" style={{ maxWidth: 760 }}>
            <span className="label" style={{ marginBottom: 24, display: 'block' }}>The Submission Form</span>
            <GuestSubmissionForm />
          </div>
        </div>
      </section>
    </>
  )
}
