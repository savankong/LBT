'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Episode, Show, Status } from '@/lib/episodes'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'lbt2025'
const SHOWS: Show[] = ['Life Between Titles', 'Work Unscripted', 'Office Hours']
const STATUSES: Status[] = ['Published', 'Recorded', 'Scheduled', 'Reached Out', 'To Be Planned']

const STATUS_COLOR: Record<Status, string> = {
  Published: '#16a34a',
  Recorded: '#2563eb',
  Scheduled: '#7c3aed',
  'Reached Out': '#d97706',
  'To Be Planned': '#6b7280',
}
const SHOW_COLOR: Record<Show, string> = {
  'Life Between Titles': '#C26A4A',
  'Work Unscripted': '#4a7ec2',
  'Office Hours': '#7c4ac2',
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

// ── Styles ────────────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 8,
  border: '1.5px solid var(--border-med)', fontSize: '.88rem',
  background: 'var(--bg)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '.72rem', fontWeight: 700,
  letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 5,
}
const sectionLabel: React.CSSProperties = {
  ...labelStyle, color: 'var(--terra)', marginBottom: 16, fontSize: '.76rem',
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {hint && <p style={{ fontSize: '.72rem', color: 'var(--faint)', marginBottom: 6, marginTop: -2 }}>{hint}</p>}
      {children}
    </div>
  )
}

// ── Login ────────────────────────────────────────────────────────────────────
const SAVED_PW_KEY = 'lbt_admin_pw'

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const [remember, setRemember] = useState(true)
  const check = () => {
    if (pw === ADMIN_PASSWORD) {
      if (remember) localStorage.setItem(SAVED_PW_KEY, pw)
      else localStorage.removeItem(SAVED_PW_KEY)
      onLogin()
    } else {
      setErr(true)
    }
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg2)', paddingTop: 'var(--nav-h)' }}>
      <div className="glass" style={{ borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 360, textAlign: 'center' }}>
        <h2 style={{ marginBottom: 8, fontSize: '1.4rem' }}>Admin</h2>
        <p style={{ color: 'var(--faint)', fontSize: '.85rem', marginBottom: 32 }}>Life Between Titles episode manager</p>
        <input type="password" placeholder="Password" value={pw}
          onChange={e => { setPw(e.target.value); setErr(false) }}
          onKeyDown={e => e.key === 'Enter' && check()}
          style={{ ...inputStyle, marginBottom: 12, border: `1.5px solid ${err ? '#ef4444' : 'var(--border-med)'}` }}
          autoFocus />
        {err && <p style={{ color: '#ef4444', fontSize: '.8rem', marginBottom: 12 }}>Incorrect password</p>}
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16, cursor: 'pointer', fontSize: '.82rem', color: 'var(--muted)' }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: 15, height: 15, accentColor: 'var(--terra)', cursor: 'pointer' }} />
          Keep me logged in
        </label>
        <button onClick={check} className="btn btn-gold" style={{ width: '100%' }}>Enter</button>
      </div>
    </div>
  )
}

// ── Key Insights editor ───────────────────────────────────────────────────────
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
            style={{ padding: '0 12px', borderRadius: 8, border: '1.5px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '.8rem' }}>
            ✕
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...strings, ''])}
        style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: '.8rem', fontWeight: 600, alignSelf: 'flex-start' }}>
        + Add Insight
      </button>
    </div>
  )
}

// ── FAQ editor ────────────────────────────────────────────────────────────────
function FAQEditor({ value, onChange }: { value: { q: string; a: string }[]; onChange: (v: { q: string; a: string }[]) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {value.map((item, i) => (
        <div key={i} style={{ border: '1px solid var(--border-med)', borderRadius: 10, padding: '14px 16px', position: 'relative' }}>
          <button onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'transparent', color: 'var(--faint)', cursor: 'pointer', fontSize: '.8rem', padding: '2px 6px' }}>
            ✕
          </button>
          <label style={labelStyle}>Q {i + 1}</label>
          <input style={{ ...inputStyle, marginBottom: 8 }} value={item.q}
            placeholder="Question"
            onChange={e => { const next = [...value]; next[i] = { ...next[i], q: e.target.value }; onChange(next) }} />
          <label style={labelStyle}>Answer</label>
          <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }} value={item.a}
            placeholder="Answer"
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
            style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'transparent', color: 'var(--faint)', cursor: 'pointer', fontSize: '.8rem', padding: '2px 6px' }}>
            ✕
          </button>
          <label style={labelStyle}>Label (e.g. "Buy Leslie's Book")</label>
          <input style={{ ...inputStyle, marginBottom: 8 }} value={item.label} placeholder="Buy the book"
            onChange={e => { const next = [...value]; next[i] = { ...next[i], label: e.target.value }; onChange(next) }} />
          <label style={labelStyle}>URL</label>
          <input style={{ ...inputStyle, marginBottom: 8 }} value={item.url} placeholder="https://..."
            onChange={e => { const next = [...value]; next[i] = { ...next[i], url: e.target.value }; onChange(next) }} />
          <label style={labelStyle}>Type (optional)</label>
          <select style={{ ...inputStyle }} value={item.type ?? 'book'}
            onChange={e => { const next = [...value]; next[i] = { ...next[i], type: e.target.value }; onChange(next) }}>
            <option value="book">Book</option>
            <option value="course">Course</option>
            <option value="service">Service / Coaching</option>
            <option value="product">Product</option>
            <option value="website">Website</option>
            <option value="other">Other</option>
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

// ── Episode Drawer ────────────────────────────────────────────────────────────
function EpisodeDrawer({ ep, onSave, onDelete, onClose, isNew, saving }: {
  ep: Episode; onSave: (ep: Episode) => void; onDelete: () => void
  onClose: () => void; isNew: boolean; saving: boolean
}) {
  const [form, setForm] = useState<Episode>({ ...ep })
  const [tab, setTab] = useState<'identity' | 'content' | 'media' | 'seo'>('identity')
  const set = (k: keyof Episode, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    if (isNew && form.guest && !form.slug) set('slug', slugify(form.guest))
  }, [form.guest, isNew, form.slug])

  const TABS = ['identity', 'content', 'media', 'seo'] as const

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 999 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(720px,100vw)', background: 'var(--bg)', overflowY: 'auto', zIndex: 1000, boxShadow: '-24px 0 64px rgba(0,0,0,.18)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '20px 28px 0', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>{isNew ? 'New Episode' : `Edit: ${form.guest}`}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {!isNew && (
                <button onClick={() => { if (confirm('Delete this episode?')) onDelete() }}
                  style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  Delete
                </button>
              )}
              <button onClick={onClose} style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => onSave({ ...form, promoLinks: (form.promoLinks ?? []).filter(l => l.label.trim() && l.url.trim()) })} className="btn btn-gold" style={{ padding: '7px 18px', fontSize: '.85rem' }} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: '9px 18px', fontSize: '.73rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: 'none', borderBottom: tab === t ? '2px solid var(--ink)' : '2px solid transparent', background: 'transparent', color: tab === t ? 'var(--ink)' : 'var(--faint)', cursor: 'pointer', marginBottom: '-1px', transition: 'color .15s' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '28px', flex: 1 }}>

          {tab === 'identity' && (
            <>
              <p style={sectionLabel}>Episode Identity</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Guest *">
                  <input style={inputStyle} value={form.guest} onChange={e => set('guest', e.target.value)} />
                </Field>
                <Field label="Slug *" hint="URL path: /shows/[slug]">
                  <input style={inputStyle} value={form.slug} onChange={e => set('slug', e.target.value)} />
                </Field>
                <Field label="Show *">
                  <select style={inputStyle} value={form.show} onChange={e => set('show', e.target.value as Show)}>
                    {SHOWS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Status *">
                  <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value as Status)}>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Season">
                  <input style={inputStyle} type="number" value={form.season} onChange={e => set('season', Number(e.target.value))} />
                </Field>
                <Field label="Episode #">
                  <input style={inputStyle} type="number" value={form.episode ?? ''} onChange={e => set('episode', e.target.value ? Number(e.target.value) : undefined)} />
                </Field>
                <Field label="Video #" hint="Order shown on the site (higher = newer)">
                  <input style={inputStyle} type="number" value={form.videoNumber ?? ''} onChange={e => set('videoNumber', e.target.value ? Number(e.target.value) : undefined)} />
                </Field>
              </div>
            </>
          )}

          {tab === 'content' && (
            <>
              <p style={sectionLabel}>Content</p>
              <Field label="YouTube Title *">
                <input style={inputStyle} value={form.youtubeTitle} onChange={e => set('youtubeTitle', e.target.value)} />
              </Field>
              <Field label="Description" hint="Supports: 'In this episode:' bullet list + 'CHAPTERS' timestamp list">
                <textarea style={{ ...inputStyle, minHeight: 180, fontFamily: 'monospace', fontSize: '.8rem', resize: 'vertical', lineHeight: 1.6 }}
                  value={form.description} onChange={e => set('description', e.target.value)} />
              </Field>
              <Field label="Guest Bio" hint="2-3 sentences about who this person is">
                <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical', lineHeight: 1.6 }}
                  value={form.guestBio ?? ''} onChange={e => set('guestBio', e.target.value)} />
              </Field>
              <Field label="Pull Quote" hint="Shown large at the top of the episode page — pick a single powerful line from the transcript">
                <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical', lineHeight: 1.6, fontStyle: 'italic' }}
                  value={form.quote ?? ''} onChange={e => set('quote', e.target.value)}
                  placeholder="If you say yes to opportunities, even if you're not clear on what the outcome's gonna be…" />
              </Field>
              <Field label="Key Insights" hint="Bullet-style takeaways shown at the top of the page (GEO-optimized)">
                <InsightsEditor value={form.keyInsights ?? []} onChange={v => set('keyInsights', v)} />
              </Field>
              <div style={{ marginTop: 24 }}>
                <Field label="Q&A" hint="Questions answered in this episode — feeds FAQPage schema for SEO">
                  <FAQEditor value={form.faq ?? []} onChange={v => set('faq', v)} />
                </Field>
              </div>
              <Field label="Main Tags" hint="Space-separated #hashtags">
                <input style={inputStyle} value={form.mainTags} onChange={e => set('mainTags', e.target.value)} />
              </Field>
              <Field label="Tags">
                <input style={inputStyle} value={form.tags} onChange={e => set('tags', e.target.value)} />
              </Field>
              <Field label="Resources" hint="Separate multiple items with |">
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
                  <label style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px',
                    borderRadius: 8, border: '1.5px solid var(--border-med)', cursor: 'pointer',
                    fontSize: '.8rem', fontWeight: 700, background: 'var(--bg)', color: 'var(--ink)',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    📁 Upload
                    <input type="file" accept="image/*" style={{ display: 'none' }}
                      onChange={async e => {
                        const file = e.target.files?.[0]
                        if (!file || !form.slug) { alert('Save episode first to get a slug'); return }
                        const fd = new FormData()
                        fd.append('file', file)
                        fd.append('slug', form.slug)
                        fd.append('key', 'main')
                        const res = await fetch('/api/upload-photo', { method: 'POST', body: fd })
                        const data = await res.json()
                        if (data.url) set('photo', data.url)
                        else alert(data.error ?? 'Upload failed')
                      }}
                    />
                  </label>
                </div>
                {form.photo && (
                  <img src={form.photo} alt="preview" referrerPolicy="no-referrer"
                    style={{ width: 80, height: 80, objectFit: 'cover', objectPosition: 'center center', borderRadius: 10, border: '2px solid var(--border)' }} />
                )}
              </Field>
              <Field label="Additional Photos" hint="Extra photos shown in a gallery on the episode page — click to enlarge">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  {(form.additionalPhotos ?? []).map((url, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={url} alt={`photo ${i + 1}`} referrerPolicy="no-referrer"
                        style={{ width: 72, height: 72, objectFit: 'cover', objectPosition: 'center center', borderRadius: 8, border: '2px solid var(--border)', display: 'block' }} />
                      <button
                        onClick={() => {
                          const photos = [...(form.additionalPhotos ?? [])]
                          photos.splice(i, 1)
                          set('additionalPhotos', photos)
                        }}
                        style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        ×
                      </button>
                    </div>
                  ))}
                  <label style={{
                    width: 72, height: 72, borderRadius: 8, border: '1.5px dashed var(--border-med)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '1.4rem', color: 'var(--faint)', flexShrink: 0,
                  }}>
                    +
                    <input type="file" accept="image/*" multiple style={{ display: 'none' }}
                      onChange={async e => {
                        const files = Array.from(e.target.files ?? [])
                        if (!files.length || !form.slug) { alert('Save episode first to get a slug'); return }
                        const existing = form.additionalPhotos ?? []
                        const urls: string[] = [...existing]
                        for (let i = 0; i < files.length; i++) {
                          const fd = new FormData()
                          fd.append('file', files[i])
                          fd.append('slug', form.slug)
                          fd.append('key', `extra${existing.length + i + 1}-${Date.now()}`)
                          const res = await fetch('/api/upload-photo', { method: 'POST', body: fd })
                          const data = await res.json()
                          if (data.url) urls.push(data.url)
                        }
                        set('additionalPhotos', urls)
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>
              </Field>
              <Field label="YouTube URL" hint="Full watch URL — e.g. https://www.youtube.com/watch?v=...">
                <input style={inputStyle} value={form.youtubeUrl ?? ''} onChange={e => set('youtubeUrl', e.target.value)} />
              </Field>
              <Field label="Spotify Episode URL">
                <input style={inputStyle} value={form.spotifyUrl ?? ''} onChange={e => set('spotifyUrl', e.target.value)} />
              </Field>
              <Field label="Apple Podcasts Episode URL">
                <input style={inputStyle} value={form.appleUrl ?? ''} onChange={e => set('appleUrl', e.target.value)} />
              </Field>
              <Field label="Amazon Music Episode URL">
                <input style={inputStyle} value={form.amazonUrl ?? ''} onChange={e => set('amazonUrl', e.target.value)} />
              </Field>
              <Field label="Substack Post URL">
                <input style={inputStyle} value={form.substack ?? ''} onChange={e => set('substack', e.target.value)} />
              </Field>
              <Field label="Transcript File" hint="Filename in /content/transcripts/ e.g. guest-name.txt">
                <input style={inputStyle} value={form.transcriptFile ?? ''} onChange={e => set('transcriptFile', e.target.value)} />
              </Field>
              <Field label="Promo Links" hint="Books, courses, or services the guest is promoting — shown as a sidebar card on their episode page">
                <PromoLinksEditor value={form.promoLinks ?? []} onChange={v => set('promoLinks', v)} />
              </Field>
            </>
          )}

          {tab === 'seo' && (
            <>
              <p style={sectionLabel}>SEO Preview</p>
              <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 8 }}>Title Tag</p>
                <p style={{ fontSize: '.9rem', color: '#1a0dab', marginBottom: 16, lineHeight: 1.4 }}>
                  {form.guest && form.show ? `${form.guest} on ${form.show} | Life Between Titles` : 'Add guest name to preview'}
                </p>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 8 }}>Canonical URL</p>
                <p style={{ fontSize: '.84rem', color: '#006621', marginBottom: 16, fontFamily: 'monospace' }}>
                  lifebetweentitles.com/shows/{form.slug || 'slug-preview'}
                </p>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 8 }}>Meta Description</p>
                <p style={{ fontSize: '.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {form.description ? form.description.replace(/<br\s*\/?>/gi, ' ').slice(0, 160) + '…' : 'Add description to preview'}
                </p>
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
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: item.ok ? '#16a34a' : 'var(--border-med)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', color: item.ok ? '#fff' : 'var(--faint)', flexShrink: 0 }}>
                      {item.ok ? '✓' : '○'}
                    </span>
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

// ── CCAT Question types ───────────────────────────────────────────────────────
interface CcatQuestion {
  id?: number
  category: 'Math' | 'Verbal' | 'Spatial'
  prompt: string
  choices: string[]
  correctIndex: number
  explanation: string
  active: boolean
}

function blankQuestion(): CcatQuestion {
  return { category: 'Math', prompt: '', choices: ['', '', '', ''], correctIndex: 0, explanation: '', active: true }
}

// ── CCAT Question Drawer ──────────────────────────────────────────────────────
function QuestionDrawer({ q, onSave, onDelete, onClose, isNew, saving }: {
  q: CcatQuestion; onSave: (q: CcatQuestion) => void; onDelete: () => void
  onClose: () => void; isNew: boolean; saving: boolean
}) {
  const [form, setForm] = useState<CcatQuestion>({ ...q })
  const set = <K extends keyof CcatQuestion>(k: K, v: CcatQuestion[K]) => setForm(f => ({ ...f, [k]: v }))
  const setChoice = (i: number, v: string) => {
    const next = [...form.choices]; next[i] = v; set('choices', next)
  }
  const addChoice = () => set('choices', [...form.choices, ''])
  const removeChoice = (i: number) => {
    const next = form.choices.filter((_, idx) => idx !== i)
    set('choices', next)
    if (form.correctIndex >= next.length) set('correctIndex', Math.max(0, next.length - 1))
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 999 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(600px,100vw)', background: 'var(--bg)', overflowY: 'auto', zIndex: 1000, boxShadow: '-24px 0 64px rgba(0,0,0,.18)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 28px 16px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>{isNew ? 'New Question' : 'Edit Question'}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {!isNew && (
                <button onClick={() => { if (confirm('Delete this question?')) onDelete() }}
                  style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  Delete
                </button>
              )}
              <button onClick={onClose} style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => onSave(form)} className="btn btn-gold" style={{ padding: '7px 18px', fontSize: '.85rem' }} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Category + Active */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'end' }}>
            <Field label="Category">
              <select style={inputStyle} value={form.category} onChange={e => set('category', e.target.value as CcatQuestion['category'])}>
                <option>Math</option>
                <option>Verbal</option>
                <option>Spatial</option>
              </select>
            </Field>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: '.84rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
              <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)}
                style={{ width: 15, height: 15, accentColor: 'var(--terra)', cursor: 'pointer' }} />
              Active
            </label>
          </div>

          {/* Prompt */}
          <Field label="Question Prompt">
            <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical', lineHeight: 1.5 }}
              value={form.prompt} onChange={e => set('prompt', e.target.value)} placeholder="Type the question here…" />
          </Field>

          {/* Choices */}
          <div>
            <label style={labelStyle}>Answer Choices (select correct one)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {form.choices.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="radio" name="correct" checked={form.correctIndex === i}
                    onChange={() => set('correctIndex', i)}
                    style={{ accentColor: '#16a34a', width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }} />
                  <input style={{ ...inputStyle, flex: 1, border: form.correctIndex === i ? '1.5px solid #16a34a' : '1.5px solid var(--border-med)' }}
                    value={c} onChange={e => setChoice(i, e.target.value)} placeholder={`Choice ${i + 1}`} />
                  {form.choices.length > 2 && (
                    <button onClick={() => removeChoice(i)}
                      style={{ padding: '0 10px', height: 36, borderRadius: 8, border: '1.5px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '.8rem', flexShrink: 0 }}>✕</button>
                  )}
                </div>
              ))}
              <button onClick={addChoice}
                style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: '.8rem', fontWeight: 600, alignSelf: 'flex-start' }}>
                + Add Choice
              </button>
            </div>
          </div>

          {/* Explanation */}
          <Field label="Explanation (shown after answering — HTML ok)">
            <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }}
              value={form.explanation} onChange={e => set('explanation', e.target.value)}
              placeholder="Explain the correct answer. <b>bold</b> is supported." />
          </Field>
        </div>
      </div>
    </>
  )
}

// ── Main Admin UI ─────────────────────────────────────────────────────────────
export default function AdminClient() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(SAVED_PW_KEY) === ADMIN_PASSWORD
  })
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

  // CCAT question state
  const [questions, setQuestions] = useState<CcatQuestion[]>([])
  const [qLoading, setQLoading] = useState(false)
  const [qSaving, setQSaving] = useState(false)
  const [qEditing, setQEditing] = useState<CcatQuestion | null>(null)
  const [qIsNew, setQIsNew] = useState(false)
  const [qSearch, setQSearch] = useState('')
  const [qCatFilter, setQCatFilter] = useState<'All' | 'Math' | 'Verbal' | 'Spatial'>('All')
  const [seeding, setSeeding] = useState(false)

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchEpisodes = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/episodes')
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setEpisodes(data)
    } catch {
      showToast('Could not load episodes from database', 'err')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { if (authed) fetchEpisodes() }, [authed, fetchEpisodes])

  const handleSave = async (ep: Episode) => {
    setSaving(true)
    try {
      const url = isNew ? '/api/episodes' : `/api/episodes/${editing!.slug}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ep) })
      if (!res.ok) throw new Error(await res.text())
      await fetchEpisodes()
      setEditing(null)
      showToast(isNew ? 'Episode created' : 'Episode saved')
    } catch (err) {
      showToast(`Save failed: ${err}`, 'err')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const res = await fetch(`/api/episodes/${editing.slug}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      await fetchEpisodes()
      setEditing(null)
      showToast('Episode deleted')
    } catch (err) {
      showToast(`Delete failed: ${err}`, 'err')
    } finally {
      setSaving(false)
    }
  }

  const toggleFeatured = async (slug: string, current: boolean) => {
    try {
      const res = await fetch(`/api/episodes/${slug}/feature`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !current }),
      })
      if (!res.ok) throw new Error('toggle failed')
      setEpisodes(prev => prev.map(e => e.slug === slug ? { ...e, homepageFeatured: !current } : e))
      showToast(!current ? 'Added to homepage' : 'Removed from homepage')
    } catch {
      showToast('Could not update homepage', 'err')
    }
  }

  const fetchQuestions = useCallback(async () => {
    setQLoading(true)
    try {
      const res = await fetch('/api/ccat/questions')
      if (!res.ok) throw new Error('fetch failed')
      setQuestions(await res.json())
    } catch {
      showToast('Could not load CCAT questions', 'err')
    } finally {
      setQLoading(false)
    }
  }, [])

  useEffect(() => { if (authed) fetchQuestions() }, [authed, fetchQuestions])

  const handleQSave = async (q: CcatQuestion) => {
    setQSaving(true)
    try {
      const url = qIsNew ? '/api/ccat/questions' : `/api/ccat/questions/${q.id}`
      const method = qIsNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(q) })
      if (!res.ok) throw new Error(await res.text())
      await fetchQuestions()
      setQEditing(null)
      showToast(qIsNew ? 'Question created' : 'Question saved')
    } catch (err) {
      showToast(`Save failed: ${err}`, 'err')
    } finally {
      setQSaving(false)
    }
  }

  const handleQDelete = async () => {
    if (!qEditing?.id) return
    setQSaving(true)
    try {
      const res = await fetch(`/api/ccat/questions/${qEditing.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      await fetchQuestions()
      setQEditing(null)
      showToast('Question deleted')
    } catch (err) {
      showToast(`Delete failed: ${err}`, 'err')
    } finally {
      setQSaving(false)
    }
  }

  const handleSeed = async () => {
    if (!confirm('Import all questions from the JSON file into the database? This only works on an empty table.')) return
    setSeeding(true)
    try {
      const res = await fetch('/api/ccat/seed', { method: 'POST' })
      const data = await res.json()
      if (!data.ok) { showToast(data.message, 'err'); return }
      await fetchQuestions()
      showToast(`Seeded ${data.inserted} questions from JSON`)
    } catch (err) {
      showToast(`Seed failed: ${err}`, 'err')
    } finally {
      setSeeding(false)
    }
  }

  const triggerDeploy = async () => {
    setDeploying(true)
    try {
      const res = await fetch('/api/trigger-deploy', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      showToast('Deploy triggered — site will rebuild in ~1 min')
    } catch (err) {
      showToast(`Deploy failed: ${err}`, 'err')
    } finally {
      setDeploying(false)
    }
  }

  const filtered = episodes
    .filter(e => filterShow === 'All' || e.show === filterShow)
    .filter(e => filterStatus === 'All' || e.status === filterStatus)
    .filter(e => {
      if (!search) return true
      const q = search.toLowerCase()
      return e.guest.toLowerCase().includes(q) || e.youtubeTitle.toLowerCase().includes(q) || e.slug.includes(q)
    })

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)', paddingTop: 'calc(var(--nav-h) + 32px)', paddingBottom: 80 }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', letterSpacing: '-.03em', marginBottom: 4 }}>Episode Database</h1>
            <p style={{ color: 'var(--faint)', fontSize: '.84rem', margin: 0 }}>
              {loading ? 'Loading…' : `${episodes.length} episodes in database`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={triggerDeploy} disabled={deploying}
              style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #16a34a', background: deploying ? 'var(--bg2)' : 'transparent', color: '#16a34a', fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', opacity: deploying ? .6 : 1 }}>
              {deploying ? 'Deploying…' : '↑ Publish Site'}
            </button>
            <button onClick={() => { setIsNew(true); setEditing(blankEpisode()) }} className="btn btn-gold" style={{ fontSize: '.84rem' }}>
              + New Episode
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          {(Object.entries(STATUS_COLOR) as [Status, string][]).map(([s, c]) => {
            const count = episodes.filter(e => e.status === s).length
            return (
              <div key={s} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--border-med)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />
                <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--muted)' }}>{s}</span>
                <span style={{ fontSize: '.82rem', fontWeight: 800, color: 'var(--ink)' }}>{count}</span>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
          <input placeholder="Search guest, title, slug…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, width: 240, padding: '9px 14px', flex: 'none' }} />
          <select value={filterShow} onChange={e => setFilterShow(e.target.value as Show | 'All')}
            style={{ ...inputStyle, width: 200 }}>
            <option value="All">All Shows</option>
            {SHOWS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as Status | 'All')}
            style={{ ...inputStyle, width: 160 }}>
            <option value="All">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span style={{ fontSize: '.8rem', color: 'var(--faint)', marginLeft: 4 }}>
            {filtered.length} of {episodes.length}
          </span>
        </div>

        {/* Table */}
        <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '36px 44px 1fr 1fr 140px 110px 80px 56px', gap: 0, padding: '10px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
            {['#', '▶', 'Guest', 'Title', 'Show', 'Status', 'S·E', ''].map((h, i) => (
              <span key={i} style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', color: 'var(--faint)', fontSize: '.9rem' }}>Loading episodes…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--faint)', fontSize: '.88rem' }}>No episodes match.</div>
          ) : (
            filtered.map((ep, i) => (
              <div key={ep.slug}
                onClick={() => { setIsNew(false); setEditing({ ...ep }) }}
                style={{ display: 'grid', gridTemplateColumns: '36px 44px 1fr 1fr 140px 110px 80px 56px', gap: 0, padding: '12px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.012)', transition: 'background .12s' }}>
                <span style={{ fontSize: '.75rem', color: 'var(--faint)', fontWeight: 600, alignSelf: 'center' }}>{ep.videoNumber ?? '—'}</span>
                {/* Photo */}
                <div style={{ alignSelf: 'center' }}>
                  {ep.photo ? (
                    <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                  ) : (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${SHOW_COLOR[ep.show]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, color: SHOW_COLOR[ep.show] }}>
                      {ep.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '.86rem', fontWeight: 600, color: 'var(--ink)', alignSelf: 'center' }}>{ep.guest}</span>
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
            ))
          )}
        </div>

        {/* ── Homepage Spotlight ── */}
        <div style={{ marginTop: 48 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Homepage Spotlight</h2>
            <p style={{ fontSize: '.82rem', color: 'var(--faint)', margin: 0 }}>
              Toggle episodes to feature them on the homepage. Starred episodes appear in the spotlight section above the episode grid.
            </p>
          </div>

          {/* Featured list */}
          {episodes.filter(e => e.homepageFeatured).length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 10 }}>
                Currently Featured ({episodes.filter(e => e.homepageFeatured).length})
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {episodes.filter(e => e.homepageFeatured).map(ep => (
                  <div key={ep.slug} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'var(--bg)', border: '1.5px solid var(--terra)', maxWidth: 300 }}>
                    {ep.photo && <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%', flexShrink: 0 }} />}
                    <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--ink)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.guest}</span>
                    <button onClick={() => toggleFeatured(ep.slug, true)}
                      style={{ border: 'none', background: 'transparent', color: 'var(--faint)', cursor: 'pointer', fontSize: '.8rem', padding: '2px 4px', flexShrink: 0 }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Published episodes to pick from */}
          <div className="glass" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>
                Published Episodes — click ☆ to feature
              </span>
            </div>
            {episodes.filter(e => e.status === 'Published').map((ep, i, arr) => (
              <div key={ep.slug} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', background: ep.homepageFeatured ? 'rgba(255,27,141,.04)' : 'transparent' }}>
                <button
                  onClick={() => toggleFeatured(ep.slug, !!ep.homepageFeatured)}
                  title={ep.homepageFeatured ? 'Remove from homepage' : 'Add to homepage'}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.1rem', color: ep.homepageFeatured ? '#ff1b8d' : 'var(--faint)', padding: 0, flexShrink: 0, lineHeight: 1 }}>
                  {ep.homepageFeatured ? '★' : '☆'}
                </button>
                {ep.photo ? (
                  <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${SHOW_COLOR[ep.show]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 800, color: SHOW_COLOR[ep.show], flexShrink: 0 }}>
                    {ep.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '.86rem', fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.guest}</p>
                  <p style={{ margin: 0, fontSize: '.74rem', color: 'var(--faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.youtubeTitle}</p>
                </div>
                <span style={{ fontSize: '.7rem', fontWeight: 700, color: SHOW_COLOR[ep.show], flexShrink: 0, textAlign: 'right' }}>
                  {ep.show.replace('Life Between Titles', 'LBT').replace('Work Unscripted', 'WU').replace('Office Hours', 'OH')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CCAT Question Bank ── */}
        <div style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', letterSpacing: '-.02em', marginBottom: 4 }}>CCAT Question Bank</h2>
              <p style={{ color: 'var(--faint)', fontSize: '.84rem', margin: 0 }}>
                {qLoading ? 'Loading…' : `${questions.length} questions · ${questions.filter(q => q.active).length} active`}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {questions.length === 0 && !qLoading && (
                <button onClick={handleSeed} disabled={seeding}
                  style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid var(--terra)', background: 'transparent', color: 'var(--terra)', fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', opacity: seeding ? .6 : 1 }}>
                  {seeding ? 'Seeding…' : '↑ Import from JSON'}
                </button>
              )}
              <button onClick={() => { setQIsNew(true); setQEditing(blankQuestion()) }} className="btn btn-gold" style={{ fontSize: '.84rem' }}>
                + New Question
              </button>
            </div>
          </div>

          {/* Stats by category */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {(['Math', 'Verbal', 'Spatial'] as const).map(cat => {
              const total = questions.filter(q => q.category === cat).length
              const active = questions.filter(q => q.category === cat && q.active).length
              const color = cat === 'Math' ? '#2563eb' : cat === 'Verbal' ? '#16a34a' : '#7c3aed'
              return (
                <div key={cat} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--border-med)', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--muted)' }}>{cat}</span>
                  <span style={{ fontSize: '.82rem', fontWeight: 800, color: 'var(--ink)' }}>{active}/{total}</span>
                </div>
              )
            })}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
            <input placeholder="Search questions…" value={qSearch} onChange={e => setQSearch(e.target.value)}
              style={{ ...inputStyle, width: 260, padding: '9px 14px', flex: 'none' }} />
            <select value={qCatFilter} onChange={e => setQCatFilter(e.target.value as typeof qCatFilter)}
              style={{ ...inputStyle, width: 140 }}>
              <option value="All">All Categories</option>
              <option>Math</option>
              <option>Verbal</option>
              <option>Spatial</option>
            </select>
          </div>

          {/* Table */}
          <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '48px 80px 1fr 60px 56px', gap: 0, padding: '10px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
              {['ID', 'Category', 'Question', 'Answer', ''].map((h, i) => (
                <span key={i} style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>{h}</span>
              ))}
            </div>

            {qLoading ? (
              <div style={{ padding: 48, textAlign: 'center', color: 'var(--faint)', fontSize: '.9rem' }}>Loading questions…</div>
            ) : questions.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--faint)', fontSize: '.88rem' }}>
                No questions yet. Click <strong>↑ Import from JSON</strong> to seed from the existing file, or <strong>+ New Question</strong> to add one manually.
              </div>
            ) : (() => {
              const catColor: Record<string, string> = { Math: '#2563eb', Verbal: '#16a34a', Spatial: '#7c3aed' }
              const filtered = questions.filter(q =>
                (qCatFilter === 'All' || q.category === qCatFilter) &&
                (!qSearch || q.prompt.toLowerCase().includes(qSearch.toLowerCase()))
              )
              return filtered.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: 'var(--faint)', fontSize: '.88rem' }}>No questions match.</div>
              ) : filtered.map((q, i) => (
                <div key={q.id} onClick={() => { setQIsNew(false); setQEditing({ ...q }) }}
                  style={{ display: 'grid', gridTemplateColumns: '48px 80px 1fr 60px 56px', gap: 0, padding: '11px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', background: !q.active ? 'rgba(0,0,0,.025)' : i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.012)', transition: 'background .12s', opacity: q.active ? 1 : 0.5 }}>
                  <span style={{ fontSize: '.75rem', color: 'var(--faint)', fontWeight: 600, alignSelf: 'center' }}>{q.id}</span>
                  <span style={{ fontSize: '.72rem', fontWeight: 700, color: catColor[q.category], alignSelf: 'center' }}>{q.category}</span>
                  <span style={{ fontSize: '.84rem', color: 'var(--ink)', alignSelf: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12 }}>{q.prompt}</span>
                  <span style={{ fontSize: '.78rem', color: '#16a34a', fontWeight: 600, alignSelf: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.choices[q.correctIndex]}</span>
                  <span style={{ fontSize: '.76rem', color: 'var(--terra)', fontWeight: 700, alignSelf: 'center', textAlign: 'right', opacity: .6 }}>Edit →</span>
                </div>
              ))
            })()}
          </div>
        </div>

        {/* DB info */}
        <div style={{ marginTop: 20, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '.75rem', color: 'var(--faint)', margin: 0 }}>
            Changes save directly to the database. Click <strong style={{ color: '#16a34a' }}>↑ Publish Site</strong> to rebuild and deploy.
          </p>
          <button onClick={fetchEpisodes} style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--faint)', fontSize: '.78rem', cursor: 'pointer' }}>
            ↺ Refresh
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: toast.type === 'ok' ? '#16a34a' : '#ef4444',
          color: '#fff', padding: '12px 24px', borderRadius: 10,
          fontSize: '.88rem', fontWeight: 600, zIndex: 9999,
          boxShadow: '0 8px 24px rgba(0,0,0,.2)',
        }}>
          {toast.msg}
        </div>
      )}

      {/* Episode Drawer */}
      {editing && (
        <EpisodeDrawer ep={editing} isNew={isNew} saving={saving}
          onSave={handleSave} onDelete={handleDelete} onClose={() => setEditing(null)} />
      )}

      {/* CCAT Question Drawer */}
      {qEditing && (
        <QuestionDrawer q={qEditing} isNew={qIsNew} saving={qSaving}
          onSave={handleQSave} onDelete={handleQDelete} onClose={() => setQEditing(null)} />
      )}
    </div>
  )
}
