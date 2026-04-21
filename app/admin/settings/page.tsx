'use client'

import { useEffect, useState } from 'react'

interface Counter {
  label: string
  value: string
  icon: string
}

interface Settings {
  phone: string
  phone2: string
  email: string
  address: string
  counters: Counter[]
  socials: {
    facebook: string
    instagram: string
    linkedin: string
    twitter: string
    youtube: string
  }
}

const defaultSettings: Settings = {
  phone: '', phone2: '', email: '', address: '', counters: [],
  socials: {
    facebook: '', instagram: '', linkedin: '', twitter: '', youtube: ''
  }
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { fetchSettings() }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings', { cache: 'no-store' })
      if (res.ok) setSettings(await res.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else alert('Failed to save settings')
    } catch (e) { alert('Error saving'); console.error(e) }
    finally { setSaving(false) }
  }

  // Counter helpers
  const addCounter = () => {
    setSettings(s => ({ ...s, counters: [...s.counters, { label: '', value: '', icon: '🏆' }] }))
  }

  const removeCounter = (i: number) => {
    setSettings(s => ({ ...s, counters: s.counters.filter((_, idx) => idx !== i) }))
  }

  const updateCounter = (i: number, field: keyof Counter, val: string) => {
    setSettings(s => ({
      ...s,
      counters: s.counters.map((c, idx) => idx === i ? { ...c, [field]: val } : c)
    }))
  }

  if (loading) return (
    <div className="admin-empty" style={{ marginTop: 80 }}>
      <div className="admin-empty-icon">⏳</div>
      <p className="admin-empty-text">Loading settings...</p>
    </div>
  )

  return (
    <div>
      {/* Page header */}
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">⚙️ Global Settings</h1>
          <p className="admin-page-subtitle">Manage site-wide information — contact details and homepage counters</p>
        </div>
        {saved && (
          <div className="admin-badge success" style={{ fontSize: 13, padding: '8px 16px', animation: 'fadeIn 0.3s ease' }}>
            ✅ Saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave}>
        {/* ── Contact Information ── */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">📞 Contact Information</h2>
            <span className="admin-badge info">Shown on website</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">Primary Phone Number</label>
              <input className="admin-input" placeholder="+91 98765 43210"
                value={settings.phone}
                onChange={e => setSettings(s => ({ ...s, phone: e.target.value }))} />
            </div>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">Secondary Phone (optional)</label>
              <input className="admin-input" placeholder="+91 87654 32109"
                value={settings.phone2}
                onChange={e => setSettings(s => ({ ...s, phone2: e.target.value }))} />
            </div>
          </div>

          <div className="admin-form-group" style={{ marginTop: 16 }}>
            <label className="admin-label">Email Address</label>
            <input className="admin-input" type="email" placeholder="info@yoursite.com"
              value={settings.email}
              onChange={e => setSettings(s => ({ ...s, email: e.target.value }))} />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Office Address</label>
            <textarea className="admin-textarea" rows={2} placeholder="123, MG Road, New Delhi - 110001"
              value={settings.address}
              onChange={e => setSettings(s => ({ ...s, address: e.target.value }))} />
          </div>
        </div>

        {/* ── Counters ── */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">📊 Homepage Counters</h2>
            <button type="button" className="admin-btn-primary" onClick={addCounter}
              style={{ fontSize: 13, padding: '7px 14px' }}>
              ➕ Add Counter
            </button>
          </div>

          <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', marginBottom: 18 }}>
            These stats/numbers appear on your homepage (e.g. Happy Clients, Projects Completed).
          </p>

          {settings.counters.length === 0 ? (
            <div className="admin-empty" style={{ padding: '32px 0' }}>
              <div className="admin-empty-icon">📊</div>
              <p className="admin-empty-text">No counters yet</p>
              <p className="admin-empty-sub">Click "Add Counter" to add homepage stats</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {settings.counters.map((counter, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr auto', gap: 12,
                  alignItems: 'end', padding: '14px 16px', background: 'var(--admin-body-bg)',
                  borderRadius: 10, border: '1px solid var(--admin-border)' }}>
                  <div>
                    <label className="admin-label" style={{ fontSize: 11 }}>Icon (emoji)</label>
                    <input className="admin-input" placeholder="🏆" maxLength={4}
                      value={counter.icon}
                      onChange={e => updateCounter(i, 'icon', e.target.value)}
                      style={{ padding: '8px 10px', fontSize: 20, textAlign: 'center' }} />
                  </div>
                  <div>
                    <label className="admin-label" style={{ fontSize: 11 }}>Label</label>
                    <input className="admin-input" required placeholder="Happy Clients"
                      value={counter.label}
                      onChange={e => updateCounter(i, 'label', e.target.value)} />
                  </div>
                  <div>
                    <label className="admin-label" style={{ fontSize: 11 }}>Value</label>
                    <input className="admin-input" required placeholder="500+"
                      value={counter.value}
                      onChange={e => updateCounter(i, 'value', e.target.value)} />
                  </div>
                  <button type="button" onClick={() => removeCounter(i)} className="admin-btn-danger"
                    style={{ marginBottom: 0, padding: '10px 12px' }}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Preview */}
          {settings.counters.length > 0 && (
            <div style={{ marginTop: 20, padding: '16px', background: '#f8fafc', borderRadius: 10,
              border: '1px dashed var(--admin-border)' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--admin-text-secondary)',
                textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
                📱 Preview
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {settings.counters.map((c, i) => (
                  <div key={i} style={{ textAlign: 'center', minWidth: 100 }}>
                    <div style={{ fontSize: 28 }}>{c.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-primary)' }}>{c.value || '??'}</div>
                    <div style={{ fontSize: 12, color: 'var(--admin-text-secondary)' }}>{c.label || 'Label'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Social Media Links ── */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">🌐 Social Media Links</h2>
            <span className="admin-badge primary">Links for footer/header</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">Instagram URL</label>
              <input className="admin-input" placeholder="https://instagram.com/..."
                value={settings.socials?.instagram}
                onChange={e => setSettings(s => ({ ...s, socials: { ...s.socials, instagram: e.target.value } }))} />
            </div>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">LinkedIn URL</label>
              <input className="admin-input" placeholder="https://linkedin.com/company/..."
                value={settings.socials?.linkedin}
                onChange={e => setSettings(s => ({ ...s, socials: { ...s.socials, linkedin: e.target.value } }))} />
            </div>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">Facebook URL</label>
              <input className="admin-input" placeholder="https://facebook.com/..."
                value={settings.socials?.facebook}
                onChange={e => setSettings(s => ({ ...s, socials: { ...s.socials, facebook: e.target.value } }))} />
            </div>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">Twitter / X URL</label>
              <input className="admin-input" placeholder="https://twitter.com/..."
                value={settings.socials?.twitter}
                onChange={e => setSettings(s => ({ ...s, socials: { ...s.socials, twitter: e.target.value } }))} />
            </div>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">YouTube URL</label>
              <input className="admin-input" placeholder="https://youtube.com/@..."
                value={settings.socials?.youtube}
                onChange={e => setSettings(s => ({ ...s, socials: { ...s.socials, youtube: e.target.value } }))} />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
          <button type="submit" className="admin-btn-primary" disabled={saving}
            style={{ padding: '12px 32px', fontSize: 15 }}>
            {saving ? '⏳ Saving...' : '💾 Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
