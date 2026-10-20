import { skillGroups } from '../data';
import RetroBox from '../components/RetroBox';
import SkillCategory from '../components/SkillCategory';

export default function Skills() {
  return (
    <RetroBox title="Hunter's favorite technologies" icon="⌘" className="section-skills">
          <div><p className="section-label"><span>03</span> / MY TOOLKIT</p><div className="section-heading-row"><h1 className="page-heading">Tools I work <em>with.</em></h1><p className="section-description skills-description">I enjoy learning new technologies and figuring out how to apply them in practical ways.</p></div><div className="skills-grid">{skillGroups.map((group, index) => <SkillCategory key={group.title} group={group} index={index} />)}</div></div>
        </RetroBox>
  );
}
