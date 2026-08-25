import { NextRequest, NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { spaces, PHOTOS_BUCKET } from '@/lib/spaces'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const filename = path.join('/')

  try {
    const obj = await spaces.send(new GetObjectCommand({ Bucket: PHOTOS_BUCKET, Key: filename }))
    const bytes = await obj.Body?.transformToByteArray()

    if (!bytes) {
      return new NextResponse('Not found', { status: 404 })
    }

    const ext = filename.split('.').pop()?.toLowerCase() ?? 'jpg'
    const contentType = ext === 'png' ? 'image/png'
      : ext === 'webp' ? 'image/webp'
      : ext === 'gif' ? 'image/gif'
      : 'image/jpeg'

    return new NextResponse(Buffer.from(bytes), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
