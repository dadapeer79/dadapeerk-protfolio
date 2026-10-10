import Link from 'next/link'

export const metadata = { title: 'Blog — Dadapeer K' }

export default function BlogIndexPage() {
  return (
    <>
      <nav style={{ background: 'var(--black)', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--white)' }}>DK.</Link>
        <Link href="/" className="btn btn-outline-white btn-sm">← Back home</Link>
      </nav>

      <div style={{ background: 'var(--black)', minHeight: 'calc(100vh - 72px)', color: 'var(--white)', padding: '4rem 2rem' }}>
        <div className="container-sm">
          <p className="label" style={{ color: 'var(--red)', marginBottom: '0.75rem' }}>Writing & Thoughts</p>
          <h1 className="display display-xl" style={{ color: 'var(--white)', marginBottom: '4rem' }}>THE BLOG</h1>

          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ display: 'inline-block', padding: '1rem 2rem', border: '1px solid rgba(250,246,238,0.1)', borderRadius: '1rem', background: 'rgba(250,246,238,0.02)' }}>
               <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' }}>COMING SOON</h2>
               <p style={{ color: 'rgba(250,246,238,0.6)', fontSize: '0.9rem' }}>I'm currently writing the first few posts. Check back later.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
