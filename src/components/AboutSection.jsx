export default function AboutSection({ settings = {} }) {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        {/* Left — Polaroid collage */}
        <div className="about-collage">
          <div className="polaroid pol-1">
            <div className="polaroid-img">[portrait]</div>
          </div>
          <div className="polaroid pol-2">
            <div className="polaroid-img">[project]</div>
          </div>
          <div className="polaroid pol-3">
            <div className="polaroid-img">[design]</div>
          </div>
          <div className="polaroid pol-4">
            <div className="polaroid-img">[campus]</div>
          </div>
          {/* Tape strips */}
          <div className="tape" style={{ top: -6, left: 55 }} />
          <div className="tape" style={{ top: 50, left: 190, transform: 'rotate(8deg)' }} />
          <div className="tape" style={{ top: 130, left: 38, transform: 'rotate(-3deg)' }} />
        </div>

        {/* Right — text */}
        <div className="about-text">
          <p className="about-section-label">01 // ABOUT</p>
          <h2 className="about-heading">
            BUILDER FIRST.<br />
            <span className="highlight">STUDENT</span> ALWAYS.
          </h2>
          <p className="about-bio">
            {settings.about_text || "Driven student & full-stack developer at CMRIT Bengaluru building digital experiences that feel alive. Creating brands. Turning ideas into reality."}
          </p>

          {/* Stats */}
          <div className="about-stats">
            <div>
              <div className="stat-num">6+</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div>
              <div className="stat-num">3</div>
              <div className="stat-label">Prizes Won</div>
            </div>
            <div>
              <div className="stat-num">2</div>
              <div className="stat-label">Ventures</div>
            </div>
          </div>

          {/* Code card */}
          <div className="code-card">
            <div><span className="code-key">const </span><span style={{ color: 'var(--lime)' }}>developer</span> = {'{'}</div>
            <div style={{ paddingLeft: '1.25rem' }}>
              <span className="code-key">skills</span>: <span style={{ color: 'var(--white)' }}>["React", "Next.js", "AI"]</span>,
            </div>
            <div style={{ paddingLeft: '1.25rem' }}>
              <span className="code-key">passion</span>: <span style={{ color: 'var(--lime)' }}>"Clean UI / UX"</span>,
            </div>
            <div style={{ paddingLeft: '1.25rem' }}>
              <span className="code-key">motto</span>: <span style={{ color: 'var(--white)' }}>"Always build, always learn."</span>
            </div>
            <div>{'}'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
