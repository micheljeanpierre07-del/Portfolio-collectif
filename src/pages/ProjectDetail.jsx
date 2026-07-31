import React from 'react';
import { Link, useParams } from 'react-router-dom';
import projects from '../data/projects.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section>
        <h1>Projet introuvable</h1>
        <p>Le projet demandé n'existe pas.</p>
        <Link to="/projets" className="btn-link">Retour aux projets</Link>
      </section>
    );
  }

  return (
    <section aria-labelledby="project-detail-title">
      <Link to="/projets" className="btn-link">&larr; Retour aux projets</Link>
      <h1 id="project-detail-title">{project.title}</h1>
      <p className="project-category">{project.category}</p>

      {project.image && (
        <img
          className="project-detail-image"
          src={project.image}
          alt={`Aperçu du projet ${project.title}`}
        />
      )}

      <p>{project.description}</p>

      {project.technologies?.length > 0 && (
        <ul className="tech-list">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      )}

      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary">
          Voir le projet
        </a>
      )}
    </section>
  );
}
