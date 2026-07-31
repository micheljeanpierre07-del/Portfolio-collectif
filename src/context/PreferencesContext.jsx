import React, { createContext, useContext, useEffect, useState } from 'react';

// --- Gestion d'état global : thème (sombre/clair) et langue d'affichage ---
// Centralisé ici avec Context API afin d'éviter le "prop drilling" à travers
// toute l'arborescence de composants.

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  const [language, setLanguage] = useState('fr'); // 'fr' | 'en'

  // Applique la classe de thème sur <html> pour piloter les variables CSS
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };

  const value = { theme, toggleTheme, language, toggleLanguage, setLanguage };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

// Hook personnalisé pour consommer facilement le contexte
export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences doit être utilisé à l\'intérieur de <PreferencesProvider>');
  }
  return ctx;
}
