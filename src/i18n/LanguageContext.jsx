import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { strings } from './strings.js';

const LanguageContext = createContext(null);
const KEY = 'portfolio-lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* almacenamiento no disponible: usamos el idioma del navegador */
  }
  return navigator.language?.startsWith('en') ? 'en' : 'es';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* sin persistencia, el selector sigue funcionando */
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: strings[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
