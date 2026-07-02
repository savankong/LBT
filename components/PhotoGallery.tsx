'use client'
import { useState } from 'react'

export default function PhotoGallery({ photos, guest, color }: { photos: string[]; guest: string; color: string }) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {photos.map((src, i) => (
          <div key={i} onClick={() => setLightbox(src)}
            style={{ flex: '1 1 200px', maxWidth: 320, borderRadius: 12, overflow: 'hidden', border: `2px solid ${color}28`, cursor: 'zoom-in' }}>
            <img src={src} alt={`${guest} ${i + 2}`} referrerPolicy="no-referrer"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
        ))}
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.88)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: 24 }}>
          <img src={lightbox} alt={guest} referrerPolicy="no-referrer"
            style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 32px 80px rgba(0,0,0,.6)' }} />
          <button onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: 20, right: 24, background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', fontSize: '1.4rem', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
        </div>
      )}
    </>
  )
}
