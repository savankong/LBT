import { S3Client } from '@aws-sdk/client-s3'

const region = process.env.SPACES_REGION ?? 'nyc3'

export const spaces = new S3Client({
  endpoint: `https://${region}.digitaloceanspaces.com`,
  region,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!,
  },
})

export const PHOTOS_BUCKET = process.env.SPACES_BUCKET ?? 'lbt-episode-photos'
