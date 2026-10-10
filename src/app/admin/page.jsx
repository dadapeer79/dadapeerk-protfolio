'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, drafts: 0, designs: 0, reels: 0, messages: 0, media: 0 })
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const [{ count: pub }, { count: draft }, { count: designs }, { count: reels }, { count: msgs }] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_published', false),
          supabase.from('alona_label_designs').select('*', { count: 'exact', head: true }),
          supabase.from('milky_mirchi_reels').select('*', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
        ])
        setStats({ projects: pub || 0, drafts: draft || 0, designs: designs || 0, reels: reels || 0, messages: msgs || 0, media: 0 })

        const { data: recentMsgs } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)
        setMessages(recentMsgs || [])
      } catch (e) {
        console.error('Dashboard stats error:', e)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const statCards = [
    { label: 'Published projects', value: stats.projects },
    { label: 'Draft projects', value: stats.drafts },
    { label: 'Alona designs', value: stats.designs },
    { label: 'Milky Mirchi reels', value: stats.reels },
    { label: 'Unread messages', value: stats.messages },
    { label: 'Media files', value: stats.media },
  ]

  const quickActions = [
    { label: '+ New project', href: '/admin/projects', variant: 'btn-red' },
    { label: 'Upload media', href: '/admin/media', variant: 'btn-black' },
    { label: 'Add reel', href: '/admin/milky-mirchi', variant: 'btn-outline-black' },
    { label: 'Edit hero', href: '/admin/content', variant: 'btn-outline-black' },
    { label: 'View messages', href: '/admin/messages', variant: 'btn-outline-black' },
  ]

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">DASHBOARD</h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/admin/projects" className="btn btn-red btn-sm">+ New</Link>
          <div style={{ width: 36, height: 36, background: 'var(--black)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, color: 'var(--white)', fontSize: '0.9rem' }}>DK</div>
        </div>
      </div>

      <div className="admin-content">
        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
          {statCards.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-value">{loading ? '—' : s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {quickActions.map((a, i) => (
            <Link key={i} href={a.href} className={`btn ${a.variant} btn-sm`}>{a.label}</Link>
          ))}
        </div>

        {/* Bottom panels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {/* Recent activity */}
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">Recent Activity</p>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'rgba(11,11,11,0.45)', fontStyle: 'italic' }}>Activity log will appear here as you make changes.</p>
            </div>
          </div>

          {/* Latest messages */}
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">Latest Messages</p>
              <Link href="/admin/messages" style={{ fontSize: '0.75rem', color: 'var(--red)', fontWeight: 600 }}>View all</Link>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {messages.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'rgba(11,11,11,0.45)', fontStyle: 'italic' }}>No messages yet.</p>
              ) : messages.map((m, i) => (
                <div key={i}>
                  <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(11,11,11,0.5)' }}>{m.message?.substring(0, 60)}…</div>
                </div>
              ))}
            </div>
          </div>

          {/* Setup checklist */}
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">Setup Checklist</p>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                'Add screenshots to projects',
                'Replace the placeholder 3D avatar',
                'Write the Alona Label brand story',
                'Add alt text to media files',
              ].map((item, i) => (
                <label key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer', fontSize: '0.8rem', color: 'rgba(11,11,11,0.7)' }}>
                  <input type="checkbox" style={{ marginTop: 2, accentColor: 'var(--red)' }} />
                  {item}
                </label>
              ))}
              <p style={{ fontSize: '0.68rem', color: 'rgba(11,11,11,0.35)', marginTop: '0.5rem' }}>Items here are examples; real ones come from your content.</p>
            </div>
          </div>
        </div>

        {/* Site sections toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">Site Sections</p>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Projects', 'Alona Label', 'Milky Mirchi', 'Blog', 'Journey'].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{s}</span>
                  <button className={`toggle ${i < 3 ? 'on' : ''}`} aria-label={`Toggle ${s}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
