export default function SkillCategory({ group, index }: { group: { title: string; skills: string[] }; index: number }) {
  return <section className="skill-card">
    <span className="skill-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} /</span>
    <h2>{group.title}</h2>
    <ul className="skill-list">{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
  </section>;
}
