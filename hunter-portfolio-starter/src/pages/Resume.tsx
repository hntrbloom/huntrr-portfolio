import UiIcon from '../components/UiIcon';
import { Link } from 'react-router';
import { profile } from '../data';
import RetroBox from '../components/RetroBox';

export default function Resume() {
  return <>
    <RetroBox title="Hunter's résumé" icon="▤">
      <p className="section-label">RÉSUMÉ / AT A GLANCE</p>
      <h1 className="page-heading">A little more <em>background.</em></h1>
      <p>I’m Hunter Bloom, an aspiring computer engineer with hands-on experience in software development, applied AI, data analysis, and technical troubleshooting.</p>
      <p>My background includes an Applied AI & Data Science internship at Ames National Laboratory, independent software projects, and an associate degree from Des Moines Area Community College.</p>
      <div className="resume-actions">
        <a className="button button-primary" href={profile.resume} download="Hunter_Bloom_Public_Resume.pdf">Download Résumé ↓</a>
        <a className="button" href={profile.resume} target="_blank" rel="noreferrer">View Full Résumé <UiIcon name="external" /></a>
      </div>
      <nav className="resume-quick-links" aria-label="Explore my background">
        <Link className="text-link" to="/projects">Projects →</Link>
        <Link className="text-link" to="/skills">Skills →</Link>
        <Link className="text-link" to="/experience">Experience →</Link>
      </nav>
    </RetroBox>
    <RetroBox title="Résumé preview" icon="▧" className="resume-preview-box">
      <p className="box-intro">A closer look at my experience, education, and technical toolkit.</p>
      <object className="resume-preview" data={profile.resume} type="application/pdf" aria-label="Hunter Bloom’s résumé PDF preview">
        <div className="resume-fallback"><p>Your browser can open the résumé as a separate PDF.</p><a className="button" href={profile.resume} target="_blank" rel="noreferrer">View Full Résumé <UiIcon name="external" /></a></div>
      </object>
      <p className="resume-preview-help">Preview not showing? <a href={profile.resume} target="_blank" rel="noreferrer">Open the PDF in a new tab</a> or use Download Résumé above.</p>
    </RetroBox>
  </>;
}
