import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-content">
        <div><Link className="footer-brand" to="/">huntrr's workspace</Link><p>Made with curiosity, React & TypeScript.</p></div>
        <span className="footer-message">a little old web. a lot of new ideas.</span>
        <button type="button" className="back-top" onClick={() => window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        })}>Back to top ↑</button>
      </div>
    </footer>
  );
}
