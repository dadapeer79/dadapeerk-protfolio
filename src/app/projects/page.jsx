import Link from 'next/link'
import { PROJECTS } from '@/components/Gallery'

export const metadata = { title: 'Projects — Dadapeer K' }

export default function ProjectsPage() {
  return (
    <>
      <nav style={{ background: 'var(--black)', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--white)' }}>DK.</Link>
        <Link href="/" className="btn btn-outline-white btn-sm">← Back home</Link>
      </nav>

      <div style={{ background: 'var(--black)', padding: '4rem 2rem 2rem' }}>
        <div className="container">
          <p className="label" style={{ color: 'var(--red)', marginBottom: '0.75rem' }}>All work</p>
          <h1 className="display display-xl" style={{ color: 'var(--white)', marginBottom: '3rem' }}>PROJECTS</h1>

          <div className="gallery-grid">
            {PROJECTS.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card">
                <div className="project-card-thumb" style={{ background: p.color }}>
                  <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <span className="thumb-label" style={{ color: p.color === '#B8FF2C' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)' }}>[SCREENSHOT]</span>
                    {p.status === 'coming-soon' && <span className="coming-soon-banner">Coming Soon</span>}
                    {p.status === 'live' && <span className="badge badge-live">Live</span>}
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
        </div>
      </div>
    </>
  )
}
