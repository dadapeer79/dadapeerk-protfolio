'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#alona', label: 'Alona Label' },
    { href: '#milky', label: 'Milky Mirchi' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <>
      <nav className="nav" style={{ boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.05)' : 'none' }}>
        <Link href="/" className="nav-logo">DK.</Link>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="#contact" className="btn btn-outline-black btn-sm">Contact</a>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--white)', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Close menu">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="4" x2="24" y2="24"/><line x1="24" y1="4" x2="4" y2="24"/></svg>
        </button>
        {links.map(l => (
          <a key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" className="mobile-nav-link" style={{ color: 'var(--lime)' }} onClick={() => setMobileOpen(false)}>Contact</a>
      </div>
    </>
  )
}
