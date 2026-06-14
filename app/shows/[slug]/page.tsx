import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { EPISODES, BY_SLUG, getAdjacentEpisodes } from '@/lib/episodes'
import { parseDescription } from '@/lib/parseEpisode'

export async function generateStaticParams() {
  return EPISODES.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const ep = BY_SLUG(slug)
  if (!ep) return {}
  const title = ep.guest !== 'Savan Kong' ? `${ep.guest} | ${ep.show}` : ep.youtubeTitle
  const description = ep.description
    ? ep.description.replace(/<br\s*\/?>/gi, ' ').slice(0, 200).trim() + '…'
    : `${ep.guest} on Life Between Titles — ${ep.show}, Season ${ep.season}${ep.episode ? `, Episode ${ep.episode}` : ''}.`
  return {
    title,
    description,
    alternates: { canonical: `https://www.lifebetweentitles.com/shows/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      images: ep.photo ? [{ url: ep.photo, alt: ep.guest }] : [],
    },
    twitter: { card: ep.photo ? 'summary_large_image' : 'summary', title, description },
  }
}

const SHOW_COLOR: Record<string, string> = {
  'Life Between Titles': '#C26A4A',
  'Work Unscripted': '#4a7ec2',
  'Office Hours': '#7c4ac2',
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ep = BY_SLUG(slug)
  if (!ep) notFound()

  const color = SHOW_COLOR[ep.show] ?? 'var(--terra)'
  const allTags = [ep.mainTags, ep.tags].filter(Boolean).join(' ').split(' ').filter(t => t.startsWith('#'))
  const { intro, bullets, chapters } = parseDescription(ep.description)
  const { prev, next } = getAdjacentEpisodes(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: ep.youtubeTitle,
    description: intro || undefined,
    partOfSeries: { '@type': 'PodcastSeries', name: ep.show },
    episodeNumber: ep.episode,
    actor: ep.guest !== 'Savan Kong' ? { '@type': 'Person', name: ep.guest } : undefined,
    image: ep.photo || undefined,
    url: `https://www.lifebetweentitles.com/shows/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <header style={{background:'var(--bg2)',paddingTop:'calc(var(--nav-h) + 56px)',paddingBottom:64}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:48,alignItems:'flex-start'}}>
            <div style={{maxWidth:680}}>
              {/* Breadcrumb */}
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24,fontSize:'.8rem',color:'var(--faint)'}}>
                <Link href="/shows" style={{color:'var(--faint)'}}>Shows</Link>
                <span>›</span>
                <span style={{color}}>{ep.show}</span>
              </div>

              {/* Show + episode badge */}
              <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:20}}>
                <span style={{display:'inline-block',padding:'5px 14px',borderRadius:20,fontSize:'.75rem',fontWeight:700,
                  letterSpacing:'.06em',textTransform:'uppercase',background:`${color}18`,color}}>
                  {ep.show}
                </span>
                {ep.season && ep.episode && (
                  <span style={{display:'inline-block',padding:'5px 14px',borderRadius:20,fontSize:'.75rem',
                    fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',
                    background:'var(--border)',color:'var(--muted)'}}>
                    S{ep.season < 10 ? '0' : ''}{ep.season} · E{ep.episode < 10 ? '0' : ''}{ep.episode}
                  </span>
                )}
                <span style={{display:'inline-block',padding:'5px 14px',borderRadius:20,fontSize:'.75rem',
                  fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',
                  background: ep.status === 'Published' ? 'rgba(194,106,74,.1)' : 'rgba(0,0,0,.05)',
                  color: ep.status === 'Published' ? 'var(--terra)' : 'var(--faint)'}}>
                  {ep.status}
                </span>
              </div>

              <h1 style={{fontSize:'clamp(1.8rem,4vw,3.4rem)',lineHeight:1.1,marginBottom:20,letterSpacing:'-.03em'}}>
                {ep.youtubeTitle}
              </h1>
              {ep.guest !== 'Savan Kong' && (
                <p style={{fontSize:'1.05rem',fontWeight:600,color:'var(--muted)',marginBottom:28}}>with {ep.guest}</p>
              )}

              {/* CTA row */}
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                {ep.youtubeUrl ? (
                  <a href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                    Watch on YouTube
                  </a>
                ) : (
                  <a href="https://www.youtube.com/@LifeBetweenTitles" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                    Watch on YouTube
                  </a>
                )}
                <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-glass">
                  Listen on Substack
                </a>
              </div>
            </div>

            {/* Guest photo */}
            {ep.photo && (
              <div style={{width:260,flexShrink:0}}>
                <div style={{borderRadius:20,overflow:'hidden',aspectRatio:'1',
                  boxShadow:'0 24px 48px -12px rgba(0,0,0,.2)',
                  border:'3px solid',borderColor:color}}>
                  <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer"
                    style={{width:'100%',height:'100%',objectFit:'cover'}} />
                </div>
                <p style={{textAlign:'center',marginTop:14,fontWeight:700,fontSize:'.9rem',color:'var(--ink)'}}>{ep.guest}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Intro + In This Episode + Chapters */}
      {(intro || bullets.length > 0 || chapters.length > 0) && (
        <section className="section" style={{paddingTop:64,paddingBottom:0}}>
          <div className="container" style={{maxWidth:800}}>

            {/* Intro paragraph */}
            {intro && (
              <p style={{fontSize:'1.08rem',lineHeight:1.82,color:'var(--muted)',marginBottom:48}}>
                {intro}
              </p>
            )}

            {/* In this episode */}
            {bullets.length > 0 && (
              <div style={{marginBottom:48}}>
                <span className="label" style={{marginBottom:16,display:'block'}}>In this episode</span>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                  {bullets.map((b, i) => (
                    <li key={i} style={{display:'flex',gap:12,alignItems:'flex-start',
                      fontSize:'.96rem',lineHeight:1.6,color:'var(--muted)'}}>
                      <span style={{color,fontWeight:700,flexShrink:0,marginTop:2}}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Chapters */}
            {chapters.length > 0 && (
              <div style={{marginBottom:48}}>
                <span className="label" style={{marginBottom:16,display:'block'}}>Chapters</span>
                <div className="glass" style={{borderRadius:16,overflow:'hidden'}}>
                  {chapters.map((ch, i) => (
                    <div key={i} style={{
                      display:'flex',alignItems:'center',gap:16,
                      padding:'14px 24px',
                      borderBottom: i < chapters.length - 1 ? '1px solid var(--border)' : 'none',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.02)',
                    }}>
                      {ch.time && (
                        <span style={{
                          fontVariantNumeric:'tabular-nums',
                          fontSize:'.78rem',fontWeight:700,
                          color,flexShrink:0,
                          background:`${color}14`,
                          padding:'3px 10px',borderRadius:8,
                          letterSpacing:'.02em',
                        }}>{ch.time}</span>
                      )}
                      <span style={{fontSize:'.9rem',color:'var(--ink)',lineHeight:1.5}}>{ch.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Substack feature story */}
      {ep.substack && (
        <section style={{paddingTop:0,paddingBottom:0}} className="section">
          <div className="container" style={{maxWidth:800}}>
            <div className="glass-gold" style={{borderRadius:20,padding:'36px 40px',
              display:'flex',flexDirection:'column',gap:16,
              borderLeft:`4px solid ${color}`}}>
              <span className="label">Feature Story</span>
              <p style={{fontSize:'1rem',lineHeight:1.72,color:'var(--muted)',margin:0}}>
                We turned this conversation into a long-form essay — with more context, more depth,
                and the moments that didn&apos;t make the edit.
              </p>
              <a href={ep.substack} target="_blank" rel="noopener noreferrer"
                className="btn btn-gold" style={{alignSelf:'flex-start'}}>
                Read on Substack →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Tags + Resources */}
      {(allTags.length > 0 || ep.resources) && (
        <section className="section" style={{paddingBottom:56}}>
          <div className="container" style={{maxWidth:800}}>
            {allTags.length > 0 && (
              <div style={{marginBottom:40}}>
                <span className="label" style={{marginBottom:14,display:'block'}}>Topics</span>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {allTags.map(t => (
                    <span key={t} style={{padding:'6px 14px',borderRadius:20,fontSize:'.78rem',fontWeight:600,
                      background:'var(--terra-dim)',color:'var(--terra)'}}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {ep.resources && (
              <div>
                <span className="label" style={{marginBottom:14,display:'block'}}>Resources & Support the Show</span>
                <div className="glass" style={{borderRadius:16,padding:'24px 28px'}}>
                  {ep.resources.split('|').map((r, i, arr) => (
                    <p key={i} style={{fontSize:'.88rem',lineHeight:1.7,marginBottom: i < arr.length - 1 ? 8 : 0}}>
                      {r.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="divider" />

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <section className="section" style={{paddingTop:56,paddingBottom:56}}>
          <div className="container" style={{maxWidth:800}}>
            <span className="label" style={{marginBottom:24,display:'block'}}>More Episodes</span>
            <div style={{display:'grid',gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr',gap:16}}>
              {prev && (
                <Link href={`/shows/${prev.slug}`} style={{textDecoration:'none'}}>
                  <div className="glass" style={{borderRadius:16,padding:'20px 24px',
                    borderLeft:`3px solid ${SHOW_COLOR[prev.show] ?? 'var(--terra)'}`,
                    transition:'box-shadow .18s',height:'100%'}}>
                    <p style={{fontSize:'.7rem',fontWeight:700,letterSpacing:'.06em',
                      textTransform:'uppercase',color:'var(--faint)',marginBottom:6}}>← Previous</p>
                    <p style={{fontSize:'.88rem',fontWeight:600,color:'var(--ink)',lineHeight:1.4,marginBottom:4}}>
                      {prev.youtubeTitle}
                    </p>
                    <p style={{fontSize:'.78rem',color:'var(--muted)'}}>{prev.guest}</p>
                  </div>
                </Link>
              )}
              {next && (
                <Link href={`/shows/${next.slug}`} style={{textDecoration:'none'}}>
                  <div className="glass" style={{borderRadius:16,padding:'20px 24px',
                    borderRight:`3px solid ${SHOW_COLOR[next.show] ?? 'var(--terra)'}`,
                    textAlign:'right',transition:'box-shadow .18s',height:'100%'}}>
                    <p style={{fontSize:'.7rem',fontWeight:700,letterSpacing:'.06em',
                      textTransform:'uppercase',color:'var(--faint)',marginBottom:6}}>Next →</p>
                    <p style={{fontSize:'.88rem',fontWeight:600,color:'var(--ink)',lineHeight:1.4,marginBottom:4}}>
                      {next.youtubeTitle}
                    </p>
                    <p style={{fontSize:'.78rem',color:'var(--muted)'}}>{next.guest}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <span className="label">More Conversations</span>
          <h2>Keep listening</h2>
          <p>Every episode is a different story about the space between one chapter and the next.</p>
          <div className="cta-actions">
            <Link href="/shows" className="btn btn-gold">Browse All Episodes</Link>
            <Link href="/guest-submission" className="btn btn-glass">Submit a Guest</Link>
          </div>
        </div>
      </section>
    </>
  )
}
