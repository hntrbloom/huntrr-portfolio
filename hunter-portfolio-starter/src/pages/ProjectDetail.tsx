import { Link, useParams } from 'react-router';
import { projects } from '../data';
import RetroBox, { Badge } from '../components/RetroBox';
import ProjectArtwork from '../components/ProjectArtwork';
import ProjectPhotoGallery from '../components/ProjectPhotoGallery';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const index = projects.findIndex(project => project.id === projectId);
  const project = projects[index];
  if (!project) return <RetroBox title="Project not found" icon="?">
    <h1 className="page-heading">This project isn’t here.</h1><p>Explore the gallery to find something I’ve been working on.</p><Link className="button" to="/projects">← Back to projects</Link>
  </RetroBox>;
  return <>
    <Link className="text-link" to="/projects">← Back to the project gallery</Link>
    <RetroBox title="From Hunter's workbench" icon="▧">
      <div className="project-meta"><span>{project.category}</span><span>{project.yearLabel}</span></div>
      <h1 className="page-heading">{project.title}</h1><p className="section-description">{project.subtitle}</p>
      <div className="project-art detail-art"><ProjectArtwork project={project} variant="detail" /></div>
      {project.screenshot && <a className="text-link" href={project.screenshot} target="_blank" rel="noreferrer">Open full-size screenshot ↗</a>}
      <h3>About this project</h3><p>{project.description}</p>
      <div className="tags">{project.stack.map(skill => <Badge key={skill} to="/skills">{skill}</Badge>)}</div>
      {project.photos && project.photos.length > 0 && <ProjectPhotoGallery key={project.id} photos={project.photos} projectTitle={project.title} />}
      <h3 className="detail-subheading">Process & project notes</h3><ul className="project-notes">{project.notes.map(note => <li key={note}>{note}</li>)}</ul>
      {(project.demoUrl || project.codeUrl) && <div className="project-links">{project.demoUrl && <a className="button" href={project.demoUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}{project.codeUrl && <a className="button" href={project.codeUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}</div>}
    </RetroBox>
    <div className="project-pager">{projects.map((item, i) => <Link key={item.id} className={i === index ? 'current' : ''} aria-current={i === index ? 'page' : undefined} to={`/projects/${item.id}`}>{String(i + 1).padStart(2, '0')} · {item.title}</Link>)}</div>
  </>;
}
