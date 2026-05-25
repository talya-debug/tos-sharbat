import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function Header({ title, showBack = true }) {
  const navigate = useNavigate();
  const { toggleLang, isHe } = useLang();

  return (
    <header className="header">
      <div className="header-content">
        {showBack ? (
          <button className="header-back" onClick={() => navigate(-1)}>
            <ArrowRight size={22} />
          </button>
        ) : <div style={{ width: 40 }} />}
        <h1 className="header-title">{title}</h1>
        <button className="lang-toggle" onClick={toggleLang}>
          <Globe size={16} />
          <span>{isHe ? 'EN' : 'עב'}</span>
        </button>
      </div>
    </header>
  );
}
