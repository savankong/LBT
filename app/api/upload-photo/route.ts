import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const slug = formData.get('slug') as string | null

  if (!file || !slug) {
    return NextResponse.json({ error: 'Missing file or slug' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif']
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  const filename = `${slug}.${ext}`
  const dir = path.join(process.cwd(), 'public', 'episodes')
  await mkdir(dir, { recursive: true })
  const filePath = path.join(dir, filename)

  const bytes = await file.arrayBuffer()
  await writeFile(filePath, Buffer.from(bytes))

  const url = `/episodes/${filename}`
  return NextResponse.json({ ok: true, url })
}
