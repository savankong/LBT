import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

const TRANSCRIPT_MAP: Record<string, string> = {
  // LBT Season 1
  'savan-kong-title-identity': 'lbt-0101-savan-kong.txt',
  'howie-cohen-relationships-career-cx': 'lbt-0102-howie-cohen.txt',
  'wes-averkamp-military-transition-peace': 'lbt-0103-wes-averkamp.txt',
  'sarah-johnson-design-tech-to-purpose': 'lbt-0104-sarah-johnson.txt',
  'phil-reiman-pentagon-dod-lawyer': 'lbt-0105-phil-reiman.txt',
  'mike-lee-unemployment-therapy-identity': 'lbt-0106-mike-lee.txt',
  'katie-spector-veterans-advocacy-va-failure': 'lbt-0107-katie-spector.txt',
  'anne-gore-usaid-humanitarian-dismantled': 'lbt-0108-anne-gore.txt',
  'savan-kong-starting-over': 'lbt-0110-savan-kong.txt',
  'vanessa-okoro-ey-faa-reinvention': 'lbt-0111-vanessa-okoro.txt',
  'savan-kong-career-change-pattern': 'lbt-0112-savan-kong.txt',
  'pamela-davis-single-mom-resilience': 'lbt-0113-pamela-davis.txt',
  'savan-kong-grace-helping-others': 'lbt-0114-savan-kong.txt',
  'jason-briefel-federal-senior-executives': 'lbt-0115-jason-briefel.txt',
  'jen-tran-ux-bootcamp-career-change': 'lbt-0116-jen-tran.txt',
  'savan-kong-one-year-leaving-dod': 'lbt-0117-savan-kong.txt',
  'andrew-merchant-history-friendship-career': 'lbt-0118-andrew-merchant.txt',
  'tim-salazar-creative-career-immigrant-parents': 'lbt-0119-tim-salazar.txt',
  'matt-kelly-enterprise-sales-burnout-reset': 'lbt-0120-matt-kelly.txt',
  'savan-kong-new-project-announcement': 'lbt-0121-savan-kong.txt',
  'savan-kong-22-people-job-loss': 'lbt-0122-savan-kong.txt',
  'savan-kong-amazon-government-layoffs-rif': 'lbt-0124-savan-kong.txt',
  // LBT Season 2
  'brett-luartes-pentagon-early-retirement-mexico': 'lbt-0202-brett-luartes.txt',
  'leslie-barber-fuck-yes-philosophy': 'lbt-0203-leslie-barber.txt',
  'rory-martin-ai-hustle-50-sobriety': 'lbt-0204-rory-martin.txt',
  'david-aviles-tech-sales-fired-startup': 'lbt-0205-david-aviles.txt',
  'cat-gaa-expat-spain-saudi-arabia-home': 'lbt-0206-cat-gaa.txt',
  'angela-kerek-tennis-lawyer-coach-winning-inside': 'lbt-0207-angela-kerek.txt',
  'lorie-eber-attorney-to-health-coach': 'lbt-0208-lorie-eber.txt',
  'eric-robinson-pastor-fbi-scrabble': 'lbt-0209-eric-robinson.txt',
  // OH Season 1
  'ringo-nishioka-bad-managers-leadership': 'oh-0101-ringo-nishioka.txt',
  'cheryl-dillon-career-coach-hard-things': 'oh-0102-cheryl-dillon.txt',
  'tre-wright-feedback-culture-leadership': 'oh-0103-tre-wright.txt',
  'vance-cooper-philadelphia-leadership': 'oh-0104-vance-cooper.txt',
  // WU Season 1
  'reet-german-23-countries-spiritual-homecoming': 'wu-0101-reet-german.txt',
  'danielle-luhmann-therapy-practice-adhd': 'wu-0103-danielle-luhmann.txt',
  'aaron-brooks-federal-prison-food-supervisor': 'wu-0104-aaron-brooks.txt',
  'andy-alvarado-booking-com-content-creator': 'wu-0105-andy-alvarado.txt',
  'david-mazzeo-emcee-odea': 'wu-0106-david-mazzeo.txt',
  // WU Season 2
  'nate-sexton-pro-disc-golfer': 'wu-0201-nate-sexton.txt',
  'jordan-swanson-pediatric-craniofacial-surgeon': 'wu-0202-jordan-swanson.txt',
  'jerry-glavy-marine-general-cyber-command': 'wu-0203-jerry-glavy.txt',
  'danielle-frank-wine-spirits-author-reinvention': 'wu-0204-danielle-frank.txt',
  'ann-dunkin-federal-cio-technology-leadership': 'wu-0205-ann-dunkin.txt',
  'gladdys-uribe-immigration-attorney': 'wu-0206-gladdys-uribe.txt',
  'john-sherman-dod-kindness-leadership': 'wu-0207-john-sherman.txt',
  'anthony-dyer-tito-basketball-book': 'wu-0208-anthony-dyer.txt',
  'brett-cohen-viral-radio-times-square': 'wu-0209-brett-cohen.txt',
  'alan-levy-entrepreneur-block-talk-radio': 'wu-0210-alan-levy.txt',
  'aaron-dossey-insect-protein-scientist': 'wu-0211-aaron-dossey.txt',
  'wayne-wallis-physician-biotech-semi-retirement': 'wu-0212-wayne-wallis.txt',
  'kelli-martin-book-editor-publishing': 'wu-0213-kelli-martin.txt',
  'katie-savage-cio-maryland': 'wu-0214-katie-savage.txt',
  'billy-mitchell-fedscoop-editorial-government-media': 'wu-0215-billy-mitchell.txt',
  'shane-jewel-oregon-ballet-theater': 'wu-0216-shane-jewel.txt',
  'david-murphy-actor-commercial-bali': 'wu-0299-david-murphy-david-murphy.txt',
  // Specials
  'savan-kong-i-am-not-my-job': 'savan-kong-i-am-not-my-job.txt',
  'vanny-whitchelo-khmer-voices-cambodian-podcaster': 'vanny-whitchelo-khmer-voices-cambodian-podcaster.txt',
  // WU Vance Cooper special
  'loung-ung-work-unscripted': 'wu-vance-cooper.txt',
}

export async function GET() {
  const rows = await sql`SELECT slug, transcript_file FROM episodes ORDER BY slug`
  const dbSlugs = (rows as unknown as { slug: string; transcript_file: string | null }[]).map(r => r.slug)

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

  const unmapped = dbSlugs.filter(s => !TRANSCRIPT_MAP[s])

  return NextResponse.json({ updated: results.length, results, notFoundInDB: notFound, dbSlugsWithNoTranscript: unmapped })
}
