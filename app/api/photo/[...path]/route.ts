import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const filename = path.join('/')

  try {
    const store = getStore('episode-photos')
    const blob = await store.get(filename, { type: 'arrayBuffer' })

    if (!blob) {
      return new NextResponse('Not found', { status: 404 })
    }

    const ext = filename.split('.').pop()?.toLowerCase() ?? 'jpg'
    const contentType = ext === 'png' ? 'image/png'
      : ext === 'webp' ? 'image/webp'
      : ext === 'gif' ? 'image/gif'
      : 'image/jpeg'

    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
