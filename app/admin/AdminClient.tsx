'use client'
import { useState, useEffect, useCallback } from 'react'
import { EPISODES, type Episode, type Show, type Status } from '@/lib/episodes'

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

const STORAGE_KEY = 'lbt_admin_episodes'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function blankEpisode(): Episode {
  return {
    slug: '',
    videoNumber: undefined,
    show: 'Life Between Titles',
    season: 1,
    episode: undefined,
    guest: '',
    youtubeTitle: '',
    description: '',
    mainTags: '',
    tags: '',
    resources: '',
    status: 'Recorded',
    photo: '',
    youtubeUrl: '',
    substack: '',
  }
}

function generateTS(episodes: Episode[]): string {
  const CDN = 'https://images.squarespace-cdn.com/content/v1/69c8615fa7974634a3112367'
  const lines: string[] = []
  lines.push(`export type Show = 'Life Between Titles' | 'Work Unscripted' | 'Office Hours'`)
  lines.push(`export type Status = 'Published' | 'Recorded' | 'Scheduled' | 'Reached Out' | 'To Be Planned'`)
  lines.push(``)
  lines.push(`export interface Episode {`)
  lines.push(`  slug: string`)
  lines.push(`  videoNumber?: number`)
  lines.push(`  show: Show`)
  lines.push(`  season: number`)
  lines.push(`  episode?: number`)
  lines.push(`  guest: string`)
  lines.push(`  youtubeTitle: string`)
  lines.push(`  description: string`)
  lines.push(`  mainTags: string`)
  lines.push(`  tags: string`)
  lines.push(`  resources: string`)
  lines.push(`  status: Status`)
  lines.push(`  photo: string`)
  lines.push(`  youtubeUrl?: string`)
  lines.push(`  substack?: string`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`const CDN = '${CDN}'`)
  lines.push(``)
  lines.push(`export const EPISODES: Episode[] = [`)
  for (const ep of episodes) {
    lines.push(`  {`)
    lines.push(`    slug: ${JSON.stringify(ep.slug)},`)
    if (ep.videoNumber !== undefined) lines.push(`    videoNumber: ${ep.videoNumber},`)
    else lines.push(`    videoNumber: undefined,`)
    lines.push(`    show: ${JSON.stringify(ep.show)},`)
    lines.push(`    season: ${ep.season},`)
    if (ep.episode !== undefined) lines.push(`    episode: ${ep.episode},`)
    else lines.push(`    episode: undefined,`)
    lines.push(`    guest: ${JSON.stringify(ep.guest)},`)
    lines.push(`    youtubeTitle: ${JSON.stringify(ep.youtubeTitle)},`)
    const desc = ep.description.replace(/`/g, '\\`').replace(/\${/g, '\\${')
    lines.push(`    description: \`${desc}\`,`)
    lines.push(`    mainTags: ${JSON.stringify(ep.mainTags)},`)
    lines.push(`    tags: ${JSON.stringify(ep.tags)},`)
    lines.push(`    resources: ${JSON.stringify(ep.resources)},`)
    lines.push(`    status: ${JSON.stringify(ep.status)},`)
    lines.push(`    photo: ${JSON.stringify(ep.photo)},`)
    if (ep.youtubeUrl) lines.push(`    youtubeUrl: ${JSON.stringify(ep.youtubeUrl)},`)
    if (ep.substack) lines.push(`    substack: ${JSON.stringify(ep.substack)},`)
    lines.push(`  },`)
  }
  lines.push(`]`)
  lines.push(``)
  lines.push(`export const PUBLISHED = EPISODES.filter(e => e.status === 'Published')`)
  lines.push(`export const BY_SHOW = (show: Show) => EPISODES.filter(e => e.show === show)`)
  lines.push(`export const BY_SLUG = (slug: string) => EPISODES.find(e => e.slug === slug)`)
  lines.push(``)
  lines.push(`export function getAdjacentEpisodes(slug: string) {`)
  lines.push(`  const sorted = [...EPISODES].sort((a, b) => (a.videoNumber ?? 999) - (b.videoNumber ?? 999))`)
  lines.push(`  const idx = sorted.findIndex(e => e.slug === slug)`)
  lines.push(`  return {`)
  lines.push(`    prev: idx > 0 ? sorted[idx - 1] : null,`)
  lines.push(`    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,`)
  lines.push(`  }`)
  lines.push(`}`)
  return lines.join('\n')
}

// ── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'var(--bg2)',paddingTop:'var(--nav-h)'}}>
      <div className="glass" style={{borderRadius:20,padding:'48px 40px',width:'100%',maxWidth:360,textAlign:'center'}}>
        <h2 style={{marginBottom:8,fontSize:'1.4rem'}}>Admin</h2>
        <p style={{color:'var(--faint)',fontSize:'.85rem',marginBottom:32}}>Life Between Titles episode manager</p>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false) }}
          onKeyDown={e => { if (e.key === 'Enter') { if (pw === ADMIN_PASSWORD) onLogin(); else setErr(true) } }}
          style={{width:'100%',padding:'12px 16px',borderRadius:10,border:`1.5px solid ${err ? '#ef4444' : 'var(--border-med)'}`,
            fontSize:'1rem',marginBottom:12,boxSizing:'border-box',background:'var(--bg)',color:'var(--ink)',outline:'none'}}
          autoFocus
        />
        {err && <p style={{color:'#ef4444',fontSize:'.8rem',marginBottom:12}}>Incorrect password</p>}
        <button
          onClick={() => { if (pw === ADMIN_PASSWORD) onLogin(); else setErr(true) }}
          className="btn btn-gold" style={{width:'100%'}}>
          Enter
        </button>
      </div>
    </div>
  )
}

// ── Field components ──────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 8,
  border: '1.5px solid var(--border-med)', fontSize: '.88rem',
  background: 'var(--bg)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '.72rem', fontWeight: 700,
  letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 5,
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

// ── Episode Form (drawer) ─────────────────────────────────────────────────────
function EpisodeDrawer({
  ep, onSave, onDelete, onClose, isNew,
}: {
  ep: Episode
  onSave: (ep: Episode) => void
  onDelete: () => void
  onClose: () => void
  isNew: boolean
}) {
  const [form, setForm] = useState<Episode>({ ...ep })
  const set = (k: keyof Episode, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  // Auto-generate slug from guest name when adding new
  useEffect(() => {
    if (isNew && form.guest && !form.slug) {
      set('slug', slugify(form.guest))
    }
  }, [form.guest, isNew, form.slug])

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',zIndex:999}} />
      {/* Drawer */}
      <div style={{
        position:'fixed',top:0,right:0,bottom:0,width:'min(680px,100vw)',
        background:'var(--bg)',overflowY:'auto',zIndex:1000,
        boxShadow:'-24px 0 64px rgba(0,0,0,.18)',
        display:'flex',flexDirection:'column',
      }}>
        {/* Header */}
        <div style={{padding:'24px 28px 20px',borderBottom:'1px solid var(--border)',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          position:'sticky',top:0,background:'var(--bg)',zIndex:10}}>
          <h3 style={{margin:0,fontSize:'1.05rem'}}>{isNew ? 'New Episode' : `Edit: ${form.guest}`}</h3>
          <div style={{display:'flex',gap:10}}>
            {!isNew && (
              <button onClick={() => { if (confirm('Delete this episode?')) onDelete() }}
                style={{padding:'7px 14px',borderRadius:8,border:'1.5px solid #ef4444',
                  background:'transparent',color:'#ef4444',fontSize:'.8rem',fontWeight:600,cursor:'pointer'}}>
                Delete
              </button>
            )}
            <button onClick={onClose}
              style={{padding:'7px 14px',borderRadius:8,border:'1.5px solid var(--border-med)',
                background:'transparent',color:'var(--muted)',fontSize:'.8rem',fontWeight:600,cursor:'pointer'}}>
              Cancel
            </button>
            <button onClick={() => onSave(form)} className="btn btn-gold" style={{padding:'7px 18px',fontSize:'.85rem'}}>
              Save
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{padding:'28px',flex:1}}>
          {/* Identity */}
          <div style={{marginBottom:24,paddingBottom:24,borderBottom:'1px solid var(--border)'}}>
            <p style={{...labelStyle,color:'var(--terra)',marginBottom:16}}>Identity</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <Field label="Guest *">
                <input style={inputStyle} value={form.guest} onChange={e => set('guest', e.target.value)} />
              </Field>
              <Field label="Slug *">
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
              <Field label="Video Number">
                <input style={inputStyle} type="number" value={form.videoNumber ?? ''} onChange={e => set('videoNumber', e.target.value ? Number(e.target.value) : undefined)} />
              </Field>
            </div>
          </div>

          {/* Content */}
          <div style={{marginBottom:24,paddingBottom:24,borderBottom:'1px solid var(--border)'}}>
            <p style={{...labelStyle,color:'var(--terra)',marginBottom:16}}>Content</p>
            <Field label="YouTube Title *">
              <input style={inputStyle} value={form.youtubeTitle} onChange={e => set('youtubeTitle', e.target.value)} />
            </Field>
            <Field label="Description (supports In this episode: bullets + CHAPTERS timestamps)">
              <textarea
                style={{...inputStyle,minHeight:220,fontFamily:'monospace',fontSize:'.8rem',resize:'vertical',lineHeight:1.6}}
                value={form.description}
                onChange={e => set('description', e.target.value)}
              />
            </Field>
            <Field label="Main Tags (space-separated #tags)">
              <input style={inputStyle} value={form.mainTags} onChange={e => set('mainTags', e.target.value)} />
            </Field>
            <Field label="Tags">
              <input style={inputStyle} value={form.tags} onChange={e => set('tags', e.target.value)} />
            </Field>
            <Field label="Resources (separate items with |)">
              <textarea style={{...inputStyle,minHeight:80,resize:'vertical'}} value={form.resources} onChange={e => set('resources', e.target.value)} />
            </Field>
          </div>

          {/* Media */}
          <div>
            <p style={{...labelStyle,color:'var(--terra)',marginBottom:16}}>Media & Links</p>
            <Field label="Photo URL">
              <input style={inputStyle} value={form.photo} onChange={e => set('photo', e.target.value)} />
              {form.photo && (
                <img src={form.photo} alt="preview" referrerPolicy="no-referrer"
                  style={{width:80,height:80,objectFit:'cover',borderRadius:10,marginTop:8,border:'2px solid var(--border)'}} />
              )}
            </Field>
            <Field label="YouTube URL">
              <input style={inputStyle} value={form.youtubeUrl ?? ''} onChange={e => set('youtubeUrl', e.target.value)} />
            </Field>
            <Field label="Substack Post URL">
              <input style={inputStyle} value={form.substack ?? ''} onChange={e => set('substack', e.target.value)} />
            </Field>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Export Modal ──────────────────────────────────────────────────────────────
function ExportModal({ ts, onClose }: { ts: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(ts)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const download = () => {
    const blob = new Blob([ts], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'episodes.ts'; a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:999}} />
      <div style={{position:'fixed',inset:'5%',background:'var(--bg)',borderRadius:20,zIndex:1000,
        display:'flex',flexDirection:'column',boxShadow:'0 32px 80px rgba(0,0,0,.3)'}}>
        <div style={{padding:'20px 24px',borderBottom:'1px solid var(--border)',
          display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <h3 style={{margin:0,fontSize:'1rem'}}>Export episodes.ts</h3>
            <p style={{margin:0,fontSize:'.78rem',color:'var(--faint)',marginTop:3}}>
              Replace <code>lib/episodes.ts</code> in your project with this file
            </p>
          </div>
          <div style={{display:'flex',gap:10}}>
            <button onClick={download} className="btn btn-glass" style={{fontSize:'.82rem',padding:'7px 16px'}}>
              Download
            </button>
            <button onClick={copy} className="btn btn-gold" style={{fontSize:'.82rem',padding:'7px 16px'}}>
              {copied ? '✓ Copied!' : 'Copy to clipboard'}
            </button>
            <button onClick={onClose} style={{padding:'7px 12px',borderRadius:8,border:'1.5px solid var(--border-med)',
              background:'transparent',color:'var(--muted)',cursor:'pointer',fontSize:'.82rem'}}>✕</button>
          </div>
        </div>
        <pre style={{flex:1,overflow:'auto',padding:'20px 24px',margin:0,
          fontSize:'.72rem',lineHeight:1.6,color:'var(--ink)',fontFamily:'monospace',background:'var(--bg2)'}}>
          {ts}
        </pre>
      </div>
    </>
  )
}

// ── Main Admin UI ─────────────────────────────────────────────────────────────
export default function AdminClient() {
  const [authed, setAuthed] = useState(false)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [editing, setEditing] = useState<Episode | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [search, setSearch] = useState('')
  const [filterShow, setFilterShow] = useState<Show | 'All'>('All')
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All')
  const [showExport, setShowExport] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load episodes from localStorage or source
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try { setEpisodes(JSON.parse(stored)); return } catch {}
    }
    setEpisodes(EPISODES.map(e => ({ ...e })))
  }, [])

  const persist = useCallback((eps: Episode[]) => {
    setEpisodes(eps)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eps))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [])

  const handleSave = (ep: Episode) => {
    if (isNew) {
      persist([...episodes, ep])
    } else {
      persist(episodes.map(e => e.slug === editing!.slug ? ep : e))
    }
    setEditing(null)
  }

  const handleDelete = () => {
    persist(episodes.filter(e => e.slug !== editing!.slug))
    setEditing(null)
  }

  const resetToSource = () => {
    if (!confirm('Reset to source data? All unsaved admin changes will be lost.')) return
    localStorage.removeItem(STORAGE_KEY)
    setEpisodes(EPISODES.map(e => ({ ...e })))
  }

  const filtered = episodes
    .filter(e => filterShow === 'All' || e.show === filterShow)
    .filter(e => filterStatus === 'All' || e.status === filterStatus)
    .filter(e => {
      if (!search) return true
      const q = search.toLowerCase()
      return e.guest.toLowerCase().includes(q) || e.youtubeTitle.toLowerCase().includes(q) || e.slug.includes(q)
    })
    .sort((a, b) => (b.videoNumber ?? 0) - (a.videoNumber ?? 0))

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <div style={{minHeight:'100vh',background:'var(--bg2)',paddingTop:'calc(var(--nav-h) + 32px)',paddingBottom:80}}>
      <div className="container">

        {/* Header */}
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',
          flexWrap:'wrap',gap:16,marginBottom:32}}>
          <div>
            <h1 style={{fontSize:'1.8rem',letterSpacing:'-.03em',marginBottom:4}}>Episode Manager</h1>
            <p style={{color:'var(--faint)',fontSize:'.84rem',margin:0}}>
              {episodes.length} episodes · edits save locally
              {saved && <span style={{color:'#16a34a',marginLeft:8,fontWeight:600}}>✓ Saved</span>}
            </p>
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button onClick={resetToSource}
              style={{padding:'9px 16px',borderRadius:8,border:'1.5px solid var(--border-med)',
                background:'transparent',color:'var(--muted)',fontSize:'.82rem',fontWeight:600,cursor:'pointer'}}>
              Reset to source
            </button>
            <button onClick={() => setShowExport(true)} className="btn btn-glass" style={{fontSize:'.84rem'}}>
              Export episodes.ts
            </button>
            <button onClick={() => { setIsNew(true); setEditing(blankEpisode()) }} className="btn btn-gold" style={{fontSize:'.84rem'}}>
              + New Episode
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:20,alignItems:'center'}}>
          <input
            placeholder="Search guest, title, slug…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{...inputStyle,width:240,padding:'9px 14px',flex:'none'}}
          />
          <select value={filterShow} onChange={e => setFilterShow(e.target.value as Show | 'All')} style={inputStyle as React.CSSProperties & {width:string}}>
            <option value="All">All Shows</option>
            {SHOWS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as Status | 'All')} style={inputStyle as React.CSSProperties & {width:string}}>
            <option value="All">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span style={{fontSize:'.8rem',color:'var(--faint)',marginLeft:4}}>
            {filtered.length} of {episodes.length}
          </span>
        </div>

        {/* Table */}
        <div className="glass" style={{borderRadius:16,overflow:'hidden'}}>
          {/* Column headers */}
          <div style={{display:'grid',
            gridTemplateColumns:'32px 1fr 1fr 120px 100px 80px 56px',
            gap:0,padding:'10px 20px',
            borderBottom:'1px solid var(--border)',
            background:'var(--bg2)'}}>
            {['#', 'Guest', 'Title', 'Show', 'Status', 'S·E', ''].map((h, i) => (
              <span key={i} style={{fontSize:'.68rem',fontWeight:700,letterSpacing:'.06em',
                textTransform:'uppercase',color:'var(--faint)'}}>{h}</span>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{padding:40,textAlign:'center',color:'var(--faint)',fontSize:'.88rem'}}>
              No episodes match your filters.
            </div>
          ) : (
            filtered.map((ep, i) => (
              <div key={ep.slug}
                onClick={() => { setIsNew(false); setEditing({ ...ep }) }}
                style={{
                  display:'grid',
                  gridTemplateColumns:'32px 1fr 1fr 120px 100px 80px 56px',
                  gap:0,padding:'13px 20px',
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor:'pointer',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.015)',
                  transition:'background .12s',
                }}>
                {/* # */}
                <span style={{fontSize:'.75rem',color:'var(--faint)',fontWeight:600,alignSelf:'center'}}>
                  {ep.videoNumber ?? '—'}
                </span>
                {/* Guest */}
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  {ep.photo ? (
                    <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer"
                      style={{width:32,height:32,borderRadius:'50%',objectFit:'cover',flexShrink:0}} />
                  ) : (
                    <div style={{width:32,height:32,borderRadius:'50%',flexShrink:0,
                      background:`${SHOW_COLOR[ep.show]}18`,display:'flex',alignItems:'center',
                      justifyContent:'center',fontSize:'.72rem',fontWeight:800,color:SHOW_COLOR[ep.show]}}>
                      {ep.guest.split(' ').map(w => w[0]).join('').slice(0,2)}
                    </div>
                  )}
                  <span style={{fontSize:'.86rem',fontWeight:600,color:'var(--ink)'}}>{ep.guest}</span>
                </div>
                {/* Title */}
                <span style={{fontSize:'.82rem',color:'var(--muted)',overflow:'hidden',
                  textOverflow:'ellipsis',whiteSpace:'nowrap',paddingRight:12,alignSelf:'center'}}>
                  {ep.youtubeTitle}
                </span>
                {/* Show */}
                <span style={{fontSize:'.72rem',fontWeight:700,color:SHOW_COLOR[ep.show],alignSelf:'center',
                  overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                  {ep.show.replace('Life Between Titles','LBT').replace('Work Unscripted','WU').replace('Office Hours','OH')}
                </span>
                {/* Status */}
                <span style={{fontSize:'.7rem',fontWeight:700,letterSpacing:'.03em',
                  color:STATUS_COLOR[ep.status],alignSelf:'center'}}>
                  {ep.status}
                </span>
                {/* S·E */}
                <span style={{fontSize:'.75rem',color:'var(--faint)',alignSelf:'center',fontWeight:600}}>
                  {ep.season ? `S${ep.season}` : ''}
                  {ep.episode ? `·E${ep.episode}` : ''}
                </span>
                {/* Edit button */}
                <span style={{fontSize:'.76rem',color:'var(--terra)',fontWeight:700,
                  alignSelf:'center',textAlign:'right',opacity:.6}}>Edit →</span>
              </div>
            ))
          )}
        </div>

        <p style={{fontSize:'.75rem',color:'var(--faint)',marginTop:20,textAlign:'center',lineHeight:1.6}}>
          Changes are saved to browser storage only. Click <strong>Export episodes.ts</strong> to download
          the updated file, then replace <code>lib/episodes.ts</code> in your project and redeploy.
        </p>
      </div>

      {/* Drawers / Modals */}
      {editing && (
        <EpisodeDrawer
          ep={editing}
          isNew={isNew}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setEditing(null)}
        />
      )}
      {showExport && (
        <ExportModal ts={generateTS(episodes)} onClose={() => setShowExport(false)} />
      )}
    </div>
  )
}
