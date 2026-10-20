# Hunter's portfolio starter

 A customizable React + TypeScript + Vite portfolio with a responsive layout, theme toggle, project filters, and expandable project notes.

## Get it running

1. Install Node.js (check that `node -v` reports a supported version; Vite 8 supports Node.js 20.19+ or 22.12+).
2. Open the project folder in VS Code.
3. Open Terminal in VS Code, then run:

```bash
npm install
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
- Add your real resume as `public/resume.pdf`, then set `profile.resume: '/resume.pdf'`.

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
- Use GitHub to version your project; import the repository into Vercel to publish it.

## Tech

React, TypeScript, Vite, plain CSS. No paid tools, UI kit, backend, database, or API keys required.
