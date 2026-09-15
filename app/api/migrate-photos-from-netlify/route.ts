import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { putPhoto } from '@/lib/photo-store'

export const dynamic = 'force-dynamic'

/**
 * ONE-TIME MIGRATION ROUTE — delete this file (and the @netlify/blobs
 * dependency) once it's been run successfully.
 *
 * Copies every photo out of the old Netlify Blobs store ("episode-photos")
 * into DigitalOcean Spaces. Requires both the old NETLIFY_BLOBS_CONTEXT and
 * the new SPACES_* env vars to be present at the same time. Call once with
 * POST and header `x-migration-secret: $MIGRATION_SECRET`.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-migration-secret')
  if (!process.env.MIGRATION_SECRET || secret !== process.env.MIGRATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = getStore('episode-photos')
  const { blobs } = await store.list()

  const migrated: string[] = []
  const failed: { key: string; error: string }[] = []

  for (const blob of blobs) {
    try {
      const data = await store.get(blob.key, { type: 'arrayBuffer' })
      if (!data) {
        failed.push({ key: blob.key, error: 'empty blob' })
        continue
      }
      const ext = blob.key.split('.').pop()?.toLowerCase() ?? 'jpg'
      const contentType = ext === 'png' ? 'image/png'
        : ext === 'webp' ? 'image/webp'
        : ext === 'gif' ? 'image/gif'
        : 'image/jpeg'
      await putPhoto(blob.key, Buffer.from(data), contentType)
      migrated.push(blob.key)
    } catch (err) {
      failed.push({ key: blob.key, error: String(err) })
    }
  }

  return NextResponse.json({ ok: true, total: blobs.length, migratedCount: migrated.length, migrated, failed })
}
