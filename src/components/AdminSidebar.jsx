'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/content', label: 'Site Content' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/alona-label', label: 'Alona Label' },
  { href: '/admin/milky-mirchi', label: 'Milky Mirchi' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/media', label: 'Media Library' },
  { href: '/admin/messages', label: 'Messages', badge: true },
  { href: '/admin/settings', label: 'Settings' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">DK. ADMIN</div>
      <nav className="admin-nav">
        {navItems.map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} className={`admin-nav-link ${active ? 'active' : ''}`}>
              {item.label}
              {item.badge && <span className="admin-nav-badge">N</span>}
            </Link>
          )
        })}
      </nav>
      <div className="admin-sidebar-bottom">
        <Link href="/" target="_blank" className="admin-sidebar-btn">View live site ↗</Link>
        <Link href="/admin/login" className="admin-sidebar-btn" style={{ borderColor: '#ff4444', color: '#ff7777' }}>Log out</Link>
      </div>
    </aside>
  )
}
