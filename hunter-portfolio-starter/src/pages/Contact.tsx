import { Link } from 'react-router';
import { profile } from '../data';
import RetroBox from '../components/RetroBox';

export default function Contact() {
  const hasContact = Boolean(profile.email || profile.github || profile.linkedin);
  return <RetroBox title="Leave a little hello" icon="✉" className="section-contact">
    <p className="section-label"><span>05</span> / SAY HELLO</p>
    <h1 className="page-heading">Let's make something <em>great.</em></h1>
    <p>Interested in my work, a technical opportunity, or collaborating on a project? I'd love to connect.</p>
    <div className="contact-links">
      {profile.email && <a className="button button-primary" href={`mailto:${profile.email}`}>Email me ↗</a>}
      {profile.github && <a className="button" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
      {profile.linkedin && <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
      {profile.resume && <a className="button" href={profile.resume} download>Résumé ↓</a>}
    </div>
    <p className="contact-email">Professional email: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
    {!hasContact && <div className="contact-placeholder"><span aria-hidden="true">✉</span><h3>Contact details are coming soon.</h3><p>In the meantime, take a look around my little space.</p><Link className="text-link" to="/projects">Explore my projects →</Link></div>}
    <div className="contact-signoff">Thanks for stopping by.<br /><span>— Hunter ♡</span></div>
  </RetroBox>;
}
