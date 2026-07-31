import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section>
      <h1>404 — Page introuvable</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link to="/" className="btn-link">Retour à l'accueil</Link>
    </section>
  );
}
