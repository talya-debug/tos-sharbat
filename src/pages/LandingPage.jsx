import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate('/trades');
  };

  return (
    <div
      onClick={handleClick}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
    >
      {/* רקע כהה */}
      <div className="absolute inset-0 bg-primary-container" />

      {/* דפוס נקודות תעשייתי */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* תוכן מרכזי */}
      <div className="relative z-10 flex flex-col items-center gap-8" style={{ animation: 'fadeIn 1s ease-out' }}>
        {/* לוגו TOS */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-primary-container border border-on-primary-container/30 flex items-center justify-center">
            <span className="text-5xl md:text-6xl font-bold text-white tracking-widest">TOS</span>
          </div>
          {/* תג וי כתום */}
          <div className="absolute -top-2 -left-2 w-7 h-7 bg-secondary-container rounded-full flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* כותרת */}
        <h1 className="text-2xl md:text-3xl font-light text-inverse-on-surface tracking-wide">
          מערכת ניהול איכות בבנייה
        </h1>

        {/* קו דקורטיבי */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-on-primary-container/40" />
          <span className="text-xs tracking-[0.2em] text-on-primary-container uppercase">
            Reliability &bull; Precision &bull; Control
          </span>
          <div className="w-12 h-px bg-on-primary-container/40" />
        </div>
      </div>

      {/* פוטר */}
      <div className="absolute bottom-16 flex flex-col items-center gap-1 z-10" style={{ animation: 'fadeIn 2s ease-out' }}>
        <span className="text-[10px] tracking-[0.15em] text-on-primary-container/60 uppercase">Powered by</span>
        <span className="text-sm font-semibold tracking-[0.3em] text-on-primary-container uppercase">OSHER ASULIN</span>
      </div>

      {/* סרגל טעינה */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-on-primary-container/20 z-10">
        <div
          className="h-full bg-secondary-container"
          style={{
            animation: 'loadProgress 3s ease-out forwards',
          }}
        />
      </div>

      {/* טקסט לחיצה */}
      {loaded && (
        <div className="absolute bottom-6 z-10" style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <span className="text-xs text-on-primary-container/50">לחץ להמשך</span>
        </div>
      )}
    </div>
  );
}
