'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div style={{ height: '200px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', borderRadius: 8 }}>Loading Editor...</div>
})
import 'react-quill-new/dist/quill.snow.css'

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'clean']
  ],
}

interface Service {
  _id: string
  title: string
  slug: string
  category: string
  industry: string
  short: string
  description: string
  highlight: string
  tags: string[]
  image: string
  heroStats: { num: string; label: string }[]
  offers: { title: string; text: string; icon: string }[]
  steps: { title: string; text: string }[]
  faqs: { q: string; a: string }[]
  order: number
}

const empty = { 
  title: '', slug: '', category: '', industry: '', short: '', description: '', highlight: '', tags: [], image: '', 
  heroStats: [], offers: [], steps: [], faqs: [], order: 0 
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<any>(empty)
  const [tagsInput, setTagsInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) setServices(await res.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append('file', file); fd.append('folder', 'services')
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = await res.json()
      setFormData((p: any) => ({ ...p, image: url }))
    } catch (err) { alert('Upload failed') }
    setUploading(false)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setFormData({ ...formData, title, slug: editingId ? formData.slug : slug })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/services/${editingId}` : '/api/services'
    
    const payload = { ...formData, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) }

    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
    
    if (res.ok) { 
      setShowForm(false); 
      setFormData(empty); 
      setTagsInput('');
      setEditingId(null);
      fetchAll() 
    }
    else {
      const data = await res.json()
      alert(data.error || 'Failed to save service')
    }
    setSubmitting(false)
  }

  const editOne = (s: Service) => {
    setFormData({
      title: s.title,
      slug: s.slug || '',
      short: s.short,
      category: s.category || '',
      industry: s.industry || '',
      description: s.description,
      highlight: s.highlight,
      image: s.image || '',
      heroStats: s.heroStats || [],
      offers: s.offers || [],
      steps: s.steps || [],
      faqs: s.faqs || [],
      order: s.order || 0
    })
    setTagsInput((s.tags || []).join(', '))
    setEditingId(s._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteOne = async (id: string) => {
    if (!confirm('Delete this service?')) return
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
    if (res.ok) fetchAll()
    else alert('Failed to delete')
  }

  // Dynamic Array Handlers
  const addArrayItem = (key: string, item: any) => {
    setFormData({ ...formData, [key]: [...(formData[key] || []), item] })
  }
  const removeArrayItem = (key: string, idx: number) => {
    setFormData({ ...formData, [key]: formData[key].filter((_: any, i: number) => i !== idx) })
  }
  const updateArrayItem = (key: string, idx: number, field: string, val: any) => {
    const updated = [...formData[key]]
    updated[idx] = { ...updated[idx], [field]: val }
    setFormData({ ...formData, [key]: updated })
  }

  if (loading) return (
    <div className="admin-empty" style={{ marginTop: 80 }}>
      <div className="admin-empty-icon">⏳</div>
      <p className="admin-empty-text">Loading services...</p>
    </div>
  )

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">🛠️ Services</h1>
          <p className="admin-page-subtitle">Manage your service offerings</p>
        </div>
        <button className={showForm && !editingId ? 'admin-btn-secondary' : 'admin-btn-primary'} 
          onClick={() => { 
            setShowForm(!showForm); setFormData(empty); setTagsInput(''); setEditingId(null); 
          }}>
          {showForm ? '✖ Cancel' : '➕ Add Service'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: 30, animation: 'fadeIn 0.3s ease' }}>
          <h2 className="admin-card-title" style={{ marginBottom: 20 }}>
            {editingId ? '✏️ Edit Service' : '✨ New Service'}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Service Title *</label>
                <input required className="admin-input" placeholder="e.g. Search Engine Optimization"
                  value={formData.title} onChange={handleTitleChange} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Slug *</label>
                <input required className="admin-input" placeholder="e.g. seo-services"
                  value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Short Name *</label>
                <input required className="admin-input" placeholder="e.g. SEO"
                  value={formData.short} onChange={e => setFormData({...formData, short: e.target.value})} />
              </div>
            </div>

            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">Description</label>
              <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
                <ReactQuill theme="snow" modules={quillModules} value={formData.description} onChange={val => setFormData({...formData, description: val})} />
              </div>
            </div>

            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">Highlight Stats/Text</label>
              <input className="admin-input" placeholder="e.g. Avg. 340% increase in organic traffic"
                value={formData.highlight} onChange={e => setFormData({...formData, highlight: e.target.value})} />
            </div>

            {/* HERO STATS SECTION */}
            <div className="admin-card" style={{ background: '#f8fafc', padding: 15 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                 <h4 style={{ margin: 0 }}>📊 Hero Stats</h4>
                 <button type="button" className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }}
                   onClick={() => addArrayItem('heroStats', { num: '', label: '' })}>+ Add Stat</button>
               </div>
               {formData.heroStats.map((s: any, i: number) => (
                 <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 10, marginBottom: 8 }}>
                   <input className="admin-input" placeholder="Value (e.g. 3x)" value={s.num} onChange={e => updateArrayItem('heroStats', i, 'num', e.target.value)} />
                   <input className="admin-input" placeholder="Label (e.g. Traffic Increase)" value={s.label} onChange={e => updateArrayItem('heroStats', i, 'label', e.target.value)} />
                   <button type="button" className="admin-btn-danger" onClick={() => removeArrayItem('heroStats', i)}>🗑️</button>
                 </div>
               ))}
            </div>

            {/* OFFERS SECTION */}
            <div className="admin-card" style={{ background: '#f8fafc', padding: 15 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                 <h4 style={{ margin: 0 }}>🎁 What We Offer</h4>
                 <button type="button" className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }}
                   onClick={() => addArrayItem('offers', { title: '', text: '' })}>+ Add Offer</button>
               </div>
               {formData.offers.map((s: any, i: number) => (
                 <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 10, border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 10 }}>
                   <div style={{ display: 'flex', gap: 10 }}>
                     <input style={{ flex: 1 }} className="admin-input" placeholder="Offer Title" value={s.title} onChange={e => updateArrayItem('offers', i, 'title', e.target.value)} />
                     <button type="button" className="admin-btn-danger" onClick={() => removeArrayItem('offers', i)}>🗑️</button>
                   </div>
                   <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
                    <ReactQuill theme="snow" modules={quillModules} value={s.text} onChange={val => updateArrayItem('offers', i, 'text', val)} />
                   </div>
                 </div>
               ))}
            </div>

            {/* STEPS SECTION */}
            <div className="admin-card" style={{ background: '#f8fafc', padding: 15 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                 <h4 style={{ margin: 0 }}>🚀 Process Steps</h4>
                 <button type="button" className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }}
                   onClick={() => addArrayItem('steps', { title: '', text: '' })}>+ Add Step</button>
               </div>
               {formData.steps.map((s: any, i: number) => (
                 <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 10, border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 10 }}>
                   <div style={{ display: 'flex', gap: 10 }}>
                     <input style={{ flex: 1 }} className="admin-input" placeholder="Step Title" value={s.title} onChange={e => updateArrayItem('steps', i, 'title', e.target.value)} />
                     <button type="button" className="admin-btn-danger" onClick={() => removeArrayItem('steps', i)}>🗑️</button>
                   </div>
                   <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
                    <ReactQuill theme="snow" modules={quillModules} value={s.text} onChange={val => updateArrayItem('steps', i, 'text', val)} />
                   </div>
                 </div>
               ))}
            </div>

            {/* FAQS SECTION */}
            <div className="admin-card" style={{ background: '#f8fafc', padding: 15 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                 <h4 style={{ margin: 0 }}>❓ FAQs</h4>
                 <button type="button" className="admin-btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }}
                   onClick={() => addArrayItem('faqs', { q: '', a: '' })}>+ Add FAQ</button>
               </div>
               {formData.faqs.map((s: any, i: number) => (
                 <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 10, border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 10 }}>
                   <div style={{ display: 'flex', gap: 10 }}>
                     <input style={{ flex: 1 }} className="admin-input" placeholder="Question" value={s.q} onChange={e => updateArrayItem('faqs', i, 'q', e.target.value)} />
                     <button type="button" className="admin-btn-danger" onClick={() => removeArrayItem('faqs', i)}>🗑️</button>
                   </div>
                   <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
                    <ReactQuill theme="snow" modules={quillModules} value={s.a} onChange={val => updateArrayItem('faqs', i, 'a', val)} />
                   </div>
                 </div>
               ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Tags (comma separated)</label>
                <input className="admin-input" placeholder="e.g. Technical SEO, Link Building"
                  value={tagsInput} onChange={e => setTagsInput(e.target.value)} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-label">Order (display Priority)</label>
                <input type="number" className="admin-input" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
              </div>
            </div>

            <div className="admin-form-group" style={{ margin: 0 }}>
              <label className="admin-label">Cover Image</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {formData.image && (
                  <img src={formData.image} alt="Preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                )}
                <div>
                  <input type="file" accept="image/*" id="svc-img" style={{ display: 'none' }} onChange={handleImageUpload} />
                  <label htmlFor="svc-img" className="admin-btn-secondary" style={{ cursor: 'pointer', opacity: uploading ? 0.7 : 1 }}>
                    {uploading ? '⏳ Uploading...' : '📸 Choose Image'}
                  </label>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button type="submit" disabled={submitting || uploading} className="admin-btn-primary" style={{ padding: '10px 24px' }}>
                {submitting ? '⏳ Saving...' : '💾 Save Service'}
              </button>
            </div>
          </form>
        </div>
      )}

      {services.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">🛠️</div>
            <p className="admin-empty-text">No services added yet</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {services.map(s => (
            <div key={s._id} className="admin-card" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
              {s.image ? (
                <img src={s.image} alt={s.title} style={{ width: 100, height: 100, borderRadius: 10, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 100, height: 100, borderRadius: 10, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  🛠️
                </div>
              )}
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: 'var(--admin-text-primary)' }}>{s.title}</h3>
                  <span className="admin-badge primary">{s.short}</span>
                </div>
                <div 
                  className="admin-preview-text"
                  style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--admin-text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  dangerouslySetInnerHTML={{ __html: s.description }}
                />
                <div style={{ display: 'flex', gap: 6 }}>
                  {s.tags?.map((t, i) => <span key={i} className="admin-badge info" style={{ fontSize: 11 }}>{t}</span>)}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 100 }}>
                <button onClick={() => editOne(s)} className="admin-btn-secondary" style={{ justifyContent: 'center' }}>✏️ Edit</button>
                <button onClick={() => deleteOne(s._id)} className="admin-btn-danger" style={{ justifyContent: 'center' }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
