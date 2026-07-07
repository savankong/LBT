import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

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
  const bytes = await file.arrayBuffer()

  const store = getStore('episode-photos')
  await store.set(filename, Buffer.from(bytes), {
    metadata: { contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}` },
  })

  const url = `/api/photo/${filename}`
  return NextResponse.json({ ok: true, url })
}
