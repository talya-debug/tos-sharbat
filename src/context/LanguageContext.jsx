import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('he');
  const toggleLang = () => setLang(l => l === 'he' ? 'en' : 'he');
  const isHe = lang === 'he';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isHe }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
