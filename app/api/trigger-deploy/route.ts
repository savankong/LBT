import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  const hookUrl = process.env.NETLIFY_BUILD_HOOK
  if (!hookUrl) {
    return NextResponse.json({ error: 'NETLIFY_BUILD_HOOK not configured' }, { status: 500 })
  }
  try {
    const res = await fetch(hookUrl, { method: 'POST' })
    if (!res.ok) throw new Error(`Netlify responded ${res.status}`)
    return NextResponse.json({ ok: true, message: 'Deploy triggered' })
  } catch (err) {
    console.error('trigger-deploy', err)
    return NextResponse.json({ error: 'Failed to trigger deploy' }, { status: 500 })
  }
}
