import { Link, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Resume from './pages/Resume';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="skills" element={<Skills />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<Contact />} />
        <Route path="resume" element={<Resume />} />
        <Route path="*" element={
          <section className="section page-section shell">
            <p className="section-label">PAGE NOT FOUND</p>
            <h1 className="page-heading">Let's get you <em>home.</em></h1>
            <p className="section-description">This page isn't part of the portfolio. Use the navigation to explore my work.</p>
            <Link className="button button-primary" to="/">Back home →</Link>
          </section>
        } />
      </Route>
    </Routes>
  );
}
