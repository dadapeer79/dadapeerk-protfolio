import Link from 'next/link'

export const metadata = { title: 'Milky Mirchi — Dadapeer K' }

export default function MilkyMirchiPage() {
  return (
    <>
      <nav style={{ background: '#F5EDD6', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', color: '#1F5C33' }}>DK.</Link>
        <Link href="/" className="btn btn-sm" style={{ background: 'transparent', color: '#1F5C33', border: '1px solid #1F5C33' }}>← Back home</Link>
      </nav>

      <div style={{ background: '#F5EDD6', minHeight: 'calc(100vh - 72px)', color: 'var(--black)' }}>
        <div style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
          <p className="label" style={{ color: 'rgba(11,11,11,0.5)', marginBottom: '1rem' }}>Content Brand</p>
          <h1 style={{ lineHeight: 0.85, marginBottom: '2rem' }}>
             <span className="display" style={{ color: '#1F5C33', fontSize: 'clamp(4rem, 10vw, 8rem)' }}>MILKY</span><br/>
             <span className="display" style={{ color: 'var(--red)', fontSize: 'clamp(4rem, 10vw, 8rem)' }}>MIRCHI</span>
          </h1>
          <p className="body-lg mx-auto" style={{ maxWidth: 500, fontWeight: 600, marginBottom: '0.75rem' }}>
            Kannada food stories. Local shops. Real flavour.
          </p>
          <p className="body-sm mx-auto" style={{ maxWidth: 500, color: 'rgba(11,11,11,0.6)', marginBottom: '3rem' }}>
            Reels, food discovery, and local-business promos from Shivamogga & Bengaluru.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-red">Follow on Instagram →</a>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i}>
                <div style={{ width: '100%', aspectRatio: '9/16', background: i % 2 === 0 ? 'var(--red)' : '#1F5C33', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>[REEL PREVIEW]</span>
                </div>
                <div style={{ padding: '0 0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="label" style={{ color: 'var(--red)' }}>Shivamogga</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>Best Benne Dosa in Town</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(11,11,11,0.6)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    Found this hidden gem serving the crispiest dosas with unlimited chutney...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
