'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminMedia() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app with auth, we would list from the storage bucket here.
    // For now we simulate loading to match the UI state.
    setLoading(false)
  }, [])

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">MEDIA LIBRARY</h1>
        <button className="btn btn-red btn-sm">+ Upload Files</button>
      </div>
      <div className="admin-content">
        {/* Upload area */}
        <div style={{ border: '2px dashed rgba(11,11,11,0.15)', borderRadius: '1rem', padding: '3rem', textAlign: 'center', marginBottom: '2rem', background: 'rgba(11,11,11,0.02)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(11,11,11,0.4)" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Drag & drop files here</p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(11,11,11,0.5)', marginBottom: '1.5rem' }}>PNG, JPG, SVG, GLB, GLTF up to 50MB</p>
          <button className="btn btn-outline-black btn-sm">Browse files</button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {['All', 'Images', '3D Models', 'Documents'].map((f, i) => (
             <button key={i} className="btn btn-sm" style={{ background: i === 0 ? 'var(--black)' : 'rgba(11,11,11,0.06)', color: i === 0 ? 'var(--white)' : 'var(--black)', padding: '0.4rem 1rem' }}>{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="media-grid">
           {loading ? (
             <div style={{ padding: '2rem', color: 'rgba(11,11,11,0.4)' }}>Loading...</div>
           ) : files.length === 0 ? (
             <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)', fontStyle: 'italic' }}>
               No media files uploaded yet.
             </div>
           ) : null}
        </div>
      </div>
    </div>
  )
}
