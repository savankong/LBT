'use client'
import { useState } from 'react'
import Link from 'next/link'
import { EPISODES, type Show } from '@/lib/episodes'

const FILTERS: { label: string; value: Show | 'All' }[] = [
  { label: 'All Episodes', value: 'All' },
  { label: 'Life Between Titles', value: 'Life Between Titles' },
  { label: 'Work Unscripted', value: 'Work Unscripted' },
  { label: 'Office Hours', value: 'Office Hours' },
]

const SHOW_COLOR: Record<Show, string> = {
  'Life Between Titles': '#C26A4A',
  'Work Unscripted': '#4a7ec2',
  'Office Hours': '#7c4ac2',
}

export default function ShowsClient() {
  const [active, setActive] = useState<Show | 'All'>('All')

  const visible = EPISODES
    .filter(e => active === 'All' || e.show === active)
    .filter(e => e.youtubeTitle && e.youtubeTitle !== e.guest) // skip placeholder-only entries
    .sort((a, b) => (b.videoNumber ?? 0) - (a.videoNumber ?? 0))

  return (
    <section className="section">
      <div className="container">

        {/* Filter nav */}
        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:48}}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              style={{
                padding:'10px 22px',
                borderRadius:100,
                fontSize:'.84rem',
                fontWeight:600,
                letterSpacing:'-.01em',
                border: active === f.value ? 'none' : '1.5px solid var(--border-med)',
                background: active === f.value ? 'var(--ink)' : 'transparent',
                color: active === f.value ? '#fff' : 'var(--muted)',
                transition:'all .18s',
                cursor:'pointer',
              }}
            >
              {f.label}
              {f.value !== 'All' && (
                <span style={{
                  marginLeft:8,
                  fontSize:'.75rem',
                  background: active === f.value ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.06)',
                  borderRadius:20,
                  padding:'1px 7px',
                  color: active === f.value ? '#fff' : 'var(--faint)',
                }}>
                  {EPISODES.filter(e => e.show === f.value && e.youtubeTitle !== e.guest).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Count */}
        <p style={{fontSize:'.82rem',color:'var(--faint)',marginBottom:28,fontWeight:500}}>
          {visible.length} episode{visible.length !== 1 ? 's' : ''}
          {active !== 'All' ? ` · ${active}` : ''}
        </p>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="glass" style={{borderRadius:16,padding:48,textAlign:'center',maxWidth:480}}>
            <p style={{marginBottom:20}}>No episodes yet — subscribe to stay in the loop.</p>
            <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe on Substack</a>
          </div>
        ) : (
          <div className="episodes-grid">
            {visible.map((ep) => {
              const color = SHOW_COLOR[ep.show]
              return (
                <Link href={`/shows/${ep.slug}`} key={ep.slug} style={{textDecoration:'none',display:'flex',flexDirection:'column'}}>
                  <article className="episode-card glass" style={{height:'100%',display:'flex',flexDirection:'column'}}>
                    {/* Photo or colour block */}
                    <div className="episode-card-img" style={{position:'relative',background:ep.photo ? undefined : `${color}18`}}>
                      {ep.photo ? (
                        <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" />
                      ) : (
                        <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',
                          justifyContent:'center',fontSize:'2rem',fontWeight:800,
                          color,fontFamily:'var(--font-display,inherit)',letterSpacing:'-.04em',
                          padding:16,textAlign:'center',lineHeight:1.1}}>
                          {ep.guest.split(' ').map(w => w[0]).join('').slice(0,2)}
                        </div>
                      )}
                      {/* Show colour bar overlay */}
                      <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:color}} />
                    </div>

                    <div className="episode-card-body" style={{padding:'16px 18px 20px',flex:1,display:'flex',flexDirection:'column'}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                        <span className="ep-show-tag" style={{color}}>{ep.show}</span>
                        {ep.season && ep.episode && (
                          <span style={{fontSize:'.7rem',color:'var(--faint)',fontWeight:600,letterSpacing:'.04em'}}>
                            S{ep.season < 10 ? '0' : ''}{ep.season}E{String(ep.episode).padStart(2,'0')}
                          </span>
                        )}
                      </div>
                      <h4 style={{marginBottom:'auto',lineHeight:1.4,fontSize:'.88rem',paddingBottom:12}}>
                        {ep.youtubeTitle}
                      </h4>
                      <div style={{paddingTop:12,borderTop:'1px solid var(--border)',
                        display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <span style={{fontSize:'.78rem',color:'var(--muted)',fontWeight:600}}>{ep.guest}</span>
                        <span style={{
                          fontSize:'.68rem',fontWeight:700,letterSpacing:'.04em',textTransform:'uppercase',
                          padding:'3px 9px',borderRadius:20,
                          background: ep.status === 'Published' ? 'rgba(194,106,74,.1)' : 'rgba(0,0,0,.05)',
                          color: ep.status === 'Published' ? 'var(--terra)' : 'var(--faint)',
                        }}>{ep.status}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
