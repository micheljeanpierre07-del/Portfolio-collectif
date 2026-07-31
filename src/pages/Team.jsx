import React from 'react';
import MemberCard from '../components/MemberCard.jsx';
import team from '../data/team.js';

export default function Team() {
  return (
    <section aria-labelledby="team-title">
      <h1 id="team-title">Notre Équipe</h1>
      <p>Découvrez les membres de l'équipe, leurs rôles et leurs contributions sur GitHub.</p>

      <div className="member-grid">
        {team.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
