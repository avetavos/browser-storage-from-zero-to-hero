# Browser Storage & Data — From Zero to Hero

A bilingual (EN/TH), standalone, beginner→advanced course on **client-side storage** — the storage landscape, `localStorage`/`sessionStorage`, cookies, IndexedDB (fundamentals + advanced), the Cache API & Storage Manager, Web/Shared Workers, and cross-tab data (BroadcastChannel, Web Locks, OPFS). Examples run **in your browser** via a same-origin runner, diagrams are **Mermaid**, and there's a **read-mode** toggle.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Hands-on | **`<StorageRunner>`** runs JS in a **same-origin** iframe (`sandbox="allow-scripts allow-same-origin"`) so `localStorage`/`sessionStorage`/`IndexedDB`/Cache/`BroadcastChannel`/Web Locks/OPFS (and dedicated Workers via Blob URL) actually run, with console output. `stackblitz` mode opens SharedWorker / multi-tab demos. |
| Diagrams | Client-side, theme-aware **Mermaid** (`<Mermaid>` + `public/enhance.js`) |
| Reading | **Read-mode** toggle (hides sidebar/TOC, widens content) via `public/enhance.js` |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

## Content Structure

```
src/content/docs/
  en/                          # English — served at /en/...
    intro-storage-landscape/
    web-storage/
    cookies/
    indexeddb-fundamentals/
    indexeddb-advanced/
    cache-and-quota/
    workers-sharedworker/
    cross-tab-and-files/
    index.mdx                  # EN landing (splash)
  th/                          # Thai — served at /th/...
    (same module directories)
    index.mdx
```

### The 8 Modules

| Directory | Module |
| --------- | ------ |
| `intro-storage-landscape` | Intro: Storage Landscape |
| `web-storage` | localStorage & sessionStorage |
| `cookies` | Cookies |
| `indexeddb-fundamentals` | IndexedDB Fundamentals |
| `indexeddb-advanced` | IndexedDB Advanced |
| `cache-and-quota` | Cache API & Quota |
| `workers-sharedworker` | Web Workers & SharedWorker |
| `cross-tab-and-files` | Cross-Tab & Files (BroadcastChannel, Web Locks, OPFS) |

### Components & Lesson Template

- **`StorageRunner.tsx`** `{ code, stackblitz? }` — same-origin iframe runner with console capture (storage APIs work); `storage-project.ts` builds the StackBlitz SharedWorker/multi-tab project. Runnable examples are a hoisted `export const ...Code` (JS that uses a storage API + `console.log`) + `<StorageRunner code={...} />`. Demo keys are namespaced `demo:` / `demo_` and cleaned up.
- **`Mermaid.astro`** `{ code, title }`, **`Callout.astro`** `{ title }`, **`Quiz.tsx`** `{ id, questions }` (0-based `answer`, field `q`), **`ProgressTracker.tsx`** `{ id }`.

Lesson order: frontmatter → imports → concept intro → prose (fenced `js` + `<Mermaid>`) → `export const ...Code` + `<StorageRunner>` (where runnable) → `<Callout>` → `<Quiz>` → `<ProgressTracker>` (last). IDs follow `<module>/<slug>`.

> **⚠️ Authoring notes:**
> - The runner is **same-origin on purpose** — storage APIs throw in an opaque origin. Examples namespace demo keys and clean up so runs don't pollute the site's storage.
> - **In `export const` snippets:** escape `${`→`\${` (worker-source/template literals) and double-escape `\\n`. Fenced blocks are literal.
> - **Never a bare `{...}`/`${...}` in prose** — keep JS objects/JSON in code spans / fenced blocks / `export const`. **Diagrams are Mermaid, not ASCII.**
> - **Internal links include the base path** (`/browser-storage-from-zero-to-hero/en/...`); cross-course links use the full `https://avetavos.github.io/<course>/...` URL.

## Deployment

Fully static → `dist/`. Base path in `astro.config.mjs`: `site: 'https://avetavos.github.io'`, `base: '/browser-storage-from-zero-to-hero'`.

Deployed to GitHub Pages via **branch-source** (`gh-pages`): build `dist/`, add `.nojekyll`, push to `gh-pages`, set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `/`**, then **request a Pages build** (`gh api -X POST repos/<owner>/<repo>/pages/builds`) — flipping the source alone does not trigger one. If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.
