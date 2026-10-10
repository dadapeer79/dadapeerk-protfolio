import Link from 'next/link'

export const metadata = { title: 'Alona Label — Dadapeer K' }

export default function AlonaLabelPage() {
  return (
    <>
      <nav style={{ background: 'var(--black)', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--white)' }}>DK.</Link>
        <Link href="/" className="btn btn-outline-white btn-sm">← Back home</Link>
      </nav>

      <div style={{ background: 'var(--black)', minHeight: 'calc(100vh - 72px)', color: 'var(--white)' }}>
        
        <div style={{ padding: '6rem 2rem 4rem', textAlign: 'center', background: 'linear-gradient(to bottom, #1A1A1A, var(--black))' }}>
          <p className="label" style={{ color: 'rgba(250,246,238,0.5)', marginBottom: '1rem' }}>Streetwear Label</p>
          <h1 className="display" style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', lineHeight: 0.85, marginBottom: '1rem' }}>ALONA<br/>LABEL</h1>
          <div className="display" style={{ color: 'var(--lime)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '2rem' }}>FRESH FIT. SERVED HOT.</div>
          <p className="body-lg mx-auto" style={{ maxWidth: 500, color: 'rgba(250,246,238,0.7)', marginBottom: '3rem' }}>
            Karnataka-inspired streetwear. Built from culture, worn with pride.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline-white">Instagram</a>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '6rem' }}>
          <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--red)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4rem' }}>
             <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>[CAMPAIGN HERO IMAGE]</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: '#1A1A1A', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', background: i === 2 ? 'var(--lime)' : 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(0,0,0,0.3)' }}>[DESIGN]</span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', textTransform: 'uppercase' }}>Drop 0{i}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(250,246,238,0.6)', marginTop: '0.25rem' }}>Oversized / Premium Cotton</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
