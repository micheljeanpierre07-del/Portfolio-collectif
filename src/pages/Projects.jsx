import React, { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard.jsx';
import projects from '../data/projects.js';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const categories = useMemo(() => {
    const unique = new Set(projects.map((p) => p.category));
    return ['Tous', ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Tous') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section aria-labelledby="projects-title">
      <h1 id="projects-title">Nos Projets</h1>

      <div className="filter-bar" role="group" aria-label="Filtrer les projets par catégorie">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={cat === activeCategory ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={cat === activeCategory}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
