import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { EPISODES, BY_SLUG } from '@/lib/episodes'

export async function generateStaticParams() {
  return EPISODES.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const ep = BY_SLUG(slug)
  if (!ep) return {}
  const title = ep.guest !== 'Savan Kong' ? `${ep.guest} | ${ep.show}` : ep.youtubeTitle
  const description = ep.description || `${ep.guest} on Life Between Titles — ${ep.show}, Season ${ep.season}${ep.episode ? `, Episode ${ep.episode}` : ''}.`
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: ep.youtubeTitle,
    description: ep.description || undefined,
    partOfSeries: { '@type': 'PodcastSeries', name: ep.show },
    episodeNumber: ep.episode,
    actor: ep.guest !== 'Savan Kong' ? {
      '@type': 'Person',
      name: ep.guest,
    } : undefined,
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
                <p style={{fontSize:'1.05rem',fontWeight:600,color:'var(--muted)',marginBottom:20}}>with {ep.guest}</p>
              )}
              {ep.description && (
                <p style={{fontSize:'1.02rem',lineHeight:1.78,color:'var(--muted)',marginBottom:32}}>
                  {ep.description}
                </p>
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

      {/* Tags + Resources */}
      {(allTags.length > 0 || ep.resources) && (
        <section className="section" style={{paddingTop:56,paddingBottom:56}}>
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
                  {ep.resources.split('|').map((r, i) => (
                    <p key={i} style={{fontSize:'.88rem',lineHeight:1.7,marginBottom: i < ep.resources.split('|').length - 1 ? 8 : 0}}>
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
