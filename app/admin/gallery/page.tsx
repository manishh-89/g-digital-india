'use client'

import { useEffect, useState } from 'react'

interface GalleryImage {
  _id: string
  url: string
  title?: string
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetchImages() }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery')
      if (res.ok) setImages(await res.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'gallery')

    try {
      const up = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!up.ok) { 
        let errorMsg = 'Unknown error';
        try {
          const errData = await up.json()
          errorMsg = errData.error || errData.message || up.statusText
        } catch(e) {
          errorMsg = up.statusText
        }
        alert(`Upload failed: ${up.status} ${errorMsg}`)
        return 
      }
      const { url } = await up.json()

      const save = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, category: 'General', title: file.name })
      })
      if (save.ok) { fetchImages(); e.target.value = '' }
      else alert('Failed to save image')
    } catch (err) { console.error(err); alert('Upload error') }
    finally { setUploading(false) }
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    if (res.ok) setImages(imgs => imgs.filter(i => i._id !== id))
    else alert('Failed to delete')
  }

  if (loading) return (
    <div className="admin-empty" style={{ marginTop: 80 }}>
      <div className="admin-empty-icon">⏳</div>
      <p className="admin-empty-text">Loading gallery...</p>
    </div>
  )

  return (
    <div>
      {/* Page header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">🖼️ Gallery</h1>
        <p className="admin-page-subtitle">Upload and manage your gallery images</p>
      </div>

      {/* Upload Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">📤 Upload New Image</h2>
          <span className="admin-badge success">{images.length} images</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 260px' }}>
            <input type="file" accept="image/*" id="gallery-upload" className="hidden"
              style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
            <label htmlFor="gallery-upload" className="admin-btn-primary"
              style={{ display: 'inline-flex', cursor: 'pointer', opacity: uploading ? 0.7 : 1 }}>
              {uploading ? '⏳ Uploading...' : '📸 Choose & Upload Image'}
            </label>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">🖼️</div>
            <p className="admin-empty-text">No images uploaded yet</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {images.map(img => (
            <div key={img._id} className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={img.url} alt={img.title || "Gallery Image"}
                  style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '10px 12px' }}>
                <p style={{ fontSize: 12, color: 'var(--admin-text-secondary)', marginBottom: 8, 
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {img.title || 'Untitled Image'}
                </p>
                <button onClick={() => deleteImage(img._id)} className="admin-btn-danger"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
