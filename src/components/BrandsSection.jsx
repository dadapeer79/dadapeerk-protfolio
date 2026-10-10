import Link from 'next/link'

export default function BrandsSection() {
  return (
    <div className="brands-row" id="alona">
      {/* Alona Label — black left */}
      <div className="alona-section">
        <p className="alona-label">04 / Brand · Streetwear</p>
        <h2 className="alona-name">ALONA<br />LABEL</h2>
        <div className="alona-tagline">FRESH FIT. SERVED HOT.</div>
        <p className="alona-desc">
          Karnataka-inspired streetwear. Built from culture, worn with pride.
          T-shirts, prints, and limited drops rooted in local identity.
        </p>

        {/* Design colour swatches */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
          {['#D91F25', '#B8FF2C', '#FAF6EE', '#111'].map((c, i) => (
            <div key={i} style={{
              width: 48, height: 60, background: c,
              borderRadius: '0.4rem', opacity: 0.85,
              border: c === '#FAF6EE' ? '1px solid rgba(255,255,255,0.2)' : 'none'
            }} />
          ))}
        </div>

        <Link href="/brands/alona-label" className="btn btn-lime">Enter The Label →</Link>
      </div>

      {/* Milky Mirchi — cream right */}
      <div className="milky-section" id="milky">
        <p className="milky-label">05 / Brand · Content</p>
        <h2>
          <span className="milky-name-1">MILKY</span>
          <br />
          <span className="milky-name-2">MIRCHI</span>
        </h2>
        <p className="milky-desc">
          Kannada food stories. Local shops. Real flavour.<br />
          Reels, food discovery, and local-business promos
          from Shivamogga &amp; Bengaluru.
        </p>

        {/* Reel thumbnails */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
          {['#1F5C33', '#D91F25', '#2A2A2A'].map((c, i) => (
            <div key={i} style={{ width: 48, height: 88, background: c, borderRadius: '0.4rem', opacity: 0.8 }} />
          ))}
        </div>

        <Link href="/brands/milky-mirchi" className="btn btn-red">Watch The Reels →</Link>
      </div>
    </div>
  )
}
