export type Show = 'Life Between Titles' | 'Work Unscripted' | 'Office Hours'
export type Status = 'Published' | 'Recorded' | 'Scheduled' | 'Reached Out' | 'To Be Planned'

export interface Episode {
  slug: string
  videoNumber?: number
  show: Show
  season: number
  episode?: number
  guest: string
  youtubeTitle: string
  description: string
  mainTags: string
  tags: string
  resources: string
  status: Status
  photo: string
  youtubeUrl?: string
  substack?: string
}

const CDN = 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367'
const SAVAN_PHOTO = `${CDN}/ca15d266-eeb0-4750-8266-828ab73926ab/savan-thumb.png`

export const EPISODES: Episode[] = [
  // ── Work Unscripted S1 ────────────────────────────────────────
  {
    slug: 'aaron-brooks-federal-prison-food-supervisor',
    videoNumber: undefined,
    show: 'Work Unscripted',
    season: 1,
    episode: 1,
    guest: 'Aaron Brooks',
    youtubeTitle: 'Aaron Brooks, Federal Bureau of Prisons Food Service Supervisor',
    description: `Aaron Brooks built a career feeding people in some of America's most controlled environments — from submarine baker to maximum-security federal prison kitchen manager.

In this episode:
• What it takes to run a kitchen inside a federal prison
• How the Navy prepared him for high-pressure food service
• What managing inmates taught him about leadership and respect
• Why food is one of the few things that can humanize a carceral environment
• What Aaron has learned about authority, dignity, and what it means to show up

CHAPTERS
• From Navy submarine to the federal prison system
• What a day in a federal prison kitchen actually looks like
• How he leads a kitchen crew made up of inmates
• The unexpected ways food builds trust in a controlled environment
• What he'd tell someone considering this career`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#federalprisons #foodservice #military',
    resources: '',
    status: 'Published',
    photo: `${CDN}/9c5162ff-1d99-4730-bfd5-ea78948c8a21/IMG_5986.jpeg`,
  },
  {
    slug: 'danielle-luhmann-therapy-practice-adhd',
    videoNumber: 28,
    show: 'Work Unscripted',
    season: 1,
    episode: 3,
    guest: 'Danielle Luhmann',
    youtubeTitle: 'She Built a Therapy Practice While Her Own Life Was Falling Apart',
    description: `Danielle Luhmann built Brave and Afraid, a therapy and life coaching practice in Indiana, while navigating her own diagnosis, her own reinvention, and the particular challenge of helping others heal when your own life is still in motion.

In this episode:
• What it takes to build a practice while you're still figuring yourself out
• How ADHD shapes a career and a life differently than people expect
• Why sustainable helping starts with sustainable self-care
• What sacrifice looks like when the work is deeply personal
• How Danielle built Brave and Afraid from the inside out

CHAPTERS
• Danielle's background and how she got into therapy and coaching
• The ADHD diagnosis and what it changed about how she understood herself
• What it's like to help others heal while your own life is still in motion
• Why the oxygen mask metaphor is more than a slogan for her
• What Brave and Afraid is built on and where it's going`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #officehours',
    tags: '#ADHD #therapy #coaching',
    resources: 'Connect with Danielle: braveandafraid.com | Instagram: @danilulu_rocks | Teal AI résumé → https://get.tealhq.com/zzNxQ7 | Free anxiety assessment → https://go.online-therapy.com/SHwO',
    status: 'Published',
    photo: '',
  },
  {
    slug: 'andy-alvarado-booking-com-content-creator',
    videoNumber: 31,
    show: 'Work Unscripted',
    season: 1,
    episode: 5,
    guest: 'Andy Alvarado',
    youtubeTitle: 'He Left a Corporate Career to Film Videos on His Phone. Now He Makes Six Figures.',
    description: `Andy Alvarado was vomiting in the shower before he quit. That's where this story starts. He walked away from Booking.com, picked up his phone, and built a six-figure content business one video at a time.

In this episode:
• How he built a one-man content business from scratch
• What corporate life was doing to him before he left
• Why the phone in your pocket is enough to start
• What the first year of building alone actually looks like
• How Andy found the work that was worth the risk

CHAPTERS
• What life at Booking.com was doing to Andy before he quit
• The moment he decided to walk away with no plan
• How he built a content business using only his phone
• What the first year of going solo actually looked like financially and emotionally
• What six figures from a phone camera taught him about work and freedom`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#contentcreation #entrepreneurship #remotelife',
    resources: '',
    status: 'Published',
    photo: `${CDN}/83e1dbcf-baf4-49b8-a1a5-e2942e141230/andy-solo2.jpg`,
    youtubeUrl: 'https://youtu.be/LE80aAGh7Jo',
    substack: 'https://lifebetweentitles.substack.com/p/the-man-who-burned-the-dream-down',
  },
  {
    slug: 'david-mazzeo-emcee-odea',
    videoNumber: 32,
    show: 'Work Unscripted',
    season: 1,
    episode: 6,
    guest: 'David Mazzeo',
    youtubeTitle: 'From the Stage to the Classroom: Why He Gave Up the Mic',
    description: `David Mazzeo built a career on stages. Emceeing events, holding rooms, reading crowds. Then he walked into a high school and didn't leave.

In this episode:
• Why he traded the mic for the classroom
• What performing taught him about connecting with young people
• How uncommon careers find their way to unlikely places
• What O'Dea High School meant to him and what it still means
• Why community is the thing that outlasts every title

CHAPTERS
• David's life as a Seattle emcee and what that career actually looked like
• The moment he walked into O'Dea and something shifted
• What performing taught him that the classroom uses every day
• What the alumni director role is really about
• Why he stayed and what community means to him now`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#emcee #seattlehiphop #mentoring',
    resources: '',
    status: 'Published',
    photo: `${CDN}/7d4c7999-6b47-4aef-897e-087f10deeacc/IMG_8366.jpeg`,
    youtubeUrl: 'https://youtu.be/LpJ0p-HIoeE',
    substack: 'https://lifebetweentitles.substack.com/p/two-mics-one-mission',
  },
  // ── Life Between Titles S1 ────────────────────────────────────
  {
    slug: 'phil-reiman-pentagon-dod-lawyer',
    videoNumber: 5,
    show: 'Life Between Titles',
    season: 1,
    episode: 5,
    guest: 'Phil Reiman',
    youtubeTitle: '25 Years Inside the Pentagon. Now What?',
    description: `He spent 25 years inside the Department of Defense as a lawyer. He loved every minute of it. Now he's in the in-between, figuring out what a career that long leaves behind and what it points toward.

In this episode:
• What 25 years of institutional work does to your identity
• How to think about the next chapter when the last one was that long
• Why the in-between hits differently when the career was a calling
• What the Department of Defense looks like from the inside
• How to transfer deep expertise into a life after government

CHAPTERS
• What a 25-year legal career inside the DOD actually looks like
• Why he loved every minute of it and what that made the ending harder
• The strangeness of stopping when the work was also the identity
• What expertise without a title feels like
• What the next chapter looks like when you're building it from scratch`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#governmentcareer #dod #pentagon',
    resources: 'Teal AI résumé tool → https://get.tealhq.com/zzNxQ7 | Free anxiety assessment → https://go.online-therapy.com/SHwO | Guided Reflection Journal → https://amzn.to/4reFQSB',
    status: 'Published',
    photo: '',
  },
  {
    slug: 'savan-kong-title-identity',
    videoNumber: 9,
    show: 'Life Between Titles',
    season: 1,
    episode: 9,
    guest: 'Savan Kong',
    youtubeTitle: 'If Your Title Disappeared Tomorrow, Who Would You Be?',
    description: `When the title goes away, most people scramble to replace it. Savan sits with it instead.

In this episode:
• How titles function as identity shortcuts
• What the absence of a title actually reveals
• Why the answer to "who are you?" matters more than the next offer
• What happens when you stop hiding behind your role
• How to build identity that doesn't depend on employment

CHAPTERS
• What a title actually does for your sense of self
• What the void reveals when the title disappears
• Why replacing the title is the wrong move first
• How to sit in the question without collapsing
• What identity looks like when it doesn't need a badge`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#workidentity #soloshow',
    resources: '',
    status: 'Published',
    photo: SAVAN_PHOTO,
  },
  {
    slug: 'vanessa-okoro-ey-faa-reinvention',
    videoNumber: 12,
    show: 'Life Between Titles',
    season: 1,
    episode: 11,
    guest: 'Vanessa Okoro',
    youtubeTitle: 'Representation Has a Price: One Woman\'s Breaking Point',
    description: `Vanessa Okoro spent over a decade at Ernst & Young climbing from consultant to senior manager before walking away to join the FAA as a federal employee. Then the federal government changed overnight, and she found herself navigating unemployment for the second time in two years. A first-generation Nigerian-American who grew up in New Jersey never quite fitting in — this one is about belonging, burnout as disconnection, and the ego work of job searching after senior leadership.

In this episode:
• What it costs to perform excellence as armor
• The anxiety of always needing to overperform when you're the only one in the room who looks like you
• What burnout actually feels like when it's not burnout — it's disconnection
• Why she left a path to partnership at EY
• What nobody told her about stepping down in title to step up in purpose

CHAPTERS
• Growing up first-generation Nigerian-American in New Jersey
• 15 years in consulting and the slow drift from purpose
• Leaving EY for the FAA — and what that actually cost her
• The second layoff: federal worker in a changing government
• What ego work looks like when you're searching after senior leadership`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#federalworker #consulting #firstgen',
    resources: 'Teal AI résumé tool → https://get.tealhq.com/zzNxQ7 | Free anxiety assessment → https://go.online-therapy.com/SHwO',
    status: 'Published',
    photo: '',
  },
  {
    slug: 'savan-kong-starting-over',
    videoNumber: 18,
    show: 'Life Between Titles',
    season: 1,
    episode: 14,
    guest: 'Savan Kong',
    youtubeTitle: 'The One Thing Nobody Tells You About Starting Over',
    description: `Two months in. Savan looks back at the guests who shaped the first stretch of Life Between Titles and shares what he didn't expect to find in the conversations. Not a recap. A reflection on what uncertainty actually offers when you stop trying to outrun it.

In this episode:
• What the first two months of LBT revealed about career and identity
• Why walking into uncertainty is sometimes the most honest thing you can do
• What the guests taught the host about his own in-between
• How the show has changed since the first episode
• What comes next for Life Between Titles

CHAPTERS
• Looking back at the first two months of conversations
• What each guest taught Savan about his own transition
• The unexpected gifts that surface when you stop running from uncertainty
• What the show is becoming and why it matters
• What walking into the unknown actually offers you`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#uncertainty #soloshow',
    resources: '',
    status: 'Published',
    photo: SAVAN_PHOTO,
  },
  {
    slug: 'savan-kong-career-change-pattern',
    videoNumber: 27,
    show: 'Life Between Titles',
    season: 1,
    episode: 21,
    guest: 'Savan Kong',
    youtubeTitle: 'The Pattern Behind Every Successful Career Change',
    description: `A transparent update on where Life Between Titles stands after 25+ conversations. Savan shares what he's learned, introduces the new Work, Unscripted series, and talks about the pattern he keeps seeing across every guest who has actually made it through a career change.

In this episode:
• What the first 25 conversations revealed about career transition
• Why the pattern behind successful reinvention is almost never what people expect
• What's changing about Life Between Titles — new show, new format
• Why affiliate partnerships matter and how they were chosen
• What comes next for the show

CHAPTERS
• Looking back at 25 raw conversations
• The pattern Savan keeps seeing across every guest
• Introducing Work, Unscripted
• A transparent note on affiliate partnerships
• What's next`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#workidentity #soloshow',
    resources: 'Online Therapy → https://go.online-therapy.com/SHwO',
    status: 'Published',
    photo: SAVAN_PHOTO,
  },
  {
    slug: 'savan-kong-22-people-job-loss',
    videoNumber: 29,
    show: 'Life Between Titles',
    season: 1,
    episode: 22,
    guest: 'Savan Kong',
    youtubeTitle: 'I Talked to 22 People After They Lost Their Jobs. Here\'s What No One Tells You.',
    description: `After 22 raw conversations with real people, host Savan Kong discovered that bouncing back has nothing to do with your resume and everything to do with your identity.

In this episode:
• Why your body breaks down before your brain does after a layoff
• Why every single person who bounced back did some form of inner work first
• How relationships and community literally saved people during unemployment
• Why building something — anything — keeps your identity intact during job loss
• The most important reframe: you're not grieving a job, you're grieving an identity

CHAPTERS
• What the body does first after a layoff
• Why the people who made it through all did inner work
• How community became a lifeline for every guest
• Why building — anything — keeps identity intact
• The reframe that changed everything: identity, not employment`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#workidentity #layoff #soloshow',
    resources: 'Teal AI résumé → https://get.tealhq.com/zzNxQ7 | Free anxiety assessment → https://go.online-therapy.com/SHwO | Guided Reflection Journal → https://amzn.to/4reFQSB',
    status: 'Published',
    photo: SAVAN_PHOTO,
  },
  // ── Office Hours S1 ───────────────────────────────────────────
  {
    slug: 'cheryl-dillon-career-coach-hard-things',
    videoNumber: 17,
    show: 'Office Hours',
    season: 1,
    episode: 4,
    guest: 'Cheryl Dillon',
    youtubeTitle: 'The Moment She Stopped Running from Hard Things',
    description: `Cheryl Dillon has spent her career helping people through the hard parts. Challenge is not the obstacle — it's the mechanism. The people who move forward are the ones who learn to stop running from difficulty and start working with it.

In this episode:
• How to reframe challenge as a catalyst instead of a setback
• What guides the people who actually make it through
• Why discomfort is data, not a stop sign
• What coaching reveals about human resilience
• How to find the gift inside the hard thing

CHAPTERS
• Cheryl's background in career coaching and transition work
• Why challenge is the mechanism, not the obstacle
• What the people who make it through all have in common
• How to read discomfort as signal instead of failure
• What Cheryl has learned from watching people move through hard things`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #officehours',
    tags: '#resilience #careercoaching',
    resources: '',
    status: 'Published',
    photo: '',
  },
  // ── Work Unscripted S2 ────────────────────────────────────────
  {
    slug: 'nate-sexton-pro-disc-golfer',
    videoNumber: 34,
    show: 'Work Unscripted',
    season: 2,
    episode: 1,
    guest: 'Nate Sexton',
    youtubeTitle: 'He Went Pro at Disc Golf Before Anyone Thought It Was Possible',
    description: `Nate Sexton went pro at disc golf before it was obvious that was possible. He helped build the Sexton Firebird into one of the most recognized discs in the sport and became a fixture on the Jomez Pro broadcast along the way.

In this episode:
• What it took to go pro in a sport without a clear roadmap
• How the Sexton Firebird came to be and what it means to him
• What building a legacy looks like in an emerging sport
• How Jomez Pro changed the way disc golf is seen
• What Nate has learned about longevity, brand, and staying relevant

CHAPTERS
• How Nate got into disc golf and decided to go all in
• What going pro looked like before there was a roadmap for it
• The Sexton Firebird: how it was created and what it became
• Jomez Pro and how broadcast changed the sport
• What legacy means in a sport the world is still figuring out`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#discgolf #professionalathlete #legacy',
    resources: '',
    status: 'Published',
    photo: `${CDN}/4a1c09a5-f460-43c4-b747-1a057ac328c3/sean-sinclair-0Y6BaIZeh0g-unsplash.jpg`,
    youtubeUrl: 'https://youtu.be/hdz6RZ1tJX0',
    substack: 'https://lifebetweentitles.substack.com/p/the-house-a-firebird-built-how-nate',
  },
  {
    slug: 'jordan-swanson-pediatric-craniofacial-surgeon',
    videoNumber: 35,
    show: 'Work Unscripted',
    season: 2,
    episode: 2,
    guest: 'Jordan Swanson',
    youtubeTitle: 'He Rebuilds Children\'s Faces. The Operating Room Is Just the Beginning.',
    description: `Jordan Swanson is a pediatric craniofacial surgeon at the Children's Hospital of Philadelphia, rebuilding the skulls and faces of children born with conditions that affect how they grow, breathe, and move through the world.

In this episode:
• What a pediatric craniofacial surgeon actually does and why most people don't know it exists
• What it takes to choose a path this demanding and stay on it for decades
• What happened when surgery went wrong in Nicaragua and how training saved the patient
• How Jordan thinks about risk, preparation, and the families who trust him completely
• What it means to dedicate your hands to children who can't yet speak for themselves

CHAPTERS
• Who Jordan Swanson is and what craniofacial surgery actually means
• What children with skull and facial conditions face before and after surgery
• The Nicaragua operating room crisis: an 18-month-old, a lost pulse, and a training that saved a life
• How Jordan thinks about risk and preparation when the stakes are this high
• What the work requires of you beyond the technical skill`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#pediatricsurgery #medicine #globalhealth',
    resources: '',
    status: 'Published',
    photo: `${CDN}/ff537cd0-fe70-4b2d-be17-f588b47e625f/BioPhoto-PLA-JordanSwanson-2624x1720.jpeg`,
    substack: 'https://lifebetweentitles.substack.com/p/jordan-swanson-pediatric-craniofacial-surgeon',
  },
  {
    slug: 'jerry-glavy-marine-general-cyber-command',
    videoNumber: 37,
    show: 'Work Unscripted',
    season: 2,
    episode: 3,
    guest: 'Lt. Gen. Matthew "Jerry" Glavy',
    youtubeTitle: 'He Flew the President. Then He Commanded Cyber and Space. Now What?',
    description: `Jerry Glavy flew Marine One. He carried multiple presidents into Buckingham Palace, military bases, and cities across the world. Then he pivoted into cyber and space operations and retired as a Lieutenant General. Now he's in the in-between.

In this episode:
• What it's actually like to fly the President of the United States
• How he went from Marine helicopter pilot to leading cyber and space operations
• What the Pentagon looks like from the inside, and from the outside looking back
• How identity shifts across a career that spans flight, combat, and technology command
• What retirement looks like after 30 years of service at the highest levels of the Marine Corps

CHAPTERS
• Flying Marine One: what it actually takes to carry a president
• The most memorable flights, including Buckingham Palace and Rio de Janeiro
• How he transitioned from helicopter pilot to cyber and space command
• What the Pentagon looks like from the inside after 30 years
• What identity and purpose look like after the uniform comes off`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#military #cybercommand #leadership #marineone',
    resources: '',
    status: 'Published',
    photo: `${CDN}/747fa92e-0c0a-4cbb-8bd4-1e0012e636ce/Lt._Gen._Matthew_G._Glavy.jpg`,
    substack: 'https://lifebetweentitles.substack.com/p/zero-defect',
  },
  {
    slug: 'danielle-frank-wine-spirits-author-reinvention',
    videoNumber: 38,
    show: 'Work Unscripted',
    season: 2,
    episode: 4,
    guest: 'Danielle Frank',
    youtubeTitle: 'She Broke Off Her Engagement, Left New York, and Wrote a Book About All of It.',
    description: `Danielle Frank was at Miramax in New York, going to Cannes and Venice, dating her best friend, watching everyone around her get married, and starting to feel a pull she couldn't argue with. She wasn't ready. So she left. She moved to LA, walked into a PR firm where publicists were crying on her first day, stayed three months, and found her next thing. Then her engagement ended. Then her career changed again. Then she wrote a book. She calls herself a veteran of pivots.

In this episode:
• What it felt like to leave Miramax, New York, and a long relationship all at the same time
• How she recognized the difference between the job that never made her dread Monday and the one that gave her a pit in her stomach every morning
• What her book is about and how promoting it made her realize pivoting was the whole story, not just a chapter
• What the veteran of pivots identity actually feels like from inside it
• Why the most meaningful lives often begin exactly where the original plan ends

CHAPTERS
• Miramax, New York, and the gut feeling she couldn't argue with
• Moving to LA and walking into a toxic PR firm on day one
• Breaking off the engagement and what that pivot actually cost her
• Writing the book and realizing the pivot was always the whole story
• What the veteran of pivots identity means and how to build one yourself`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#wineindustry #publishing #parenting #reinvention',
    resources: '',
    status: 'Published',
    photo: `${CDN}/3827ece1-ee90-4f55-a9cc-6bcf32bb16f6/9+26+25DanielleFrank_%40TRosePhotos-22.jpg`,
    substack: 'https://lifebetweentitles.substack.com/p/the-night-she-went-home-early',
  },
  // ── Life Between Titles S2 ────────────────────────────────────
  {
    slug: 'savan-kong-grace-helping-others',
    videoNumber: 36,
    show: 'Life Between Titles',
    season: 2,
    episode: 1,
    guest: 'Savan Kong',
    youtubeTitle: '46 Years to Understand One Simple Truth About Helping Others',
    description: `I was driving home from the gym when a word I barely use outside of church kept coming back to me: grace. Not the dinner prayer kind. The kind someone extends to you when they don't have to. When it costs them something and they do it anyway.

In this episode:
• How to recognize grace when it shows up in your career or creative life
• How to think about time as the most valuable currency successful people spend
• How to use human curiosity as a bridge to people you'd never expect to reach
• How to extend grace to others even when you're still figuring out your own path

What We Discuss:
0:00 The word that kept coming back
2:15 Nate Sexton and what he didn't have to do
5:40 Loung Ung and a cold email I almost didn't send
10:00 Why generous people remember names
12:30 Time as currency
14:45 Human curiosity as the engine of grace
17:00 What I'm sitting with right now
19:30 The message`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#soloshow #grace',
    resources: '',
    status: 'Published',
    photo: SAVAN_PHOTO,
  },
  {
    slug: 'brett-luartes-pentagon-early-retirement-mexico',
    videoNumber: 51,
    show: 'Life Between Titles',
    season: 2,
    episode: 2,
    guest: 'Brett Luartes',
    youtubeTitle: 'He Lost His Job at the Pentagon. He Moved to Mexico. No Regrets.',
    description: `Brett Luartes spent three and a half years at the Pentagon's Defense Digital Service, then watched it get folded into CDAO and slowly lose its purpose. When a miscommunication about working remotely from Mexico cost him his job, he and his wife Danielle moved permanently to Ajijic — a town outside Guadalajara at 5,000 feet elevation. Now he walks to the market every morning and is rethinking everything he was told a career was supposed to be.

In this episode:
• What early retirement in Mexico actually looks like day to day
• Why Brett and Danielle picked Ajijic over Puerto Vallarta or Thailand
• What a CETA contractor is, and why that status cost him his job
• The real story of DDS getting absorbed into CDAO
• How they used a self-directed IRA and a rental property to fund retirement
• What Brett calls "the big lie" about climbing the career ladder

What We Discuss:
(01:07) A day in early retirement
(03:09) Why Ajijic
(15:01) Forced retirement and the decline of DDS
(25:00) Becoming a CETA contractor
(52:07) The financial plan behind early retirement
(59:05) "The big lie" about the career ladder`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#retirementabroad #pentagon #earlyretirement',
    resources: 'Teal AI résumé tool → https://get.tealhq.com/zzNxQ7 | Online-Therapy → https://go.online-therapy.com/SHwO | Guided Reflection Journal → https://amzn.to/4reFQSB',
    status: 'Recorded',
    photo: '',
  },
  {
    slug: 'rory-martin-ai-hustle-50-sobriety',
    videoNumber: 53,
    show: 'Life Between Titles',
    season: 2,
    episode: 4,
    guest: 'Rory Martin',
    youtubeTitle: 'AI Could Have Ended His 30-Year Career. Instead, He Used It to Start Over at 50.',
    description: `Rory Martin has been building websites since 1996, teaching himself from used coding manuals before WordPress existed, and grew RoryMartin.com into a marketing agency in 2008. Sixteen years sober, he shares the fear-list exercise he uses to coach people through career changes, and explains why building a $40,000 website in 12 hours with AI scared him into starting Hustle 50 — a new venture for anyone over 50 worried AI is coming for their job.

In this episode:
• Why Rory taught himself to code and design from used bookstore manuals in 1996
• How paying a neighbor in pizza and beer became his first mentorship
• The porch conversation that sent him to treatment, twenty days before his son was born
• How a fear list can cut a fear's weight in half just by saying it out loud
• Why building a $40,000 website in 12 hours with AI scared him, then freed him
• What Hustle 50 is, and who it's for
• The gorilla marketing trick that landed his biggest early client

What We Discuss:
00:00 Intro
02:15 Teaching himself web design from used coding books in 1996
08:30 Finding a mentor and paying him in pizza and beer
14:00 Building RoryMartin.com in 2008
20:45 The porch intervention and getting sober
28:00 The daily practice behind 16 years of sobriety
34:15 The fear-list exercise for career transitions
40:30 Building a $40K website in 12 hours with AI
46:00 Why he pivoted to Hustle 50
51:20 Writing "50 Side Hustles Anyone Can Do"
56:45 The gorilla marketing story that landed his biggest client
1:02:00 Final thoughts on reinvention after 50`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#sobriety #aitools #sidehustle',
    resources: 'Teal AI Resume Tool → https://get.tealhq.com/zzNxQ7 | Online-Therapy → https://go.online-therapy.com/SHwO | Guided Reflection Journal → https://amzn.to/4reFQSB',
    status: 'Recorded',
    photo: '',
  },
  {
    slug: 'david-aviles-tech-sales-fired-startup',
    videoNumber: 54,
    show: 'Life Between Titles',
    season: 2,
    episode: 5,
    guest: 'David Aviles',
    youtubeTitle: 'He Got Fired Months Before His Startup Hit a $500 Million Valuation. So He Started His Own.',
    description: `David Aviles spent his career in early-stage tech sales at Optimizely, Amplitude, and Mintlify, and got fired twice — both times just before the company he'd left took off. He hiked alone into the Marin Headlands to decide what came next. Conversations with contractors working on his mother's house became the idea for the company he's building now, for the trades industry his own brother works in.

In this episode:
• How an eleven-year-old paper route turned into a lawn-mowing business that made $3,000 off one house
• Why graduating into the 2008 recession sent him into a toxic recruiting agency
• What changed when he joined Optimizely, and why they fired him a quarter after his last promotion
• How a solo hike in the Marin Headlands helped him decide to bet on himself again
• What happened when he got fired from Mintlify months before its $500 million valuation
• How conversations with contractors working on his mom's house became the idea for his new company

What We Discuss:
00:00 Intro
05:00 Growing up the youngest of five in Concord, CA
13:00 The paper route and lawn-mowing business
17:00 Feeling his way into UC Berkeley as a first-gen student
23:00 Graduating into the 2008 recession and the toxic recruiting agency
26:00 Joining Optimizely and the culture shift that changed everything
37:00 Getting fired a quarter after his last promotion
42:00 The hike in the Marin Headlands and betting on himself again
55:00 Fired before the company's $500M raise
58:00 The conversation with contractors that sparked his startup
1:08:00 The elevator pitch for his new company`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#startups #techsales #entrepreneurship',
    resources: 'Teal AI Resume Tool → https://get.tealhq.com/zzNxQ7 | Online-Therapy → https://go.online-therapy.com/SHwO',
    status: 'Recorded',
    photo: '',
  },
  {
    slug: 'cat-gaa-expat-spain-saudi-arabia-home',
    videoNumber: 55,
    show: 'Life Between Titles',
    season: 2,
    episode: 6,
    guest: 'Cat Gaa',
    youtubeTitle: 'She Moved Abroad at 22 With No Plan. Two Decades and Four Countries Later, She\'s Still Looking for Home.',
    description: `Cat Gaa left Chicago for Spain at 22 with two suitcases and a Rubbermaid bin of sorority t-shirts, planning to stay one year. Eighteen years, a Spanish husband, and two kids later, she's calling in from Riyadh, Saudi Arabia, reckoning with grief, identity, and the question of where home actually is.

In this episode:
• Why Cat moved to Spain at 22 with no real plan beyond "one year"
• How following her husband's military and diplomatic career took her from Seville to Madrid to France and now Saudi Arabia
• What it means to "grieve the childhood you imagined" for your kids
• How her mother's sudden death two years ago reshaped her sense of home
• Why she says "my choices led me away, and I never found a way back"

What We Discuss:
00:00 Calling in from Riyadh, Saudi Arabia
02:00 Moving to Spain at 22 with two suitcases and no plan
05:00 Who 22-year-old Cat was, and who she is now
10:00 Choosing to move the whole family to Saudi Arabia
20:00 How different places shaped what she values
25:00 Grieving the childhood her kids won't have
36:00 "My choices led me away and I never found my way back"
48:00 Building a career through writing across Spain
1:03:00 What she hopes her kids take from this conversation`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#expatlife #motherhood #grief',
    resources: 'Teal AI Resume → https://get.tealhq.com/zzNxQ7 | Online-Therapy → https://go.online-therapy.com/SHwO',
    status: 'Recorded',
    photo: '',
  },
  {
    slug: 'angela-kerek-tennis-lawyer-coach-winning-inside',
    videoNumber: 56,
    show: 'Life Between Titles',
    season: 2,
    episode: 7,
    guest: 'Angela Kerek',
    youtubeTitle: 'She Was Ranked 140th in the World at 24. Then She Became a Lawyer. Then She Walked Away From That Too.',
    description: `Dr. Angela Kerek was ranked 140th in the world as a professional tennis player before retiring at 24. She rebuilt her life as a lawyer in Germany without speaking the language, made partner at a top firm, then walked away to build a coaching business. Co-author of Winning Inside — on the difference between winning outside (titles, rankings, trophies) and winning inside, a compass nobody else can see.

In this episode:
• Growing up Hungarian in communist Romania, training at a tennis club connected to Davis Cup matches
• Why she retired from professional tennis at 24 and spent the next 24 years "digesting" it
• How she chose law school using an almanac and learned German by hearsay
• Why missing one grade got her rejected by 20 law firms, and how she got hired anyway
• What 100-hour weeks in leveraged finance felt like before and after the 2008 crisis
• The difference between "winning outside" and "winning inside"

What We Discuss:
00:00 Introduction
02:30 Growing up Hungarian in communist Romania
14:00 Turning pro and moving to Germany with her father
19:00 Ranked 140th in the world, retiring at 24
25:00 Choosing law school from an almanac
30:00 Rejected by 20 firms, then hired by the one that mattered
36:00 Leveraged finance before the 2008 crisis
52:00 Ten years commuting between Frankfurt and Berlin
57:00 Making partner, and the app that didn't work
1:02:00 Writing Winning Inside: outside wins vs inside wins
1:08:00 COVID, going home alone, and getting fit at 54`,
    mainTags: '#lifebetweentitles #careertransition #identity #lifetransition',
    tags: '#professionalathlete #burnout #reinvention #midlife',
    resources: 'Teal AI Resume Tool → https://get.tealhq.com/zzNxQ7 | Online-Therapy → https://go.online-therapy.com/SHwO',
    status: 'Recorded',
    photo: '',
  },
  // ── Work Unscripted S2 (cont.) ────────────────────────────────
  {
    slug: 'gladdys-uribe-immigration-attorney',
    videoNumber: 40,
    show: 'Work Unscripted',
    season: 2,
    episode: 6,
    guest: 'Gladdys Uribe',
    youtubeTitle: 'Her Parents Were Undocumented. She Became an Immigration Attorney.',
    description: `Gladdys Uribe describes herself as the proud daughter of Mexican immigrants, some of whom were undocumented. A protector. A defender. An advocate. She decided at 16 that she would become a civil rights attorney, and she has never once changed her mind. Now she's an immigration attorney navigating one of the most consequential moments in the history of her field.

In this episode:
• How growing up with undocumented family members shaped a sense of justice before she had words for it
• Why she describes herself without her title and what that decision reveals
• What it means to practice immigration law right now as policy changes hit families overnight
• What it feels like to be doing exactly the work you decided to do when you were 16
• What her path from college to courtroom actually looked like

CHAPTERS
• Growing up as the daughter of Mexican immigrants and what that planted in her
• The decision at 16 to become a civil rights attorney and why it never wavered
• How she got from Occidental to immigration law
• What practicing immigration law looks like right now in real time
• What it means to have done exactly what you said you would do`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#immigrationlaw #civilrights #firstgen',
    resources: '',
    status: 'Published',
    photo: '',
  },
  {
    slug: 'brett-cohen-viral-radio-times-square',
    videoNumber: 43,
    show: 'Work Unscripted',
    season: 2,
    episode: 9,
    guest: 'Brett Cohen',
    youtubeTitle: 'He Booked Kim Kardashian From His Mom\'s Phone at 15. Then He Went Viral.',
    description: `Brett Cohen started an internet radio show at 15 from his bedroom in Long Island on his mom's landline phone. By the time he was booking Kim Kardashian, Paris Hilton, and Jimmy Fallon, he was still in high school. Nobody knew. Then a $40 Craigslist stunt in Times Square landed him on Good Morning America and the Today Show by Friday morning.

In this episode:
• How he booked celebrities nobody would talk to from an AOL email address and his mom's phone
• The PR Newswire playbook that got him Kim Kardashian, Paris Hilton, and Jimmy Fallon
• How a $40 YouTube video made on a Wednesday went viral on Reddit and landed him on every major network by Friday
• What going viral before going viral was a thing actually did to his life and career

What We Discuss:
0:00 South Florida, baby on the way, reconnecting after decades
3:00 Growing up in Long Island and where the drive came from
4:30 Starting internet radio at 15 on BlogTalkRadio in 2005
10:00 Booking Paris Hilton, Kim Kardashian, and Jimmy Fallon from mom's landline
25:30 The $40 fake celebrity prank video shot in Times Square
30:00 Reddit, Good Morning America, and Lester Holt in 36 hours
34:00 Back in class a week later`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#viralvideo #media #radio',
    resources: '',
    status: 'Scheduled',
    photo: '',
  },
  {
    slug: 'aaron-dossey-insect-protein-scientist',
    videoNumber: 45,
    show: 'Work Unscripted',
    season: 2,
    episode: 11,
    guest: 'Aaron Dossey',
    youtubeTitle: 'The Scientist Who Bet His Career on Bugs. 14 Years Later, He Was Right.',
    description: `Aaron Dossey grew up in Oklahoma catching insects in his grandparents' garden. He got a PhD expecting to become a professor. The faculty jobs had disappeared. So he applied for a Gates Foundation grant in 2011 to research insect protein for human consumption, was told they couldn't give money to an individual, and started a company on the spot. For 14 years he was the first in the Western Hemisphere doing serious insect protein research. The world is catching up.

In this episode:
• How a high school insect collection became a 14-year research career
• Why the faculty jobs Aaron expected after his PhD simply weren't there
• How a Gates Foundation grant required him to start a company from scratch with no lab, no staff, and no food science background
• What insect protein actually is, why 80% of the world already eats it, and why the US is still catching up
• What 14 years of living on government grants teaches you about building something before the market exists

CHAPTERS
• Growing up in Oklahoma: grandparents' land, insect collections, and a love of the natural world
• Graduating with a PhD into a market with no faculty jobs
• The Gates Foundation grant and starting a company in two weeks
• What insect protein is and why he was first in the Western Hemisphere doing it
• 14 years of SBIR grants: how you sustain a life and a mission when the market doesn't exist yet`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#insectprotein #science #entrepreneurship',
    resources: '',
    status: 'Recorded',
    photo: '',
  },
  {
    slug: 'katie-savage-cio-maryland',
    videoNumber: 48,
    show: 'Work Unscripted',
    season: 2,
    episode: 14,
    guest: 'Katie Savage',
    youtubeTitle: 'She Started as CIO of Maryland 8 Months Pregnant. Here\'s What She Built.',
    description: `Katie Savage took the CIO job for the state of Maryland eight months pregnant. She came from Defense Digital Service, where she learned that the most important thing any technology organization can do is build in-house expertise rather than outsource its thinking to vendors. In Maryland, she found a team that managed contracts. She built a different kind of team.

In this episode:
• What it was like to start a major CIO role eight months pregnant
• How she shifted Maryland's tech organization from vendor management to in-house expertise
• What Maryland's infrastructure actually includes: their own fiber network, first responder radio, and the public benefits platform
• What female leadership in tech looks like when you stop trying to lead like your male predecessors

CHAPTERS
• How she got to DDS and why the CIO track was always the plan
• Starting as Maryland CIO eight months pregnant and what that was like
• What it means to lead as a woman and stop trying to lead like your male predecessors
• Building in-house talent and recruiting former USDS employees
• The public benefits platform: SNAP, WIC, and what it means to serve six million people`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#womenleadership #govtech #cio',
    resources: '',
    status: 'Recorded',
    photo: '',
  },
  {
    slug: 'david-murphy-actor-commercial-bali',
    show: 'Work Unscripted',
    season: 2,
    guest: 'David Murphy',
    youtubeTitle: 'He Took an Acting Class to Impress a Girl. Now He Books National Commercials.',
    description: `David Murphy took Theater 101 in college to impress a girl named Sophie. His professor watched him do a scene, pulled him aside, and told him he had something. Within four months he booked his first national commercial without knowing what he was supposed to do at an audition.

In this episode:
• How a girl named Sophie accidentally launched a career in comedy and commercial acting
• What it's like to get spotted before you believe you have anything worth seeing
• How the gig economy works when you commit to it completely with no fallback
• What three months in Bali every year teaches you about the life most people are too afraid to leave

CHAPTERS
• Sophie, Theater 101, and the professor who said he had something
• Getting spotted before he believed it himself
• The commercial agent meeting, the first national booking, and not knowing what an audition was
• How the gig life actually works when you go all in with no safety net
• Bali, freedom, and what the unconventional life looks like from inside it`,
    mainTags: '#lifebetweentitles #careertransition #lifetransition #identity #workunscripted',
    tags: '#acting #gigeconomy #bali',
    resources: '',
    status: 'Scheduled',
    photo: '',
  },
  {
    slug: 'loung-ung-work-unscripted',
    show: 'Work Unscripted',
    season: 2,
    guest: 'Loung Ung',
    youtubeTitle: 'Loung Ung',
    description: '',
    mainTags: '',
    tags: '',
    resources: '',
    status: 'Scheduled',
    photo: '',
  },
]

export const PUBLISHED = EPISODES.filter(e => e.status === 'Published')
export const BY_SHOW = (show: Show) => EPISODES.filter(e => e.show === show)
export const BY_SLUG = (slug: string) => EPISODES.find(e => e.slug === slug)

export function getAdjacentEpisodes(slug: string) {
  const sorted = [...EPISODES].sort((a, b) => (a.videoNumber ?? 999) - (b.videoNumber ?? 999))
  const idx = sorted.findIndex(e => e.slug === slug)
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  }
}
