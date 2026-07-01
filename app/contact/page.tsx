import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Life Between Titles. Questions, feedback, partnership ideas, or just to say hello.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/contact' },
}

export default function ContactPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Get In Touch</span>
            <h1>Contact Us</h1>
            <p>Questions, feedback, or just want to say hello? Send us a message and we&apos;ll get back to you.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="form-wrap" style={{ maxWidth: 640 }}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
