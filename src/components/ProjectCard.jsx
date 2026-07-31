import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <img
        className="project-thumbnail"
        src={project.image || '/images/placeholder-project.png'}
        alt={`Aperçu du projet ${project.title}`}
      />
      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        <p>{project.summary}</p>
        <Link to={`/projets/${project.id}`} className="btn-link">
          Voir les détails
        </Link>
      </div>
    </article>
  );
}
