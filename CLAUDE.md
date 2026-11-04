# CLAUDE.md

## Project

SP WebTools (https://webtools.siddharthprakashan.com): independent, privacy-focused browser utilities. Vite **multi-page app** (MPA), MIT licensed, deployed on Cloudflare Pages. The same repo also builds the root website (https://siddharthprakashan.com) as a separate Cloudflare Pages project; see `docs/vite-config.md`.

**Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, shadcn/ui, Lucide React, AG Grid Community, Zustand, Dexie, ESLint, Prettier. Package manager: **pnpm only**.

## Commands

- `pnpm dev` / `pnpm preview`: SP WebTools. `pnpm dev:root` / `pnpm preview:root`: root website
- `pnpm build`: type check and build both sites. `pnpm build:webtools` → `dist-webtools/`, `pnpm build:root` → `dist-root/`
- `pnpm check`: type check and lint
- `pnpm add <pkg>` / `pnpm add -D <pkg>` / `pnpm remove <pkg>`

Never use npm or yarn. Never edit `pnpm-lock.yaml` by hand.

## Architecture

- Every page has its own root-level folder with `index.html` (`about-us/`, `privacy-policy/`, `terms-and-conditions/`, `contact-us/`, `credits/`, `disclaimer/`, `faq/`, and one per utility).
- Root website: HTML entries and its own `public/` live in `root-site/`, the app in `src/apps/root/`. It reuses the shared `Layout` with `rootChrome` from `site.ts`; brand assets are shared from `public/assets/`.
- Site pages share `src/apps/site/main.tsx`. Each utility has its own entry at `src/apps/<utility>/main.tsx`.
- Shared code goes in `src/shared/` (`components/`, `components/ui/` for shadcn, `config/`, `hooks/`, `lib/`, `stores/`, `styles/`).
- App-specific logic stays in its own app folder. Never import from one app into another, and never move app logic into shared.
- Common site config (name, email, tools list) lives in `src/shared/config/site.ts`.
- Import `globals.css` in every entry point.

## Routing

- **Never** convert to a React Router SPA or add a global SPA fallback.
- Link between pages with plain `<a href>`.
- Direct navigation and refresh must work on every page.
- Add new HTML entries to `vite.webtools.config.ts` (or `vite.root.config.ts` for the root website). Shared Vite settings live in `vite.shared.ts`.
- Keep a top-level `404.html` so Cloudflare Pages does not treat the site as an SPA.

## Import aliases

Use aliases, not deep relative paths. Keep Vite and `tsconfig` in sync.

`@` → `src/`, `@shared`, `@components`, `@ui`, `@config`, `@hooks`, `@lib`, `@styles` → matching folders under `src/shared/`, `@apps` → `src/apps/`, `@site`, `@root`, `@ig-followers-check`, `@json`, `@image` → the matching app folders.

## UI

- Tailwind 4 and shadcn/ui first, Lucide for icons, mobile-first, keyboard accessible.
- **AG Grid:** use `ag-grid-community` and `ag-grid-react` (never `@ag-grid-community/*`). Register modules once in `src/shared/lib/agGrid.ts`. Load it only on pages that need it, and skip it for simple tables.

## State and storage

- **Zustand** (`zustand`) for app state, persisted to `localStorage` with the `persist` middleware (`createJSONStorage(() => localStorage)`).
  - Shared global state (theme / dark-light mode and other site-wide preferences) lives in `src/shared/stores/`, key prefix `sp-webtools:` (for example `sp-webtools:settings`).
  - Theme: `useSettingsStore` (`src/shared/stores/settings.ts`, key `sp-webtools:settings`), `useTheme` / `useApplyTheme` (`@hooks/useTheme`) and `ThemeToggle` in the navbar. Dark mode uses the `.dark` class on `<html>`, which the `themeScript()` plugin in `vite.shared.ts` sets before first paint. If you change the storage key or state shape, update that script too.
  - Each utility has its own stores in `src/apps/<utility>/stores/`, key prefix `<utility>:` (for example `ig-followers-check:settings`). Never import one utility's store into another, and never put utility state in a shared store.
  - Persist only small settings and UI preferences. Use `partialize` to exclude transient state, and set `version` with `migrate` when the persisted shape changes.
- **Dexie** (`dexie`, `dexie-react-hooks`) for large or tabular data stored in IndexedDB (for example Instagram follower records shown in AG Grid). Never put this data in Zustand or `localStorage`.
  - One database per utility, defined in `src/apps/<utility>/db.ts`, named `<utility>` (for example `ig-followers-check`). No shared database.
  - Read with `useLiveQuery` and handle its `undefined` (loading) result. Bump the Dexie schema version for every schema change; never edit an existing version.
  - Offer users a way to clear their stored data.
- All storage stays on the device. Never sync it to a server. Keep the Privacy Policy accurate about which browser storage (`localStorage`, IndexedDB) is used.

## PWA

Each utility is its own installable PWA with files in `public/<utility>/`. **Before touching a manifest, service worker or offline behavior, read `docs/pwa.md`.**

Non-negotiable: keep each service worker scoped to its utility, never delete other apps' caches, never cache user data, and prefix storage keys per app.

## Advertising

Use `AdSlot.tsx` only; page-level slots via `<Layout showAds>`, IDs in `src/shared/config/ads.ts` from `.env`. **Before touching ads or the ad-block check, read `docs/adsense-policy.md`.**

Non-negotiable: never auto-refresh ads, never force an ad on a button click, never ask users to click ads, and never put ads on legal pages or on loading, error or empty screens.

## Privacy and security

- Process files locally in the browser. Never send file contents anywhere.
- Validate file types and sizes. Never use `eval()` or unsafe HTML injection.
- Revoke object URLs and clean up listeners.
- Never log user data. Never put secrets in `VITE_` variables or commit `.env`.
- If a change adds analytics, a server call or other data collection, update the Privacy Policy.

## SEO

Every public page needs a unique title and description, a canonical URL, Open Graph tags, and semantic HTML, set in its HTML entry. Update `public/sitemap.xml` when adding a public page.

## Adding a utility

1. Create `src/apps/<name>/` with `main.tsx` and `App.tsx`.
2. Create `<name>/index.html` and add it to `vite.webtools.config.ts`.
3. Add its metadata to `src/shared/config/site.ts` (this feeds nav, home, About and Privacy).
4. Add it to `public/sitemap.xml`, and add PWA files in `public/<name>/` if needed.
5. Run `pnpm check` and `pnpm build`.

## Working rules

- Read the relevant files and look for existing shared code before changing anything.
- Make focused changes, add no unnecessary dependencies, and don't touch unrelated files.
- Handle loading, empty, success and error states.
- Run `pnpm check` and `pnpm build` before finishing, and fix errors you introduced.
- Summarize modified files and any manual steps.
- Never remove existing utilities, change the MIT license, expose secrets, or claim untested functionality works.
