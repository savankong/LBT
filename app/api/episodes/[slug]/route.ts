import { NextResponse } from 'next/server'
import { getEpisode, updateEpisode, deleteEpisode } from '@/lib/episodes-db'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const episode = await getEpisode(slug)
    if (!episode) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(episode)
  } catch (err) {
    console.error('GET /api/episodes/[slug]', err)
    return NextResponse.json({ error: 'Failed to fetch episode' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const body = await req.json()
    const episode = await updateEpisode(slug, body)
    return NextResponse.json(episode)
  } catch (err) {
    console.error('PUT /api/episodes/[slug]', err)
    return NextResponse.json({ error: 'Failed to update episode' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    await deleteEpisode(slug)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/episodes/[slug]', err)
    return NextResponse.json({ error: 'Failed to delete episode' }, { status: 500 })
  }
}
