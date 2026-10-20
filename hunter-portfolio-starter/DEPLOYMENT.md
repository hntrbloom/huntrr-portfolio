# GitHub and Vercel deployment

The portfolio stays in this existing React, TypeScript, and Vite project. Production URL: https://huntrr-portfolio.vercel.app. Git remote: `https://github.com/hntrbloom/huntrr-portfolio.git`.

## One-time Vercel dashboard settings

Open project **huntrr-portfolio** → **Settings → Build and Deployment** and confirm:

| Setting | Value |
| --- | --- |
| Root Directory | `hunter-portfolio-starter` |
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` (relative to the app root) |
| Install Command | Automatic; leave the override disabled |
| Development Command | `vite` |
| Node.js Version | `24.x` (also selected by `package.json`) |

In **Settings → Environment Variables**, set `ENABLE_EXPERIMENTAL_COREPACK=1` for Production and Preview so Vercel uses the exact `pnpm@11.25.0` package manager declared in `package.json`. This is a build setting, not a secret; no client API keys or other app environment variables are required. Keep installation automatic so Vercel detects `pnpm-lock.yaml`.

In **Settings → Git**, confirm the connected repository is `hntrbloom/huntrr-portfolio`. In **Settings → Environments → Production → Branch Tracking**, confirm `master`, the existing repository default branch. Pushes to that branch should create production deployments; other branches normally create previews.

In **Settings → Domains**, confirm `huntrr-portfolio.vercel.app` belongs to this project and points to production.

The tracked `vercel.json` specifies the framework, build command, output directory, and SPA rewrite. Vercel must use the correct Root Directory to discover that file. Do not set Root Directory to `dist`, or Output Directory to `hunter-portfolio-starter/dist` when the Root Directory is already `hunter-portfolio-starter`.

## Apply settings to a new deployment

Save dashboard changes, then deploy the commit containing this configuration by pushing it to `master`. If it is already on GitHub, create a new production deployment from that commit or redeploy it after saving settings. For the initial troubleshooting redeployment, disable reuse of the build cache.

A warning that the current project's settings differ from a production deployment describes the settings recorded for that earlier deployment. Changing settings does not rebuild that deployment. Check the new deployment's build log for the intended root, Node version, dependency installation, `npm run build`, and generated `dist/index.html`.

If a new deployment is Ready but the domain still returns 404, check that its output includes `index.html`, that it is assigned to Production, and that the domain is assigned to it. A wrong app root or output directory can produce a successful deployment with the wrong files; the earlier 404's cause cannot be confirmed without its deployment logs/settings.

## Normal development workflow

Run these in `hunter-portfolio-starter`:

```powershell
pnpm install --frozen-lockfile
npm run dev
```

Edit the existing source in VS Code. Before publishing:

```powershell
npm run build
npm run check:routes
npm run check:gallery
npm run preview
```

`npm run build` runs TypeScript checks and Vite, producing `dist/`. Preview serves that built output locally. Open each navigation page and a project detail URL directly, then refresh. Verify the résumé opens/downloads as a PDF. Stop the preview with Ctrl+C.

Review the diff and stage only the intended files in VS Code's Source Control panel, commit, and push to `master` (or merge a reviewed feature branch into it). Watch the resulting Vercel deployment and verify the live pages below. No manual upload of `dist/` is needed; it and `node_modules/` stay ignored. When adding dependencies, use `pnpm add` or `pnpm add -D` and commit the updated `package.json` and `pnpm-lock.yaml`.

## Direct-link and refresh checks

`BrowserRouter` handles page rendering in the client. Vercel's rewrite sends page requests to `/index.html`; existing static files are served at their own URLs. Keep this rewrite for new routes. `public/_redirects` has no effect on Vercel.

Verify each URL by opening it directly and refreshing:

- `/`
- `/about`
- `/projects`
- `/projects/huntrr-space`
- `/projects/ai-data`
- `/projects/business-tools`
- `/projects/3d-printing`
- `/skills`
- `/experience`
- `/resume`
- `/contact`

Also verify `/resume/Hunter_Bloom_Public_Resume.pdf` serves a PDF, `/favicon.svg` serves an image, and unknown page/project URLs show the existing in-app not-found content. With this static SPA fallback, an unknown page can have HTTP status 200 while displaying the app's not-found screen.

The scrapbook upload/caption editor is intentionally local. Saved gallery content and its lightbox work on production after committing the manifest and image files. There is no production upload backend in this architecture.
