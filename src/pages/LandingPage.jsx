import { useNavigate } from 'react-router-dom';
import { HardHat, Shield, Globe } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { toggleLang, isHe } = useLang();

  return (
    <div className="landing">
      <button className="landing-lang" onClick={toggleLang}>
        <Globe size={16} />
        <span>{isHe ? 'EN' : 'עב'}</span>
      </button>

      <div className="landing-hero">
        <div className="landing-icon">
          <Shield size={48} strokeWidth={1.5} />
          <HardHat size={32} className="landing-icon-overlay" />
        </div>
        <h1 className="landing-title">TOS</h1>
        <p className="landing-subtitle">
          {isHe ? 'מערכת ניהול איכות בבנייה' : 'Construction Quality Control System'}
        </p>
        <p className="landing-subtitle-en">
          {isHe ? 'Quality Control Management System' : 'מערכת ניהול איכות בבנייה'}
        </p>

        <button className="landing-cta" onClick={() => navigate('/trades')}>
          {isHe ? 'כניסה למערכת' : 'Enter System'}
        </button>
      </div>

      <footer className="landing-footer">
        <span>By <strong>OSHER ASULIN</strong></span>
      </footer>
    </div>
  );
}
