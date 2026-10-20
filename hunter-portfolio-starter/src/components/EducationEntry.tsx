import type { EducationEntry as Education } from '../data';
import { Badge } from './RetroBox';

export default function EducationEntry({ entry, index }: { entry: Education; index: number }) {
  return <li className="experience-row">
    <span className="experience-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    <div>
      <span className="experience-kicker">{entry.status}</span>
      <h3>{entry.heading}</h3>
      {entry.institution && <p className="education-institution">{entry.institution}</p>}
      <p>{entry.body}</p>
      {entry.coursework && <><h4 className="coursework-label">Relevant coursework</h4><div className="tags">{entry.coursework.map(course => <Badge key={course}>{course}</Badge>)}</div></>}
    </div>
    <span className="experience-detail">{entry.detail}</span>
  </li>;
}
