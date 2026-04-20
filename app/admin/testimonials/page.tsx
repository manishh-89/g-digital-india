'use client'

import { useEffect, useState } from 'react'


interface Testimonial {
  _id: string
  name: string
  role: string
  company: string
  review: string
  avatar?: string
  rating?: number
  metric?: string
  short?: string
  industry?: string
  initials?: string
}

const empty = { name: '', role: '', company: '', review: '', avatar: '', rating: 5, metric: '', short: '', industry: '', initials: '' }

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(empty)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/testimonials')
      if (res.ok) setTestimonials(await res.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append('file', file); fd.append('folder', 'testimonials')
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) { const { url } = await res.json(); setFormData(p => ({ ...p, avatar: url }) ) }
    else alert('Upload failed')
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials'
    
    // Auto-generate initials if not provided
    console.log('--- 🧪 Testimonial Submission Started ---');
    const payload = { ...formData }
    console.log('--- 📦 Payload Data:', JSON.stringify(payload, null, 2));

    if (!payload.initials && payload.name) {
      payload.initials = payload.name.trim().split(/\s+/).map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
    
    if (res.ok) { 
      setShowForm(false); 
      setFormData(empty); 
      setEditingId(null);
      fetchAll() 
    }
    else {
      const err = await res.json().catch(() => ({ error: 'Unknown server error' }))
      alert(`Failed to save testimonial: ${err.error || 'Server error'}`)
    }
    setSubmitting(false)
  }

  const editOne = (t: Testimonial) => {
    setFormData({
      name: t.name,
      role: t.role,
      company: t.company,
      review: t.review,
      avatar: t.avatar || '',
      rating: t.rating || 5,
      metric: t.metric || '',
      short: t.short || '',
      industry: t.industry || '',
      initials: t.initials || '',
      featured: (t as any).featured || false
    } as any)
    setEditingId(t._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteOne = async (id: string) => {
    console.log('Attempting deletion of:', id)
    if (!confirm('Delete this testimonial?')) return
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      if (res.ok) fetchAll()
      else alert('Failed to delete')
    } catch (e) {
      alert('Network error')
    }
  }

  const inp = (field: string) => ({
    value: formData[field as keyof typeof formData],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFormData(p => ({ ...p, [field]: e.target.value }))
  })

  const setRating = (r: number) => setFormData(p => ({ ...p, rating: r }))

  if (loading) return (
    <div className="admin-empty" style={{ marginTop: 80 }}>
      <div className="admin-empty-icon">⏳</div>
      <p className="admin-empty-text">Loading testimonials...</p>
    </div>
  )

  return (
    <div>
      {/* Page header */}
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">⭐ Testimonials</h1>
          <p className="admin-page-subtitle">Manage customer reviews and feedback</p>
        </div>
        <button className={showForm && !editingId ? 'admin-btn-secondary' : 'admin-btn-primary'} 
          onClick={() => { 
            if (showForm && editingId) {
              setEditingId(null);
              setFormData(empty);
            } else {
              setShowForm(!showForm);
              setFormData(empty);
              setEditingId(null);
            }
          }}>
          {showForm ? '✖ Cancel' : '➕ Add Testimonial'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="admin-card" style={{ borderLeft: '4px solid var(--admin-primary)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--admin-text-primary)', marginBottom: 20 }}>
            {editingId ? 'Edit Testimonial' : 'New Testimonial'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Name *</label>
                <input className="admin-input" required placeholder="Client name" {...inp('name')} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Role *</label>
                <input className="admin-input" required placeholder="e.g. CEO" {...inp('role')} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Company *</label>
                <input className="admin-input" required placeholder="Company name" {...inp('company')} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Industry</label>
                <input className="admin-input" placeholder="e.g. Fintech / D2C" {...inp('industry')} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
               <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Short Highlight (e.g. "Revenue doubled")</label>
                <input className="admin-input" placeholder="Brief snippet" {...inp('short')} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Star Rating</label>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {[1,2,3,4,5].map(star => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{ 
                        background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, padding: 0,
                        color: star <= (formData.rating || 0) ? '#fbbf24' : '#e5e7eb'
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Metric Value & Label * (e.g. "9x ROAS Achieved")</label>
              <input className="admin-input" required placeholder="Metric snippet" {...inp('metric')} />
              <p style={{ fontSize: 11, color: '#6d7280', marginTop: 4 }}>Note: First word is shown in bold on the website card.</p>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Full Review *</label>
              <textarea 
                className="admin-textarea" 
                rows={6} 
                placeholder="Enter client review (HTML allowed)..."
                value={formData.review} 
                onChange={e => setFormData(p => ({ ...p, review: e.target.value }))} 
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Avatar Photo</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: 13 }} />
                {uploading && <span style={{ fontSize: 13, color: 'var(--admin-primary)' }}>⏳ Uploading...</span>}
              </div>
              {formData.avatar && (
                <div style={{ marginTop: 12, position: 'relative', width: 80, height: 80 }}>
                  <img src={formData.avatar} alt="preview"
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
                      border: '3px solid var(--admin-primary-light)' }} />
                  <button type="button" 
                    onClick={() => setFormData(p => ({ ...p, avatar: '' }))}
                    style={{ position: 'absolute', top: -5, right: -5, background: '#ef4444', color: 'white', 
                      border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12 }}>
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" className="admin-btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
              <button type="submit" className="admin-btn-primary" disabled={submitting}>
                {submitting ? '⏳ Saving...' : (editingId ? '✅ Update Testimonial' : '✅ Save Testimonial')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {testimonials.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">⭐</div>
            <p className="admin-empty-text">No testimonials yet</p>
            <p className="admin-empty-sub">Add your first client testimonial</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 16 }}>
          {testimonials.map(t => (
            <div key={t._id} className="admin-card"
              style={{ display: 'flex', flexDirection: 'column', gap: 12, borderLeft: '4px solid var(--admin-warning)', position: 'relative' }}>
              
              {/* Actions Header */}
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                <button onClick={() => editOne(t)} className="admin-btn-secondary" 
                  style={{ padding: '6px 10px', fontSize: 12, background: '#f3f4f6' }}>
                  ✏️ Edit
                </button>
                <button onClick={() => deleteOne(t._id)} className="admin-btn-danger" 
                   style={{ padding: '6px 10px', fontSize: 12, background: '#fee2e2', color: '#ef4444' }}>
                  🗑️ Delete
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                {/* Avatar */}
                <div style={{ flexShrink: 0 }}>
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name}
                      style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover',
                        border: '3px solid #fef3c7' }} />
                  ) : (
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fef3c7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#d97706' }}>
                      {t.name[0]}
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ flex: 1, paddingRight: 80 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, color: 'var(--admin-text-primary)', fontSize: 16 }}>{t.name}</span>
                    <span className="admin-badge warning" style={{ fontSize: 10 }}>⭐ {t.rating || 5}/5</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', marginBottom: 4 }}>
                    {t.role} at <strong>{t.company}</strong>
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {t.industry && (
                      <span style={{ fontSize: 10, background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
                        {t.industry}
                      </span>
                    )}
                    {t.metric && (
                      <span style={{ fontSize: 11, background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                        📈 {t.metric}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Review */}
              <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8, border: '1px inset #eee' }}>
                {t.short && <strong style={{ display: 'block', fontSize: 13, marginBottom: 4, color: 'var(--admin-primary)' }}>&quot;{t.short}&quot;</strong>}
                <p style={{ fontSize: 14, color: 'var(--admin-text-primary)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                  &quot;{t.review}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
