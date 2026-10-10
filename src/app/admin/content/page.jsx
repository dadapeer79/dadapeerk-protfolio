'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminContent() {
  const [settings, setSettings] = useState({
    hero_sub: '',
    cta_primary: '',
    cta_secondary: '',
    about_text: '',
    contact_email: '',
    avatar_model_url: '',
    fallback_portrait_url: ''
  })
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('') // 'saved', 'error', ''

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    const { data } = await supabase.from('site_settings').select('*').limit(1).single()
    if (data) {
      setSettings(data)
    }
  }

  async function handleSave() {
    setSaving(true)
    setStatus('')
    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: settings.id || 1, ...settings })
    
    setSaving(false)
    if (error) {
      setStatus('error')
    } else {
      setStatus('saved')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">SITE CONTENT</h1>
        <button onClick={handleSave} disabled={saving} className="btn btn-red btn-sm">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="admin-content">
        {status === 'saved' && (
          <div style={{ background: 'rgba(184,255,44,0.15)', border: '1px solid rgba(184,255,44,0.4)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#3a7000', fontWeight: 600, fontSize: '0.85rem' }}>Settings saved successfully.</span>
          </div>
        )}
        {status === 'error' && (
          <div style={{ background: 'rgba(217,31,37,0.08)', border: '1px solid rgba(217,31,37,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--red)', fontWeight: 600, fontSize: '0.85rem' }}>Failed to save settings.</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          {/* Hero Section */}
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">Hero Section</p>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Hero Subtext</label>
                <textarea 
                  name="hero_sub" 
                  value={settings.hero_sub || ''} 
                  onChange={handleChange}
                  className="form-input form-textarea" 
                  rows={3} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Primary CTA</label>
                  <input name="cta_primary" value={settings.cta_primary || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Secondary CTA</label>
                  <input name="cta_secondary" value={settings.cta_secondary || ''} onChange={handleChange} className="form-input" />
                </div>
              </div>
            </div>
          </div>

          {/* 3D Avatar */}
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">3D Avatar</p>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">3D Model URL (.glb)</label>
                <input name="avatar_model_url" value={settings.avatar_model_url || ''} onChange={handleChange} className="form-input" placeholder="https://..." />
                <p style={{ fontSize: '0.7rem', color: 'rgba(11,11,11,0.5)', marginTop: '0.25rem' }}>Leave blank to use the default fallback character.</p>
              </div>
              <div className="form-group">
                <label className="form-label">Fallback Portrait URL</label>
                <input name="fallback_portrait_url" value={settings.fallback_portrait_url || ''} onChange={handleChange} className="form-input" placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">About Section</p>
            </div>
            <div className="admin-card-body">
              <div className="form-group">
                <label className="form-label">About Text</label>
                <textarea 
                  name="about_text" 
                  value={settings.about_text || ''} 
                  onChange={handleChange}
                  className="form-input form-textarea" 
                  rows={5} 
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">Contact & Socials</p>
            </div>
            <div className="admin-card-body">
              <div className="form-group">
                <label className="form-label">Contact Email</label>
                <input name="contact_email" value={settings.contact_email || ''} onChange={handleChange} className="form-input" type="email" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
