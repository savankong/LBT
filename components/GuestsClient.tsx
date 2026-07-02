'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Episode, Show } from '@/lib/episodes'

// Triadic palette built off the brand magenta — matches Shows page
const SHOW_COLOR: Record<Show, string> = {
  'Life Between Titles': '#ff1b8d',
  'Work Unscripted': '#00e0ff',
  'Office Hours': '#ffb800',
}

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

function episodeLabel(show: Show, season: number | undefined, episode: number | undefined) {
  if (!season && !episode) return show
  const abbr = show === 'Life Between Titles' ? 'LBT' : show === 'Work Unscripted' ? 'WU' : 'OH'
  return `${abbr} S${season ?? '?'}E${episode ?? '?'}`
}

export default function GuestsClient({ guests }: { guests: Episode[][] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const eps of guests) {
      const tags = new Set(eps.flatMap(e => e.taxonomyTags ?? []))
      for (const t of tags) counts.set(t, (counts.get(t) ?? 0) + 1)
    }
    return counts
  }, [guests])

  const showCounts = useMemo(() => {
    const counts: Record<Show, number> = { 'Life Between Titles': 0, 'Work Unscripted': 0, 'Office Hours': 0 }
    for (const eps of guests) counts[eps[0].show]++
    return counts
  }, [guests])

  const visible = activeTag
    ? guests.filter(eps => eps.some(e => (e.taxonomyTags ?? []).includes(activeTag)))
    : guests

  const availableTags = TAXONOMY_TAGS.filter(t => tagCounts.has(t))

  return (
    <>
      {/* ── Stats + filter ── */}
      <section style={{ padding: '0 0 8px', background: 'var(--bg)' }}>
        <div className="container">
{/* Mobile: native select */}
          <select
            className="ep-filter-select"
            value={activeTag ?? ''}
            onChange={e => setActiveTag(e.target.value || null)}
          >
            <option value="">All Guests ({guests.length})</option>
            {availableTags.map(t => (
              <option key={t} value={t}>{t} ({tagCounts.get(t)})</option>
            ))}
          </select>

          {/* Desktop: tab row — wraps to multiple lines */}
          <div className="ep-filter-tabs" style={{ justifyContent: 'flex-start' }}>
            {[{ label: 'All Guests', tag: null }, ...availableTags.map(t => ({ label: t, tag: t }))].map(({ label, tag }) => (
              <button
                key={label}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  padding: '12px 16px',
                  fontSize: '.76rem', fontWeight: 700,
                  letterSpacing: '.08em', textTransform: 'uppercase',
                  border: 'none',
                  borderBottom: activeTag === tag ? '3px solid var(--terra)' : '3px solid transparent',
                  background: 'transparent',
                  color: activeTag === tag ? 'var(--ink)' : 'var(--faint)',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'color .18s, border-color .18s',
                  flexShrink: 0,
                }}
              >
                {label}{tag && <span style={{ opacity: .65, fontWeight: 600, marginLeft: 4 }}>({tagCounts.get(tag)})</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="guests-grid">
            {visible.map(eps => {
              const ep = eps[0]
              const color = SHOW_COLOR[ep.show]
              return (
                <Link href={`/shows/${ep.slug}`} className="guest-card" key={ep.guest} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Photo */}
                  <div className="guest-card-img" style={{ position: 'relative' }}>
                    {ep.photo ? (
                      <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color }}>
                        {ep.guest.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                    )}
                    {/* color bar at bottom of photo */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: color }} />
                  </div>

                  {/* Body */}
                  <div className="guest-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Show tag */}
                    <div className="guest-show-tag" style={{ color }}>
                      {eps.map(e => episodeLabel(e.show, e.season, e.episode)).join(' · ')}
                    </div>

                    {/* Name */}
                    <h4 style={{ fontFamily: 'var(--font-display, inherit)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.3 }}>
                      {ep.guest}
                    </h4>

                    {/* Episode title(s) */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {eps.map(e => (
                        <p key={e.slug} style={{ fontSize: '.78rem', color: 'var(--faint)', lineHeight: 1.45, margin: 0 }}>
                          {e.youtubeTitle || e.description?.slice(0, 80)}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          {visible.length === 0 && (
            <p style={{ textAlign: 'center', padding: '48px 0', color: 'var(--faint)' }}>No guests tagged &ldquo;{activeTag}&rdquo; yet.</p>
          )}
        </div>
      </section>
    </>
  )
}
