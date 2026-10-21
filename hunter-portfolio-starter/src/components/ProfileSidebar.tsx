import { Link } from 'react-router';
import { profile } from '../data';
import RetroBox, { Badge } from './RetroBox';

export default function ProfileSidebar() {
  return <aside className="profile-sidebar" aria-label="Hunter's profile">
    <RetroBox title="Hunter's profile" icon="♡" className="profile-box">
      <h2 className="profile-name">{profile.firstName}<span aria-hidden="true">✧</span></h2>
      <p className="profile-quote">“{profile.headline} {profile.headlineHighlight}”</p>
      <div className="profile-intro">
        <img className="profile-avatar" src={profile.avatar || '/avatar.svg'} alt={profile.avatar ? `${profile.firstName}'s avatar` : 'Pixel laptop with a heart, Hunter’s illustrated avatar'} width="112" height="112" />
        <div><p className="profile-role">{profile.role}</p><p className="profile-location">⌖ {profile.location}</p><span className="online-label"><span aria-hidden="true">✦</span> Always curious</span></div>
      </div>
      <dl className="profile-status"><div><dt>Mood:</dt><dd>{profile.mood} <span aria-hidden="true">♡</span></dd></div><div><dt>Here for:</dt><dd>Building & learning</dd></div></dl>
      <p className="profile-url">You are in Hunter’s little corner of the web.</p>
    </RetroBox>
    <RetroBox title="Contacting Hunter" icon="✉" className="contacting-box">
      <div className="profile-links">
        <Link to="/contact"><span aria-hidden="true">✉</span> Say hello</Link>
        <Link to="/projects"><span aria-hidden="true">▧</span> View projects</Link>
        {profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><span aria-hidden="true">⌘</span> GitHub ↗</a>}
        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><span aria-hidden="true">▣</span> LinkedIn ↗</a>}
        <Link to="/resume"><span aria-hidden="true">▤</span> View résumé</Link>
      </div>
    </RetroBox>
    <RetroBox title="Hunter's interests" icon="☆" className="interests-box">
      <dl className="info-table">
        <div><dt>About Me</dt><dd>A curious mind. A builder’s mindset. <Link to="/about">More about me →</Link></dd></div>
        <div><dt>Interests</dt><dd>Software, AI & data, creative tools, and making things.</dd></div>
        <div><dt>Education</dt><dd>Associate of Applied Science<br />Des Moines Area Community College<br /><span className="muted">Completed Summer 2026</span><Link to="/about">My next chapter →</Link></dd></div>
        <div><dt>Career goals</dt><dd>Software development & computer engineering</dd></div>
        <div><dt>Favorite technologies</dt><dd><div className="tags">{['React', 'TypeScript', 'Python', 'Firebase'].map(skill => <Badge to="/skills" key={skill}>{skill}</Badge>)}</div></dd></div>
      </dl>
    </RetroBox>
    <div className="sidebar-stickers" aria-label="Site badges"><Badge to="/skills">&lt;/&gt; made with React</Badge><Badge to="/about">♡ stay curious</Badge></div>
  </aside>;
}
