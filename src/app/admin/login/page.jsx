'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    
    // Simulate network delay for demo
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Frontend demo auth check
    if (email === 'admin@example.com' && password === 'DemoAdmin123!') {
      // Setup simple demo session state using sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('demo_admin_auth', 'true')
      }
      router.push('/admin')
    } else {
      setStatus('error')
      setErrorMsg('Incorrect email or password. Please try again.')
    }
  }

  return (
    <div className="login-shell" style={{ minHeight: '100vh' }}>
      {/* Left — red panel */}
      <div className="login-left">
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--white)' }}>DK.</div>
        <div className="login-headline">BACK<br />STAGE.</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(250,246,238,0.45)' }}>
          /admin/login · SECURE AUTHENTICATION
        </div>
      </div>

      {/* Right — form */}
      <div className="login-right">
        <div style={{ maxWidth: 400, width: '100%', margin: '0 auto' }}>
          <h1 className="display display-sm" style={{ color: 'var(--black)', marginBottom: '2rem' }}>ADMIN LOGIN</h1>

          {status === 'error' && (
            <div style={{ background: 'rgba(217,31,37,0.08)', border: '1px solid rgba(217,31,37,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: '0.82rem' }}>Incorrect email or password.</span>
              <span style={{ fontSize: '0.78rem', color: 'rgba(11,11,11,0.5)' }}>(error state)</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="you@example.com"
                className={`form-input ${status === 'error' ? 'error' : ''}`}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  required placeholder="••••••••"
                  className={`form-input ${status === 'error' ? 'error' : ''}`}
                  autoComplete="current-password"
                  style={{ paddingRight: '3rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(11,11,11,0.08)', border: 'none', borderRadius: '0.375rem', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(11,11,11,0.5)' }}
                  aria-label="Toggle password visibility"
                >
                  {showPass
                    ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'rgba(11,11,11,0.6)' }}>
                <input type="checkbox" style={{ accentColor: 'var(--black)' }} /> Stay signed in on this device
              </label>
              <button type="button" style={{ color: 'var(--black)', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={status === 'loading'} className="btn btn-black" style={{ width: '100%', borderRadius: '9999px', padding: '1rem', fontSize: '0.9rem' }}>
              {status === 'loading' ? 'Logging in...' : 'LOG IN →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
