'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('inbox')
  const [loading, setLoading] = useState(true)

  useState(() => {
    loadMessages()
  })

  async function loadMessages() {
    setLoading(true)
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('is_archived', tab === 'archived')
      .order('created_at', { ascending: false })
    setMessages(data || [])
    setLoading(false)
  }

  async function markRead(id, val) {
    await supabase.from('contact_messages').update({ is_read: val }).eq('id', id)
    setMessages(m => m.map(msg => msg.id === id ? { ...msg, is_read: val } : msg))
    if (selected?.id === id) setSelected(s => ({ ...s, is_read: val }))
  }

  async function archive(id) {
    await supabase.from('contact_messages').update({ is_archived: true }).eq('id', id)
    setMessages(m => m.filter(msg => msg.id !== id))
    setSelected(null)
  }

  async function deleteMsg(id) {
    if (!window.confirm('Delete this message permanently?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    setMessages(m => m.filter(msg => msg.id !== id))
    setSelected(null)
  }

  const fmtDate = (d) => new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">MESSAGES</h1>
      </div>
      <div className="admin-content">
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
          {/* List */}
          <div className="admin-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(11,11,11,0.08)' }}>
              {['inbox', 'archived'].map(t => (
                <button key={t} onClick={() => { setTab(t); setSelected(null); loadMessages() }}
                  style={{ flex: 1, padding: '0.75rem', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid var(--red)' : '2px solid transparent', color: tab === t ? 'var(--red)' : 'rgba(11,11,11,0.5)', cursor: 'pointer' }}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {loading ? (
                <p style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'rgba(11,11,11,0.4)' }}>Loading…</p>
              ) : messages.length === 0 ? (
                <p style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'rgba(11,11,11,0.4)', fontStyle: 'italic' }}>No messages in {tab}.</p>
              ) : messages.map(m => (
                <div key={m.id} className={`message-row ${!m.is_read ? 'unread' : ''}`}
                  onClick={() => { setSelected(m); markRead(m.id, true) }}
                  style={{ borderBottom: '1px solid rgba(11,11,11,0.06)', background: selected?.id === m.id ? 'rgba(217,31,37,0.05)' : undefined }}>
                  {!m.is_read && <div className="message-dot" />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: m.is_read ? 500 : 700, fontSize: '0.85rem' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(11,11,11,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.message?.substring(0, 60)}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(11,11,11,0.35)', marginTop: '0.2rem' }}>{fmtDate(m.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {selected ? (
              <>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(11,11,11,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{selected.name}</h2>
                      <a href={`mailto:${selected.email}`} style={{ fontSize: '0.82rem', color: 'var(--red)', fontWeight: 500 }}>{selected.email}</a>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <a href={`mailto:${selected.email}?subject=Re: Your message`} className="btn btn-outline-black btn-sm">Reply via email</a>
                      <button onClick={() => markRead(selected.id, !selected.is_read)} className="btn btn-outline-black btn-sm">
                        {selected.is_read ? 'Mark unread' : 'Mark read'}
                      </button>
                      {!selected.is_archived && (
                        <button onClick={() => archive(selected.id)} className="btn btn-outline-black btn-sm">Archive</button>
                      )}
                      <button onClick={() => deleteMsg(selected.id)} className="btn btn-sm" style={{ background: 'rgba(217,31,37,0.1)', color: 'var(--red)' }}>Delete</button>
                    </div>
                  </div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'rgba(11,11,11,0.4)', fontFamily: 'var(--font-mono)' }}>{fmtDate(selected.created_at)}</div>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
                  <p style={{ lineHeight: 1.8, color: 'rgba(11,11,11,0.8)', whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(11,11,11,0.3)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                Select a message to read it
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
