import type { ExperienceEntry } from '../data';
import { Badge } from './RetroBox';

export default function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return <article className="experience-card">
    <div className="experience-card-heading">
      <span className="experience-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div><p className="experience-kicker">{entry.organization}</p><h2>{entry.role}</h2><p className="experience-dates">{entry.dates}</p></div>
    </div>
    <p>{entry.description}</p>
    <ul className="project-notes">{entry.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
    <div className="tags">{entry.skills.map(skill => <Badge key={skill} to="/skills">{skill}</Badge>)}</div>
  </article>;
}
