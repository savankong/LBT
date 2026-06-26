import { NextResponse } from 'next/server'
import { getEpisodes, createEpisode } from '@/lib/episodes-db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const episodes = await getEpisodes()
    return NextResponse.json(episodes)
  } catch (err) {
    console.error('GET /api/episodes', err)
    return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const episode = await createEpisode(body)
    return NextResponse.json(episode, { status: 201 })
  } catch (err) {
    console.error('POST /api/episodes', err)
    return NextResponse.json({ error: 'Failed to create episode' }, { status: 500 })
  }
}
