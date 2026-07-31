import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">Portfolio Professionnel Collectif</h1>
      <p className="hero-subtitle">
        Une vitrine technologique présentant notre équipe, nos compétences et nos réalisations
        full-stack.
      </p>
      <div className="hero-actions">
        <Link to="/equipe" className="btn-primary">Découvrir l'équipe</Link>
        <Link to="/projets" className="btn-secondary">Voir nos projets</Link>
      </div>

      <div className="hero-grid" aria-hidden="true">
        <div className="hero-card">
          <h2>React + Vite</h2>
          <p>Interface modulaire, rapide et maintenable.</p>
        </div>
        <div className="hero-card">
          <h2>Node.js + Express</h2>
          <p>API robuste pour le traitement du formulaire de contact.</p>
        </div>
        <div className="hero-card">
          <h2>Déploiement continu</h2>
          <p>Intégration GitHub → Railway à chaque push.</p>
        </div>
      </div>
    </section>
  );
}
