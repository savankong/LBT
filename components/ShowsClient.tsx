'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Episode, Show } from '@/lib/episodes'


const SHOW_FILTERS: { label: string; value: Show | 'All' }[] = [
  { label: 'All Episodes', value: 'All' },
  { label: 'Life Between Titles', value: 'Life Between Titles' },
  { label: 'Work Unscripted', value: 'Work Unscripted' },
  { label: 'Office Hours', value: 'Office Hours' },
]

const TAXONOMY_TAGS = [
  'Career Change',
  'Layoffs & Job Loss',
  'Military & Government',
  'Entrepreneurship',
  'Unusual Careers',
  'Identity & Purpose',
  'International',
  'Mental Health',
  'AI & Technology',
  'Women in Leadership',
]

// Triadic palette built off the brand magenta (#ff1b8d) — cyan is its
// established split-complement (see chromatic-aberration text-shadow),
// amber completes the trio so all three shows pop equally against black.
const SHOW_COLOR: Record<Show, string> = {
  'Life Between Titles': '#ff1b8d',
  'Work Unscripted': '#00e0ff',
  'Office Hours': '#ffb800',
}

type SortOption = 'newest' | 'oldest'

export default function ShowsClient({ episodes }: { episodes: Episode[] }) {
  const [activeShow, setActiveShow] = useState<Show | 'All'>('All')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [activeSeason, setActiveSeason] = useState<number | 'All'>('All')
  const [sort, setSort] = useState<SortOption>('newest')

  const sorted = [...episodes].sort((a, b) => {
    const aSeason = a.season ?? 99
    const bSeason = b.season ?? 99
    const aEp = a.episode ?? 999
    const bEp = b.episode ?? 999
    if (aSeason !== bSeason) return sort === 'newest' ? bSeason - aSeason : aSeason - bSeason
    return sort === 'newest' ? bEp - aEp : aEp - bEp
  })

  const allSeasons = Array.from(new Set(episodes.map(e => e.season ?? 1))).sort((a, b) => a - b)

  // Episodes after show + season filter (before tag filter) — used to compute available tags
  const showSeasonFiltered = sorted
    .filter(e => activeShow === 'All' || e.show === activeShow)
    .filter(e => activeSeason === 'All' || (e.season ?? 1) === activeSeason)
    .filter(e => e.youtubeTitle && e.youtubeTitle !== e.guest)

  const preTagFiltered = showSeasonFiltered.filter(e => (e.status as string).toLowerCase() === 'published')
  const availableTags = new Set(preTagFiltered.flatMap(e => e.taxonomyTags ?? []))

  const visible = preTagFiltered
    .filter(e => !activeTag || (e.taxonomyTags ?? []).includes(activeTag))

  const comingSoon = showSeasonFiltered
    .filter(e => (e.status as string).toLowerCase() !== 'published')

  const seasons = Array.from(new Set(visible.map(e => e.season ?? 1))).sort((a, b) =>
    sort === 'newest' ? b - a : a - b
  )

  return (
    <section style={{ paddingBottom: 0 }}>
      <div className="container">

        {/* Platform links */}
        <div className="ep-platform-bar">
          {[
            { label: 'YouTube', icon: '▶', href: 'https://www.youtube.com/@LifeBetweenTitles' },
            { label: 'Spotify', icon: '🎧', href: 'https://open.spotify.com/show/1olZo0VDvHh9w0F2D2vEir' },
            { label: 'Apple Podcasts', icon: '🎙', href: 'https://podcasts.apple.com/us/podcast/life-between-titles/id1844748787' },
            { label: 'Substack', icon: '✉', href: 'https://lifebetweentitles.substack.com' },
          ].map(p => (
            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
              className="platform-pill"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 100,
                fontSize: '.82rem', fontWeight: 600, color: 'var(--ink)',
              }}>
              <span style={{ fontSize: '.75rem' }}>{p.icon}</span>
              {p.label}
            </a>
          ))}
        </div>

        {/* Show filter tabs — full width at top, sort pinned right */}
        <div className="ep-filter-tabs" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            {SHOW_FILTERS.map(f => (
              <button key={f.value} onClick={() => { setActiveShow(f.value); setActiveTag(null) }}
                style={{
                  padding: '14px 20px',
                  fontSize: '.76rem', fontWeight: 700,
                  letterSpacing: '.08em', textTransform: 'uppercase',
                  border: 'none', borderBottom: activeShow === f.value ? '3px solid var(--terra)' : '3px solid transparent',
                  background: 'transparent',
                  color: activeShow === f.value ? 'var(--ink)' : 'var(--faint)',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'color .18s, border-color .18s',
                  marginBottom: '-1px',
                  flexShrink: 0,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortOption)}
            style={{
              fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em',
              border: 'none', borderBottom: '2px solid transparent',
              background: 'transparent', color: 'var(--faint)',
              padding: '14px 10px', cursor: 'pointer', flexShrink: 0,
              alignSelf: 'stretch',
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* 2-col layout: left controls, right episodes */}
        <div className="shows-layout">

          {/* ── LEFT: controls sidebar ── */}
          <aside className="shows-sidebar">

            {/* Season */}
            <div className="shows-sidebar-section">
              <p className="shows-sidebar-label">Season</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button
                  onClick={() => setActiveSeason('All')}
                  className={`shows-filter-btn${activeSeason === 'All' ? ' active' : ''}`}
                >All Seasons</button>
                {allSeasons.map(s => (
                  <button key={s}
                    onClick={() => setActiveSeason(s)}
                    className={`shows-filter-btn${activeSeason === s ? ' active' : ''}`}
                  >Season {s}</button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="shows-sidebar-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <p className="shows-sidebar-label" style={{ margin: 0 }}>Topic</p>
                {activeTag && (
                  <button onClick={() => setActiveTag(null)}
                    style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}>
                    ✕ Clear
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {TAXONOMY_TAGS.filter(tag => availableTags.has(tag)).map(tag => (
                  <button key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`shows-filter-btn${activeTag === tag ? ' active' : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* ── RIGHT: episode list ── */}
          <div className="shows-main">
            {visible.length === 0 ? (
              <div style={{ padding: '64px 0', textAlign: 'center' }}>
                {activeTag ? (
                  <>
                    <p style={{ marginBottom: 20 }}>No episodes tagged &ldquo;{activeTag}&rdquo; yet.</p>
                    <button onClick={() => setActiveTag(null)}
                      style={{ background: 'none', border: '2px solid var(--ink)', borderRadius: 0, padding: '8px 18px', cursor: 'pointer', fontSize: '.8rem', fontWeight: 700, fontFamily: 'Archivo, sans-serif', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                      Clear filter
                    </button>
                  </>
                ) : (
                  <>
                    <p style={{ marginBottom: 20 }}>No episodes yet — subscribe to stay in the loop.</p>
                    <a href="https://lifebetweentitles.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Subscribe on Substack</a>
                  </>
                )}
              </div>
            ) : (
              <div>
                {seasons.map(season => {
                  const seasonEps = visible.filter(e => (e.season ?? 1) === season)
                  return (
                    <div key={season}>
                      <div style={{ margin: '32px 0 0', padding: '16px 0 14px', borderTop: '3px solid var(--ink)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'baseline', gap: 14 }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-.01em', color: 'var(--ink)' }}>Season {season}</span>
                        <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>{seasonEps.length} episodes</span>
                      </div>
                      {seasonEps.map(ep => {
                        const color = SHOW_COLOR[ep.show]
                        const epNum = ep.episode ? `EP · ${String(ep.episode).padStart(3, '0')}` : ''
                        return (
                          <article key={ep.slug} className="ep-row">
                            <div className="ep-row-thumb" style={{ background: ep.photo ? undefined : `${color}12` }}>
                              {ep.photo ? (
                                <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                              ) : (
                                <div style={{ width: '100%', height: '100%', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, color }}>
                                  {ep.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                </div>
                              )}
                              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: color }} />
                            </div>
                            <div className="ep-row-num" style={{ borderRight: '1px solid var(--border)' }}>
                              <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>
                                {epNum || ep.show.split(' ').map(w => w[0]).join('')}
                              </span>
                            </div>
                            <div className="ep-row-content">
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color }}>{ep.show}</span>
                                <span style={{ fontSize: '.68rem', color: 'var(--faint)', fontWeight: 500 }}>{ep.guest}</span>
                              </div>
                              <Link href={`/shows/${ep.slug}`} style={{ textDecoration: 'none' }}>
                                <h3 style={{ fontSize: 'clamp(.88rem,1.3vw,1.02rem)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, letterSpacing: '-.01em', fontFamily: 'inherit' }}>
                                  {ep.youtubeTitle.toUpperCase()}
                                </h3>
                              </Link>
                              {(ep.taxonomyTags ?? []).length > 0 && (
                                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 4 }}>
                                  {(ep.taxonomyTags ?? []).map(tag => (
                                    <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                      style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 0, border: `1px solid ${activeTag === tag ? 'var(--terra)' : 'var(--border)'}`, background: activeTag === tag ? 'var(--terra)' : 'transparent', color: activeTag === tag ? 'var(--ink)' : 'var(--faint)', cursor: 'pointer' }}>
                                      {tag}
                                    </button>
                                  ))}
                                </div>
                              )}
                              <Link href={`/shows/${ep.slug}`} style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', textDecoration: 'underline', textUnderlineOffset: 3, marginTop: 4, display: 'inline-block' }}>
                                Read More
                              </Link>
                            </div>
                            <div className="ep-row-actions">
                              {ep.youtubeUrl ? (
                                <a href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer" className="ep-row-action"
                                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink)', borderBottom: '1px solid var(--border)', padding: '0 16px' }}>
                                  Watch <span style={{ fontSize: '.9rem' }}>▶</span>
                                </a>
                              ) : (
                                <Link href={`/shows/${ep.slug}`} className="ep-row-action"
                                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink)', borderBottom: '1px solid var(--border)', padding: '0 16px' }}>
                                  Watch <span style={{ fontSize: '.9rem' }}>▶</span>
                                </Link>
                              )}
                              <Link href={`/shows/${ep.slug}`} className="ep-row-action"
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink)', padding: '0 16px' }}>
                                Listen <span style={{ fontSize: '.9rem' }}>🔊</span>
                              </Link>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>{/* end shows-layout */}

        {/* ── Coming Soon ── */}
        {comingSoon.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '3px dashed var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-.01em', color: 'var(--faint)' }}>Coming Soon</span>
                <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>{comingSoon.length} upcoming</span>
              </div>
              {comingSoon.map(ep => {
                const color = SHOW_COLOR[ep.show]
                const epNum = ep.episode ? `EP · ${String(ep.episode).padStart(3, '0')}` : ''
                return (
                  <article key={ep.slug} className="ep-row" style={{ opacity: 0.55, pointerEvents: 'none', userSelect: 'none' }}>
                    <div className="ep-row-thumb" style={{ background: ep.photo ? undefined : `${color}12`, position: 'relative' }}>
                      {ep.photo ? (
                        <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(60%)' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, color }}>
                          {ep.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '.55rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 8px', borderRadius: 4 }}>Coming Soon</span>
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: color }} />
                    </div>
                    <div className="ep-row-num" style={{ borderRight: '1px solid var(--border)' }}>
                      <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>
                        {epNum || ep.show.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                    <div className="ep-row-content">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color }}>{ep.show}</span>
                        <span style={{ fontSize: '.68rem', color: 'var(--faint)', fontWeight: 500 }}>{ep.guest}</span>
                      </div>
                      <h3 style={{ fontSize: 'clamp(.88rem,1.3vw,1.02rem)', fontWeight: 700, color: 'var(--faint)', lineHeight: 1.35, letterSpacing: '-.01em', fontFamily: 'inherit', margin: '4px 0 0' }}>
                        {ep.youtubeTitle.toUpperCase()}
                      </h3>
                    </div>
                    <div className="ep-row-actions" style={{ justifyContent: 'center' }}>
                      <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', padding: '0 16px' }}>
                        Not Yet Live
                      </span>
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
