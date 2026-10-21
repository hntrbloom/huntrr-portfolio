import UiIcon from './UiIcon';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

type NavbarProps = {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
};

const links = [
  ['Home', '/'],
  ['About Me', '/about'],
  ['Projects', '/projects'],
  ['Skills', '/skills'],
  ['Experience', '/experience'],
  ['Résumé', '/resume'],
  ['Contact', '/contact'],
] as const;

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <header className="site-header shell">
      <div className="header-utility"><span>a personal portfolio website :)</span><Link to="/contact">let’s connect <UiIcon name="external" /></Link></div>
      <div className="header-content">
        <Link className="brand" to="/" aria-label="Home" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon" aria-hidden="true">♡</span>
          <span>huntrr's{' '}<span className="brand-space">folio</span><span className="brand-star" aria-hidden="true">✧</span></span>
        </Link>
        <span className="header-tagline">software · creativity · a little nostalgia</span>
        <div className="header-actions">
          <button type="button" className="icon-button" onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title="Toggle color theme">
            <UiIcon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button type="button" className="icon-button mobile-menu" aria-label="Toggle menu"
            aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false); }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
        <nav id="primary-navigation" className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary navigation">
          {links.map(([label, to], index) => (
            <NavLink to={to} end={to === '/'} key={to} onClick={() => setMenuOpen(false)}><span aria-hidden="true">{index === 6 ? <UiIcon name="mail" /> : ['⌂', '♡', '▧', '⌘', '☆', '▤'][index]}</span> {label}</NavLink>
          ))}
          <span className="nav-note">thanks for stopping by! ♡</span>
        </nav>
    </header>
  );
}
