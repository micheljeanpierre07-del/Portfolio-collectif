import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePreferences } from '../context/PreferencesContext.jsx';

export default function Header() {
  const { theme, toggleTheme, language, toggleLanguage } = usePreferences();

  const navLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="site-header">
      <div className="header-inner">
        <span className="logo" aria-label="Nom de l'équipe">
          Notre Équipe
        </span>

        <nav aria-label="Navigation principale">
          <ul className="nav-list">
            <li><NavLink to="/" end className={navLinkClass}>Accueil</NavLink></li>
            <li><NavLink to="/equipe" className={navLinkClass}>Équipe</NavLink></li>
            <li><NavLink to="/projets" className={navLinkClass}>Projets</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleLanguage}
            aria-label="Changer la langue d'affichage"
          >
            {language === 'fr' ? 'FR' : 'EN'}
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label="Basculer entre le mode clair et le mode sombre"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}
