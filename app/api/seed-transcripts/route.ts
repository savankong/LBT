import { sql } from '@netlify/database'
import { NextResponse } from 'next/server'

// Mapping: episode slug → transcript filename
// Transcript files follow: {show}-{season}{episode}-{guest-slug}.txt
// Episode slugs in DB follow similar pattern

const TRANSCRIPT_MAP: Record<string, string> = {
  // LBT Season 1
  'lbt-s01-e01-savan-kong': 'lbt-0101-savan-kong.txt',
  'lbt-s01-e02-howie-cohen': 'lbt-0102-howie-cohen.txt',
  'lbt-s01-e03-wes-averkamp': 'lbt-0103-wes-averkamp.txt',
  'lbt-s01-e04-sarah-johnson': 'lbt-0104-sarah-johnson.txt',
  'lbt-s01-e05-phil-reiman': 'lbt-0105-phil-reiman.txt',
  'lbt-s01-e06-mike-lee': 'lbt-0106-mike-lee.txt',
  'lbt-s01-e07-katie-spector': 'lbt-0107-katie-spector.txt',
  'lbt-s01-e08-anne-gore': 'lbt-0108-anne-gore.txt',
  'lbt-s01-e10-savan-kong': 'lbt-0110-savan-kong.txt',
  'lbt-s01-e11-vanessa-okoro': 'lbt-0111-vanessa-okoro.txt',
  'lbt-s01-e12-savan-kong': 'lbt-0112-savan-kong.txt',
  'lbt-s01-e13-pamela-davis': 'lbt-0113-pamela-davis.txt',
  'lbt-s01-e14-savan-kong': 'lbt-0114-savan-kong.txt',
  'lbt-s01-e15-jason-briefel': 'lbt-0115-jason-briefel.txt',
  'lbt-s01-e16-jen-tran': 'lbt-0116-jen-tran.txt',
  'lbt-s01-e17-savan-kong': 'lbt-0117-savan-kong.txt',
  'lbt-s01-e18-andrew-merchant': 'lbt-0118-andrew-merchant.txt',
  'lbt-s01-e19-tim-salazar': 'lbt-0119-tim-salazar.txt',
  'lbt-s01-e20-matt-kelly': 'lbt-0120-matt-kelly.txt',
  'lbt-s01-e21-savan-kong': 'lbt-0121-savan-kong.txt',
  'lbt-s01-e22-savan-kong': 'lbt-0122-savan-kong.txt',
  'lbt-s01-e24-savan-kong': 'lbt-0124-savan-kong.txt',
  // LBT Season 2
  'lbt-s02-e02-brett-luartes': 'lbt-0202-brett-luartes.txt',
  'lbt-s02-e03-leslie-barber': 'lbt-0203-leslie-barber.txt',
  'lbt-s02-e04-rory-martin': 'lbt-0204-rory-martin.txt',
  'lbt-s02-e05-david-aviles': 'lbt-0205-david-aviles.txt',
  'lbt-s02-e06-cat-gaa': 'lbt-0206-cat-gaa.txt',
  'lbt-s02-e07-angela-kerek': 'lbt-0207-angela-kerek.txt',
  'lbt-s02-e08-lorie-eber': 'lbt-0208-lorie-eber.txt',
  'lbt-s02-e09-eric-robinson': 'lbt-0209-eric-robinson.txt',
  // OH Season 1
  'oh-s01-e01-ringo-nishioka': 'oh-0101-ringo-nishioka.txt',
  'oh-s01-e02-cheryl-dillon': 'oh-0102-cheryl-dillon.txt',
  'oh-s01-e03-tre-wright': 'oh-0103-tre-wright.txt',
  'oh-s01-e04-vance-cooper': 'oh-0104-vance-cooper.txt',
  // WU Season 1
  'wu-s01-e01-reet-german': 'wu-0101-reet-german.txt',
  'wu-s01-e02-vanny-whitchelo': 'wu-0102-vanny-whitchelo.txt',
  'wu-s01-e03-danielle-luhmann': 'wu-0103-danielle-luhmann.txt',
  'wu-s01-e04-aaron-brooks': 'wu-0104-aaron-brooks.txt',
  'wu-s01-e05-andy-alvarado': 'wu-0105-andy-alvarado.txt',
  'wu-s01-e06-david-mazzeo': 'wu-0106-david-mazzeo.txt',
  // WU Season 2
  'wu-s02-e01-nate-sexton': 'wu-0201-nate-sexton.txt',
  'wu-s02-e02-jordan-swanson': 'wu-0202-jordan-swanson.txt',
  'wu-s02-e03-jerry-glavy': 'wu-0203-jerry-glavy.txt',
  'wu-s02-e04-danielle-frank': 'wu-0204-danielle-frank.txt',
  'wu-s02-e05-ann-dunkin': 'wu-0205-ann-dunkin.txt',
  'wu-s02-e06-gladdys-uribe': 'wu-0206-gladdys-uribe.txt',
  'wu-s02-e07-john-sherman': 'wu-0207-john-sherman.txt',
  'wu-s02-e08-anthony-dyer': 'wu-0208-anthony-dyer.txt',
  'wu-s02-e09-brett-cohen': 'wu-0209-brett-cohen.txt',
  'wu-s02-e10-alan-levy': 'wu-0210-alan-levy.txt',
  'wu-s02-e11-aaron-dossey': 'wu-0211-aaron-dossey.txt',
  'wu-s02-e12-wayne-wallis': 'wu-0212-wayne-wallis.txt',
  'wu-s02-e13-kelli-martin': 'wu-0213-kelli-martin.txt',
  'wu-s02-e14-katie-savage': 'wu-0214-katie-savage.txt',
  'wu-s02-e15-billy-mitchell': 'wu-0215-billy-mitchell.txt',
  'wu-s02-e16-shane-jewel': 'wu-0216-shane-jewel.txt',
  'wu-s02-e99-david-murphy': 'wu-0299-david-murphy-david-murphy.txt',
  // Specials
  'savan-kong-i-am-not-my-job': 'savan-kong-i-am-not-my-job.txt',
  'vanny-whitchelo-khmer-voices-cambodian-podcaster': 'vanny-whitchelo-khmer-voices-cambodian-podcaster.txt',
  'wu-vance-cooper': 'wu-vance-cooper.txt',
}

export async function GET() {
  // First, fetch all slugs from DB to verify mapping
  const rows = await sql`SELECT slug, transcript_file FROM episodes ORDER BY slug`
  const dbSlugs = rows.rows.map((r: { slug: string; transcript_file: string | null }) => r.slug)

  const results: { slug: string; file: string; status: string }[] = []
  const notFound: string[] = []

  for (const [slug, file] of Object.entries(TRANSCRIPT_MAP)) {
    if (dbSlugs.includes(slug)) {
      await sql`UPDATE episodes SET transcript_file = ${file} WHERE slug = ${slug}`
      results.push({ slug, file, status: 'updated' })
    } else {
      notFound.push(slug)
    }
  }

  // Return slugs in DB that had no mapping
  const unmapped = dbSlugs.filter((s: string) => !TRANSCRIPT_MAP[s])

  return NextResponse.json({ updated: results.length, results, notFoundInDB: notFound, dbSlugsWithNoTranscript: unmapped })
}
