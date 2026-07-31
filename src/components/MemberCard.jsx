import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner.jsx';

// Carte de présentation d'un membre de l'équipe.
// Consomme l'API REST publique de GitHub pour afficher des statistiques réelles
// (nombre de dépôts publics) — flux de données réseau asynchrone (fetch + useEffect).
export default function MemberCard({ member }) {
  const [repoCount, setRepoCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGithubStats() {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${member.github}`);
        if (!response.ok) throw new Error('Utilisateur GitHub introuvable');
        const data = await response.json();
        if (isMounted) {
          setRepoCount(data.public_repos);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError('Statistiques GitHub indisponibles');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGithubStats();
    return () => {
      isMounted = false;
    };
  }, [member.github]);

  return (
    <article className="member-card">
      <img
        className="member-photo"
        src={member.photo || '/images/placeholder-avatar.png'}
        alt={`Photo de ${member.name}`}
      />
      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
      <p className="member-bio">{member.bio}</p>

      <div className="member-github-stats">
        {loading && <LoadingSpinner label="Chargement des statistiques GitHub..." />}
        {!loading && error && <span className="stat-error">{error}</span>}
        {!loading && !error && (
          <span>
            <strong>{repoCount}</strong> dépôts publics sur{' '}
            <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </span>
        )}
      </div>
    </article>
  );
}
