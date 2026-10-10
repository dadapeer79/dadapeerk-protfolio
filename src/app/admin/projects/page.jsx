'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState(null)
  const [importUrl, setImportUrl] = useState('')
  const [importLoading, setImportLoading] = useState(false)
  const [form, setForm] = useState({ title: '', slug: '', category: '', description: '', github_url: '', demo_url: '', is_published: false, is_featured: false, status: 'coming-soon' })

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    setProjects(data || [])
    setLoading(false)
  }

  function startCreate() {
    setForm({ title: '', slug: '', category: '', description: '', github_url: '', demo_url: '', is_published: false, is_featured: false, status: 'coming-soon' })
    setEditing(null)
    setCreating(true)
  }

  function startEdit(p) {
    setForm({ ...p })
    setEditing(p.id)
    setCreating(true)
  }

  async function handleSave() {
    const payload = { ...form, updated_at: new Date().toISOString() }
    if (editing) {
      await supabase.from('projects').update(payload).eq('id', editing)
    } else {
      const { error } = await supabase.from('projects').insert([{ ...payload, created_at: new Date().toISOString() }])
      if (error?.code === '23505') { alert('Slug already exists. Please choose a unique slug.'); return }
    }
    setCreating(false)
    setEditing(null)
    load()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  async function togglePublish(p) {
    await supabase.from('projects').update({ is_published: !p.is_published }).eq('id', p.id)
    setProjects(list => list.map(x => x.id === p.id ? { ...x, is_published: !x.is_published } : x))
  }

  async function handleImport() {
    if (!importUrl.trim()) return
    setImportLoading(true)
    try {
      const res = await fetch(`/api/import-url?url=${encodeURIComponent(importUrl)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setForm({ title: data.title || '', slug: data.slug || '', category: '', description: data.description || '', github_url: data.url || '', demo_url: '', is_published: false, is_featured: false, status: 'coming-soon' })
      setEditing(null)
      setCreating(true)
      setImportUrl('')
    } catch (e) {
      alert('Could not fetch metadata from that URL. You can fill in the details manually.')
      setForm(f => ({ ...f, github_url: importUrl }))
      setCreating(true)
    } finally {
      setImportLoading(false)
    }
  }

  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">PROJECTS</h1>
        <button onClick={startCreate} className="btn btn-red btn-sm">+ Create project</button>
      </div>
      <div className="admin-content">

        {/* Import from URL */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <div className="admin-card-header">
            <p className="admin-section-label">Import from URL</p>
          </div>
          <div className="admin-card-body" style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              value={importUrl} onChange={e => setImportUrl(e.target.value)}
              placeholder="https://github.com/you/your-project or live-demo-url.com"
              className="form-input" style={{ flex: 1 }}
            />
            <button onClick={handleImport} disabled={importLoading} className="btn btn-black btn-sm">
              {importLoading ? 'Fetching…' : 'Import →'}
            </button>
          </div>
          <p style={{ padding: '0 1.25rem 1rem', fontSize: '0.72rem', color: 'rgba(11,11,11,0.4)' }}>
            Fetches publicly available title and description. You will edit everything before publishing.
          </p>
        </div>

        {/* Create / Edit form */}
        {creating && (
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <div className="admin-card-header">
              <p className="admin-section-label">{editing ? 'Edit Project' : 'New Project'}</p>
              <button onClick={() => setCreating(false)} style={{ fontSize: '0.75rem', color: 'rgba(11,11,11,0.5)' }}>Cancel</button>
            </div>
            <div className="admin-card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { key: 'title', label: 'Title', full: true },
                { key: 'slug', label: 'Slug (URL path)' },
                { key: 'category', label: 'Category' },
                { key: 'github_url', label: 'GitHub URL' },
                { key: 'demo_url', label: 'Live Demo URL' },
              ].map(f => (
                <div key={f.key} className="form-group" style={{ gridColumn: f.full ? 'span 2' : 'span 1' }}>
                  <label className="form-label">{f.label}</label>
                  <input
                    className="form-input"
                    value={form[f.key] || ''}
                    onChange={e => {
                      const val = e.target.value
                      const update = { [f.key]: val }
                      if (f.key === 'title' && !editing) update.slug = slugify(val)
                      setForm(fr => ({ ...fr, ...update }))
                    }}
                    placeholder={f.key === 'slug' ? 'my-project-name' : ''}
                  />
                </div>
              ))}
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-input form-select" value={form.status || 'coming-soon'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="live">Live</option>
                  <option value="coming-soon">Coming Soon</option>
                  <option value="in-progress">In Progress</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Visibility</label>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.82rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.is_published} onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))} style={{ accentColor: 'var(--red)' }} />
                    Published
                  </label>
                  <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.82rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} style={{ accentColor: 'var(--red)' }} />
                    Featured on home
                  </label>
                </div>
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button onClick={() => setCreating(false)} className="btn btn-outline-black btn-sm">Cancel</button>
                <button onClick={handleSave} className="btn btn-red btn-sm">Save Project</button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="admin-card">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Category</th>
                <th>Status</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)' }}>Loading…</td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(11,11,11,0.4)', fontStyle: 'italic' }}>No projects yet. Create one above.</td></tr>
              ) : projects.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(11,11,11,0.5)' }}>{p.slug}</td>
                  <td style={{ fontSize: '0.8rem' }}>{p.category || '—'}</td>
                  <td><span className={`badge ${p.status === 'live' ? 'badge-live' : 'badge-coming-soon'}`}>{p.status || 'draft'}</span></td>
                  <td>
                    <button onClick={() => togglePublish(p)} className={`toggle ${p.is_published ? 'on' : ''}`} aria-label="Toggle published" />
                  </td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => startEdit(p)} className="btn btn-outline-black btn-sm table-action-btn">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="btn btn-sm table-action-btn" style={{ color: 'var(--red)', background: 'rgba(217,31,37,0.06)' }}>Delete</button>
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
