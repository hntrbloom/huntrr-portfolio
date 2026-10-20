import { useState } from 'react';
import type { Project } from '../data';
import Arrow from './Arrow';
import { Link } from 'react-router';
import ProjectArtwork from './ProjectArtwork';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="project-card">
      <Link className={`project-art project-art-${(index % 4) + 1}`} to={`/projects/${project.id}`} aria-label={`View ${project.title} details`}>
        <ProjectArtwork project={project} index={index} />
      </Link>
      <div className="project-content">
        <div className="project-meta"><span>{project.category}</span><span>{project.yearLabel}</span></div>
        <h3><Link to={`/projects/${project.id}`}>{project.title}</Link></h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="tags">{project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <Link className="project-detail-link" to={`/projects/${project.id}`}>View project <Arrow /></Link>
        <button className="detail-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide project notes' : 'Read project notes'} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
        {expanded && <ul className="project-notes">{project.notes.map((note) => <li key={note}>{note}</li>)}</ul>}
        {(project.demoUrl || project.codeUrl) && (
          <div className="project-links">
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <Arrow diagonal /></a>}
            {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noreferrer">Source code <Arrow diagonal /></a>}
          </div>
        )}
      </div>
    </article>
  );
}
