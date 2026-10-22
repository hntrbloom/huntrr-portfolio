import UiIcon from './UiIcon';
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
        <div><p className="profile-role">{profile.role}</p><p className="profile-location">⌖ {profile.location}</p></div>
      </div>
      <dl className="profile-status">
        <div><dt>Mood:</dt><dd>Focused &amp; determined <span aria-hidden="true">♡</span></dd></div>
        <div><dt>Here for:</dt><dd>Building &amp; learning</dd></div>
        <div><dt>Currently:</dt><dd>Building my portfolio &amp; expanding my skills</dd></div>
        <div><dt>Passion:</dt><dd>Turning ideas into real projects</dd></div>
        <div><dt>Interests:</dt><dd>Coding, robotics &amp; 3D design</dd></div>
      </dl>
      <details className="profile-more">
        <summary>✧ more about me <span aria-hidden="true">＋</span></summary>
        <dl className="profile-extra-status">
          <div><dt>Creative side:</dt><dd>Designing &amp; 3D printing cute things</dd></div>
          <div><dt>Tech stack:</dt><dd>Python, React, TypeScript &amp; Java</dd></div>
          <div><dt>Learning:</dt><dd>Computer engineering &amp; new technologies</dd></div>
          <div><dt>Fun fact:</dt><dd>I own a 3D printer ♡</dd></div>
          <div><dt>Next chapter:</dt><dd>Pursuing my bachelor's in computer engineering @ ISU</dd></div>
          <div><dt>Favorite part of coding:</dt><dd>Seeing my ideas come to life</dd></div>
          <div><dt>Always:</dt><dd>Curious &amp; creating something new</dd></div>
          <div><dt>Currently obsessed with:</dt><dd>Coding my next big idea</dd></div>
          <div><dt>Making:</dt><dd>Little things from scratch</dd></div>
          <div><dt>Favorite things:</dt><dd>Software, robotics &amp; 3D printing</dd></div>
          <div><dt>Digital &amp; physical:</dt><dd>I love making things both digital &amp; physical ☆</dd></div>
        </dl>
      </details>
    </RetroBox>
    <RetroBox title="Contacting Hunter" icon={<UiIcon name="mail" />} className="contacting-box">
      <div className="profile-links">
        <Link to="/contact"><span aria-hidden="true"><UiIcon name="mail" /></span> Say hello</Link>
        <Link to="/projects"><span aria-hidden="true">▧</span> View projects</Link>
        {profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><span aria-hidden="true">⌘</span> GitHub <UiIcon name="external" /></a>}
        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><span aria-hidden="true">▣</span> LinkedIn <UiIcon name="external" /></a>}
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
