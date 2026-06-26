import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEpisodes, getEpisode, getAdjacentEpisodesDB } from '@/lib/episodes-db'
import { parseDescription, parseTranscript } from '@/lib/parseEpisode'

export async function generateStaticParams() {
  const episodes = await getEpisodes()
  return episodes.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const ep = await getEpisode(slug)
  if (!ep) return {}
  const title = ep.guest !== 'Savan Kong'
    ? `${ep.guest} on ${ep.show} | Life Between Titles`
    : ep.youtubeTitle
  const description = ep.description
    ? ep.description.replace(/<br\s*\/?>/gi, ' ').slice(0, 200).trim() + '…'
    : `${ep.guest} on Life Between Titles — ${ep.show}, Season ${ep.season}${ep.episode ? `, Episode ${ep.episode}` : ''}.`
  return {
    title,
    description,
    alternates: { canonical: `https://www.lifebetweentitles.com/shows/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      images: ep.photo ? [{ url: ep.photo, alt: ep.guest }] : [],
    },
    twitter: { card: ep.photo ? 'summary_large_image' : 'summary', title, description },
  }
}

const SHOW_COLOR: Record<string, string> = {
  'Life Between Titles': '#C26A4A',
  'Work Unscripted': '#4a7ec2',
  'Office Hours': '#7c4ac2',
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
    image: ep.photo || undefined,
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

      {youtubeId ? (
        <div style={{ paddingTop: 'var(--nav-h)', background: '#000' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
              title={ep.youtubeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      ) : ep.photo ? (
        <div style={{ paddingTop: 'var(--nav-h)', background: '#000', position: 'relative', height: 'clamp(320px, 50vw, 560px)', overflow: 'hidden' }}>
          <img src={ep.photo} alt={ep.guest} referrerPolicy="no-referrer"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .55 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a href="https://www.youtube.com/@LifeBetweenTitles" target="_blank" rel="noopener noreferrer"
              style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#fff', border: '2px solid rgba(255,255,255,.4)' }}>▶</a>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: 'var(--nav-h)', background: `${color}18`, height: 'clamp(160px, 20vw, 240px)', borderBottom: '1px solid var(--border)' }} />
      )}

      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px clamp(20px,5vw,64px)', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {prev ? (
            <Link href={`/shows/${prev.slug}`} className="ep-nav-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>← Prev</Link>
          ) : <span />}
          <span style={{ color: 'var(--faint)' }}>
            {ep.show} {ep.season && ep.episode ? `· S${String(ep.season).padStart(2,'0')} E${String(ep.episode).padStart(2,'0')}` : ''}
          </span>
          {next ? (
            <Link href={`/shows/${next.slug}`} className="ep-nav-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Next →</Link>
          ) : <span />}
        </div>
      </div>

      <div style={{ background: 'var(--bg)', paddingTop: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 860, textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
            {[
              { label: 'Spotify', href: 'https://open.spotify.com/show/lifebetweentitles' },
              { label: 'Apple', href: 'https://podcasts.apple.com' },
              { label: 'YouTube', href: ep.youtubeUrl ?? 'https://www.youtube.com/@LifeBetweenTitles' },
              { label: 'Substack', href: 'https://lifebetweentitles.substack.com' },
            ].map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="platform-pill"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 100, fontSize: '.76rem', fontWeight: 700, letterSpacing: '.04em', color: 'var(--ink)' }}>
                {p.label}
              </a>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color }}>{ep.show}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem,3.4vw,2.4rem)', lineHeight: 1.15, letterSpacing: '-.02em', marginBottom: ep.guest !== 'Savan Kong' ? 16 : 0, textTransform: 'uppercase' }}>
            {ep.youtubeTitle}
          </h1>
          {ep.guest !== 'Savan Kong' && (
            <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 0 }}>with {ep.guest}</p>
          )}
        </div>
      </div>

      <div style={{ background: 'var(--bg)' }}>
        <div className="container" style={{ maxWidth: 760, paddingTop: 56, paddingBottom: 64 }}>

          {intro && <p style={{ fontSize: '1rem', lineHeight: 1.82, color: 'var(--muted)', marginBottom: 48 }}>{intro}</p>}

          {ep.keyInsights && ep.keyInsights.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>Key Takeaways</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {ep.keyInsights.map((insight, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '.96rem', lineHeight: 1.65, color: 'var(--muted)' }}>
                    <span style={{ color, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>→</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {bullets.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>In this episode you&apos;ll learn</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: '.95rem', lineHeight: 1.6, color: 'var(--muted)', paddingLeft: 16, borderLeft: `2px solid ${color}` }}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {ep.substack && (
            <div style={{ borderRadius: 12, padding: '28px 32px', marginBottom: 48, background: `${color}08`, border: `1px solid ${color}28`, borderLeft: `3px solid ${color}` }}>
              <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color, marginBottom: 10 }}>Feature Story</p>
              <p style={{ fontSize: '.93rem', lineHeight: 1.72, color: 'var(--muted)', marginBottom: 16 }}>We turned this conversation into a long-form essay — with more context, more depth, and the moments that didn&apos;t make the edit.</p>
              <a href={ep.substack} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ fontSize: '.82rem', padding: '10px 20px' }}>Read on Substack →</a>
            </div>
          )}

          {chapters.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>What We Discuss</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {chapters.map((ch, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '10px 0', borderBottom: i < chapters.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    {ch.time && <span style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums', fontSize: '.78rem', fontWeight: 700, color, minWidth: 48 }}>{ch.time}</span>}
                    <span style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ch.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ep.resources && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>Episode Resources</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ep.resources.split('|').map((r, i) => <p key={i} style={{ fontSize: '.9rem', lineHeight: 1.7, margin: 0 }}>{r.trim()}</p>)}
              </div>
            </div>
          )}

          {ep.faq && ep.faq.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 4 }}>Q&amp;A</p>
              <p style={{ fontSize: '.82rem', color: 'var(--faint)', marginBottom: 24 }}>Questions answered in this episode</p>
              {ep.faq.map(({ q, a }, i) => (
                <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 24, paddingBottom: 24 }}>
                  <h3 style={{ fontSize: '.98rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.4, letterSpacing: '-.01em', fontFamily: 'inherit' }}>{q}</h3>
                  <p style={{ fontSize: '.9rem', lineHeight: 1.78, color: 'var(--muted)', margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          )}

          {ep.guestBio && ep.guest !== 'Savan Kong' && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, marginBottom: 48 }}>
              <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>About {ep.guest}</p>
              <p style={{ fontSize: '.9rem', lineHeight: 1.78, color: 'var(--muted)' }}>{ep.guestBio}</p>
            </div>
          )}

          {allTags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: 28 }}>
              {allTags.map(t => (
                <span key={t} style={{ padding: '5px 12px', borderRadius: 20, fontSize: '.73rem', fontWeight: 600, background: 'var(--terra-dim)', color: 'var(--terra)' }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {transcriptSections.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }} id="transcript">
          <div className="container" style={{ maxWidth: 760, paddingTop: 64, paddingBottom: 80 }}>
            <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 8 }}>Full Transcript</p>
            <p style={{ fontSize: '.82rem', color: 'var(--faint)', marginBottom: 36 }}>Lightly edited for readability.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
              {transcriptSections.map(sec => (
                <a key={sec.anchorId} href={`#${sec.anchorId}`}
                  style={{ padding: '4px 12px', borderRadius: 20, fontSize: '.73rem', fontWeight: 600, background: `${color}14`, color, textDecoration: 'none' }}>
                  {sec.label}
                </a>
              ))}
            </div>
            <article style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {transcriptSections.map(sec => (
                <div key={sec.anchorId} id={sec.anchorId}>
                  <h2 style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color, marginBottom: 20, paddingBottom: 8, borderBottom: `1px solid ${color}28` }}>{sec.label}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {sec.blocks.map((block, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '.73rem', fontWeight: 700, color: 'var(--faint)', paddingTop: 2, textTransform: 'uppercase', letterSpacing: '.04em', lineHeight: 1.4 }}>{block.speaker}</span>
                        <p style={{ fontSize: '.92rem', lineHeight: 1.78, color: 'var(--muted)', margin: 0 }}>{block.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </article>
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', paddingTop: 64, paddingBottom: 72 }}>
          <div className="container">
            <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', textAlign: 'center', marginBottom: 36 }}>Related Episodes</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {related.map(r => {
                const rc = SHOW_COLOR[r.show] ?? 'var(--terra)'
                return (
                  <Link key={r.slug} href={`/shows/${r.slug}`} style={{ textDecoration: 'none' }}>
                    <article className="related-card" style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-med)', background: 'var(--bg)' }}>
                      <div style={{ aspectRatio: '16/9', background: r.photo ? undefined : `${rc}12`, overflow: 'hidden', position: 'relative' }}>
                        {r.photo ? (
                          <img src={r.photo} alt={r.guest} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800, color: rc }}>
                            {r.guest.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </div>
                        )}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: rc }} />
                      </div>
                      <div style={{ padding: '16px 18px' }}>
                        <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: rc, marginBottom: 8 }}>
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

      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', paddingTop: 64, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>More Conversations</p>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', marginBottom: 16 }}>Keep Listening</h2>
          <p style={{ marginBottom: 32 }}>Every episode is a different story about the space between one chapter and the next.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shows" className="btn btn-gold">Browse All Episodes</Link>
            <Link href="/guest-submission" className="btn btn-glass">Submit a Guest</Link>
          </div>
        </div>
      </div>
    </>
  )
}
