import { NextRequest, NextResponse } from 'next/server'
import { getPhoto } from '@/lib/photo-store'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const filename = path.join('/')

  try {
    const photo = await getPhoto(filename)
    if (!photo) {
      return new NextResponse('Not found', { status: 404 })
    }

    return new NextResponse(new Uint8Array(photo.body), {
      headers: {
        'Content-Type': photo.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
