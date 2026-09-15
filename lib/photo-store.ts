import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import type { Readable } from 'stream'

let _client: S3Client | null = null

function getClient(): S3Client {
  if (!_client) {
    const endpoint = process.env.SPACES_ENDPOINT
    const accessKeyId = process.env.SPACES_KEY
    const secretAccessKey = process.env.SPACES_SECRET
    if (!endpoint || !accessKeyId || !secretAccessKey) {
      throw new Error('SPACES_ENDPOINT, SPACES_KEY, and SPACES_SECRET must be set')
    }
    _client = new S3Client({
      endpoint,
      region: process.env.SPACES_REGION || 'us-east-1',
      credentials: { accessKeyId, secretAccessKey },
    })
  }
  return _client
}

function getBucket(): string {
  const bucket = process.env.SPACES_BUCKET
  if (!bucket) throw new Error('SPACES_BUCKET must be set')
  return bucket
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of stream) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks)
}

export async function putPhoto(key: string, body: Buffer, contentType: string): Promise<void> {
  await getClient().send(new PutObjectCommand({
    Bucket: getBucket(),
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: 'public-read',
  }))
}

export async function getPhoto(key: string): Promise<{ body: Buffer; contentType: string } | null> {
  try {
    const res = await getClient().send(new GetObjectCommand({ Bucket: getBucket(), Key: key }))
    const body = await streamToBuffer(res.Body as Readable)
    return { body, contentType: res.ContentType ?? 'application/octet-stream' }
  } catch (err: unknown) {
    const name = (err as { name?: string })?.name
    const status = (err as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode
    if (name === 'NoSuchKey' || status === 404) return null
    throw err
  }
}
