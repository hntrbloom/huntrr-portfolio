import { Link } from 'react-router';
import { profile, projects } from '../data';
import ProjectCard from '../components/ProjectCard';
import RetroBox, { Badge } from '../components/RetroBox';

export default function Home() {
  return <>
    <section className="welcome-box" aria-labelledby="welcome-heading">
      <div className="welcome-top"><span className="pixel-label">HELLO, WORLD_</span><span aria-hidden="true">♡ ✧ ☆</span></div>
      <h1 id="welcome-heading">Welcome to my <em>little space.</em></h1>
      <p>I’m {profile.name} — an aspiring computer engineer, curious thinker, and maker of cute things. I’m interested in software engineering, AI, computer systems, and hardware.</p>
      <div className="welcome-bottom"><Link className="button button-primary" to="/resume">View My Résumé →</Link><Badge to="/about">✦ get to know me</Badge><span>built with curiosity & a few too many tabs open</span></div>
      <span className="welcome-spark" aria-hidden="true">✳</span>
    </section>
    <RetroBox title="Hunter's blurbs" icon="♡" className="blurb-box">
      <h3>About me:</h3><p>{profile.introduction}</p>
      <div className="blurb-bottom"><p><strong>Here to build, learn, and make ideas real.</strong></p><Link className="text-link" to="/about">A little more about me →</Link></div>
    </RetroBox>
    <RetroBox title="My professional profile" icon="☆">
      <dl className="info-table career-summary">
        <div><dt>Toolkit</dt><dd>React, TypeScript, Python, Firebase & Google Cloud.<Link to="/skills">Explore my skills →</Link></dd></div>
        <div><dt>Experience</dt><dd>Applied AI & Data Science Intern · Ames National Laboratory · Summer 2026.<Link to="/experience">My experience →</Link></dd></div>
        <div><dt>Education</dt><dd>Associate of Applied Science · Des Moines Area Community College · Completed Summer 2026.<Link to="/about">Education & my next chapter →</Link></dd></div>
        <div><dt>Résumé</dt><dd>Experience, education, and skills in one place.<a href={profile.resume} download="Hunter_Bloom_Public_Resume.pdf">Download Résumé ↓</a></dd></div>
      </dl>
    </RetroBox>
    <RetroBox title="Featured project" icon="▧" action={<Link to="/projects">view all ({projects.length}) →</Link>} className="featured-box">
      <p className="box-intro">From my digital workbench.</p>
      <div className="projects-grid featured-projects">{projects.filter(project => project.id === 'huntrr-workspace').map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}</div>
    </RetroBox>
    <RetroBox title="Little life updates" icon="✧" className="life-updates-box">
      <ul className="updates-list"><li><span aria-hidden="true">☆</span><div><Link to="/experience">A new chapter</Link><p>Associate of Applied Science, 2026.</p></div></li><li><span aria-hidden="true">♡</span><div><Link to="/skills">Always learning</Link><p>Software, AI, and hands-on engineering.</p></div></li></ul>
    </RetroBox>
    <div className="guestbook-note"><span aria-hidden="true">✉</span><div><strong>Good ideas start with a hello.</strong><p>Have a project, opportunity, or something cool to share?</p></div><Link className="button" to="/contact">Say hello ↗</Link></div>
  </>;
}
