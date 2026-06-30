import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

const MAPPING: Record<string, string> = {
  "aaron-dossey-insect-protein-scientist": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Dr--Aaron-Dossey--PhD-Scientist--Insect-Protein-Pioneer--On-bugs-as-food--defunded-science--and-building-a-company-no-one-would-invest-in-e3l9kr8",
  "brett-cohen-viral-radio-times-square": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Brett-Cohen--Forbes-Group-VP--On-Going-Viral-Before-Going-Viral-Was-a-Thing-e3kvacd",
  "anthony-dyer-tito-basketball-book": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Anthony-Dyer--Retired-Combat-Veteran--14-Deployments--On-rock-bottom--writing-through-it--and-scars-as-a-roadmap-e3jun0q",
  "john-sherman-dod-kindness-leadership": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Hon--John-Sherman-on-Leading-with-Kindness--911--and-a-Life-of-Consequence-e3jbh8o",
  "gladdys-uribe-immigration-attorney": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Gladdys-Uribe-on-Immigration-Law--ICE-Raids---Building-a-Practice-on-Your-Own-Terms-e3it82r",
  "ann-dunkin-federal-cio-technology-leadership": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Ann-Dunkin-on-Reinvention--Grit--and-Breaking-Into-Rooms-That-Werent-Built-for-You-e3ijr99",
  "danielle-frank-wine-spirits-author-reinvention": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Danielle-Frank-on-Career-Pivots--Breaking-Off-an-Engagement--and-Writing-A-Wine-Lovers-Guide-to-Parenting-wineindustry-author-e3i84q7",
  "jerry-glavy-marine-general-cyber-command": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Jerry-Glavy--Retired-Marine-General--39-Years--On-flying-the-President--commanding-cyber-warfare--and-what-you-miss-when-the-mission-ends-e3hsegd",
  "jordan-swanson-pediatric-craniofacial-surgeon": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Dr--Jordan-Swanson-on-Pediatric-Surgery--Building-Faces--and-a-Career-Most-People-Cant-Imagine-e3hibtq",
  "nate-sexton-pro-disc-golfer": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Nate-Sexton-on-Going-Pro--Sexton-Firebird---Building-a-Legacy-discgolf-jomezpro-e3h836r",
  "savan-kong-one-year-leaving-dod": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/LAID-OFF-A-Year-After-the-Pentagon--The-Story-Ive-Been-Afraid-to-Tell-e3h1ko8",
  "david-mazzeo-emcee-odea": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Dave-Mazzeo-on-Building-a-Career-Between-the-Stage-and-the-Classrooms-of-ODea-High-School-e3gsdkk",
  "andy-alvarado-booking-com-content-creator": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Andy-Alvarado-On-Leaving-Booking-com-to-Building-a-One-Man-Empire-e3gjsai",
  "aaron-brooks-federal-prison-food-supervisor": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Youve-Been-Thinking-About-Prison-Food-And-Prisoners-All-Wrong-e3gecfh",
  "savan-kong-22-people-job-loss": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/I-Talked-to-22-People-After-They-Lost-Their-Jobs--Heres-What-No-One-Tells-You-e3g0c8c",
  "danielle-luhmann-therapy-practice-adhd": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Danielle-Luhmann-on-Career-Transition-From-Law-to-Therapy-After-an-ADHD-Diagnosis-e3g0c9d",
  "matt-kelly-enterprise-sales-burnout-reset": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Matt-Kelly-on-Rebuilding-Identity-After-Career-Loss-and-Starting-Over-e3g0c9i",
  "tim-salazar-creative-career-immigrant-parents": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Tim-Salazar-on-Career-Reinvention--UX-Design--and-Creative-Grit-e3g0c9g",
  "vance-cooper-philadelphia-leadership": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Vance-Cooper-on-Finding-Your-Leadership-Vision-e3g0c8j",
  "andrew-merchant-history-friendship-career": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Andrew-Merchant-on-Identity--Career-Reinvention-After-Military-Service--and-Being-a-Stay-at-home-Dad-e3g0c8q",
  "jen-tran-ux-bootcamp-career-change": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Jen-Tran-on-Career-Transition-to-UX-Design-in-Her-Mid-30s-With-No-Safety-Net-e3g0c8n",
  "tre-wright-feedback-culture-leadership": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Tr-Wright-on-Career-Reinvention-After-Netflix-and-the-Return-to-Purpose-e3g0c8p",
  "jason-briefel-federal-senior-executives": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Jason-Briefel-on-Job-Searching-After-Years-Advocating-for-Federal-Senior-Leaders-e3g0c95",
  "cheryl-dillon-career-coach-hard-things": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Cheryl-Dillon-on-Career-Transition-What-Two-Decades-of-Coaching-Taught-Her-About-Change-e3g0c8k",
  "pamela-davis-single-mom-resilience": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Pamela-Davis-on-Reinvention-After-Raising-Two-Kids-Alone-and-Going-Back-to-College-at-50-e3g0c8e",
  "ringo-nishioka-bad-managers-leadership": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Ringo-Nishioka-on-Job-Loss-Recovery-After-30-Years-in-HR-e3g0c93",
  "vanny-whitchelo-khmer-voices-cambodian-podcaster": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Vanny-Whitchelo-on-Building-a-New-Identity-After-a-Career-Pivot-e3g0c8s",
  "vanessa-okoro-ey-faa-reinvention": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Vanessa-Okoro-on-Career-Transition-From-Consulting-to-Federal-Service-e3g0c8t",
  "savan-kong-amazon-government-layoffs-rif": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Amazon-Layoffs--Government-RIFs--Nobodys-Job-is-Safe--So-What-Comes-Next-e3g0c87",
  "reet-german-23-countries-spiritual-homecoming": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Reet-German-on-Career-Reinvention-After-Selling-Everything-and-Traveling-23-Countries-e3g0c9b",
  "savan-kong-grace-helping-others": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/October-Reflections-Finding-Grace-and-Identity-in-Life-Between-Titles-e3g0c8b",
  "anne-gore-usaid-humanitarian-dismantled": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Anne-Gore-on-Identity-After-USAID-Was-Dismantled-Overnight-e3g0c8v",
  "katie-spector-veterans-advocacy-va-failure": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Katie-Spector-on-Career-Reinvention-After-a-Decade-in-Veteran-Services-e3g0c8u",
  "mike-lee-unemployment-therapy-identity": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Mike-Lee-on-Job-Loss-Recovery-After-Losing-His-Title-and-His-Marriage-e3g0c94",
  "phil-reiman-pentagon-dod-lawyer": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Phil-Reiman-on-Finding-Purpose-After-a-Career-in-Federal-Law-e3g0c8m",
  "sarah-johnson-design-tech-to-purpose": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Sarah-Johnson-on-Career-Transition-After-a-Tech-Layoff-at-40-e3g0c8l",
  "wes-averkamp-military-transition-peace": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Wes-Averkamp-on-Identity-After-the-Military-A-Veterans-Transition-Story-e3g0c90",
  "howie-cohen-relationships-career-cx": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/Howie-Cohen-on-Career-Reinvention-After-Leaving-Federal-Service-e3g0c8i",
  "savan-kong-i-am-not-my-job": "https://podcasters.spotify.com/pod/show/savankong2064/episodes/I-Spent-20-Years-Earning-Titles--Losing-Them-Taught-Me-Everything-e3g0c89",
}

export async function GET() {
  const results: { slug: string; updated: boolean }[] = []
  for (const [slug, url] of Object.entries(MAPPING)) {
    const rows = await sql`UPDATE episodes SET spotify_url = ${url} WHERE slug = ${slug} RETURNING slug`
    results.push({ slug, updated: rows.length > 0 })
  }
  return NextResponse.json({ results })
}
