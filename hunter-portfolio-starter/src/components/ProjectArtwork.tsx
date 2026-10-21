import type { Project } from '../data';

export default function ProjectArtwork({ project, variant = 'card' }: { project: Project; variant?: 'card' | 'detail' }) {
  const preview = variant === 'card' ? project.photos?.[0] : undefined;
  if (preview) return <img src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} loading="lazy" />;
  if (project.screenshot) return <img src={project.screenshot} alt={`${project.title} preview`} loading="lazy" />;
  // Keep illustrations tied to the kind of project when gallery entries change.
  const artwork = project.category === 'AI & Data' ? 1 : project.category === 'Making' ? 3 : 2;
  return <div className={`project-art-content art-${artwork}`} aria-hidden="true">
    <span className="art-star star-one">✧</span><span className="art-star star-two">✦</span>
    <div className="mini-window">
      <div className="mini-titlebar"><span>● ● ●</span><span>{project.title}</span><span>×</span></div>
      {artwork === 1 ? <div className="mini-data"><div className="mini-code"><span># a little exploration</span><span>import pandas as pd</span><span>data.head()</span></div><div className="mini-chart">{[30, 52, 40, 74, 60, 90, 78].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><span className="chart-axis">data → discovery</span></div>
        : artwork === 2 ? <div className="mini-table"><strong>creative business toolkit</strong><div>project <span>status</span></div><div>custom order <span>in progress</span></div><div>new collection <span>planning</span></div><div>weekly ideas <span>ready ♡</span></div></div>
        : <div className="mini-model"><svg viewBox="0 0 180 90"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m90 12 45 23v43l-45-23-45 23V35zM45 35l45 23 45-23M90 58v-46M90 58v30M45 78l45 10 45-10" /></g></svg><span>design. print. refine.</span></div>}
    </div>
    <span className="art-caption">illustration · {project.category.toLowerCase()}</span>
  </div>;
}
