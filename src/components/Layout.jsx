import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'לוח בקרה' },
  { to: '/dashboard', icon: 'architecture', label: 'ניהול מקצועות', match: ['/dashboard', '/trade'] },
  { to: '#', icon: 'fact_check', label: 'בקרת איכות' },
  { to: '#', icon: 'assessment', label: 'דוחות' },
  { to: '#', icon: 'event_note', label: 'יומן אתר' },
  { to: '#', icon: 'group', label: 'צוות' },
  { to: '#', icon: 'settings', label: 'הגדרות' },
]

export default function Layout({ children }) {
  const location = useLocation()

  const isActive = (item) => {
    if (item.match) {
      return item.match.some(m => location.pathname.startsWith(m))
    }
    return location.pathname === item.to
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* סיידבר */}
      <aside className="fixed right-0 top-0 h-full flex flex-col z-40 bg-sidebar-bg w-[240px] shadow-sm">
        <div className="p-6 flex flex-col items-center">
          <h1 className="text-[24px] leading-[32px] font-bold text-white mb-1">TOS QC Platform</h1>
          <p className="text-white/50 text-[12px] tracking-wider">מערכת ניהול איכות</p>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item, i) => {
            const active = isActive(item)
            return (
              <NavLink
                key={i}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  active
                    ? 'text-white bg-white/10 border-r-4 border-secondary-container font-bold'
                    : 'text-white/70 hover:bg-white/[0.08]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-[14px]">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
        <div className="p-4 mt-auto border-t border-white/10">
          <a className="flex items-center gap-3 px-4 py-2 text-white/70 hover:bg-white/[0.08] transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="text-[14px]">פרופיל משתמש</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 text-white/70 hover:bg-white/[0.08] transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-[14px]">התנתק</span>
          </a>
        </div>
      </aside>

      {/* הדר */}
      <header className="fixed top-0 left-0 right-[240px] flex items-center justify-between px-8 h-16 z-30 bg-white border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-[24px] leading-[32px] font-black text-primary-dark">TOS</span>
          <div className="h-6 w-px bg-border mx-2"></div>
          <span className="text-primary-dark font-bold text-[20px]">ניהול איכות</span>
        </div>
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              className="w-full bg-bg border-none rounded-full py-2 pr-10 pl-4 focus:ring-2 focus:ring-action-blue/50 text-[14px] outline-none"
              placeholder="חיפוש מהיר..."
              type="text"
            />
            <span className="material-symbols-outlined absolute right-3 top-2 text-text-secondary">search</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary cursor-pointer">notifications</span>
            <span className="material-symbols-outlined text-primary cursor-pointer">help_outline</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[14px]">
            TO
          </div>
        </div>
      </header>

      {/* תוכן ראשי */}
      <main className="mr-[240px] pt-24 pb-12 px-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
