import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEpisodes, getEpisode, getAdjacentEpisodesDB } from '@/lib/episodes-db'
import { parseDescription, parseTranscript } from '@/lib/parseEpisode'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const ep = await getEpisode(slug)
  if (!ep) return {}
  const title = ep.guest !== 'Savan Kong'
    ? `${ep.guest} on ${ep.show} | Life Between Titles`
    : ep.youtubeTitle
  const description = ep.description
    ? ep.description.replace(/<br\s*\/?>/gi, ' ').slice(0, 200).trim() + '…'
    : `${ep.guest} on Life Between Titles. ${ep.show}, Season ${ep.season}${ep.episode ? `, Episode ${ep.episode}` : ''}.`
  return {
    title,
    description,
    alternates: { canonical: `https://www.lifebetweentitles.com/shows/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      images: ep.photo ? [{ url: ep.photo.startsWith('/') ? `https://www.lifebetweentitles.com${ep.photo}` : ep.photo, alt: ep.guest }] : [],
    },
    twitter: { card: ep.photo ? 'summary_large_image' : 'summary', title, description },
  }
}

const SHOW_COLOR: Record<string, string> = {
  'Life Between Titles': '#ff1b8d',
  'Work Unscripted': '#00e0ff',
  'Office Hours': '#ffb800',
}

const SPOTIFY_SHOW_URL = 'https://open.spotify.com/show/1olZo0VDvHh9w0F2D2vEir?si=y2sfmQ5DTPiC8EzS4_iBqQ'

const PLATFORM_ICON: Record<string, string> = {
  Spotify: '🎧',
  'Apple Podcasts': '🎙',
  'Amazon Music': '🎵',
  YouTube: '▶',
  Substack: '✉',
}

function getYoutubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/\s]{11})/)
  return match ? match[1] : null
}


export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ep = await getEpisode(slug)
  if (!ep) notFound()

  const color = SHOW_COLOR[ep.show] ?? 'var(--terra)'
  const allTags = [ep.mainTags, ep.tags].filter(Boolean).join(' ').split(' ').filter(t => t.startsWith('#'))
  const { intro, bullets, chapters } = parseDescription(ep.description)
  const { prev, next } = await getAdjacentEpisodesDB(slug)
  const youtubeId = ep.youtubeUrl ? getYoutubeId(ep.youtubeUrl) : null

  const allEpisodes = await getEpisodes()
  const related = allEpisodes
    .filter(e => e.slug !== ep.slug && e.show === ep.show && e.status === 'Published')
    .slice(0, 3)

  let transcriptSections: ReturnType<typeof parseTranscript> = []
  if (ep.transcriptFile) {
    try {
      const txPath = path.join(process.cwd(), 'content', 'transcripts', ep.transcriptFile)
      const raw = fs.readFileSync(txPath, 'utf-8')
      transcriptSections = parseTranscript(raw)
    } catch {
      // transcript not found — skip
    }
  }

  const platforms = [
    { label: 'Spotify', href: ep.spotifyUrl || SPOTIFY_SHOW_URL },
    ep.appleUrl ? { label: 'Apple Podcasts', href: ep.appleUrl } : null,
    ep.amazonUrl ? { label: 'Amazon Music', href: ep.amazonUrl } : null,
    ep.youtubeUrl ? { label: 'YouTube', href: ep.youtubeUrl } : null,
    ep.substack ? { label: 'Substack', href: ep.substack } : null,
  ].filter(Boolean) as { label: string; href: string }[]

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lifebetweentitles.com' },
      { '@type': 'ListItem', position: 2, name: 'Episodes', item: 'https://www.lifebetweentitles.com/shows' },
      { '@type': 'ListItem', position: 3, name: ep.youtubeTitle, item: `https://www.lifebetweentitles.com/shows/${slug}` },
    ],
  }
  const episodeLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: ep.youtubeTitle,
    description: intro || undefined,
    partOfSeries: { '@type': 'PodcastSeries', name: ep.show, url: 'https://www.lifebetweentitles.com/shows' },
    episodeNumber: ep.episode,
    url: `https://www.lifebetweentitles.com/shows/${slug}`,
    image: ep.photo ? (ep.photo.startsWith('/') ? `https://www.lifebetweentitles.com${ep.photo}` : ep.photo) : undefined,
    associatedMedia: [{ '@type': 'AudioObject', contentUrl: ep.spotifyUrl || SPOTIFY_SHOW_URL }],
    ...(ep.appleUrl ? { sameAs: ep.appleUrl } : {}),
    ...(ep.guest !== 'Savan Kong' ? { actor: { '@type': 'Person', name: ep.guest, ...(ep.guestBio ? { description: ep.guestBio } : {}) } } : {}),
    ...(transcriptSections.length > 0 ? { speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#transcript'] } } : {}),
  }
  const faqLd = ep.faq && ep.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ep.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      {/* ── Quote + Photo Hero ── */}
      <div style={{
        paddingTop: 'var(--nav-h)',
        background: `${color}0f`,
        borderBottom: `1px solid ${color}28`,
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(40px,7vw,80px) clamp(24px,5vw,48px)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(32px,5vw,72px)',
          flexWrap: 'wrap',
        }}>
          {/* Photo */}
          {ep.photo && (
            <div style={{
              flexShrink: 0,
              width: 'clamp(160px,22vw,260px)',
              height: 'clamp(160px,22vw,260px)',
              borderRadius: '50%',
              overflow: 'hidden',
              border: `4px solid ${color}`,
              boxShadow: `0 8px 32px ${color}30`,
            }}>
              <img
                src={ep.photo}
                alt={ep.guest}
                referrerPolicy="no-referrer"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
          )}
          {/* Quote */}
          <div style={{ flex: 1, minWidth: 240 }}>
            {ep.quote ? (
              <>
                <div style={{
                  fontSize: 'clamp(2.5rem,5vw,5rem)',
                  lineHeight: 0.8,
                  color,
                  fontFamily: 'Georgia, serif',
                  marginBottom: '0.2em',
                  opacity: 0.5,
                }}>&ldquo;</div>
                <blockquote style={{
                  margin: 0,
                  fontSize: 'clamp(1.1rem,2.2vw,1.7rem)',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                  color: 'var(--ink)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 400,
                }}>
                  {ep.quote}
                </blockquote>
                <div style={{
                  marginTop: 'clamp(16px,2.5vw,28px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{ display: 'inline-block', width: 32, height: 2, background: color, opacity: 0.6, borderRadius: 2 }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color,
                  }}>{ep.guest}</span>
                </div>
              </>
            ) : (
              <div style={{ fontSize: 'clamp(1.4rem,3vw,2.2rem)', fontWeight: 700, color: 'var(--ink)' }}>
                {ep.guest}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Additional Photos ── */}
      {ep.additionalPhotos && ep.additionalPhotos.length > 0 && (
        <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: 'clamp(24px,4vw,48px) clamp(24px,5vw,48px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {ep.additionalPhotos.map((src, i) => (
              <div key={i} style={{ flex: '1 1 200px', maxWidth: 320, borderRadius: 12, overflow: 'hidden', border: `2px solid ${color}28` }}>
                <img src={src} alt={`${ep.guest} ${i + 2}`} referrerPolicy="no-referrer"
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Prev / Next nav ── */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px clamp(20px,5vw,48px)', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {prev ? (
            <Link href={`/shows/${prev.slug}`} className="ep-nav-link" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>← Prev</Link>
          ) : <span />}
          <span style={{ color: 'var(--faint)', textAlign: 'center' }}>
            {ep.show}{ep.season && ep.episode ? ` · S${String(ep.season).padStart(2,'0')} E${String(ep.episode).padStart(2,'0')}` : ''}
          </span>
          {next ? (
            <Link href={`/shows/${next.slug}`} className="ep-nav-link" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Next →</Link>
          ) : <span />}
        </div>
      </div>

      {/* ── Coming Soon banner ── */}
      {(ep.status as string).toLowerCase() !== 'published' && (
        <div style={{ background: `${color}10`, borderBottom: `1px solid ${color}28` }}>
          <div style={{ maxWidth: 1140, margin: '0 auto', padding: '20px clamp(20px,5vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '.65rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color, background: `${color}20`, padding: '4px 10px', borderRadius: 100, border: `1px solid ${color}40`, whiteSpace: 'nowrap' }}>
                Coming Soon
              </span>
              <p style={{ fontSize: '.88rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                This episode hasn&apos;t dropped yet. Subscribe to get notified when it&apos;s out.
              </p>
            </div>
            <a
              href="https://lifebetweentitles.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ fontSize: '.78rem', padding: '9px 20px', whiteSpace: 'nowrap' }}
            >
              Subscribe for Updates →
            </a>
          </div>
        </div>
      )}

      {/* ── Title / Header ── */}
      <div style={{ background: 'var(--bg)', paddingTop: 40, paddingBottom: 36, borderBottom: '1px solid var(--border)' }}>
        <div className="ep-detail-header" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color }}>{ep.show}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.35rem,3vw,2.2rem)', lineHeight: 1.18, letterSpacing: '-.02em', marginBottom: ep.guest !== 'Savan Kong' ? 12 : 0, textTransform: 'uppercase', maxWidth: 800, margin: '0 auto' }}>
            {ep.youtubeTitle}
          </h1>
          {ep.guest !== 'Savan Kong' && (
            <p style={{ fontSize: '.95rem', fontWeight: 600, color: 'var(--muted)', marginTop: 12, marginBottom: 0 }}>with {ep.guest}</p>
          )}

          {/* Platform pills — always visible, especially useful on mobile */}
          {platforms.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 24 }}>
              {platforms.map(p => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer sponsored" className="platform-pill"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 100, fontSize: '.74rem', fontWeight: 700, letterSpacing: '.04em', color: 'var(--ink)' }}>
                  {PLATFORM_ICON[p.label] && <span style={{ fontSize: '.8rem' }}>{PLATFORM_ICON[p.label]}</span>}
                  {p.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── 2-col content layout ── */}
      <div style={{ background: 'var(--bg)' }}>
        <div className="ep-layout">

          {/* ── LEFT: main content ── */}
          <div className="ep-main">

            {intro && <p style={{ fontSize: '1.02rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 44 }}>{intro}</p>}

            {ep.keyInsights && ep.keyInsights.length > 0 && (
              <div style={{ marginBottom: 44 }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>Key Takeaways</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {ep.keyInsights.map((insight, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '.97rem', lineHeight: 1.7, color: 'var(--muted)' }}>
                      <span style={{ color, fontWeight: 700, flexShrink: 0, marginTop: 3 }}>→</span>
                      {typeof insight === 'string' ? insight : (
                        <span><strong style={{ color: 'var(--ink)' }}>{(insight as {heading:string;body:string}).heading}:</strong> {(insight as {heading:string;body:string}).body}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {bullets.length > 0 && (
              <div style={{ marginBottom: 44 }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>In This Episode</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {bullets.map((b, i) => (
                    <li key={i} style={{ fontSize: '.97rem', lineHeight: 1.65, color: 'var(--muted)', paddingLeft: 16, borderLeft: `2px solid ${color}` }}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {ep.substack && (
              <div style={{ borderRadius: 12, padding: '24px 28px', marginBottom: 44, background: `${color}08`, border: `1px solid ${color}28`, borderLeft: `3px solid ${color}` }}>
                <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color, marginBottom: 8 }}>Full Essay</p>
                <p style={{ fontSize: '.92rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 14 }}>We turned this conversation into a long-form essay. More context, more depth, and the moments that didn&apos;t make the edit.</p>
                <a href={ep.substack} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ fontSize: '.8rem', padding: '10px 20px' }}>Read on Substack →</a>
              </div>
            )}

            {chapters.length > 0 && (
              <div style={{ marginBottom: 44 }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>What We Discuss</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {chapters.map((ch, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '10px 0', borderBottom: i < chapters.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      {ch.time && <span style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums', fontSize: '.76rem', fontWeight: 700, color, minWidth: 44 }}>{ch.time}</span>}
                      <span style={{ fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.55 }}>{ch.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {ep.faq && ep.faq.length > 0 && (
              <div style={{ marginBottom: 44 }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 4 }}>Q&amp;A</p>
                <p style={{ fontSize: '.8rem', color: 'var(--faint)', marginBottom: 22 }}>Questions answered in this episode</p>
                {ep.faq.map(({ q, a }, i) => (
                  <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 22, paddingBottom: 22 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 10, lineHeight: 1.45, letterSpacing: '-.01em', fontFamily: 'inherit' }}>{q}</h3>
                    <p style={{ fontSize: '.92rem', lineHeight: 1.82, color: 'var(--muted)', margin: 0 }}>{a}</p>
                  </div>
                ))}
              </div>
            )}

            {ep.guestBio && ep.guest !== 'Savan Kong' && (
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, marginBottom: 44 }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>About {ep.guest}</p>
                <p style={{ fontSize: '.92rem', lineHeight: 1.82, color: 'var(--muted)' }}>{ep.guestBio}</p>
              </div>
            )}

            {allTags.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                {allTags.map(t => (
                  <span key={t} style={{ padding: '5px 12px', borderRadius: 20, fontSize: '.73rem', fontWeight: 600, background: 'var(--terra-dim)', color: 'var(--terra)' }}>{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: sidebar ── */}
          <aside className="ep-sidebar">

            {/* Listen & Watch */}
            {platforms.length > 0 && (
              <div className="ep-sidebar-box">
                <p className="ep-sidebar-label">Listen &amp; Watch</p>
                <div className="ep-sidebar-pills">
                  {platforms.map(p => (
                    <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="ep-sidebar-pill">
                      <span className="ep-sidebar-pill-icon">{PLATFORM_ICON[p.label] ?? '🔗'}</span>
                      {p.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Support LBT */}
            <div className="ep-sidebar-box">
              <p className="ep-sidebar-label">Support LBT</p>
              <div className="ep-sidebar-pills">
                <p style={{ fontSize: '.84rem', lineHeight: 1.55, color: 'var(--muted)', margin: '0 0 4px' }}>Enjoying the show? Buy a coffee or become a monthly member. Every bit helps keep these conversations free.</p>
                <a href="https://buymeacoffee.com/lifebtwtitles" target="_blank" rel="noopener noreferrer" className="ep-sidebar-pill">
                  <span className="ep-sidebar-pill-icon">☕</span>
                  Support LBT
                </a>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* ── Transcript accordion ── */}
      {transcriptSections.length > 0 && (
        <div className="ep-transcript" id="transcript">
          <div className="ep-transcript-inner">
            <details className="ep-transcript-details">
              <summary>
                <div className="ep-transcript-summary-left">
                  <span className="ep-transcript-title">Full Transcript</span>
                  <span className="ep-transcript-hint">Lightly edited for readability · click to expand</span>
                </div>
                <span className="ep-transcript-toggle" aria-hidden="true">↓</span>
              </summary>

              <div className="ep-transcript-body">
                {transcriptSections.length > 1 && (
                  <div className="ep-transcript-anchors">
                    {transcriptSections.map(sec => (
                      <a key={sec.anchorId} href={`#${sec.anchorId}`} className="ep-transcript-anchor"
                        style={{ background: `${color}14`, color }}>
                        {sec.label}
                      </a>
                    ))}
                  </div>
                )}
                <article style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                  {transcriptSections.map(sec => (
                    <div key={sec.anchorId} id={sec.anchorId}>
                      {transcriptSections.length > 1 && (
                        <h2 style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color, marginBottom: 18, paddingBottom: 8, borderBottom: `1px solid ${color}28` }}>{sec.label}</h2>
                      )}
                      <div className="ep-transcript-blocks">
                        {sec.blocks.map((block, i) => (
                          <div key={i} className="ep-transcript-block">
                            <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '.04em', lineHeight: 1.4 }}>{block.speaker}</span>
                            <p style={{ fontSize: '.93rem', lineHeight: 1.82, color: 'var(--muted)', margin: 0 }}>{block.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </article>
              </div>
            </details>
          </div>
        </div>
      )}

      {/* ── Related Episodes ── */}
      {related.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', paddingTop: 56, paddingBottom: 64 }}>
          <div className="container">
            <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', textAlign: 'center', marginBottom: 32 }}>Related Episodes</p>
            <div className="related-grid">
              {related.map(r => {
                const rc = SHOW_COLOR[r.show] ?? 'var(--terra)'
                return (
                  <Link key={r.slug} href={`/shows/${r.slug}`} style={{ textDecoration: 'none' }}>
                    <article className="related-card" style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-med)', background: 'var(--bg)' }}>
                      <div style={{ aspectRatio: '16/9', background: r.photo ? undefined : `${rc}12`, overflow: 'hidden', position: 'relative' }}>
                        {r.photo ? (
                          <img src={r.photo} alt={r.guest} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800, color: rc }}>
                            {r.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </div>
                        )}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: rc }} />
                      </div>
                      <div style={{ padding: '16px 18px' }}>
                        <p style={{ fontSize: '.64rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: rc, marginBottom: 7 }}>
                          {r.season && r.episode ? `EP · ${String(r.episode).padStart(3,'0')}` : r.show}
                        </p>
                        <p style={{ fontSize: '.86rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, margin: 0 }}>{r.youtubeTitle.toUpperCase()}</p>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Keep Listening CTA ── */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', paddingTop: 56, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 14 }}>More Conversations</p>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', marginBottom: 14 }}>Keep Listening</h2>
          <p style={{ marginBottom: 28, fontSize: '.97rem' }}>Every episode is a different story about the space between one chapter and the next.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shows" className="btn btn-gold">Browse All Episodes</Link>
            <Link href="/guest-submission" className="btn btn-glass">Submit a Guest</Link>
          </div>
        </div>
      </div>
    </>
  )
}
