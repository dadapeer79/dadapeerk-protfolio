'use client'
export default function AdminSettings() {
  return (
    <div>
      <div className="admin-topbar">
        <h1 className="admin-page-title">SETTINGS</h1>
      </div>
      <div className="admin-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">Site Theme</p>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'rgba(11,11,11,0.6)' }}>Adjust the core brand colors used across the portfolio.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Poster Red</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: 40, height: 40, background: 'var(--red)', borderRadius: 6, flexShrink: 0, border: '1px solid rgba(11,11,11,0.1)' }} />
                    <input className="form-input" defaultValue="#D91F25" style={{ fontFamily: 'var(--font-mono)' }} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Neon Lime</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: 40, height: 40, background: 'var(--lime)', borderRadius: 6, flexShrink: 0, border: '1px solid rgba(11,11,11,0.1)' }} />
                    <input className="form-input" defaultValue="#B8FF2C" style={{ fontFamily: 'var(--font-mono)' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button className="btn btn-black btn-sm">Save Theme</button>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-section-label">Account & Security</p>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Update Password</label>
                <input type="password" placeholder="New password" className="form-input" />
                <input type="password" placeholder="Confirm new password" className="form-input" style={{ marginTop: '0.25rem' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button className="btn btn-black btn-sm">Update Password</button>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ gridColumn: '1 / -1' }}>
            <div className="admin-card-header">
              <p className="admin-section-label">Data Management</p>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Export All Data</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(11,11,11,0.6)', marginTop: '0.25rem' }}>Download a complete JSON backup of projects, blogs, and settings.</p>
              </div>
              <button className="btn btn-outline-black">Export Content (JSON)</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
