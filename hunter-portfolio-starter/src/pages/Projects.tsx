import { useState } from 'react';
import { projects } from '../data';
import ProjectCard from '../components/ProjectCard';
import RetroBox from '../components/RetroBox';

const filters = ['All', 'Software', 'AI & Data', 'Making'] as const;
type Filter = (typeof filters)[number];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const visibleProjects = projects.filter((project) => filter === 'All' || project.category === filter);
  return (
    <RetroBox title="Hunter's project gallery" icon="▧" className="section-projects">
          <div className="section-heading-row"><div><p className="section-label"><span>02</span> / SELECTED WORK</p><h1 className="page-heading">Things I've <em>built.</em></h1><p className="section-description">A mix of software, AI exploration, and hands-on projects. Open a card to see more about the process.</p></div><div className="project-count">{String(projects.length).padStart(2, '0')} <span>PROJECTS</span></div></div>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((name) => <button type="button" key={name} className={`filter ${filter === name ? 'selected' : ''}`} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}
          </div>
          <p className="filter-result" role="status">Showing {visibleProjects.length} of {projects.length} projects</p>
          <div className="projects-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}</div>
        </RetroBox>
  );
}
