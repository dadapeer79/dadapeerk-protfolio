'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminAlonaLabel() {
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('alona_label_designs').select('*').order('created_at', { ascending: false })
    setDesigns(data || [])
    setLoading(false)
  }

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">ALONA LABEL</h1>
        <button className="btn btn-red btn-sm">+ New Design</button>
      </div>
      <div className="admin-content">
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <div className="admin-card-header">
            <p className="admin-section-label">Brand Settings</p>
          </div>
          <div className="admin-card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
             <div className="form-group">
                <label className="form-label">Tagline</label>
                <input className="form-input" defaultValue="FRESH FIT. SERVED HOT." />
              </div>
              <div className="form-group">
                <label className="form-label">Store URL</label>
                <input className="form-input" placeholder="https://..." />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Brand Story</label>
                <textarea className="form-input form-textarea" defaultValue="Karnataka-inspired streetwear. Built from culture, worn with pride." />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-black btn-sm">Save Brand Settings</button>
              </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <p className="admin-section-label">Designs & Gallery</p>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title</th>
                <th>Theme</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)' }}>Loading…</td></tr>
              ) : designs.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)', fontStyle: 'italic' }}>No designs yet.</td></tr>
              ) : designs.map(d => (
                <tr key={d.id}>
                  <td><div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} /></td>
                  <td style={{ fontWeight: 600 }}>{d.title}</td>
                  <td>{d.theme}</td>
                  <td><button className={`toggle ${d.is_published ? 'on' : ''}`} /></td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline-black btn-sm table-action-btn">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
