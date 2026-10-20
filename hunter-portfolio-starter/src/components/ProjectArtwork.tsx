import type { Project } from '../data';

export default function ProjectArtwork({ project, index }: { project: Project; index: number }) {
  if (project.screenshot) return <img src={project.screenshot} alt={`${project.title} preview`} loading="lazy" />;
  return <div className={`project-art-content art-${index % 4}`} aria-hidden="true">
    <span className="art-star star-one">✧</span><span className="art-star star-two">✦</span>
    <div className="mini-window">
      <div className="mini-titlebar"><span>● ● ●</span><span>{['huntrr-Space', 'data-lab.py', 'creative-toolkit', 'prototype.stl'][index % 4]}</span><span>×</span></div>
      {index % 4 === 0 ? <div className="mini-workspace"><div className="mini-sidebar"><i /><i /><i /><i /></div><div className="mini-workspace-body"><strong>a space for your ideas ♡</strong><div className="mini-tiles"><span>✧<small>create</small></span><span>▧<small>collect</small></span><span>♡<small>inspire</small></span></div><div className="mini-line" /><div className="mini-line short" /></div></div>
        : index % 4 === 1 ? <div className="mini-data"><div className="mini-code"><span># a little exploration</span><span>import pandas as pd</span><span>data.head()</span></div><div className="mini-chart">{[30, 52, 40, 74, 60, 90, 78].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><span className="chart-axis">data → discovery</span></div>
        : index % 4 === 2 ? <div className="mini-table"><strong>creative business toolkit</strong><div>project <span>status</span></div><div>custom order <span>in progress</span></div><div>new collection <span>planning</span></div><div>weekly ideas <span>ready ♡</span></div></div>
        : <div className="mini-model"><svg viewBox="0 0 180 90"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m90 12 45 23v43l-45-23-45 23V35zM45 35l45 23 45-23M90 58v-46M90 58v30M45 78l45 10 45-10" /></g></svg><span>design. print. refine.</span></div>}
    </div>
    <span className="art-caption">illustration · {project.category.toLowerCase()}</span>
  </div>;
}
