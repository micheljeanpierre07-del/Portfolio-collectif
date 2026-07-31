import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>&copy; {year} — Portfolio Professionnel Collectif · Projet de session LOG3500 · ISTEAH</p>
    </footer>
  );
}
