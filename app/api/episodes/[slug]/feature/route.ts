import { NextRequest, NextResponse } from 'next/server'
import { setHomepageFeatured } from '@/lib/episodes-db'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { featured } = await req.json() as { featured: boolean }
  await setHomepageFeatured(slug, featured)
  return NextResponse.json({ ok: true })
}
