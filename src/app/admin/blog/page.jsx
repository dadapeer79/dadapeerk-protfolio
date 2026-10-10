'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">BLOG</h1>
        <button className="btn btn-red btn-sm">+ New Post</button>
      </div>
      <div className="admin-content">
        <div className="admin-card">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)' }}>Loading…</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)', fontStyle: 'italic' }}>No blog posts yet. Start writing!</td></tr>
              ) : posts.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td><button className={`toggle ${p.is_published ? 'on' : ''}`} /></td>
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
