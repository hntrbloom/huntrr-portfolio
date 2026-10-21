import { Link } from 'react-router';
import Arrow from '../components/Arrow';
import RetroBox, { Badge } from '../components/RetroBox';
import JapanScrapbook from '../components/JapanScrapbook';
import EducationEntry from '../components/EducationEntry';
import { education, printing } from '../data';

export default function About() {
  return (
    <>
      <RetroBox title="A little about Hunter" icon="♡" className="section-about">
          <div className="about-grid">
            <div><p className="section-label"><span>01</span> / ABOUT</p><h1 className="page-heading">A curious mind.<br /><span className="muted-heading">A builder's mindset.</span></h1></div>
            <div className="about-copy"><p>I like projects that bring together different sides of technology: thoughtful interfaces, useful data, and things you can actually make.</p><p>I'm an aspiring computer engineer with experience in software development, applied artificial intelligence, data analysis, and technical troubleshooting. I've developed applications using React, TypeScript, Python, Firebase, and Google Cloud.</p><p>I enjoy building applications, solving technical problems, and figuring out how different technologies work. My interests stretch from software engineering and AI to computer systems and hardware.</p><p>I also run NailsByHuntrr, my small creative business, and develop software to help organize its daily operations. It gives me a place to bring my creative and technical sides together — and plenty of real problems to work through.</p><Link className="text-link" to="/experience">More about my background <Arrow /></Link></div>
          </div>
        </RetroBox>
      <RetroBox title="3D Design & Printing" icon="✧" className="printing-section" id="3d-design-printing">
        <div className="printing-layout">
          <figure className="printing-photo">
            <img src={printing.photo} alt="Hunter’s Bambu Lab A1 3D printer with multicolor filament spools and a pink print on the build plate." width="1152" height="1536" loading="lazy" decoding="async" />
            <figcaption>My Bambu Lab A1 ♡</figcaption>
          </figure>
          <div className="printing-copy">
            <p className="section-label">CREATING SINCE MARCH 2026</p>
            <p className="printing-story">{printing.paragraph}</p>
            <ul className="tags printing-skills" aria-label="3D design and printing skills">
              {printing.skills.map(skill => <li key={skill}><Badge>{skill}</Badge></li>)}
            </ul>
            <Link className="text-link" to="/projects/3d-printing">Explore my 3D printing projects <Arrow /></Link>
          </div>
        </div>
      </RetroBox>
      <RetroBox title="Education & career goals" icon="☆">
        <p className="section-label">EDUCATION & CAREER GOALS</p>
        <h2>My next <em>chapter.</em></h2>
        <ol className="experience-list academic-timeline" aria-label="Academic progression">
          {education.map((entry, index) => <EducationEntry key={entry.heading} entry={entry} index={index} />)}
        </ol>
      </RetroBox>
      <JapanScrapbook />
    </>
  );
}
