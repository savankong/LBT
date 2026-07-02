import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const bio = `John B. Sherman served as the U.S. Department of Defense Chief Information Officer from 2021 to 2024 — a Presidentially-appointed, Senate-confirmed role overseeing the largest technology enterprise in the nation, including enterprise cloud, Zero Trust cybersecurity, and AI integration across the Defense Industrial Base. He also served concurrently as Acting DoD Chief Digital and Artificial Intelligence Officer, leading the consolidation of the Joint AI Center, Defense Digital Services, and related organizations. He is now Dean of The Bush School of Government and Public Service at Texas A&M University and is a recipient of the Distinguished Presidential Rank Award and the CIA Intelligence Medal of Merit.`

  await sql`UPDATE episodes SET guest_bio = ${bio} WHERE slug = 'john-sherman-dod-kindness-leadership'`

  return NextResponse.json({ updated: 'john-sherman-dod-kindness-leadership', bio })
}
