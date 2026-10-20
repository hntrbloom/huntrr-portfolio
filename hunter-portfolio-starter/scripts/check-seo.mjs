import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { preview } from 'vite';

const dist = new URL('../dist/', import.meta.url);
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, 11, 'Sitemap should include all seven main pages and four project pages');
assert.equal(new Set(urls).size, urls.length, 'Sitemap should not repeat pages');

for (const url of urls) {
  const { origin, pathname } = new URL(url);
  assert.equal(origin, 'https://huntrr.space');
  const file = pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
  const html = await readFile(new URL(file, dist), 'utf8');
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `Static canonical should match ${url}`);
  assert.ok(html.includes(`property="og:url" content="${url}"`), `Static social URL should match ${url}`);
  assert.ok(html.includes('name="robots" content="index, follow"'));
  for (const tag of ['og:title', 'og:description', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    assert.equal((html.match(new RegExp(`(?:name|property)="${tag}"`, 'g')) ?? []).length, 1, `${url} needs exactly one ${tag}`);
  }
  assert.ok(html.includes('content="https://huntrr.space/social-preview.png"'));
  assert.ok(!html.includes('huntrr-portfolio.vercel.app'));
  assert.ok(html.includes('<div id="root"></div>'), 'Keep the existing React app entry');
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) {
    await readFile(new URL(asset.slice(1), dist));
  }
  console.log(`PASS static SEO ${pathname}`);
}
const robots = await readFile(new URL('robots.txt', dist), 'utf8');
assert.ok(robots.includes('Allow: /'));
assert.ok(robots.includes('Sitemap: https://huntrr.space/sitemap.xml'));
const png = await readFile(new URL('social-preview.png', dist));
assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
console.log('PASS sitemap, robots.txt, bundled assets, and 1200×630 social preview PNG');

const server = await preview({ preview: { host: '127.0.0.1', port: 0, strictPort: true } });
try {
  const address = server.httpServer.address();
  assert.ok(address && typeof address !== 'string');
  const origin = `http://127.0.0.1:${address.port}`;
  for (const canonical of urls) {
    const pathname = new URL(canonical).pathname;
    for (const query of ['', '?source=check']) {
      const response = await fetch(origin + pathname + query);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `HTTP ${pathname} canonical`);
      assert.ok(html.includes(`property="og:url" content="${canonical}"`), `HTTP ${pathname} social URL`);
    }
    console.log(`PASS HTTP SEO ${pathname}`);
  }
  for (const asset of ['/sitemap.xml', '/robots.txt', '/social-preview.png', '/resume/Hunter_Bloom_Public_Resume.pdf']) {
    const response = await fetch(origin + asset);
    assert.equal(response.status, 200);
    assert.ok(!response.headers.get('content-type').includes('text/html'), `${asset} must not return the SPA shell`);
  }
  const missing = await fetch(origin + '/missing-page');
  assert.equal(missing.status, 200);
  assert.ok((await missing.text()).includes('<div id="root"></div>'), 'Unknown pages must retain the React Router fallback');
  console.log('PASS HTTP query strings, crawler files, PNG, résumé, and SPA fallback');
} finally {
  await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
}
