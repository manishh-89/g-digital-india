import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import Gallery from '@/models/Gallery'
import Testimonial from '@/models/Testimonial'
import Enquiry from '@/models/Enquiry'
import Service from '@/models/Service'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  await connectDB()

  // Fetch all counts concurrently with fallback for DB disconnect
  let counts = [0, 0, 0, 0, 0];
  try {
    counts = await Promise.all([
      Project.countDocuments().catch(() => 0),
      Gallery.countDocuments().catch(() => 0),
      Testimonial.countDocuments().catch(() => 0),
      Enquiry.countDocuments().catch(() => 0),
      Service.countDocuments().catch(() => 0)
    ]);
  } catch (err: any) {
    console.warn("⚠️ Dashboard data fetch failed:", err.message);
  }
  const [projectCount, galleryCount, testimonialCount, enquiryCount, serviceCount] = counts;

  const stats = [
    { label: 'Projects', value: projectCount.toString(), icon: <i className="fa-solid fa-folder-open" style={{ color: "#2563eb" }}></i>, color: 'blue' },
    { label: 'Services', value: serviceCount.toString(), icon: <i className="fa-solid fa-briefcase" style={{ color: "#6e5daa" }}></i>, color: 'indigo' },
    { label: 'Gallery', value: galleryCount.toString(), icon: <i className="fa-solid fa-images" style={{ color: "#10b981" }}></i>, color: 'green' },
    { label: 'Testimonials', value: testimonialCount.toString(), icon: <i className="fa-solid fa-star" style={{ color: "#f59e0b" }}></i>, color: 'yellow' },
    { label: 'Enquiries', value: enquiryCount.toString(), icon: <i className="fa-solid fa-envelope" style={{ color: "#8b5cf6" }}></i>, color: 'purple' },
  ]

  const quickActions = [
    { href: '/admin/projects/new', icon: <i className="fa-solid fa-plus"></i>, label: 'Add New Project' },
    { href: '/admin/services', icon: <i className="fa-solid fa-plus"></i>, label: 'Add Service' },
    { href: '/admin/gallery', icon: <i className="fa-solid fa-plus"></i>, label: 'Upload Gallery' },
    { href: '/admin/testimonials', icon: <i className="fa-solid fa-plus"></i>, label: 'Add Testimonial' },
    { href: '/admin/enquiries', icon: <i className="fa-solid fa-plus"></i>, label: 'View Enquiries' },
  ]

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here&apos;s an overview of your website content.</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className={`admin-stat-card ${stat.color}`}>
            <div className={`admin-stat-icon ${stat.color}`}>
              <span>{stat.icon}</span>
            </div>
            <div className="admin-stat-info">
              <p className="admin-stat-label">{stat.label}</p>
              <p className="admin-stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">⚡ Quick Actions</h2>
        </div>
        <div className="admin-quick-actions">
          {quickActions.map((action) => (
            <a key={action.href} href={action.href} className="admin-quick-btn">
              <span className="btn-icon">{action.icon}</span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">📋 Recent Activity</h2>
          <span className="admin-badge info">Coming Soon</span>
        </div>
        <div className="admin-empty">
          <div className="admin-empty-icon">📭</div>
          <p className="admin-empty-text">No recent activity yet</p>
          <p className="admin-empty-sub">Start by adding projects or uploading gallery images.</p>
        </div>
      </div>
    </div>
  )
}
