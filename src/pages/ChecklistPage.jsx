import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trades } from '../data/trades';
import { tradeData } from '../data/tradeData';
import { useLang } from '../context/LanguageContext';
import Icon from '../components/Icon';
import TopHeader from '../components/TopHeader';
import BottomNav from '../components/BottomNav';
import CameraFab from '../components/CameraFab';

export default function ChecklistPage() {
  const { tradeId } = useParams();
  const navigate = useNavigate();
  const { isHe } = useLang();
  const trade = trades.find(t => t.id === tradeId);
  const data = tradeData[tradeId];

  // סעיפים רלוונטיים לבקר איכות — לא כולל סעיפי תכנון/הגדרה שהם של מנהל הפרויקט
  const qcRelevantSections = ['preparation', 'execution', 'limitations', 'highlights', 'failures', 'inspections', 'safety', 'measurement'];

  const allItems = data
    ? data.sections
        .filter(s => qcRelevantSections.includes(s.id))
        .flatMap(s => s.items.map(item => ({ ...item, sectionId: s.id, sectionTitle: s.title, sectionTitleEn: s.titleEn })))
    : [];

  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem(`tos-checklist-${tradeId}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [defectNotes, setDefectNotes] = useState(() => {
    const saved = localStorage.getItem(`tos-defects-${tradeId}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(`tos-checklist-${tradeId}`, JSON.stringify(results));
  }, [results, tradeId]);

  useEffect(() => {
    localStorage.setItem(`tos-defects-${tradeId}`, JSON.stringify(defectNotes));
  }, [defectNotes, tradeId]);

  if (!trade || !data) return <div className="p-8 text-center">מלאכה לא נמצאה</div>;

  const totalItems = allItems.length;
  const checkedItems = Object.keys(results).length;
  const passedItems = Object.values(results).filter(v => v === 'pass').length;
  const failedItems = Object.values(results).filter(v => v === 'fail').length;
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const setResult = (key, value) => {
    setResults(prev => {
      if (prev[key] === value) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
  };

  const handleSave = () => {
    alert(isHe ? 'הבקרה נשמרה בהצלחה!' : 'Inspection saved successfully!');
  };

  // קיבוץ לפי סעיף
  const groupedItems = {};
  allItems.forEach(item => {
    if (!groupedItems[item.sectionId]) {
      groupedItems[item.sectionId] = {
        title: item.sectionTitle,
        titleEn: item.sectionTitleEn,
        items: [],
      };
    }
    groupedItems[item.sectionId].items.push(item);
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopHeader />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
        {/* כותרת */}
        <h1 className="text-xl md:text-2xl font-bold text-on-surface mb-4">
          {isHe ? `בקרת איכות: ${trade.name}` : `Quality Control: ${trade.nameEn}`}
        </h1>

        {/* באנר התקדמות */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-6 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
              {progress === 100
                ? (isHe ? 'הושלם' : 'Completed')
                : (isHe ? 'בתהליך' : 'In Progress')}
            </span>
            <span className="text-2xl md:text-3xl font-bold text-on-surface">{progress}%</span>
          </div>
          <p className="text-sm text-on-surface-variant mb-3">
            {isHe
              ? `${checkedItems} מתוך ${totalItems} פריטים נבדקו | ${passedItems} תקין | ${failedItems} ליקוי`
              : `${checkedItems} of ${totalItems} items checked | ${passedItems} pass | ${failedItems} fail`}
          </p>
          <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary-container rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* כפתורי מעבר */}
        <div className="flex gap-3 mb-6">
          <button className="flex-1 py-2.5 px-4 bg-primary text-on-primary rounded-full text-sm font-medium">
            {isHe ? 'צ\'קליסט' : 'Checklist'}
          </button>
          <button
            onClick={() => navigate(`/trade/${tradeId}`)}
            className="flex-1 py-2.5 px-4 border border-outline-variant text-on-surface rounded-full text-sm font-medium hover:bg-surface-container-low transition-colors"
          >
            {isHe ? 'מתודולוגיה' : 'Methodology'}
          </button>
        </div>

        {/* רשימת פריטי בקרה לפי סעיף */}
        {Object.entries(groupedItems).map(([sectionId, section]) => (
          <div key={sectionId} className="mb-6">
            <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
              {isHe ? section.title : section.titleEn}
            </h2>
            <div className="space-y-2">
              {section.items.map(item => {
                const key = `${sectionId}-${item.id}`;
                const result = results[key];
                const isFail = result === 'fail';
                const isPass = result === 'pass';

                return (
                  <div
                    key={key}
                    className={`bg-surface-container-lowest border rounded-lg p-3 md:p-4 transition-all ${
                      isPass
                        ? 'border-r-4 border-r-green-500 border-outline-variant'
                        : isFail
                          ? 'border-r-4 border-r-error border-outline-variant'
                          : 'border-outline-variant'
                    }`}
                  >
                    <p className="text-sm font-medium text-on-surface mb-1">
                      {isHe ? item.text : item.textEn}
                    </p>

                    {/* כפתורי פעולה */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setResult(key, 'pass')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          isPass
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'border-outline-variant text-on-surface-variant hover:border-green-400'
                        }`}
                      >
                        <Icon name="check_circle" fill={isPass} size={16} />
                        {isHe ? 'תקין' : 'Pass'}
                      </button>
                      <button
                        onClick={() => setResult(key, 'fail')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          isFail
                            ? 'bg-red-50 border-error text-error'
                            : 'border-outline-variant text-on-surface-variant hover:border-error'
                        }`}
                      >
                        <Icon name="cancel" fill={isFail} size={16} />
                        {isHe ? 'ליקוי' : 'Fail'}
                      </button>
                      <button className="p-1.5 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        <Icon name="photo_camera" size={16} />
                      </button>
                    </div>

                    {/* שדה תיאור ליקוי */}
                    {isFail && (
                      <textarea
                        value={defectNotes[key] || ''}
                        onChange={e => setDefectNotes(prev => ({ ...prev, [key]: e.target.value }))}
                        placeholder={isHe ? 'תאר את הליקוי...' : 'Describe the defect...'}
                        className="w-full mt-3 p-3 text-sm border border-error/30 rounded-lg bg-error-container/10 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-error resize-none"
                        rows={2}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* טקסט שמירה אוטומטית */}
        <p className="text-xs text-center text-on-surface-variant mb-3">
          {isHe ? 'הנתונים נשמרים אוטומטית' : 'Data auto-saved'}
        </p>

        {/* כפתור שמירה */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-primary text-on-primary rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          {isHe ? 'שמירה וסיום בקרה' : 'Save & Complete Inspection'}
        </button>
      </div>

      <CameraFab />
      <BottomNav />
    </div>
  );
}
