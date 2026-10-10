'use client'
import { useState } from 'react'

export default function Contact({ settings = {} }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    await new Promise(r => setTimeout(r, 900))
    setStatus('sent')
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        {/* Left */}
        <div className="contact-left">
          <p className="contact-label">07 / Contact</p>
          <h2 className="contact-heading">
            LET'S<br />BUILD<br />SOMETHING.
          </h2>
          <div className="contact-socials">
            <a href={settings.github || 'https://github.com/dadapeer79'} target="_blank" rel="noreferrer" className="social-link">GitHub ↗</a>
            <a href={settings.linkedin || 'https://www.linkedin.com/in/dadapeer-k/'} target="_blank" rel="noreferrer" className="social-link">LinkedIn ↗</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">Instagram ↗</a>
            <a href={`mailto:${settings.email || 'dadapeer@example.com'}`} className="social-link">Email ↗</a>
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-right">
          {status === 'sent' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 280, gap: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase' }}>Message received!</h3>
              <p style={{ color: 'rgba(250,246,238,0.7)', fontSize: '0.875rem', maxWidth: 280 }}>
                Thanks for reaching out. I'll get back to you as soon as I can.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(250,246,238,0.4)', borderTop: '1px solid rgba(250,246,238,0.15)', paddingTop: '0.75rem', width: '100%', textAlign: 'center' }}>
                DEMO MODE — No actual email sent. Backend integration pending.
              </p>
              <button className="btn btn-white" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem', color: 'rgba(250,246,238,0.65)', fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="contact-input"
                  style={errors.name ? { borderColor: 'rgba(250,246,238,0.8)' } : {}}
                />
                {errors.name && <span style={{ fontSize: '0.68rem', color: 'rgba(250,246,238,0.7)' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.75rem', color: 'rgba(250,246,238,0.65)', fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="contact-input"
                  style={errors.email ? { borderColor: 'rgba(250,246,238,0.8)' } : {}}
                />
                {errors.email && <span style={{ fontSize: '0.68rem', color: 'rgba(250,246,238,0.7)' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.75rem', color: 'rgba(250,246,238,0.65)', fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="contact-input form-textarea"
                  rows={4}
                  style={errors.message ? { borderColor: 'rgba(250,246,238,0.8)' } : {}}
                />
                {errors.message && <span style={{ fontSize: '0.68rem', color: 'rgba(250,246,238,0.7)' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-black btn-lg"
                style={{ width: '100%', marginTop: '0.25rem' }}
              >
                {status === 'sending' ? 'Sending...' : 'SEND MESSAGE →'}
              </button>

              <p className="contact-notice">
                DEMO MODE · No real email is sent yet. Backend integration is pending.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
