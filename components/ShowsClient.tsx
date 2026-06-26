'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Episode, Show } from '@/lib/episodes'

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

export default function ShowsClient({ episodes }: { episodes: Episode[] }) {
  const [active, setActive] = useState<Show | 'All'>('All')

  const visible = episodes
    .filter(e => active === 'All' || e.show === active)
    .filter(e => e.youtubeTitle && e.youtubeTitle !== e.guest)

  return (
    <section style={{ paddingBottom: 0 }}>
      <div className="container">

        {/* Platform links */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', padding: '40px 0 36px' }}>
          {[
            { label: 'YouTube', icon: '▶', href: 'https://www.youtube.com/@LifeBetweenTitles' },
            { label: 'Spotify', icon: '◎', href: 'https://open.spotify.com/show/lifebetweentitles' },
            { label: 'Apple Podcasts', icon: '♫', href: 'https://podcasts.apple.com/us/podcast/life-between-titles' },
            { label: 'Substack', icon: '✉', href: 'https://lifebetweentitles.substack.com' },
          ].map(p => (
            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
              className="platform-pill"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 100,
                fontSize: '.84rem', fontWeight: 600, color: 'var(--ink)',
              }}>
              <span style={{ fontSize: '.7rem' }}>{p.icon}</span>
              {p.label}
            </a>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 0, overflowX: 'auto' }}>
          {FILTERS.map(f => (
            <button key={f.value} onClick={() => setActive(f.value)}
              style={{
                padding: '14px 22px',
                fontSize: '.78rem', fontWeight: 700,
                letterSpacing: '.08em', textTransform: 'uppercase',
                border: 'none', borderBottom: active === f.value ? '2px solid var(--ink)' : '2px solid transparent',
                background: 'transparent',
                color: active === f.value ? 'var(--ink)' : 'var(--faint)',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'color .18s, border-color .18s',
                marginBottom: '-1px',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Episode list */}
        {visible.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center' }}>
            <p style={{ marginBottom: 20 }}>No episodes yet — subscribe to stay in the loop.</p>
            <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe on Substack</a>
          </div>
        ) : (
          <div>
            {visible.map((ep) => {
              const color = SHOW_COLOR[ep.show]
              const epNum = ep.episode ? `EP · ${String(ep.episode).padStart(3, '0')}` : ''
              return (
                <article key={ep.slug} style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 72px 1fr auto',
                  gap: 0,
                  alignItems: 'stretch',
                  borderBottom: '1px solid var(--border)',
                  minHeight: 120,
                }}>
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', overflow: 'hidden', background: ep.photo ? undefined : `${color}12` }}>
                    {ep.photo ? (
                      <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%', minHeight: 120,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', fontWeight: 800, color,
                      }}>
                        {ep.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: color }} />
                  </div>

                  {/* Episode number — vertical */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: '1px solid var(--border)', padding: '0 8px',
                  }}>
                    <span style={{
                      writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
                      fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
                      color: 'var(--faint)',
                    }}>
                      {epNum || ep.show.split(' ').map(w => w[0]).join('')}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color }}>{ep.show}</span>
                      <span style={{ fontSize: '.7rem', color: 'var(--faint)', fontWeight: 500 }}>{ep.guest}</span>
                    </div>
                    <Link href={`/shows/${ep.slug}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{
                        fontSize: 'clamp(.9rem,1.4vw,1.05rem)', fontWeight: 700, color: 'var(--ink)',
                        lineHeight: 1.35, letterSpacing: '-.01em', fontFamily: 'inherit',
                      }}>
                        {ep.youtubeTitle.toUpperCase()}
                      </h3>
                    </Link>
                    <Link href={`/shows/${ep.slug}`}
                      style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                      Read More
                    </Link>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderLeft: '1px solid var(--border)', minWidth: 110 }}>
                    {ep.youtubeUrl ? (
                      <a href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer"
                        className="ep-row-action"
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
                          color: 'var(--ink)', borderBottom: '1px solid var(--border)', padding: '0 20px',
                        }}>
                        Watch <span style={{ fontSize: '1rem' }}>▶</span>
                      </a>
                    ) : (
                      <Link href={`/shows/${ep.slug}`} className="ep-row-action"
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
                          color: 'var(--ink)', borderBottom: '1px solid var(--border)', padding: '0 20px',
                        }}>
                        Watch <span style={{ fontSize: '1rem' }}>▶</span>
                      </Link>
                    )}
                    <Link href={`/shows/${ep.slug}`} className="ep-row-action"
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
                        color: 'var(--ink)', padding: '0 20px',
                      }}>
                      Listen <span style={{ fontSize: '1rem' }}>🔊</span>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
