'use client'
import { useState, useEffect, useCallback } from 'react'
import { ADMIN_PASSWORD, SAVED_PW_KEY, LoginScreen, AdminShell, inputStyle, labelStyle, Field } from './AdminShell'

interface CcatQuestion {
  id?: number
  category: 'Math' | 'Verbal' | 'Spatial'
  prompt: string
  promptSvg: string
  choices: string[]
  correctIndex: number
  explanation: string
  active: boolean
}

function blankQuestion(): CcatQuestion {
  return { category: 'Math', prompt: '', promptSvg: '', choices: ['', '', '', ''], correctIndex: 0, explanation: '', active: true }
}

function QuestionDrawer({ q, onSave, onDelete, onClose, isNew, saving }: {
  q: CcatQuestion; onSave: (q: CcatQuestion) => void; onDelete: () => void
  onClose: () => void; isNew: boolean; saving: boolean
}) {
  const [form, setForm] = useState<CcatQuestion>({ ...q })
  const set = <K extends keyof CcatQuestion>(k: K, v: CcatQuestion[K]) => setForm(f => ({ ...f, [k]: v }))
  const setChoice = (i: number, v: string) => { const next = [...form.choices]; next[i] = v; set('choices', next) }
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
                <button onClick={() => { if (confirm('Delete?')) onDelete() }}
                  style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
              )}
              <button onClick={onClose} style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid var(--border-med)', background: 'transparent', color: 'var(--muted)', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => onSave(form)} className="btn btn-gold" style={{ padding: '7px 18px', fontSize: '.85rem' }} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'end' }}>
            <Field label="Category">
              <select style={inputStyle} value={form.category} onChange={e => set('category', e.target.value as CcatQuestion['category'])}>
                <option>Math</option><option>Verbal</option><option>Spatial</option>
              </select>
            </Field>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: '.84rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
              <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)}
                style={{ width: 15, height: 15, accentColor: 'var(--terra)', cursor: 'pointer' }} />
              Active
            </label>
          </div>

          <Field label="Question Prompt">
            <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical', lineHeight: 1.5 }}
              value={form.prompt} onChange={e => set('prompt', e.target.value)} placeholder="Type the question here…" />
          </Field>

          <div>
            <label style={labelStyle}>Answer Choices (select correct one)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {form.choices.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="radio" name="correct" checked={form.correctIndex === i} onChange={() => set('correctIndex', i)}
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

          <Field label="Explanation (HTML ok)">
            <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }}
              value={form.explanation} onChange={e => set('explanation', e.target.value)}
              placeholder="Explain the correct answer. <b>bold</b> supported." />
          </Field>

          <div>
            <label style={labelStyle}>SVG Visual <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--faint)' }}>(optional — paste inline SVG for spatial questions)</span></label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical', lineHeight: 1.4, fontFamily: 'monospace', fontSize: '.78rem' }}
              value={form.promptSvg} onChange={e => set('promptSvg', e.target.value)}
              placeholder='<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">…</svg>' />
            {form.promptSvg.trim().startsWith('<svg') && (
              <div style={{ marginTop: 10, padding: 12, background: 'var(--bg2)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '.7rem', color: 'var(--faint)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>Preview</p>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: form.promptSvg }} style={{ maxWidth: '100%', overflowX: 'auto' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function CcatClient() {
  const [authed, setAuthed] = useState(() => typeof window !== 'undefined' && localStorage.getItem(SAVED_PW_KEY) === ADMIN_PASSWORD)
  const [questions, setQuestions] = useState<CcatQuestion[]>([])
  const [qLoading, setQLoading] = useState(false)
  const [qSaving, setQSaving] = useState(false)
  const [qEditing, setQEditing] = useState<CcatQuestion | null>(null)
  const [qIsNew, setQIsNew] = useState(false)
  const [qSearch, setQSearch] = useState('')
  const [qCatFilter, setQCatFilter] = useState<'All' | 'Math' | 'Verbal' | 'Spatial'>('All')
  const [seeding, setSeeding] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const fetchQuestions = useCallback(async () => {
    setQLoading(true)
    try {
      const res = await fetch('/api/ccat/questions'); if (!res.ok) throw new Error('fetch failed')
      setQuestions(await res.json())
    } catch { showToast('Could not load questions', 'err') } finally { setQLoading(false) }
  }, [])

  useEffect(() => { if (authed) fetchQuestions() }, [authed, fetchQuestions])

  const handleQSave = async (q: CcatQuestion) => {
    setQSaving(true)
    try {
      const url = qIsNew ? '/api/ccat/questions' : `/api/ccat/questions/${q.id}`
      const method = qIsNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(q) })
      if (!res.ok) throw new Error(await res.text())
      await fetchQuestions(); setQEditing(null)
      showToast(qIsNew ? 'Question created' : 'Question saved')
    } catch (err) { showToast(`Save failed: ${err}`, 'err') } finally { setQSaving(false) }
  }

  const handleQDelete = async () => {
    if (!qEditing?.id) return; setQSaving(true)
    try {
      const res = await fetch(`/api/ccat/questions/${qEditing.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      await fetchQuestions(); setQEditing(null); showToast('Question deleted')
    } catch (err) { showToast(`Delete failed: ${err}`, 'err') } finally { setQSaving(false) }
  }

  const handleSeed = async () => {
    if (!confirm('Import all questions from JSON? Only works on an empty table.')) return
    setSeeding(true)
    try {
      const res = await fetch('/api/ccat/seed', { method: 'POST' })
      const data = await res.json()
      if (!data.ok) { showToast(data.message, 'err'); return }
      await fetchQuestions(); showToast(`Seeded ${data.inserted} questions`)
    } catch (err) { showToast(`Seed failed: ${err}`, 'err') } finally { setSeeding(false) }
  }

  const handleReseed = async () => {
    if (!confirm('Delete all questions and re-import from JSON?')) return
    setSeeding(true)
    try {
      const clearRes = await fetch('/api/ccat/clear', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: ADMIN_PASSWORD }) })
      if (!clearRes.ok) { showToast('Clear failed', 'err'); return }
      const seedRes = await fetch('/api/ccat/seed', { method: 'POST' })
      const data = await seedRes.json()
      if (!data.ok) { showToast(data.message, 'err'); return }
      await fetchQuestions(); showToast(`Re-seeded ${data.inserted} questions`)
    } catch (err) { showToast(`Re-seed failed: ${err}`, 'err') } finally { setSeeding(false) }
  }

  const catColor: Record<string, string> = { Math: '#2563eb', Verbal: '#16a34a', Spatial: '#7c3aed' }
  const filtered = questions.filter(q =>
    (qCatFilter === 'All' || q.category === qCatFilter) &&
    (!qSearch || q.prompt.toLowerCase().includes(qSearch.toLowerCase()))
  )

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <AdminShell toast={toast}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', letterSpacing: '-.03em', marginBottom: 4 }}>CCAT Question Bank</h1>
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
          {questions.length > 0 && (
            <button onClick={handleReseed} disabled={seeding}
              style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', opacity: seeding ? .6 : 1 }}>
              {seeding ? 'Re-seeding…' : '↺ Clear & Re-seed'}
            </button>
          )}
          <button onClick={() => { setQIsNew(true); setQEditing(blankQuestion()) }} className="btn btn-gold" style={{ fontSize: '.84rem' }}>
            + New Question
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {(['Math', 'Verbal', 'Spatial'] as const).map(cat => {
          const total = questions.filter(q => q.category === cat).length
          const active = questions.filter(q => q.category === cat && q.active).length
          return (
            <div key={cat} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--border-med)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: catColor[cat], flexShrink: 0 }} />
              <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--muted)' }}>{cat}</span>
              <span style={{ fontSize: '.82rem', fontWeight: 800 }}>{active}/{total}</span>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <input placeholder="Search questions…" value={qSearch} onChange={e => setQSearch(e.target.value)}
          style={{ ...inputStyle, width: 260, padding: '9px 14px', flex: 'none' }} />
        <select value={qCatFilter} onChange={e => setQCatFilter(e.target.value as typeof qCatFilter)} style={{ ...inputStyle, width: 140 }}>
          <option value="All">All Categories</option>
          <option>Math</option><option>Verbal</option><option>Spatial</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '48px 80px 1fr 60px 56px', padding: '10px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          {['ID', 'Category', 'Question', 'Answer', ''].map((h, i) => (
            <span key={i} style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>{h}</span>
          ))}
        </div>
        {qLoading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--faint)' }}>Loading…</div>
        ) : questions.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--faint)', fontSize: '.88rem' }}>
            No questions yet. Click <strong>↑ Import from JSON</strong> to seed, or <strong>+ New Question</strong> to add one.
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--faint)', fontSize: '.88rem' }}>No questions match.</div>
        ) : filtered.map((q, i) => (
          <div key={q.id} onClick={() => { setQIsNew(false); setQEditing({ ...q }) }}
            style={{ display: 'grid', gridTemplateColumns: '48px 80px 1fr 60px 56px', padding: '11px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', opacity: q.active ? 1 : 0.5, background: !q.active ? 'rgba(0,0,0,.025)' : i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.012)' }}>
            <span style={{ fontSize: '.75rem', color: 'var(--faint)', fontWeight: 600, alignSelf: 'center' }}>{q.id}</span>
            <span style={{ fontSize: '.72rem', fontWeight: 700, color: catColor[q.category], alignSelf: 'center' }}>{q.category}</span>
            <span style={{ fontSize: '.84rem', alignSelf: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12 }}>{q.prompt}</span>
            <span style={{ fontSize: '.78rem', color: '#16a34a', fontWeight: 600, alignSelf: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.choices[q.correctIndex]}</span>
            <span style={{ fontSize: '.76rem', color: 'var(--terra)', fontWeight: 700, alignSelf: 'center', textAlign: 'right', opacity: .6 }}>Edit →</span>
          </div>
        ))}
      </div>

      {qEditing && (
        <QuestionDrawer q={qEditing} isNew={qIsNew} saving={qSaving}
          onSave={handleQSave} onDelete={handleQDelete} onClose={() => setQEditing(null)} />
      )}
    </AdminShell>
  )
}
