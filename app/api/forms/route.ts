import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const FORM_LABELS: Record<string, string> = {
  'sponsor-inquiry': 'Sponsor Inquiry',
  'guest-submission': 'Guest Submission',
  'contact': 'Contact Form',
  'build-your-own-show': 'Build Your Own Show',
  'book-early-access': 'Book Early Access',
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string>
    const formName = body['form-name']
    const label = FORM_LABELS[formName]
    if (!label) {
      return NextResponse.json({ error: 'Unknown form' }, { status: 400 })
    }

    // Honeypot — bots fill every field, humans never see it. Pretend success either way.
    if (body['bot-field']) {
      return NextResponse.json({ ok: true })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.FORM_NOTIFY_EMAIL
    const from = process.env.FORM_FROM_EMAIL
    if (!apiKey || !to || !from) {
      console.error('/api/forms: RESEND_API_KEY, FORM_NOTIFY_EMAIL, or FORM_FROM_EMAIL not configured')
      return NextResponse.json({ error: 'Form submission is not configured' }, { status: 500 })
    }

    const replyTo = typeof body.email === 'string' && body.email
      ? body.email
      : typeof body.yourEmail === 'string' && body.yourEmail ? body.yourEmail : undefined

    const html = Object.entries(body)
      .filter(([k]) => k !== 'form-name' && k !== 'bot-field')
      .map(([k, v]) => `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(v ?? ''))}</p>`)
      .join('')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject: `[LBT] ${label}`,
        html: html || '<p>(no fields submitted)</p>',
      }),
    })

    if (!res.ok) {
      console.error('/api/forms: Resend error', res.status, await res.text())
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('/api/forms', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
