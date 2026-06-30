'use client'
import { useEffect } from 'react'

export default function ScrollWatcher() {
  useEffect(() => {
    const update = () => {
      document.body.classList.toggle('scrolled', window.scrollY > 10)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])
  return null
}
