import Link from 'next/link'

const PROJECTS = [
  { slug: 'rankroute', num: '01', cat: 'AI + Data', title: 'RankRoute / KCET Compass', desc: 'Predicts college options for KCET students using ranking data and AI.', color: '#D91F25', status: 'live' },
  { slug: 'vyapaar-sahayak', num: '02', cat: 'Business AI', title: 'Vyapaar Sahayak', desc: 'AI-powered finance dashboard for Indian retail store owners.', color: '#1A1A1A', status: 'coming-soon' },
  { slug: 'studo', num: '03', cat: 'Productivity', title: 'Studo', desc: 'Smart study planner that schedules automatically from deadlines.', color: '#B8FF2C', status: 'coming-soon' },
  { slug: 'travii', num: '04', cat: 'AI Agent', title: 'Travii', desc: 'An AI agent application that helps users accomplish complex tasks.', color: '#1A1A1A', status: 'coming-soon' },
  { slug: 'labooo', num: '05', cat: 'Chatbot', title: 'Labooo', desc: 'Library chatbot that helps students find the right resource quickly.', color: '#D91F25', status: 'coming-soon' },
  { slug: 'musica', num: '06', cat: 'Concept', title: 'Musica', desc: 'Mood-driven music and quote recommendations with minimal UI.', color: '#1A1A1A', status: 'coming-soon' },
]

function StatusBadge({ status }) {
  if (status === 'live') return <span className="badge badge-live">● Live</span>
  if (status === 'coming-soon') return <span className="badge badge-coming-soon">Coming Soon</span>
  return null
}

export default function Gallery({ featured }) {
  const featured3 = PROJECTS.slice(0, 3)
  const secondary = PROJECTS.slice(3)

  return (
    <section className="gallery-section" id="work">
      {/* Header */}
      <div className="gallery-header">
        <div>
          <p className="gallery-label">02 / Selected Work</p>
          <h2 className="gallery-title">THE GALLERY</h2>
        </div>
        {featured && (
          <Link href="/projects" className="btn btn-outline-white btn-sm">All projects →</Link>
        )}
      </div>

      {/* Featured 3-card grid */}
      <div className="gallery-grid">
        {featured3.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card">
            <div
              className="project-card-thumb"
              style={{ background: p.color }}
            >
              <div className="thumb-dots">
                <div className="thumb-dot" />
                <div className="thumb-dot" />
                <div className="thumb-dot" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.4rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                  color: p.color === '#B8FF2C' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase', letterSpacing: '0.08em'
                }}>
                  [SCREENSHOT]
                </span>
                <StatusBadge status={p.status} />
              </div>
            </div>
            <div className="project-card-info">
              <p className="project-card-cat">{p.num} · {p.cat}</p>
              <h3 className="project-card-title">{p.title}</h3>
              <p className="project-card-desc">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Secondary list rows */}
      <div className="gallery-secondary">
        {secondary.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="project-row" style={{ display: 'flex' }}>
            <div className="project-row-left">
              <span className="project-row-num">{p.num}</span>
              <div
                style={{ width: 36, height: 36, background: p.color, borderRadius: '0.25rem', flexShrink: 0 }}
              />
              <div>
                <div className="project-row-title">{p.title}</div>
                <div className="project-row-cat">{p.cat}</div>
              </div>
            </div>
            <StatusBadge status={p.status} />
          </Link>
        ))}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingTop: '1rem' }} />
      </div>
    </section>
  )
}

export { PROJECTS }
