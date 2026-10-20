import { experiences } from '../data';
import ExperienceCard from '../components/ExperienceCard';
import RetroBox from '../components/RetroBox';

export default function Experience() {
  return (
    <RetroBox title="Experience & little milestones" icon="☆">
          <p className="section-label"><span>04</span> / BACKGROUND</p><h1 className="page-heading">Learning by <em>doing.</em></h1>
          <div className="experience-cards">{experiences.map((entry, index) => <ExperienceCard key={entry.organization} entry={entry} index={index} />)}</div>
        </RetroBox>
  );
}
