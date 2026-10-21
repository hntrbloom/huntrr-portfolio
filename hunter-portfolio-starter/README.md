# Hunter's portfolio starter

 A customizable React + TypeScript + Vite portfolio with a responsive layout, theme toggle, project filters, and expandable project notes.

## Get it running

1. Install Node.js 24 LTS (`node -v` should report `v24.x`) and pnpm 11.25.0 (`npm install --global pnpm@11.25.0` if needed). This matches the runtime selected for Vercel and satisfies both Vite and React Router.
2. Open `hunter-portfolio-starter`, the app folder inside the Git repository, in VS Code.
3. Open Terminal in VS Code, then run:

```bash
pnpm install --frozen-lockfile
npm run dev
```

4. Open the localhost address shown by Vite in your terminal (usually http://localhost:5173).

## Customize in this order

**First:** edit `src/data.ts`.
- Change the intro, skills, and experience text to reflect exactly what you want employers to know.
- Fill in `profile.email`, `profile.github`, and `profile.linkedin`. Leave a field empty to hide its button.
- Add real `demoUrl` and `codeUrl` values for project links that are public.
- Write clear project notes in your own words, ideally explaining the problem, your contribution, technologies, and results.

**Next:** change the visuals.
- Edit `src/styles.css` for colors, typography, layout, and mobile styles.
- Add project screenshots to `public/images/` and set `screenshot: '/images/yourfile.png'` in the matching project object.
- The current résumé is `public/resume/Hunter_Bloom_Public_Resume.pdf`, referenced by `profile.resume`. Replace that public file when updating it, or update the path if you rename it.

**Then:** improve the components.
- Edit `src/App.tsx` to change the arrangement and behavior of each section.
- Try adding a new project category or a separate projects detail page as a coding exercise.
- Edit `profile.headline` and `profile.headlineHighlight` separately to control the hero headline and its highlighted phrase.

## Before you publish

- Review every statement for accuracy; the example copy is a starting point, not a verified resume.
- Only share internship project details, data, screenshots, and code that you have permission to publish.
- Replace decorative preview panels with screenshots of *your own work*.
- Test on mobile and desktop.
- Run `npm run build` to verify the production build.
- Run `npm run check:routes` and `npm run check:gallery` to check navigation, retained content, the résumé, and the local scrapbook editor.
- Run `npm run check:seo` after building to verify canonical URLs, social metadata, sitemap, and robots.txt.
- Commit and push your intended changes to GitHub. Vercel automatically deploys pushes to the configured production branch (`master` in this repository).

## Production hosting

The existing Vercel project is `huntrr-portfolio`, at https://huntrr.dev. Its Root Directory must be `hunter-portfolio-starter`, with the Vite preset, `npm run build`, and output directory `dist`. See [DEPLOYMENT.md](DEPLOYMENT.md) for the exact dashboard settings, initial redeployment, and normal development workflow.

Dependency installation uses the committed `pnpm-lock.yaml`; `npm run ...` runs the same package scripts with those installed dependencies. Use pnpm when adding or updating dependencies so there is one authoritative lockfile.

`vercel.json` supplies the React Router fallback for direct links and refreshes. The file `public/_redirects` is not read by Vercel. Assets in `public/`, including `public/resume/Hunter_Bloom_Public_Resume.pdf`, are copied to `dist/` by Vite.

The Japan scrapbook editor saves photos and captions through the local Vite development server. Commit `src/content/japan-photos.json` and the new files in `public/images/japan/` to publish them. The production site displays the saved gallery and lightbox; editing controls are available only locally.

## Tech

React, TypeScript, Vite, plain CSS. No paid tools, UI kit, backend, database, or API keys required.
