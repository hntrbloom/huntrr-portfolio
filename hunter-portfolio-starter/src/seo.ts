import { profile, projects } from './data.ts';

export const site = {
  url: 'https://huntrr.space',
  name: "Hunter Bloom's Portfolio",
  image: '/social-preview.png',
  imageAlt: "Hunter Bloom's portfolio at huntrr.space — software, AI, and hands-on engineering, with a pastel laptop illustration.",
};

export const seoPages = [
  { path: '/', title: `${profile.name} | Developer Portfolio`, description: "Hunter Bloom's portfolio — software development, AI, data science, and hands-on engineering projects." },
  { path: '/about', title: `About Me | ${profile.name}`, description: "Get to know Hunter Bloom: an aspiring computer engineer and software developer, with a curious mindset, hands-on experience, and a solo trip to Japan." },
  { path: '/projects', title: `Projects | ${profile.name}`, description: "Explore Hunter Bloom's software, AI and data science, creative business tools, and 3D design projects, with technologies and project notes." },
  { path: '/skills', title: `Skills | ${profile.name}`, description: "Explore Hunter Bloom's skills in programming, web development, cloud services, AI and data science, and hands-on engineering." },
  { path: '/experience', title: `Experience | ${profile.name}`, description: "Explore Hunter Bloom's applied AI and data science internship at Ames National Laboratory, independent projects, and creative business experience." },
  { path: '/resume', title: `Résumé | ${profile.name}`, description: "View and download Hunter Bloom's résumé, including software development skills, education, AI and data science experience, and hands-on projects." },
  { path: '/contact', title: `Contact | ${profile.name}`, description: "Contact Hunter Bloom about software development, computer engineering opportunities, and creative projects." },
  ...projects.map(project => ({ path: `/projects/${project.id}`, title: `${project.title} | ${profile.name}`, description: project.description })),
];

export function getPageMetadata(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const page = seoPages.find(item => item.path === normalizedPath);
  return {
    title: page?.title ?? `Page not found | ${profile.name}`,
    description: page?.description ?? "This page isn't part of Hunter Bloom's portfolio. Explore the existing pages to learn about his work.",
    canonical: page ? new URL(page.path, site.url).href : null,
    robots: page ? 'index, follow' : 'noindex, follow',
  };
}

export function getMetaTags(pathname: string) {
  const page = getPageMetadata(pathname);
  const image = new URL(site.image, site.url).href;
  return [
    { name: 'description', content: page.description },
    { name: 'robots', content: page.robots },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:title', content: page.title },
    { property: 'og:description', content: page.description },
    ...(page.canonical ? [{ property: 'og:url', content: page.canonical }] : []),
    { property: 'og:image', content: image },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: site.imageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: page.title },
    { name: 'twitter:description', content: page.description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: site.imageAlt },
  ];
}

// Keep metadata in sync during React Router navigation without changing links.
export function updatePageMetadata(pathname: string) {
  const page = getPageMetadata(pathname);
  document.title = page.title;
  for (const tag of getMetaTags(pathname)) {
    const attribute = 'property' in tag ? 'property' : 'name';
    const value = tag.property ?? tag.name;
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, value!);
      document.head.append(element);
    }
    element.content = tag.content;
  }
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (page.canonical) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = page.canonical;
  } else {
    canonical?.remove();
    document.head.querySelector('meta[property="og:url"]')?.remove();
  }
}
