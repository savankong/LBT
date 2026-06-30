import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const MATCHES: { slug: string; youtubeId: string }[] = [
  // Work, Unscripted
  { slug: 'alan-levy-entrepreneur-block-talk-radio', youtubeId: 'gI048NV78fQ' },
  { slug: 'aaron-dossey-insect-protein-scientist', youtubeId: 'kXxd0tao14I' },
  { slug: 'brett-cohen-viral-radio-times-square', youtubeId: 'B0V-DcLJzmQ' },
  { slug: 'john-sherman-dod-kindness-leadership', youtubeId: 'oEXZWTX64uE' },
  { slug: 'gladdys-uribe-immigration-attorney', youtubeId: 'flR5Sklxvi4' },
  { slug: 'katie-savage-cio-maryland', youtubeId: 'a0_fkLrY6Jk' },
  { slug: 'danielle-frank-wine-spirits-author-reinvention', youtubeId: 'yLzp38rm26E' },
  { slug: 'jerry-glavy-marine-general-cyber-command', youtubeId: 'R0xgLK1wzlk' },
  { slug: 'jordan-swanson-pediatric-craniofacial-surgeon', youtubeId: 'KsM0D5dGBnE' },
  { slug: 'nate-sexton-pro-disc-golfer', youtubeId: 'hdz6RZ1tJX0' },
  { slug: 'david-mazzeo-emcee-odea', youtubeId: 'LpJ0p-HIoeE' },
  { slug: 'andy-alvarado-booking-com-content-creator', youtubeId: 'LE80aAGh7Jo' },
  { slug: 'aaron-brooks-federal-prison-food-supervisor', youtubeId: 'lm02e_hNIOE' },
  { slug: 'danielle-luhmann-therapy-practice-adhd', youtubeId: 'i_oSu87c2NU' },
  { slug: 'vanny-whitchelo-khmer-voices-cambodian-podcaster', youtubeId: 'UQqAjA1saxs' },
  { slug: 'anthony-dyer-tito-basketball-book', youtubeId: '2hJElnhFdjo' },
  // Life Between Titles
  { slug: 'savan-kong-i-am-not-my-job', youtubeId: 'Lp4HuLJf2-4' },
  { slug: 'howie-cohen-relationships-career-cx', youtubeId: 'q1SoXSUIzfE' },
  { slug: 'wes-averkamp-military-transition-peace', youtubeId: 'UM_q9pca9X8' },
  { slug: 'sarah-johnson-design-tech-to-purpose', youtubeId: 'wSeCDth9LcY' },
  { slug: 'phil-reiman-pentagon-dod-lawyer', youtubeId: 'NmQkkOZew7w' },
  { slug: 'mike-lee-unemployment-therapy-identity', youtubeId: 'DZeFOIXNQ-0' },
  { slug: 'katie-spector-veterans-advocacy-va-failure', youtubeId: 'Q1ZzFierC2Q' },
  { slug: 'anne-gore-usaid-humanitarian-dismantled', youtubeId: 'SiUrokZQE0E' },
  { slug: 'vanessa-okoro-ey-faa-reinvention', youtubeId: 'r7zjdWUSkiE' },
  { slug: 'pamela-davis-single-mom-resilience', youtubeId: 'PYplFA2nLHI' },
  { slug: 'savan-kong-starting-over', youtubeId: 'M67MuqPd1X4' },
  { slug: 'jen-tran-ux-bootcamp-career-change', youtubeId: 'xENMPOufarg' },
  { slug: 'savan-kong-new-year-2026-reinvention', youtubeId: 'ObBecTzhh80' },
  { slug: 'andrew-merchant-history-friendship-career', youtubeId: 'Ah07FHsfmBI' },
  { slug: 'jason-briefel-federal-senior-executives', youtubeId: 'NBTpKWNJwQc' },
  { slug: 'tim-salazar-creative-career-immigrant-parents', youtubeId: 'h_EvAa60ozE' },
  { slug: 'matt-kelly-enterprise-sales-burnout-reset', youtubeId: '_5xK7sBQ6po' },
  { slug: 'savan-kong-career-change-pattern', youtubeId: 'S4xlMrqxDGI' },
  { slug: 'savan-kong-22-people-job-loss', youtubeId: 'TgKQqyiG-gs' },
  { slug: 'savan-kong-title-identity', youtubeId: '609NEcLkucA' },
  { slug: 'savan-kong-new-project-announcement', youtubeId: '6CvPXy5o4OQ' },
  { slug: 'savan-kong-amazon-government-layoffs-rif', youtubeId: 'OTthyIbma1Y' },
  { slug: 'savan-kong-one-year-leaving-dod', youtubeId: '2kYyXRt7i8I' },
  { slug: 'savan-kong-grace-helping-others', youtubeId: '2OPZW-NFY0w' },
  // Office Hours
  { slug: 'tre-wright-feedback-culture-leadership', youtubeId: '6T_dEL7XOx4' },
  { slug: 'cheryl-dillon-career-coach-hard-things', youtubeId: 'tnV0ZWSsGWo' },
  { slug: 'ringo-nishioka-bad-managers-leadership', youtubeId: 'H6jFc7jW9qs' },
]

export async function GET() {
  const results: { slug: string; updated: number }[] = []

  for (const { slug, youtubeId } of MATCHES) {
    const url = `https://www.youtube.com/watch?v=${youtubeId}`
    const rows = await sql`
      UPDATE episodes SET youtube_url = ${url}, updated_at = NOW()
      WHERE slug = ${slug} AND (youtube_url IS NULL OR youtube_url = '')
      RETURNING slug
    `
    results.push({ slug, updated: rows.length })
  }

  const total = results.reduce((s, r) => s + r.updated, 0)
  return NextResponse.json({ ok: true, total, results })
}
