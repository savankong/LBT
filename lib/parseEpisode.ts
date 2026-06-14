/** Parse a Notion Description field into structured sections */
export interface ParsedEpisode {
  intro: string
  bullets: string[]
  chapters: { time?: string; label: string }[]
}

export function parseDescription(raw: string): ParsedEpisode {
  if (!raw) return { intro: '', bullets: [], chapters: [] }

  const lines = raw.replace(/<br\s*\/?>/gi, '\n').split('\n').map(l => l.trim()).filter(Boolean)

  const intro: string[] = []
  const bullets: string[] = []
  const chapters: { time?: string; label: string }[] = []

  type Mode = 'intro' | 'bullets' | 'chapters'
  let mode: Mode = 'intro'

  for (const line of lines) {
    const lower = line.toLowerCase()

    // Section headers
    if (/^in this episode[:\s]/i.test(line) || line === 'In this episode:') {
      mode = 'bullets'; continue
    }
    if (/^chapters?$/i.test(line) || line === 'CHAPTERS') {
      mode = 'chapters'; continue
    }
    if (/^what we discuss[:\s]/i.test(line)) {
      mode = 'chapters'; continue
    }
    // Bullet items
    if (mode === 'bullets' && (line.startsWith('•') || line.startsWith('*') || line.startsWith('-'))) {
      const text = line.replace(/^[•\*\-]\s*/, '').replace(/^\\?\*/, '').trim()
      if (text) bullets.push(text)
      continue
    }
    // Timestamped chapter lines  e.g. "0:00 Intro" or "(01:07) A day..."
    if (mode === 'chapters') {
      const tsMatch = line.match(/^[\(\[]?(\d{1,2}:\d{2}(?::\d{2})?)[)\]]?\s*[–\-–·]?\s*(.+)/)
      const bulletChapter = line.match(/^[•\*\-]\s*(.+)/)
      if (tsMatch) {
        chapters.push({ time: tsMatch[1], label: tsMatch[2].trim() })
      } else if (bulletChapter) {
        chapters.push({ label: bulletChapter[1].trim() })
      }
      continue
    }
    // Skip support/social boilerplate
    if (/^(SUPPORT|MORE FROM|COMMUNITY|PARTNER|LISTEN|TOOLS)/i.test(line)) break
    if (/buymeacoffee|tealhq|online-therapy|substack\.com\/@|spotify|apple podcast/i.test(line)) continue

    if (mode === 'intro') intro.push(line)
  }

  return {
    intro: intro.join(' '),
    bullets,
    chapters,
  }
}
