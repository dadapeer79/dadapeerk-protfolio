import AdminSidebar from '@/components/AdminSidebar'

export const metadata = { title: 'Admin — Dadapeer K Portfolio' }

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  )
}
