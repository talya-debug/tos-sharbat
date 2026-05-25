import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-sidebar-bg flex flex-col items-center justify-center text-center px-4">
      {/* אייקון מגן */}
      <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-8">
        <span className="material-symbols-outlined text-white text-[48px]">verified_user</span>
      </div>

      {/* כותרת */}
      <h1 className="text-[64px] font-black text-white tracking-tight mb-4">TOS</h1>
      <p className="text-white/70 text-[20px] mb-2">מערכת ניהול איכות לפרויקטי בנייה</p>
      <p className="text-white/40 text-[14px] mb-12">Construction Quality Management Platform</p>

      {/* כפתור כניסה */}
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-action-blue hover:bg-action-blue/90 text-white px-10 py-3 rounded-full text-[16px] font-medium transition-all duration-200 shadow-lg shadow-action-blue/30 cursor-pointer"
      >
        כניסה למערכת
      </button>

      {/* קרדיט */}
      <p className="absolute bottom-8 text-white/20 text-[12px] tracking-[0.2em]">OSHER ASULIN</p>
    </div>
  )
}
