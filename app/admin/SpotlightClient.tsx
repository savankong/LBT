'use client'
import { useState, useEffect, useRef } from 'react'
import type { Episode, Show } from '@/lib/episodes'
import { ADMIN_PASSWORD, SAVED_PW_KEY, LoginScreen, AdminShell } from './AdminShell'

const SHOW_COLOR: Record<Show, string> = {
  'Life Between Titles': '#C26A4A', 'Work Unscripted': '#4a7ec2', 'Office Hours': '#7c4ac2',
}

interface SpotlightEp {
  slug: string; guest: string; photo: string; show: Show; youtubeTitle: string; spotlightOrder: number | null
}

export default function SpotlightClient() {
  const [authed, setAuthed] = useState(() => typeof window !== 'undefined' && localStorage.getItem(SAVED_PW_KEY) === ADMIN_PASSWORD)
  const [featured, setFeatured] = useState<SpotlightEp[]>([])
  const [allPublished, setAllPublished] = useState<Episode[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)
  const dragIdx = useRef<number | null>(null)

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const [fRes, aRes] = await Promise.all([fetch('/api/spotlight'), fetch('/api/episodes')])
      if (!fRes.ok || !aRes.ok) throw new Error('fetch failed')
      setFeatured(await fRes.json())
      const all: Episode[] = await aRes.json()
      setAllPublished(all.filter(e => e.status === 'Published'))
    } catch { showToast('Could not load data', 'err') } finally { setLoading(false) }
  }

  useEffect(() => { if (authed) fetchData() }, [authed])

  const saveOrder = async (items: SpotlightEp[]) => {
    setSaving(true)
    try {
      const res = await fetch('/api/spotlight', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slugs: items.map(e => e.slug) }),
      })
      if (!res.ok) throw new Error('save failed')
      showToast('Order saved')
    } catch { showToast('Save failed', 'err') } finally { setSaving(false) }
  }

  const toggleFeatured = async (ep: Episode) => {
    const isFeatured = featured.some(f => f.slug === ep.slug)
    try {
      await fetch(`/api/episodes/${ep.slug}/feature`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !isFeatured }),
      })
      await fetchData()
      showToast(isFeatured ? 'Removed from spotlight' : 'Added to spotlight')
    } catch { showToast('Could not update', 'err') }
  }

  // Drag-to-reorder handlers
  const onDragStart = (i: number) => { dragIdx.current = i }
  const onDrop = (toIdx: number) => {
    const from = dragIdx.current
    if (from === null || from === toIdx) return
    const next = [...featured]
    const [moved] = next.splice(from, 1)
    next.splice(toIdx, 0, moved)
    setFeatured(next)
    saveOrder(next)
    dragIdx.current = null
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <AdminShell toast={toast}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', letterSpacing: '-.03em', marginBottom: 4 }}>Homepage Spotlight</h1>
          <p style={{ color: 'var(--faint)', fontSize: '.84rem', margin: 0 }}>
            The first episode is the <strong>main highlight</strong> on the homepage. Drag to reorder.
          </p>
        </div>
        {saving && <span style={{ fontSize: '.82rem', color: 'var(--terra)', fontWeight: 700 }}>Saving…</span>}
      </div>

      {loading ? (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--faint)' }}>Loading…</div>
      ) : (
        <>
          {/* Ordered spotlight list */}
          <div style={{ marginBottom: 48 }}>
            {featured.length === 0 ? (
              <div className="glass" style={{ borderRadius: 12, padding: '40px 24px', textAlign: 'center', color: 'var(--faint)', fontSize: '.9rem' }}>
                No episodes in the spotlight. Add one from the list below.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {featured.map((ep, i) => (
                  <div
                    key={ep.slug}
                    draggable
                    onDragStart={() => onDragStart(i)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => onDrop(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 18px', borderRadius: 12, cursor: 'grab',
                      background: 'var(--bg)', border: i === 0 ? '2px solid var(--terra)' : '1.5px solid var(--border-med)',
                      transition: 'border-color .15s',
                    }}>
                    {/* Drag handle */}
                    <span style={{ color: 'var(--faint)', fontSize: '1rem', flexShrink: 0, cursor: 'grab', userSelect: 'none' }}>⠿</span>

                    {/* Position badge */}
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: i === 0 ? 'var(--terra)' : 'var(--bg2)',
                      border: i === 0 ? 'none' : '1.5px solid var(--border-med)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.72rem', fontWeight: 800,
                      color: i === 0 ? '#fff' : 'var(--muted)',
                    }}>
                      {i + 1}
                    </div>

                    {/* Photo */}
                    {ep.photo
                      ? <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%', flexShrink: 0 }} />
                      : <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${SHOW_COLOR[ep.show] ?? '#888'}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', fontWeight: 800, color: SHOW_COLOR[ep.show] ?? '#888', flexShrink: 0 }}>
                          {ep.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                    }

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '.9rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.guest}</p>
                      <p style={{ margin: 0, fontSize: '.76rem', color: 'var(--faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.youtubeTitle}</p>
                    </div>

                    {/* Show tag */}
                    <span style={{ fontSize: '.7rem', fontWeight: 700, color: SHOW_COLOR[ep.show] ?? '#888', flexShrink: 0 }}>
                      {ep.show.replace('Life Between Titles', 'LBT').replace('Work Unscripted', 'WU').replace('Office Hours', 'OH')}
                    </span>

                    {/* Label for first */}
                    {i === 0 && (
                      <span style={{ fontSize: '.68rem', fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--terra)', flexShrink: 0 }}>Main highlight</span>
                    )}

                    {/* Remove */}
                    <button
                      onClick={() => toggleFeatured({ ...ep, status: 'Published', show: ep.show, season: 1, episode: undefined, videoNumber: undefined, slug: ep.slug, youtubeTitle: ep.youtubeTitle, description: '', mainTags: '', tags: '', resources: '', photo: ep.photo, youtubeUrl: '', spotifyUrl: '', appleUrl: '', amazonUrl: '', substack: '', guestBio: '', keyInsights: [], faq: [] })}
                      style={{ border: 'none', background: 'transparent', color: 'var(--faint)', cursor: 'pointer', fontSize: '.85rem', padding: '4px 8px', flexShrink: 0, borderRadius: 6 }}
                      title="Remove from spotlight">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All published episodes to pick from */}
          <div>
            <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>
              All Published Episodes — click ☆ to add to spotlight
            </p>
            <div className="glass" style={{ borderRadius: 12, overflow: 'hidden' }}>
              {allPublished.map((ep, i) => {
                const inSpotlight = featured.some(f => f.slug === ep.slug)
                return (
                  <div key={ep.slug} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: i < allPublished.length - 1 ? '1px solid var(--border)' : 'none', background: inSpotlight ? 'rgba(194,106,74,.04)' : 'transparent' }}>
                    <button onClick={() => toggleFeatured(ep)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.1rem', color: inSpotlight ? 'var(--terra)' : 'var(--faint)', padding: 0, flexShrink: 0 }}>
                      {inSpotlight ? '★' : '☆'}
                    </button>
                    {ep.photo
                      ? <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%', flexShrink: 0 }} />
                      : <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${SHOW_COLOR[ep.show]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 800, color: SHOW_COLOR[ep.show], flexShrink: 0 }}>
                          {ep.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                    }
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '.86rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.guest}</p>
                      <p style={{ margin: 0, fontSize: '.74rem', color: 'var(--faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.youtubeTitle}</p>
                    </div>
                    <span style={{ fontSize: '.7rem', fontWeight: 700, color: SHOW_COLOR[ep.show], flexShrink: 0 }}>
                      {ep.show.replace('Life Between Titles', 'LBT').replace('Work Unscripted', 'WU').replace('Office Hours', 'OH')}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </AdminShell>
  )
}
