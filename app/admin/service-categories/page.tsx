'use client'

import { useEffect, useState } from 'react'

interface ServiceCategory {
  _id: string
  name: string
  order: number
}

const empty = { name: '', order: 0 }

export default function AdminServiceCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(empty)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/service-categories')
      if (res.ok) setCategories(await res.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/service-categories/${editingId}` : '/api/service-categories'
    
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
    })
    
    if (res.ok) { 
      setShowForm(false); 
      setFormData(empty); 
      setEditingId(null);
      fetchAll() 
    }
    else alert('Failed to save category')
    setSubmitting(false)
  }

  const editOne = (c: ServiceCategory) => {
    setFormData({ name: c.name, order: c.order || 0 })
    setEditingId(c._id)
    setShowForm(true)
  }

  const deleteOne = async (id: string) => {
    if (!confirm('Delete this category?')) return
    const res = await fetch(`/api/service-categories/${id}`, { method: 'DELETE' })
    if (res.ok) fetchAll()
    else alert('Failed to delete')
  }

  if (loading) return (
    <div className="admin-empty" style={{ marginTop: 80 }}>
      <div className="admin-empty-icon">⏳</div>
      <p className="admin-empty-text">Loading categories...</p>
    </div>
  )

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">📁 Service Categories</h1>
          <p className="admin-page-subtitle">Manage main categories (e.g., Digital Marketing, Website Designing)</p>
        </div>
        <button className={showForm && !editingId ? 'admin-btn-secondary' : 'admin-btn-primary'} 
          onClick={() => { 
            if (showForm && editingId) { setEditingId(null); setFormData(empty); }
            else { setShowForm(!showForm); setFormData(empty); setEditingId(null); }
          }}>
          {showForm ? '✖ Cancel' : '➕ Add Category'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--admin-text-primary)', marginBottom: 20 }}>
            {editingId ? 'Edit Category' : 'New Category'}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <div className="admin-form-group" style={{ margin: 0, flex: 1 }}>
              <label className="admin-label">Category Name *</label>
              <input className="admin-input" required placeholder="e.g. Digital Marketing" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="admin-form-group" style={{ margin: 0, width: 100 }}>
              <label className="admin-label">Order</label>
              <input type="number" className="admin-input" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
            </div>
            <button type="submit" className="admin-btn-primary" disabled={submitting}>
              {submitting ? '⏳...' : '✅ Save'}
            </button>
          </form>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">📁</div>
            <p className="admin-empty-text">No categories added yet</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {categories.map(c => (
            <div key={c._id} className="admin-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, color: 'var(--admin-text-primary)' }}>{c.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--admin-text-secondary)' }}>Order: {c.order}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => editOne(c)} className="admin-btn-secondary" style={{ padding: '6px 10px', fontSize: 12 }}>✏️ Edit</button>
                <button onClick={() => deleteOne(c._id)} className="admin-btn-danger" style={{ padding: '6px 10px', fontSize: 12 }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
