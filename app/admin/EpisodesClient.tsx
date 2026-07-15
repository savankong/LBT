'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Episode, Show, Status } from '@/lib/episodes'
import { ADMIN_PASSWORD, SAVED_PW_KEY, LoginScreen, AdminShell, inputStyle, labelStyle, Field } from './AdminShell'

const SHOWS: Show[] = ['Life Between Titles', 'Work Unscripted', 'Office Hours']
const STATUSES: Status[] = ['Published', 'Recorded', 'Scheduled', 'Reached Out', 'To Be Planned']

const STATUS_COLOR: Record<Status, string> = {
  Published: '#16a34a', Recorded: '#2563eb', Scheduled: '#7c3aed',
  'Reached Out': '#d97706', 'To Be Planned': '#6b7280',
}
const SHOW_COLOR: Record<Show, string> = {
  'Life Between Titles': '#C26A4A', 'Work Unscripted': '#4a7ec2', 'Office Hours': '#7c4ac2',
}

const sectionLabel: React.CSSProperties = {
  ...labelStyle, color: 'var(--terra)', marginBottom: 16, fontSize: '.76rem',
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function blankEpisode(): Episode {
  return {
    slug: '', videoNumber: undefined, show: 'Life Between Titles', season: 1,
    episode: undefined, guest: '', youtubeTitle: '', description: '',
    mainTags: '', tags: '', resources: '', status: 'Recorded', photo: '',
    youtubeUrl: '', spotifyUrl: '', appleUrl: '', amazonUrl: '',
    substack: '', guestBio: '', keyInsights: [], faq: [],
  }
}

function insightToString(i: string | { heading: string; body: string }): string {
  return typeof i === 'string' ? i : `${i.heading} — ${i.body}`
}

function InsightsEditor({ value, onChange }: { value: (string | { heading: string; body: string })[]; onChange: (v: string[]) => void }) {
  const strings = value.map(insightToString)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {strings.map((insight, i) => (
        <div key={i} style={{ display: 'flex', gap: 8 }}>
          <input style={{ ...inputStyle, flex: 1 }} value={insight}
            onChange={e => { const next = [...strings]; next[i] = e.target.value; onChange(next) }}
            placeholder={`Insight ${i + 1}`} />
          <button onClick={() => onChange(strings.filter((_, idx) => idx !== i))}
            style={{ padding: '0 12px', borderRadius: 8, border: '1.5px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '.8rem' }}>✕</button>
        </div>
      ))}
      <button onClick={() => onChange([...strings, ''])}
        style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: '.8rem', fontWeight: 600, alignSelf: 'flex-start' }}>
        + Add Insight
      </button>
    </div>
  )
}

function FAQEditor({ value, onChange }: { value: { q: string; a: string }[]; onChange: (v: { q: string; a: string }[]) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {value.map((item, i) => (
        <div key={i} style={{ border: '1px solid var(--border-med)', borderRadius: 10, padding: '14px 16px', position: 'relative' }}>
          <button onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'transparent', color: 'var(--faint)', cursor: 'pointer', fontSize: '.8rem', padding: '2px 6px' }}>✕</button>
          <label style={labelStyle}>Q {i + 1}</label>
          <input style={{ ...inputStyle, marginBottom: 8 }} value={item.q} placeholder="Question"
            onChange={e => { const next = [...value]; next[i] = { ...next[i], q: e.target.value }; onChange(next) }} />
          <label style={labelStyle}>Answer</label>
          <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }} value={item.a} placeholder="Answer"
            onChange={e => { const next = [...value]; next[i] = { ...next[i], a: e.target.value }; onChange(next) }} />
        </div>
      ))}
      <button onClick={() => onChange([...value, { q: '', a: '' }])}
        style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: '.8rem', fontWeight: 600, alignSelf: 'flex-start' }}>
        + Add Q&A
      </button>
    </div>
  )
}

function PromoLinksEditor({ value, onChange }: { value: { label: string; url: string; type?: string }[]; onChange: (v: { label: string; url: string; type?: string }[]) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {value.map((item, i) => (
        <div key={i} style={{ border: '1px solid var(--border-med)', borderRadius: 10, padding: '14px 16px', position: 'relative' }}>
          <button onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'transparent', color: 'var(--faint)', cursor: 'pointer', fontSize: '.8rem', padding: '2px 6px' }}>✕</button>
          <label style={labelStyle}>Label</label>
          <input style={{ ...inputStyle, marginBottom: 8 }} value={item.label} placeholder="Buy the book"
            onChange={e => { const next = [...value]; next[i] = { ...next[i], label: e.target.value }; onChange(next) }} />
          <label style={labelStyle}>URL</label>
          <input style={{ ...inputStyle, marginBottom: 8 }} value={item.url} placeholder="https://..."
            onChange={e => { const next = [...value]; next[i] = { ...next[i], url: e.target.value }; onChange(next) }} />
          <label style={labelStyle}>Type</label>
          <select style={inputStyle} value={item.type ?? 'book'}
            onChange={e => { const next = [...value]; next[i] = { ...next[i], type: e.target.value }; onChange(next) }}>
            {['book','course','service','product','website','other'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      ))}
      <button onClick={() => onChange([...value, { label: '', url: '', type: 'book' }])}
        style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: '.8rem', fontWeight: 600, alignSelf: 'flex-start' }}>
        + Add Link
      </button>
    </div>
  )
}

function EpisodeDrawer({ ep, onSave, onDelete, onClose, isNew, saving }: {
  ep: Episode; onSave: (ep: Episode) => void; onDelete: () => void
  onClose: () => void; isNew: boolean; saving: boolean
}) {
  const [form, setForm] = useState<Episode>({ ...ep })
  const [tab, setTab] = useState<'identity' | 'content' | 'media' | 'seo'>('identity')
  const set = (k: keyof Episode, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const DRAWER_TABS = ['identity', 'content', 'media', 'seo'] as const

  useEffect(() => {
    if (isNew && form.guest && !form.slug) set('slug', slugify(form.guest))
  }, [form.guest, isNew, form.slug])

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 999 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(720px,100vw)', background: 'var(--bg)', overflowY: 'auto', zIndex: 1000, boxShadow: '-24px 0 64px rgba(0,0,0,.18)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 28px 0', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>{isNew ? 'New Episode' : `Edit: ${form.guest}`}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {!isNew && (
                <button onClick={() => { if (confirm('Delete this episode?')) onDelete() }}
                  style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
              )}
              <button onClick={onClose} style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => onSave({ ...form, promoLinks: (form.promoLinks ?? []).filter(l => l.label.trim() && l.url.trim()) })}
                className="btn btn-gold" style={{ padding: '7px 18px', fontSize: '.85rem' }} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {DRAWER_TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: '9px 18px', fontSize: '.73rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: 'none', borderBottom: tab === t ? '2px solid var(--ink)' : '2px solid transparent', background: 'transparent', color: tab === t ? 'var(--ink)' : 'var(--faint)', cursor: 'pointer', marginBottom: '-1px' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '28px', flex: 1 }}>
          {tab === 'identity' && (
            <>
              <p style={sectionLabel}>Episode Identity</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Guest *"><input style={inputStyle} value={form.guest} onChange={e => set('guest', e.target.value)} /></Field>
                <Field label="Slug *" hint="URL: /shows/[slug]"><input style={inputStyle} value={form.slug} onChange={e => set('slug', e.target.value)} /></Field>
                <Field label="Show *">
                  <select style={inputStyle} value={form.show} onChange={e => set('show', e.target.value as Show)}>
                    {SHOWS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Status *">
                  <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value as Status)}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Season"><input style={inputStyle} type="number" value={form.season} onChange={e => set('season', Number(e.target.value))} /></Field>
                <Field label="Episode #"><input style={inputStyle} type="number" value={form.episode ?? ''} onChange={e => set('episode', e.target.value ? Number(e.target.value) : undefined)} /></Field>
                <Field label="Video #" hint="Higher = newer"><input style={inputStyle} type="number" value={form.videoNumber ?? ''} onChange={e => set('videoNumber', e.target.value ? Number(e.target.value) : undefined)} /></Field>
              </div>
            </>
          )}

          {tab === 'content' && (
            <>
              <p style={sectionLabel}>Content</p>
              <Field label="YouTube Title *"><input style={inputStyle} value={form.youtubeTitle} onChange={e => set('youtubeTitle', e.target.value)} /></Field>
              <Field label="Description" hint="'In this episode:' bullets + 'CHAPTERS' list">
                <textarea style={{ ...inputStyle, minHeight: 180, fontFamily: 'monospace', fontSize: '.8rem', resize: 'vertical', lineHeight: 1.6 }}
                  value={form.description} onChange={e => set('description', e.target.value)} />
              </Field>
              <Field label="Guest Bio" hint="2-3 sentences">
                <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical', lineHeight: 1.6 }} value={form.guestBio ?? ''} onChange={e => set('guestBio', e.target.value)} />
              </Field>
              <Field label="Pull Quote">
                <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical', lineHeight: 1.6, fontStyle: 'italic' }}
                  value={form.quote ?? ''} onChange={e => set('quote', e.target.value)} placeholder="A powerful line from the episode…" />
              </Field>
              <Field label="Key Insights"><InsightsEditor value={form.keyInsights ?? []} onChange={v => set('keyInsights', v)} /></Field>
              <div style={{ marginTop: 24 }}>
                <Field label="Q&A"><FAQEditor value={form.faq ?? []} onChange={v => set('faq', v)} /></Field>
              </div>
              <Field label="Main Tags"><input style={inputStyle} value={form.mainTags} onChange={e => set('mainTags', e.target.value)} /></Field>
              <Field label="Tags"><input style={inputStyle} value={form.tags} onChange={e => set('tags', e.target.value)} /></Field>
              <Field label="Resources" hint="Separate with |">
                <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.resources} onChange={e => set('resources', e.target.value)} />
              </Field>
            </>
          )}

          {tab === 'media' && (
            <>
              <p style={sectionLabel}>Media & Links</p>
              <Field label="Guest Photo">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <input style={{ ...inputStyle, flex: 1 }} value={form.photo} onChange={e => set('photo', e.target.value)} placeholder="/episodes/slug.jpg or https://..." />
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', cursor: 'pointer', fontSize: '.8rem', fontWeight: 700, background: 'var(--bg)', color: 'var(--ink)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    📁 Upload
                    <input type="file" accept="image/*" style={{ display: 'none' }}
                      onChange={async e => {
                        const file = e.target.files?.[0]
                        if (!file || !form.slug) { alert('Save episode first to get a slug'); return }
                        const fd = new FormData(); fd.append('file', file); fd.append('slug', form.slug); fd.append('key', 'main')
                        const res = await fetch('/api/upload-photo', { method: 'POST', body: fd })
                        const data = await res.json()
                        if (data.url) set('photo', data.url); else alert(data.error ?? 'Upload failed')
                      }} />
                  </label>
                </div>
                {form.photo && <img src={form.photo} alt="preview" referrerPolicy="no-referrer" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, border: '2px solid var(--border)' }} />}
              </Field>
              <Field label="Additional Photos">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  {(form.additionalPhotos ?? []).map((url, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={url} alt={`photo ${i + 1}`} referrerPolicy="no-referrer" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '2px solid var(--border)', display: 'block' }} />
                      <button onClick={() => { const p = [...(form.additionalPhotos ?? [])]; p.splice(i, 1); set('additionalPhotos', p) }}
                        style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>×</button>
                    </div>
                  ))}
                  <label style={{ width: 72, height: 72, borderRadius: 8, border: '1.5px dashed var(--border-med)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--faint)' }}>
                    +
                    <input type="file" accept="image/*" multiple style={{ display: 'none' }}
                      onChange={async e => {
                        const files = Array.from(e.target.files ?? [])
                        if (!files.length || !form.slug) { alert('Save episode first'); return }
                        const existing = form.additionalPhotos ?? []; const urls = [...existing]
                        for (let i = 0; i < files.length; i++) {
                          const fd = new FormData(); fd.append('file', files[i]); fd.append('slug', form.slug); fd.append('key', `extra${existing.length + i + 1}-${Date.now()}`)
                          const res = await fetch('/api/upload-photo', { method: 'POST', body: fd })
                          const data = await res.json(); if (data.url) urls.push(data.url)
                        }
                        set('additionalPhotos', urls); e.target.value = ''
                      }} />
                  </label>
                </div>
              </Field>
              {[['YouTube URL', 'youtubeUrl', 'https://www.youtube.com/watch?v=...'],
                ['Spotify Episode URL', 'spotifyUrl', ''],
                ['Apple Podcasts URL', 'appleUrl', ''],
                ['Amazon Music URL', 'amazonUrl', ''],
                ['Substack Post URL', 'substack', ''],
                ['Transcript File', 'transcriptFile', 'guest-name.txt'],
              ].map(([label, key, placeholder]) => (
                <Field key={key} label={label}>
                  <input style={inputStyle} value={(form as unknown as Record<string, string>)[key] ?? ''} placeholder={placeholder}
                    onChange={e => set(key as keyof Episode, e.target.value)} />
                </Field>
              ))}
              <Field label="Promo Links"><PromoLinksEditor value={form.promoLinks ?? []} onChange={v => set('promoLinks', v)} /></Field>
            </>
          )}

          {tab === 'seo' && (
            <>
              <p style={sectionLabel}>SEO Preview</p>
              <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 8 }}>Title Tag</p>
                <p style={{ fontSize: '.9rem', color: '#1a0dab', marginBottom: 16 }}>{form.guest && form.show ? `${form.guest} on ${form.show} | Life Between Titles` : 'Add guest name to preview'}</p>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 8 }}>Canonical URL</p>
                <p style={{ fontSize: '.84rem', color: '#006621', marginBottom: 16, fontFamily: 'monospace' }}>lifebetweentitles.com/shows/{form.slug || 'slug'}</p>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 8 }}>Meta Description</p>
                <p style={{ fontSize: '.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{form.description ? form.description.slice(0, 160) + '…' : 'Add description to preview'}</p>
              </div>
              <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: '20px 24px' }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 12 }}>Schema Checklist</p>
                {[
                  { label: 'PodcastEpisode', ok: !!(form.youtubeTitle && form.slug) },
                  { label: 'FAQPage', ok: (form.faq ?? []).length > 0 },
                  { label: 'Speakable', ok: !!form.transcriptFile },
                  { label: 'Person (guest)', ok: !!form.guestBio },
                  { label: 'OpenGraph image', ok: !!form.photo },
                  { label: 'YouTube embed', ok: !!form.youtubeUrl },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: item.ok ? '#16a34a' : 'var(--border-med)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', color: item.ok ? '#fff' : 'var(--faint)', flexShrink: 0 }}>{item.ok ? '✓' : '○'}</span>
                    <span style={{ fontSize: '.84rem', color: item.ok ? 'var(--ink)' : 'var(--faint)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default function EpisodesClient() {
  const [authed, setAuthed] = useState(() => typeof window !== 'undefined' && localStorage.getItem(SAVED_PW_KEY) === ADMIN_PASSWORD)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Episode | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [search, setSearch] = useState('')
  const [filterShow, setFilterShow] = useState<Show | 'All'>('All')
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All')
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)
  const [deploying, setDeploying] = useState(false)

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const fetchEpisodes = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/episodes'); if (!res.ok) throw new Error('fetch failed')
      setEpisodes(await res.json())
    } catch { showToast('Could not load episodes', 'err') } finally { setLoading(false) }
  }, [])

  useEffect(() => { if (authed) fetchEpisodes() }, [authed, fetchEpisodes])

  const handleSave = async (ep: Episode) => {
    setSaving(true)
    try {
      const url = isNew ? '/api/episodes' : `/api/episodes/${ep.slug}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ep) })
      if (!res.ok) throw new Error(await res.text())
      await fetchEpisodes(); setEditing(null)
      showToast(isNew ? 'Episode created' : 'Episode saved')
    } catch (err) { showToast(`Save failed: ${err}`, 'err') } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!editing?.slug) return; setSaving(true)
    try {
      const res = await fetch(`/api/episodes/${editing.slug}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      await fetchEpisodes(); setEditing(null); showToast('Episode deleted')
    } catch (err) { showToast(`Delete failed: ${err}`, 'err') } finally { setSaving(false) }
  }

  const triggerDeploy = async () => {
    setDeploying(true)
    try {
      const res = await fetch('/api/trigger-deploy', { method: 'POST' })
      const data = await res.json(); if (!res.ok) throw new Error(data.error)
      showToast('Deploy triggered — rebuilding in ~1 min')
    } catch (err) { showToast(`Deploy failed: ${err}`, 'err') } finally { setDeploying(false) }
  }

  const filtered = episodes
    .filter(e => filterShow === 'All' || e.show === filterShow)
    .filter(e => filterStatus === 'All' || e.status === filterStatus)
    .filter(e => !search || e.guest.toLowerCase().includes(search.toLowerCase()) || e.youtubeTitle.toLowerCase().includes(search.toLowerCase()) || e.slug.includes(search.toLowerCase()))

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <AdminShell toast={toast}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', letterSpacing: '-.03em', marginBottom: 4 }}>Episode Database</h1>
          <p style={{ color: 'var(--faint)', fontSize: '.84rem', margin: 0 }}>{loading ? 'Loading…' : `${episodes.length} episodes`}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={triggerDeploy} disabled={deploying}
            style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #16a34a', background: 'transparent', color: '#16a34a', fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', opacity: deploying ? .6 : 1 }}>
            {deploying ? 'Deploying…' : '↑ Publish Site'}
          </button>
          <button onClick={() => { setIsNew(true); setEditing(blankEpisode()) }} className="btn btn-gold" style={{ fontSize: '.84rem' }}>+ New Episode</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        {(Object.entries(STATUS_COLOR) as [Status, string][]).map(([s, c]) => (
          <div key={s} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--border-med)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />
            <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--muted)' }}>{s}</span>
            <span style={{ fontSize: '.82rem', fontWeight: 800 }}>{episodes.filter(e => e.status === s).length}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <input placeholder="Search guest, title, slug…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, width: 240, padding: '9px 14px', flex: 'none' }} />
        <select value={filterShow} onChange={e => setFilterShow(e.target.value as Show | 'All')} style={{ ...inputStyle, width: 200 }}>
          <option value="All">All Shows</option>
          {SHOWS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as Status | 'All')} style={{ ...inputStyle, width: 160 }}>
          <option value="All">All Statuses</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '.8rem', color: 'var(--faint)' }}>{filtered.length} of {episodes.length}</span>
      </div>

      {/* Table */}
      <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '36px 44px 1fr 1fr 140px 110px 80px 56px', padding: '10px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          {['#', '▶', 'Guest', 'Title', 'Show', 'Status', 'S·E', ''].map((h, i) => (
            <span key={i} style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>{h}</span>
          ))}
        </div>
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--faint)' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--faint)' }}>No episodes match.</div>
        ) : filtered.map((ep, i) => (
          <div key={ep.slug} onClick={() => { setIsNew(false); setEditing({ ...ep }) }}
            style={{ display: 'grid', gridTemplateColumns: '36px 44px 1fr 1fr 140px 110px 80px 56px', padding: '12px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.012)' }}>
            <span style={{ fontSize: '.75rem', color: 'var(--faint)', fontWeight: 600, alignSelf: 'center' }}>{ep.videoNumber ?? '—'}</span>
            <div style={{ alignSelf: 'center' }}>
              {ep.photo
                ? <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                : <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${SHOW_COLOR[ep.show]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, color: SHOW_COLOR[ep.show] }}>{ep.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>}
            </div>
            <span style={{ fontSize: '.86rem', fontWeight: 600, alignSelf: 'center' }}>{ep.guest}</span>
            <span style={{ fontSize: '.82rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12, alignSelf: 'center' }}>{ep.youtubeTitle}</span>
            <span style={{ fontSize: '.72rem', fontWeight: 700, color: SHOW_COLOR[ep.show], alignSelf: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {ep.show.replace('Life Between Titles', 'LBT').replace('Work Unscripted', 'WU').replace('Office Hours', 'OH')}
            </span>
            <span style={{ fontSize: '.7rem', fontWeight: 700, color: STATUS_COLOR[ep.status], alignSelf: 'center' }}>{ep.status}</span>
            <span style={{ fontSize: '.75rem', color: 'var(--faint)', alignSelf: 'center', fontWeight: 600 }}>
              {ep.season ? `S${ep.season}` : ''}{ep.episode ? `·E${ep.episode}` : ''}
            </span>
            <span style={{ fontSize: '.76rem', color: 'var(--terra)', fontWeight: 700, alignSelf: 'center', textAlign: 'right', opacity: .6 }}>Edit →</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '.75rem', color: 'var(--faint)', margin: 0 }}>
          Changes save directly to the database. Click <strong style={{ color: '#16a34a' }}>↑ Publish Site</strong> to rebuild.
        </p>
        <button onClick={fetchEpisodes} style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--faint)', fontSize: '.78rem', cursor: 'pointer' }}>↺ Refresh</button>
      </div>

      {editing && (
        <EpisodeDrawer ep={editing} isNew={isNew} saving={saving}
          onSave={handleSave} onDelete={handleDelete} onClose={() => setEditing(null)} />
      )}
    </AdminShell>
  )
}
