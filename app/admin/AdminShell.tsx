'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'lbt2025'
export const SAVED_PW_KEY = 'lbt_admin_pw'

export const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 8,
  border: '1.5px solid var(--border-med)', fontSize: '.88rem',
  background: 'var(--bg)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
}
export const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '.72rem', fontWeight: 700,
  letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 5,
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {hint && <p style={{ fontSize: '.72rem', color: 'var(--faint)', marginBottom: 6, marginTop: -2 }}>{hint}</p>}
      {children}
    </div>
  )
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
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
        <p style={{ color: 'var(--faint)', fontSize: '.85rem', marginBottom: 32 }}>Life Between Titles</p>
        <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(false) }}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="Password" autoFocus
          style={{ ...inputStyle, marginBottom: 12, textAlign: 'center', letterSpacing: '.15em' }} />
        {err && <p style={{ color: '#ef4444', fontSize: '.8rem', marginBottom: 8 }}>Wrong password</p>}
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20, cursor: 'pointer', fontSize: '.82rem', color: 'var(--muted)' }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: 'var(--terra)' }} />
          Remember me
        </label>
        <button onClick={check} className="btn btn-gold" style={{ width: '100%' }}>Enter</button>
      </div>
    </div>
  )
}

const TABS = [
  { label: 'Episodes', href: '/admin' },
  { label: 'Spotlight', href: '/admin/spotlight' },
  { label: 'CCAT', href: '/admin/ccat' },
]

export function AdminShell({ children, toast }: { children: React.ReactNode; toast?: { msg: string; type: 'ok' | 'err' } | null }) {
  const path = usePathname()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)', paddingTop: 'calc(var(--nav-h) + 24px)', paddingBottom: 80 }}>
      {/* Tab nav */}
      <div style={{ borderBottom: '1px solid var(--border)', marginBottom: 32, background: 'var(--bg)' }}>
        <div className="container" style={{ display: 'flex', gap: 0 }}>
          {TABS.map(t => {
            const active = t.href === '/admin' ? path === '/admin' : path.startsWith(t.href)
            return (
              <Link key={t.href} href={t.href} style={{
                display: 'inline-block', padding: '14px 24px',
                fontSize: '.85rem', fontWeight: 700, textDecoration: 'none',
                color: active ? 'var(--terra)' : 'var(--muted)',
                borderBottom: active ? '2.5px solid var(--terra)' : '2.5px solid transparent',
                transition: 'color .15s',
              }}>
                {t.label}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="container">
        {children}
      </div>

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
    </div>
  )
}
