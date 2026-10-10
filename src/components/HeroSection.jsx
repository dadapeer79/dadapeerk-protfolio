'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const AvatarViewer = dynamic(() => import('./AvatarViewer'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 100, height: 100, background: 'rgba(217,31,37,0.3)', borderRadius: '50%' }} />
    </div>
  )
})

export default function HeroSection({ settings = {} }) {
  return (
    <section className="hero" id="home">

      {/* Layer 0 — full-width background typography */}
      <div className="hero-bg-text" aria-hidden="true">
        <div className="hero-bg-creative">CREATIVE</div>
        <div className="hero-bg-developer">DEVELOPER</div>
      </div>

      {/* Layer 1 — top bar (label + sticker) */}
      <div className="hero-topbar">
        <div className="hero-label-pill">
          <span className="hero-label-dot" />
          DEVELOPER / DESIGNER / AI BUILDER
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--red)', fontWeight: 700, transform: 'rotate(-3deg)', marginBottom: '0.2rem', display: 'inline-block' }}>
            my real projects, inside!
          </div>
          <div className="hero-sticker-tag">HI I'M DADAPEER</div>
        </div>
      </div>

      {/* Layer 2 — center: red circle + avatar */}
      <div className="hero-center-stage">
        <div className="hero-red-circle" />
        <div className="hero-avatar-wrap">
          <AvatarViewer modelUrl={settings.avatar_model_url || null} />
        </div>
      </div>

      {/* Layer 2b — floating preview panel, right of center (absolute to section) */}
      <div className="hero-preview-panel">
        <div className="preview-chrome">
          <div className="preview-dot" style={{ background: '#FF5F57' }} />
          <div className="preview-dot" style={{ background: '#FEBC2E' }} />
          <div className="preview-dot" style={{ background: '#28C840' }} />
        </div>
        <div style={{ marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.48rem', opacity: 0.4, letterSpacing: '0.06em', textAlign: 'center' }}>
          dadapeer.dev/projects
        </div>
        <div style={{ display: 'flex', gap: '0.35rem', height: 100 }}>
          <div style={{ flex: 1.7, background: 'var(--red)', borderRadius: '0.25rem', display: 'flex', alignItems: 'flex-end', padding: '0.4rem', overflow: 'hidden' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 900, lineHeight: 1, textTransform: 'uppercase' }}>RANK<br/>ROUTE</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ flex: 1, background: '#2A2A2A', borderRadius: '0.25rem' }} />
            <div style={{ flex: 1, background: 'var(--lime)', borderRadius: '0.25rem' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
          {['React', 'Flask', 'AI'].map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.35rem', borderRadius: '9999px' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Layer 3 — bottom bar */}
      <div className="hero-bottom-bar">
        <div className="hero-bottom-left">
          <p className="hero-sub">
            {settings.hero_sub || 'I build digital experiences that feel alive.\nCreating brands. Turning ideas into reality.'}
          </p>
          <div className="hero-ctas">
            <a href="#work" className="btn btn-black btn-lg">
              {settings.cta_primary || 'EXPLORE MY WORLD →'}
            </a>
            <Link href="/projects" className="btn btn-outline-black btn-lg">
              {settings.cta_secondary || 'VIEW PROJECTS'}
            </Link>
          </div>
        </div>
        <div className="hero-bottom-right">
          <div className="hero-counter">01</div>
          <div className="drag-hint">⇄ DRAG · DOUBLE-CLICK FOR BACKSTAGE</div>
        </div>
      </div>

    </section>
  )
}
