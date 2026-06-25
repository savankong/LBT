export interface TranscriptBlock {
  speaker: string
  timestamp: string
  text: string
}

export interface TranscriptSection {
  anchorId: string
  label: string
  blocks: TranscriptBlock[]
}

/** Parse a raw .txt transcript into speaker blocks, then group into ~10-min sections */
export function parseTranscript(raw: string): TranscriptSection[] {
  if (!raw) return []

  const lines = raw.split('\n')
  const blocks: TranscriptBlock[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()
    // Match "Speaker Name (HH:MM:SS)" or "Speaker Name (MM:SS)"
    const headerMatch = line.match(/^(.+?)\s+\((\d{1,2}:\d{2}(?::\d{2})?)\)\s*$/)
    if (headerMatch) {
      const speaker = headerMatch[1].trim()
      const timestamp = headerMatch[2].trim()
      const textLines: string[] = []
      i++
      while (i < lines.length) {
        const next = lines[i].trim()
        if (next.match(/^(.+?)\s+\(\d{1,2}:\d{2}(?::\d{2})?\)\s*$/)) break
        if (next) textLines.push(next)
        i++
      }
      const text = textLines.join(' ').trim()
      if (text) blocks.push({ speaker, timestamp, text })
    } else {
      i++
    }
  }

  // Group into sections by ~10 minutes using first block's timestamp
  const sections: TranscriptSection[] = []
  let currentSection: TranscriptSection | null = null
  let sectionStartMinutes = -1

  for (const block of blocks) {
    const parts = block.timestamp.split(':').map(Number)
    const totalMinutes = parts.length === 3
      ? parts[0] * 60 + parts[1]
      : parts[0]

    if (!currentSection || totalMinutes - sectionStartMinutes >= 10) {
      const label = `[${block.timestamp}]`
      const anchorId = `t-${block.timestamp.replace(/:/g, '-')}`
      currentSection = { anchorId, label, blocks: [] }
      sections.push(currentSection)
      sectionStartMinutes = totalMinutes
    }
    currentSection.blocks.push(block)
  }

  return sections
}

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
