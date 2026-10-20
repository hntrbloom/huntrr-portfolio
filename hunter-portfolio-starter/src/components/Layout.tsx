import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import ProfileSidebar from './ProfileSidebar';
import { updatePageMetadata } from '../seo';

const titles: Record<string, string> = {
  '/': 'Home',
  '/about': 'About Me',
  '/projects': 'Projects',
  '/skills': 'Skills',
  '/experience': 'Experience',
  '/contact': 'Contact',
  '/resume': 'Résumé',
};

export default function Layout() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    // Reset scroll for links, back, and forward, even when CSS enables smooth scrolling.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
    updatePageMetadata(location.pathname);
  }, [location.key, location.pathname]);

  return (
    <div className={`site theme-${theme}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <div className="page-location shell"><span>you are here: hunter’s space / <strong>{titles[location.pathname] ?? (location.pathname.startsWith('/projects/') ? 'Project details' : 'Page not found')}</strong></span><span aria-hidden="true">✧ welcome to my corner of the web ✧</span></div>
      <div className="profile-layout shell">
      <ProfileSidebar />
      <main id="main-content" ref={mainRef} className="page-main" tabIndex={-1}>
        <div className="route-page" key={location.pathname}><Outlet /></div>
      </main>
      </div>
      <Footer />
    </div>
  );
}
