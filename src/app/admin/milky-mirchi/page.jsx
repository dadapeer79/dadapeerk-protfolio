'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminMilkyMirchi() {
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('milky_mirchi_reels').select('*').order('created_at', { ascending: false })
    setReels(data || [])
    setLoading(false)
  }

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">MILKY MIRCHI</h1>
        <button className="btn btn-red btn-sm">+ Add Reel</button>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          <table className="table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Location</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)' }}>Loading…</td></tr>
              ) : reels.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)', fontStyle: 'italic' }}>No reels yet.</td></tr>
              ) : reels.map(r => (
                <tr key={r.id}>
                  <td><div style={{ width: 40, height: 60, background: '#eee', borderRadius: 4 }} /></td>
                  <td style={{ fontWeight: 600 }}>{r.title}</td>
                  <td>{r.location}</td>
                  <td><button className={`toggle ${r.is_published ? 'on' : ''}`} /></td>
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
