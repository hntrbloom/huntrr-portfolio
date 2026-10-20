# Your first portfolio edits

Your live site is now https://huntrr-portfolio.vercel.app. Keep developing in this folder; see [DEPLOYMENT.md](DEPLOYMENT.md) for the VS Code → GitHub → Vercel workflow and dashboard settings. Use Node.js 24 LTS, and use pnpm 11.25.0 for dependency installation so the committed lockfile stays authoritative.

## Open your website

Double-click `start-portfolio.cmd` in this folder. Keep its terminal window open, then open the Local address it prints in your browser (usually http://127.0.0.1:5173).

This is a local preview on your computer. To stop it, press Ctrl+C in that terminal. Run the file again whenever you want to work on your site.

Open this whole folder in a code editor, such as VS Code. Save a change with Ctrl+S and the browser preview will update automatically.

## Make one small change

Open `src/data.ts`. Near the top, find:

```ts
headline: 'Turning curious ideas into',
headlineHighlight: 'useful software.',
```

Try replacing just the words between the quotes:

```ts
headline: 'Learning to build',
headlineHighlight: 'one project at a time.',
```

Keep the quotes and commas. Save, then look at the large heading in your browser. Ctrl+Z undoes an edit.

For text containing an apostrophe, use double quotes around the text, for example `introduction: "I'm learning to build websites.",`.

The starter's experience and project descriptions are sample copy. Edit them to match your own background as you work through the site.

## What each file does

| File | What you edit here |
| --- | --- |
| `src/data.ts` | Name, introduction, project text, skills, and contact links. Start here. |
| `src/styles.css` | Colors, fonts, spacing, and layouts. This is CSS. |
| `src/pages/` | Home, About, Projects, project details, Skills, Experience, Résumé, and Contact. This is React markup, called JSX, with TypeScript. |
| `src/components/` | Shared navigation, footer, layout, and project cards. |
| `src/App.tsx` | The route list connecting each URL to a page. |
| `index.html` | The browser tab title, description, and container React fills with the page. |
| `public/` | Images and a resume you want the website to use. |

## Where HTML fits

HTML describes the structure of a page. CSS controls how it looks. JavaScript adds behavior, such as filtering projects or changing the theme.

In plain HTML, a heading and paragraph look like this:

```html
<h1>Hello, I'm Hunter</h1>
<p>Welcome to my portfolio.</p>
```

`h1` means the main heading. `p` means a paragraph. Most elements have an opening tag and a closing tag, such as `<p>` and `</p>`.

Your starter uses React to generate that HTML. In `src/pages/Home.tsx`, this heading:

```tsx
<h1 id="hero-heading">
  {profile.headline} <em>{profile.headlineHighlight}</em>
</h1>
```

reads the words you entered in `src/data.ts`. The curly braces insert values. The `<em>` element wraps the part styled with the accent color.

JSX looks similar to HTML. One difference you will see is `className="hero"` instead of HTML's `class="hero"`. It connects an element to a CSS rule.

## Try these next, one at a time

1. Change the introduction in `src/data.ts` and save.
2. Change the title of the first project in that same file and save.
3. In `src/styles.css`, find the palette inside `:root` at the top. For a small experiment, change `--soft-pink: #FDE1EA` to `--soft-pink: #E6D8F3` and save. Watch the soft pink decorations update, then undo if you prefer the original. The rest of the stylesheet reuses these named color variables.

If a red error appears, check the last line you changed for a missing quote, comma, or closing tag. You can also undo that change.

## Checking the site later

The dependencies were installed with pnpm in this copy. If pnpm is on your terminal's PATH, `pnpm run build` checks TypeScript and creates a production copy in `dist/`. If you use a separate Node.js/npm setup, `npm run build` runs the same build script.

The launch file also supports a normal Node.js installation with npm. It uses the bundled Codex runtime when that is available on this computer.
