'use client'
import { useState } from 'react'
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
    .filter(e => e.description) // only episodes with content
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
                  background: active === f.value ? 'rgba(255,255,255,.18)' : 'var(--border)',
                  borderRadius:20,
                  padding:'1px 7px',
                  color: active === f.value ? '#fff' : 'var(--faint)',
                }}>
                  {EPISODES.filter(e => e.show === f.value && e.description).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Count line */}
        <p style={{fontSize:'.82rem',color:'var(--faint)',marginBottom:28,fontWeight:500}}>
          {visible.length} episode{visible.length !== 1 ? 's' : ''}
          {active !== 'All' ? ` · ${active}` : ''}
        </p>

        {/* Episode grid */}
        {visible.length === 0 ? (
          <div className="glass" style={{borderRadius:16,padding:48,textAlign:'center',maxWidth:480}}>
            <p style={{marginBottom:20}}>No episodes yet — subscribe to stay in the loop.</p>
            <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe on Substack</a>
          </div>
        ) : (
          <div className="episodes-grid">
            {visible.map((ep, i) => (
              <div className="episode-card glass" key={i}>
                {/* Colour-coded top bar */}
                <div style={{height:3,background:SHOW_COLOR[ep.show],borderRadius:'var(--radius) var(--radius) 0 0'}} />
                <div className="episode-card-body" style={{padding:'20px 20px 22px'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                    <span className="ep-show-tag" style={{color:SHOW_COLOR[ep.show]}}>{ep.show}</span>
                    {ep.season && ep.episode && (
                      <span style={{fontSize:'.72rem',color:'var(--faint)',fontWeight:600,letterSpacing:'.04em'}}>
                        S{ep.season}E{String(ep.episode).padStart(2,'0')}
                      </span>
                    )}
                  </div>
                  <h4 style={{marginBottom:12,lineHeight:1.4,fontSize:'.9rem'}}>{ep.youtubeTitle}</h4>
                  <p style={{fontSize:'.8rem',lineHeight:1.6,color:'var(--faint)',
                    display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    {ep.description}
                  </p>
                  <div style={{marginTop:16,paddingTop:14,borderTop:'1px solid var(--border)',
                    display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontSize:'.78rem',color:'var(--muted)',fontWeight:600}}>{ep.guest}</span>
                    <span style={{
                      fontSize:'.68rem',
                      fontWeight:700,
                      letterSpacing:'.04em',
                      textTransform:'uppercase',
                      padding:'3px 9px',
                      borderRadius:20,
                      background: ep.status === 'Published' ? 'rgba(194,106,74,.1)' : 'rgba(0,0,0,.05)',
                      color: ep.status === 'Published' ? 'var(--terra)' : 'var(--faint)',
                    }}>{ep.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
