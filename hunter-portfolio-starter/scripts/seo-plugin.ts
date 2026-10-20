import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';
import { getMetaTags, getPageMetadata, seoPages, site } from '../src/seo.ts';

const marker = /<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->/;
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function head(pathname: string) {
  const page = getPageMetadata(pathname);
  const tags = getMetaTags(pathname).map(tag => {
    const attribute = 'property' in tag ? 'property' : 'name';
    return `<meta ${attribute}="${tag.property ?? tag.name}" content="${escape(tag.content)}" />`;
  });
  if (page.canonical) tags.unshift(`<link rel="canonical" href="${escape(page.canonical)}" />`);
  return `<!-- SEO:start -->\n    <title>${escape(page.title)}</title>\n    ${tags.join('\n    ')}\n    <!-- SEO:end -->`;
}

export default function seoPlugin(): Plugin {
  let outputDirectory: string;
  return {
    name: 'portfolio-seo',
    configResolved(config) {
      outputDirectory = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html, context) {
      if (!marker.test(html)) throw new Error('Missing SEO metadata markers in index.html');
      const pathname = new URL(context.originalUrl ?? '/', site.url).pathname;
      return html.replace(marker, () => head(pathname));
    },
    async writeBundle() {
      // Static HTML heads let social crawlers read every route without JavaScript.
      // All entries load the same Vite bundles and existing BrowserRouter app.
      const html = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
      for (const page of seoPages.filter(page => page.path !== '/')) {
        const filename = path.join(outputDirectory, `${page.path.slice(1)}.html`);
        await mkdir(path.dirname(filename), { recursive: true });
        await writeFile(filename, html.replace(marker, () => head(page.path)));
      }
      const urls = seoPages.map(page => `  <url><loc>${escape(new URL(page.path, site.url).href)}</loc></url>`);
      await writeFile(path.join(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
    },
  };
}
