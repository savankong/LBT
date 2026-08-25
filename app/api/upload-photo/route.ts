import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { spaces, PHOTOS_BUCKET } from '@/lib/spaces'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const slug = formData.get('slug') as string | null
  const key = (formData.get('key') as string | null) ?? 'main'

  if (!file || !slug) {
    return NextResponse.json({ error: 'Missing file or slug' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif']
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  const filename = key === 'main' ? `${slug}.${ext}` : `${slug}-${key}.${ext}`
  const arrayBuffer = await file.arrayBuffer()

  await spaces.send(new PutObjectCommand({
    Bucket: PHOTOS_BUCKET,
    Key: filename,
    Body: new Uint8Array(arrayBuffer),
    ContentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  }))

  const url = `/api/photo/${filename}`
  return NextResponse.json({ ok: true, url })
}
