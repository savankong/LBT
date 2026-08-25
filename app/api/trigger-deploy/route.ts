import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  const token = process.env.DO_API_TOKEN
  const appId = process.env.DO_APP_ID
  if (!token || !appId) {
    return NextResponse.json({ error: 'DO_API_TOKEN / DO_APP_ID not configured' }, { status: 500 })
  }
  try {
    const res = await fetch(`https://api.digitalocean.com/v2/apps/${appId}/deployments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ force_build: true }),
    })
    if (!res.ok) throw new Error(`DigitalOcean responded ${res.status}`)
    return NextResponse.json({ ok: true, message: 'Deploy triggered' })
  } catch (err) {
    console.error('trigger-deploy', err)
    return NextResponse.json({ error: 'Failed to trigger deploy' }, { status: 500 })
  }
}
