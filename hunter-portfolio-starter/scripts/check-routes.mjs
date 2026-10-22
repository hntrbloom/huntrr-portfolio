import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { createServer } from 'vite';

// Render the actual route tree without starting a network listener.
const server = await createServer({ cacheDir: path.join(os.tmpdir(), 'hunter-portfolio-route-check-cache'), optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { projects, profile, skillGroups, experiences, education, japanTrip } = await server.ssrLoadModule('/src/data.ts');
  const { getPageMetadata, seoPages, site } = await server.ssrLoadModule('/src/seo.ts');
  const pages = [
    ['/', 'HELLO, WORLD_'], ['/about', 'A curious mind.'], ['/projects', 'Things I&#x27;ve'],
    ['/skills', 'Tools I work'], ['/experience', 'Learning by'], ['/contact', 'Leave a little hello'],
    ['/resume', 'Hunter&#x27;s résumé'],
    ...projects.map(project => [`/projects/${project.id}`, project.title.replaceAll('&', '&amp;')]),
    ['/projects/missing-project', 'Project not found'], ['/missing-page', 'PAGE NOT FOUND'],
  ];
  const render = path => renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(App)));
  assert.deepEqual(seoPages.map(page => page.path).sort(), pages.map(([path]) => path).filter(path => !path.includes('missing')).sort(), 'Every real route should have SEO metadata and a sitemap entry');
  for (const [path, content] of pages) {
    const markup = render(path);
    assert.ok(!/huntrr[. _-]space/i.test(markup), `${path} should not advertise the removed project or old domain`);
    assert.ok(markup.includes(content), `${path} should render its own content`);
    assert.equal((markup.match(/<h1[ >]/g) || []).length, 1, `${path} should have one primary heading`);
    for (const href of ['/', '/about', '/projects', '/skills', '/experience', '/contact', '/resume']) {
      assert.ok(markup.includes(`href="${href}"`), `${path} should retain navigation to ${href}`);
    }
    assert.ok(markup.includes('id="main-content"'), `${path} should have a skip-link target`);
    assert.ok(!markup.includes('href="#"'), `${path} should not contain placeholder links`);
    for (const [, href] of markup.matchAll(/href="([^"]+)"/g)) {
      assert.ok(!href.startsWith(site.url) && !href.includes('huntrr-portfolio.vercel.app'), `${path} internal links should remain relative`);
    }
    const metadata = getPageMetadata(path);
    if (path.includes('missing')) {
      assert.equal(metadata.canonical, null, 'Missing pages should not claim another page as canonical');
      assert.equal(metadata.robots, 'noindex, follow');
    } else {
      assert.equal(metadata.canonical, new URL(path, 'https://huntrr.dev').href);
      assert.equal(getPageMetadata(`${path === '/' ? '' : path}/`).canonical, metadata.canonical, 'Trailing slashes should use the same canonical');
    }
    assert.ok(!/href="tel:|\b\d{3}[-. ]\d{3}[-. ]\d{4}\b/.test(markup), `${path} should not expose a personal phone number`);
    if (path.startsWith('/projects/') && path !== '/projects/missing-project') {
      assert.ok(/aria-current="page"[^>]*href="\/projects"/.test(markup), 'Projects navigation should remain active on details');
    }
    console.log(`PASS ${path}`);
  }
  const escape = value => value.replaceAll('&', '&amp;').replaceAll("'", '&#x27;').replaceAll('"', '&quot;');
  const gallery = render('/projects');
  for (const project of projects) {
    for (const content of [project.title, project.subtitle, project.description, ...project.stack]) {
      assert.ok(gallery.includes(escape(content)), `Gallery should retain ${project.title} content`);
    }
    const details = render(`/projects/${project.id}`);
    for (const note of project.notes) assert.ok(details.includes(escape(note)), `Detail page should retain ${project.title} notes`);
  }
  for (const group of skillGroups) for (const skill of group.skills) assert.ok(render('/skills').includes(escape(skill)));
  for (const item of experiences) for (const content of [item.organization, item.role, item.dates, item.description, ...item.responsibilities, ...item.skills]) assert.ok(render('/experience').includes(escape(content)));
  assert.ok(render('/').includes(escape(profile.introduction)), 'Homepage introduction should be preserved');
  const about = render('/about');
  for (const item of education) for (const content of [item.heading, item.status, item.detail, item.body, ...(item.coursework || [])]) assert.ok(about.includes(escape(content)), 'Education and future plans should be visible');
  const resume = render('/resume');
  assert.ok(resume.includes(`data="${profile.resume}" type="application/pdf"`), 'Résumé should embed the supplied PDF');
  assert.ok(resume.includes(`href="${profile.resume}" download="Hunter_Bloom_Public_Resume.pdf"`), 'Résumé should offer a named download');
  assert.ok(resume.includes(`href="${profile.resume}" target="_blank"`), 'Full résumé should open the same PDF');
  assert.ok(render('/').includes('View My Résumé'), 'Homepage should prominently link to résumé');
  assert.ok(render('/contact').includes('mailto:hebloom@icloud.com'), 'Contact should use the professional email');
  const pdf = await readFile(new URL(`../public${profile.resume}`, import.meta.url));
  assert.ok(pdf.subarray(0, 5).toString() === '%PDF-', 'Résumé link must point to a real PDF');
  for (const content of [japanTrip.title, japanTrip.subtitle, ...japanTrip.story]) assert.ok(about.includes(escape(content)), 'Japan story should be included verbatim');
  for (const content of ['A curious mind.', 'My next', 'Associate of Applied Science']) assert.ok(about.includes(content), 'Existing About content should remain');
  const { default: japanPhotos } = await server.ssrLoadModule('/src/content/japan-photos.json');
  assert.ok(about.includes('Postcards from Japan'), 'About should include the photo gallery');
  if (japanPhotos.length === 0) assert.ok(about.includes('More photos from the trip are coming soon.'), 'The empty gallery should be honest about missing photos');
  for (const photo of japanPhotos) assert.ok(about.includes(escape(photo.src)) && (!photo.caption || about.includes(escape(photo.caption))), 'Saved photos and captions should be visible to visitors');
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.ok(!/gradient\s*\(/i.test(css), 'No CSS gradients');
  assert.ok(css.includes('prefers-reduced-motion: reduce'), 'Respect reduced motion');
  const borderTokens = [...css.matchAll(/border(?:-(?:top|right|bottom|left|inline)(?:-color)?)?\s*:[^;}]*var\(--([a-z-]+)\)/g)].map(match => match[1]);
  assert.ok(borderTokens.every(token => ['border', 'gray', 'light-gray', 'muted-gray'].includes(token)), 'Border colors must use grayscale tokens');
  console.log('PASS retained content, project notes, navigation, palette, and reduced motion');
} finally {
  await server.close();
}
