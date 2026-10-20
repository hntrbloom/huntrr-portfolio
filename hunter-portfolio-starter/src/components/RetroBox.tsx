import type { ReactNode } from 'react';
import { Link } from 'react-router';

export function Badge({ children, to, className = '' }: { children: ReactNode; to?: string; className?: string }) {
  return to ? <Link className={`badge ${className}`} to={to}>{children}</Link> : <span className={`badge ${className}`}>{children}</span>;
}

export default function RetroBox({ title, icon = '✧', children, action, className = '', id }: {
  title: string; icon?: string; children: ReactNode; action?: ReactNode; className?: string; id?: string;
}) {
  return <section className={`retro-box ${className}`} id={id}>
    <div className="box-heading"><h2><span aria-hidden="true">{icon}</span> {title}</h2>{action}</div>
    <div className="box-body">{children}</div>
  </section>;
}
